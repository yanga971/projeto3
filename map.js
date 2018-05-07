var googleMap;
// Objet map
var map =  {

  // Initialisation de la carte
  initMap : function(){
                options = {
                center: new google.maps.LatLng(45.764043,4.835659),
                zoom: 11
              };
                googleMap = new google.maps.Map(document.getElementById('googleMap'), options)
            },

  // Ajout de markers pour chaque stations de vélos
  markers : function(){
              var markers = [];
              ajaxGet('https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=c18bf95eec3f31e26c33a30a925adbdb7ed3cc55', function (stations){
                stations = JSON.parse(stations);
                stations.forEach(function(station) {
                  // Création d'un marqueur pour chaque station
                  var markers = new google.maps.Marker({
                    position: station.position,
                    map: googleMap
                  });
                });
              });
              //Ajout du marqueur dans le tableau
              markers.push("stations");
            }
}; // Fin de l'objet map

map.initMap();
map.markers();
