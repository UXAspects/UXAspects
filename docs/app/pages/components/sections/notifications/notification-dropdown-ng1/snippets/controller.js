angular.module('app').controller('NotificationDropdownDemoCtrl', NotificationDropdownDemoCtrl);

NotificationDropdownDemoCtrl.$inject = ['$scope', 'notificationService'];

function NotificationDropdownDemoCtrl($scope, notificationService) {
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
}

