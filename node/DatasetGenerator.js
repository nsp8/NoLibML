const constants = {};
constants.DATA_DIR = "../data";
constants.RAW_DIR = `${constants.DATA_DIR}/raw`;
constants.DATASET_DIR = `${constants.DATA_DIR}/dataset`;
constants.JSON_DIR = `${constants.DATASET_DIR}/json`;
constants.IMG_DIR = `${constants.DATASET_DIR}/img`;
constants.SAMPLES = `${constants.DATASET_DIR}/samples.json`;

const fs = require("fs");
const fileNames = fs.readdirSync(constants.RAW_DIR);
const samples = [];
let id = 1;
// console.log(fileNames);
fileNames.forEach(fileName => {
    let filePath = constants.RAW_DIR + "/" + fileName;
    // console.log(filePath);
    fs.readFile(filePath, (err, d) => {
        if (err) console.error(err);
        console.log(d);
    });
    const content = fs.readFileSync(constants.RAW_DIR + "/" + fileName);
    const { session, username, drawings } = JSON.parse(content);
    for (let label in drawings) {
        samples.push({ id, label, username, session });
        id++;
    }
});


fs.writeFileSync(constants.SAMPLES, JSON.stringify(samples));
