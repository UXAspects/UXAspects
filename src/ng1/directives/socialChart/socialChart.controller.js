SocialChartCtrl.$inject = ["$scope", "sigma", "$timeout", "d3", "safeTimeout"];

export default function SocialChartCtrl($scope, sigma, $timeout, d3, safeTimeout) {
  var sc = this;
  sc._$scope = $scope;
  sc.d3 = d3;

  $scope.options = $scope.options || {};

  //the data to be displayed in the chart
  sc.data = $scope.data;

  //show the chart title
  sc.chartTitle = $scope.chartTitle;
  sc.showTitle = true;
  if (sc.chartTitle !== undefined)
    sc.socialChartTitle = sc.chartTitle.title;
  else
    sc.showTitle = false;
  sc.updateTitle = true;
  //timeout for title
  sc.safeTimeoutInstance = safeTimeout.create($scope);
  sc.setTitleTimer();

  //the styles to be applied to the container
  sc.style = {
    'display': 'inline-block',
    'background-color': '#2A2A2A'
  };

  sc.style.width = $scope.width;
  sc.style.height = $scope.height;

  //the styles to be added to panel inlays - notably background color
  sc.detailInlayStyle = {
    'background-color': '#333'
  };

  var defaultNodeDetailStyle = {
    'width': '235px',
    'height': '99%'
  };

  var defaultEdgeDetailStyle = {
    'width': '40vw',
    'height': '20%',
    'max-height': '176px'
  };

  //Styles on detail panels
  sc.nodeDetailStyle = $scope.detailStyle ? ($scope.detailStyle.node || defaultNodeDetailStyle) : defaultNodeDetailStyle;
  sc.edgeDetailStyle = $scope.detailStyle ? ($scope.detailStyle.edge || defaultEdgeDetailStyle) : defaultEdgeDetailStyle;

  //The styles for the popover panels
  var defaultNodePopoverStyle = {
    'height': '185px'
  };
  var defaultEdgePopoverStyle = {
    'min-width': '550px',
    'height': '175px'
  };
  sc.nodePopoverStyle = $scope.popoverStyle ? ($scope.popoverStyle.node || defaultNodePopoverStyle) : defaultNodePopoverStyle;
  sc.edgePopoverStyle = $scope.popoverStyle ? ($scope.popoverStyle.edge || defaultEdgePopoverStyle) : defaultEdgePopoverStyle;

  //Detail templates
  sc.nodeDetail = $scope.nodeDetail || null;
  sc.edgeDetail = $scope.edgeDetail || null;
  //Optional close button
  sc.showDetailCloseButton = ($scope.options.showDetailCloseButton !== undefined) ? !!$scope.options.showDetailCloseButton : true;

  //Popover templates
  sc.nodePopover = $scope.nodePopover || null;
  sc.edgePopover = $scope.edgePopover || null;

  sc.hoverEnabled = sc.nodePopover || sc.edgePopover;

  //Time to run the ForceAtlas2 algorithm
  if ($scope.forceAtlasDuration === 0) {
    sc.layoutRenderTimeout = 0;
  } else {
    sc.layoutRenderTimeout = $scope.forceAtlasDuration || 1800;
  }

  //check if the edge weight should have influence on the layout
  sc.edgeWeightInfluence = $scope.edgeWeightInfluence === true;

  //minimum number of nodes to display
  sc.minLabels = $scope.minLabels;

  //When present, property to use for interpolation of node sizes
  sc.nodeSizeAttribute = $scope.nodeSizeAttribute || null;

  //Selected items and linking these back to the external scope
  sc.selectedNode = null;
  sc.selectedEdge = null;

  $scope.$watch('sc.selectedNode.id', function () {
    $scope.api.selectedNode = sc.selectedNode;
  });
  $scope.$watch('sc.selectedEdge.id', function () {
    $scope.api.selectedEdge = sc.selectedEdge;
  });

  //Other API functions
  sc.api = sc.api || {};
  $scope.api = $scope.api || {};
  sc.api.onNodeClick = $scope.api.onNodeClick || null;
  sc.api.onEdgeClick = $scope.api.onEdgeClick || null;
  sc.api.onStageClick = $scope.api.onStageClick || null;
  sc.api.onNodeHover = $scope.api.onNodeHover || null;
  sc.api.onEdgeHover = $scope.api.onEdgeHover || null;
  sc.api.onToggleFullscreen = $scope.api.onToggleFullscreen || null;
  sc.api.onLoadComplete = $scope.api.onLoadComplete || null;

  //Optional rendering options
  sc.communities = $scope.communities;

  //Hover settings
  sc.hoverDelay = 850; //ms
  sc.hoveredItem = null;

  //Full-screen settings
  sc.startMaximised = ($scope.startMaximized || $scope.startMaximised) || false;
  sc.showMaximiseControl = ($scope.showMaximizeControl || $scope.showMaximiseControl) || false;
  sc.fullScreenContainer = angular.element('.' + $scope.socialChartContainer)[0] || null;
  $scope.fullscreenButtonPosition = $scope.fullscreenButtonPosition || {};
  sc.maximiseControlStyle = ($scope.fullscreenButtonPosition.maximize || $scope.fullscreenButtonPosition.maximise) || {
    'top': '-20px',
    'right': '-20px'
  };
  sc.minimiseControlStyle = ($scope.fullscreenButtonPosition.minimize || $scope.fullscreenButtonPosition.minimize) || {
    'top': '102px',
    'right': '25px'
  };

  //localStrings
  sc.localStrings = $scope.localStrings || {};
  sc.localStrings.title = sc.localStrings.title || "Entire Network";
  sc.localStrings.reset = sc.localStrings.reset || "Reset";
  sc.localStrings.zoomIn = sc.localStrings.zoomIn || "Zoom In";
  sc.localStrings.zoomOut = sc.localStrings.zoomOut || "Zoom Out";
  sc.tooltipResetHtml = sc.localStrings.reset + "&nbsp;<span class='text-muted'>(" + sc.localStrings.title + ")</span>";

  //Node movement timing
  //With a much lower value for IE
  sc.nodeMovementTime = document.documentMode ? 0 : 1000;

  //Timers
  //Particularly for delayed renders, we should cancel any timeouts set when the scope is destroyed
  sc.timers = {};
  sc.$timeout = $timeout;

  //Instantiated in directive link function
  //(Controller functions run first)
  sc.sigmaInstance = null;

  $scope.api.setSelectedNodeById = sc.setSelectedNodeById();
  $scope.api.setSelectedEdgeById = sc.setSelectedEdgeById();

}

SocialChartCtrl.prototype.setSelectedNodeById = function () {
  var sc = this;

  function setSelectedNodeById(nodeId) {
    var node = sc.sigmaInstance.graph.nodes(nodeId);
    if (node) {
      var container = angular.element('#sigma-container');
      var containerDimensions = {
        'width': container.width(),
        'height': container.height()
      };
      sc.clickNode(node, containerDimensions);
    } else {
      sc.clickStage();
    }
  }

  return setSelectedNodeById;
};

SocialChartCtrl.prototype.setSelectedEdgeById = function () {
  var sc = this;

  function setSelectedEdgeById(edgeId) {
    var edge = sc.sigmaInstance.graph.edges(edgeId);
    if (edge) {

      var container = angular.element('#sigma-container');
      var containerDimensions = {
        'width': container.width(),
        'height': container.height()
      };

      sc.clickEdge(edge, true, containerDimensions);
    } else {
      sc.clickStage();
    }
  }

  return setSelectedEdgeById;
};

SocialChartCtrl.prototype.initialise = function (sigmaInstance) {
  var sc = this;
  sc.sigmaInstance = sigmaInstance;
  sc.loadData();
  sc.setClickEvent();
  sc.setHoverEvent();
  sc.setCameraEvent();
};

