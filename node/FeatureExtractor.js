const fs = require("fs");
const constants = require("../common/constants.js");
const features = require("../common/features.js");

console.log("Extracting features ...");
const samples = JSON.parse(fs.readFileSync(constants.SAMPLES));

for (const sample of samples) {
    const paths = JSON.parse(
        fs.readFileSync(`${constants.JSON_DIR}/${sample.id}.json`)
    );
    sample.point = [
        features.getPathCount(paths),
        features.getPointCount(paths),
    ]
}

const featureNames = ["Path count", "Point count"];

if (!fs.existsSync(constants.FEATURES)) {
    fs.writeFileSync(
        constants.FEATURES,
        JSON.stringify(
            {
                featureNames,
                samples: samples.map(s => {
                    return {
                        point: s.point,
                        label: s.label
                    }
                })
            })
    );
}
if (!fs.existsSync(constants.FEATURES_JS)) {
    fs.writeFileSync(
        constants.FEATURES_JS,
        `const features = ${JSON.stringify({ featureNames, samples })};`
    );
}
console.log("Feature extraction complete!");