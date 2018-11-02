class Statusbar {

    constructor(element) {
        this.element = element
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

let statusbar = core.init('statusbar', Statusbar)
statusbar.addItem('Add new Mono Track')
statusbar.addItem('Add new Stereo Track')