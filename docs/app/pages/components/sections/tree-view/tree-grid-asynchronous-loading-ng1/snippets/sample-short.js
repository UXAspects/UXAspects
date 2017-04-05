angular.module("app").controller("TreeGridAsyncDemoCtrl", TreeGridAsyncDemoCtrl);

TreeGridAsyncDemoCtrl.$inject = ["$scope", "$q", "$timeout"];

function TreeGridAsyncDemoCtrl($scope, $q, $timeout) {
    var vm = this;

    var topLevelFolder = [{
        type: "folder",
        dataPage: 0,
        document: "Folder 1",
        name: "",
        dateString: ""
    }, {
        type: "folder",
        dataPage: 1,
        document: "Folder 2",
        name: "",
        dateString: ""
    }, {
        type: "folder",
        dataPage: 2,
        document: "Folder 3",
        name: "",
        dateString: ""
    }];

    // Asynchronous loading function
    // parent is the item being expanded, or undefined if the top level is being requested
    vm.loadData = function (parent) {
        var deferred = $q.defer();
        if (!parent) {
            // Load top level items
            $timeout(function () {
                deferred.resolve(topLevelFolder);
            }, 1000);
        } else {
            // Load children of parent
            $timeout(function () {
                var children = vm.sourceData[parent.dataPage];
                deferred.resolve(children);
            }, 2000);
        }
        return deferred.promise;
    };

    vm.columns = [{
        name: "NAME",
        value: "document",
        width: "40%"
    }, {
        name: "AUTHOR",
        value: "name",
        width: "20%"
    }, {
        name: "DATE",
        value: "dateString",
        width: "20%"
    }, {
        name: "PRIORITY",
        template: "template.html",
        width: "20%",
        headerClass: "text-center",
        cellClass: "text-center"
    }];

    vm.selected = null;

    vm.options = {
        hasChildren: function (dataItem) {
            return dataItem.type === "folder";
        }
    };

    vm.inProgress = false;

    vm.expandAllFolders = function () {
        var folders = findRows(vm.treeData, "type", "folder");
        var promises = [];
        vm.inProgress = true;
        // Call expand on each folder
        for (var i = 0; i < folders.length; i += 1) {
            var promise = folders[i].api.expand();
            promises.push(promise);
        }
        // Unset inProgress when all promises are complete
        $q.all(promises).finally(function () {
            vm.inProgress = false;
        });
    };

    vm.contractAllFolders = function () {
        var folders = findRows(vm.treeData, "type", "folder");
        // Call contract on each folder
        for (var i = 0; i < folders.length; i += 1) {
            folders[i].api.contract();
        }
    };

    vm.reloadAllFolders = function () {
        var folders = findRows(vm.treeData, "type", "folder");
        var promises = [];
        vm.inProgress = true;
        // Call reload on each folder
        for (var i = 0; i < folders.length; i += 1) {
            var promise = folders[i].api.reload();
            promises.push(promise);
        }
        // Unset inProgress when all promises are complete
        $q.all(promises).finally(function () {
            vm.inProgress = false;
        });
    };

    vm.highPriorityItems = [];

    // Deep watch of the tree-data structure
    $scope.$watch("vm.treeData", function () {
        if (vm.treeData) {
            vm.highPriorityItems = findRows(vm.treeData, "priority", "High");
        }
    }, true);

    // Recursively searches the tree-data structure for items of interest
    function findRows(treeData, property, value) {
        var results = [];
        for (var i = 0; i < treeData.length; i += 1) {
            if (treeData[i].dataItem[property] === value) {
                results.push(treeData[i]);
            }
            if (treeData[i].children.length > 0) {
                results = results.concat(findRows(treeData[i].children, property, value));
            }
        }
        return results;
    }

    vm.sourceData = [
        [{
                "id": 0,
                "name": "Jayden Hampton",
                "dateString": "Today",
                "document": "Document 1.pdf"
            },
            // ...
        ]
    ];

}