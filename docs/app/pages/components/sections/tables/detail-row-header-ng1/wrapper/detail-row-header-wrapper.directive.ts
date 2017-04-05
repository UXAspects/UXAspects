angular.module('app').directive('uxdDetailRowHeaderWrapper', () => {
    return {
        restrict: 'E',
        template: require('./detail-row-header-wrapper.directive.html'),
        scope: true,
        controller: ['$templateCache', '$scope', 'detailRowDataService', function ($templateCache, $scope, detailRowDataService) {
            var vm = this;

            // cleanup afterwards
            vm.$onDestroy = function() {
                $scope.$destroy();
            };

            // load popover template
            let popover = require('./templates/detail-row-popover.html');

            // store the template in the template cache
            $templateCache.put('detail-row-header-popover.html', popover);

            vm.detailRowHeaders = [{
                title: 'Type',
                class: 'col-xs-1'
            }, {
                title: 'Participant',
                class: 'col-xs-3'
            }, {
                title: 'From Address',
                class: 'col-xs-3',
                sort: 'address',
                filter: 'detail-row-header-popover.html',
                filterClass: 'demo-filter'
            }, {
                title: 'Subject',
                class: 'col-xs-3',
                sort: 'subject'
            }, {
                title: 'Message Score',
                class: 'col-xs-2',
                sort: 'percent'
            }];

            vm.activeSorter = [null, null, null];
            vm.sortOrder = ['none', 'none', 'none'];
            vm.detailRowTable = detailRowDataService.getDetailRowTable(vm.activeSorter, vm.sortOrder);

            vm.applySorter = () => {

                vm.detailRowHeaders.forEach((detailRowHeader: any) => {

                    detailRowHeader.select = (activeSorter: any, ascending: boolean) => {
                        vm.activeSorter = activeSorter;
                        vm.sortOrder = ascending;
                        vm.detailRowTable = detailRowDataService.getDetailRowTable(vm.activeSorter, vm.sortOrder);
                    };
                });
            };

            vm.applySorter();

            // watches for the filter being added before updating the table
            $scope.$on('detailRowTableUpdated', () => {
                vm.detailRowTable = detailRowDataService.getDetailRowTable(vm.activeSorter, vm.sortOrder);
            });
        }],
        controllerAs: 'vm'
    };
});


/*
    Popover Controller
*/

class DetailRowHeaderPopoverCtrl {

    private scrollBarConfig = {
        autoReinitialise: true,
        autoReinitialiseDelay: 50,
        enableKeyboardNavigation: true,
        scrollMargin: 5
    };

    public filterList: any[] = [];
    public activeFilters: any[] = [];
    public addresses: any[];

    static $inject = ['$scope', 'detailRowDataService'];

    constructor(private $scope: any, private detailRowDataService: any) {

        this.addresses = detailRowDataService.getFilterList();

        this.addresses.forEach(address => {
            this.filterList.push({ address: address, active: false });
        });

        $scope.$on('detailRowHeaderPopoverClosed', () => {
            this.filterList.forEach((filter: any) => {
                filter.active = this.activeFilters.findIndex(activeFilter => activeFilter.address === filter.address) > -1;
            });

        });
    }

    updateSelected(value: any) {
        value.active = !value.active;
    }

    apply() {
        this.activeFilters = [];

        this.filterList.forEach((filter: any) => {
            if (filter.active) {
                this.activeFilters.push(filter);
            }
        });
        
        this.$scope.setFilterActive(this.activeFilters.length > 0);
        this.detailRowDataService.applyFilters(this.activeFilters);
        this.$scope.closePopover();
    }

    reset() {

        this.activeFilters = [];
        this.filterList.forEach(filter => filter.active = false);
        this.$scope.setFilterActive(false);
        this.detailRowDataService.applyFilters(this.activeFilters);
    };

    cancel() {
        this.$scope.closePopover();
    };
}

angular.module('app').controller('DetailRowHeaderPopoverCtrl', DetailRowHeaderPopoverCtrl);
