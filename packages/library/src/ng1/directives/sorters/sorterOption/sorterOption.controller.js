export default class SorterOptionCtrl {

    constructor($scope, previewPaneProvider) {

        this.selectCallback = $scope.select;
        this.name = $scope.name;
        this.default = $scope.default;
        this.sorterOption = $scope;
        this.disabled = $scope.disabled;

        if (this.default) {
            this.sorterOption.selectedClass = true;

        }
        this.sorterOption.provider = previewPaneProvider;

        // watch for any changes to the disabled state
        $scope.$watch('disabled', (newValue) => {
            this.disabled = newValue;
        });
    }

    select() {

        // if the sorter is disabled then prevent the click from doing anything
        if (this.disabled) {
            return;
        }

        this.sorter.setTitle(this.name, this.default);
        this.sorter.sorteroptions.forEach(option => option.deselect());
        this.sorterOption.selectedClass = true;
        this.selectCallback();
        this.sorterOption.provider.preview.previewFile = "";
    }

    deselect() {
        this.sorterOption.selectedClass = false;
    }

}

SorterOptionCtrl.$inject = ['$scope', 'previewPaneProvider'];