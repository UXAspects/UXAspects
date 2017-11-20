angular.module('app').controller('FileTypesPanelCtrl', FileTypesPanelCtrl);

FileTypesPanelCtrl.$inject = ['$scope', 'searchBuilderPanel'];

function FileTypesPanelCtrl($scope, searchBuilderPanel) {
    var vm = this;

    //store the filter text
    vm.filterText = '';

    //store all the possible fields
    vm.fileTypes = [];

    vm.selectFileType = function (fileType) {
        fileType.checked = !fileType.checked;
    };

    //when the panel is dismissed resolve the deferred object
    searchBuilderPanel.onDismiss(function (deferred) {
        var selectedFileTypes = vm.fileTypes.filter(function (fileType) {
            return fileType.checked;
        });

        //we only want to return file types names
        var fileTypes = [];

        selectedFileTypes.forEach(function (fileType) {
            fileTypes.push(fileType.name);
        });

        if (deferred) deferred.resolve(fileTypes);
    });

    //check any items already selected in the search component
    prepareItems();

    function prepareItems() {
        var data = searchBuilderPanel.getData();

        var fileTypes = data.fileTypes;

        fileTypes.forEach(function (fileType) {
            vm.fileTypes.push({
                name: fileType,
                checked: false
            });
        });

        //if there are no selected file types then stop here
        if (!data.selected) return;

        data.selected.forEach(function (selected) {
            vm.fileTypes.forEach(function (fileType) {
                //if it is a match set the checked value to true
                if (fileType.name === selected) fileType.checked = true;
            });
        });
    }
}