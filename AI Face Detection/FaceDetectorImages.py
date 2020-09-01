import cv2
from random import randrange

#Loads pretrained face data from opencv (haar cascade algorithm).
trainedFaceData = cv2.CascadeClassifier('haarcascade_frontalface_default.xml')
'''
Calls the opencv library.
CascadeClassifier - 'classifier', classes something as a face.
haarcascade:
Passes in training data, creates a classifier.
This dataset allows frontal faces to be detected.
'''
#Elon Musk's EM) co-ordinates: [[184 127 187 187]]
img = cv2.imread('EM.jpg') #Imports an image into opencv. Reads as numbers (pixels, 2d array)
#img = cv2.imread('MoneyTeam.jpg') #Multi person image.
'''
Static image indicates its from a file.
imread = image read (self explanatory).
JB.jpg is a picture of Elon Musk from the internet.
'''
#Uses built in methods to convert from RGB to greyscale.
grayScaledImg = cv2.cvtColor(img,cv2.COLOR_BGR2GRAY) #Allows colours to be represented in less bits also. Takes the image as an argument as well as the conversion type.
'''
Documentation available here: https://docs.opencv.org/2.4/modules/imgproc/doc/miscellaneous_transformations.html?highlight=.cvtcolor#cv2.cvtColor 
mixChannels allows more advanced conversions.
'''

'''
Change image to grayscale because colour doesn't define a face.
Haarcascade algorithm only works with gray scale faces.
OpenCV has already been trained to look for images which means all we have to do is feed the images into the algorithm to allow it to detect faces.
'''

#Detect faces:
faceCoordinates = trainedFaceData.detectMultiScale(grayScaledImg)
print(faceCoordinates) #Stored in a 2d list.
'''
trainedFaceData is the classifier for faces.
Calls the method detectMultiScale() on the classifier.
Looks for the overall composition of faces and wants to detect all of them.
Reference: https://docs.opencv.org/2.4/modules/objdetect/doc/cascade_classification.html?highlight=detectmultiscale
'Detects objects of different sizes in the input image. The detected objects are returned as a list of rectangles.', in our case, faces.
Returns the co-ordinates of the rectangles which then allows those rectangles to be drawn.
'''

#Draw a rectangle around a face, using method .rectangle()
'''
HARD CODED APPROACH. Only works for the Elon Musk image.
cv2.rectangle(img, (184,127), (184+187,115+187), (0,255,0), 5) #BGR sets colour to green, thicknes is 2 so quite thin.
'''

#Approach for multiple faces (dynamic approach rather than hard coded):
for (x,y,w,h) in faceCoordinates: #Searches for faces.
    cv2.rectangle(img, (x,y),(x+w,y+h), (randrange(256),randrange(256),randrange(256)), 2) #Draws the rectangle for each face found. Uses random colours.


'''
Takes in the image.
X and Y co-ordinates as a tuple (x,y)
X+width, Y+height (x+w,y+h). Top left and bottom right co-ordinates.
Image, point1, point2, colour, thickness.
RECTANGLE DOESN'T show if the image is in grey scale.
'''

cv2.imshow('Face Detector', img) #Shows the image for a split second, titles the window, staticImage is the image to be shown.
cv2.waitKey() #Stops the image from closing instantly. Pauses the execution of code. Closes onclick of a key.

print("Code completed") #Indicates that the code ran sucessfully.

'''
Breakdown of the Haar cascade object recognition algorithm:
Haar - name of the creator
Cascase - chain of events, going down a funnel, looking for a face. Passed through to amtch faces.

Haar features are building blocks:
Applied over an image, show the relationship between pixels.
    Edge features 
    Line features
    Four-rectangle features
    A combination of these features will create a face.
Looking for dark/light around faces. Looking for brightness, not colour.

Training a face detector:
1.) Start with training data.
    Faces (Positive)
    Non Faces (Negative) e.g. a phone.
    Supervised learning (humans teach the model).
    Unsupervised leaning (model teaches itself, unlabelled data)
2.) Find the winning Haar features.
        Eyes
        Cheek
    Test every winning Haar feature.
    Every TYPE,SIZE,LOCATION (gives a numberm right or wrong)
    Whichever Haar feature matches the training images closest is our first winner.

    trainCascadeObjectDetector() function#
3.) Once 1000 winner Haar features have been found they can be stored together in the face detector.
    Stored as an XML file.

OpenCV provides a pre-trained classifier that has the chain of haar features, best matching a frontal face.
After classification, pass a sliding window of the image into the classifier and it's run through the haar cascades.
If it reaches the end, it's a face.
'''

#Haar Cascade is NOT 100% accurate. Goes for speed over accuracy.