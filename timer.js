// OBJET TIMER
var timerElt = document.getElementById("validation");
var interval;

var timer = {
	init: function () {
		if (sessionStorage.length > 0) {
			// Vérification si données enregistrées dans sessionStorage
			this.getItem(this.name, this.duration);

			// Si oui,lancement du temps restant au moment de l'actualisation de la page
			this.decompte(this.name, this.duration);
		} else {
			this.display();
		}
	},

	// Renvoie d'éventuelles données enregistrées
	getItem: function (name, duration) {
		this.name = sessionStorage.getItem("name");
		this.duration = sessionStorage.getItem("duration");
	},

	display: function () {
		timerElt.textContent = "Vous n'avez pas de réservation.";
	},

	// Décompte de 20 minutes lorsqu'il y a une réservation validée
	decompte: function (station, duration) {
		clearInterval(interval);
		var duration = 1200;
		var durationRefresh = sessionStorage.durationRefresh;

		interval = setInterval(function () {
			tps = timer.convert(duration);
			timerElt.textContent = "Un vélo réservé à la station: " + station.name + " pour une durée de " + tps[0] + " min " + tps[1] + " s.";
			duration--;

			// Enregistrement des données si actualisation de la page du navigateur
			timer.save(station.name, duration);

			// Temps restant après une actualisation de la page du navigateur
			if (sessionStorage.length > 0) {
				duration = durationRefresh;
				tps = timer.convert(durationRefresh);
				timerElt.textContent = "Vous avez déjà une réservation à la station: " + station + " pour une durée de " + tps[0] + " min " + tps[1] + " s.";
				durationRefresh--;
				timer.save(station, durationRefresh);
			}

			// Décompte terminé
			if (duration < 0) {
				// Arrêt du décompte
				clearInterval(interval);
				// Effacement des données éventuelles dans sessionStorage
				sessionStorage.clear();
				// Suppression du panneau d'informations
				aside.details();
				// Réinitialisation de l'affichage de la page
				timer.display();
			}
		}, 1000)
	},

	// Conversion des secondes en minutes et secondes
	convert: function (duration) {
		// Création d'un tableau afin de stocker les données
		tps = [];

		// Conversion
		min = Math.floor(duration / 60) % 60;
		sec = duration % 60;

		// Stockage des données récoltées dans le tableau
		tps.push(min, sec);
		return tps;
	},

	// Enregistrement des données si actualisation de la page du navigateur
	save: function (name, duration) {
		window.addEventListener("unload", function () {
			sessionStorage.setItem("name", name)
			sessionStorage.setItem("durationRefresh", duration);
		});
	}
}; // Fin objet timer