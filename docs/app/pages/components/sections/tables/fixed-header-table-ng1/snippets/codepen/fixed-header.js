angular.module("app").controller("FixedHeaderCtrl", ["$scope", FixedHeaderCtrl]);

function FixedHeaderCtrl($scope) {

    $scope.sampleTableData = [];

    for (var i = 0; i < 15; i++) {
        $scope.sampleTableData.push({
            id: i,
            Data: chance.integer({
                min: 0,
                max: 500
            }),
            User: chance.name(),
            Task: chance.integer({
                min: 0,
                max: 100
            }) + '%',
            Date: chance.date()
        });
    }
}