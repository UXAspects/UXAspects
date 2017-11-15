angular.module('app').controller('ReorderableCtrl', ReorderableCtrl);

function ReorderableCtrl() {
    var vm = this;

    // create an array of documents
    vm.documents = [];

    // generate some sample data for the documents array
    for (var idx = 1; idx <= 8; idx++) {
        vm.documents.push({
            name: 'Document ' + idx,
            author: chance.name(),
            location: chance.country({
                full: true
            }),
            available: chance.bool()
        });
    }

    vm.removeRow = function (document) {

        // find the index of the document
        var index = vm.documents.indexOf(document);

        // remove the item from the list
        vm.documents.splice(index, 1);
    };

    vm.on_reorder = function (model) {
        // perform actions here
    };

    vm.on_reorder_complete = function (model) {
        // perform actions here
    };
}