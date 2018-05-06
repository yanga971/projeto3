var map =  {

  // Initialisation de la carte
  initMap : function(){
              var options = {
                center: new google.maps.LatLng(45.764043,4.835659),
                zoom: 11
              };
              this.googleMap = new google.maps.Map(document.getElementById('googleMap'), options)
            },

  // Ajout d'un marker
  marker : function(){
              new google.maps.Marker({
                position:{lat:45.764043,lng:4.835659},
                map:this.googleMap
              });
            }
}; // Fin de l'objet map

map.initMap();
map.marker();
