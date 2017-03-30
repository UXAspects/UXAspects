export default function gridPlugins() {

    var plugins = {
        keyboardNavigation: keyboardNavigation
    };

    return plugins;

    ////////////////
    function keyboardNavigation($scope) {
        return {
            init: function(state, options) {

                // if the keyboard navigation should be default
                if(!options || options.keyboardNavigation !== true) {
                    return;
                }

                $scope.$on('$rowKeyDown', function(scope, data) {
                    
                    var event = data.event;
                    var element = event.target;

                    if(event.keyCode === 38) {

                        // get the previous row element
                        var previous = element.previousElementSibling;

                        // give it focus if not null
                        if(previous !== null) {
                            previous.focus();
                        }

                    } else if(event.keyCode === 40) {

                        // get the next row element
                        var next = element.nextElementSibling;

                        // give it focus if not null
                        if(next !== null) {
                            next.focus();
                        }
                    }
                });
            }
        };
    }
}