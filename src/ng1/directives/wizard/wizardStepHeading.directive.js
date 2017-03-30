export default function WizardStepHeading() {
    return {
        restrict: 'A',
        require: '^step',
        link: function(scope, elm) {
            scope.$watch('headingElement', function(heading) {
                if (heading) {
                    elm.html('');
                    elm.append(heading);
                }
            });
        }
    };
}