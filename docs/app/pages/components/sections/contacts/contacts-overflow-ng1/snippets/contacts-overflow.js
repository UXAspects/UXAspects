angular.module('app').controller('ContactsOverflowDemoCtrl', ContactsOverflowDemoCtrl);

ContactsOverflowDemoCtrl.$inject = ['$modal'];

function ContactsOverflowDemoCtrl($modal) {
    var vm = this;

    vm.overflowContacts = [{
        text: 'DS',
        detail: 'Dean Smith'
    }, {
        text: 'JB',
        detail: 'James Bell'
    }, {
        text: 'RY',
        detail: 'Rose Young'
    }, {
        text: 'PJ',
        detail: 'Paul Jones'
    }, {
        text: 'GM',
        detail: 'Glen Manning'
    }, {
        text: 'MU',
        detail: 'Mike Underwood'
    }, {
        text: 'LH',
        detail: 'Leah Harris'
    }];
    for (var i = 0; i < 100; i += 1) {
        vm.overflowContacts.push({
            text: 'C' + i,
            detail: 'Contact ' + i
        });
    }

    vm.organization = {
        text: 'Investing',
        label: 'risk'
    };

    vm.size = 'medium';

    vm.colors = {
        primary: '#7b63a3',
        secondary: '#ffffff'
    };

    vm.colorsAlt = {
        primary: '#025662',
        secondary: '#ffffff'
    };

    vm.onOverflowClick = function () {
        $modal.open({
            animation: false,
            templateUrl: 'contacts-overflow-modal.html',
            controller: 'ContactsOverflowDemoModalCtrl',
            controllerAs: 'vm',
            resolve: {
                contacts: function () {
                    return vm.overflowContacts;
                }
            },
            keyboard: 'true'
        });
    };
}
