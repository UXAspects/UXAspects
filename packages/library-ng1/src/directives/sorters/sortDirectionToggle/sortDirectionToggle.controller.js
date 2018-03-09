export default class SortDirectionToggleCtrl {

    constructor($scope, $element, $timeout) {
        this.descend = this.descend ? this.descend : false;
        this.activeSorter = null;
        this.icon = $element.find('.sort-icon').first();

        // once we have all required values then initialise
        $timeout(this.initialise.bind(this));
    }

    initialise() {

        // find the default sorter
        this.activeSorter = this.sorters.find(sorter => sorter.defaultSorter);

        // if no default was provided then use the first sorter
        if (!this.activeSorter) {
            this.activeSorter = this.sorters[0];
        }

        // select the initial sorter
        this.activeSorter.select(this.activeSorter.sort, this.descend);
    }

    select(sorter) {
        // get the index
        this.activeSorter = sorter;

        //sort table
        sorter.select(this.activeSorter.sort, this.descend);
    }

    toggle() {
        // remove focus on click
        this.icon.blur();

        // toggle the direction
        this.descend = !this.descend;

        // perform the sort
        this.activeSorter.select(this.activeSorter.sort, this.descend);
    }

    toggleKeypress($event) {
        if ($event.keyCode === 13) {
            this.toggle();
        }
    }

}

SortDirectionToggleCtrl.$inject = ['$scope', '$element', '$timeout'];