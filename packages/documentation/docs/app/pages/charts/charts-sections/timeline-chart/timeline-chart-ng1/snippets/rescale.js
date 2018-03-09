function updateChartYAxis() {
    var start = tc.detailedChart.options.xaxes[0].min;
    var end = tc.detailedChart.options.xaxes[0].max;

    var max = 0;

    for (var i = 0; i < timelineData.length; i++) {
        var x = timelineData[i][0];
        var y = timelineData[i][1];

        if (x >= start && x <= end) {
            if (!max || y > max) max = y;
        }
    }

    //add some extra space above
    max += 20;

    //update the chart
    tc.detailedChart.options.yaxes[0].max = max;
}