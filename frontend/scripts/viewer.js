const { samples, featureNames } = features;

const groupsByUserID = utils.groupBy(samples, "session");
// console.log(groupsByUserID);
for (let userID in groupsByUserID) {
    const userSamples = groupsByUserID[userID];
    const userName = userSamples[0].username;
    createRow(container, userName, userSamples);
}

const chartOptions = {
    width: 400,
    height: 400,
    hAxis: { title: featureNames[0] },
    vAxis: { title: featureNames[1] },
    legend: { position: "none" },
    explorer: {
        maxZoomIn: 0.01,
        actions: ["dragToZoom", "rightClickToReset"]
    }
};

google.charts.load("current", { "packages": ["corechart"] });
google.charts.setOnLoadCallback(() => {
    const data = new google.visualization.DataTable();
    data.addColumn("number", featureNames[0]);
    data.addColumn("number", featureNames[1]);
    data.addColumn({ "type": "string", "role": "style" });
    data.addRows(
        samples.map(s => [...s.point, utils.styles[s.label]])
    );

    const chart = new google.visualization.ScatterChart(chartContainer);
    chart.draw(data, chartOptions);
});