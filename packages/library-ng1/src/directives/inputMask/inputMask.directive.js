export default function mask() {
    return {
        restrict: 'A',
        scope: true,
        link: function (scope, elem, attrs) {
            scope.mask = scope.$eval(attrs.mask);
            scope.maskType = scope.$eval(attrs.maskType);

            if (attrs.mask) {
                if (attrs.maskType) {
                    elem.inputmask(scope.maskType, scope.mask);
                } else {
                    elem.inputmask(scope.mask);
                }
            }
        }
    };
}