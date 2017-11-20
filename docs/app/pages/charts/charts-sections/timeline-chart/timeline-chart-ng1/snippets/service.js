angular.module('elements').controller('TimelineChartCtrl', ['lineDataService', TimelineChartCtrl]);

function TimelineChartCtrl(lineDataService) {
    ...

    function randomTimelineData() {

        var min = 1167692400000; //represents 1 January 2007
        var max = 1220911200000; //represents 8 September 2008
        var step = 345600000; // represents 4 days

        var dataPoints = [];

        //for every 4 days between specified dates create a random number between 80 & 150
        for (var i = min; i <= max; i += step) {

            //Make March 2 2008 to april 2 2008 zero
            if (!(i > 1204457710000 && i < 1207142075000)) {
                dataPoints.push([i, Math.floor(Math.random() * (150 - 80) + 80)]);
            }
        }

        var offset = 259200000; // 3 days
        dataPoints = lineDataService.addZeroPoints(dataPoints, offset);
        return dataPoints;
    }
}