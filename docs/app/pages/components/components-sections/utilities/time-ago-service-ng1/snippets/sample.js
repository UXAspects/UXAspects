angular.module('app').controller('TimeAgoCtrl', TimeAgoCtrl);

function TimeAgoCtrl() {
    var vm = this;

    //store the time this page was navigated to
    vm.loadTime = new Date();
}