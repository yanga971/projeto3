// Panneau d'informations sur la station de vélo

// Objet aside
var aside = {
     init: function(){
              aside.information();
              aside.btn();
            },

    // Titre du panneau d'informations
    information: function(){
                    var h2Elt = document.createElement("h2");
                    h2Elt.id = "information";
                    h2Elt.textContent = "Détails de la station";
                    document.getElementById("stationDetails").appendChild(h2Elt);
                    // h2Elt.style.display = "none";
                  },

    // Bouton "réservez"
    btn: function(){
            var buttonElt = document.createElement("button");
            buttonElt.id = "btn";
            buttonElt.textContent = "Réservez";
            document.getElementById("stationDetails").appendChild(buttonElt);
            buttonElt.disabled = true;
          },

    // Nom de la station
    nameStation: function(station){
                    var h3Elt = document.createElement("h3");
                    h3Elt.id = "nameStation";
                    document.getElementById("information").appendChild(h3Elt);
                    //h3Elt.style.display = "none";
                  },

    // Adresse de la station
    address: function(station){
                var addressElt = document.createElement("p");
                addressElt.id = "address";
                document.getElementById("information").appendChild(addressElt);
                //addressElt.style.display = "none";
              },

    // Etat de la station(ouverte ou fermée)
    status: function(station){
              var statusElt = document.createElement("p");
              statusElt.id = "status";
              document.getElementById("information").appendChild(statusElt);
              //statusElt.style.display = "none";
            },

    // Nombre de vélos disponibles
    availableBikes: function(){
                      var availableBikesElt = document.createElement("p");
                      availableBikesElt.id = "availableBikes";
                      document.getElementById("information").appendChild(availableBikesElt);
                    },

    // Nombre de places disponibles
    availableBikeStand: function(){
                          var availableBikeStandElt = document.createElement("p");
                          availableBikeStandElt.id = "availableBikeStand";
                          document.getElementById("information").appendChild(availableBikeStandElt);
                        }

}; //Fin de l'obet aside

// aside.init();
//aside.nameStation();
// aside.address();
// aside.status();
// aside.availableBikes();
// aside.availableBikeStand();
