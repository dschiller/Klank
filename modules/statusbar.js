class Statusbar {

    constructor(element) {
        this.element = element
        this.element.appendChild(new Coder().element)
    }

    addItem(text) {
        const item = new Item(text)
        this.element.appendChild(item.element)
    }

}

class Item extends Button {

    constructor(text) {
        super(text, 'item', Style.Outline)
        this.text = text
        this.element.onclick = () => {
            tracks.addTrack('New Track')
        }
    }
}

class Coder extends Textbox {

    constructor() {
        super(null, null, 'coder')

        this.element.onkeydown = (e) => {
            if (e.keyCode == 13) {
                console.log(this.element.value)
                eval(this.element.value)
            }
        }
    }   

}

let statusbar = core.init('statusbar', Statusbar)
statusbar.addItem('Add new Mono Track')
statusbar.addItem('Add new Stereo Track')