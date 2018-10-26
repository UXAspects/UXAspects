angular.module('app').controller('CustodianComponentCtrl', CustodianComponentCtrl);

CustodianComponentCtrl.$inject = ['$scope', 'searchBuilderPanel'];

function CustodianComponentCtrl($scope, searchBuilderPanel) {
    var vm = this;

    //use this to allow the side panel to select options
    vm.deferred = null;

    vm.selectOptions = {
        placeholder: 'Select Custodians'
    };

    var names = [
        'Flora Morris',
        'Micheal Gilbert',
        'Isabella Goodman',
        'Eleanor Diaz',
        'Ellen Holt',
        'Kate Manning',
        'Ryan Fisher',
        'Lily White',
        'Bernice Harrison',
        'Eddie Smith',
        'Violet Schneider',
        'Jordan Burns',
        'Ellen Tate',
        'Rena Gomes',
        'Ann Garcia'
    ];
    vm.custodians = names.map(function(name, i) {
        return { id: i, name: name };
    });

    vm.showPanel = function () {
        searchBuilderPanel.setPanelHeader('Select Custodians');
        searchBuilderPanel.setPanelTemplate('custodianPanel.html');

        //pass in all custodians and the currently selected custodians
        vm.deferred = searchBuilderPanel.openPanel({
            custodians: vm.custodians,
            selected: $scope.model
        });

        //wait for an update on selected repositories
        vm.deferred.then(function (selectedCustodians) {
            $scope.model = selectedCustodians;
        });
    };

}