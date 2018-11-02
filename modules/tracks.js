class Tracks {

    constructor(element) {
        this.element = element
    }

    addTrack(name) {
        let trackId = this.getTrackCount() + 1
        let track = new Track(trackId, name)
        this.element.appendChild(track.element)
        this['track_' + trackId] = track
    }

    getTrackCount() {
        return this.element.getElementsByTagName('track').length
    }

    getTrack(id) {
        return this['track_' + id]
    }

}

class Track {

    constructor (id, name) {
        this.id = id;
        this.name = name;
        this.element = document.createElement('track')
        this.element.appendChild(new Id(this.id).element)
        this.element.id = this.getId()
        this.element.appendChild(new Name(this.id, this.name).element)
    }

    getId() {
        return this.element.getElementsByTagName('id')[0].innerText
    }

    getName() {
        return this.element.getElementsByTagName('name')[0].innerText
    }

}

class Id {

    constructor(id) {
        this.id = id
        this.element = document.createElement('id')
        this.element.innerText = this.id
        this.element.onclick = () => {
            let trackStyles = getComputedStyle(tracks.getTrack(this.id).element)
            tracks.getTrack(this.id).element.style.setProperty('flex', trackStyles.flex == '1 1 0%' ? '0 1 0%' : '1 1 0%')
        }
    }

}

class Name {

    constructor(id, name) {
        this.id = id
        this.name = name
        this.element = document.createElement('name')
        this.element.innerText = this.name
        this.element.ondblclick = () => {
            new Dialog(tracks.getTrack(this.id), './templates/renameTrack.json')
        }
    }

    setName(name) {
        this.name = name
        this.element.innerText = this.name
    }

}

let tracks = core.init('tracks', Tracks)
tracks.addTrack('Sax')
tracks.addTrack('Bass')