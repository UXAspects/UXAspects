export default function scrollIntoViewIf() {
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            // Scroll into view when condition evaluates to true.
            scope.$watch(attrs.scrollIntoViewIf, value => {
                if (value) {
                    element.get(0).scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }
            });
        }
    };
}