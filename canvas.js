var offsetLeft =  0;
var offsetTop =  0;
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

    // Signature avec la souris //
    mouse: function (ctx, dessinElt) {
        var dessinElt = document.getElementById("canvas");
        var ctx = dessinElt.getContext("2d");
        // Propriétés graphiques
        ctx.strokeStyle = "#2d26ff";
        ctx.lineWidth = 2;

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
            ctx.clearRect(0, 0, dessinElt.width, dessinElt.height);
            dessinElt.width = dessinElt.width
        });
    },

    // Signature sur écran tactile // 
    touch: function (e) {
        
        this.touchmovezone = document.getElementById("canvas");
        this.ctx = this.touchmovezone.getContext("2d");

        this.touchmovezone.addEventListener("touchmove", function(e){
            canvas.draw(e,this)
        }, false);
        this.touchmovezone.addEventListener("touchend", function(e){
            canvas.end(e)
        }, false);
 
    },

    // Calcul du décalage  des coordonnées
    getOffset: function (obj) {
        do {
            if (!isNaN(obj.offsetLeft)) {
                this.offsetLeft += obj.offsetLeft;
            }
            if (!isNaN(obj.offsetTop)) {
                this.offsetTop += obj.offsetTop;
            }
        } while (obj = obj.offsetParent);
        return {
            left: this.offsetLeft,
            top: this.offsetTop
        };
        
    },
    // Ajout d'un tracé entre les points de touche
    draw: function (e) {
        var lastPt = null;
        this.touchmovezone = document.getElementById("canvas");
        this.ctx = this.touchmovezone.getContext("2d");
        e.preventDefault();
        this.offset = canvas.getOffset(this.touchmovezone);
        if (lastPt != null) {
            ctx.beginPath();
            ctx.moveTo(lastPt.x - this.offset.left, lastPt.y - this.offset.top);
            ctx.lineTo(e.touches[0].pageX - this.offset.left, e.touches[0].pageY - this.offset.top);

            // Propriétés graphiques
            ctx.strokeStyle = "#2d26ff";
            ctx.lineWidth = 2;
            ctx.stroke();
        }
        lastPt = {
            x: e.touches[0].pageX,
            y: e.touches[0].pageY
        };

        // Activation du bouton de confirmation
        document.getElementById("confirm").disabled = false;
        
    },

     // Arrêt de l'événement touchmove
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

            // Lancement du décompte de 20 min. après confirmation
            sessionStorage.clear();
            timer.decompte(station);

            // Rend le footer visible
            var validation = document.getElementById("validation")
            validation.style.visibility = "visible";

            // Masque la section réservation
            var reservation = document.getElementById("reservation")
            reservation.style.display = "none";
        });
    }
};