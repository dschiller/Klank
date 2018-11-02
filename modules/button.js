class Button {

    constructor(text, type='button', style=Style.Normal) {
        this.text = text
        this.element = document.createElement(type)
        this.element.innerText = this.text
        if (type != 'button') {
            this.element.className = 'button'
            if (style == Style.Outline) {
                this.element.className = 'button outline'
            }
        }
    }

}

let Style = {
    Normal: 1,
    Outline: 2
}