SocialChartCtrl.prototype.makeFullscreen = function () {

  var sc = this;

  var container = sc.getContainer()[0]; //sigma-container
  var wrapper = container.getElementsByClassName("sigma-wrapper")[0]; //sigma-wrapper

  //Save the existing values
  if (!sc.toggleFullscreenStyles) {

    var originalWrapperStyle = {
      'top': wrapper.style.top,
      'left': wrapper.style.left,
      'overflow': wrapper.style.overflow,
      'width': wrapper.style.width
    };

    var originalSCStyle = {
      'height': sc.style.height,
      'width': sc.style.width,
      'boxShadow': sc.style.boxShadow || 'none'
    };

    var originalFullscreenContainerStyle = {
      'overflow': sc.fullScreenContainer.style.overflow,
      'maxWidth': sc.fullScreenContainer.style.maxWidth
    };

    sc.toggleFullscreenStyles = {
      'originalWrapperStyle': originalWrapperStyle,
      'originalSCStyle': originalSCStyle,
      'originalFullscreenContainerStyle': originalFullscreenContainerStyle
    };
  }

  sc.hideCanvas();

  //The chart wrapper needs to move to the position of the page container
  wrapper.style.top = ((wrapper.offsetTop - sc.fullScreenContainer.offsetTop) * -1) + "px";
  wrapper.style.left = ((wrapper.offsetLeft - sc.fullScreenContainer.offsetLeft) * -1) + "px";
  wrapper.style.width = '100vw';

  //the chart needs to take up the full space
  sc.style.height = sc.getChartHeight();
  sc.style.width = "100%";

  //stop the container from showing little scrollbars
  sc.fullScreenContainer.style.overflow = "hidden";
  sc.fullScreenContainer.style.maxWidth = "none";

  sc.isFullscreen = true;

  sc.safeTimeout(function () {
    sc.sigmaInstance.refresh();
    sc.showCanvas();
  });
};

SocialChartCtrl.prototype.updateChartHeight = function () {
  var sc = this;
  var chartHeight = sc.getChartHeight();
  if (sc.isFullscreen && sc.style.height !== chartHeight) {
    sc.style.height = chartHeight;
    sc.sigmaInstance.refresh();
  }
};

SocialChartCtrl.prototype.getChartHeight = function () {
  var sc = this;
  var targetHeight = window.innerHeight;
  if (sc.fullScreenContainer) targetHeight -= (sc.fullScreenContainer.offsetTop);
  return targetHeight + "px";
};

SocialChartCtrl.prototype.revertFullScreen = function () {

  var sc = this;

  if (!sc.toggleFullscreenStyles) {
    return;
  }

  var container = sc.getContainer()[0]; //sigma-container
  var wrapper = container.getElementsByClassName("sigma-wrapper")[0]; //sigma-wrapper

  sc.hideCanvas();

  for (var i in sc.toggleFullscreenStyles.originalWrapperStyle) {
    wrapper.style[i] = sc.toggleFullscreenStyles.originalWrapperStyle[i];
  }

  for (var j in sc.toggleFullscreenStyles.originalSCStyle) {
    sc.style[j] = sc.toggleFullscreenStyles.originalSCStyle[j];
  }

  for (var k in sc.toggleFullscreenStyles.originalFullscreenContainerStyle) {
    sc.fullScreenContainer.style[k] = sc.toggleFullscreenStyles.originalFullscreenContainerStyle[k];
  }

  sc.isFullscreen = false;

  sc.safeTimeout(function () {
    sc.sigmaInstance.refresh();
    sc.showCanvas();
  });

};

SocialChartCtrl.prototype.toggleFullscreen = function () {
  var sc = this;
  //Callback, if present
  if (sc.api.onToggleFullscreen) {
    if (!sc.api.onToggleFullscreen()) {
      //If the callback returns false, then do not perform the standard transition
      return;
    }
  }
  if (sc.isFullscreen) {
    sc.revertFullScreen();
  } else {
    sc.makeFullscreen();
  }
};

SocialChartCtrl.prototype.loadData = function () {
  var sc = this;

  sc.neighborViewOnSelect = true;
  if (typeof sc.sigmaInstance.settings("neighborViewOnSelect") !== 'undefined') {
    sc.neighborViewOnSelect = !!sc.sigmaInstance.settings("neighborViewOnSelect");
  }

  var getSize = function (nodeID, edges) {
    var count = 1;
    for (var i = 0; i < edges.length; i++) {
      if (edges[i].source === nodeID) {
        count++;
      }
    }
    return count;
  };

  //Define the nodes
  sc.totalNodeCount = sc.data.nodes.length;
  for (var i = 0; i < sc.totalNodeCount; i++) {
    sc.sigmaInstance.graph.addNode({
      id: '' + sc.data.nodes[i].id,
      label: sc.data.nodes[i].label,
      x: Math.random(),
      y: Math.random(),
      additional: sc.data.nodes[i].additional || {},
      size: sc.nodeSizeAttribute ?
        sc.data.nodes[i].additional[sc.nodeSizeAttribute] || 1 : sc.data.nodes[i].size || getSize(sc.data.nodes[i].id, sc.data.edges),
      color: (sc.data.nodes[i].community) ?
        sc.communities[sc.data.nodes[i].community].color : null,
      style: (sc.data.nodes[i].community) ?
        sc.communities[sc.data.nodes[i].community].style : 'fill',
      getNeighbors: getNeighbors(sc.data.nodes[i].id)
    });
  }

  //Define the edges
  for (var j = 0; j < sc.data.edges.length; j++) {
    sc.sigmaInstance.graph.addEdge({
      id: 'e' + j,
      source: '' + sc.data.edges[j].source,
      target: '' + sc.data.edges[j].target,
      value: sc.data.edges[j].value,
      type: 'curve',
      size: sc.data.edges[j].size || null,
      weight: sc.data.edges[j].weight || 0,
      additional: sc.data.edges[j].additional || {},
      getSourceNode: getSourceNode(sc.data.edges[j].source).bind(sc),
      getTargetNode: getTargetNode(sc.data.edges[j].target).bind(sc)
    });
  }

  //Render

  //If starting full screen
  if (sc.startMaximised && sc.fullScreenContainer) {

    sc.makeFullscreen();

  }

  //Check whether to adjust the node positions to acommodate the side panel
  sc.adjustNodeCentres = sc.sigmaInstance.settings("adjustCameraCenter") || false;

  if (sc.layoutRenderTimeout > 0) {

    sc.disableDraw();

    //if we should be taking edge weight into account then
    if (sc.edgeWeightInfluence === true) {
      sc.sigmaInstance.configForceAtlas2({
        edgeWeightInfluence: 1
      });
    }

    sc.sigmaInstance.startForceAtlas2();
  }

  sc.safeTimeout(function () {
    sc.sigmaInstance.stopForceAtlas2();
    sc.enableDraw();

    //show initial minimum number of labels
    sc.showMinimumLabels();

    sc.sigmaInstance.refresh();
    if (sc.api.onLoadComplete) {
      sc.api.onLoadComplete();
    }
  }, sc.layoutRenderTimeout);

  function getSourceNode(sId) {
    function getSourceNode() {
      return sc.sigmaInstance.graph.nodes(sId);
    }
    return getSourceNode;
  }

  function getTargetNode(tId) {
    function getTargetNode() {
      return sc.sigmaInstance.graph.nodes(tId);
    }
    return getTargetNode;
  }

  function getNeighbors(nodeId) {
    function getNeighbors() {
      return {
        'nodes': sc.sigmaInstance.graph.neighbors(nodeId),
        'edges': sc.sigmaInstance.graph.nodeEdges(nodeId),
      };
    }
    return getNeighbors;
  }
};


SocialChartCtrl.prototype.disableDraw = function () {
  var sc = this;
  sc.sigmaInstance.settings("hideEdgesOnMove", true);
  //sc.sigmaInstance.settings("drawNodes", false);
  sc.sigmaInstance.settings("drawEdges", false);
  sc.sigmaInstance.settings("drawLabels", false);
};

