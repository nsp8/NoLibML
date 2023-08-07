const utils = {};

utils.formatPercent = n => {
    return (n * 100).toFixed(2) + "%";
}

utils.styles = {
    car: "gray",
    fish: "red",
    house: "yellow",
    tree: "green",
    bicycle: "cyan",
    guitar: "blue",
    pencil: "magenta",
    clock: "brown"
}

utils.printProgress = (count, max) => {
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
    const percent = utils.formatPercent(count / max);
    process.stdout.write(`${count}/${max} (${percent})`);
}

utils.groupBy = (objectArray, key) => {
    const groups = {};
    for (let obj of objectArray) {
        const val = obj[key];
        if (groups[val] == null) {
            groups[val] = [];
        }
        groups[val].push(obj);
    }
    return groups;
}

if (typeof module != "undefined") {
    module.exports = utils;
}