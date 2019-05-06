import os
from os.path import join, dirname
import json
import requests
import time, operator
import cv2

CLASSES = ['A','B', 'C','D', 'E','F', 'G', \
           'H', 'I','J', 'K','L', 'M','N', \
           'O','P', 'Q','R', 'S','T', 'U', \
           'V','W','X','Y','Z','del','nothing','space']

def save(letter, index):
    camera = cv2.VideoCapture(0)
    return_value, image = camera.read()

    path = 'img_collection/' + letter + '/'
    if not os.path.exists(path):
        os.makedirs(path)

    filename = letter + '_' + str(index) + '.png'
    cv2.imwrite(path+filename, image)

    del(camera)


while True:
    letter = input("Letter to collect: ")

    for i in range (10):
        time.sleep(.5)
        save(letter, i)
        print('Saved '+ letter + str(i))
