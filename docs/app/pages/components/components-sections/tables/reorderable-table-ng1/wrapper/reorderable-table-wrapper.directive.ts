angular.module('app').directive('uxdReorderableTableWrapper', () => {
    return {
        restrict: 'E',
        template: require('./reorderable-table-wrapper.directive.html'),
        controller: ReorderableTableController,
        controllerAs: 'vm',
        scope: true
    };
});

class ReorderableTableController {

    // create an array of documents
    documents: any[] = [];

    static $inject = ['$scope'];

    constructor(private scope: angular.IScope) {

        let chance = require('chance').Chance();

        // generate some sample data for the documents array
        for (var idx = 1; idx <= 8; idx++) {

            this.documents.push({
                name: 'Document ' + idx,
                author: chance.name(),
                location: chance.country({
                    full: true
                }),
                available: chance.bool()
            });
        }
    }

    // cleanup afterwards
    $onDestroy() {
        this.scope.$destroy();
    }

    removeRow(document: any) {

        // find the index of the document
        var index = this.documents.indexOf(document);

        // remove the item from the list
        this.documents.splice(index, 1);
    }

    on_reorder() {
        // perform actions here
    }

    on_reorder_complete() {
        // perform actions here
    }
}
