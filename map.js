var googleMap;
var markers;

var map = {

  // Initialisation de la carte
  initMap: function () {
    this.options = {
      center: new google.maps.LatLng(45.764043, 4.835659),
      zoom: 11
    };
    googleMap = new google.maps.Map(document.getElementById('googleMap'), this.options);

    //création du marqueur
            var marqueur = new google.maps.Marker({
                position: new google.maps.LatLng(48.040327313069206, 7.1324036910591015),
                map: googleMap
            });


    // Récupération des stations JC Decaux
    ajaxGet('https://api.jcdecaux.com/vls/v1/stations?contract=Lyon&apiKey=c18bf95eec3f31e26c33a30a925adbdb7ed3cc55', function (stations) {
      stations = JSON.parse(stations);

      // Création d'un objet afin de transmettre la carte et le tableau des markers
      markerClusterer = new MarkerClusterer(googleMap, markers, {
        imagePath: 'images/markerclusterer/m'
      });

      // Récupération des données
      stations.forEach(function(station){
        marker = new google.maps.Marker({
          position: station.position,
          map: googleMap
        });

        // Ajout du marqueur sur la carte
        markerClusterer.addMarker(marker);

        // Ajout d'un événement sur chaque marqueur
        marker.addListener("click", function () {

          // Suppression des éléments éventuels dans aside
          var clear = document.getElementById("stationDetails");
          while (clear.firstChild) {
            clear.removeChild(clear.firstChild);
          }

          // Affichage des informations sur la station désirée
          aside.init(station);
        });
      });
    })
  }
};
