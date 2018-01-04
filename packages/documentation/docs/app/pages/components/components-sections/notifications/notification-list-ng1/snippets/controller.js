angular.module('app').controller('NotificationListDemoCtrl', NotificationListDemoCtrl);

function NotificationListDemoCtrl() {
    var vm = this;

    vm.notificationModalOptions = {
        title: "Alerts",
        main: "modalLayout.html",
        modalColumns: "notification-modal",
        affixHeader: true
    };
}

