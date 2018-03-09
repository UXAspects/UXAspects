function onNodeClick() {

    function onNodeClick(node) {
        console.log(node);
        node.neighborNodes = node.getNeighbors().nodes;

        for(var i in node.neighborNodes) {
            node.neighborNodes[i].setInExternal = {
                ratio: Math.random() * 100
            };
        }
    }

    return onNodeClick;
};