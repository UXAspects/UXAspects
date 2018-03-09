SafeAnimationFrame.$inject = ['$window'];

export default function SafeAnimationFrame($window) {

    return {
        create: create
    };

    function create($scope) {

        //create shim
        $window.requestAnimFrame = (function() {
            return $window.requestAnimationFrame ||
                $window.webkitRequestAnimationFrame ||
                $window.mozRequestAnimationFrame ||
                function(callback) {
                    $window.setTimeout(callback, 1000 / 60);
                };
        })();

        var callbacks = [];
        var isDestroyed = false;

        //start loop
        (function loop() {
            if (isDestroyed) return;

            //process all callbacks
            processCallbacks();

            $window.requestAnimFrame(loop);
        })();

        $scope.$on('$destroy', function() {

            //clear all callbacks
            callbacks = [];

            isDestroyed = true;
        });

        return {
            animationFrame: animationFrame,
            cancelAnimationFrame: cancelAnimationFrame
        };

        function cancelAnimationFrame(id) {
            callbacks[id] = null;
        }

        function animationFrame(handler) {
            //store function - return id
            return callbacks.push(handler);
        }

        function processCallbacks() {
            for (var i = 0; i < callbacks.length; i++) {
                var callback = callbacks[i];
                if (callback) callback();
            }
        }
    }

}