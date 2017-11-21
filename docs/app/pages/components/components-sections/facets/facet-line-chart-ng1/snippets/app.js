angular.module('app').controller('FacetCtrl', FacetCtrl);

FacetCtrl.$inject = ['$scope'];

function FacetCtrl($scope) {
    var lc = this;

    var flotChartColors = {
        primary: "rgb(1, 169, 130)",
        secondary1: "rgb(96, 121, 141)",
        secondary2: "rgb(97, 71, 103)",
        secondary3: "rgb(135, 123, 117)",
        secondary4: "rgb(97, 125, 120)",
        secondary5: "rgb(204, 204, 204)",
        gridColor: "#999999",
        tickColor: "#D4D4D4",
        white: "#FFFFFF",
        transparent: "rgba(0, 0, 0, 0)",
        borderColor: "#E5E5E5"
    };

    //default dates
    var minimumDate = 1325376000000,
        maximumDate = 1451606400000,
        startDate = 1427846400000,
        endDate = 1446336000000,
        step = 2311200000,
        selectedUserModel = 'LDAP';

    var ldapData = getPointsWithinRange(minimumDate, maximumDate, step, 15, 75);
    var imapData = getPointsWithinRange(minimumDate, maximumDate, step, 15, 75);
    var ecaData = getPointsWithinRange(minimumDate, maximumDate, step, 15, 75);
    var adminData = getPointsWithinRange(minimumDate, maximumDate, step, 15, 75);

    //set the initial selection
    var chartData = ldapData;

    /*
    This function should be used to calculate new Y axis minimum and maximum values
    when the data changes to provide a more suitable range
    */

    function updateChartYAxis() {
        var start = lc.lineChart.lineoptions.xaxis.min;
        var end = lc.lineChart.lineoptions.xaxis.max;

        var min, max;

        for (var i = 0; i < chartData.length; i++) {
            var x = chartData[i][0];
            var y = chartData[i][1];

            if (x >= start && x <= end) {
                if (!min || y < min) min = y;
                if (!max || y > max) max = y;
            }
        }

        //add some extra space above and beneath
        min -= 5;
        max += 5;

        //update the chart
        lc.lineChart.lineoptions.yaxis.min = min;
        lc.lineChart.lineoptions.yaxis.max = max;
    }

    /*
    Date Range Facet
    */

    lc.dateRangeModel = '';
    lc.invalidDate = false;

    var dateChanged = false;

    lc.selectDateRange = function () {
        //update date range
        updateChart(lc.dateStart, lc.dateEnd);

        if (lc.dateStart.getTime() > lc.dateEnd.getTime()) lc.invalidDate = true;
        else lc.invalidDate = false;
    };

    lc.deselectDateRange = function () {

        //check if the user has changed the date rather than deselected
        if (dateChanged) {
            lc.invalidDate = false;
            dateChanged = false;
            return;
        }

        //if user deselected or hit clear all then reset the values to their default
        lc.dateRangeModel = '';
        lc.dateStart = new Date(minimumDate);
        lc.dateEnd = new Date(maximumDate);
        lc.invalidDate = false;

        //redraw the charts taking into account the default values
        updateChart(lc.dateStart, lc.dateEnd);

    };

    lc.displayDateRange = function () {

        //convert the dates to readable strings
        var startDate = lc.dateStart;
        var endDate = lc.dateEnd;

        var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "June", "July", "Aug", "Sept", "Oct", "Nov", "Dec"];

        var formattedFrom = startDate.getDate() + ' ' +
            monthNames[startDate.getMonth()] + ' ' +
            startDate.getFullYear();

        var formattedTo = endDate.getDate() + ' ' +
            monthNames[endDate.getMonth()] + ' ' +
            endDate.getFullYear();

        return 'From ' + formattedFrom + " to " + formattedTo;
    };

    function updateChart(startDate, endDate) {
        //set the charts new start x and y axis
        lc.lineChart.lineoptions.xaxis.min = startDate.getTime();
        lc.lineChart.lineoptions.xaxis.max = endDate.getTime();

        //show a more appropriate Y axis range based on the values
        updateChartYAxis();
    }

    /*
    Start Date Range Control
    */

    lc.dateStartIsOpen = false;
    lc.dateStart = new Date(minimumDate);

    lc.dateStartOpen = function ($event) {
        //show date picker and make sure other date picker is hidden
        lc.dateEndIsOpen = false;
        lc.dateStartIsOpen = !lc.dateStartIsOpen;
        $event.preventDefault();
        $event.stopPropagation();
    };

    lc.dateStartUpdate = function () {
        dateChanged = true;

        if (lc.dateStart.getTime() < minimumDate) lc.dateStart = new Date(minimumDate);
        if (lc.dateStart.getTime() > maximumDate) lc.dateStart = new Date(maximumDate);

        lc.dateRangeModel = JSON.stringify({
            start: lc.dateStart,
            end: lc.dateEnd
        });
    };

    /*
    End Date Range Control
    */

    lc.dateEndIsOpen = false;
    lc.dateEnd = new Date(maximumDate);

    lc.dateEndOpen = function ($event) {
        //show date picker and make sure other date picker is hidden
        lc.dateStartIsOpen = false;
        lc.dateEndIsOpen = !lc.dateEndIsOpen;
        $event.preventDefault();
        $event.stopPropagation();
    };

    lc.dateEndUpdate = function () {
        dateChanged = true;

        if (lc.dateEnd.getTime() < minimumDate) lc.dateEnd = new Date(minimumDate);
        if (lc.dateEnd.getTime() > maximumDate) lc.dateEnd = new Date(maximumDate);

        lc.dateRangeModel = JSON.stringify({
            start: lc.dateStart,
            end: lc.dateEnd
        });
    };

    /*
    User Type Facet
    */

    lc.userTypeModel = 'LDAP';
    lc.selectedUserType = 'LDAP';
    lc.revertUser = false;

    lc.userTypeOptions = {
        ldap: 'LDAP',
        imap: 'IMAP',
        eca: 'ECA',
        admin: 'Admin'
    };

    $scope.$watch('lc.selectedUserType', function (newValue, oldValue) {
        if (newValue !== oldValue) {

            //if we are deselecting then we want to revert the user
            if (lc.revertUser) {
                lc.revertUser = false;
                selectedUserModel = null;
            } else lc.userTypeModel = newValue;
        }
    });

    lc.userTypeSelect = function () {

        //store the new selected user model
        selectedUserModel = lc.userTypeModel;

        //based on the user type show the data and change the color
        switch (lc.userTypeModel) {

            case 'LDAP':
                chartData = ldapData;
                lc.lineChart.lineoptions.colors = [flotChartColors.primary];
                break;

            case 'IMAP':
                chartData = imapData;
                lc.lineChart.lineoptions.colors = [flotChartColors.secondary1];
                break;

            case 'ECA':
                chartData = ecaData;
                lc.lineChart.lineoptions.colors = [flotChartColors.secondary2];
                break;

            case 'Admin':
                chartData = adminData;
                lc.lineChart.lineoptions.colors = [flotChartColors.secondary3];
                break;
        }

        //update the chart data
        lc.lineChart.data[0].data = chartData;

        //update the y axis range
        updateChartYAxis();
    };

    lc.userTypeDeselect = function () {
        //if we are deselecting then reset
        if (lc.userTypeModel === selectedUserModel) {

            //set the user model to empty string to remove selected label
            lc.userTypeModel = '';

            //reset chart data
            chartData = ldapData;
            lc.lineChart.lineoptions.colors = [flotChartColors.primary];
            lc.lineChart.data[0].data = chartData;

            //update the y axis range
            updateChartYAxis();

            //update redio buttons
            lc.selectedUserType = 'LDAP';
            lc.revertUser = true;
        } else {
            lc.revertUser = false;
        }
    };

    lc.userTypeDisplay = function () {
        return lc.userTypeModel;
    };

    /*
    Set up line chart for example
    */

    lc.lineChart = {
        data: [{
            label: "line",
            data: ldapData
        }],
        lineoptions: {
            series: {
                lines: {
                    show: true,
                    lineWidth: 3,
                    fill: false
                },
                shadowSize: 0,
                highlightColor: [flotChartColors.secondary]
            },
            xaxis: {
                tickDecimals: 0,
                mode: 'time',
                timeformat: "%b %y",
                tickColor: flotChartColors.transparent,
                min: minimumDate,
                max: maximumDate
            },
            yaxis: {},
            colors: [flotChartColors.primary],
            grid: {
                color: [flotChartColors.gridColor],
                hoverable: true,
                clickable: true,
                tickColor: [flotChartColors.tickColor],
                borderWidth: 1,
                borderColor: flotChartColors.borderColor
            },
            legend: {
                show: false
            },
            tooltip: {
                show: true,
                snap: true,
                shifts: {
                    x: 0,
                    y: -47
                },
                content: "x: %x, y: %y"
            }
        }
    };

    /*
    Get Sample Random Data
    */
    function getPointsWithinRange(rangeStart, rangeEnd, step, low, high) {
        var points = [];

        for (var i = rangeStart; i <= rangeEnd; i += step) {
            var randomPoint = Math.floor(Math.random() * (high - low + 1) + low);
            points.push([i, randomPoint]);
        }
        return points;
    }

}