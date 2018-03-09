backButtonHeader.$inject = ["$state"];

export default function backButtonHeader($state) {
    return {
        restrict: 'E',
        template: require('./backButtonHeader.html'),
        replace: true,
        scope: {
            targetState: "="
        },
        link: function(scope, element) {
            element.on('click', function() {
                $state.go(scope.targetState);
            });
        }
    };
}