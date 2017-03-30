SortDirectionToggleCtrl.$inject = ["$scope", "$element"];

export default function SortDirectionToggleCtrl($scope, $element) {
    var sdt = this;
    sdt.sorters = $scope.sorters;
    sdt.descend = $scope.descend || false;
    sdt.icon = $element.find('.sort-icon')[0];

    sdt.activeSorter = null;

    //set the default sort details
    for (var i = 0; i < sdt.sorters.length; i++) {
        if (sdt.sorters[i].defaultSorter) {
            sdt.name = sdt.sorters[i].name;
            sdt.sort = sdt.sorters[i].sort;
            sdt.activeSorter = sdt.sorters[i];
            break;
        }
    }

    // if no sorter has been selected by default select the first sorter
    if (sdt.activeSorter === null) {
        sdt.name = sdt.sorters[0].name;
        sdt.sort = sdt.sorters[0].sort;
        sdt.activeSorter = sdt.sorters[0];
    }

    //call the function which sorts the table
    sdt.activeSorter.select(sdt.sort, sdt.descend);


    //called when an item is selected from the dropdown
    sdt.select = function(sorter) {
        //get the index
        sdt.activeSorter = sorter;
        sdt.sort = sorter.sort;
        sdt.name = sorter.name;
        //sort table
        sorter.select(sdt.sort, sdt.descend);
    };

    //called when the ascending/descending icon is clicked
    sdt.toggle = function() {
        //remove focus on click
        sdt.icon.blur();

        if (sdt.descend)
            sdt.descend = false;
        else
            sdt.descend = true;

        //sort table
        sdt.activeSorter.select(sdt.sort, sdt.descend);
    };


    //called when the ascending/descending icon is clicked
    sdt.toggleKeypress = function($event) {
        if ($event.keyCode === 13) {

            //remove focus on click
            sdt.icon.blur();

            if (sdt.descend)
                sdt.descend = false;
            else
                sdt.descend = true;

            //sort table
            sdt.activeSorter.select(sdt.sort, sdt.descend);
        }
    };

}