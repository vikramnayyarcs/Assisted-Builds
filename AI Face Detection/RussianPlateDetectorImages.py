import cv2
from random import randrange

#Loads pretrained face data from opencv (haar cascade algorithm).
trainedRussianPlateData = cv2.CascadeClassifier('haarcascade_russian_plate_number.xml')

img = cv2.imread('RussianPlates.jpg')

grayScaledImg = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY) #Allows colours to be represented in less bits also. Takes the image as an argument as well as the conversion type.

'''
Documentation available here: https://docs.opencv.org/2.4/modules/imgproc/doc/miscellaneous_transformations.html?highlight=.cvtcolor#cv2.cvtColor 
mixChannels allows more advanced conversions.
'''

#Detect plates:
plateCoordinates = trainedRussianPlateData.detectMultiScale(grayScaledImg)
print(plateCoordinates) #Stored in a 2d list.

for (x,y,w,h) in plateCoordinates: #Searches for faces.
    cv2.rectangle(img, (x,y),(x+w,y+h), (randrange(256),randrange(256),randrange(256)), 2) #Draws the rectangle for each face found. Uses random colours.

cv2.imshow('Plate Detector', img) #Shows the image for a split second, titles the window, staticImage is the image to be shown.
cv2.waitKey() #Stops the image from closing instantly. Pauses the execution of code. Closes onclick of a key.

print("Code completed") #Indicates that the code ran sucessfully.