SocialChartCtrl.prototype.enableDraw = function () {
  var sc = this;
  //sc.sigmaInstance.settings("hideEdgesOnMove",false);
  sc.sigmaInstance.settings("drawNodes", true);
  sc.sigmaInstance.settings("drawEdges", true);
  sc.sigmaInstance.settings("drawLabels", true);
};

SocialChartCtrl.prototype.selectNode = function (node) {
  var sc = this;
  sc.selectedNode = node;
  sc.selectedEdge = null;
};

SocialChartCtrl.prototype.selectEdge = function (edge, applyInProgress) {
  var sc = this;
  sc.selectedEdge = edge;
  sc.selectedNode = null;
  if (!applyInProgress) {
    sc._$scope.$digest();
  }
};

SocialChartCtrl.prototype.clearSelected = function (applyInProgress) {
  var sc = this;
  sc.hoveredItem = null;
  sc.enableHover();
  sc.selectNode(null);
  sc.selectEdge(null, applyInProgress);
};

SocialChartCtrl.prototype.setTitleTimer = function () {
  var sc = this;
  //cancel previous timerTitle
  if (sc.timerTitle !== undefined) sc.safeTimeoutInstance.cancel(sc.timerTitle);

  //timer for title
  if (sc.chartTitle !== undefined && sc.chartTitle.timeout !== undefined) {
    sc.timerTitle = sc.safeTimeoutInstance.timeout(function () {
      sc.updateTitle = false;
    }, sc.chartTitle.timeout);
  }
  return;
};

SocialChartCtrl.prototype.clickNode = function (node, containerDimensions) {
  var sc = this;

  sc.mouseLeaveUIElement();

  //setting title
  if (sc.socialChartTitle !== undefined && sc.chartTitle.nodeSelectedTitle !== undefined) {
    sc.socialChartTitle = sc.chartTitle.nodeSelectedTitle.replace("{{node}}", node.label);
    sc.updateTitle = true;
    sc.setTitleTimer();
  }

  //get the id of the clicked node
  var nodeId = node.id;
  //get the 1st degree neighbours
  var toKeep = sc.sigmaInstance.graph.neighbors(nodeId);
  //update the reference
  toKeep[nodeId] = node;
  //update watchers
  sc.selectNode(node);
  sc.selectedNode.neighbours = toKeep;

  sc.sigmaInstance.graph.nodes().forEach(function (n) {

    //Remember if this was the last selected node
    n.wasSelected = n.selected;
    //reset all display properties
    n.selected = false;
    n.rendered = false;
    n.showLabel = false;
    if (n.originalX && !n.wasSelected && n.id !== nodeId) {
      n.x = n.originalX;
      n.y = n.originalY;
      n.originalX = null;
      n.originalY = null;
    }

    //keep selected and neighbours highlighted, else dim the other nodes
    if (toKeep[n.id]) {
      n.color = n.originalColour;
      n.bringToFront = true;
    } else {
      n.color = sc.sigmaInstance.settings("hiddenNodeColor") || '#315351';
      n.bringToFront = false;
    }
  });

  sc.sigmaInstance.graph.edges().forEach(function (e) {
    //Does this edge go between two nodes that are both highlighted?
    //If so, it stays highlighted too
    if ((toKeep[e.source] && toKeep[e.source].id === nodeId) || (toKeep[e.target] && toKeep[e.target].id === nodeId)) {
      e.color = e.originalColour;
      e.hover_color = sc.sigmaInstance.settings("defaultEdgeHoverColor") || '#2AD2C9';
    } else {
      e.color = sc.sigmaInstance.settings("hiddenEdgeColor") || '#324342';
      e.hover_color = sc.sigmaInstance.settings("hiddenEdgeColor") || '#324342';
    }
    //since a node was clicked, there's no way for an edge to be selected here
    e.selected = false;
    e.bringToFront = false;
  });

  sc.sigmaInstance.refresh();

  if (sc.api.onNodeClick) {
    sc.api.onNodeClick(node);
  }

  //no need to hover anything now
  sc.hoveredItem = null;

  //Fixed ratio for forced layout, dynamic ratio for optimal node vision when not rearranging
  //For very small graphs we need to use dynamic camera regardless
  var smallGraph = (sc.totalNodeCount < 20);
  var useDynamicZoomRatio = (smallGraph || !sc.neighborViewOnSelect);
  var zoomRatio = (useDynamicZoomRatio) ? sc.getZoomRatio(node, toKeep, containerDimensions) : 0.3;

  //For small graphs, rescale the dynamic camera
  if (smallGraph) {
    zoomRatio = (zoomRatio > 2) ? zoomRatio - 1 : zoomRatio;
  }

  /*
  Passed to the camera move function to allow the camera to be moved twice if the co-ords change
  */
  var updateCameraPosition = function (origX, origY) {

    function afterZoomCallback() {

      //Validate selected node still exists
      if (sc.selectedNode) {
        //If the camera position does not match the intended target camera position
        //e.g. due to the graph boundaries being recalculated
        //Then perform the move again
        if ((sc.selectedNode['read_cam0:x'] !== origX) || (sc.selectedNode['read_cam0:y'] !== origY)) {

          sc.safeTimeout(function () {

            sc.zoomTo(
              sc.getX(node['read_cam0:x'],
                sc.nodeDetail,
                sc.isFullscreen,
                sc.menuVisible,
                zoomRatio,
                sc.sigmaInstance.settings("cameraCenterOffset"),
                sc.adjustNodeCentres
              ),
              sc.getY(
                node['read_cam0:y'],
                sc.isFullscreen,
                sc.adjustNodeCentres
              ),
              zoomRatio
            );
          }, 100);
        }
        //

      }
      return null;
    }
    return afterZoomCallback;
  };

  //Force the ellipsoid selected node pattern
  if (sc.neighborViewOnSelect) {
    sc.forceNodeLayout(node, containerDimensions, toKeep);
  }


  sc.safeTimeout(function () {
    if (sc.selectedNode) {
      sc.selectedNode.selected = true;
      sc.sigmaInstance.refresh();
    }
  }, sc.nodeMovementTime);

  //Move the camera to centre on the selected node
  sc.zoomTo(
    sc.getX(
      node['read_cam0:x'],
      sc.nodeDetail,
      sc.isFullscreen,
      sc.menuVisible,
      zoomRatio,
      sc.sigmaInstance.settings("cameraCenterOffset"),
      sc.adjustNodeCentres
    ),
    sc.getY(
      node['read_cam0:y'],
      sc.isFullscreen,
      sc.adjustNodeCentres
    ),
    zoomRatio,
    updateCameraPosition(node['read_cam0:x'], node['read_cam0:y'])
  );
};

SocialChartCtrl.prototype.getX = function (nodeX, detailPanelToShow, isFullscreen, menuVisible, zoomRatio, offset, adjustNodeCentres) {

  if (!adjustNodeCentres) {
    return nodeX;
  }

  if (!detailPanelToShow) {
    return nodeX;
  } else {
    var fullscreen = isFullscreen ? offset / 30 : 0;
    var menu = (isFullscreen && menuVisible) ? offset / 5 : 0;
    return nodeX + (offset * zoomRatio) + fullscreen + menu;
  }
};

SocialChartCtrl.prototype.getY = function (nodeY, isFullscreen, adjustNodeCentres) {
  if (!adjustNodeCentres) {
    return nodeY;
  }

  if (isFullscreen) {
    return nodeY + 30;
  } else {
    return nodeY;
  }
};

