angular.module("ux-aspects.sigma")
    .factory('sigma', ['$window', function($window) {
        if (!$window.sigma.classes.graph.hasMethod('neighbors')) {
            $window.sigma.classes.graph.addMethod('neighbors', function(nodeId) {
                var k,
                    neighbors = {},
                    index = this.allNeighborsIndex[nodeId] || {};

                for (k in index)
                    neighbors[k] = this.nodesIndex[k];

                return neighbors;
            });
        }

        if (!$window.sigma.classes.graph.hasMethod('nodeEdges')) {
            $window.sigma.classes.graph.addMethod('nodeEdges', function(nodeId) {
                var k, j,
                    neighbors = {},
                    edges = {}
                index = this.allNeighborsIndex[nodeId] || {};

                for (k in index) {
                    neighbors[k] = this.nodesIndex[k];
                }

                for (j in neighbors) {
                    edges[j] = this.allNeighborsIndex[nodeId][j];
                }

                return edges;

            });
        }

        return $window.sigma;
    }]);