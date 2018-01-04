export default function searchGroup() {
    return {
        restrict: 'E',
        controller: 'SearchGroupCtrl',
        controllerAs: 'sg',
        template: require('./searchGroup.html'),
        replace: true,
        require: ['^searchBuilder'],
        transclude: true,
        scope: {
            groupId: '=',
            groupTitle: '=',
            operator: '=',
            buttonText: '=',
            maxFields: '=?',
            addField: '=',
            removeField: '=?'
        },
        link: function(scope, element, attr, controllers) {

            //provide access to parent controller
            scope.searchBuilder = controllers[0];

            //get any initial data if there is any
            var initialData = scope.searchBuilder.getGroupValue(scope.groupId);

            if (initialData) {
                scope.sg.setInitialData(initialData);
            }

        }
    };
}