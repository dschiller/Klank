class Textbox {

    constructor(label, defaultValue, classname='textbox') {
        this.classname = classname
        this.element = document.createElement('input')
        this.element.className = this.classname + ' textbox'

    }

}