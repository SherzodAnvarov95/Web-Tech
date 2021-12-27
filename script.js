class Slider {

    constructor(config) {
        this.slider = document.querySelector(config.el)
        this.sliderBox = this.slider.querySelector('.slider__box')
        this.sliderItem = this.sliderBox.children
        console.log(this.sliderItem);

        this.next = this.slider.querySelector('.slider__next')
        this.prev = this.slider.querySelector('.slider__prev')


        this.height = this.slider.clientHeight
        this.width = this.slider.clientWidth

        this.timeMove = config.time == undefined ? 1000 : config.time

        this.dir = config.direction

        this.moveSize = "X" == this.dir ? this.width : this.height


        this.activeSlide = 0

        this.sliderBox.style = `
                            position: relative;
                            height: ${this.height}px;
                            overflow: hidden;   
                            
                           `
        for (let i = 0; i < this.sliderItem.length; i++) {
            const slides = this.sliderItem[i];


            slides.style = `
                            position: absolute;
                            height: ${this.height}px;
                            width: ${this.width}px;   
            
           `
            if (i != this.activeSlide) {
                slides.style.transform = `translate${this.dir}(${this.width}px)`
            }
            if (i == this.sliderItem.length - 1) {
                slides.style.transform = `translate${this.dir}(-${this.width}px)`
            }
        }

        this.next.addEventListener("click", () => this.clickBtn(this.next))
        this.prev.addEventListener("click", () => this.clickBtn(this.prev))
    }

    clickBtn(btn) {

        this.next.disabled = true
        this.prev.disabled = true

        setTimeout(() => {
            this.next.disabled = false
            this.prev.disabled = false
        }, this.timeMove);

        const nextOrPrev = btn == this.next ? this.moveSize * -1 : this.moveSize

        for (let i = 0; i < this.sliderItem.length; i++) {
            const slides = this.sliderItem[i];
            slides.style.transition = '0ms'


            if (i != this.activeSlide) {
                slides.style.transform = `translate${this.dir}(${nextOrPrev * -1}px)`
            }
        }

        this.sliderItem[this.activeSlide].style.transform = `translate${this.dir}(${nextOrPrev}px)`
        this.sliderItem[this.activeSlide].style.transition = this.timeMove + 'ms'

        if (btn == this.next) {
            this.activeSlide++

            if (this.activeSlide >= this.sliderItem.length) {
                this.activeSlide = 0
            }
        } else if (btn == this.prev) {
            this.activeSlide--

            if (this.activeSlide < 0) {
                this.activeSlide = this.sliderItem.length - 1
            }
        }

        this.sliderItem[this.activeSlide].style.transform = `translate${this.dir}(0px)`
        this.sliderItem[this.activeSlide].style.transition = this.timeMove + 'ms'
    }

}

const slider = new Slider({

    el: '#carousel',
    time: 1000,
    direction: 'X'

})

const slider2 = new Slider({

    el: '#carousel-2',
    time: 1000,
    direction: 'Y'

})