angular.module('app').directive('uxdMultipleSelectTableWrapper', () => {
    return {
        restrict: 'E',
        controller: 'MultipleSelectTableCtrl as vm',
        template: require('./multiple-select-table-wrapper.directive.html'),
        scope: true
    };
});


angular.module('app').controller('MultipleSelectTableCtrl', ['$scope', MultipleSelectTableCtrl]);

function MultipleSelectTableCtrl($scope: angular.IScope) {
    var vm = this;

    vm.$onDestroy = function () {
        $scope.$destroy();
    };

    let chance = require('chance').Chance();

    vm.multipleSelectedVals = [];
    vm.searchText = '';
    vm.heading = 'Select an author';
    vm.selectKey = 'name';

    vm.authors = getRandomNameList(40);

    vm.getSelectedIds = function () {
        return vm.multipleSelectedVals.map(function (elem: any) {
            return elem.id;
        }).join(', ');
    };

    vm.clearSelection = function () {
        vm.multipleSelectedVals = [];
    };

    function getRandomNameList(total: number) {
        var list = [];
        for (var i = 0; i < total; i++) {
            list.push({
                'id': i + 1,
                'name': chance.name()
            });
        }
        return list;

    }

}