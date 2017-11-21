angular.module("elements").controller("NotificationCtrl", NotificationCtrl);

NotificationCtrl.$inject = ['notificationService', '$colorService'];

function NotificationCtrl(notificationService, $colorService) {
    var vm = this;

    vm.showNotification = function () {

        var options = {
            icon: 'hpe-chat',
            title: 'Messages Received',
            text: 'You have 16 messages',
            subtitle: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
            duration: 4000,
            backgroundColor: $colorService.getColor('primary').toHex()
        };

        notificationService.showNotification(options);
    };

    vm.dismissAll = function () {
        notificationService.dismissAllNotifications();
    };
}