SocialChartCtrl.prototype.forceNodeLayout = function (node, containerDimensions, toKeep) {
  var sc = this;

  //Centre of the circle
  var centre = {
    x: node.x,
    y: node.y
  };
  var nodeId = node.id;

  //Arrange the 1st degree neighbours around the centre position
  //The number of points to position
  var toKeepIds = Object.keys(toKeep);
  var points = toKeepIds.length;
  var r = Math.pow(containerDimensions.width, (sc.isFullscreen ? 0.35 : 0.45)) / 2;

  //Magic numbers for constants
  var a = Math.ceil(points / 10);
  var b = Math.floor(points / 10);

  var xAspect, yAspect;
  //225: side panel
  if (containerDimensions.width - 225 > containerDimensions.height) {
    xAspect = 1.6;
    yAspect = 1;
  } else if (containerDimensions.width - 225 < containerDimensions.height) {
    xAspect = 1;
    yAspect = 1.6;
  } else {
    xAspect = 1;
    yAspect = 1;
  }

  // All neighbor nodes except the current and previously selected
  var toMove = toKeepIds.filter(function(i) { return i !== nodeId && !toKeep[i].wasSelected; });
  if (toMove.length === 0) {
    // In the edge case of no matching nodes, relocate the unselected node regardless of previous selection.
    toMove = toKeepIds.filter(function(i) { return i !== nodeId; });
  }

  toMove.forEach(function(id, index) {
    var count = index + 2;

    //Retain previous values
    toKeep[id].originalX = toKeep[id].x;
    toKeep[id].originalY = toKeep[id].y;

    //Prevent the circle being perfect
    var radius = r + ((count % a) * b);

    //Ellipse layout for 1st degree neighbours
    toKeep[id].to_x = centre.x + radius * xAspect * Math.cos(2 * Math.PI * count / points);
    toKeep[id].to_y = centre.y + radius * yAspect * Math.sin(2 * Math.PI * count / points);
  });

  var previousNode = Object.values(toKeep).find(function(n) { return n.wasSelected && n.id !== nodeId; });

  //May have to adjust position of something if we came with a fixed position node
  var displaceOffset = 1;
  //Limit the attempts to reposition
  var maxTries = 3;
  //If there is a fixed node which is ignoring the new layout
  if (previousNode) {
    //check if it collides with any node we just moved
    for (var j in toKeep) {

      if (j !== nodeId && j !== previousNode.id) {

        var attempts = 0;
        while (sc.detectCollision(previousNode, "", toKeep[j], "to_") && attempts < maxTries) {
          var newPosition = sc.displaceNode(toKeep[j], centre, displaceOffset, "to_");
          toKeep[j].to_x = newPosition.x;
          toKeep[j].to_y = newPosition.y;
          displaceOffset += 0.5;
          attempts++;
        }
      }
    }
  }

  //Displace the nodes that are visible but not selected

  //Get the list of visible nodes
  //Initially a very large set but less problematic as you go
  var nodesOnScreen = sc.sigmaInstance.renderers[0].nodesOnScreen;
  var unselectedNodes = [];

  for (var k in nodesOnScreen) {

    //If we don't want to keep this node and it's too close
    if ((!~toKeepIds.indexOf(nodesOnScreen[k].id)) &&
      (sc.getDistance(centre, nodesOnScreen[k], "") < r * 2)) {

      //Retain the old position
      nodesOnScreen[k].originalX = nodesOnScreen[k].x;
      nodesOnScreen[k].originalY = nodesOnScreen[k].y;

      var newNodePosition = sc.displaceNode(nodesOnScreen[k], centre, r);

      //Translate
      nodesOnScreen[k].to_x = newNodePosition.x;
      nodesOnScreen[k].to_y = newNodePosition.y;

      //Passed to animator
      unselectedNodes.push(nodesOnScreen[k].id);
    }
  }

  //Animate the transition
  sigma.plugins.animate(
    sc.sigmaInstance, {
      x: 'to_x',
      y: 'to_y'
    }, {
      duration: sc.nodeMovementTime,
      easing: 'cubicInOut',
      nodes: toMove.concat(unselectedNodes)
    }
  );

};

SocialChartCtrl.prototype.displaceNode = function (nodeToMove, centre, radius, prefix) {
  var sc = this;

  if (!prefix) {
    prefix = "";
  }
  //Get the translation
  var nX = (nodeToMove[prefix + 'x'] || nodeToMove.x);
  var nY = (nodeToMove[prefix + 'y'] || nodeToMove.y);
  var cX = (centre[prefix + 'x'] || centre.x);
  var cY = (centre[prefix + 'y'] || centre.y);
  //Min. to 1 in case the points are on top of each other
  var displaceToX = Math.max(Math.abs(nX - cX), 1);
  var displaceToY = Math.max(Math.abs(nY - cY), 1);

  //Closer nodes should be moved further away
  var distance = sc.getDistance(nodeToMove, centre, prefix);
  radius = Math.max(((distance * distance * -1) + radius * 3), 1);

  //Get the direction of the translation
  if (nX > cX) {
    displaceToX *= radius;
  } else if (nX < cX) {
    displaceToX *= -radius;
  }

  if (nY > cY) {
    displaceToY *= radius;
  } else if (nY < cY) {
    displaceToY *= -radius;
  }

  return {
    'x': nX + displaceToX,
    'y': nY + displaceToY
  };
};

SocialChartCtrl.prototype.detectCollision = function (nodeA, prefixA, nodeB, prefixB) {

  prefixA = prefixA || "";
  prefixB = prefixB || "";

  var p1 = {
    x: nodeA[prefixA + 'x'] || nodeA.x,
    y: nodeA[prefixA + 'y'] || nodeA.y
  };
  var p2 = {
    x: nodeB[prefixB + 'x'] || nodeB.x,
    y: nodeB[prefixB + 'y'] || nodeB.y
  };

  var d = Math.sqrt(Math.pow(Math.abs(p1.x - p1.x), 2) + Math.pow(Math.abs(p1.y - p2.y), 2));

  if (isNaN(d)) {
    return false;
  }
  return d < 1;

};

SocialChartCtrl.prototype.clickEdge = function (edge, applyInProgress, containerDimensions) {
  var sc = this;

  //setting title
  if (sc.socialChartTitle !== undefined && sc.chartTitle.edgeSelectedTitle !== undefined) {
    var source = edge.getSourceNode();
    var target = edge.getTargetNode();
    sc.socialChartTitle = sc.chartTitle.edgeSelectedTitle.replace("{{source}}", source.label)
      .replace("{{target}}", target.label);
    sc.updateTitle = true;
    sc.setTitleTimer();
  }

  sc.mouseLeaveUIElement();

  sc.selectEdge(edge, applyInProgress);
  //dim all the nodes except source and target
  sc.sigmaInstance.graph.nodes().forEach(function (n) {
    n.selected = false;
    n.rendered = false;
    n.bringToFront = false;
    if (n.id !== edge.source && n.id !== edge.target) {
      n.color = sc.sigmaInstance.settings("hiddenNodeColor") || '#315351';
      n.showLabel = false;
    } else {
      n.color = n.originalColour;
      n.showLabel = true;
      n.bringToFront = true;
    }
  });
  //dim all the other edges
  sc.sigmaInstance.graph.edges().forEach(function (e) {
    e.selected = false;
    e.bringToFront = false;
    e.color = sc.sigmaInstance.settings("hiddenEdgeColor") || '#324342';
    e.hover_color = sc.sigmaInstance.settings("hiddenEdgeColor") || '#324342';
  });
  //highlight this edge
  edge.bringToFront = true;
  edge.selected = true;
  edge.color = sc.sigmaInstance.settings("defaultEdgeHoverColor") || '#2AD2C9';
  edge.hover_color = sc.sigmaInstance.settings("defaultEdgeHoverColor") || '#2AD2C9';

  //no need to hover anything now
  sc.hoveredItem = null;

  if (sc.api.onEdgeClick) {
    sc.api.onEdgeClick(edge);
  }

  /*
  Get camera position
  */
  //1. Get the two nodes
  var sourceNode = edge.getSourceNode();
  var targetNode = edge.getTargetNode();
  if (sourceNode && targetNode) {
    //2. Determine the centre position between the two
    var edgeX = (sourceNode['read_cam0:x'] + targetNode['read_cam0:x']) / 2;
    var edgeY = (sourceNode['read_cam0:y'] + targetNode['read_cam0:y']) / 2;

    //3.Calculate the zoom level to show both nodes, based on their distance
    var zoomToLevel = sc.getZoomRatio(sourceNode, [targetNode], containerDimensions);

    //4. Move the camera
    sc.zoomTo(edgeX, edgeY, zoomToLevel);

  }

  sc.sigmaInstance.refresh();
};

