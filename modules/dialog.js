class Dialog {

    constructor(object, jsonTemplate) {
        this.object = object
        this.jsonTemplate = jsonTemplate
        this.jsonData = require(this.jsonTemplate)
        this.title = this.jsonData.title
        this.body = new Body()
        // TODO: Put this.jsonData.body Data into a Body()
        for (let element in this.jsonData.body) {
            if (element == 'message') {
                this.message = this.jsonData.body[element]
            }
            // TODO: Add textbox Items
        }
        this.buttons = this.jsonData.buttons
        this.dialogOverlay = document.createElement('dialog-overlay')
        this.dialogOverlay.onclick = () => {
            animation.shake(this.element)
        }
        document.body.appendChild(this.dialogOverlay)
        animation.fadeIn(this.dialogOverlay)
        this.element = document.createElement('dialog')
        this.element.appendChild(new Title(this, this.title).element)
        this.element.appendChild(new Message(this.message).element)
        this.element.appendChild(new ButtonBar(this, this.buttons).element)
        document.body.appendChild(this.element)
        animation.fadeIn(this.element)
    }

    close() {
        animation.fadeOut(this.element, undefined, () => {
            this.element.remove()
        })
        animation.fadeOut(this.dialogOverlay, undefined, () => {
            this.dialogOverlay.remove()
        })        
    }

}

let Buttons = {
    Ok: 1,
    OkCancel: 2
}

class Title {

    constructor(dialog, title) {
        this.dialog = dialog
        this.title = title.replace(/[||].+[||]/g, '<titleBold>$&</titleBold>').replace(/[||]/g, '')
        if (this.title.includes('[TrackId]')) {
            this.title = this.title.replace('[TrackId]', this.dialog.object.track.getId())
        }
        if (this.title.includes('[TrackName]')) {
            this.title = this.title.replace('[TrackName]', this.dialog.object.track.getName())
        }
        this.element = document.createElement('title_') // 'title_' workarround: 'title' is partly used by DOM; so innerHTML is not setable
        this.element.innerHTML = this.title
    }

}

class Body {

    constructor() {
        this.element = document.createElement('body')
    }

}

class Message {

    constructor(message) {
        this.message = message.replace(/[|]\w+[|]/g, '<messageCode>$&</messageCode>').replace(/[|]/g, '')
        this.element = document.createElement('message')
        this.element.innerHTML = this.message
    }

}

class ButtonBar {

    constructor(dialog, buttons) {
        this.dialog = dialog
        this.buttons = buttons
        this.element = document.createElement('buttonbar')
        for (let button in this.buttons) {
            if (button == 'buttonOk') {
                this.buttonOk = new Button(this.buttons[button].text)
                this.buttonOk.element.onclick = () => {
                    this.dialog.close()
                }
                this.element.appendChild(this.buttonOk.element)
            }
            if (button == 'buttonCancel') {
                this.buttonCancel = new Button(this.buttons[button].text)
                this.buttonCancel.element.onclick = () => {
                    this.dialog.close()
                }
                this.element.appendChild(this.buttonCancel.element)
            }
        }
    }

}
