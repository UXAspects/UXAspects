angular.module('app').controller('MultipleSelectTableCtrl', MultipleSelectTableCtrl);

function MultipleSelectTableCtrl() {
    var vm = this;

    vm.multipleSelectedVals = [];
    vm.searchText = '';
    vm.heading = 'Select an author';
    vm.selectKey = 'name';

    vm.authors = getRandomNameList(40);

    vm.getSelection = function () {
        return vm.multipleSelectedVals.map(function (elem) {
            return elem.name;
        }).join(', ');
    };

    vm.clearSelection = function () {
        vm.multipleSelectedVals = [];
    };

    function getRandomNameList(total) {
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