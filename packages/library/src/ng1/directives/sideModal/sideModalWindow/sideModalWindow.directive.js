sideModalWindow.$inject = ["sideModalFactory"];

export default function sideModalWindow(sideModalFactory) {
    return {
        restrict: 'A',
        scope: true,
        link: function(scope, element, attrs) {
            scope.sideModalWindow = scope.$eval(attrs.sideModalWindow);
            element.on('click', function() {
                sideModalFactory.open(scope.sideModalWindow);
            });
        }
    };
}