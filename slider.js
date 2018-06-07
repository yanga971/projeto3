var images = [{
        src: "images/appli/appli1.png",
        alt: "Présentation générale de l'application"
    },
    {
        src: "images/appli/map1.png",
        alt: "Carte de la région lyonnaise"
    },
    {
        src: "images/appli/aside1.png",
        alt: "Panneau d'informations sur la station"
    },
    {
        src: "images/appli/canvas1.png",
        alt: "Encart pour la signature"
    },
    {
        src: "images/appli/timer1.png",
        alt: "Décompte avant expiration de la réservation"
    }
]


var carousel = {
    totalSlide: 5,
    currentSlide: 1,
    init: function () {
        this.carouselContainer()
        this.createSlide()
        this.rightArrow()
        this.leftArrow()
        this.keyboardKeys()
    },
    carouselContainer: function () {
        this.carouselContainerElt = document.createElement("div");
        this.carouselContainerElt.id = "carouselContainer";
        document.getElementById("carousel").appendChild(this.carouselContainerElt);
    },

    createSlide: function () {
        var slidesElt = document.createElement("div");
        slidesElt.id = "carouselContainerSlides"
        document.getElementById("carouselContainer").appendChild(slidesElt);

        // Création d'une boucle afin de récupérer l'ensemble des images
        for (var i = 0; i < images.length; i++) {
            // Création de l'image
            var imageElt = document.createElement("img");
            // Source de l'image
            imageElt.src = images[i].src;
            // Texte alternatif de l'image
            imageElt.alt = images[i].alt;
            // Nom de la classe css de l'image            
            imageElt.className = "image";
            // Ajout des images à l'élément slides 
            slidesElt.appendChild(imageElt);
        }
        // Ajout de l'élément slides
        this.carouselContainerElt.appendChild(slidesElt);
    },

    // Animation avec la flèche droite
    rightArrow: function () {
        var rightElt = document.createElement("div");
        rightElt.id = "right";
        document.getElementById("carousel").appendChild(rightElt);
        var rightImgElt = document.createElement("img");
        rightImgElt.src = "images/chevrons/right.svg";
        rightImgElt.alt = "Flèche droite";
        rightImgElt.className = "rightArrow"
        document.getElementById("right").appendChild(rightImgElt);

        rightImgElt.addEventListener("click", function () {
            carousel.goRight();
        })
    },

    // Animation avec la flèche gauche
    leftArrow: function () {
        var leftElt = document.createElement("div");
        leftElt.id = "left";
        document.getElementById("carousel").appendChild(leftElt);
        var leftImgElt = document.createElement("img");
        leftImgElt.src = "images/chevrons/left.svg";
        leftImgElt.alt = "Flèche gauche";
        leftImgElt.className = "leftArrow"
        document.getElementById("left").appendChild(leftImgElt);

        leftImgElt.addEventListener("click", function () {
            carousel.goLeft();
        })   
    },

    // Animation avec les touches gauche et droite du clavier
    keyboardKeys: function () {
        document.addEventListener("keydown", function(e) {
            if(e.keyCode === 37){
                carousel.goLeft();
            }
            else if(e.keyCode === 39){
                carousel.goRight();
            }
        })
    },

    // Animation du carousel avec la flèche à droite
    goRight: function () {
        // Condition afin que le carousel revienne sur la première slide
        if (this.currentSlide == this.totalSlide) {
            this.currentSlide = 0;
        }
        var slideToScroll = this.currentSlide * -100 + "%";
        document.getElementById("carouselContainer").style.marginLeft = slideToScroll;
        this.currentSlide++;
    },

    // Animation du carousel avec la flèche à gauche
    goLeft: function () {
        if (this.currentSlide == 0 || this.currentSlide == 1) {
            this.currentSlide = this.totalSlide + 1;
        }
        var currentSlideRight = this.currentSlide - 2;
        var slideToScroll = currentSlideRight * -100 + "%";
        document.getElementById("carouselContainer").style.marginLeft = slideToScroll;
        this.currentSlide--;
    }
}