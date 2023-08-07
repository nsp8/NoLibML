const Draw = {};

Draw.path = (ctx, path, color = "black") => {
    ctx.strokeStyle = color;
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(...path[0]);  // spreading x, y -> starting point
    for (let i = 1; i < path.length; i++) {
        ctx.lineTo(...path[i]);
    }
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
}

Draw.paths = (ctx, paths, color = "black") => {
    for (const path of paths) {
        Draw.path(ctx, path, color);
    }
}

if (typeof module != "undefined") {
    module.exports = Draw;
}
