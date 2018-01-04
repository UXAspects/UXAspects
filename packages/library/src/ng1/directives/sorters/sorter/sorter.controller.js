export default class SorterController {

    constructor($scope) {
        this.sorteroption = $scope;
        this.default = $scope.title;
        this.sorteroptions = $scope.sorteroptions = [];
        this.previousSorter = null;
    }

    setTitle(title, defaultVal) {

        let sorterAlreadySelected = null;

        this.sorteroption.name = title;
        this.sorteroption.class = !defaultVal ? 'sorter-selected' : '';

        if (this.previousSorter === this) {

            if (defaultVal) {
                sorterAlreadySelected = true;
                this.previousSorter = null;
            } else {
                sorterAlreadySelected = false;
                this.previousSorter = this;
            }
        }
    }

    addSorterOptions(val) {
        this.sorteroptions.push(val);
    }

}

SorterController.$inject = ["$scope"];