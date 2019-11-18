angular.module('app').controller('AddFieldPanelCtrl', AddFieldPanelCtrl);

AddFieldPanelCtrl.$inject = ['$scope', 'searchBuilderPanel', 'searchBuilderId'];

function AddFieldPanelCtrl($scope, searchBuilderPanel, searchBuilderId) {
    var vm = this;

    vm.searchQuery = $scope.$parent.vm.searchQuery || {};

    //store the filter text
    vm.filterText = '';

    //store all the possible fields
    vm.fields = [{
        name: 'Author',
        component: 'author'
    }, {
        name: 'Custodian',
        component: 'custodian'
    }, {
        name: 'Date Range',
        component: 'daterange'
    }, {
        name: 'File Name',
        component: 'filename'
    }, {
        name: 'File Type',
        component: 'filetypes'
    }, {
        name: 'Repository',
        component: 'repository'
    }, {
        name: 'Text',
        component: 'text'
    }];

    vm.selectField = function (field) {
        //resolve the deferred object
        //closePanel can also take in an array of objects
        searchBuilderPanel.closePanel({
            id: searchBuilderId.generateComponentId(field.component, vm.searchQuery),
            component: field.component
        });
    };
}