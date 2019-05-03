from flask import Flask, render_template, request, redirect
from flask_cors import CORS
import jinja2
import os
from os.path import join, dirname
import json
import requests
import time, operator
import cv2

from keras.utils import get_file
from keras.models import load_model
from keras.preprocessing.image import ImageDataGenerator
from PIL import Image
import numpy as np
from random import shuffle

app = Flask(__name__)
CORS(app) 

TEST_MODE = False
number = ''

# GLOBAL VARIABLES
CLASSES = ['A','B', 'C','D', 'E','F', 'G', \
           'H', 'I','J', 'K','L', 'M','N', \
           'O','P', 'Q','R', 'S','T', 'U', \
           'V','W','X','Y','Z','del','nothing','space']

MODEL_PATH = "model/cnn-model.h5"
MODEL_WEIGHTS = "model/cnn-model.weights.h5"

# LOAD THE MODEL
model = load_model(MODEL_PATH)
model.load_weights(MODEL_WEIGHTS)
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])
model._make_predict_function()

model.summary()

# IMAGE PROCESSING
datagen = ImageDataGenerator(
    samplewise_center=True,
    samplewise_std_normalization=True,
    preprocessing_function = lambda x: cv2.Sobel(x, cv2.CV_64F, 0, 1, ksize=5) ,
)

## PREDICT FUNCTION
def predict_letter(img):
    img = img.resize((64,64), Image.ANTIALIAS)
    img = np.array(img).reshape((1,64,64,3))
    img = datagen.flow(img, batch_size = 1)[0]

    y = model.predict(np.array(img))[0]
    return CLASSES[np.argmax(y)]


@app.route('/', methods=['GET'])
def hello():
    print('hi')
    return 'oh'


@app.route('/classify_letter', methods=['GET'])
def begin_classification():
    camera = cv2.VideoCapture(0)
    _, image = camera.read()
    cv2.imwrite('images/img.png', image)
    img = Image.open('images/img.png')
    del(camera)

    return predict_letter(img)
		

@app.route('/post', methods=['GET','POST'])
def post():
	if request.method == 'POST':
		return render_template('post.html')
	return render_template('get.html')


if __name__ == '__main__':
	#port = int(os.environ.get('PORT', 8000))
	#app.run(host='0.0.0.0', port=port,debug=True)
	app.run(debug=True)