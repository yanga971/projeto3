// OBJET TIMER

var timerElt = document.getElementById("validation");
var interval;
var duration = 60;
var station;

var timer = {

	init: function(){

	  if(sessionStorage.length > 0){
	  	  this.getItem();
		    this.chrono();
	  }else {
	       this.display();
	  }
	},

	getItem: function(){
		 this.name = sessionStorage.getItem("name");
		 this.min = sessionStorage.getItem("min");
		 this.sec = sessionStorage.getItem("sec");

	},

	chrono: function(){

		var duration = this.min + this.sec;
		clearInterval(interval);
		interval = setInterval(function(){
			var temp = convert(duration);
			timerElt.textContent = "Vous avez déjà une réservation à la station " + name + temp;
			duration--;
			if(duration < 0){
				stopDecompte();
				timerElt.textContent = "Votre réservation est terminée.";
			}
		},1000)
	},

	display: function(){
	         timerElt.textContent = "Vous n'avez pas de réservation.";

	},

	decompte: function(name){
		var convert =  function(duration){
				min = Math.floor(duration/60) % 60;
				sec = duration % 60;

				return " pour une durée de " + min + " min " + sec + " s.";
			};
		  clearInterval(interval);
		  interval = setInterval(function(){
				temp = convert(duration);
				timerElt.textContent = "Un vélo réservé à la station: " + name + temp;
				duration--;

				if(duration < 0){
					stopDecompte();
					timerElt.textContent = "Votre réservation est terminée.";
					timer.display();
				}

		   	},1000)
	},

	stopDecompte: function(){
			clearInterval(interval);
			sessionStorage.clear();
			window.removeEventListener("unload", timer.save());
			// timerElt.textContent = "Votre réservation est terminée.";

	},

	// convert: function(duration){
	// 		this.min = Math.floor(duration/60) % 60;
	// 		this.sec = duration % 60;
	//
	// 		return " pour une durée de " + this.min + " min " + this.sec + " s.";

		//////confirmElt.addEventListener("click", timer.decompte()); A SORTIR//////
	// },

	save: function(){
		sessionStorage.setItem("min", min);
		sessionStorage.setItem("sec", sec);
	//      //////window.addEventListener("unload", timer.save()); A SORTIR/////
	},

	cancel: function(){
		   stopDecompte();
		   timerElt.textContent = "Votre réservation est annulée."
	}

}; // Fin de l'objet timer
// timer.init();
// timer.decompte(station,name);
