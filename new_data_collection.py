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

def save(letter, index, camera):
    _, image = camera.read()
    image = cv2.resize(image,(200,200))

    path = 'img_collection/' + letter + '/'
    if not os.path.exists(path):
        os.makedirs(path)

    filename = letter + '_' + str(index) + '.png'
    cv2.imwrite(path+filename, image)
    del(camera)

camera = cv2.VideoCapture(0)
camera.set(cv2.CAP_PROP_FRAME_WIDTH, 600)
camera.set(cv2.CAP_PROP_FRAME_HEIGHT, 600)
while True:
    letter = input("Letter to collect: ")

    for i in range (600):
        save(letter, i, camera)
        print('Saved '+ letter + str(i))
