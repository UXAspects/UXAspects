angular.module('app').controller('AlertStylesDemoCtrl', AlertStylesDemoCtrl);

function AlertStylesDemoCtrl() {
    var vm = this;

    vm.infoAlert = {
        type: 'info',
        msg: 'This is an example of an info alert.',
        linkText: 'Alert Link'
    };
    vm.errorAlert = {
        type: 'error',
        msg: 'This is an example of an error alert.',
        linkText: 'Alert Link'
    };
}