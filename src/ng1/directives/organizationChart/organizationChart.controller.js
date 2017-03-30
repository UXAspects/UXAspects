OrganizationChartCtrl.$inject = ['$scope', '$timeout', '$document'];

// load the default search item template
import './organizationChart.searchItem.html';

export default function OrganizationChartCtrl($scope, $timeout, $document) {
    var vm = this;

    const KEYS = {
        ESCAPE: 27
    };

    var defaultOptions = {
        nodes: {
            template: null,
            toggle: true,
            size: {
                width: 210,
                height: 90
            }
        },
        transition: 750,
        levels: 1,
        reveal: null,
        connector: "curved",
        search: {
            enabled: false,
            template: 'directives/organizationChart/organizationChart.searchItem.html',
            placeholder: '',
            query: function(query, node) {
                // if name contains the query
                return node.name && node.name.toLowerCase().indexOf(query.toLowerCase()) !== -1;
            },
            selected: angular.noop,
            key: 'name'
        }
    };

    vm.options = $.extend(true, defaultOptions, vm.options);

    // manage the breadcrumb trail
    vm.breadcrumbs = [];
    vm.selectedNode = null;

    // expose functions to link
    vm.selectNode = selectNode;

    vm.revealEnabled = true;

    vm.searching = false;
    vm.searchQuery = '';

    var allowReveal = true;

    // prepare the data
    collapseNodes(vm.data);

    // select the root node initially
    selectNode(vm.data);

    // add references to parent nodes
    addNodeParentRefs();

    // add document listener for escape key
    $document.on('keyup', closeSearch);

    // watch for any changes to the data
    $scope.$watch('vm.data', function(newValue, oldValue) {

        if (newValue !== oldValue) {

            // add references to parent nodes
            addNodeParentRefs();

            $scope.$broadcast('$organizationChartRender');

            updateBreadcrumbs();
        }
    });

    // watch for any changes to the connector
    $scope.$watch('vm.options.connector', function(newValue, oldValue) {

        if (newValue !== oldValue) {

            $scope.$broadcast('$organizationChartUpdateConnectorStyle');

            updateBreadcrumbs();
        }
    });

    // clean up after ourselves
    $scope.$on('$destroy', () => {
        // remove document listener for escape key
        $document.off('keyup', closeSearch);
    });

    vm.reveal = function() {

        // call reveal using timeout to ensure part of digest
        if (vm.options.reveal && allowReveal && vm.revealEnabled) {

            // disable reveal
            allowReveal = false;

            // call function as part of digest cycle
            $timeout(function() {

                // check if a value was returned
                var response = vm.options.reveal();

                // update wheather or not the reveal should be hidden or not
                vm.revealEnabled = response !== false;
            });

            // ensure we allow any transitions to finish before allowing user to click again
            $timeout(function() {
                allowReveal = true;
            }, vm.options.transition);
        }
    };

    vm.getSearchItems = function(query) {
        return getChildren().filter((child) => vm.options.search.query(query, child));
    };

    vm.extractSearchName = function(model) {
        return model[vm.options.search.key];
    };

    vm.searchSelect = function(model) {

        // call the callback informing it of the selected item
        vm.options.search.selected.call(null, model);

        // ensure that the node is visible
        expandPathToNode(model);
    };

    vm.selectBreadcrumb = function(data) {

        $scope.$broadcast('$organizationChartCenterNode', data);
        $scope.$broadcast('$organizationChartRender');

        selectNode(data);
    };

    function closeSearch(event) {
        if (event.keyCode === KEYS.ESCAPE) {
            $scope.$evalAsync(() => {
                vm.searching = false;
            });
        }
    }

    function expandPathToNode(node) {

        // get all node nodes from root to target node
        let path = getNodePath(node);

        // go through each node and expand it
        for (let idx = 0; idx < path.length; idx++) {

            let parentNode = path[idx];

            // if the node is the target node then do not expand it
            if (parentNode !== node) {
                expandNode(parentNode);
            }
        }

        // select the node we searched for
        $scope.$broadcast('$organizationChartRender');

        // delay for the designated time
        $timeout(() => {
            $scope.$broadcast('$organizationChartCenterNode', node);
            $scope.$broadcast('$organizationChartRender');
            selectNode(node);
        }, vm.options.transition);
    }

    function getNodePath(node) {

        let path = [];

        if (node.parent) {
            path = getNodePath(node.parent);
        }

        // add current node to path
        path.push(node);

        return path;
    }

    function addNodeParentRefs(node, parent) {
        if (!node) {
            node = vm.data;
        }

        // if there is a parent then add reference to it
        if (parent) {
            node.parent = parent;
        }

        // get node children
        let children = node.children || node._children;

        // check if there are children
        if (!children || children.length === 0) {
            return;
        }

        // loop through each child and get its children
        for (let idx = 0; idx < children.length; idx++) {

            let child = children[idx];

            addNodeParentRefs(child, node);
        }
    }

    function getChildren(item) {

        // set defaults if needed
        item = item || vm.data;

        // get all the children
        let children = item.children || item._children;

        // store the result
        let result = [item];

        // if there are no children return result
        if (!children || children.length === 0) {
            return result;
        }

        // loop through each child and get its children
        for (let idx = 0; idx < children.length; idx++) {

            let child = children[idx];

            // get its children
            let lowerChildren = getChildren(child);

            // add the found children to the result array
            result = result.concat(lowerChildren);
        }

        return result;
    }

    function selectNode(data) {
        vm.selectedNode = data;
        // update the list of breadcrumbs
        updateBreadcrumbs();
    }

    function updateBreadcrumbs() {

        // reset the breadcrumb list
        vm.breadcrumbs = [];

        // ensure a node is selected
        if (!vm.selectedNode) {
            return;
        }

        // get the current node
        var node = vm.selectedNode;

        // add the current node to the list
        vm.breadcrumbs.push(node);

        // add all its parents
        while (node.parent) {

            // set node to reference its parent
            node = node.parent;

            // add this node to the list
            vm.breadcrumbs.push(node);
        }

        // reverse the array to get the desired order
        vm.breadcrumbs.reverse();
    }

    function collapseNodes(root, level) {
        // ensure we know the current level
        level = level ? level : 0;

        // number of levels to show
        var targetLevels = vm.options.levels;

        if (level >= targetLevels) {
            collapse(root);
        } else {
            if (root.children) {
                root.children.forEach(function(child) {
                    collapseNodes(child, level + 1);
                });
            }
        }
    }

    function collapse(d) {
        if (d.children) {
            d._children = d.children;
            d._children.forEach(collapse);
            d.children = null;
        }

        d._expanded = false;
    }

    function expandNode(data) {

        if (data._children) {
            data.children = data._children;
            data._children = null;
        }

        data._expanded = true;
    }

}