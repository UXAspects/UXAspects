vm.options = {
    childrenProperty: "nodes",
    expander: {
        type: "class",
        contracted: "hpe-add",
        expanded: "hpe-subtract"
    },
    icons: {
        type: "class",
        get: function (item, expanded) {
            // Use the childrenProperty to determine if it's a folder
            if (item.hasOwnProperty("nodes")) {
                return expanded ? "hpe-folder-open" : "hpe-folder";
            }
            // Use file extension to select icon
            if (item.name.toLowerCase().endsWidth(".pdf")) {
                return "hpe-document-pdf";
            }
            if (item.name.toLowerCase().endsWidth(".msg")) {
                return "hpe-mail";
            }
            // ...
            return "hpe-document";
        }
    }
};