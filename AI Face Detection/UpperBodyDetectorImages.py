import cv2
from random import randrange

trainedUpperBody = cv2.CascadeClassifier('haarcascade_upperbody.xml')

img = cv2.imread('UBTEST.jpg')

grayScaledImg = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY)

upperBodyCoordinates = trainedUpperBody.detectMultiScale(grayScaledImg)
print(upperBodyCoordinates) #Stored in a 2d list.

for (x,y,w,h) in upperBodyCoordinates: #Searches for faces.
    cv2.rectangle(img, (x,y),(x+w,y+h), (randrange(256),randrange(256),randrange(256)), 2)

cv2.imshow('Eye Detector', img) #Shows the image for a split second, titles the window, staticImage is the image to be shown.
cv2.waitKey() #Stops the image from closing instantly. Pauses the execution of code. Closes onclick of a key.