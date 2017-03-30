SearchBuilderCtrl.$inject = ['$scope'];

export default function SearchBuilderCtrl($scope) {
    var vm = this;

    //ensure the search query object is not null
    if ($scope.searchQuery === null || $scope.searchQuery === undefined) $scope.searchQuery = {};

    //allow search groups to get a components
    vm.components = $scope.components;

    //enable getting of group data
    vm.getGroupValue = function(groupName) {
        return $scope.searchQuery[groupName];
    };

    //enable setting of group data
    vm.setGroupValue = function(groupName, value) {
        $scope.searchQuery[groupName] = value;
    };
}