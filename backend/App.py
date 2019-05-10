from flask import Flask, render_template, request, redirect
from flask_cors import CORS
import jinja2
import os
from os.path import join, dirname
import json
import requests
import time, operator
import cv2

from PIL import Image
import numpy as np
from random import shuffle
import pickle

app = Flask(__name__)
CORS(app) 

TEST_MODE = False
number = ''

# GLOBAL VARIABLES
words = ['cat']
currWord = words[0]
currIndex = 0

# Load models from weight files
MODEL_PATH = "models/"
models = {}
for folder in os.listdir("models"):
    if folder != ".DS_Store":
        models[folder.split(".")[0]] = pickle.load(open("models/"+folder, 'rb'))

# Image processing
def preprocess(img):
    img = img[:]
    img[np.where((img <=40).all(axis=2))] = [0,0,0]
    img = cv2.Sobel(img, cv2.CV_64F, 0, 1, ksize=5)
    return img

# Returns True if classification for img == letter
def correct_letter(img, letter):
    if img is None or not img.any():
        return "False"
    letter = letter.upper()
    model = models[letter]
    img = cv2.resize(img,(64,64))
    img = preprocess(img)
    img = img.flatten()
    img = img.reshape(1,img.shape[0])

    y = model.predict(img)
    if y[0]: 
        return "True"
    else:
        return "False"

@app.route('/', methods=['GET'])
def hello():
    return

# Returns word to be displayed in UI
@app.route('/get_word', methods=['GET'])
def generate_word():
    global currIndex
    currIndex = 0
    return currWord

# Returns the next letter to be signed
@app.route('/next_letter', methods=['GET'])
def next_letter():
    global currIndex
    global currWord
    print(currIndex)
    if currIndex < len(currWord)-1:
        currIndex += 1
        return currWord[currIndex]
    else: 
        return "Done"

# Returns True if the letter classified is correct
@app.route('/classify_letter', methods=['GET'])
def begin_classification():

    camera = cv2.VideoCapture(0)
    _, image = camera.read()
    img = image
    del(camera)

    return correct_letter(img, currWord[currIndex])

@app.route('/post', methods=['GET','POST'])
def post():
	if request.method == 'POST':
		return render_template('post.html')
	return render_template('get.html')


if __name__ == '__main__':
	# port = int(os.environ.get('PORT', 8000))
	app.run(host='0.0.0.0',debug=True)
	app.run(debug=True)