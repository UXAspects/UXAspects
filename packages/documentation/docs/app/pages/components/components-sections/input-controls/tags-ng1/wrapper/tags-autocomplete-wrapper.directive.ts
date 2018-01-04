angular.module('app').directive('uxdTagsAutocompleteWrapper', () => {
    return {
        restrict: 'E',
        controller: 'TagsAutocompleteCtrl as vm',
        template: require('./tags-autocomplete-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('TagsAutocompleteCtrl', ['$scope', TagsAutocompleteCtrl]);

function TagsAutocompleteCtrl($scope: angular.IScope) {
    var vm = this;

    vm.$onDestroy = function() {
       $scope.$destroy();
    };

    vm.tags2 = [];

    vm.tagSet = ['Red', 'Orange', 'Yellow', 'Green', 'Blue', 'Indigo', 'Violet'];

    vm.demoOptions2 = {
        placeholder: 'Add tag',
        autocomplete: {
            addFromAutocompleteOnly: true
        }
    };
}