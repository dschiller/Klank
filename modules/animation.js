class Animation {

    constructor() { }

    shake(element, time=250) {
        this.element = element
        this.time = time
        const deg = 4
        this.element.animate([
            {
                transform: 'rotate(0deg)',
            },
            {
                transform: 'rotate(' + deg + 'deg)'
            },
            {
                transform: 'rotate(0deg)'
            },
            {
                transform: 'rotate(-' + deg + 'deg)'
            },
            {
                transform: 'rotate(0deg)'
            },
            {
                transform: 'rotate(' + deg + 'deg)'
            },
            {
                transform: 'rotate(0deg)'
            }
        ], this.time);
    }

    turn(element, time=1000) {
        this.element = element
        this.time = time
        const deg = 360
        this.element.animate([
            {
                transform: 'rotate(0deg)',
            },
            {
                transform: 'rotate(' + deg + 'deg)'
            }
        ], this.time);
    }

    fadeIn(element, time=200) {
        this.element = element
        this.time = time
        this.element.animate([
            {
                opacity: '0'
            },
            {
                opacity: '1'
            }
        ], this.time);
    }

    fadeOut(element, time=100, callback=null) {
        this.element = element
        this.time = time
        this.element.animate([
            {
                opacity: '1'
            },
            {
                opacity: '0'
            }
        ], this.time).onfinish = () => {
            callback()
        }
    }

}

const animation = new Animation()