SocialChartCtrl.prototype.clickStage = function (e) {
  var sc = this;
  //setting title
  if (sc.socialChartTitle !== undefined && sc.chartTitle.stageSelectedTitle !== undefined) {
    sc.socialChartTitle = sc.chartTitle.stageSelectedTitle;
    sc.updateTitle = true;
    sc.setTitleTimer();
  }

  sc.mouseLeaveUIElement();

  if (sc.selectedNode) {
    sc.selectedNode.rendered = false;
    sc.selectedNode.selected = false;
  }

  sc.clearSelected(!e); //if Event is defined, this call originated internally so a digest is not in progress

  //reset all the nodes and edges
  sc.sigmaInstance.graph.nodes().forEach(function (n) {
    n.color = n.originalColour;
    n.selected = false;
    n.showLabel = false;
    n.bringToFront = false;
    if (n.originalX) {
      n.x = n.originalX;
      n.y = n.originalY;
      n.originalX = null;
      n.originalY = null;
    }
  });

  sc.sigmaInstance.graph.edges().forEach(function (e) {
    e.color = e.originalColour;
    e.hover_color = null;
    e.selected = false;
    e.bringToFront = false;
  });

  if (sc.api.onStageClick) {
    sc.api.onStageClick();
  }

  sc.sigmaInstance.refresh();


  sc.zoomTo(0, 0, 1);

};

SocialChartCtrl.prototype.setClickEvent = function () {
  var sc = this;

  //Store label thresholds to vary them as the camera zooms
  sc.originalLabelTheshold = sc.sigmaInstance.settings("labelTheshold") || 7;
  sc.zoomedLabelTheshold = Math.floor(sc.originalLabelTheshold / 2);

  var resetLabelThreshold = function () {
    sc.sigmaInstance.settings("labelTheshold", sc.originalLabelTheshold);
  };

  var setZoomedThreshold = function () {
    sc.sigmaInstance.settings("labelTheshold", sc.zoomedLabelTheshold);
  };

  //initialise by storing the original node and edge colours
  sc.sigmaInstance.graph.nodes().forEach(function (n) {
    n.originalColour = n.color;
    n.selected = false;
  });
  sc.sigmaInstance.graph.edges().forEach(function (e) {
    e.originalColour = e.color;
  });

  //bind the click event
  sc.sigmaInstance.bind("clickNode", function (e) {
    var containerDimensions = {
      'width': e.data.renderer.width,
      'height': e.data.renderer.height
    };
    setZoomedThreshold();
    sc.clickNode(e.data.node, containerDimensions);

  });

  sc.sigmaInstance.bind("clickStage", function (e) {

    if (e.data.captor.isDragging) {
      return;
    }
    resetLabelThreshold();
    sc.clickStage(e);

  });

  sc.sigmaInstance.bind("clickEdge", function (e) {
    var containerDimensions = {
      'width': e.data.renderer.width,
      'height': e.data.renderer.height
    };

    resetLabelThreshold();
    sc.clickEdge(e.data.edge, false, containerDimensions);

  });
};

SocialChartCtrl.prototype.setHoverEvent = function () {
  var sc = this;

  sc.sigmaInstance.bind("outEdge", function () {
    sc.fixEdgeHover();
  });

};

SocialChartCtrl.prototype.fixEdgeHover = function () {
  var sc = this;

  if (sc.edgeHoverTimer) {
    sc.$timeout.cancel(sc.edgeHoverTimer);
  }

  sc.edgeHoverTimer = sc.safeTimeout(function () {
    sigma.misc.drawHovers.clearHover();
    sc.sigmaInstance.refresh();
  }, sc.nodeMovementTime);
};

SocialChartCtrl.prototype.cancelPopover = function () {
  var sc = this;
  sc.hoveredItem = null;

  if (sc.hoverTimerReplacement) {
    sc.$timeout.cancel(sc.hoverTimerReplacement);
  }

  if (sc.hoverTimer) {
    sc.$timeout.cancel(sc.hoverTimer);
  }

  if (sc.edgeHoverTimer) {
    sc.$timeout.cancel(sc.edgeHoverTimer);
  }

  sigma.misc.drawHovers.clearHover();
};

SocialChartCtrl.prototype.getHoveredNodes = function (coordinates) {

  if (coordinates && coordinates.stageX) {
    var point = {
      data: {
        'x': coordinates.stageX,
        'y': coordinates.stageY
      }
    };

    var nodes = sigma.misc.bindEvents.getNodes(point);

    return nodes;

  }
  return [];
};

SocialChartCtrl.prototype.getHoveredEdges = function (coordinates) {

  if (coordinates && coordinates.stageX) {
    var point = {
      data: {
        'x': coordinates.stageX,
        'y': coordinates.stageY
      }
    };

    var edges = sigma.misc.bindEvents.getEdges(point);

    return edges;

  }
  return [];
};

SocialChartCtrl.prototype.startHoverTimeout = function (initialPosition) {
  var sc = this;

  //If there is a tooltip already, check if we need to change or remove it
  if (sc.hoveredItem) {
    //Check if the mouse is close enough to still show the tooltip
    if (sc.outOfTooltipBounds(initialPosition, sc.hoveredItem.initialPosition)) {
      sigma.misc.drawHovers.clearHover();
      sc.hoveredItem = null;
      sc.enableHover();
      sc.sigmaInstance.refresh();
    } else {
      if (sc.hoverTimerReplacement) {
        sc.$timeout.cancel(sc.hoverTimerReplacement);
        sc.hoverTimerReplacement = null;

        if (sc.hoverTimer) {
          sc.$timeout.cancel(sc.hoverTimer);
        }

        sc.hoverTimer = null;
      }
      //within tooltip bounds, but check for another node being hovered
      //NB: not edge
      var hoverReplacement = sc.getHoveredNodes(sc.mousePosition);
      //if the cursor is over another node
      if (hoverReplacement.length) {
        sc.hoverTimerReplacement = sc.safeTimeout(function () {
          //Update if there is no hoveredItem, or if there is but the candidate is different
          if (((sc.hoveredItem) && (hoverReplacement[0].id !== sc.hoveredItem.id)) ||
            (!sc.hoveredItem)) {
            sc.updateHoveredItem(hoverReplacement[0], "node", initialPosition);
          }
        }, sc.hoverDelay);
      }
    }
    return;
  }

  //Cancel existing promises - we only ever have one candidate item to hover
  if (sc.hoverTimer && (initialPosition.movementX > 1 || initialPosition.movementY > 1)) {
    sc.$timeout.cancel(sc.hoverTimer);
    sc.hoverTimer = null;

    if (sc.hoverTimerReplacement) {
      sc.$timeout.cancel(sc.hoverTimerReplacement);
    }

    sc.hoverTimerReplacement = null;
  }

  //Start a countdown to show a tooltip for this item
  sc.hoverTimer = sc.safeTimeout(function () {

    //NB: Sqrt this value for actual distance
    var mouseMovementSq = Math.pow(Math.abs(initialPosition.clientX - sc.mousePosition.clientX), 2) + Math.pow(Math.abs(initialPosition.clientY - sc.mousePosition.clientY), 2);

    if ((mouseMovementSq < 50) && (!sc.mouseOverUI)) {
      var nodes = sc.getHoveredNodes(sc.mousePosition);
      if (nodes.length) {
        sc.updateHoveredItem(nodes[0], "node", initialPosition);
      } else {
        var edges = sc.getHoveredEdges(sc.mousePosition);
        if (edges.length) {
          sc.updateHoveredItem(edges[0], "edge", initialPosition);
        }
      }

    }

  }, sc.hoverDelay);
};

