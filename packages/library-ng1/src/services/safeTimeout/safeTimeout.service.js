SafeTimeoutService.$inject = ["$timeout"];

export default function SafeTimeoutService($timeout) {

    return {
        create: create
    };

    function create($scope) {

        var timers = {};

        $scope.$on('$destroy', function() {

            //Cancel any remaining promises
            for (var timer in timers) {
                $timeout.cancel(timers[timer]);
            }

        });

        return {
            timeout: timeout,
            cancel: cancel
        };

        function cancel(timer) {

            //cancel the timer
            $timeout.cancel(timers[timer.$$timeoutId]);

            //release the object
            delete timers[timer.$$timeoutId];
        }

        function timeout(func, delay) {

            //Set a timer 
            var timeout = $timeout(decoratedFunc, delay);

            //Record the timer
            timers[timeout.$$timeoutId] = timeout;

            //Return the passthrough result from the timer call
            return timeout;

            //Set timer with wrapper that records when the timeout has executed
            function decoratedFunc() {

                try {
                    //release the object
                    delete timers[timeout.$$timeoutId];

                    //perform the delayed function
                    return func();

                } catch (e) {
                    console.error(e);
                }
            }

        }
    }

}