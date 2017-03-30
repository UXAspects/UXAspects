angular.module('app').controller('ContactsOverflowDemoModalCtrl', ContactsOverflowDemoModalCtrl);

ContactsOverflowDemoModalCtrl.$inject = ['$modalInstance', '$q', 'contacts'];

function ContactsOverflowDemoModalCtrl($modalInstance, $q, contacts) {
    var vm = this;

    vm.scrollConfig = {
        resizeSensor: true
    };

    vm.pageSize = 25;
    vm.pageFunction = function (page, pageSize) {
        return $q.when(contacts.slice(page * pageSize, (page + 1) * pageSize));
    };

    vm.ok = function () {
        $modalInstance.close();
    };
}