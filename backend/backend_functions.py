# -*- coding: utf-8 -*-

# imports 
from keras.utils import get_file
from keras.models import load_model
from keras.preprocessing.image import ImageDataGenerator
from PIL import Image
import numpy as np
import cv2
from random import shuffle

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

# IMAGE PROCESSING

datagen = ImageDataGenerator(
    samplewise_center=True,
    samplewise_std_normalization=True,
    preprocessing_function = lambda x: cv2.Sobel(x, cv2.CV_64F, 0, 1, ksize=5) ,
)

## ACTUAL PREDICT FUNCTION

def predict_letter(img):
    img = img.resize((64,64), Image.ANTIALIAS)
    img = np.array(img).reshape((1,64,64,3))
    img = datagen.flow(img, batch_size = 1)[0]

    y = model.predict(np.array(img))[0]
    return CLASSES[np.argmax(y)]

## EXAMPLE USAGE ### 
# a = Image.open("asl-alphabet/asl_alphabet_train/R/R1577.jpg")
# predict_letter(a)

# model.summary()

camera = cv2.VideoCapture(0)
return_value, image = camera.read()
cv2.imwrite('images/img.png', image)

a = Image.open("images/img.png")
print(predict_letter(a))

"""
words = open("words.txt", "r").readlines()
words = [word[:-1] for word in words]
shuffle(words)

def wordGenerator():
    for word in words:
        yield word
        
wordgen = wordGenerator()
get_random_word = lambda : next(wordgen)

# USE TO GET RANDOM WORD

get_random_word()
"""