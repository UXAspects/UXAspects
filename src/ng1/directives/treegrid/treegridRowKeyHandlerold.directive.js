treegridRowKeyHandler.$inject = ["keyboardNavigationService"];

export default function treegridRowKeyHandler(keyboardNavigationService) {
    return {
        restrict: 'A',
        link: function(scope, elem, attrs) {

            var Keys = {
                left: 37,
                right: 39
            };

            keyboardNavigationService.keydown(elem, Keys.left, function(e) {
                if (attrs.treegridContract && scope.$eval(attrs.treegridContract)) {
                    e.stopPropagation();
                }
            }, 20);

            keyboardNavigationService.keydown(elem, Keys.right, function(e) {
                if (attrs.treegridExpand && scope.$eval(attrs.treegridExpand)) {
                    e.stopPropagation();
                }
            }, 10);
        }
    };
}