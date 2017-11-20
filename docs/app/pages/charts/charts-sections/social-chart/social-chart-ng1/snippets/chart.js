angular.module('app').controller('SocialCtrl', SocialCtrl);

function SocialCtrl($scope) {
    var vm = this;

    //... define API functions

    vm.api = {
        selectedNode :null,
        selectedEdge : null,
        onNodeClick:onNodeClick(),
        onEdgeClick:onEdgeClick(),
        onStageClick:onStageClick(),
        onNodeHover:onNodeClick(),
        onEdgeHover:onEdgeClick()
    };

    //... define chart title
    vm.chartTitle = {
        title: "Nothing selected",
        timeout: 3000,
        nodeSelectedTitle: "Social interactions with ",
        edgeSelectedTitle: "Social interactions between  and ",
        stageSelectedTitle: "Nothing selected"
    };

    //always show at least this number of labels when nothing is selected
    vm.minLabels = 5;

    vm.communities = {
        //...define communities
    };
    vm.detailStyle = {
        //...define styles
    };

    vm.edgeWeightInfluence = false;

    vm.forceAtlasDuration = 2000;

    var nodes = [{
        id: 0,
        label: "Myriel"
    },
    ...
    ];

    var edges = [{
        source: 1,
        target: 0,
        value: 1
    },
    ...
    ];

    vm.data = {
        'nodes':nodes,
        'edges':edges
    };
}