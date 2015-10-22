function Slider(selector, options) {

    var self = this;

    // DOM Nodes:
    var sliderNode = document.querySelector(selector);
    var sliderImagesNode = sliderNode.querySelector('.slider__images-wrap');
    var prevSlideNode = sliderNode.querySelector('.slider__pager_previous');
    var nextSlideNode = sliderNode.querySelector('.slider__pager_next');
    var paginatorNode = sliderNode.querySelector('.slider__pagination');

    // Local variables;
    var currentSlideIndex = options.currentSlide-1 || 0;
    var imagesCount = sliderImagesNode.children.length;
    var slideSize = options.direction === 'vertical' ? sliderImagesNode.offsetHeight : sliderImagesNode.offsetWidth;

    // Methods:
    this.nextSlide = function() {
        if (currentSlideIndex === imagesCount - 1) {
            currentSlideIndex = 0;
            return;
        }
        currentSlideIndex++;
    };

    this.prevSlide = function() {
        if (currentSlideIndex === 0) {
            currentSlideIndex = imagesCount - 1;
            return;
        }
        currentSlideIndex--;
    };

    this.__render = function() {
        sliderImagesNode.style[options.direction === 'vertical' ? 'marginTop' : 'marginLeft'] = -(currentSlideIndex * slideSize) + 'px';

        // Arrows visibility:
        prevSlideNode.style.visibility = (currentSlideIndex === 0) ? 'hidden' : '';
        nextSlideNode.style.visibility = (currentSlideIndex === imagesCount - 1) ? 'hidden' : '';

        // Paginator handling:
        paginatorNode.querySelector('.active').classList.remove('active');
        paginatorNode.children[currentSlideIndex].querySelector('a').classList.add('active');
    };

    nextSlideNode.onclick = function() {
        self.nextSlide();
        self.__render();
    };

    prevSlideNode.onclick = function() {
        self.prevSlide();
        self.__render();
    };

    paginatorNode.onclick = function(event) {
        var link = event.target;
        if (link.tagName !== 'A') return;

        currentSlideIndex = +link.dataset.slider__item;

        self.__render();
    };

    this.__render();

    // Options handling:
    if (options.changeInterval) {
        setInterval(function() {
            self.nextSlide();
            self.__render();
        }, options.changeInterval)
    }
    if (options.direction === 'vertical') {
        sliderImagesNode.style.whiteSpace = 'normal';
    }
    sliderImagesNode.style.transition = 'margin ease-out .25s'
}
