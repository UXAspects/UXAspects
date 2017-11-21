angular.module('app').controller('DismissableStylesDemoCtrl', DismissableStylesDemoCtrl);

function DismissableStylesDemoCtrl() {
    var vm = this;

    vm.addDismissAlert = function (type) {
        vm.dismissAlerts.push({
            type: type,
            msg: 'This is an example of a dismissible ' + type + ' alert.',
            linkText: 'Alert Link'
        });
    };

    vm.dismissAlerts = [];
    vm.addDismissAlert('info');
    vm.addDismissAlert('error');
    
    vm.close = function (item) {
        vm.dismissAlerts.splice(vm.dismissAlerts.indexOf(item), 1);
    };
}