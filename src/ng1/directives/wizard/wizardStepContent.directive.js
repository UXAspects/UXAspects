export default function WizardStepContent() {
    return {
        restrict: 'A',
        require: '^wizard',
        link: function(scope, elm, attrs) {

            var step = scope.$eval(attrs.stepContentTransclude);

            step.$transcludeFn(step.$parent, function(contents) {
                angular.forEach(contents, function(node) {
                    if (isStepHeading(node)) {
                        //Let stepHeadingTransclude know.
                        step.headingElement = node;
                    } else {
                        elm.append(node);
                    }
                });
            });

            function isStepHeading(node) {
                return node.tagName && (
                    node.hasAttribute('step-heading') ||
                    node.hasAttribute('data-step-heading') ||
                    node.tagName.toLowerCase() === 'step-heading' ||
                    node.tagName.toLowerCase() === 'data-step-heading'
                );
            }
        }
    };
}