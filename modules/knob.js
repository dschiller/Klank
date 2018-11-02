class Knob {

    constructor(value, min, max, label, type='knob', style=KnobStyle.White) {
        this.value = value
        this.min = min
        this.max = max
        this.label = label
        this.type = type
        this.element = document.createElement(this.type)
        this.plate = document.createElement('knobPlate')
        this.element.appendChild(this.plate)
        this.rotary = document.createElement('knobRotary')
        this.plate.appendChild(this.rotary)
        if (type != 'knob') {
            this.element.className = 'knob'
        }
        this.element.appendChild(new Label(this.label).element)
        if (style == KnobStyle.Yellow) {
            this.rotary.className = 'yellow'
        }
    }

    setValue(value) {
        this.value = value
    }

}

let KnobStyle = {
    White: 1,
    Yellow: 2
}

class Label {

    constructor(text) {
        this.text = text
        this.element = document.createElement('label')
        this.element.innerText = this.text
    }

}