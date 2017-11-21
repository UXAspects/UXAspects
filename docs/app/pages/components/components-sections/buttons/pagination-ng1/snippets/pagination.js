angular.module('app').controller('PaginationCtrl', PaginationCtrl);

function PaginationCtrl() {
    var vm = this;

    vm.totalItems = 100;
    vm.currentPage = 1;
    vm.numPages = 0;
}
