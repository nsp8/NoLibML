let index = 0;
const labels = ["car", "fish", "house", "tree", "bicycle", "guitar", "pencil", "clock"];
const data = {
    username: null,
    sessionID: new Date().getTime(),
    drawings: {}
};

getCurrentLabel = () => {
    return labels[index];
}

setInstruction = () => {
    const label = getCurrentLabel();
    instructions.innerHTML = `Please draw a ${label}`;
}

start = () => {
    if (username.value == "") {
        alert("Please enter a username.");
        return;
    }
    // const sketchContainer = document.getElementById("sketchPadContainer");
    // const userForm = document.getElementById("userForm");
    data.username = username.value;
    username.style.display = "none";
    sketchPadContainer.style.visibility = "visible";
    setInstruction();
    advanceButton.innerHTML = "Next";
    advanceButton.onclick = nextInstruction;
}

save = () => {
    advanceButton.style.display = "none";
    instructions.innerHTML = "Download your work in the dataset folder.";
    const anchorElement = document.createElement("a");
    const uri = `data:text/plain;charset=utf-8,${encodeURIComponent(JSON.stringify(data))}`;
    anchorElement.setAttribute("href", uri);
    const fileName = `${data.sessionID}.json`;
    anchorElement.setAttribute("download", fileName);
    // make the anchor invisble ...
    anchorElement.style.display = "none";
    // ... add it to the body ...
    document.body.appendChild(anchorElement);
    // ... trigger the click ...
    anchorElement.click();
    // ... remove it from the document entirely.
    document.body.removeChild(anchorElement);
}

nextInstruction = () => {
    if (sketchPad.paths.length == 0) {
        alert("Draw something first.");
        return;
    }

    // add user's drawings
    data.drawings[getCurrentLabel()] = sketchPad.paths;
    sketchPad.reset();
    index++;

    // increment index to get next instruction
    if (index < labels.length) {
        setInstruction();
    } else {
        sketchPadContainer.style.visibility = "hidden";
        instructions.innerHTML = "Thanks!"
        advanceButton.innerHTML = "Save";
        advanceButton.onclick = save();
    }
}

const sketchPad = new SketchPad(sketchPadContainer);
