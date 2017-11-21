angular.module('elements').controller('UtilitiesCtrl', UtilitiesCtrl);

UtilitiesCtrl.$inject = ['$scope', 'windowCommunicationService'];

function UtilitiesCtrl($scope, windowCommunicationService) {
    var vm = this;

    vm.openInNewWindow = function() {
        var newWindow = windowCommunicationService.createWindow("Test", $scope, "test.html")
    };

}