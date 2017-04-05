angular.module('app').directive('uxdTreeGridAsynchronousLoadingWrapper', () => {
    return {
        restrict: 'E',
        template: require('./tree-grid-asynchronous-loading-wrapper.directive.html'),
        controller: 'TreeGridAsyncDemoCtrl as vm',
        scope: true
    };
});

angular.module('app').controller('TreeGridAsyncDemoCtrl', ['$scope', '$q', '$timeout', TreeGridAsyncDemoCtrl]);


function TreeGridAsyncDemoCtrl($scope: angular.IScope, $q: any, $timeout: any) {
    var vm = this;

    vm.$onDestroy = function() {
      $scope.$destroy();
    };

    let template = require('!file-loader!./template.html');

    var topLevelFolder = [{
        type: 'folder',
        dataPage: 0,
        document: 'Folder 1',
        name: '',
        dateString: ''
    }, {
        type: 'folder',
        dataPage: 1,
        document: 'Folder 2',
        name: '',
        dateString: ''
    }, {
        type: 'folder',
        dataPage: 2,
        document: 'Folder 3',
        name: '',
        dateString: ''
    }];

    // Asynchronous loading function
    // parent is the item being expanded, or undefined if the top level is being requested
    vm.loadData = function (parent: any) {
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
        name: 'NAME',
        value: 'document',
        width: '40%'
    }, {
        name: 'AUTHOR',
        value: 'name',
        width: '20%'
    }, {
        name: 'DATE',
        value: 'dateString',
        width: '20%'
    }, {
        name: 'PRIORITY',
        template: template,
        width: '20%',
        headerClass: 'text-center',
        cellClass: 'text-center'
    }];

    vm.selected = null;

    vm.options = {
        hasChildren: function (dataItem: any) {
            return dataItem.type === 'folder';
        }
    };

    vm.inProgress = false;

    vm.expandAllFolders = function () {
        var folders = findRows(vm.treeData, 'type', 'folder');
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
        var folders = findRows(vm.treeData, 'type', 'folder');
        // Call contract on each folder
        for (var i = 0; i < folders.length; i += 1) {
            folders[i].api.contract();
        }
    };

    vm.reloadAllFolders = function () {
        var folders = findRows(vm.treeData, 'type', 'folder');
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
    $scope.$watch('vm.treeData', function () {
        if (vm.treeData) {
            vm.highPriorityItems = findRows(vm.treeData, 'priority', 'High');
        }
    }, true);

    // Recursively searches the tree-data structure for items of interest
    function findRows(treeData: any, property: any, value: any): any {
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
                'id': 0,
                'name': 'Jayden Hampton',
                'dateString': 'Today',
                'document': 'Document 1.pdf'
            },
            {
                'id': 2,
                'name': 'Lura Bell',
                'dateString': '20 Jan 2017',
                'document': 'Document 3.doc'
            },
            {
                'id': 3,
                'name': 'Jackson Zimmerman',
                'dateString': '17 Feb 2016',
                'document': 'Document 4.pdf'
            },
            {
                'id': 4,
                'name': 'Brandon Kelley',
                'dateString': '9 Feb 2017',
                'document': 'Document 5.xls'
            },
            {
                'id': 5,
                'name': 'Jackson Zimmerman',
                'dateString': 'Today',
                'document': 'Document 6.doc'
            },
            {
                'id': 6,
                'name': 'Walter Cortez',
                'dateString': 'Today',
                'document': 'Document 7.html'
            },
            {
                'id': 7,
                'name': 'Herbert Padilla',
                'dateString': '20 Jan 2017',
                'document': 'Document 8.html'
            },
            {
                'id': 8,
                'name': 'Maud Grant',
                'dateString': '17 Feb 2016',
                'document': 'Document 9.ppt'
            },
            {
                'id': 9,
                'name': 'Emma Lynch',
                'dateString': '9 Feb 2017',
                'document': 'Document 10.pdf'
            }
        ],
        [{
                'id': 10,
                'name': 'Mike Marsh',
                'dateString': 'Today',
                'document': 'Document 11.pdf'
            },
            {
                'id': 11,
                'name': 'Herbert Padilla',
                'dateString': '10 Feb 2017',
                'document': 'Document 12.pdf'
            },
            {
                'id': 12,
                'name': 'Eunice Harvey',
                'dateString': 'Today',
                'document': 'Document 13.pdf'
            },
            {
                'id': 13,
                'name': 'Eunice Tyler',
                'dateString': '17 Feb 2016',
                'document': 'Document 14.doc'
            },
            {
                'id': 14,
                'name': 'Cordelia Moore',
                'dateString': '9 Feb 2017',
                'document': 'Document 15.pdf'
            },
            {
                'id': 15,
                'name': 'Jeanette Fowler',
                'dateString': 'Today',
                'document': 'Document 16.ppt'
            },
            {
                'id': 16,
                'name': 'Lura Bell',
                'dateString': '10 Feb 2017',
                'document': 'Document 17.xls'
            },
            {
                'id': 17,
                'name': 'Landon Green',
                'dateString': '20 Jan 2017',
                'document': 'Document 18.ppt'
            },
            {
                'id': 18,
                'name': 'Eunice Harvey',
                'dateString': 'Today',
                'document': 'Document 19.pdf'
            },
            {
                'id': 19,
                'name': 'Alex Martinez',
                'dateString': '9 Feb 2017',
                'document': 'Document 20.xls'
            }
        ],
        [{
                'id': 20,
                'name': 'Herbert Padilla',
                'dateString': 'Today',
                'document': 'Document 21.xls'
            },
            {
                'id': 21,
                'name': 'Alex Martinez',
                'dateString': '10 Feb 2017',
                'document': 'Document 22.xls'
            },
            {
                'id': 22,
                'name': 'Landon Green',
                'dateString': '20 Jan 2017',
                'document': 'Document 23.xls'
            },
            {
                'id': 23,
                'name': 'Landon Green',
                'dateString': '17 Feb 2016',
                'document': 'Document 24.doc'
            },
            {
                'id': 24,
                'name': 'Agnes Bates',
                'dateString': 'Today',
                'document': 'Document 25.pdf'
            },
            {
                'id': 25,
                'name': 'Herbert Padilla',
                'dateString': 'Today',
                'document': 'Document 26.pdf'
            },
            {
                'id': 26,
                'name': 'Jeanette Fowler',
                'dateString': '10 Feb 2017',
                'document': 'Document 27.xls'
            },
            {
                'id': 27,
                'name': 'Cordelia Moore',
                'dateString': '20 Jan 2017',
                'document': 'Document 28.xls'
            },
            {
                'id': 28,
                'name': 'Agnes Bates',
                'dateString': '17 Feb 2016',
                'document': 'Document 29.xls'
            },
            {
                'id': 29,
                'name': 'Maud Grant',
                'dateString': '9 Feb 2017',
                'document': 'Document 30.doc'
            }
        ]
    ];

}

