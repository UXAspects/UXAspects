angular.module('app').directive('uxdCustomDropdownWrapper', () => {
    return {
        restrict: 'E',
        controller: 'CustomDropdownCtrl as vm',
        template: require('./custom-dropdown-wrapper.directive.html'),
        scope: true
    };
});

angular.module('app').controller('CustomDropdownCtrl', CustomDropdownCtrl);

CustomDropdownCtrl.$inject = ['$scope', '$timeout'];

function CustomDropdownCtrl($scope: angular.IScope, $timeout: ng.ITimeoutService) {
    var vm = this;

    vm.$onDestroy = function() {
       $scope.$destroy();
    };

    vm.template = require('!file-loader!./template.html');
    vm.searchBox = true;
    vm.searchText = '';
    vm.footer = true;
    vm.applyText = 'OK';
    vm.cancelText = 'Cancel';
    vm.selectAllText = 'Select All';
    vm.deselectAllText = 'Deselect All';
    vm.dropdownHeight = 500;

    vm.values = {
        groups: [{
            groupName: 'Group A',
            values: [{
                    name: 'From',
                    selected: false,
                    selectedChecked: false
                }, {
                    name: 'ID',
                    selected: false,
                    selectedChecked: false
                }, {
                    name: 'From Address',
                    selected: true,
                    selectedChecked: true
                }, {
                    name: 'Feedback',
                    selected: true,
                    selectedChecked: true
                }, {
                    name: 'To',
                    selected: true,
                    selectedChecked: true
                }, {
                    name: 'To Address',
                    selected: false,
                    selectedChecked: false
                }

            ]
        }, {
            groupName: 'Group B',
            values: [{
                    name: 'Feedback Score',
                    selected: false,
                    selectedChecked: false
                }, {
                    name: 'Attachment Count',
                    selected: false,
                    selectedChecked: false
                }, {
                    name: 'Comment',
                    selected: true,
                    selectedChecked: true
                }, {
                    name: 'Content Length',
                    selected: false,
                    selectedChecked: false
                }, {
                    name: 'Content Type',
                    selected: false,
                    selectedChecked: false
                }

            ]
        }, {
            groupName: 'Group C',
            values: [{
                name: 'Overall Sentiment',
                selected: false,
                selectedChecked: false
            }, {
                name: 'Analysis',
                selected: true,
                selectedChecked: true
            }, {
                name: 'Index Values',
                selected: false,
                selectedChecked: false
            }, {
                name: 'Generate Report',
                selected: true,
                selectedChecked: true
            }]
        }]
    };

    vm.updateSelected = function (value: any) {
        value.selected = !value.selected;
        value.selectedChecked = value.selected;
    };

    vm.applyCallback = function () {
        //  do processing when apply is called

        $timeout(function () {
            angular.element('.popover-button').click();
        });

    };
    vm.cancelCallback = function () {
        //  do processing when cancel is called
        $timeout(function () {
            vm.inputVal = '';
            angular.element('.popover-button').click();
        });

    };

    vm.selectAll = function () {
        angular.forEach(vm.values.groups, function (group) {

            angular.forEach(group.values, function (value) {
                if (vm.searchText === undefined || vm.searchText === '' || (value.name.toLowerCase()).indexOf(vm.searchText.toLowerCase()) > -1) {
                    value.selected = true;
                }
            });
        });
    };

    vm.deselectAll = function () {
        angular.forEach(vm.values.groups, function (group) {
            angular.forEach(group.values, function (value) {

                if (vm.searchText === undefined || vm.searchText === '' || (value.name.toLowerCase()).indexOf(vm.searchText.toLowerCase()) > -1) {
                    value.selected = false;
                }

            });
        });
    };

}