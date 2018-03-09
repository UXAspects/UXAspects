vm.filterOptions = {
    options: [{
        name: "TAGS",
        select: selectAll,
        deselect: selectAll,
        default: true
    }, {
        name: "Redundant",
        select: selectTag,
        deselect: selectAll,
        default: false
    }, {
        name: "Obselete",
        select: selectTag,
        deselect: selectAll,
        default: false
    }, {
        name: "Trivial",
        select: selectTag,
        deselect: selectAll,
        default: false
    }],
    fixedOptions: [{
        name: "All items",
        select: selectAll,
        deselect: selectAll,
        default: false
    }, {
        name: "Untagged items",
        select: selectUntagged,
        deselect: selectAll,
        default: false
    }]
};