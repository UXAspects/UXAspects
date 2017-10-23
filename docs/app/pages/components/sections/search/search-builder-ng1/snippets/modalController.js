angular.module("app").controller("SearchBuilderDemoModalCtrl", SearchBuilderDemoModalCtrl);

SearchBuilderDemoModalCtrl.$inject = ['$modalInstance', '$scope', 'searchBuilderPanel', 'searchBuilderId', 'searchQuery'];

function SearchBuilderDemoModalCtrl($modalInstance, $scope, searchBuilderPanel, searchBuilderId, searchQuery) {
    var vm = this;

    //show previous search query where possible
    vm.searchQuery = searchQuery ? searchQuery : {};

    // scrollbar conguration
    vm.scrollBarConfig = {
        resizeSensor: true,
        enableKeyboardNavigation: true,
        contentUpdateSensor: true
    };

    //use a service to store these values - make them more accessible by all modal contents
    vm.panelService = searchBuilderPanel;

    // modal data
    vm.searchPercentage = 0;
    vm.type = 'spark-primary';
    vm.searchEstimateLabel = "<span class='spark-label hidden-xxxs'><span class='medium light'>MATCHING ITEMS</span></span>";
    updateApproxLabel('Unavailable');

    //must provide information on all possible components
    vm.components = [{
        name: 'author',
        templateUrl: 'authorComponent.html'
    }, {
        name: 'custodian',
        templateUrl: 'custodianComponent.html'
    }, {
        name: 'daterange',
        templateUrl: 'dateRangeComponent.html'
    }, {
        name: 'keyword',
        templateUrl: 'keywordComponent.html'
    }, {
        name: 'filename',
        templateUrl: 'fileNameComponent.html'
    }, {
        name: 'filetypes',
        templateUrl: 'fileTypesComponent.html'
    }, {
        name: 'repository',
        templateUrl: 'repositoryComponent.html'
    }, {
        name: 'text',
        templateUrl: 'textComponent.html'
    }, {
        name: 'custodians',
        templateUrl: 'custodianComponent.html'
    }];

    // modal properties
    vm.ok = function () {
        $modalInstance.close(vm.searchQuery);
    };

    vm.cancel = function () {
        $modalInstance.dismiss("cancel");
    };

    //ensure we dismiss any open panel if the modal is closing
    $scope.$on('modal.closing', function () {
        searchBuilderPanel.closePanel();
    });

    //adding a simple field that will be the same component everytime
    vm.addKeywordField = function () {
        return {
            id: searchBuilderId.generateComponentId('keyword', vm.searchQuery),
            component: 'keyword'
        };
    };

    //adding a field that may be a different component everytime
    vm.addCustomField = function () {

        //set the appropriate panel content
        vm.panelService.setPanelHeader('Add Field');
        vm.panelService.setPanelTemplate('addFieldPanel.html');

        //the open panel function returns a deferred object which will be resolved or rejected accordingly
        return vm.panelService.openPanel();
    };

    //this emulates the number of search results - and fakes approximate number of matching documents
    $scope.$watch('vm.searchQuery', function (nv, ov) {
        if (!angular.equals(nv, ov)) {
            var complexity = vm.calculateComplexity(vm.searchQuery);

            if (complexity === 0) {
                vm.searchPercentage = 0;
                updateApproxLabel('Unavailable');
                return;
            }

            vm.searchPercentage = Math.max(100 - (complexity * 10), 0);

            //set the color of the spark chart based on the search percentage
            if (vm.searchPercentage > 70) vm.type = 'spark-critical';
            else if (vm.searchPercentage > 50) vm.type = 'spark-warning';
            else vm.type = 'spark-ok';

            //update the label to the correct number of items
            updateApproxLabel('Approx ' + vm.searchPercentage + 'k items');
        }
    }, true);

    // this function returns dummy data for the number of search results based on search complexity
    vm.calculateComplexity = function (node) {
        var count = 0;

        for (var key in node) {
            if (key === 'value') {
                if (!node[key] || (typeof node[key] === 'string' && node[key].trim().length === 0) ||
                    (Array.isArray(node[key]) && node[key].length === 0)) {
                    return 0;
                }
                return 1;
            }

            if (typeof node[key] === 'object')
                count += vm.calculateComplexity(node[key]);
        }

        return count;
    };

    function updateApproxLabel(value) {
        vm.approxItemLabel = "<span class='spark-label hidden-xxxs'><span class='medium light'>" + value + "</span></span>";
    }
}