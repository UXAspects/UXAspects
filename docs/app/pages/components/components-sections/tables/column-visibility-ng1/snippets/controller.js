angular.module("app").controller("ColumnVisibilityCtrl", ColumnVisibilityCtrl);

function ColumnVisibilityCtrl() {
    var vm = this;

    vm.columns = {
        id: true,
        data: true,
        user: true,
        value: true
    };

    vm.tableData = [{
        data: 156,
        user: chance.name(),
        value: 40
    }, {
        data: 226,
        user: chance.name(),
        value: -20
    }, {
        data: 52,
        user: chance.name(),
        value: 26
    }, {
        data: 461,
        user: chance.name(),
        value: -23
    }, {
        data: 119,
        user: chance.name(),
        value: 16
    }];
}