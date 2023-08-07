function createRow(container, userName, userSamples) {
    const row = document.createElement("div");
    row.classList.add("row");
    container.appendChild(row);

    const rowLabel = document.createElement("div");
    rowLabel.innerHTML = userName;
    rowLabel.classList.add("rowLabel");
    rowLabel.classList.add("gradient-text");
    row.appendChild(rowLabel);

    for (let sample of userSamples) {
        const { id, label } = sample;
        const sampleContainer = document.createElement("div");
        sampleContainer.id = `sample_${id}`;
        sampleContainer.classList.add("sampleContainer");
        const sampleLabel = document.createElement("div");
        sampleLabel.innerHTML = label;
        sampleLabel.classList.add("gradient-text");
        sampleContainer.appendChild(sampleLabel);
        const img = document.createElement("img");
        img.src = `${constants.IMG_DIR}/${id}.png`;
        img.classList.add("thumb");
        sampleContainer.appendChild(img);
        row.appendChild(sampleContainer);
    }
}