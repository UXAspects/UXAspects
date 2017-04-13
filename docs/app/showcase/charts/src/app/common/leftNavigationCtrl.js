(function () {
    angular.module('app').controller('LeftNavigationCtrl', LeftNavigationCtrl);

    LeftNavigationCtrl.$inject = ['$rootScope'];

    function LeftNavigationCtrl($rootScope) {
        var vm = this;

        vm.pageName = '';

        $rootScope.$on('$stateChangeSuccess', function (event, toState) {
            switch (toState.name) {
                
                case 'socialchart':
                    vm.pageName = 'Social Chart';
                    break;
                
                case 'partitionmap':
                    vm.pageName = 'Partition Map';
                    break;
                
                case 'sankeychart':
                    vm.pageName = 'Sankey Chart';
                    break;
                   
            }
        });
    }
})();