var dessinElt;
var ctx;
var lastPt = null;

// Objet canvas
var canvas = {
    // Initialisation 
    init: function (station) {
        this.canvas();
        this.touchDevice();
        this.mouse();
        this.touch();
        this.confirm(station);
        this.pen();
    },

    // Création du canvas
    canvas: function () {
        var canvasElt = document.createElement("canvas");
        canvasElt.id = "canvas";
        canvasElt.width = 280;
        canvasElt.height = 320;
        document.getElementById("bikeReservation").appendChild(canvasElt);

        // Masque le footer
        var validation = document.getElementById("validation")
        validation.style.visibility = "hidden";

        // Apparition de la section réservation
        var reservation = document.getElementById("reservation")
        reservation.style.display = "block";

    },
    // Contexte canvas
    style: function() {
        dessinElt = document.getElementById("canvas");
        ctx = dessinElt.getContext("2d");
        // Propriétés graphiques
        ctx.strokeStyle = "#101010";
        ctx.lineWidth = 2;
    },
    // Vérification si écran tactile
    touchDevice: function (e) {
        try {
            document.createEvent("TouchEvent");
            console.log(true);
            return true;
        } catch (e) {
            console.log(false);
            return false;
        }
    },

    //  Méthode signature avec la souris //
    mouse: function () {
        // Appel méthode contexte canvas
        this.style();
        // Propriétés canvas
        var canvas = false;

        // Bouton de souris activé
        dessinElt.onmousedown = function (e) {
            // Dessin activé
            canvas = true;

            // Activation du bouton de confirmation
            document.getElementById("confirm").disabled = false;

            // Repositionnement du début du tracé
            ctx.moveTo(e.offsetX, e.offsetY);
        };

        // Mouvement de souris
        dessinElt.onmousemove = function (e) {
            if (canvas) dessiner(e.offsetX, e.offsetY);
        };

        // Bouton de souris relâché
        dessinElt.onmouseup = function (e) {
            // Dessin désactivé
            canvas = false;
        };

        // Ajoute un tracé
        function dessiner(x, y) {
            ctx.lineTo(x, y);
            ctx.stroke();
        };

        // Création du bouton "Effacer"
        var clearElt = document.createElement("button");
        clearElt.id = "clear";
        clearElt.textContent = "Effacer";
        document.getElementById("bikeReservation").appendChild(clearElt);

        // Efface le contenu du canvas
        document.getElementById("clear").addEventListener("click", function () {
            dessinElt.width = dessinElt.width
            ctx.clearRect(0, 0, dessinElt.width, dessinElt.height);
            
        });
    },

    // Méthode signature sur écran tactile // 
    touch: function (e) {
        
        // Appel méthode contexte canvas
        this.style();

        // Méthode de gestionnaire d'événements 
        dessinElt.addEventListener("touchmove", function(e){
            canvas.draw(e)
        }, false);
        dessinElt.addEventListener("touchend", function(e){
            canvas.end(e)
        }, false);
 
    },

    // Ajout d'un tracé entre les points de touche
    draw: function (e) {
        e.preventDefault();

        // Méthode afin de renvoyer les coordonnées par rapport à la fenêtre du navigateur
        // Puis correction du décalage des coordonnées avec l'élément canvas situé dans le document
        var rect = dessinElt.getBoundingClientRect();
        
        // Si détection d'un point on dessine
        if (lastPt != null) {
            ctx.beginPath();
            ctx.moveTo(lastPt.x , lastPt.y);
            ctx.lineTo(e.touches[0].clientX - rect.left, e.touches[0].clientY - rect.top);
            // this.style();
            ctx.stroke();
        }

        // stocke chaque dernier point lorsque événement touchmove est appelé 
        lastPt = {
            x: e.touches[0].clientX - rect.left,
            y: e.touches[0].clientY - rect.top
        };

        // Activation du bouton de confirmation
        document.getElementById("confirm").disabled = false;
        
    },

     // Arrêt de l'événement touchmove en ne stockant pas le dernier point
     end:function (e) {
       e.preventDefault();
        lastPt = null;
    },

    // Création d'un logo dans le canvas
    pen: function () {
        var crayonElt = document.createElement("img");
        crayonElt.id = "crayon";
        crayonElt.src = "images/crayon/crayon.svg";
        crayonElt.alt = "dessin d'un crayon";
        document.getElementById("bikeReservation").appendChild(crayonElt);
    },

    // Création du bouton "confirmer" afin de valider la réservation
    confirm: function (station) {
        var confirmElt = document.createElement("button");
        confirmElt.id = "confirm";
        confirmElt.textContent = "Confirmer";
        document.getElementById("bikeReservation").appendChild(confirmElt);
        confirmElt.disabled = true;

        // Désactivation du bouton confirmer  si click sur  le bouton "clear"
        document.getElementById("clear").addEventListener("click", function () {
            confirmElt.disabled = true;
        });

        // Ajout d'un écouteur d'évènement sur le bouton de confirmation (lancement du décompte)
        confirmElt.addEventListener("click", function () {
            // Remplacement d'un précédent canvas éventuel
            bikeReservation.removeChild(document.getElementById("canvas"));
            bikeReservation.removeChild(document.getElementById("confirm"));
            bikeReservation.removeChild(document.getElementById("clear"));
            bikeReservation.removeChild(document.getElementById("crayon"));

            // Rend le footer visible
            var validation = document.getElementById("validation")
            validation.style.visibility = "visible";

            // Masque la section réservation
            var reservation = document.getElementById("reservation")
            reservation.style.display = "none";

            // Lancement du décompte de 20 min. après confirmation
            sessionStorage.clear();
            timer.decompte(station);
        
        });
    }
};