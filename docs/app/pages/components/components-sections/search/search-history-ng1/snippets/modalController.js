angular.module("app").controller('SearchHistoryDemoModalCtrl', SearchHistoryDemoModalCtrl);

SearchHistoryDemoModalCtrl.$inject = ['$modalInstance'];

function SearchHistoryDemoModalCtrl($modalInstance) {
    var vm = this;

    vm.selectOptions = {
        placeholder: 'Select a type',
        scroll: false
    };

    vm.types = ["String", "User", "File", "Mail"];

    vm.selectedType = "";
    vm.text = "";
    vm.any = "";
    vm.all = "";
    vm.exclude = "";

    var typeIcon = {
        string: 'hpe-search',
        user: 'hpe-user',
        file: 'hpe-folder',
        mail: 'hpe-mail'
    };

    vm.search = function () {
        var searchObj = {
            icon: typeIcon[vm.selectedType.toLowerCase()],
            text: vm.text,
            any: vm.any,
            all: vm.all,
            exclude: vm.exclude
        };
        $modalInstance.close(searchObj);
    };

    vm.cancel = function () {
        $modalInstance.dismiss("cancel");
    };
}