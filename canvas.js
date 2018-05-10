// Création du canvas

// Objet canvas
var canvas = {

        // Initialisation du canvas
        init: function(){
            var canvasElt = document.createElement("canvas");
            canvasElt.id = "canvas";
            document.getElementById("bikeReservation").appendChild(canvasElt);
            //canvasElt.style.display = "none";
          },

        dessin: function canvas(e){
            var dessinElt = document.getElementById("canvas");
            if(dessinElt.getContext) {
                var ctx = dessinElt.getContext("2d");

                // Propriétés canvas
                var canvas = false;

                // Propriétés graphiques
                ctx.strokeStyle = "black";
                ctx.lineWidth = 2;

                // Bouton de souris activé
                dessinElt.onmousedown = function(e) {
                    // Dessin activé
                    canvas = true;

                    // Repositionnement du début du tracé
                    ctx.moveTo(e.offsetX,e.offsetY);
                };

                // Mouvement de souris
                dessinElt.onmousemove = function(e) {
                    if(canvas) dessiner(e.offsetX,e.offsetY);
                };

                // Bouton de souris relâché
                dessinElt.onmouseup = function(e) {
                    // Dessin désactivé
                    canvas = false;
                };

                // Ajoute un segment au tracé
                function dessiner(x,y) {
                    ctx.lineTo(x,y);
                    ctx.stroke();
                };

                  // Création du bouton "Effacer"
                  var clearElt = document.createElement("button");
                  clearElt.id = "clear";
                  clearElt.textContent = "Effacer";
                  document.getElementById("bikeReservation").appendChild(clearElt);

                  // Efface le contenu du canvas
                  document.getElementById("clear").addEventListener("click", function(){
                  ctx.clearRect(0,0, dessinElt.width, dessinElt.height);
                  dessinElt.width = dessinElt.width
                });
            } // Fin condition if
          },

        // Création du bouton "Validez"
        confirm : function() {
              var confirmElt = document.createElement("button");
              confirmElt.id = "confirm";
              confirmElt.textContent = "Confirmer";
              document.getElementById("bikeReservation").appendChild(confirmElt);
              //confirmElt.style.display = "none";
        }

}; // Fin de l'objet canvas

canvas.init();
canvas.dessin();
canvas.confirm();