SocialChartCtrl.prototype.outOfTooltipBounds = function (mousePosition, hoverItemPosition) {
  var sc = this;
  sc.hoveredItem.popoverWidth = sc.hoveredItem.popoverWidth || angular.element(".sigma-chart-popover").width();
  sc.hoveredItem.popoverHeight = sc.hoveredItem.popoverHeight || angular.element(".sigma-chart-popover").height();

  switch (sc.popoverPosition) {
    case "bottom":
      return sc.outOfTooltipBoundsBottom(mousePosition, hoverItemPosition);

    case "top":
      return sc.outOfTooltipBoundsTop(mousePosition, hoverItemPosition);

    case "right":
      return sc.outOfTooltipBoundsRight(mousePosition, hoverItemPosition);

    case "left":
      return sc.outOfTooltipBoundsLeft(mousePosition, hoverItemPosition);

    case "default":
      return true;

  }
};

SocialChartCtrl.prototype.outOfTooltipBoundsBottom = function (mousePosition, hoverItemPosition) {
  var sc = this;
  //left
  if (mousePosition.clientX < hoverItemPosition.clientX - (sc.hoveredItem.popoverWidth / 2)) return true;
  //bottom boundary
  if (mousePosition.clientY > (hoverItemPosition.clientY + sc.hoveredItem.popoverHeight + 10)) return true;
  //right boundary
  if (mousePosition.clientX > hoverItemPosition.clientX + (sc.hoveredItem.popoverWidth / 2)) return true;
  //top boundary
  if (mousePosition.clientY < hoverItemPosition.clientY - 5) return true;
  return false;
};

SocialChartCtrl.prototype.outOfTooltipBoundsTop = function (mousePosition, hoverItemPosition) {
  var sc = this;
  //left
  if (mousePosition.clientX < hoverItemPosition.clientX - (sc.hoveredItem.popoverWidth)) return true;
  //bottom boundary
  if (mousePosition.clientY > (hoverItemPosition.clientY + 10)) return true;
  //right boundary
  if (mousePosition.clientX > hoverItemPosition.clientX + (sc.hoveredItem.popoverWidth)) return true;
  //top boundary
  if (mousePosition.clientY < hoverItemPosition.clientY - sc.hoveredItem.popoverHeight - 15) return true;
  return false;
};

SocialChartCtrl.prototype.outOfTooltipBoundsLeft = function (mousePosition, hoverItemPosition) {
  var sc = this;
  //left
  if (mousePosition.clientX < hoverItemPosition.clientX - sc.hoveredItem.popoverWidth) return true;
  //bottom boundary
  if (mousePosition.clientY > (hoverItemPosition.clientY + (sc.hoveredItem.popoverHeight / 2) + 10)) return true;
  //right boundary
  if (mousePosition.clientX > hoverItemPosition.clientX + 10) return true;
  //top boundary
  if (mousePosition.clientY < hoverItemPosition.clientY - (sc.hoveredItem.popoverHeight / 2) + 10) return true;
  return false;
};

SocialChartCtrl.prototype.outOfTooltipBoundsRight = function (mousePosition, hoverItemPosition) {
  var sc = this;
  //left
  if (mousePosition.clientX < hoverItemPosition.clientX - 5) return true;
  //bottom boundary
  if (mousePosition.clientY > (hoverItemPosition.clientY + (sc.hoveredItem.popoverHeight / 2) + 10)) return true;
  //right boundary
  if (mousePosition.clientX > hoverItemPosition.clientX + (sc.hoveredItem.popoverWidth) + 10) return true;
  //top boundary
  if (mousePosition.clientY < hoverItemPosition.clientY - (sc.hoveredItem.popoverHeight / 2) + 10) return true;
  return false;
};

SocialChartCtrl.prototype.updateHoveredItem = function (hoverCandidate, itemType, initialPosition) {
  var sc = this;

  if (sc.hoveredItem === hoverCandidate) return;

  sc.hoveredItem = hoverCandidate;
  sc.hoveredItem.initialPosition = initialPosition;
  sc.hoveredItem.node = false;
  sc.hoveredItem.edge = false;

  sc.hoveredItem.popoverDirection = sc.popoverDirectionFromElement(initialPosition);

  if (itemType === "node") {
    var screenRelativeNodePosition = sc.getNodePosition(hoverCandidate);

    if (sc.api.onNodeHover) {
      sc.api.onNodeHover(sc.hoveredItem);
    }

    sc.updateNodePopoverPosition(screenRelativeNodePosition.x, screenRelativeNodePosition.y, screenRelativeNodePosition.size, sc.hoveredItem.popoverDirection);
    sc.hoveredItem.node = true;
  } else if (itemType === "edge") {
    var edgeCaptorPosition = sc.getClientPosition(sc.mousePosition);

    if (sc.api.onEdgeHover) {
      sc.api.onEdgeHover(sc.hoveredItem);
    }

    sc.updateEdgePopoverPosition(edgeCaptorPosition.x, edgeCaptorPosition.y, sc.hoveredItem.popoverDirection);
    sc.hoveredItem.edge = true;
  }

  sc.delayPopoverUntilRender();
};

SocialChartCtrl.prototype.delayPopoverUntilRender = function () {
  var sc = this;

  if (!sc.popoverDelayTimer) {

    sc.nodePopoverStyle.visibility = 'hidden';
    sc.edgePopoverStyle.visibility = 'hidden';

    //this is required to let scrollbar render without any flickering
    sc.popoverDelayTimer = sc.safeTimeout(function () {
      sc.nodePopoverStyle.visibility = '';
      sc.edgePopoverStyle.visibility = '';
      sc.$timeout.cancel(sc.popoverDelayTimer);
      sc.popoverDelayTimer = null;
    }, 5);
  }
};

SocialChartCtrl.prototype.getClientPosition = function (event) {
  return {
    x: event.clientX,
    y: event.clientY
  };
};

SocialChartCtrl.prototype.getNodePosition = function (node) {
  var sc = this;
  var prefix = sc.getPrefix("renderer")();
  var scroll = window.pageXOffset;
  return {
    x: node[prefix + "x"] + (sc.chartPosition ? sc.chartPosition.offsetLeft : 0) - scroll,
    y: node[prefix + "y"] + (sc.chartPosition ? sc.chartPosition.offsetTop : 0),
    size: node[prefix + "size"]
  };
};

/*
This function calculates the position for the popover, based on which side of the element it needs to be appear on.
The horizontal positions (centre, left, right) can be paired with any vertical position (centre, top, bottom)
*/
SocialChartCtrl.prototype.setPopoverOffsets = function (position, clientRect, x, y, size, popoverWidth, popoverHeight) {

  var offset = {
    left: 0,
    top: 0
  };

  var padding = 20;
  var verticalCentrePadding = 18;
  var leftAdjust = 9;
  var rightAdjust = 6;

  if (position.centreH) {
    offset.left = parseInt(x) - clientRect.left - (popoverWidth / 2);
  } else if (position.left) {
    offset.left = position.centreV ?
      parseInt(x) - clientRect.left - (popoverWidth) - padding - leftAdjust :
      parseInt(x) - clientRect.left - (popoverWidth / 2) - padding - Math.max(((popoverWidth / 2) - position.left), 0);
  } else if (position.right) {
    offset.left = position.centreV ?
      parseInt(x) - clientRect.left + padding + rightAdjust :
      parseInt(x) - clientRect.left - (popoverWidth / 2) + padding + Math.max(((popoverWidth / 2) - position.right), 0);
  }

  if (position.centreV) {
    offset.top = parseInt(y) - clientRect.top - window.pageYOffset - (popoverHeight / 2) - size + verticalCentrePadding;
  } else if (position.bottom) {
    offset.top = parseInt(y) - clientRect.top - window.pageYOffset + size + padding;
  } else if (position.top) {
    offset.top = parseInt(y) - clientRect.top - window.pageYOffset - popoverHeight - size;
  }

  return offset;
};

