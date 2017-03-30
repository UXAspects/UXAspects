export default function cardBack() {
    return {
        restrict: 'E',
        transclude: true,
        replace: true,
        template: '<div class="back" ng-transclude></div>'
    };
}