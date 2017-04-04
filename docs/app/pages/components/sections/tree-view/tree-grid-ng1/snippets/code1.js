function findItems(treeData, property, value) {
    var results = [];
    for (var i = 0; i < treeData.length; i += 1) {
        if (treeData[i].dataItem[property] === value) {
            results.push(treeData[i].dataItem);
        }
        if (treeData[i].children.length > 0) {
            results = results.concat(findItems(treeData[i].children, property, value));
        }
    }
    return results;
}