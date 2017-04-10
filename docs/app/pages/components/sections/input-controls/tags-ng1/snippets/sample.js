vm.tags = ["Redundant", "Trivial", "Obsolete", "Deletion Scheduled", "SharePoint 2007 Repository" ];
vm.tags2 = [];

vm.demoOptions1 = {
    placeholder : "Add tag",
    maxNumberTags: 8,
    maxTagsMessage: "Maximum number of tags has been added"
};

vm.demoApi = {
    onTagAdding: function(tag){
        if(vm.tags.length >= vm.demoOptions1.maxNumberTags) {
            return false;
        }
        return true;
    },
    onTagRemoving: function(tag) {
        return true;
    }
};