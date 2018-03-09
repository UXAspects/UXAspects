forceFocus.$inject = ["$timeout"];

export default function forceFocus($timeout) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var timeout = attrs.timeout ? parseInt(attrs.timeout, 10) : 200;

            var preventFocus = scope.$eval(attrs.preventFocus);
            var isChosen = scope.$eval(attrs.chosen);

            if (!preventFocus) {
                $timeout(function () {
                    if (isChosen) {
                        element.trigger("chosen:activate");
                    } else {
                        element.focus();
                    }
                }, timeout);
            }
        }
    };
}