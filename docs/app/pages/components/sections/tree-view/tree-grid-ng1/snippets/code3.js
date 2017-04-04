vm.options = {
    childrenProperty: "nodes",
    expander: {
        type: "url",
        contracted: "../img/ExpanderContracted16x16.png",
        expanded: "../img/ExpanderExpanded16x16.png",
        expanding: "../img/ExpanderExpanding16x16.png"
    },
    icons: {
        type: "url",
        get: function (item, expanded) {
            // Use a specific property to select icon type
            switch (item.type) {
                case "email":
                    return expanded ? "../img/IconEmail16x16.png" : "../img/IconEmailOpen16x16.png";
                case "pdf":
                    return "../img/IconPdf16x16.png";
                case "word":
                    return "../img/IconDoc16x16.png";
                    // ...
            }
            return "../img/IconUnknown16x16.png";
        }
    }
};