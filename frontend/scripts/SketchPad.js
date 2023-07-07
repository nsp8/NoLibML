class SketchPad {
    constructor(container, size = 400) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
            background-color: #eee;
            box-shadow: 0px 0px 3px 1px white;
        `;
        container.appendChild(this.canvas);

        // to draw on this canvas:
        this.ctx = this.canvas.getContext("2d");
        this.#addEventListeners();
    }

    #addEventListeners() {
        this.canvas.onmousedown = evt => {
            const rectangle = this.canvas.getBoundingClientRect();
            const mouse = [evt.clientX - rectangle.left, evt.clientY - rectangle.top];
            console.log(mouse);
        }
    }
}