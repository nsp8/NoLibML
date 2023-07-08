class SketchPad {
    constructor(container, size = 400) {
        this.canvas = document.createElement("canvas");
        this.canvas.width = size;
        this.canvas.height = size;
        this.canvas.style = `
            background-color: #eee;
            box-shadow: 0px 0px 8px 2px white;
            border-radius: 7px;
        `;
        container.appendChild(this.canvas);

        // to draw on this canvas:
        this.ctx = this.canvas.getContext("2d");
        this.#addEventListeners();

        // attributes of the SketchPad:
        this.paths = [];  // array of arrays
        this.isDrawing = false;
    }

    #getMouse = evt => {
        const rectangle = this.canvas.getBoundingClientRect();
        return [
            Math.round(evt.clientX - rectangle.left),
            Math.round(evt.clientY - rectangle.top)
        ];
    }

    #reDraw = () => {
        // clear the canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        // draw the path
        Draw.paths(this.ctx, this.paths);
    }

    #addEventListeners() {
        this.canvas.onmousedown = evt => {
            // things that will happen when a mouse button is clicked within the canvas.
            const mouse = this.#getMouse(evt);
            // console.log(mouse);
            this.paths.push([mouse]);
            this.isDrawing = true;
        }

        this.canvas.onmouseup = () => {
            // things that will happen when a mouse button is unpressed.
            this.isDrawing = false;
        }

        this.canvas.onmousemove = evt => {
            // things that will happen when a mouse click is dragged across the canvas.
            if (this.isDrawing) {
                const mouse = this.#getMouse(evt);
                const lastPath = this.paths[this.paths.length - 1];
                lastPath.push(mouse);
                // console.log(this.paths.length);
                this.#reDraw();
            }
        }

        this.canvas.ontouchstart = evt => {
            const loc = evt.touches[0];
            this.canvas.onmousedown(loc);
        }

        this.canvas.ontouchmove = evt => {
            const loc = evt.touches[0];
            this.canvas.onmousemove(loc);
        }

        this.canvas.ontouchend = () => {
            this.canvas.onmouseup();
        }
    }
}