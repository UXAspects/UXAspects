angular.module('app').controller('SideModalDemoCtrl', SideModalDemoCtrl);

function SideModalDemoCtrl() {
    var vm = this;

    vm.sideModalOptions = {
        title: "Site Detail - UX Aspects",
        main: "modalContent.html",
        footer: "modalFooter.html",
        modalColumns: 'col-lg-6 col-md-7 col-sm-9 col-xs-10',
        affixHeader: true
    };
}
