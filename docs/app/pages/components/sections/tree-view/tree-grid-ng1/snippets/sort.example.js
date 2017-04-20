var sortByDate = function(a, b) {
    if (a.dataItem.date < b.dataItem.date) {
        return -1;
    }
    if (a.dataItem.date > b.dataItem.date) {
        return 1;
    }
    return 0;
};