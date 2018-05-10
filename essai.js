var googleMap;
var markers;
var marker = [];
var stations;
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
                    var stations = JSON.parse(stations);
                    console.log(stations);
                    //console.table(stations);

                      var markers = [];

                    // Création d'un objet afin de transmettre la carte et le tableau des markers
                    var markerClusterer = new MarkerClusterer(googleMap, markers, {
                        imagePath: 'images/markerclusterer/m'
                    });

                    //Récupération de l'ensemble des markers
                      for (i = 0; i < stations.length; i++){

                          var marker = new google.maps.Marker({
                              position: new google.maps.LatLng(stations[i].position.lat, stations[i].position.lng),
                              map: googleMap,

                          });

                          markers.push(stations[i]);
                      // Ajout du marqueur sur la carte
                      markerClusterer.addMarker(marker);

                      // Ajout d'un événement sur chaque marqueur
                      marker.addListener("click", function(){
                          aside.nameStation(stations);
                       });
                    } // Fin de la boucle for

                  }) // ajaxGet
              } // fin initMap


}; // Fin de l'objet map

map.initMap();
