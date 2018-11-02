class Core {

    constructor() { }

    init(elementTagName, elementClass) {
        this.elementTagName = elementTagName
        this.elementElements = document.getElementsByTagName(this.elementTagName)
        // TODO: Sort out duplicate Tags if exists
        for (let index = 0; index < this.elementElements.length; index++) {
            this.elementElement = this.elementElements[index]
            this.element = new elementClass(this.elementElement)
        }
        return this.element
    }

}

let core = new Core()