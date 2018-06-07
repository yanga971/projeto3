// Création du canvas

var canvas = {
    // Initialisation du canvas
    init: function (station) {
        var canvasElt = document.createElement("canvas");
        canvasElt.id = "canvas";
        document.getElementById("bikeReservation").appendChild(canvasElt);
        this.touchDevice();
        this.dessin();
        this.confirm(station);
        this.crayon();
    },

    // Vérification si écran tactile
    touchDevice: function () {
        try {
            document.createEvent("TouchEvent");
            console.log(true);
            return true;
        } catch (e) {
            console.log(false);
            return false;
        }
    },

    dessin: function () {
        var dessinElt = document.getElementById("canvas");
        var ctx = dessinElt.getContext("2d");
        // Propriétés graphiques
        ctx.strokeStyle = "#101010d1";
        ctx.lineWidth = 2;

        // Propriétés canvas
        var canvas = false;

        // Signature avec la souris //
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

        // Ajoute un segment au tracé
        function dessiner(x, y) {
            ctx.lineTo(x, y);
            ctx.stroke();
        };

        // Signature sur écran tactile // 
        if (canvas.touchDevice = true) {

            // Activation
            dessinElt.addEventListener("touchstart", function (e) {
                var mouseEvent = new MouseEvent("mousedown", {});
                dessinElt.dispatchEvent(mouseEvent);
                // Activation du bouton de confirmation
                document.getElementById("confirm").disabled = false;

            }, false);

            // Détection des mouvements
            dessinElt.addEventListener("touchmove", function (e) {
                var touch = e.touches[0];
                //console.log(touch);
                var mouseEvent = new MouseEvent("mousemove", {
                    clientX: touch.clientX,
                    clientY: touch.clientY
                });
                dessinElt.dispatchEvent(mouseEvent);
            }, false);

            // Désactivation 
            dessinElt.addEventListener("touchend", function (e) {
                var mouseEvent = new MouseEvent("mouseup", {});
                dessinElt.dispatchEvent(mouseEvent);
            }, false);

            // Arrêt du scrolling pendant la signature
            document.body.addEventListener('touchmove', function (e) {
                e.preventDefault();
            }, false);
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

    // Création d'un logo dans le canvas
    crayon: function () {
        var crayonElt = document.createElement("img");
        crayonElt.id = "crayon";
        crayonElt.src = "images/crayon/crayon.svg";
        crayonElt.alt = "dessin d'un crayon";
        document.getElementById("bikeReservation").appendChild(crayonElt);
    },

    // Création du bouton "confirmer" afin de valider la réservation
    confirm: function (station, name) {
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
            timer.decompte(station);
            sessionStorage.clear();
        });
    }
};