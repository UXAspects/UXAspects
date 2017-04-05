angular.module('elements').controller('UtilitiesCtrl', UtilitiesCtrl);

UtilitiesCtrl.$inject = ['timeAgoService'];

function UtilitiesCtrl(timeAgoService) {
    var vm = this;

    //date from the past - 1 April 2016 00:00
    var pastDate = new Date(1459465200000);

    //time from now
    var timeFromNow = timeAgoService.timeSinceNow(pastDate);

    //time from the 1 January 2017 00:00
    var startDate = new Date(1483228800000);

    var timeFromDate = timeAgoService.timeSince(pastDate, startDate);
}