SearchComponentCtrl.$inject = ['$scope'];

export default function SearchComponentCtrl($scope) {
    var vm = this;

    //ensure a model object exists
    $scope.model = null;

    $scope.$watch('model', function(nv) {
        //we need to update the value at the group level
        $scope.searchGroup.updateComponentValue($scope.componentId, nv);
    });

    vm.removeComponent = function() {
        $scope.searchGroup.removeComponent($scope.componentId);
    };

}