vm.removeRow = function (document) {

    // find the index of the document
    var index = vm.documents.indexOf(document);

    // remove the item from the list
    vm.documents.splice(index, 1);
};