angular.module('app').controller('CustomScrollbarDemoCtrl', CustomScrollbarDemoCtrl);

function CustomScrollbarDemoCtrl() {
    var vm = this;

    vm.scrollBarConfig = {
        resizeSensor: true,
        showOnlyOnHover: false,
        enableKeyboardNavigation: true,
        isScrollableH: false,
        scrollMargin: 5
    };
}