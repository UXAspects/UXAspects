angular.module('app').controller('FileTypesComponentCtrl', FileTypesComponentCtrl);

FileTypesComponentCtrl.$inject = ['$scope', 'searchBuilderPanel'];

function FileTypesComponentCtrl($scope, searchBuilderPanel) {

    var vm = this;

    //use this to allow the side panel to select options
    vm.deferred = null;

    vm.selectOptions = {
        placeholder: 'Select File Types'
    };

    vm.fileTypes = ["AVI", "BMP", "CSV", "DOC", "EXE", "GIF", "JPG", "MOV", "PDF", "PNG", "PPT", "RTF", "TXT", "XLS", "ZIP"];

    vm.showPanel = function () {
        searchBuilderPanel.setPanelHeader('Select File Types');
        searchBuilderPanel.setPanelTemplate('fileTypesPanel.html');

        //pass in any currently selected file types
        vm.deferred = searchBuilderPanel.openPanel({
            fileTypes: vm.fileTypes,
            selected: $scope.model
        });

        //wait for an update on selected repositories
        vm.deferred.then(function (selectedFileTypes) {
            $scope.model = selectedFileTypes;
        });
    };
}