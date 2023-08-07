const fs = require("fs");
const { createCanvas } = require("canvas");

const Draw = require("../common/Draw.js");
const constants = require("../common/constants.js");
const utils = require("../common/utils.js");

const canvas = createCanvas(400, 400);
const ctx = canvas.getContext("2d");

const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples = [];
let id = 1;
const totalDrawings = fileNames.length * 8;

// for each file in the raw directory:
fileNames.forEach(fileName => {
    let filePath = constants.RAW_DIR + "/" + fileName;
    if (fs.lstatSync(filePath).isFile()) {
        // 1. get the contents of the file
        const content = fs.readFileSync(constants.RAW_DIR + "/" + fileName)
        // 2. Parse the contents to JSON objects
        const { session, student, drawings } = JSON.parse(content);
        // 3. For each label in the drawings
        for (let label in drawings) {
            // 4. push to the samples array
            samples.push({ id, label, username: student, session });

            // 5. Save each entry in the JSON directory
            const paths = drawings[label];
            fs.writeFileSync(
                constants.JSON_DIR + "/" + id + ".json",
                JSON.stringify(paths)
            );
            let fileId = id;
            id++;

            // 6. Save all the images:
            saveImageFile(fileId, paths);

        }
    }
});

// Save all the samples in the samples.json file
fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));
fs.writeFileSync(constants.SAMPLES_JS, `const samples=${JSON.stringify(samples)};`);

function saveImageFile(fileIdentifier, paths) {
    const outputFile = `${constants.IMG_DIR}/${fileIdentifier}.png`;
    if (!fs.existsSync(outputFile)) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        Draw.paths(ctx, paths);
        const buffer = canvas.toBuffer("image/png");
        fs.writeFileSync(outputFile, buffer);
        // 7. Print the progress of this operation on the console:
        utils.printProgress(fileIdentifier, totalDrawings);  // number of files * number of drawings in each file
    }
}
