import cv2
from random import randrange

trainedSmileData = cv2.CascadeClassifier('haarcascade_smile.xml')

img = cv2.imread('EM.jpg')

grayScaledImg = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY) #Allows colours to be represented in less bits also. Takes the image as an argument as well as the conversion type.

#Detect Eyes
smileCoordinates = trainedSmileData.detectMultiScale(grayScaledImg)
print(smileCoordinates) #Stored in a 2d list.

for (x,y,w,h) in smileCoordinates: #Searches for faces.
    cv2.rectangle(img, (x,y),(x+w,y+h), (randrange(256),randrange(256),randrange(256)), 2) #Draws the rectangle for each face found. Uses random colours.

cv2.imshow('Smile Detector', img) #Shows the image for a split second, titles the window, staticImage is the image to be shown.
cv2.waitKey() #Stops the image from closing instantly. Pauses the execution of code. Closes onclick of a key.

print("Code completed") #Indicates that the code ran sucessfully.