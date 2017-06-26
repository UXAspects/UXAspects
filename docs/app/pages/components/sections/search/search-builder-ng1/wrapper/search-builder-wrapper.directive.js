angular.module('app').directive('uxdSearchBuilderWrapper', () => {
    return {
        restrict: 'E',
        template: require('./search-builder-wrapper.directive.html'),
        controller: ['$scope', '$templateCache', '$modal', function ($scope, $templateCache, $modal) {
            $templateCache.put('search-builder-ng1/modalLayout.html', require('!!raw-loader!../snippets/modalLayout.html'));
            $templateCache.put('authorComponent.html', require('!!raw-loader!../snippets/authorComponent.html'));
            $templateCache.put('custodianComponent.html', require('!!raw-loader!../snippets/custodianComponent.html'));
            $templateCache.put('dateRangeComponent.html', require('!!raw-loader!../snippets/dateRangeComponent.html'));
            $templateCache.put('keywordComponent.html', require('!!raw-loader!../snippets/keywordComponent.html'));
            $templateCache.put('fileNameComponent.html', require('!!raw-loader!../snippets/fileNameComponent.html'));
            $templateCache.put('fileTypesComponent.html', require('!!raw-loader!../snippets/fileTypesComponent.html'));
            $templateCache.put('repositoryComponent.html', require('!!raw-loader!../snippets/repositoryComponent.html'));
            $templateCache.put('textComponent.html', require('!!raw-loader!../snippets/textComponent.html'));
            $templateCache.put('custodianComponent.html', require('!!raw-loader!../snippets/custodianComponent.html'));
            $templateCache.put('addFieldPanel.html', require('!!raw-loader!../snippets/addFieldPanel.html'));
            $templateCache.put('custodianPanel.html', require('!!raw-loader!../snippets/custodianPanel.html'));
            $templateCache.put('fileTypesPanel.html', require('!!raw-loader!../snippets/fileTypesPanel.html'));
            $templateCache.put('repositoryPanel.html', require('!!raw-loader!../snippets/repositoryPanel.html'));

            var vm = this;

            // store a stringified version of the search query object
            vm.searchQuery = JSON.stringify({
                "keywords": {
                    "keyword-0": {
                        "component": "keyword",
                        "value": null
                    }
                }
            }, null, 4);


            vm.openModal = function () {

                var modalInstance = $modal.open({
                    animation: false,
                    templateUrl: 'search-builder-ng1/modalLayout.html',
                    controller: 'SearchBuilderDemoModalCtrl',
                    controllerAs: 'vm',
                    keyboard: 'true',
                    size: 'lg',
                    windowClass: 'search-builder-modal-window',
                    resolve: {
                        searchQuery: function () {
                            //provide the modal with the existing search query if there is one
                            return JSON.parse(vm.searchQuery);
                        }
                    }
                });

                modalInstance.result.then(function (result) {
                    if (result === "cancel") return;

                    //store the search query as a stringified version of the object
                    vm.searchQuery = JSON.stringify(result, null, 4);
                });
            };

            // Clean up scope
            vm.$onDestroy = function () {
                $scope.$destroy();
            };
        }],
        controllerAs: 'vm'
    };
});

angular.module("app").controller("SearchBuilderDemoModalCtrl", SearchBuilderDemoModalCtrl);

SearchBuilderDemoModalCtrl.$inject = ['$modalInstance', '$scope', 'searchBuilderPanel', 'searchBuilderId', 'searchQuery'];

