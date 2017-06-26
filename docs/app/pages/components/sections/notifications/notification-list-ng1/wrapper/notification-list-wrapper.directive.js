angular.module('app').directive('uxdNotificationListWrapper', () => {
    return {
        restrict: 'E',
        template: require('./notification-list-wrapper.directive.html'),
        controller: ['$scope', '$templateCache', function ($scope, $templateCache) {
            $templateCache.put('notification-list-ng1/modalLayout.html', require('!!raw-loader!../snippets/modalLayout.html'));
            $templateCache.put('notification-list-ng1/notification.html', require('!!raw-loader!../snippets/notification.html'));

            var vm = this;

            vm.notificationModalOptions = {
                title: "Alerts",
                main: "notification-list-ng1/modalLayout.html",
                modalColumns: "notification-modal",
                affixHeader: true
            };

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm'
    };
});

angular.module('app').controller('NotificationListDemoModalCtrl', NotificationListDemoModalCtrl);

NotificationListDemoModalCtrl.$inject = ['$q', '$scope', 'safeTimeout', 'timeAgoService']

function NotificationListDemoModalCtrl($q, $scope, safeTimeout, timeAgoService) {
    var vm = this;

    var chance = require('chance').Chance();

    //create safe timeout instance
    var safeTimeoutInstance = safeTimeout.create($scope);

    vm.itemTemplateUrl = 'notification-list-ng1/notification.html';

    vm.getPage = function (pageNumber, pageSize) {
        //return promise to simulate loading from a server
        var defer = $q.defer();

        safeTimeoutInstance.timeout(function () {

            //generate some fake notifications here
            var notifications = [];

            //show a maximimum of 10 pages
            if (pageNumber >= 10) {
                defer.resolve([]);
                return;
            }

            for (var i = 0; i < pageSize; i++) {
                notifications.push(generateNotification(pageNumber, i));
            }

            defer.resolve(notifications);
        }, 500);

        return defer.promise;
    };

    function generateNotification(pageNumber, index) {

        var type = Math.floor(Math.random() * 5);

        var icon, text;

        switch (type) {
            case 0:
                icon = 'hpe-user';
                text = 'Add new custodians (' + (Math.floor(Math.random() * 25) + 1) + ') submitted';
                break;
            case 1:
                icon = 'hpe-alert';
                text = 'Export ' + chance.name() + ' completed with ' + (Math.floor(Math.random() * 5) + 1) + ' errors';
                break;
            case 2:
                icon = 'hpe-archive';
                text = 'Export ' + chance.name() + ' submitted';
                break;
            case 3:
                icon = 'hpe-checkmark';
                text = 'Add new custodians (' + (Math.floor(Math.random() * 25) + 1) + ') completed';
                break;
            case 4:
                icon = 'hpe-checkmark';
                text = 'Export ' + chance.name() + ' completed';
                break;
        }

        //units that represent time periods in milliseconds
        var timeUnits = {
            second: 1000,
            minute: 60000,
            hour: 3600000,
            day: 86400000,
            week: 604800000,
            month: 2419200000,
            year: 31536000000
        };

        //get the current time in milliseconds
        var now = new Date().getTime();
        var pastTime, idx = index + 1;

        //emulate a point in time in the past based on the pageNumber and index
        if (pageNumber === 0) pastTime = new Date(now - (timeUnits.second * idx));
        else if (pageNumber === 1) pastTime = new Date(now - (timeUnits.minute * idx));
        else if (pageNumber === 2) pastTime = new Date(now - (timeUnits.hour * idx));
        else if (pageNumber === 3) pastTime = new Date(now - (timeUnits.day * Math.ceil(idx / 3)));
        else if (pageNumber === 4) pastTime = new Date(now - (timeUnits.week * Math.ceil(idx / 5)));
        else if (pageNumber === 5) pastTime = new Date(now - (timeUnits.month * Math.ceil(idx / 1.7)));
        else pastTime = new Date(now - timeUnits.year);

        //generate string based on how long ago it was
        var date = timeAgoService.timeSinceNow(pastTime);

        return {
            icon: icon,
            text: text,
            date: date
        };
    }
}