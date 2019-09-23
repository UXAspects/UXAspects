angular.module('app').directive('uxdContactsOverflowWrapper', () => {
    return {
        restrict: 'E',
        template: require('./contacts-overflow-wrapper.directive.html'),
        controller: ['$templateCache', '$modal', function ($templateCache, $modal) {
            $templateCache.put('contacts-overflow-modal.html', require('!!raw-loader!../snippets/contacts-overflow-modal.html'));
            $templateCache.put('contacts-overflow-modal-item.html', require('!!raw-loader!../snippets/contacts-overflow-modal-item.html'));

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
        }],
        controllerAs: 'vm'
    };
});

angular.module('app').controller('ContactsOverflowDemoModalCtrl', ['$modalInstance', '$q', 'contacts', function ($modalInstance, $q, contacts) {
    var vm = this;

    vm.scrollConfig = {
        resizeSensor: true
    };

    vm.pageSize = 25;
    vm.pageFunction = function (page: any, pageSize: any) {
        return $q.when(contacts.slice(page * pageSize, (page + 1) * pageSize));
    };

    vm.ok = function () {
        $modalInstance.close();
    };
}]);
