var parents = vm.objects.filter(function (item) {
    return item.parentId === undefined;
});

var hierarchy = [];

for (var idx = 0; idx < parents.length; idx++) {
    
    var currentParent = parents[idx];
    hierarchy.push(currentParent);

    findChildren(currentParent, vm.objects, hierarchy);
}

return hierarchy;

function findChildren(parent, objects, hierarchy) {

    var children = objects.filter(function (data) {
        return parent.id === data.parentId
    });

    if (children.length > 0) {
        parent.hasChildren = true;
        for (var idx = 0; idx < children.length; idx++) {
            var child = children[idx];
            hierarchy.push(child);

            findChildren(child, objects, hierarchy);
        }
    }
}