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

let statusbarElements = document.getElementsByTagName('statusbar')
for (let index = 0; index < statusbarElements.length; index++) {
    const statusbarElement = statusbarElements[index]
    const statusbar = new Statusbar(statusbarElement)
    statusbar.addItem('Add new Mono Track')
    statusbar.addItem('Add new Stereo Track')
}