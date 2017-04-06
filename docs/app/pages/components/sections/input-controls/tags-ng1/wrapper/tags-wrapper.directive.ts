angular.module('app').directive('uxdTagsWrapper', () => {
    return {
        restrict: 'E',
        controller: 'TagsCtrl as vm',
        template: require('./tags-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('TagsCtrl', ['$scope', TagsCtrl]);

function TagsCtrl($scope: angular.IScope) {
    var vm = this;

    vm.$onDestroy = function() {
       $scope.$destroy();
    };

    vm.tags = ['Redundant', 'Trivial', 'Obsolete', 'Deletion Scheduled', 'SharePoint 2007 Repository'];

    vm.demoOptions1 = {
        placeholder: 'Add tag',
        maxNumberTags: 8,
        maxTagsMessage: 'Maximum number of tags has been added'
    };

    vm.demoApi = {
        onTagAdding: function () {
            if (vm.tags.length >= vm.demoOptions1.maxNumberTags) {
                return false;
            }
            return true;
        },

        onTagRemoving: function () {
            return true;
        }
    };

}