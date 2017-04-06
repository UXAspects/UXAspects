angular.module('app').directive('uxdSingleSelectTableWrapper', () => {
    return {
        restrict: 'E',
        controller: 'SingleSelectTableCtrl as vm',
        template: require('./single-select-table-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('SingleSelectTableCtrl', ['$scope', SingleSelectTableCtrl]);

function SingleSelectTableCtrl($scope: angular.IScope) {
    var vm = this;

    vm.$onDestroy = function () {
        $scope.$destroy();
    };

    let chance = require('chance').Chance();

    vm.selectedVal = '';
    vm.tableId = 'example-table';
    vm.searchTextSingle = '';
    vm.heading = 'Select an author';
    vm.selectKey = 'name';
    vm.authors = getRandomNameList(40);

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