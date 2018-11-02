class Toolbar {

    constructor(element) {
        this.element = element
        this.playButton = new PlayButton()
        this.element.appendChild(this.playButton.element)
    }

}

class PlayButton {

    constructor() {
        this.element = document.createElement('playbutton')
        this.element.onclick = () => {
            this.element.className = this.element.className == '' ? 'paused' : ''
        }
    }

}

let toolbar = core.init('toolbar', Toolbar)