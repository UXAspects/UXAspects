angular.module('app').controller('RepositoryComponentCtrl', RepositoryComponentCtrl);

RepositoryComponentCtrl.$inject = ['$scope', 'searchBuilderPanel'];

function RepositoryComponentCtrl($scope, searchBuilderPanel) {

    var vm = this;

    //use this to allow the side panel to select options
    vm.deferred = null;

    vm.selectOptions = {
        placeholder: 'Select Repositories'
    };

    vm.repositories = [
        "Filesystem",
        "Records Manager",
        "Email",
        "Legacy Email",
        "Archives",
        "Legacy Archives",
        "Miscellaneous"
    ];

    vm.showPanel = function () {
        searchBuilderPanel.setPanelHeader('Select Repositories');
        searchBuilderPanel.setPanelTemplate('repositoryPanel.html');

        //pass in any currently selected repositories
        vm.deferred = searchBuilderPanel.openPanel({
            repositories: vm.repositories,
            selected: $scope.model
        });

        //wait for an update on selected repositories
        vm.deferred.then(function (selectedRepositories) {
            $scope.model = selectedRepositories;
        });
    };
}