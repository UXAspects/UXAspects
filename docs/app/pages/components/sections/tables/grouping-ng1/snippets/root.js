var children = [];

var parents = vm.objects.filter(function (data) {
    if (data.parentId === undefined)
        return data;
    else
        children.push(data);
});

for (var i = 0; i < parents.length; i++) {
    for (var j = 0; j < children.length; j++) {
        if (parents[i].id === children[j].parentId) {
            parents[i].hasChildren = true;
            break;
        }
    }
}

return parents;