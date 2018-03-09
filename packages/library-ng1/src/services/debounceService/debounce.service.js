debounceService.$inject = ["$timeout"];

export default function debounceService($timeout) {
    return function(callback, interval) {
        var timeout = null;
        return function() {
            $timeout.cancel(timeout);
            var args = arguments;
            timeout = $timeout(function() {
                callback.apply(this, args);
            }, interval);
        };
    };
}