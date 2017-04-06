angular.module('app').controller('SearchToolbarDemoCtrl', SearchToolbarDemoCtrl);

function SearchToolbarDemoCtrl() {
    var vm = this;

    vm.list = [];
    for (var i = 0; i < 15; i += 1) {
        vm.list.push(chance.name());
    }

    vm.search = function (text) {
        // Search logic goes here
    };
}