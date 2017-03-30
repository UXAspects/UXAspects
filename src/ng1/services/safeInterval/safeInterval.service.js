SafeIntervalService.$inject = ["$interval"];

export default function SafeIntervalService($interval) {

    return {
        create: create
    };

    function create($scope) {

        var intervals = {};

        $scope.$on('$destroy', function() {

            //Cancel any remaining promises
            for (var interval in intervals) {
                $interval.cancel(intervals[interval]);
            }

        });

        return {
            interval: interval,
            cancel: cancel
        };

        function cancel(interval) {

            //cancel the interval
            $interval.cancel(intervals[interval.$$intervalId]);

            //release the object
            delete intervals[interval.$$intervalId];
        }

        function interval(func, delay, count, invokeApply) {

            if (count === undefined) {
                count = 0;
            }

            if (invokeApply === undefined) {
                invokeApply = true;
            }

            //Set an interval
            var interval = $interval(func, delay, count, invokeApply);

            //Record the interval
            intervals[interval.$$intervalId] = interval;

            //Return the passthrough result from the interval call
            return interval;
        }
    }

}