function SearchBuilderDemoModalCtrl($modalInstance, $scope, searchBuilderPanel, searchBuilderId, searchQuery) {
    var vm = this;

    //show previous search query where possible
    vm.searchQuery = searchQuery ? searchQuery : {};

    // scrollbar conguration
    vm.scrollBarConfig = {
        resizeSensor: true,
        enableKeyboardNavigation: true
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
                if (!node[key] || (typeof node[key] === 'string' && node[key].trim().length === 0) || (Array.isArray(node[key]) && node[key].length === 0)) return 0;
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

angular.module('app').controller('CustodianComponentCtrl', CustodianComponentCtrl);

CustodianComponentCtrl.$inject = ['$scope', 'searchBuilderPanel'];

function CustodianComponentCtrl($scope, searchBuilderPanel) {
    var vm = this;

    //use this to allow the side panel to select options
    vm.deferred = null;

    vm.selectOptions = {
        placeholder: 'Select Custodians'
    };

    vm.custodians = [
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

angular.module('app').controller('DateRangeComponentCtrl', DateRangeComponentCtrl);

function DateRangeComponentCtrl() {
    var vm = this;

    vm.model = {
        from: {},
        to: {}
    };

    vm.fromOpened = false;
    vm.toOpened = false;

    vm.fromOpen = function (event) {
        vm.fromOpened = true;
        event.stopPropagation();
    };

    vm.toOpen = function (event) {
        vm.toOpened = true;
        event.stopPropagation();
    };
}

angular.module('app').controller('FileTypesComponentCtrl', FileTypesComponentCtrl);

FileTypesComponentCtrl.$inject = ['$scope', 'searchBuilderPanel'];

function FileTypesComponentCtrl($scope, searchBuilderPanel) {

    var vm = this;

    //use this to allow the side panel to select options
    vm.deferred = null;

    vm.selectOptions = {
        placeholder: 'Select File Types'
    };

    vm.fileTypes = ["AVI", "BMP", "CSV", "DOC", "EXE", "GIF", "JPG", "MOV", "PDF", "PNG", "PPT", "RTF", "TXT", "XLS", "ZIP"];

    vm.showPanel = function () {
        searchBuilderPanel.setPanelHeader('Select File Types');
        searchBuilderPanel.setPanelTemplate('fileTypesPanel.html');

        //pass in any currently selected file types
        vm.deferred = searchBuilderPanel.openPanel({
            fileTypes: vm.fileTypes,
            selected: $scope.model
        });

        //wait for an update on selected repositories
        vm.deferred.then(function (selectedFileTypes) {
            $scope.model = selectedFileTypes;
        });
    };
}

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

angular.module('app').controller('AddFieldPanelCtrl', AddFieldPanelCtrl);

AddFieldPanelCtrl.$inject = ['$scope', 'searchBuilderPanel', 'searchBuilderId'];

function AddFieldPanelCtrl($scope, searchBuilderPanel, searchBuilderId) {
    var vm = this;

    vm.searchQuery = $scope.$parent.vm.searchQuery || {};

    //store the filter text
    vm.filterText = '';

    //store all the possible fields
    vm.fields = [{
        name: 'Author',
        component: 'author'
    }, {
        name: 'Custodian',
        component: 'custodian'
    }, {
        name: 'Date Range',
        component: 'daterange'
    }, {
        name: 'File Name',
        component: 'filename'
    }, {
        name: 'File Type',
        component: 'filetypes'
    }, {
        name: 'Repository',
        component: 'repository'
    }, {
        name: 'Text',
        component: 'text'
    }];

    vm.selectField = function (field) {
        //resolve the deferred object
        searchBuilderPanel.closePanel({
            id: searchBuilderId.generateComponentId(field.component, vm.searchQuery),
            component: field.component
        });
    };
}

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
            custodians.push(custodian.name);
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
                name: custodian,
                checked: false
            });
        });

        //if there are no selected custodians then stop here
        if (!data.selected) return;

        data.selected.forEach(function (selected) {
            vm.custodians.forEach(function (custodian) {
                //if it is a match set the checked value to true
                if (custodian.name === selected) custodian.checked = true;
            });
        });
    }
}

angular.module('app').controller('FileTypesPanelCtrl', FileTypesPanelCtrl);

FileTypesPanelCtrl.$inject = ['$scope', 'searchBuilderPanel'];

function FileTypesPanelCtrl($scope, searchBuilderPanel) {
    var vm = this;

    //store the filter text
    vm.filterText = '';

    //store all the possible fields
    vm.fileTypes = [];

    vm.selectFileType = function (fileType) {
        fileType.checked = !fileType.checked;
    };

    //when the panel is dismissed resolve the deferred object
    searchBuilderPanel.onDismiss(function (deferred) {
        var selectedFileTypes = vm.fileTypes.filter(function (fileType) {
            return fileType.checked;
        });

        //we only want to return file types names
        var fileTypes = [];

        selectedFileTypes.forEach(function (fileType) {
            fileTypes.push(fileType.name);
        });

        if (deferred) deferred.resolve(fileTypes);
    });

    //check any items already selected in the search component
    prepareItems();

    function prepareItems() {
        var data = searchBuilderPanel.getData();

        var fileTypes = data.fileTypes;

        fileTypes.forEach(function (fileType) {
            vm.fileTypes.push({
                name: fileType,
                checked: false
            });
        });

        //if there are no selected file types then stop here
        if (!data.selected) return;

        data.selected.forEach(function (selected) {
            vm.fileTypes.forEach(function (fileType) {
                //if it is a match set the checked value to true
                if (fileType.name === selected) fileType.checked = true;
            });
        });
    }
}

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

