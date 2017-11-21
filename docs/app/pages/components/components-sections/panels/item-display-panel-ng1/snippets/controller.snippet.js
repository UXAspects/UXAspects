angular.module('app').controller('ItemDisplayPanelDemoCtrl', ItemDisplayPanelDemoCtrl);

ItemDisplayPanelDemoCtrl.$inject = ['$scope'];

function ItemDisplayPanelDemoCtrl($scope) {
    var vm = this;

    vm.items = [{
        "name": chance.name(),
        "dateString": "3 Oct 2015",
        "document": "Document 4.ppt",
        "extension": ".ppt",
        "storage": "95.25",
        "active": false,
        "panel": {
            "scope": $scope.$new(),
            "title": "Site Detail - UX Aspects (PPT)",
            "main": "modalPPT.html",
            "footer": "modalFooter.html",
            "modalColumns": "col-lg-6 col-md-7 col-sm-9 col-xs-10",
            "top": 50
        }
    },
    //...
    ];
}