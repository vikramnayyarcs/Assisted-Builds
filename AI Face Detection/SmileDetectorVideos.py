import cv2
from random import randrange

trainedSmileData = cv2.CascadeClassifier('haarcascade_smile.xml')

webcam = cv2.VideoCapture(0)

while True:
    successfullFrameRead,frame = webcam.read() 

    grayscaledFrame = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)

    smileCoordinates = trainedSmileData.detectMultiScale(frame)

    for (x,y,w,h) in smileCoordinates: 
        cv2.rectangle(frame, (x,y),(x+w,y+h), (randrange(256),randrange(256),randrange(256)), 2)

    cv2.imshow('Smile Detector from Videos', frame) 
    #Without waitKey it waits forever before the next frame loads.
    cv2.waitKey(1) #Waits 1 millisecond before auto hitting a key. Each frame happens per millisecond