angular.module('app').service('searchBuilderPanel', searchBuilderPanel);

searchBuilderPanel.$inject = ['$q'];

function searchBuilderPanel($q) {
    var vm = this;

    //store basic panel properties
    vm.panelOpen = false;
    vm.panelWidth = 400;
    vm.panelSide = 'right';

    //store content properties
    vm.panelHeader = '';
    vm.panelTemplate = '';

    //store a deferred object to allow returning of values
    vm.deferred = null;

    //allow the storing of some data while the panel is open
    vm.data = null;

    // allow custom on dismiss event
    vm.dismissEventHandlers = [];

    //action functions
    vm.openPanel = function (data) {
        vm.deferred = $q.defer();

        //store any new data - replace any exisiting data
        vm.data = data;

        //reset dismiss event handlers
        vm.dismissEventHandlers = [];

        //show panel
        vm.panelOpen = true;

        return vm.deferred.promise;
    };

    vm.closePanel = function (result) {
        //if deferred is not null then either resolve or reject deferred
        if (vm.deferred !== null) {
            if (result) vm.deferred.resolve(result);
            else vm.deferred.reject();
        }

        //we no longer need the deferred object - it has been resolved or rejected
        vm.deferred = null;

        //hide the panel
        vm.panelOpen = false;

        //remove any template so everything is reinstantiated correctly
        vm.setPanelHeader('');
        vm.setPanelTemplate('');
    };

    vm.onDismiss = function (eventHandler) {

        //if an argument was passed then we can assume that this is subscribing to the dismiss event
        if (eventHandler) {
            vm.dismissEventHandlers.push(eventHandler);
            return;
        }

        //allow a handler to resolve deferred
        var resolved = false;

        //otherwise call all event handlers and pass them the deferred object in case they want to resolve it
        for (var i = 0; i < vm.dismissEventHandlers.length; i++) {
            var handler = vm.dismissEventHandlers[i];

            //call function with deferred
            var didResolved = handler(vm.deferred);

            if (didResolved === true) resolved = true;
        }

        //if deferred has not yet been resolved then reject
        if (resolved === false && vm.deferred) vm.deferred.reject();

        //remove any template so everything is reinstantiated correctly
        vm.setPanelHeader('');
        vm.setPanelTemplate('');
    };

    //setters
    vm.setPanelHeader = function (header) {
        vm.panelHeader = header;
    };

    vm.setPanelTemplate = function (template) {
        vm.panelTemplate = template;
    };

    vm.setData = function (data) {
        vm.data = data;
    };

    //getters
    vm.getPanelWidth = function () {
        return vm.panelWidth;
    };

    vm.getPanelSide = function () {
        return vm.panelSide;
    };

    vm.getPanelHeader = function () {
        return vm.panelHeader;
    };

    vm.getPanelTemplate = function () {
        return vm.panelTemplate;
    };

    vm.getData = function () {
        return vm.data;
    };

    return vm;
}

angular.module('app').service('searchBuilderId', searchBuilderId);

function searchBuilderId() {
    var vm = this;

    vm.generateComponentId = function (componentName, searchQuery) {
        //initialise or increments

        vm.existingIds = [];

        //Get all IDs which have currently been assigned for each component
        for (var groupName in searchQuery) {
            var group = searchQuery[groupName];

            //build up list of all component ids
            for (var component in group) vm.existingIds.push(component);
        }

        var index = 0;
        var componentId;

        //setting upper limit to avoid an infinte loop
        while (index < 1000) {
            var desiredId = componentName + "-" + index;

            if (vm.existingIds.indexOf(desiredId) === -1) {
                componentId = desiredId;
                break;
            }

            index++;
        }

        return componentId;

    };

    return vm;
}