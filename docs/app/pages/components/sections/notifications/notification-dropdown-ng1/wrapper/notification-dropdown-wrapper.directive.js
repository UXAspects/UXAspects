angular.module('app').directive('uxdNotificationDropdownWrapper', () => {
    return {
        restrict: 'E',
        template: require('./notification-dropdown-wrapper.directive.html'),
        controller: ['$scope', '$templateCache', 'notificationService', function ($scope, $templateCache, notificationService) {
            $templateCache.put('modalLayout.html', require('../snippets/modalLayout.html'));
            $templateCache.put('notification.html', require('../snippets/notification.html'));
            
            var vm = this;

            var sampleNotifications = [{
                icon: 'hpe-user',
                text: 'Add new custodians (23) submitted',
                duration: 2000,
                backgroundColor: '#01A982'
            }, {
                icon: 'hpe-alert',
                text: 'Export Michael J. Angelakis completed with 2 errors',
                duration: 2000,
                backgroundColor: '#60798d'
            }, {
                icon: 'hpe-archive',
                text: 'Export Marc Andressen submitted',
                duration: 2000,
                backgroundColor: '#FF454F'
            }];

            var currentNotification = 0;

            //update the visibility of the notifications
            vm.hideNotifications = false;

            //watch the notifications that have been displayed
            vm.previousNotifications = [];

            //keep a count of the number of notifications
            vm.notificationCount = 0;

            vm.showNextNotification = function () {

                //next notification
                var nextNotification = sampleNotifications[currentNotification];

                //show the next notifications
                notificationService.showNotification(nextNotification);

                //increment notification counter
                currentNotification++;

                //loop notifications
                if (currentNotification > 2) currentNotification = 0;
            };

            //when a notification has been added update the array
            $scope.$watch(function () {
                return notificationService.getNotifications();
            }, function (nv, ov) {

                //update notification count
                vm.notificationCount = nv.length;

                //return the three most recent notifications
                if (!angular.equals(nv, ov)) vm.previousNotifications = nv.slice().reverse().slice(0, 3);

            }, true);

            //watch when the visibility of the notifications changes
            $scope.$watch('vm.hideNotifications', function (nv, ov) {
                if (nv !== ov) notificationService.setNotificationVisibility(!nv);
            });

            vm.notificationModalOptions = {
                title: "Alerts",
                main: "modalLayout.html",
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

angular.module('app').controller('NotificationDropdownDemoModalCtrl', NotificationDropdownDemoModalCtrl);

NotificationDropdownDemoModalCtrl.$inject = ['$q', '$scope', 'safeTimeout', 'timeAgoService']

function NotificationDropdownDemoModalCtrl($q, $scope, safeTimeout, timeAgoService) {
    var vm = this;

    var chance = require('chance').Chance();

    //create safe timeout instance
    var safeTimeoutInstance = safeTimeout.create($scope);

    vm.itemTemplateUrl = 'notification.html';

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