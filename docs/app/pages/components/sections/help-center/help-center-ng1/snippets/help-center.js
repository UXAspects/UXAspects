angular.module('app').controller('HelpCenterCtrl', HelpCenterCtrl);

function HelpCenterCtrl() {

    var vm = this;
    
    vm.sortHelpCenter = function (prev, next) {
        if (prev.title > next.title) {
            return 1;
        } else if (prev.title < next.title) {
            return -1;
        } else {
            return 0;
        }
    };
}