angular.module("app").controller("AdvancedInputCtrl", AdvancedInputCtrl);

function AdvancedInputCtrl() {
    var vm = this;
    vm.selectedVal = "";
    vm.searchTextSingle = "";
    vm.heading = "Select an author";
    vm.selectKey = "name";

    vm.authors = [{
            id: "1",
            name: chance.name()
        },
        {
            id: "2",
            name: chance.name()
        },
        ...{
            id: "39",
            name: chance.name()
        },
        {
            id: "40",
            name: chance.name()
        }
    ];
}