
var map =  {

  // Initialisation de la carte
  initMap : function(){
     var options = {
       center: new google.maps.LatLng(45.764043,4.835659),
       zoom: 11
     };
     var googleMap = new google.maps.Map(document.getElementById('googleMap'), options)
  }

}; //
map.initMap();
