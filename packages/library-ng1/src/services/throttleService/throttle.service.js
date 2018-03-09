throttleService.$inject = ['$timeout'];

export default function throttleService($timeout) {
    return function (callback, limit, atEnd) {
        var wait = false;
        return function () {
            if (!wait) {
                if (!atEnd) {
                    callback.apply(null, arguments);
                }
                wait = true;
                $timeout(function () {
                    if (atEnd) {
                        callback.apply(null, arguments);
                    }
                    wait = false;
                }, limit);
            }
        };
    };
}