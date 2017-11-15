angular.module('app').controller('ListItemFilterCtrl', ListItemFilterCtrl);

function ListItemFilterCtrl() {
    var vm = this;

    // store the text to filter lists
    vm.filterText = '';

    // store a list of names
    vm.names = [];

    // generate names using chance
    for (var i = 0; i < 10; i++) {
        vm.names.push(chance.name());
    }
  
}