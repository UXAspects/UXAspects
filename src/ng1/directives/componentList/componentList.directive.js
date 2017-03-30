export default function componentList() {
    return {
        restrict: 'E',
        template: require('./componentList.html'),
        transclude: true,
        controller: 'ComponentListCtrl as vm',
        bindToController: true,
        scope: {
            minComponents: '=?',
            maxComponents: '=?',
            buttonText: '@?',
            components: '=ngModel',
            onAdd: '=?',
            onRemove: '=?'
        }
    };
}