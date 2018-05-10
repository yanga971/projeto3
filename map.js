var googleMap;
var markers;

// Objet map
var map =  {

  // Initialisation de la carte
  initMap : function(){
                options = {
                center: new google.maps.LatLng(45.764043,4.835659),
                zoom: 11
                };
                googleMap = new google.maps.Map(document.getElementById('googleMap'), options);

                // Récupération des stations JC Decaux
                ajaxGet('https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=c18bf95eec3f31e26c33a30a925adbdb7ed3cc55', function(stations){
                    stations = JSON.parse(stations);
                    // console.log(stations);
                    //console.table(stations);

                    // Création d'un objet afin de transmettre la carte et le tableau des markers
                    var markerClusterer = new MarkerClusterer(googleMap, markers, {
                        imagePath: 'images/markerclusterer/m'
                    });

                    // Récupération des données
                    stations.forEach(function(station) {
                      marker = new google.maps.Marker({
                      position: station.position,
                      map: googleMap
                    });

                    // Ajout du marqueur sur la carte
                    markerClusterer.addMarker(marker);

                    // Ajout d'un événement sur chaque marqueur
                    marker.addListener("click", function(){

                        // Nom de la station
                        aside.nameStation(station);
                        var h3Elt = document.getElementById("nameStation");
                        h3Elt.textContent = station.name;

                        // Adresse de la station
                        aside.address(station);
                        var addressElt = document.getElementById("address");
                        addressElt.textContent = "Adresse : "  + station.address;

                        // Etat de la station (ouverte ou fermée)
                        aside.status(station);
                        var statusElt = document.getElementById("status");
                        statusElt.textContent = "Etat de la station : " + station.status;

                        // Nombre de vélos disponibles
                        aside.availableBikes();
                        var availableBikesElt = document.getElementById("availableBikes");
                        availableBikesElt.textContent = "Vélos disponibles : " + station.available_bikes;

                        // Nombre de places disponibles
                         aside.availableBikeStand();
                         var availableBikeStandElt = document.getElementById("availableBikeStand");
                         availableBikeStandElt.textContent = "Places disponibles : " + station.available_bike_stands;
                    });
                  }) // fin de forEach
                }) // ajaxGet
              } // fin initMap
}; // Fin de l'objet map

// map.initMap();
