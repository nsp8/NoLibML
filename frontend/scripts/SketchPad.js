const Draw = require("../common/Draw.js");


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
        // add the canvas to the container:
        container.appendChild(this.canvas);

        // add a few more elements to the container:
        const lineBreak = document.createElement("br");
        container.appendChild(lineBreak);

        this.undoButton = document.createElement("button");
        this.undoButton.innerHTML = "Undo";
        container.appendChild(this.undoButton);

        // this.undoButton.setAttribute("class", "btn");

        // to draw on this canvas:
        this.ctx = this.canvas.getContext("2d");
        this.#addEventListeners();

        // reset the container
        this.reset();

        // Hide the container initially
        container.style.visibility = "hidden";
    }

    reset = () => {
        // attributes of the SketchPad:
        this.paths = [];  // array of arrays
        this.isDrawing = false;

        // Initial draw:
        this.#reDraw();
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

        // toggle undo:
        if (this.paths.length > 0) {
            this.undoButton.disabled = false;
        } else {
            this.undoButton.disabled = true;
        }
    }

    #addEventListeners() {
        this.canvas.onmousedown = evt => {
            // things that will happen when a mouse button is clicked within the canvas.
            const mouse = this.#getMouse(evt);
            // console.log(mouse);
            this.paths.push([mouse]);
            this.isDrawing = true;
        }

        // onmouseup: this.canvas -> document, to avoid drawing while moving outside the canvas with the mouse pressed and coming back inside the canvas.
        document.onmouseup = () => {
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

        // ontouchend: this.canvas -> document, to avoid drawing while moving outside the canvas with the mouse pressed and coming back inside the canvas.
        document.ontouchend = () => {
            this.canvas.onmouseup();
        }

        this.undoButton.onclick = () => {
            this.paths.pop();
            this.#reDraw();
        }
    }
}