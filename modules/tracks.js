class Tracks {

    constructor(element) {
        this.element = element
    }

    addTrack(name) {
        const track = new Track(this.getTrackCount() + 1, name, this)
        this.element.appendChild(track.element)
    }

    getTrackCount() {
        return this.element.getElementsByTagName('track').length
    }

}

class Track {

    constructor (id, name) {
        this.id = id;
        this.name = name;
        this.element = document.createElement('track')
        this.element.appendChild(new Id(this, this.id).element)
        this.element.id = this.getId()
        this.element.appendChild(new Name(this, this.name).element)
    }

    getId() {
        return this.element.getElementsByTagName('id')[0].innerText
    }

    getName() {
        return this.element.getElementsByTagName('name')[0].innerText
    }

}

class Id {

    constructor(track, id) {
        this.track = track
        this.id = id
        this.element = document.createElement('id')
        this.element.innerText = this.id
        this.element.onclick = () => {
            let trackStyles = getComputedStyle(this.track.element)
            this.track.element.style.setProperty('flex', trackStyles.flex == '1 1 0%' ? '0 1 0%' : '1 1 0%')
        }
    }

}

class Name {

    constructor(track, name) {
        this.track = track
        this.name = name
        this.element = document.createElement('name')
        this.element.innerText = this.name
        this.element.ondblclick = () => {
            new Dialog(this, './templates/renameTrack.json')
        }
    }

    setName(name) {
        this.name = name
        this.element.innerText = this.name
    }

}

let tracks = null
let tracksElements = document.getElementsByTagName('tracks');
for (let index = 0; index < tracksElements.length; index++) {
    const tracksElement = tracksElements[index]
    tracks = new Tracks(tracksElement)
    tracks.addTrack('Sax')
    tracks.addTrack('Bass')
}
