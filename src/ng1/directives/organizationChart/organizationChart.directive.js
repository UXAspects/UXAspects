organizationChart.$inject = ['$templateRequest', '$timeout', '$compile', '$resize'];

export default function organizationChart($templateRequest, $timeout, $compile, $resize) {
    return {
        restrict: 'E',
        scope: {
            data: '=',
            options: '='
        },
        template: require('./organizationChart.html'),
        bindToController: true,
        controller: 'OrganizationChartCtrl as vm',
        link: function(scope, element, attrs, ctrl) {
            var _this = this;

            // store references to elements
            var nativeElement = element.get(0);

            var chartContainer = nativeElement.querySelector('.organization-chart'),
                linkContainer = chartContainer.querySelector('.organization-links'),
                nodeContainer = chartContainer.querySelector('.organization-nodes');

            // store d3 wrapped elements
            var linkCanvas = d3.select(linkContainer),
                nodeCanvas = d3.select(nodeContainer);

            // store properties
            var width = chartContainer.offsetWidth,
                height = chartContainer.offsetHeight,
                template = null,
                nodeIndex = 0,
                cameraStore = null,
                enforceCameraStore = null,
                eventsDisabled = false,
                camera = d3.behavior.zoom()
                .scaleExtent([1, 1])
                .on('zoomend', enforceCameraBounds)
                .on('zoom', updateCamera);

            // bind camera to the layers
            linkCanvas.call(camera);
            nodeCanvas.call(camera);

            // initially position camera
            camera.translate([width / 2, 150]);

            // load the template we need to begin
            loadTemplate(function() {
                render();

                selectNode(ctrl.data);
            });

            // Allow controller to communicate to link function
            scope.$on('$organizationChartRender', render);
            scope.$on('$organizationChartCenterNode', function(scope, data) {
                centerNode(data);
            });
            scope.$on('$organizationChartUpdateConnectorStyle', updateConnectorStyle);

            $resize.bind(chartContainer, function() {

                // update stored size
                width = chartContainer.offsetWidth;
                height = chartContainer.offsetHeight;

                // ensure nodes are visible
                enforceCameraBounds();
            });

            /*
                Kick Off Rendering of  Nodes and Links
            */
            function render() {

                // render the nodes
                renderNodes();

                // render links
                renderLinks();

                // render the reveal arrow
                renderReveal();
            }

            /*
                Render the nodes
            */
            function renderNodes() {

                // get the node data
                var data = getLayout().nodes;

                // find any existing nodes
                var nodes = nodeCanvas.selectAll('div.organization-node')

                // update any data bound to the selection
                .data(data, function(d) {
                    return d.id || (d.id = ++nodeIndex);
                });

                nodes.transition()
                    .duration(getOptions().transition)
                    .style('left', function(data) {
                        return getNodePosition(data).x + 'px';
                    })
                    .style('top', function(data) {
                        return getNodePosition(data).y + 'px';
                    });

                // create new node elements
                nodes.enter()
                    .append('div')
                    .attr('class', 'organization-node')
                    .html(template)
                    .each(compileNode)
                    .style('left', function(data) {
                        return getNodePosition(data.parent ? data.parent : data).x + 'px';
                    })
                    .style('top', function(data) {
                        return getNodePosition(data.parent ? data.parent : data).y + 'px';
                    })
                    .style('width', getNodeOptions().size.width + 'px')
                    .style('height', getNodeOptions().size.height + 'px')
                    .style('opacity', 0)
                    .transition()
                    .duration(getOptions().transition)
                    .style('left', function(data) {
                        return getNodePosition(data).x + 'px';
                    })
                    .style('top', function(data) {
                        return getNodePosition(data).y + 'px';
                    })
                    .style('opacity', 1)
                    .style('cursor', function(data) {

                        // if user controls toggling manually
                        if (!getNodeOptions().toggle) {
                            return 'default';
                        }

                        return data.children && data.children.length > 0 || data._children && data._children.length > 0 ? 'pointer' : 'default';
                    })

                .each('start', disableEvents)

                .each('end', function() {
                    d3.select(this)
                        .on('click', toggleNode)
                        .on('mousedown', function() {
                            d3.event.stopPropagation();
                        });

                    enableEvents();
                });

                // animate when a node is removed
                nodes.exit()

                // animate the removal of a node
                .transition()
                    .duration(getOptions().transition)
                    .style('left', function(data) {
                        return getNodePosition(data.parent ? data.parent : data).x + 'px';
                    })
                    .style('top', function(data) {
                        return getNodePosition(data.parent ? data.parent : data).y + 'px';
                    })
                    .style('opacity', 0)
                    .each('start', disableEvents)
                    .each('end', enableEvents)
                    .remove();

                nodes.each(function(d) {
                    d.x0 = d.x;
                    d.y0 = d.y;
                });

            }

            /*
                Render Links
            */
            function renderLinks() {

                // get the node data
                var data = getLayout().links;

                var link = linkCanvas.selectAll("path.organization-link")
                    .data(data, function(d) {
                        return d.target.id;
                    });

                // Enter any new links at the parent's previous position.
                link.enter().insert("path", "g")
                    .attr("class", "organization-link")
                    .attr("d", function(d) {

                        var point = {
                            x: d.source.x0 || ctrl.data.x,
                            y: d.source.y0 || ctrl.data.y
                        };

                        return getLineEquation()({
                            source: point,
                            target: point
                        });
                    })
                    .attr('opacity', -2);

                // Transition links to their new position.
                link.transition()
                    .duration(getOptions().transition)
                    .attr("d", getLineEquation())
                    .attr('opacity', 1);

                // Transition exiting nodes to the parent's new position.
                link.exit().transition()
                    .duration(getOptions().transition)
                    .attr('opacity', -2) // set to minus value to increase opacity transition speed
                    .attr("d", function(d) {
                        var point = {
                            x: d.source.x || ctrl.data.x,
                            y: d.source.y || ctrl.data.y
                        };
                        return getLineEquation()({
                            source: point,
                            target: point
                        });
                    })
                    .remove();
            }

            /*
                Render the reveal arrow above the root node
            */
            function renderReveal() {

                // only add the reveal if specified
                if (!getOptions().reveal) {
                    return;
                }

                // find the reveal container
                var revealContainer = nodeContainer.querySelector('.reveal-container');

                // if it doesnt exist then create it
                if (!revealContainer) {

                    // create container element
                    revealContainer = document.createElement('div');
                    revealContainer.className = 'reveal-container';

                    // create the icon element
                    var revealIcon = document.createElement('i');
                    revealIcon.className = 'hpe-icon hpe-tab-up';

                    // perform the click event
                    revealContainer.addEventListener('click', ctrl.reveal);

                    // append the children to the appropriate containers
                    revealContainer.appendChild(revealIcon);
                    nodeContainer.appendChild(revealContainer);

                    // set the initial position
                    d3.select(revealContainer)
                        .style('left', function() {
                            return getNodePosition(getData()).x + 'px';
                        })
                        .style('top', function() {
                            return (getNodePosition(getData()).y - (getNodeOptions().size.height / 2)) + 'px';
                        });
                }

                // position the reveal
                d3.select(revealContainer)
                    .transition()
                    .duration(getOptions().transition)
                    .style('left', function() {
                        return getNodePosition(getData()).x + 'px';
                    })
                    .style('top', function() {
                        return (getNodePosition(getData()).y - (getNodeOptions().size.height / 2)) + 'px';
                    })
                    .style('opacity', ctrl.revealEnabled ? '1' : '0')
                    .style('cursor', ctrl.revealEnabled ? 'pointer' : 'default');
            }

            /*
                Load the node content template defined
            */
            function loadTemplate(callback) {

                // get the template
                var templateUrl = getNodeOptions().template;

                // ensure we have a template
                if (!templateUrl) {
                    throw new Error('Organization Chart - No Node Template Defined');
                }

                // load the template
                $templateRequest(templateUrl).then(function(contents) {

                    // store the template
                    template = contents;

                    // call the callback function
                    callback.call(_this);
                });
            }


            /*
                Generates the tree layout based on defined node size 
            */
            function getTree() {

                // get the node size from options
                var size = getNodeOptions().size;

                // create the tree layout
                return d3.layout.tree()
                    .nodeSize([size.width, size.height])
                    .separation(function separation(a, b) {

                        // if sibling has a different parent set spacing to 100px
                        if (a.parent !== b.parent) {
                            return pixelToRatio(100);
                        }

                        // if there are less than 5 siblings distance should be 50px
                        if (getChildren(a.parent).length < 5) {
                            return pixelToRatio(50);
                        }

                        // if more than 5 children set spacing to 15px
                        return pixelToRatio(15);
                    });
            }

            /*
                Returns layout information from the tree
            */
            function getLayout() {

                // get the chart data
                var data = getData();

                // get the output from tree layout algorithm
                var tree = getTree();

                // get the tree node data
                var nodeData = tree.nodes(data)
                    .reverse();

                // increase the depth value of each
                nodeData.forEach(function(d) {
                    d.y = d.depth * 180;
                });

                // determine links from the nodes
                var linkData = tree.links(nodeData);

                return {
                    nodes: nodeData,
                    links: linkData
                };
            }


            /*
                Returns the chart data from controller
            */
            function getData() {
                return ctrl.data;
            }

            /*
                Returns the options defined in the controller
            */
            function getOptions() {
                return ctrl.options;
            }

            /*
                Returns the options specific to nodes
            */
            function getNodeOptions() {
                return getOptions().nodes;
            }

            /*
                Determine the position of the node taking into account the camera
            */
            function getNodePosition(data) {
                return {
                    x: getCameraCoordinates().x + data.x,
                    y: getCameraCoordinates().y + data.y
                };
            }

            /*
                Convert desired number of pixels to a ratio of the node width
            */
            function pixelToRatio(pixelSize) {

                // add an additional 2 pixels to account for border
                pixelSize += 2;

                // get the specified node size
                var size = getNodeOptions().size;

                // get the value as a ratio of node size
                return 1 + (pixelSize / size.width);
            }


            /* 
                Update the camera position on pan
            */
            function updateCamera() {

                // do nothing if events are disabled
                if (eventsDisabled === true) {
                    return;
                }

                // update the positions of nodes
                nodeCanvas.selectAll('div.organization-node')
                    .style('left', function(data) {
                        return getNodePosition(data).x + 'px';
                    })
                    .style('top', function(data) {
                        return getNodePosition(data).y + 'px';
                    });

                // update the positions of links
                linkCanvas.selectAll('path')
                    .attr('d', getLineEquation());

                // update position of reveal arrow
                nodeCanvas.selectAll('div.reveal-container')
                    .style('left', function() {
                        return getNodePosition(getData()).x + 'px';
                    })
                    .style('top', function() {
                        return (getNodePosition(getData()).y - (getNodeOptions().size.height / 2)) + 'px';
                    });
            }


            /*
                Return a list of all visible node positions
            */
            function getVisibleNodes() {

                // determine the positions of all visible nodes
                var nodePositions = [];

                // get the node size
                var size = getNodeOptions().size;

                // iterate each node
                nodeEach(function(node) {

                    // calculate the position of each node and store it
                    nodePositions.push({
                        node: node,
                        position: {
                            x: node.x,
                            y: node.y
                        },
                        bounds: {
                            top: node.y,
                            right: node.x + (size.width / 2),
                            bottom: node.y + size.height,
                            left: node.x - (size.width / 2)
                        }
                    });
                });

                return nodePositions;
            }

            /*
                Determine if any nodes are on screen
            */
            function nodesOnScreen() {

                // get all visible node positions
                var nodes = getVisibleNodes();

                // get the node size
                var size = getNodeOptions().size;

                // determine width and height of chart
                var width = chartContainer.offsetWidth,
                    height = chartContainer.offsetHeight;

                // get current camera positions
                var cameraPosition = getCameraCoordinates();

                // calculate the camera bounds + incl. margin of node size
                var cameraBounds = {
                    top: cameraPosition.y - size.height,
                    right: cameraPosition.x + size.width,
                    bottom: cameraPosition.y + size.height,
                    left: cameraPosition.x - size.width
                };

                // store results
                var results = {
                    nodes: []
                };

                // iterate each visible node
                for (var idx = 0; idx < nodes.length; idx++) {

                    // get current node
                    var node = nodes[idx];

                    // store distance each node is from being on screen
                    var offset = {
                        top: 0,
                        right: 0,
                        bottom: 0,
                        left: 0
                    };

                    // check all sides to see if bound are within the screen

                    if (cameraBounds.left + node.bounds.right < 0) {
                        offset.left = -(cameraBounds.left + node.bounds.right);
                    }

                    if (cameraBounds.right + node.bounds.left > width) {
                        offset.right = (cameraBounds.right + node.bounds.left) - width;
                    }

                    if (cameraBounds.top + node.bounds.bottom < 0) {
                        offset.top = -(cameraBounds.top + node.bounds.bottom);
                    }

                    if (cameraBounds.bottom + node.bounds.top > height) {
                        offset.bottom = (cameraBounds.bottom + node.bounds.top) - height;
                    }

                    // add information to results
                    results.nodes.push({
                        node: node,
                        offset: offset
                    });

                }

                // determine if any nodes are on screen
                results.visible = results.nodes.filter(function(node) {
                    return node.offset.top === 0 &&
                        node.offset.right === 0 &&
                        node.offset.bottom === 0 &&
                        node.offset.left === 0;
                }).length > 0;

                return results;
            }


            /*
                Ensure the camera doesnt stray too far from the data
            */
            function enforceCameraBounds() {

                // determine is any nodes are currently visible
                var nodeInfo = nodesOnScreen();

                if (nodeInfo.visible) {
                    return;
                }

                // get current camera positions
                var cameraPosition = getCameraCoordinates();

                // determine the distance to move the camera
                var x = cameraPosition.x,
                    y = cameraPosition.y;

                // determine if we are moving horizontally or vertically
                if (!enforceCameraStore) {
                    enforceCameraStore = {
                        x: 0,
                        y: 0
                    };
                }

                // calculate the difference
                var xDiff = Math.max(enforceCameraStore.x, x) - Math.min(enforceCameraStore.x, x),
                    yDiff = Math.max(enforceCameraStore.y, y) - Math.min(enforceCameraStore.y, y),
                    isHorizontalPan = xDiff >= yDiff;

                // update the stored camera position for the next time
                enforceCameraStore = {
                    x: x,
                    y: y
                };

                // sort the nodes to find the node with the smallest distance from being on screen
                var distances = nodeInfo.nodes.sort(function(a, b) {

                    // find the left/right value that is not 0
                    var aX = a.offset.left || a.offset.right;
                    var aY = a.offset.top || a.offset.bottom;

                    var bX = b.offset.left || b.offset.right;
                    var bY = b.offset.top || b.offset.bottom;

                    // calculate the distances
                    var aDist = isHorizontalPan ? aX : aY;
                    var bDist = isHorizontalPan ? bX : bY;

                    if (aDist < bDist) {
                        return -1;
                    }

                    if (aDist > bDist) {
                        return 1;
                    }

                    return 0;
                });

                // if we have no nodes then stop here
                if (distances.length === 0) {
                    return;
                }

                // determine the closest node
                var closestNode = distances[0];

                if (closestNode.offset.left) {
                    x += closestNode.offset.left;
                }
                if (closestNode.offset.right) {
                    x -= closestNode.offset.right;
                }

                if (closestNode.offset.top) {
                    y += closestNode.offset.top;
                }

                if (closestNode.offset.bottom) {
                    y -= closestNode.offset.bottom;
                }

                // perform transition
                linkCanvas.transition()
                    .duration(getOptions().transition)
                    .tween("zoom", function() {

                        var translation = d3.interpolateArray(camera.translate(), [x, y]);

                        return function(t) {
                            camera.translate(translation(t));

                            updateCamera();
                        };
                    });

            }

            /*
                Get the X and Y coordinates of the camera
            */
            function getCameraCoordinates() {
                return {
                    x: camera.translate()[0],
                    y: camera.translate()[1]
                };
            }

            /*
                Save the current camera position
            */
            function saveCamera() {
                cameraStore = getCameraCoordinates();
            }

            /*
                Restore the camera position to the saved position
            */
            function restoreCamera() {
                camera.translate([cameraStore.x, cameraStore.y]);
            }

            /*
                Move camera to focus on a specific node
            */
            function centerNode(data) {
                // move the camera to the node position
                moveCameraToNode(data);

                // select the focused node also
                selectNode(data);
            }

            /*
                Move camera to the position of a nodes children
            */
            function moveCameraToChildren(data) {

                // if there are no children do nothing
                if (!data.children || data.children.length === 0) {
                    return;
                }

                // we need to call get layout to add the co-ordinates of each node
                getLayout();


                // get the node size
                var size = getNodeOptions().size;

                // move the camera to the node x position and the children y position
                moveCamera((width / 2) - data.x, ((height / 2) - data.children[0].y) - size.height);
            }

            /*
                Move camera to the position of a node
            */
            function moveCameraToNode(data) {

                // move the camera to the node position
                moveCamera((width / 2) - data.x, ((height / 2) - data.y));
            }

            /*
                Move camera to specific co-ordinates
            */
            function moveCamera(x, y) {

                // get the current camera position
                var coords = getCameraCoordinates();

                x = x === null || x === undefined ? coords.x : x;
                y = y === null || y === undefined ? coords.y : y;

                // update the camera positions
                camera.translate([x, y]);
            }

            /*
                Prevent any events from being fired
            */
            function disableEvents() {
                eventsDisabled = true;
                saveCamera();
            }

            /*
                Allow events from being fired
            */
            function enableEvents() {
                eventsDisabled = false;
                restoreCamera();
            }

            /*
                Get a nodes children
            */
            function getChildren(node) {
                return node.children || node._children || [];
            }

            /*
                Expand node to show all children
            */
            function expandNode(data) {

                if (data._children) {
                    data.children = data._children;
                    data._children = null;
                }

                data._expanded = true;
            }

            /*
                Expand node to show all children
            */
            function collapseNode(data) {

                if (data.children) {
                    data._children = data.children;
                    data.children = null;
                }

                data._expanded = false;
            }

            /*
                Toggle the collapsed state of a node
            */
            function toggleNode(data) {

                // do nothing if events are disabled
                if (!getNodeOptions().toggle || eventsDisabled === true) {
                    return;
                }

                if (data._expanded === false) {
                    // expand the nodes to show children
                    expandNode(data);

                    // move camera down to y position of children
                    moveCameraToChildren(data);
                } else {
                    collapseNode(data);

                    // move camera to center the node
                    moveCameraToNode(data);
                }

                // select the current node
                selectNode(data);

                // re-render nodes
                render();
            }

            /*
                Create a for each loop through visible nodes
            */
            function nodeEach(callback, root) {

                // set to root node if not specified
                root = root ? root : getData();

                // call callback with this node
                callback.call(null, root);

                // iterate each child
                if (root.children) {
                    root.children.forEach(function(child) {
                        nodeEach(callback, child);
                    });
                }
            }

            /*
                Inform controller of selected node
            */
            function selectNode(node) {

                // remove selected class from all nodes
                deselectNodes();

                // select the current node
                nodeCanvas.selectAll('div.organization-node')
                    .filter(function(d) {
                        return d.id === node.id;
                    })
                    .attr('class', 'organization-node selected');

                // make call in a timeout to force a digest
                $timeout(function() {
                    ctrl.selectNode(node);
                });
            }

            /*
                Remove selected styling from all nodes
            */
            function deselectNodes() {
                nodeCanvas.selectAll('div.organization-node.selected')
                    .attr('class', 'organization-node');
            }

            /*
                Compile the contents of a node
            */
            function compileNode(data) {

                var element = this;

                // create a new child scope
                var nodeScope = scope.$new(true);

                for (var prop in data) {
                    nodeScope[prop] = data[prop];
                }

                // add some useful functions
                nodeScope.getChildCount = function() {

                    if (data.children) {
                        return data.children.length;
                    }

                    if (data._children) {
                        return data._children.length;
                    }

                    return 0;
                };

                nodeScope.getExpanded = function() {
                    return data._expanded;
                };

                nodeScope.expandNode = function() {
                    expandNode(data);
                };

                nodeScope.collapseNode = function() {
                    collapseNode(data);
                };

                // compile in a timeout to ensure digest
                $timeout(function() {
                    $compile(element)(nodeScope);
                });
            }

            /*
                Return the function to calculate the line paths
                Allows us to provide different paths in the future 
                such as bracket and elbow connectors
            */
            function getLineEquation() {

                if(getOptions().connector === "elbow") {

                    return function(d) {

                        var nodeHeight = getNodeOptions().size.height;

                        var source = {
                            x:d.source.x + getCameraCoordinates().x,
                            y:d.source.y + getCameraCoordinates().y + nodeHeight
                        };

                        var target = {
                            x:d.target.x + getCameraCoordinates().x,
                            y:d.target.y + getCameraCoordinates().y
                        };
                     
                        return  "M" + source.x + "," + (source.y) +
                                "v" + ((target.y - source.y)/2) +
                                "h" + (target.x - source.x) +
                                "v" + ((target.y - source.y)/2); 

                    };
                } else {

                    return d3.svg.diagonal()
                        .projection(function(d) {
                            return [d.x + getCameraCoordinates().x, d.y + getCameraCoordinates().y];
                        });

                }
            }

            // hide the connectors while the connector style changes
            function updateConnectorStyle() {

                // store the actual transition time
                var transitionDuration = getOptions().transition;

                // prevent any transition time
                getOptions().transition = 0;

                // perform the render
                render();

                // restore the transition time
                getOptions().transition = transitionDuration;
            }
        }
    };
}