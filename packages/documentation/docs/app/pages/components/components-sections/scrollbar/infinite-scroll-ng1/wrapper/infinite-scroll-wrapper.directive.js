angular.module('app').directive('uxdInfiniteScrollWrapper', () => {
    return {
        restrict: 'E',
        template: require('./infinite-scroll-wrapper.directive.html'),
        controller: ['$scope', '$templateCache', '$q', 'safeTimeout', function ($scope, $templateCache, $q, safeTimeout) {
            $templateCache.put('infinite-scroll-ng1/itemTemplate.html', require('./itemTemplate.html'));

            var chance = require('chance').Chance();

            var vm = this;

            var safeTimeoutInstance = safeTimeout.create($scope);
            var departments = ['Finance', 'Operations', 'Investor Relations', 'Technical', 'Auditing', 'Labs'];

            vm.infiniteScrollbarConfig = {
                resizeSensor: true,
                enableKeyboardNavigation: true
            };

            vm.pageSize = 20;
            vm.scrollPosition = 95;
            vm.containerId = 'user-container';
            vm.itemTemplate = 'infinite-scroll-ng1/itemTemplate.html';
            vm.loadMoreButton = {
                show: false
            };

            vm.pageFunction = function (pageNumber, pageSize) {

                //create a deferred object
                var defer = $q.defer();

                //use a timeout to simulate server request
                safeTimeoutInstance.timeout(function () {
                    //create an array contain user name, department and email address
                    var users = [];

                    //generate user information
                    for (var i = 0; i < pageSize; i++) {
                        var name = chance.name();

                        users.push({
                            id: (pageNumber * pageSize) + i + 1,
                            name: name,
                            email: nameToEmail(name),
                            department: departments[Math.floor(Math.random() * 6)]
                        });
                    }

                    defer.resolve(users);
                }, 1000);

                return defer.promise;
            };

            function nameToEmail(name) {
                return name.toLowerCase().replace(' ', '.') + '@business.com';
            }

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm'
    };
});