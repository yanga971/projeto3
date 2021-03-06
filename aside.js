//Panneau d'informations sur la station de vélo

var aside = {
  init: function (station) {
    this.details();
    this.title();
    this.nameStation(station);
    this.address(station);
    this.status(station);
    this.availableBikes(station);
    this.availableBikeStand(station);
    this.reserver(station);
  },

  //Informations sur la station sélectionnée
  details: function () {
    detailsElt = document.createElement("div");
    detailsElt.id = "details";
    document.getElementById("stationDetails").appendChild(detailsElt);
  },

  // Titre du panneau d'information
  title: function () {
    h2Elt = document.createElement("h2");
    h2Elt.id = "title";
    document.getElementById("details").appendChild(h2Elt);
    h2Elt = document.getElementById("title");
    h2Elt.textContent = "Détails de la station";
  },

  //Nom de la station
  nameStation: function (station) {
    h3Elt = document.createElement("h3");
    h3Elt.id = "nameStation";
    document.getElementById("details").appendChild(h3Elt);
    h3Elt = document.getElementById("nameStation");
    h3Elt.textContent = station.name;
  },

  //Adresse de la station
  address: function (station) {
    addressElt = document.createElement("p");
    addressElt.id = "address";
    document.getElementById("details").appendChild(addressElt);
    addressElt = document.getElementById("address");
    addressElt.textContent = "Adresse : " + station.address;
  },

  //Etat de la station(ouverte ou fermée)
  status: function (station) {
    var statusElt = document.createElement("p");
    statusElt.id = "status";
    document.getElementById("details").appendChild(statusElt);
    var statusElt = document.getElementById("status");
    statusElt.textContent = "Etat de la station : " + station.status;
  },

  //Nombre de vélos disponibles
  availableBikes: function (station) {
    var availableBikesElt = document.createElement("p");
    availableBikesElt.id = "availableBikes";
    document.getElementById("details").appendChild(availableBikesElt);
    var availableBikesElt = document.getElementById("availableBikes");
    availableBikesElt.textContent = "Vélos disponibles : " + station.available_bikes;

  },

  //Nombre de places disponibles
  availableBikeStand: function (station) {
    var availableBikeStandElt = document.createElement("p");
    availableBikeStandElt.id = "availableBikeStand";
    document.getElementById("details").appendChild(availableBikeStandElt);
    var availableBikeStandElt = document.getElementById("availableBikeStand");
    availableBikeStandElt.textContent = "Places disponibles : " + station.available_bike_stands;
  },

  //Bouton "réservez"
  reserver: function (station) {
    var buttonElt = document.createElement("button");
    document.getElementById("details").appendChild(buttonElt);
    buttonElt.id = "btn";
    buttonElt = document.getElementById("btn");
    buttonElt.textContent = "Réservez";

    //Activation du bouton "réservez" si la station est ouverte
    if (station.status !== "OPEN") {
      document.getElementById("btn").setAttribute("disabled", "disabled");

      //Activation du bouton "réservez" si vélos disponibles 
    } else if (station.available_bikes === 0) {
      document.getElementById("btn").setAttribute("disabled", "disabled");
    } else {
      document.getElementById("btn").removeAttribute("disabled");
    }

    //Ajout d'un écouteur d'événement sur le bouton de réservation (apparition du canvas) 
    buttonElt.addEventListener("click", function () {
      canvas.init(station);

      //Désactivation du bouton de réservation si canvas 
      document.getElementById("btn").disabled = true;
    });
  }
};