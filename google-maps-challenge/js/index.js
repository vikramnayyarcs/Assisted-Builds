window.alert("Welcome to My Store Locator, it's worth over $5000 on Upwork!!");

//Variables for the map, markers (initally null since no stores found) and the info window.
var map;
var markers = [];
var infoWindow;

function initMap() { //Constructor for the map.
    var losAngeles = { //Variable holding the values for LA.
        lat: 34.063380,
        lng: -118.358080
    }
    map = new google.maps.Map(document.getElementById('map'), { //Creates a new map, references the API.
        center: losAngeles, //Uses the losAngeles value to centre which is the first thing seen.
        zoom: 8, //Defines the zoom level.
        //Style credit: https://snazzymaps.com/style/231466/coffee-to-go
        styles: [
            {
                "featureType": "administrative",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#444444"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#f2f2f2"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#e1f1e7"
                    }
                ]
            },
            {
                "featureType": "landscape.natural",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#61c786"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.landcover",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    },
                    {
                        "weight": "1.04"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ff0000"
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry",
                "stylers": [
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape.natural.terrain",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                    {
                        "saturation": -100
                    },
                    {
                        "lightness": 45
                    },
                    {
                        "visibility": "off"
                    },
                    {
                        "hue": "#edff00"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "hue": "#ff0000"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#575757"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#ffffff"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "color": "#c8cede"
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ]

    });
    infoWindow = new google.maps.InfoWindow(); //Constructor for the information window.
    searchStores(); //Calls this method so that the user is able to search for stores.
}

function searchStores(){ //Called everytime the search button is pressed.
    var foundStores = []; //Initially null because no searches are made at the start.
    var zipCode = document.getElementById('zip-code-input').value; //Gets the user's input and stores in a variable.
    if(zipCode){ //If a zip code is supplied...
        stores.forEach(function(store){ //Loop through all the stores.
            var postal = store.address.postalCode.substring(0,5); //Only consider the first 5 digits of the ZIP code as that's all that's needed.
            if(zipCode.length<5){ //LENGTH CHECK
                document.getElementById('zip-code-input').style.background = "#FF9F9F";
                window.alert("Zipcode needs to be at least 5 characters. Please input again.").close();
             }else if(postal == zipCode){ //If the input matches the zip code stored for any stores ...
                foundStores.push(store); //Add them to the list.
                document.getElementById('zip-code-input').style.background = "#54f542";
        }});
    } else { //Otherwise if no stores are found.
        foundStores = stores; //Make this equal to stores to ensure other functions don't crash.
    }
    //Functions to be called everytime there's a search:
    clearLocations()  //Gets rid of any markers.
    displayStores(foundStores); //Displays all stores that match.
    showStoresMarkers(foundStores); //Displays the markers.
    setOnClickListener(); //When the button is pressed ...
}

function clearLocations() { //Gets rid of locations.
    infoWindow.close(); //Closes any information windows.
    for (var i = 0; i < markers.length; i++) { //Loops through where there were markers.
      markers[i].setMap(null); //Gets rid of them by setting to null.
    }
    markers.length = 0; //Indicates no markers set.
}

function setOnClickListener() { //When the button is pressed.
    var storeElements = document.querySelectorAll('.store-container'); //Adjusts the CSS for all elements that match.
    storeElements.forEach(function(elem, index){
        elem.addEventListener('click', function(){
            google.maps.event.trigger(markers[index], 'click');
        })
    });
}

function displayStores(stores) { //Displays stores when called.
    var storesHtml = ""; //Initially set to null because none are found.
    stores.forEach(function(store, index){ //Displays the address and phone number for each matching store.
        var address = store.addressLines;
        var phone = store.phoneNumber;
        storesHtml += `
            <div class="store-container">
                <div class="store-container-background">
                    <div class="store-info-container">
                        <div class="store-address">
                            <span>${address[0]}</span>
                            <span>${address[1]}</span>
                        </div>
                        <div class="store-phone-number">${phone}</div>
                    </div>
                    <div class="store-number-container">
                        <div class="store-number">
                            ${index+1}
                        </div>
                    </div>
                </div>
            </div>
        `
    });
    document.querySelector('.stores-list').innerHTML = storesHtml;
}


function showStoresMarkers(stores) { //Shows the markers when called.
    var bounds = new google.maps.LatLngBounds(); //
    stores.forEach(function(store, index){
        var latlng = new google.maps.LatLng(//Stores the latitude and longitude in variables.
            store.coordinates.latitude,
            store.coordinates.longitude);
        //Stores the information for each store in variables.
        var name = store.name;
        var address = store.addressLines[0];
        var statusText = store.openStatusText;
        var phone = store.phoneNumber;
        bounds.extend(latlng);
        createMarker(latlng, name, address, statusText, phone, index); //Constructs marker for each store.
    })
    map.fitBounds(bounds);
}

/*
${} Indicates a variable e.g. a different store name for each store.
*/

function createMarker(latlng, name, address, statusText, phone, index) { //Creates the marker when called.
    var html = `
        <div class="store-info-window">
            <div class="store-info-name">
                ${name}
            </div>
            <div class="store-info-status">
                ${statusText}
            </div>
            <div class="store-info-address">
                <div class="circle">
                    <i class="fas fa-location-arrow"></i>
                </div>
                ${address}
            </div>
            <div class="store-info-phone">
                <div class="circle">
                    <i class="fas fa-phone-alt"></i>
                </div>
                ${phone}
            </div>
        </div>
    `;
    var marker = new google.maps.Marker({ //Constructor, using the API to create new markers,
      map: map,
      icon: {
        url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
      },
      position: latlng,
      label: `${index+1}` //Increments by 1 each time so that the label on the marker goes from 1-50.
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker); //Adds a new marker to the list.
}
