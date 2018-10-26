angular.module('app').controller('CustodianPanelCtrl', CustodianPanelCtrl);

CustodianPanelCtrl.$inject = ['$scope', 'searchBuilderPanel'];

function CustodianPanelCtrl($scope, searchBuilderPanel) {
    var vm = this;

    //store the filter text
    vm.filterText = '';

    //store all the possible fields
    vm.custodians = [];

    vm.selectCustodian = function (custodian) {
        custodian.checked = !custodian.checked;
    };

    //when the panel is dismissed resolve the deferred object
    searchBuilderPanel.onDismiss(function (deferred) {
        var selectedCustodians = vm.custodians.filter(function (custodian) {
            return custodian.checked;
        });

        //we only want to return custodians names
        var custodians = [];

        selectedCustodians.forEach(function (custodian) {
            custodians.push(custodian.data);
        });

        if (deferred) deferred.resolve(custodians);
    });

    //check any items already selected in the search component
    prepareItems();

    function prepareItems() {
        var data = searchBuilderPanel.getData();

        var custodians = data.custodians;

        custodians.forEach(function (custodian) {
            vm.custodians.push({
                data: custodian,
                checked: false
            });
        });

        //if there are no selected custodians then stop here
        if (!data.selected) return;

        data.selected.forEach(function (selected) {
            vm.custodians.forEach(function (custodian) {
                //if it is a match set the checked value to true
                if (custodian.data.id === selected.id) { custodian.checked = true; }
            });
        });
    }
}