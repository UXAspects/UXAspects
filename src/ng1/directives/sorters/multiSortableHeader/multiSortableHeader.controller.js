MultiSortableHeaderCtrl.$inject = ["$scope", "$attrs"];

export default function MultiSortableHeaderCtrl($scope, $attrs) {
    var vm = this;

    vm.headers = $scope.$parent.$eval($attrs.headers);
    vm.activeSorters = $scope.$parent.$eval($attrs.defaultSorter);
    vm.activeOrders = $scope.$parent.$eval($attrs.defaultOrder);
    vm.inlineIcon = $scope.$parent.$eval($attrs.inlineIcon) || false;

    vm.classes = $attrs.class;

    vm.activeHeaders = [];

    vm.columnData = {};

    // iterate each sorter and generate array for us to work with
    for (var idx = 0; idx < vm.activeSorters.length; idx++) {

        // get the current sorter
        var sorter = vm.activeSorters[idx];

        // if we have a none column then break out of the loop
        if (sorter === null || sorter === undefined || sorter.toLowerCase() === 'none') {
            break;
        }

        // find a matching direction
        var descending = vm.activeOrders[idx];

        // only store the header in the activeHeaders array if a direction was specified
        if (descending === true || descending === false) {

            // store the info in the activeHeaders array
            vm.activeHeaders.push({
                sort: sorter,
                descending: descending
            });
        }
    }

    // update data initially
    updateData();

    vm.getHeaderWidth = function(header) {
        // if there is no icon then fill the whole header
        if (!vm.columnData[header.sort]) {
            return { width: '100%' };
        }

        // if the icon should appear just after the text
        if (vm.inlineIcon === true) {
            return { maxWidth: 'calc(100% - 41px)' };
        }

        // otherwise show icon right aligned
        return { width: 'calc(100% - 36px)' };
    };

    vm.select = function(header) {

        // ensure row can be sorted
        if (header.sortable === false) {
            return;
        }

        var existingHeader;

        // check if we are currently sorting by this column
        for (var idx = 0; idx < vm.activeHeaders.length; idx++) {

            // get the current active header
            var activeHeader = vm.activeHeaders[idx];

            // if the selected header is active
            if (activeHeader.sort === header.sort) {

                // store the existing header information
                existingHeader = activeHeader;

                // remove this array item
                vm.activeHeaders.splice(idx, 1);

                // then break out of the loop
                break;
            }
        }

        if (existingHeader) {

            // if previously ascending then change to descending and push to end of queue - otherwise keep deselected
            if (existingHeader.descending === false) {

                // invert sort direction
                existingHeader.descending = true;

                // push on to queue
                vm.activeHeaders.push(existingHeader);
            }

        } else {

            // if not previously existing then add it with default ascending
            vm.activeHeaders.push({
                sort: header.sort,
                descending: false
            });

        }

        // update array bindings
        updateData();

        // call sorting function
        header.select(vm.activeSorters, vm.activeOrders);

    };

    function updateData() {

        // update activeSorters
        vm.activeSorters = vm.activeHeaders.map(function(header) {
            return header.sort;
        });

        vm.activeOrders = vm.activeHeaders.map(function(header) {
            return header.descending;
        });

        // reset column data
        vm.columnData = {};

        // iterate each active header and update data in object so view doesnt call functions on each digest
        vm.activeHeaders.forEach(function(header, index) {

            // store icon and order data
            vm.columnData[header.sort] = {
                icon: header.descending ? 'hpe-descend' : 'hpe-ascend',
                order: index + 1
            };

        });

    }
}