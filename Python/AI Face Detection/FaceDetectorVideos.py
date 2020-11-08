import cv2
from random import randrange

#Loads pretrained face data from opencv (haar cascade algorithm).
trainedFaceData = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')

#Detecting faces in videos.
webcam = cv2.VideoCapture(0) #Stores the video in a variable, 0 indicates the default webcam of the device. Alternatively could use a video file, .mp4

#Loop through the video frames forever:
while True:
    successfullFrameRead,frame = webcam.read() #Returns a tuple. BOOLEAN(if it was successful to read an image) AND the frame currently being read from the webcam.

    #Convert frame to grayscale as faces aren't determined by colour.
    grayscaledFrame = cv2.cvtColor(frame,cv2.COLOR_BGR2GRAY)

    #Detect faces:
    faceCoordinates = trainedFaceData.detectMultiScale(frame)

    #Approach for multiple faces (dynamic approach rather than hard coded):
    for (x,y,w,h) in faceCoordinates: #Searches for faces.
        cv2.rectangle(frame, (x,y),(x+w,y+h), (randrange(256),randrange(256),randrange(256)), 2) #Draws the rectangle for each face found. Uses random colours.

    cv2.imshow('Face Detector from Videos', frame) #Changes colour each frame.
    #Without waitKey it waits forever before the next frame loads.
    cv2.waitKey(1) #Waits 1 millisecond before auto hitting a key. Each frame happens per millisecond.
'''
A video is just images, one after another.
To detect faces in videos, the same code can be used but just looping through it.
'''

