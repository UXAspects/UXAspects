export default function cardFront() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: '<div class="front" ng-transclude></div>'
    };
}