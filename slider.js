class Carousel {
/**
 * @param {HTMLElement} element 
 * @param {Object} options
 * @param {Object} options.slideToScroll Nombre d'éléments à faire défiler
 * @param {Object} options.slideVisible Nombre d'éléments visibles dans un slide
 * 
 *  
 */
    constructor (element, options = {}) {
        // console.log("hello");
        this.element = element
        this.options = Object.assign({}, {
            slideToScroll: 1,
            slideVisible: 1
        }, options)
        //  var carouselElt = document.createElement("div");
        // carouselElt.setAttribute("class", "carousel");
        // this.element.appendChild(carouselElt);
        // this.children = element.children;
        this.children = [].slice.call(element.children);
        var carouselElt = this.createDivWithClass("carousel");
        var containerElt = this.createDivWithClass("carousel__container");
        carouselElt.appendChild(containerElt);
        this.element.appendChild(carouselElt);
        this.children.forEach(function(child){
        containerElt.appendChild(child);
        });
        
    }

    /**
     * 
     * @param {sting} className
     * @returns{HTMLElemnt} 
     */
    createDivWithClass (className){
        var div = document.createElement("div");
        div.setAttribute("class", className);
        return div;
    }

}


document.addEventListener("DOMContentLoaded", function (){
    new Carousel(document.querySelector("#slideshow"), {
        slideToScroll: 2,
        slideVisible: 2
    })
})

