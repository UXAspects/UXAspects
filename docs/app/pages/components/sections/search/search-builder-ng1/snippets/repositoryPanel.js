angular.module('app').controller('RepositoryPanelCtrl', RepositoryPanelCtrl);

RepositoryPanelCtrl.$inject = ['$scope', 'searchBuilderPanel'];

function RepositoryPanelCtrl($scope, searchBuilderPanel) {
    var vm = this;

    //store the filter text
    vm.filterText = '';

    //store all the possible fields
    vm.repositories = [];

    vm.selectRepository = function (repository) {
        repository.checked = !repository.checked;
    };

    //when the panel is dismissed resolve the deferred object
    searchBuilderPanel.onDismiss(function (deferred) {
        var selectedRepositories = vm.repositories.filter(function (repo) {
            return repo.checked;
        });

        //we only want to return repository names
        var repositoryNames = [];

        selectedRepositories.forEach(function (repo) {
            repositoryNames.push(repo.name);
        });

        if (deferred) deferred.resolve(repositoryNames);
    });

    //check any items already selected in the search component
    prepareItems();

    function prepareItems() {
        var data = searchBuilderPanel.getData();

        var repositories = data.repositories;

        repositories.forEach(function (repository) {
            vm.repositories.push({
                name: repository,
                checked: false
            });
        });

        //if there are no selected repositories then stop here
        if (!data.selected) return;

        data.selected.forEach(function (selected) {
            vm.repositories.forEach(function (repository) {
                //if it is a match set the checked value to true
                if (repository.name === selected) repository.checked = true;
            });
        });
    }
}