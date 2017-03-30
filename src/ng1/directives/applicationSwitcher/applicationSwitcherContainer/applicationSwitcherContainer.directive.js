export default function applicationSwitcherContainer() {
    return {
        restrict: 'E',
        template: require('./applicationSwitcherContainer.html'),
        controller: 'ApplicationSwitcherContainerCtrl as asc',
        transclude: true,
        replace: true
    };
}