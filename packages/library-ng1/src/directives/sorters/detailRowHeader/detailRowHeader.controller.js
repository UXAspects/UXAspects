DetailRowHeaderCtrl.$inject = ["$scope", "$attrs"];

export default function DetailRowHeaderCtrl($scope, $attrs) {
    var vm = this;

    vm.headers = $scope.$parent.$eval($attrs.headers);

    var sortOrder = [];

    vm.sort = function(header) {

        // if we do not have a sort property then return
        if (!header.sort) {
            return;
        }

        // check if currently sorting
        if (vm.sortingActive(header.sort)) {

            // get the sorter object
            var sorter = getActiveSorter(header.sort);

            // if ascending is false then remove the sorter
            if (sorter.ascending === false) {
                removeSorter(sorter);
            } else {

                // otherwise we want to invert the direction
                sorter.ascending = false;

                // then move to the bottom of the stack
                moveToTail(sorter);
            }


        } else {
            // add sorter to array
            sortOrder.push({
                name: header.sort,
                ascending: true
            });
        }

        // call the select function if there is one
        if (header.select) {

            // get the sorter data in the expected format
            var sorterData = getSorterData();

            // call function with data
            header.select.call(this, sorterData.sorters, sorterData.ascending);
        }
    };

    vm.getSortIcon = function(header) {

        // if not active return null
        if (vm.sortingActive(header.sort) === false) {
            return null;
        }

        // get active sorter object
        var sorter = getActiveSorter(header.sort);

        // return icon based on direction
        return sorter.ascending ? 'hpe-ascend' : 'hpe-descend';
    };

    vm.getSortOrder = function(header) {

        // if only one item is selected then return empty string
        if (sortOrder.length < 2) {
            return '';
        }

        // if the item is not active then also return an empty string
        if (vm.sortingActive(header.sort) === false) {
            return '';
        }

        // otherwise get the sorter object
        var sorter = getActiveSorter(header.sort);

        // find position in array
        var index = sortOrder.indexOf(sorter);

        // return number (incremented by 1 for user friendliness)
        return index + 1;
    };

    vm.sortingActive = function(sorter) {

        // if sorter is not defined return false
        if (!sorter) {
            return false;
        }

        // find any sorters with the same name
        var matchingSorters = sortOrder.filter(function(activeSorter) {
            return activeSorter.name === sorter;
        });

        // return whether any were found
        return matchingSorters.length !== 0;
    };

    // Private Functions
    function getActiveSorter(sorter) {
        // find any sorters with the same name
        var matchingSorters = sortOrder.filter(function(activeSorter) {
            return activeSorter.name === sorter;
        });

        // return whether any were found
        return matchingSorters[0];
    }

    function removeSorter(sorter) {

        // find sorter index
        var index = sortOrder.indexOf(sorter);

        // remove from array
        sortOrder.splice(index, 1);
    }

    function moveToTail(sorter) {

        // remove from the array
        removeSorter(sorter);

        // add to the end of array
        sortOrder.push(sorter);
    }

    function getSorterData() {
        return {
            sorters: sortOrder.map(function(sorter) {
                return sorter.name;
            }),
            ascending: sortOrder.map(function(sorter) {
                return sorter.ascending;
            })
        };
    }

}