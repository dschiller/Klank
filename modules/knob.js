class Knob {

    constructor(defaultValue, minValue, maxValue, label, type='knob', style=KnobStyle.White, size=1) {
        this.defaultValue = defaultValue
        this.minValue = minValue
        this.maxValue = maxValue
        this.label = label
        this.type = type
        this.style = style
        this.size = size

        this.transform = {}
        this.transform.hover = {}
        this.clicks = 0
        this.clickDelay = 400
        this.minDeg = -132
        this.maxDeg = 132

        this.element = document.createElement(this.type)
        this.plate = document.createElement('knobPlate')
        this.rotary = document.createElement('knobRotary')
        this.plate.appendChild(this.rotary)
        this.element.appendChild(this.plate)
        this.element.appendChild(new Label(this.label).element)

        if (this.type != 'knob') this.element.className = 'knob'
        if (this.style == KnobStyle.Yellow) this.rotary.className = 'yellow'
        if (this.style == KnobStyle.Grey) this.rotary.className = 'grey'

        this.setSize(this.size)
        this.setValue(this.defaultValue)
        
        this.rotary.onmouseenter = (e) => {
            this.transform.hover.scale = this.getCssPropertyForRule('knobrotary:hover', 'transform', 'scale')
            this.saveTransition()
            this.setValue(this.degToValue(this.rotateYDiff))
        }

        this.rotary.onmousedown = (e) => {
            this.clicks++
            setTimeout(() => {
                this.clicks = 0
            }, this.clickDelay)
            if (this.clicks === 2) {
                this.rotary.ondblclick(e)
            } else {
                this.isClicked = true
                this.clickedStartY = e.clientY
                this.removeTransitionTimings()
                this.rotary.requestPointerLock()
            }
        }

        this.rotary.onmousemove = (e) => {
            if (this.isClicked) {
                if (this.rotateYDiff == null) this.rotateYDiff = 0
                this.rotateYDiff += -e.movementY
                if (this.rotateYDiff >= this.maxDeg) this.rotateYDiff = this.maxDeg
                if (this.rotateYDiff <= this.minDeg) this.rotateYDiff = this.minDeg
                this.setValue(this.degToValue(this.rotateYDiff))
            }
        }

        this.rotary.onmouseup = (e) => {
            this.isClicked = false
            this.setValue(this.degToValue(this.rotateYDiff))
            document.exitPointerLock()         
        }

        this.rotary.onmouseleave = (e) => {
            this.loadTransition()
            this.setValue(this.degToValue(this.rotateYDiff), '1.00')
        }

        this.rotary.ondblclick = (e) => {
            this.resetValue = true
            this.setValue(this.defaultValue)
        }

    }

    setValue(value, transformScale=this.transform.hover.scale) {
        this.value = value
        this.transformScale = transformScale
        if (this.transformScale == undefined) this.transformScale = '1.0'
        let degValue = this.valueToDeg(this.value)
        this.rotary.style.transform = 'rotate(' + degValue + 'deg) scale(' + this.transformScale + ')'
        if (!this.isClicked) {
            this.rotateYDiff = Math.round(degValue)
        }
        if (this.resetValue) {
            this.rotateYDiff = Math.round(degValue)
            this.loadTransition()
            this.resetValue = false
        }
    }

    degToValue(value) {
        this.value = value
        return ((((((this.maxValue-this.minValue)/this.maxDeg*this.value))+((this.maxValue-this.minValue)))/2)+this.minValue).toFixed(2)
    }

    valueToDeg(value) {
        this.value = value
        return ((((((this.maxDeg-this.minDeg)/(this.maxValue-this.minValue)*this.value))))+this.minDeg).toFixed(2)
    }

    setSize(size) {
        this.size = size
        this.element.style.transform = 'scale(' + this.size + ')'
    }

    saveTransition() {
        this.transition = {}
        this.transition.parameter1 = getComputedStyle(this.rotary).transition.split(' ')[0]
        this.transition.time1 = getComputedStyle(this.rotary).transition.split(' ')[1]
        this.transition.parameter2 = getComputedStyle(this.rotary).transition.split(' ')[2]
        this.transition.time2 = getComputedStyle(this.rotary).transition.split(' ')[3]
        
    }

    loadTransition() {
        if (this.transition == undefined) return
        this.rotary.style.transition = this.transition.parameter1 + ' ' + this.transition.time1 + ' ' + this.transition.parameter2 + ' ' + this.transition.time2
    }

    removeTransitionTimings() {
        let timing = '0s'
        this.rotary.style.transition = this.transition.parameter1 + ' ' + timing + ' ' + this.transition.parameter2 + ' ' + timing
    }

    getCssPropertyForRule(rule, prop, parameter) {
        let sheets = document.styleSheets
        let slen = sheets.length
        for(let i=0; i<slen; i++) {
            let rules = document.styleSheets[i].cssRules
            let rlen = rules.length
            for(let j=0; j<rlen; j++) {
                if(rules[j].selectorText == rule) {
                    let property = rules[j].style[prop]
                    let properties = property.split(' ')
                    if (properties.length > 0) {
                        for(let k=0; k<properties.length; k++) {
                            if (properties[k].includes(parameter)) {
                                return rules[j].style[prop].split(' ')[k].split('(')[1].replace(')','')
                            }
                        }
                        console.error('getCssPropertyForRule(): Parameter \''+parameter+'\' not found.')
                        return undefined
                    }                  
                }
            }
        }
    }

}

let KnobStyle = {
    White: 1,
    Yellow: 2,
    Grey: 3
}

class Label {

    constructor(text) {
        this.text = text
        this.element = document.createElement('label')
        this.element.innerText = this.text
    }

}