SocialChartCtrl.prototype.setPopoverCallout = function (position, offset, x, y, popoverWidth) {
  var sc = this;

  //Pick a style (moves the callout arrow)
  sc.popoverPosition = "";

  if (position.centreV) {
    if (position.left) {
      sc.popoverPosition = "left";
    }
    if (position.right) {
      sc.popoverPosition = "right";
    }
  } else {
    if (position.top) {
      sc.popoverPosition = "top";
    }
    if (position.bottom) {
      sc.popoverPosition = "bottom";
    }
  }

  //If contained within a modal, don't adjust popover
  if ($('.modal').length > 0) return;

  //Determine if the callout needs to be moved
  sc.popoverArrowStyle = {};
  if (position.top) {
    if (position.left) {
      sc.popoverArrowStyle = {
        position: 'relative',
        top: '100%',
        width: 0,
        left: popoverWidth - position.left
      };
    } else if (position.right) {
      var menuAdjust = sc.menuVisible ? 220 : 0;
      sc.popoverArrowStyle = {
        position: 'relative',
        right: Math.max((popoverWidth / 2) - x - offset.left - menuAdjust, 0),
        top: '100%'
      };
    }
  }

};

SocialChartCtrl.prototype.updateNodePopoverPosition = function (x, y, size, position) {
  var sc = this;
  var clientRect = sc.getContainer()[0].getElementsByClassName("sigma-wrapper")[0].getBoundingClientRect();
  var popoverWidth = 378;
  var popoverHeight = 200;

  //Set the positions
  var offset = sc.setPopoverOffsets(position, clientRect, x, y, size, popoverWidth, popoverHeight);

  //Determine which style is needed for the callout
  sc.setPopoverCallout(position, offset, x + window.pageXOffset, y + window.pageYOffset, popoverWidth, popoverHeight);

  //reset set the popover accordingly if the chart is contained within a modal, otherwise the popover doesn't take the modal positioning into account
  var modalOffset;
  var topOffset = 0,
    leftOffset = 0;

  //if we have a modal, then get the offset of the sigma container of the chart within that modal
  if ($('.modal').length > 0)
    modalOffset = $('#sigma-container').offset();

  if (modalOffset !== undefined) {
    topOffset = modalOffset.top;
    leftOffset = modalOffset.left;
  }

  if (isNaN(offset.left) === false) {
    sc.nodePopoverStyle.left = offset.left + leftOffset + "px";
  }

  if (isNaN(offset.top) === false) {
    sc.nodePopoverStyle.top = offset.top + topOffset + "px";
  }

};

SocialChartCtrl.prototype.updateEdgePopoverPosition = function (x, y, position) {
  var sc = this;
  var clientRect = sc.getContainer()[0].getElementsByClassName("sigma-wrapper")[0].getBoundingClientRect();
  var popoverWidth = 526;
  var popoverHeight = 200;

  //Set the positions
  var offset = sc.setPopoverOffsets(position, clientRect, x + window.pageXOffset, y + window.pageYOffset, 0, popoverWidth, popoverHeight);

  //Determine which style is needed for the callout
  sc.setPopoverCallout(position, offset, x, y, popoverWidth, popoverHeight);

  if (isNaN(offset.left) === false) {
    sc.edgePopoverStyle.left = offset.left + "px";
  }

  if (isNaN(offset.top) === false) {
    sc.edgePopoverStyle.top = offset.top + "px";
  }

};

SocialChartCtrl.prototype.popoverDirectionFromElement = function (mousePosition) {
  var clientW = (document.documentElement.clientWidth || document.body.clientWidth);
  var clientH = (document.documentElement.clientHeight || document.body.clientHeight);
  var popoverWidth = 526;
  var mX = mousePosition.clientX;
  var mY = mousePosition.clientY;

  var marginX = clientW / 4;
  var marginY = clientH / 4;
  var leftBound = marginX;
  var rightBound = clientW - marginX;
  var bottomBound = clientH - marginY;

  var position = {};

  if (mX - popoverWidth/4 <= leftBound) {
    position.right = mX;
  } else if (mX + popoverWidth/2 >= rightBound) {
    position.left = clientW - mX;
  } else {
    position.centreH = true;
  }
  if (position.right || position.left) {
    position.centreV = true;
  } else if (mY > bottomBound) {
    position.top = true;
  } else {
    position.bottom = true;
  }
  return position;
};

SocialChartCtrl.prototype.leavePopover = function () {
  sigma.misc.drawHovers.clearHover();
};

SocialChartCtrl.prototype.disableHover = function () {
  var sc = this;
  sc.sigmaInstance.settings("disableHover", true);
};

SocialChartCtrl.prototype.enableHover = function () {
  var sc = this;
  sc.sigmaInstance.settings("disableHover", false);
};

SocialChartCtrl.prototype.mouseLeaveUIElement = function () {
  var sc = this;
  sc.mouseOverUI = false;
  sc.enableHover();
};

SocialChartCtrl.prototype.mouseEnterUIElement = function () {
  var sc = this;
  sc.cancelPopover();
  sc.mouseOverUI = true;
  sc.disableHover();
  sc.sigmaInstance.refresh();
};

SocialChartCtrl.prototype.setMenuDisplacement = function (wrapperOffset) {
  var sc = this;
  sc.chartPosition = wrapperOffset;
  sc.menuVisible = !!wrapperOffset.offsetLeft;
  sc.nodeDetailStyle.right = (sc.isFullscreen) ? wrapperOffset.offsetLeft + "px" : 0;
  sc.edgeDetailStyle.right = (sc.isFullscreen) ? wrapperOffset.offsetLeft + "px" : 0;
};

SocialChartCtrl.prototype.setCameraEvent = function () {
  var sc = this;
  //Default zoom level
  sc.sigmaInstance.settings('zoomLevel', 1);

  //Used to return the camera to a position where the graph is acceptably visible
  sc.lastPosition = [0, 0, 1];

  //Once we override the camera position, this flag stops us overriding it again until it has finished moving
  sc.lastPosition.skipZoom = false;

  sc.sigmaInstance.camera.bind("coordinatesUpdated", function (e) {

    //Save the current zoom level for the renderers which require it
    sc.sigmaInstance.settings('zoomLevel', e.target.ratio);

    //Remove the hover popover
    sc.cancelPopover();

    var dimensions = {
      'width': e.target.quadtree._tree.bounds.width,
      'height': e.target.quadtree._tree.bounds.height
    };

    //ensure the minimum number of node labels are added
    sc.showMinimumLabels();

    if (!inBounds(e.target.x, e.target.y, e.target.ratio, dimensions)) {

      if (!sc.lastPosition.skipZoom) {

        //Return the camera to the last acceptable position
        sc.lastPosition.skipZoom = true;
        sc.zoomTo(sc.lastPosition[0], sc.lastPosition[1], sc.lastPosition[2]);

        sc.safeTimeout(function () {
          //After the transition has finished, resume checking for 'out of bounds' positions
          sc.lastPosition.skipZoom = false;
        }, (sc.sigmaInstance.settings('animationsTime') || 300) + 100);
      }

    } else {
      //The camera position was in bounds; so save this as the last known acceptable position
      sc.lastPosition = [e.target.x, e.target.y, e.target.ratio];
    }
  });

  //calculates if the camera position is within a certain margin of the viewport at a given zoom level
  var inBounds = function (x, y, r, dimensions) {
    var containerWidth = dimensions.width * 0.6;
    var containerHeight = dimensions.height * 0.75;
    x = Math.abs(x);
    y = Math.abs(y);
    return (x < containerWidth && y < containerHeight);
  };
};

