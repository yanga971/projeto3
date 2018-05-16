// OBJET TIMER
var timerElt = document.getElementById("validation");
var interval;
var duration = 30;
var station;


var timer = {

	init: function () {
		if (sessionStorage.length > 0) {
			this.getItem();
			this.chrono();

		} else {
			this.display();
		}
	},

	getItem: function () {
		this.name = sessionStorage.getItem("name");
		this.min = sessionStorage.getItem("min");
		this.sec = sessionStorage.getItem("sec");

	},

	chrono: function () {
		var duration = min + sec;
		clearInterval(interval);
		interval = setInterval(function () {
			temp = convert(duration);
			timerElt.textContent = "Vous avez déjà une réservation à la station " + station.name + temp;
			duration--;
			if (duration < 0) {
				stopDecompte(interval);
				timerElt.textContent = "Votre réservation est terminée.";
			}
		}, 1000)
	},

	display: function () {
		timerElt.textContent = "Vous n'avez pas de réservation.";

	},

	decompte: function (name) {

		clearInterval(interval);
		interval = setInterval(function () {
			temp = timer.convert(duration);
			console.log(name);
			timerElt.textContent = "Un vélo réservé à la station: " + name + temp;
			duration--;

			if (duration < 0) {
				timer.stopDecompte();
				//timerElt.textContent = "Votre réservation est terminée.";
				timer.display();
			}

		}, 1000)
	},

	convert: function (duration) {
		min = Math.floor(duration / 60) % 60;
		sec = duration % 60;

		return " pour une durée de " + min + " min " + sec + " s.";
	},

	stopDecompte: function () {
		clearInterval(interval);
		return timerElt.textContent = "Votre réservation est annulée."
	},

	save: function () {
		sessionStorage.setItem("min", min);
		sessionStorage.setItem("sec", sec);

	}
}; // Fin de l'objet timer