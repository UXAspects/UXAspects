angular.module("app").controller("LayoutCtrl", ["$scope", LayoutCtrl]);

function LayoutCtrl($scope) {
    
    $scope.sampleTableData = [{
            id: 1,
            Data: 156,
            User: chance.name(),
            Task: '40%',
            Date: 'July 14, 2016'
        }, {
            id: 2,
            Data: 226,
            User: chance.name(),
            Task: '-20%',
            Date: 'July 15, 2016'
        },
        ....
        ....
        .... 
        {
            id: 9,
            Data: 240,
            User: chance.name(),
            Task: '-22%',
            Date: 'November 14, 2016'
        }
    ];
}