export default function TimeAgoService() {
    var vm = this;

    var defaultStrings = {
        lessThanSecond: 'less than a second ago',
        second: '1 second ago',
        seconds: '{x} seconds ago',
        minute: '1 minute ago',
        minutes: '{x} minutes ago',
        hour: '1 hour ago',
        hours: '{x} hours ago',
        day: '1 day ago',
        days: '{x} days ago',
        week: '1 week ago',
        weeks: '{x} weeks ago',
        month: '1 month ago',
        months: '{x} months ago',
        year: '1 year ago',
        years: '{x} years ago'
    };

    //store the active string set
    var stringSet = defaultStrings;

    //time enum
    vm.timeUnit = {
        second: 1000,
        minute: 60000,
        hour: 3600000,
        day: 86400000,
        week: 604800000,
        month: 2419200000,
        year: 31536000000
    };

    vm.setStrings = function(strings) {
        //update the string set
        stringSet = angular.extend(defaultStrings, strings);
    };

    vm.timeSinceNow = function(date) {
        //call the time since function with the since time as now
        return vm.timeSince(date, new Date());
    };

    vm.timeSince = function(date, dateSince) {

        //get epochs
        var dateEpoch = date.getTime();
        var dateSinceEpoch = dateSince.getTime();

        //time difference
        var timeDifference = dateSinceEpoch - dateEpoch;

        //ensure the date was in the past
        if (timeDifference < 0) throw 'Time Ago Service - Cannot convert future dates to a string';

        //less than one second ago
        if (timeDifference < vm.timeUnit.second) return stringSet.lessThanSecond;

        //one second ago
        if (timeDifference < (vm.timeUnit.second * 2)) return stringSet.second;

        //x seconds ago
        if (timeDifference < (vm.timeUnit.minute)) return formatString(Math.floor(timeDifference / vm.timeUnit.second), stringSet.seconds);

        //one minute ago
        if (timeDifference < (vm.timeUnit.minute * 2)) return stringSet.minute;

        //x minutes ago
        if (timeDifference < (vm.timeUnit.minute * 60)) return formatString(Math.floor(timeDifference / vm.timeUnit.minute), stringSet.minutes);

        //one hour ago
        if (timeDifference < (vm.timeUnit.hour * 2)) return stringSet.hour;

        //x hours ago
        if (timeDifference < (vm.timeUnit.hour * 24)) return formatString(Math.floor(timeDifference / vm.timeUnit.hour), stringSet.hours);

        //one day ago
        if (timeDifference < (vm.timeUnit.day * 2)) return stringSet.day;

        //x days ago
        if (timeDifference < (vm.timeUnit.day * 7)) return formatString(Math.floor(timeDifference / vm.timeUnit.day), stringSet.days);

        //one week ago
        if (timeDifference < (vm.timeUnit.week * 2)) return stringSet.week;

        //x weeks ago
        if (timeDifference < (vm.timeUnit.week * 4)) return formatString(Math.floor(timeDifference / vm.timeUnit.week), stringSet.weeks);

        //one month ago
        if (timeDifference < (vm.timeUnit.month * 2)) return stringSet.month;

        //x months ago
        if (timeDifference < (vm.timeUnit.month * 12)) return formatString(Math.floor(timeDifference / vm.timeUnit.month), stringSet.months);

        //one year ago
        if (timeDifference < (vm.timeUnit.year * 2)) return stringSet.year;

        //x years ago
        else return formatString(Math.floor(timeDifference / vm.timeUnit.year), stringSet.years);

    };

    function formatString(unit, string) {
        if (string.indexOf('{x}') === -1)
            throw 'Time Ago - Variable unit strings should have an {x} in the string to define where the unit should be placed.';

        return string.replace('{x}', unit);
    }

    return vm;
}