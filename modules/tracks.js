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
        this.element.appendChild((this.pan = new Pan(.5)).element)
        this.groupLpVolumeHp = document.createElement('grouplpvolumehp')
        //this.groupLpVolumeHp.style.backgroundColor = '#11ffffff'
        this.groupLpVolumeHp.appendChild((this.lowpass = new LP(0)).element)
        this.groupLpVolumeHp.appendChild((this.volume = new Volume(.5)).element)
        this.groupLpVolumeHp.appendChild((this.highpass = new HP(1)).element)
        this.element.appendChild(this.groupLpVolumeHp)
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

class Pan extends Knob {

    constructor(pan) {
        super(pan, 0, 1, 'Pan', 'pan')
        this.pan = pan
    }

}

class Volume extends Knob {

    constructor(defaultValue) {
        super(defaultValue, 0, 1, 'Volume', 'volume', KnobStyle.Yellow)
    }

}

class LP extends Knob {

    constructor(defaultValue) {
        super(defaultValue, 0, 1, 'LP', 'lowpass', KnobStyle.Grey, .5)
    }

}

class HP extends Knob {

    constructor(defaultValue) {
        super(defaultValue, 0, 1, 'HP', 'highpass', KnobStyle.Grey, .5)
    }

}

let tracks = core.init('tracks', Tracks)
tracks.addTrack('Sax')
tracks.addTrack('Bass')
tracks.addTrack('Keyboard')
tracks.addTrack('FX')