/*
  Always show a certain number of labels on screen
*/
SocialChartCtrl.prototype.showMinimumLabels = function () {
  var sc = this;

  var camera = sc.sigmaInstance.camera;

  //ensure we actually want to show a certain number of labels and dimensions are available
  if (sc.minLabels === null || sc.minLabels === undefined || !angular.isNumber(sc.minLabels) || camera.quadtree._tree === null) return;

  //Get the width and height of the container
  var dimensions = {
    'width': camera.quadtree._tree.bounds.width,
    'height': camera.quadtree._tree.bounds.height
  };

  sc.sigmaInstance.graph.nodes().forEach(function (n) {
    n.showLabel = false;
  });

  //get all visible nodes in screen
  var nodesOnScreen = camera.quadtree.area(camera.getRectangle(dimensions.width * camera.ratio, dimensions.height * camera.ratio));

  //find nodes with focus if there are any - dont consider just the ones on screen
  var bringToFront = sc.sigmaInstance.graph.nodes().filter(function (node) {
    return node.bringToFront;
  });

  //if any nodes are selected then we only want to label them - otherwise it should be based on size
  var targetNodes = bringToFront.length === 0 ? nodesOnScreen : bringToFront;

  //sort by size - largest first
  var ordered = targetNodes.sort(function (a, b) {
    if (a.size > b.size) return -1;
    if (a.size < b.size) return 1;
    return 0;
  });

  //show all labels
  var labelCount = Math.min(ordered.length, sc.minLabels);

  for (var i = 0; i < labelCount; i++) {
    ordered[i].showLabel = true;
  }

};

/*
This function determines a zoom ratio that will attempt to make
all 1st degree neighbours of the selected node visible
*/
SocialChartCtrl.prototype.getZoomRatio = function (centreNode, neighbours, dimensions) {
  var sc = this;
  var maxDistance = 0;
  var furthestNode = centreNode;

  //Identify the node furthest from the selected
  Object.keys(neighbours).forEach(function (el) {
    el = neighbours[el];
    var distance = sc.getDistance(centreNode, el);

    if (distance > maxDistance) {
      maxDistance = distance;
      furthestNode = el;
    }
  });

  var ratio = maxDistance * 2 / Math.min(dimensions.height, dimensions.width);

  return (ratio < sc.sigmaInstance.settings('zoomMin')) ? sc.sigmaInstance.settings('zoomMin') : ratio;
};

//calculates the distance between two nodes
SocialChartCtrl.prototype.getDistance = function (a, b, propertyPrefix) {
  var sc = this;

  if (!propertyPrefix) {
    if (propertyPrefix !== "") {
      propertyPrefix = sc.getPrefix("camera")();
    }
  }
  var nodeA = {
    x: a[propertyPrefix + 'x'] || a.x,
    y: a[propertyPrefix + 'y'] || a.y
  };
  var nodeB = {
    x: b[propertyPrefix + 'x'] || b.x,
    y: b[propertyPrefix + 'y'] || b.x
  };
  return Math.sqrt(Math.pow(Math.abs(nodeA.x - nodeB.x), 2) + Math.pow(Math.abs(nodeA.y - nodeB.y), 2));
};

SocialChartCtrl.prototype.zoomTo = function (x, y, r, zoomCallback) {
  var sc = this;

  if (sc.selectedNode) {
    sc.selectedNode.rendered = false;
  }

  sc.safeTimeout(function () {
    sigma.misc.animation.camera(
      sc.sigmaInstance.cameras[0], {
        'x': x,
        'y': y,
        ratio: r
      }, {
        duration: sc.sigmaInstance.settings('animationsTime') || 300
      }
    );
    sc.safeTimeout(function () {
        sc.sigmaInstance.refresh();

        if (sc.selectedNode) {
          sc.selectedNode.rendered = true;
        }

        if (zoomCallback) {
          zoomCallback();
        }
        sc.deselectText();
      },
      (sc.sigmaInstance.settings('animationsTime') || 300) + 100
    );
  }, 100);

};

SocialChartCtrl.prototype.top = function () {
  var sc = this;
  sc.cancelPopover();
  sc.clickStage();
};

SocialChartCtrl.prototype.zoomIn = function () {
  var sc = this;
  sc.cancelPopover();
  var zoomDelay = sc.sigmaInstance.settings('zoomingRatio') || 1.7;
  var ratio = sc.sigmaInstance.camera.ratio / zoomDelay;
  sc.zoomTo(sc.sigmaInstance.camera.x,
    sc.sigmaInstance.camera.y,
    (ratio > sc.sigmaInstance.settings('zoomMin')) ? ratio : sc.sigmaInstance.settings('zoomMin')
  );
};

SocialChartCtrl.prototype.zoomOut = function () {
  var sc = this;
  sc.cancelPopover();
  if (sc.sigmaInstance.settings('zoomMax') - sc.sigmaInstance.camera.ratio <= 0.01) return;
  var zoomDelay = sc.sigmaInstance.settings('zoomingRatio') || 1.7;
  var ratio = sc.sigmaInstance.camera.ratio * zoomDelay;
  sc.zoomTo(sc.sigmaInstance.camera.x,
    sc.sigmaInstance.camera.y,
    (ratio < sc.sigmaInstance.settings('zoomMax')) ? ratio : sc.sigmaInstance.settings('zoomMax')
  );
};

SocialChartCtrl.prototype.safeTimeout = function (func, delay) {
  var sc = this;
  //Set a timer
  var timeout = sc.$timeout(decoratedFunc, delay);

  //Record the timer
  sc.timers[timeout.$$timeoutId] = timeout;

  //Return the passthrough result from the timer call
  return timeout;

  //Set timer with wrapper that records when the timeout has executed
  function decoratedFunc() {
    try {
      delete sc.timers[timeout.$$timeoutId];
      return func();
    } catch (e) {
      console.info(e);
    }
  }

};

SocialChartCtrl.prototype.popoverClick = function () {
  var sc = this;

  if (sc.hoveredItem) {

    var id = sc.hoveredItem.id;

    var hoveredPosition = {
      x: sc.hoveredItem.initialPosition.clientX,
      y: sc.hoveredItem.initialPosition.clientY
    };
    var mousePosition = {
      x: sc.mousePosition.clientX,
      y: sc.mousePosition.clientY
    };

    //allow clickthough to the selected item
    //if the popover click occurred on the item itself
    if (id[0] === 'e') {
      var edges = sc.getHoveredEdges(sc.mousePosition);
      if ((edges.length && edges[0].id === id) || (sc.getDistance(mousePosition, hoveredPosition, "") < 13)) {
        (sc.setSelectedEdgeById())(id);
      }
    } else {
      var nodes = sc.getHoveredNodes(sc.mousePosition);
      if ((nodes.length && nodes[0].id === id) || (sc.getDistance(mousePosition, hoveredPosition, "") < 13)) {
        sc.hoveredItem = null;
        (sc.setSelectedNodeById())(id);
      }
    }
  }
};

SocialChartCtrl.prototype.getPrefix = function (prefixStr) {
  var sc = this;
  var renderId = sc.sigmaInstance.renderers[0].conradId;
  var cameraPrefix = sc.sigmaInstance.camera.readPrefix;

  function getRenderPrefix() {
    return prefixStr + renderId + ":";
  }

  function getCameraPrefix() {
    return cameraPrefix;
  }

  return prefixStr === "camera" ? getCameraPrefix : getRenderPrefix;
};

SocialChartCtrl.prototype.closeDetail = function () {
  var sc = this;
  sc.top();
  sc.mouseLeaveUIElement();
};

SocialChartCtrl.prototype.hideCanvas = function () {
  var sc = this;
  sc.getContainer().find("canvas.sigma-edges").hide();
  sc.getContainer().find("canvas.sigma-scene").hide();
  sc.getContainer().find("canvas.sigma-mouse").hide();
};

SocialChartCtrl.prototype.showCanvas = function () {
  var sc = this;
  sc.getContainer().find("canvas.sigma-edges").show();
  sc.getContainer().find("canvas.sigma-scene").show();
  sc.getContainer().find("canvas.sigma-mouse").show();
};

SocialChartCtrl.prototype.deselectText = function () {
  if (window.getSelection) {
    if (window.getSelection().empty) { // Chrome
      window.getSelection().empty();
    } else if (window.getSelection().removeAllRanges) { // Firefox
      window.getSelection().removeAllRanges();
    }
  } else if (document.selection) { // IE?
    document.selection.empty();
  }
};