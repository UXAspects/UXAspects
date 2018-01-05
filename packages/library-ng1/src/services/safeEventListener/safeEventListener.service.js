export default function safeEventListener() {

    return {
        create: create
    };

    function create($scope) {

        var events = [];

        $scope.$on('$destroy', function() {

            //Cancel any remaining promises
            for (var i = 0; i < events.length; i++) {
                var evt = events[i];
                if (!evt.destroyed) unbind(evt.element, evt.evt, evt.handler);
            }
            events = [];
        });

        return {
            bind: bind,
            unbind: unbind
        };

        function unbind(element, evt, handler) {
            for (var i = 0; i < events.length; i++) {
                var evnt = events[i];

                if (evnt.element === element && evnt.evt === evt && evnt.handler === handler) {

                    //if already destroyed we dont need to do again
                    if (evnt.destroyed) continue;

                    //remove associate event listener
                    evnt.element.removeEventListener(evnt.evt, evnt.handler);

                    evnt.destroyed = true;
                }
            }
        }

        function bind(element, evt, handler) {
            events.push({
                element: element,
                evt: evt,
                handler: handler,
                destroyed: false
            });

            element.addEventListener(evt, handler);
        }
    }

}