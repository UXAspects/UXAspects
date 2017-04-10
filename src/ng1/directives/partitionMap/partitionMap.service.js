d3PartitionMap.$inject = ['d3', '$rootScope', '$compile', '$templateRequest', '$timeout'];

export default function d3PartitionMap(d3, $rootScope, $compile, $templateRequest, $timeout) {

  var service = {
    getChart: getChart
  };

  return service;

  function getChart($container, $scope) {
    return new PartitionMap($container, $scope, $rootScope, $compile, $templateRequest, $timeout);
  }
}

//used to maintain scope
var chart;

function PartitionMap($container, $scope, $rootScope, $compile, $templateRequest, $timeout) {
  chart = this;

  //angular
  this.scope = $scope;
  this.rootScope = $rootScope;
  this.compile = $compile;
  this.timeout = $timeout;
  this.templateRequest = $templateRequest;

  // element properties
  this.container = $container;
  this.element = $container[0];
  this.parent = this.element.parentElement;
  this.top = 0;
  this.left = 0;
  this.width = this.element.clientWidth;
  this.height = this.element.clientHeight;
  this.x = d3.scale.linear().range([0, this.width]);
  this.y = d3.scale.linear().range([0, this.height]);
  this.currentDepth = 0;

  //global properties
  this.hoverTimeout = null;
  this.hoverDuration = 650;
  this.hoverLeaveTimeout = null;
  this.hoverLeaveDuration = 250;
  this.isDrawing = false;
  this.isAnimating = false;
  this.isRedrawing = false;
  this.isTransitioning = false;
  this.hoveredElement = null;
  this.noData = true;
  this.calloutVisible = true;

  this.mouseX = 0;
  this.mouseY = 0;

  //find maximize container if one exists
  var container = document.getElementsByClassName("partition-container");
  this.maximizedContainer = container.length !== 0 ? container[0] : null;
  this.isMaximized = false;
  this.allowMaximize = this.maximizedContainer !== null;
  this.scrollLocationX = 0;
  this.scrollLocationY = 0;
  this.hasDrawn = false;
  this.calloutTimout = null;
  this.popoverShowTimeout = null;

  //popover
  this.popoverVisible = false;
  this.popoverElement = null;
  this.popoverItem = null;
  this.popoverTemplate = null;

  //docked popover
  this.dockedPopover = null;
  this.dockedUserContent = null;
  this.dockedPopoverItem = null;
  this.selectedItem = null;

  //check if partition map is inside a modal
  var modalParent = angular.element(this.parent).parents('.modal-content');
  this.modalChart = modalParent.length === 1;

  this.rootColor = '#7b63a3';
  //colors
  this.colors = [
    ['#635387', '#3baa43', '#025662', '#b08f5c', '#cccccc', '#355387', '#724f5d', '#6b7559', '#4a4066', '#308935', '#023e42', '#91744d', '#999999', '#294266', '#563b46', '#515843'],
    ['#1c899a', '#18a6df', '#98c972', '#839de8', '#839b9d', '#126aa5', '#77c0d1', '#605e89', '#7fa4bb', '#60798d', '#2fbea3', '#10777f', '#9fc6ee', '#7f7fd7', '#74a265', '#c7e0b4'],
    ['#e7a263', '#ecd491', '#97579a', '#c19fd3', '#989856', '#c7cc87', '#d775a4', '#cabfbd', '#9d8583', '#e5a3c7', '#e57b76', '#e0b852', '#b17f77', '#eebcba', '#d58853', '#d0c655'],
    ['#7fa4bb', '#60798d', '#2fbea3', '#10777f', '#9fc6ee', '#7f7fd7', '#74a265', '#c7e0b4', '#1c899a', '#18a6df', '#98c972', '#839de8', '#839b9d', '#126aa5', '#77c0d1', '#605e89'],
  ];

  this.usedColors = [];

  //editing
  this.editMode = false;
  this.groups = [];

  //editor options
  this.editorEnabled = false;
  this.finishText = 'Done';
  this.noGroupsText = 'No groups available';
  this.availableGroups = [];
  this.maxRows = 3;
  this.minRows = 0;
  this.onFinish = null;

  //options
  this.edit = null;
  this.onSelect = null;
  this.popoverEnabled = true;
  this.valueFormatter = function (v) {
    return v;
  };
  this.noDataLabel = null;
  this.isLoading = false;

  //maximize/minimize button
  this.buttonOffset = null;
  this.toggleButton = this.parent.getElementsByClassName('partition-expand')[0];
  this.toggleButtonDefault = {
    minimize: {
      x: -20,
      y: -20
    },
    maximize: {
      x: 25,
      y: -20
    }
  };

  //data
  this.data = null;
  this.originalData = null;
  this.childList = [];
  this.dockedChildList = [];

  //offset
  this.previousLeftOffset = 0;
  this.previousTopOffset = 0;

  // document width (allows monitoring of width without resizing, i.e. appearance of scrollbars)
  this.previousDocumentWidth = 0;

  //bindings
  window.addEventListener("resize", this.redraw);
  document.addEventListener("mousemove", this.checkPopover);
  document.addEventListener('mousedown', this.handleWheelClick, false);

  //this is required because other elements can change on screen eg. side bar and the chart will not get resized even though it should
  this.resizeInterval = setInterval(function () {
    if (chart.isMaximized && chart.maximizeOptions.shouldResize === true) {
      if (chart.maximizedContainer.offsetLeft !== chart.previousLeftOffset ||
        chart.maximizedContainer.offsetTop !== chart.previousTopOffset ||
        chart.element.offsetWidth !== chart.width ||
        document.documentElement.clientWidth !== chart.previousDocumentWidth) {
        chart.redraw();
      }
    } else {
      if (chart.element.offsetWidth !== chart.width) chart.redraw();
    }
  }, 200);
}

// store any settings we are given
PartitionMap.prototype.init = function (options) {
  this.edit = options.edit;
  this.onSelect = options.select;
  this.popoverEnabled = options.popoverEnabled !== null && options.popoverEnabled !== undefined ? options.popoverEnabled : true;
  this.noDataLabel = options.noDataLabel !== null ? options.noDataLabel : 'No data to display';
  this.loadingLabel = options.loadingLabel !== null ? options.loadingLabel : 'Loading';
  this.buttonOffset = options.buttonOffset ? options.buttonOffset : {
    minimize: {
      x: 0,
      y: 0
    },
    maximize: {
      x: 0,
      y: 0
    }
  };
  this.hoverDuration = options.popoverDelay ? options.popoverDelay : 650;

  //editor options
  if (options.edit && options.edit.editor) {
    this.editorEnabled = this.valueOrDefault(options.edit.editor.enabled, false);
    this.finishText = this.valueOrDefault(options.edit.editor.finishText, 'Done');
    this.noGroupsText = this.valueOrDefault(options.edit.editor.noGroupsText, 'No groups available');
    this.availableGroups = this.valueOrDefault(options.edit.editor.availableGroups, []);
    this.maxRows = this.valueOrDefault(options.edit.editor.maxRows, 3);
    this.minRows = this.valueOrDefault(options.edit.editor.minRows, 0);
    this.onFinish = this.valueOrDefault(options.edit.editor.onFinish, null);

    //ensure max rows is 3 or less
    if (this.maxRows < 0) {
      console.log('Partition Map - Max rows must be a positive number');
      this.maxRows = 3;
    }
    if (this.maxRows > 3) {
      console.log('Partition Map - Maximimum number of rows is 3');
      this.maxRows = 3;
    }
  }

  if (options.valueFormatter)
    this.valueFormatter = options.valueFormatter;

  //get docked popover container
  this.dockedPopover = this.parent.getElementsByClassName('partition-docked-popover')[0];
  this.dockedUserContent = this.dockedPopover.getElementsByClassName('user-content')[0];

  //if a template has been specified then load the template
  if (options.popoverTemplate) {

    chart.templatePromise = chart.templateRequest(options.popoverTemplate);
    //after request set data
    chart.templatePromise.then(function (template) {
      chart.popoverTemplate = template;
    });
  } else {
    this.popoverEnabled = false;
  }

  //set up maximize options
  if (options.maximize) {
    this.maximizeOptions = {
      disableScrolling: this.valueOrDefault(options.maximize.disableScrolling, false),
      buttonVisible: this.valueOrDefault(options.maximize.buttonVisible, true),
      isMaximized: this.valueOrDefault(options.maximize.isMaximized, false),
      fillScreen: this.valueOrDefault(options.maximize.fillScreen, false),
      onToggle: this.valueOrDefault(options.maximize.onToggle, null),
      sidePanelWidth: this.valueOrDefault(options.maximize.sidePanelWidth, 235),
      shouldResize: this.valueOrDefault(options.maximize.shouldResize, true)
    };
  } else {
    this.maximizeOptions = {
      disableScrolling: false,
      buttonVisible: true,
      isMaximized: false,
      fillScreen: false,
      onToggle: null,
      sidePanelWidth: 235,
      shouldResize: true
    };
  }

  this.processOptions();

  //position toggle button
  this.positionToggleButton();

  return chart;
};

PartitionMap.prototype.processOptions = function () {
  //process the maximize options

  //allow maximize might already be disabled if no container was specified - take this into account
  chart.allowMaximize = chart.allowMaximize && chart.maximizeOptions.buttonVisible || chart.maximizeOptions.buttonVisible && chart.maximizeOptions.shouldResize === false;
};

// when the object is no longer on screen we should remove any bindings
PartitionMap.prototype.destroy = function () {

  //stop partition sizing interval
  clearInterval(chart.resizeInterval);

  //clear any timeouts - prevents errors when leaving the page
  clearTimeout(chart.hoverTimeout);
  clearTimeout(chart.hoverLeaveTimeout);
  clearTimeout(chart.calloutTimout);
  clearTimeout(chart.popoverShowTimeout);

  //ensure we enable scrollbars if they have been disabled
  if (chart.isMaximized) {
    document.getElementsByTagName("html")[0].style.overflow = '';
  }

  window.removeEventListener("resize", this.redraw);
  document.removeEventListener("mousemove", this.checkPopover);
  document.removeEventListener("mousedown", this.handleWheelClick);
};

PartitionMap.prototype.updateData = function (data) {
  chart.originalData = null;
  chart.usedColors = [];

  //reset the data in popover
  chart.popoverItem = null;
  chart.selectedItem = null;
  chart.currentDepth = 0;

  chart.redraw(data, function () {
    //reset selected segment to root node once redraw has completed
    if (chart.segments.length > 0) {
      var rootData = d3.select(chart.segments[0][0]).data()[0];
      if (rootData) chart.selectSegment(rootData);
    }
  });
};

// Draw our chart
PartitionMap.prototype.draw = function (data) {
  if (!chart.originalData) {
    chart.originalData = data;
    chart.data = chart.processData(data);
  }

  //if we have no data then dont draw anything
  if (chart.noData) return;

  chart.isDrawing = true;

  //create our svg object to draw in
  var partitionMap = d3.select(chart.element).append("svg:svg")
    .attr("width", chart.width)
    .attr("height", chart.height);

  // create our partition layout
  var partition = d3.layout.partition()
    .children(function (data) {
      return isNaN(data.value) ? d3.entries(data.value) : null;
    })
    .value(function (data) {
      return data.value;
    });

  // create a graphics grouping for each node in the JSON
  var g = partitionMap.selectAll("g")
    .data(partition(d3.entries(chart.data)[0]))
    .enter().append("svg:g");

  //for each node draw a rectangle and fill it will a color matching its key
  chart.segments = g.append("svg:rect")
    .attr('stroke', '#000')
    .attr('stroke-width', '0.5')
    .attr('stroke-opacity', '0.2')
    .attr("x", function (data) {
      return chart.x(chart.calculateX(data));
    })
    .attr("y", function (data) {
      return chart.y(data.y);
    })
    .attr("width", function (data) {
      return chart.x(chart.calculateWidth(data));
    })
    .attr("height", function (data) {
      return chart.y(data.dy);
    })
    .attr("fill", function (data) {
      if (data.key === '__zero__') {
        data.color = '#ffffff';
        return data.color;
      }
      data.color = chart.segmentColor(data);
      return data.color;
    })
    .on("click", chart.selectSegment)
    .on('mouseover', chart.onSegmentHover)
    .on('mouseout', chart.onSegmentLeave);

  //add text to each grouping with the text to be displayed on each rectangle
  chart.segmentLabels = g.append("svg:text")
    .style('fill', 'white')
    .style('font-family', 'Source Sans Pro')
    .style('opacity', '1')
    .style("text-anchor", "middle")
    .style("cursor", "default")
    .append('tspan').text(function (data) {
      return data.key;
    }).each(chart.wrap)
    .attr("x", function (data) {
      return chart.x(chart.calculateX(data)) + chart.x(chart.calculateWidth(data) / 2);
    })
    .attr("y", function (data) {

      var detailedData = chart.getDetailedDataFromData(data);

      //if there is no icon then center the label vertically
      if (!detailedData.image) {
        var labelHeight = this.getBoundingClientRect().height;
        return chart.y(data.y) + (chart.y(data.dy) / 2) + (labelHeight / 2) - 5;
      }

      return chart.y(data.y) + ((chart.y(data.dy) / 12) * 8);
    })
    .attr("width", function (data) {
      return chart.x(chart.calculateWidth(data));
    })
    .attr("height", function (data) {
      return chart.y(data.dy);
    })
    .attr('opacity', function (data) {
      return chart.x(chart.calculateWidth(data)) <= 10 || chart.y(data.dy) < 25 ? 0 : 1;
    });


  chart.segmentImages = g.append("svg:image")
    .attr('xlink:href', function (data) {
      var detailedData = chart.getDetailedDataFromData(data);
      return detailedData.image ? detailedData.image : "";
    })
    .attr("preserveAspectRatio", "xMidYMax meet")
    .attr("x", function (data) {
      return (chart.x(chart.calculateX(data)) + chart.x(chart.calculateWidth(data) / 2)) - 10;
    })
    .attr("y", function (data) {
      return chart.y(data.y) + (((chart.y(data.dy) / 12)) * 8) - 45;
    })
    .attr("width", 20)
    .attr("height", 20)
    .attr("opacity", function (data) {
      var detailedData = chart.getDetailedDataFromData(data);
      if (!detailedData.image) return 0;

      var chartYPos = chart.y(data.y) + 10;
      var iconYPos = chart.y(data.y) + (((chart.y(data.dy) / 12)) * 8) - 45;
      return iconYPos < chartYPos ? 0 : 1;
    });

  //we we have an edit action specified then add it to the chart
  if (chart.edit) {
    var rootGroup = g[0][0];

    chart.editBlock = d3.select(rootGroup).append("svg:rect")
      .style('opacity', '0.2')
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 64)
      .attr("height", function (data) {
        return chart.y(data.dy);
      })
      .on("click", function (data) {
        //if the root is selected and we have an edit action then perform it
        if (data.depth >= chart.currentDepth && chart.edit.click) {
          //perform edit action
          chart.edit.click(chart.getDetailedDataFromData(data));

          //show edit container and allow editing
          if (chart.editorEnabled) chart.beginEditing();

        } else if (data.depth < chart.currentDepth) {
          //if we are on a lower depth then propagate the click action
          chart.selectSegment(data, 0);
        }
      })
      .on("mouseover", function (data) {
        //only perform these functions if root node is selected
        if (data.depth >= chart.currentDepth) {
          d3.select(this)
            .style('opacity', '0.3')
            .style('cursor', 'pointer');
          chart.hidePopover();
        }
      })
      .on("mouseout", function (data) {
        //only perform this if the root node is selected
        if (data.depth >= chart.currentDepth) {
          d3.select(this)
            .style('opacity', '0.2')
            .style('cursor', 'default');
        }
      });

    chart.editText = d3.select(rootGroup).append("svg:text")
      .style('fill', 'white')
      .style('font-family', '"Source Sans Pro"')
      .style('opacity', '1')
      .style("text-anchor", "middle")
      .style("cursor", "default")
      .attr("x", 32)
      .attr("y", function (data) {
        return (chart.y(data.dy) / 12) * 8;
      })
      .attr("width", 32)
      .text(chart.edit.text)
      .each(chart.wrapEditText);

    chart.editImage = d3.select(rootGroup).append("svg:image")
      .attr('xlink:href', chart.edit.image)
      .attr("preserveAspectRatio", "xMidYMax meet")
      .attr("x", 0)
      .attr("y", function (data) {
        return ((chart.y(data.dy) / 12) * 8) - 40;
      })
      .attr("width", 64)
      .attr("height", 15)
      .attr("opacity", function (data) {
        if (!chart.edit || !chart.edit.image) return 0;
        var chartYPos = chart.y(data.y) + 15;
        var iconYPos = chart.y(data.y) + (((chart.y(data.dy) / 12)) * 8) - 40;
        return iconYPos < chartYPos ? 0 : 1;
      });
  }

  //once drawn we should call the select function giving them the root element
  if (chart.onSelect) {
    var segmentElement = d3.select(chart.element).selectAll("g")[0][0];
    var selectData = chart.getDetailedDataFromData(data);

    if (Object.prototype.toString.call(selectData) === '[object Array]' && selectData.length > 0) {
      selectData = selectData[0];
    }

    selectData.parents = chart.getParentsData(data);
    chart.onSelect(selectData, segmentElement);
  }

  //calculate the max depth
  var maxDepth = chart.calculateDepth(chart.getSegmentData(0));

  //get callout
  var callout = document.getElementsByClassName('callout')[0];

  if (callout) {
    //if there are going to be more than 4 rows then we need to hide the callout as it will cause alignment troubles
    chart.calloutVisible = maxDepth <= 3 && chart.height / (maxDepth + 1) >= 145;
    callout.style.display = chart.calloutVisible ? 'block' : 'none';
    callout.style.borderLeftColor = chart.rootColor;

  }

  //after the chart has first been rendered we need to take into account some settings that couldnt be processed before rendering
  if (!chart.hasDrawn) {

    if (chart.maximizeOptions.isMaximized) {
      chart.maximize();
    }

    //give page a chance to render
    setTimeout(function () {
      chart.selectedItem = chart.getSegmentData(0);

      // the template may not have loaded yet - perform update when it has
      if (!chart.popoverTemplate && chart.templatePromise) {
        chart.templatePromise.then(function () {
          chart.updateDockedPopover(chart.selectedItem);
        });
      } else {
        //we also want to re-render the user content in the docked popover
        chart.updateDockedPopover(chart.selectedItem);
      }

      //required to update docked popover list
      chart.apply();

      chart.hasDrawn = true;
    }, 1);
  }

  setTimeout(function () {
    chart.isTransitioning = false;
    chart.isDrawing = false;
  }, 1);

  return chart;
};

PartitionMap.prototype.beginEditing = function () {
  var chart = this;

  //get the group names to display
  chart.groups = chart.getGroupNames();
  // chart.groups = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];
  chart.editMode = true;

  chart.apply();

};

PartitionMap.prototype.getGroupNames = function () {
  var chart = this;

  //get data and root node
  var data = chart.originalData;
  var rootNode = data.length > 0 ? data[0] : null;

  //if there is no data return empty array
  if (!rootNode) return [];

  //initial data
  var nodeGroups = [];

  //level count
  var maxLevel = 0;

  //traverse nodes storing group names
  var nodeTraverse = function (node, level) {

    //if there is no node then we cannot do anything
    if (!node) return;

    //if level is higher than known max level then store
    if (level > maxLevel) maxLevel = level;

    //if there is a group name, store it along with the level
    if (node.groupName) {
      nodeGroups.push({
        groupName: node.groupName,
        level: level
      });
    }

    //if there are children then traverse!
    if (node.children)
      for (var i = 0; i < node.children.length; i++) nodeTraverse(node.children[i], level + 1);
  };

  //traverse the nodes
  nodeTraverse(rootNode, 0);

  //if no groups return
  if (maxLevel === 0) return [];

  //actual groups
  var groups = [];

  //consolodate all the duplicates
  for (var lvl = 0; lvl <= maxLevel; lvl++) {

    //store any found group
    var group = null;

    for (var i = 0; i < nodeGroups.length; i++) {

      //get node group information
      var level = nodeGroups[i].level;

      //try and find the corresponding group
      if (level === lvl) {
        group = nodeGroups[i].groupName;
        break;
      }
    }

    //if we have a group then push otherwise we must stop!
    if (group !== null) groups.push(group);
    else break;
  }

  return groups;
};

// when a rectangle is clicked we want to start zoom in or out animation
PartitionMap.prototype.selectSegment = function (data, elementIndex, popoverAction) {
  //if user has specified a select function call it!
  if (chart.onSelect) {
    var segmentElement = d3.select(chart.element).selectAll("g")[0][elementIndex];
    var selectData = chart.getDetailedDataFromData(data);
    selectData.parents = chart.getParentsData(data);
    chart.onSelect(selectData, segmentElement);
  }

  //set our initial hovered element
  chart.hoveredElement = elementIndex;

  //hide any popovers
  chart.hidePopover();

  //if we click on the selected node again - bring us back up to its parent if possible
  //popover action will only be true when selecting child from popover - if this is the case dont perform this action
  if (!popoverAction && data.depth === chart.currentDepth && data.parent && !chart.isRedrawing) {

    //ensure the node clicked is the same node as the current one
    if (chart.selectedItem.key === data.key && chart.selectedItem.x === data.x) {

      //calculate parent element index
      var parentIndex = chart.getElementIndex(data.parent);

      //simulate parent click event
      chart.selectSegment(data.parent, parentIndex);
      return;
    }
  }

  //if selected item is zero or has no value then do nothing
  if (data.key === '__zero__' || data.value === 0) return;

  var selectedData = data;

  var collapsedRowHeight = function () {
    return 35;
  };

  var newDepth = data.depth;
  var topOffset = data.y ? collapsedRowHeight() * data.depth : 0;

  //set our new ranges
  chart.x.domain([chart.calculateX(data), chart.calculateX(data) + chart.calculateWidth(data)]);
  chart.y.domain([data.y, 1]).range([topOffset, chart.height]);

  //calculate animation durations
  var animationDuration = chart.isRedrawing ? 0 : 500;

  // begin transition of rectangles
  chart.segments.transition()
    .duration(animationDuration)
    .attr("x", function (data) {
      return chart.x(chart.calculateX(data));
    })
    .attr("y", function (data) {
      if (data.depth < newDepth) {
        return data.depth * collapsedRowHeight();
      }
      return chart.y(data.y);
    })
    .attr("width", function (data) {
      return chart.x(chart.calculateX(data) + chart.calculateWidth(data)) - chart.x(chart.calculateX(data));
    })
    .attr("height", function (data) {
      if (data.depth < newDepth) {
        return collapsedRowHeight();
      }
      return chart.y(data.y + data.dy) - chart.y(data.y);
    })
    .each('start', function () {
      chart.isAnimating = true;
      clearTimeout(chart.hoverTimeout);
    })
    .each('end', function () {
      if (chart.isAnimating) {
        chart.isAnimating = false;
        chart.onSegmentHover(null, null);
      }
    });

  //begin transition of text - then recalculate ellipsis
  chart.segmentLabels.transition()
    .duration(animationDuration)
    .attr("x", function (data) {
      if (data.depth < newDepth) {
        if (chart.isParentOf(data, selectedData)) {
          return chart.x(chart.calculateX(selectedData)) + ((chart.x(chart.calculateX(selectedData) + chart.calculateWidth(selectedData)) - chart.x(chart.calculateX(selectedData))) / 2);
        }
      }

      return chart.x(chart.calculateX(data)) + ((chart.x(chart.calculateX(data) + chart.calculateWidth(data)) - chart.x(chart.calculateX(data))) / 2);
    })
    .attr("y", function (data) {
      if (data.depth < newDepth) {
        return (data.depth * collapsedRowHeight()) + ((collapsedRowHeight() / 2) + 5);
      }
      var topOffset = chart.y(data.y);
      var height = chart.y(data.y + data.dy) - chart.y(data.y);

      var detailedData = chart.getDetailedDataFromData(data);

      //if there is no icon then center the label vertically
      if (!detailedData.image) {
        var labelHeight = this.getBoundingClientRect().height;
        return topOffset + (height / 2) + (labelHeight / 2) - 5;
      }

      //otherwise positition it 2/3 down
      return topOffset + ((height / 12) * 8);
    })
    .attr("width", function (data) {
      return chart.x(chart.calculateX(data) + chart.calculateWidth(data)) - chart.x(chart.calculateX(data));
    })
    .attr('opacity', function (data) {
      var width = chart.x(chart.calculateX(data) + chart.calculateWidth(data)) - chart.x(chart.calculateX(data));
      var height = data.depth < newDepth ? collapsedRowHeight() : chart.y(data.y + data.dy) - chart.y(data.y);
      return width <= 10 || height < 25 ? 0 : 1;
    })
    .each(newDepth < chart.currentDepth ? 'start' : 'end', chart.wrap);

  //begin transition of images
  chart.segmentImages.transition()
    .duration(animationDuration)
    .attr("x", function (data) {
      if (data.depth < newDepth && chart.isParentOf(data, selectedData)) {
        return chart.x(chart.calculateX(selectedData)) + ((chart.x(chart.calculateX(selectedData) + chart.calculateWidth(selectedData)) - chart.x(chart.calculateX(selectedData))) / 2) - 10;
      }
      return (chart.x(chart.calculateX(data)) + ((chart.x(chart.calculateX(data) + chart.calculateWidth(data)) - chart.x(chart.calculateX(data))) / 2)) - 10;
    })
    .attr("y", function (data) {
      if (data.depth < newDepth) {
        return (collapsedRowHeight() / 2) - 45;
      }
      return (chart.y(data.y) + ((((chart.y(data.y + data.dy) - chart.y(data.y))) / 12) * 8)) - 45;
    })
    .attr("opacity", function (data) {

      var detailedData = chart.getDetailedDataFromData(data);
      if (!detailedData.image) return 0;

      if (data.depth < newDepth) return 0;

      //if icon is too large for its segment - fade out
      var chartYPos = chart.y(data.y) + 10;
      var iconYPos = (chart.y(data.y) + ((((chart.y(data.y + data.dy) - chart.y(data.y))) / 12) * 8)) - 45;

      return (iconYPos < chartYPos) ? 0 : 1;
    });

  //if chart had edit region then we need to animate it
  if (chart.edit) {

    chart.editBlock.transition()
      .duration(animationDuration)
      .style("opacity", function (data) {
        return data.depth < newDepth ? 0 : 0.2;
      })
      .attr("x", function () {
        return 0;
      })
      .attr("y", function (data) {
        return data.depth < newDepth ? 0 : chart.y(data.y);
      })
      .attr("width", function () {
        return 64;
      })
      .attr("height", function (data) {
        if (data.depth < newDepth) return collapsedRowHeight();

        return chart.y(data.y + data.dy) - chart.y(data.y);
      })
      .each('start', function (data) {
        if (data.depth >= newDepth) this.style.display = "block";
      })
      .each('end', function (data) {
        if (data.depth < newDepth) this.style.display = "none";
      });

    chart.editText.transition()
      .duration(animationDuration)
      .style("opacity", function (data) {
        return data.depth < newDepth ? 0 : 1;
      })
      .attr("x", function () {
        return 32;
      })
      .attr("y", function (data) {
        if (data.depth < newDepth) {
          return (collapsedRowHeight() / 2) + 7;
        }
        return chart.y(data.y) + ((((chart.y(data.y + data.dy) - chart.y(data.y))) / 12) * 8);
      })
      .attr("width", function () {
        return 32;
      });

    chart.editImage.transition()
      .duration(animationDuration)
      .attr("x", function () {
        return 0;
      })
      .attr("y", function (data) {
        if (data.depth < newDepth) {
          return -20;
        }
        return (chart.y(data.y) + ((((chart.y(data.y + data.dy) - chart.y(data.y))) / 12) * 8)) - 40;
      })
      .attr("width", function () {
        return 64;
      })
      .attr("opacity", function (data) {
        //if no icon specified then hide - should prevent IE 9 issue
        if (!chart.edit || !chart.edit.image) return 0;

        if (data.depth < newDepth) return 0;

        //if icon is too large for its segment - fade out
        var chartYPos = chart.y(data.y) + 15;
        var iconYPos = (chart.y(data.y) + ((((chart.y(data.y + data.dy) - chart.y(data.y))) / 12) * 8)) - 40;
        return iconYPos < chartYPos ? 0 : 1;
      });
  }

  //only do this if callout is visible
  if (chart.calloutVisible) {
    //update callout color
    var callout = document.getElementsByClassName('callout')[0];

    //timeout will depend on whether or not we are moving to a higher or lower segment
    var colorTimeout = chart.isRedrawing ? 0 : (newDepth < chart.currentDepth ? (newDepth === 0 ? 198 : 145) : 280);

    //timeout require to give the illusion of changing color with the chart transition
    chart.calloutTimout = setTimeout(function () {

      //ensure callout exists before trying to style it
      if (!callout) return;

      //set color correctly
      callout.style.borderLeftColor = data.color;
    }, colorTimeout);
  }

  chart.currentDepth = newDepth;

  //if the selected segment is the current one then dont need to do anything more
  //comparing the two objects does not always work however position properties will be unique
  if (chart.selectedItem && chart.selectedItem.key === data.key && chart.selectedItem.x === data.x && chart.selectedItem.y === data.y) return;

  //store the clicked item
  chart.selectedItem = data;

  //if maximized we want to update the child list
  if (chart.isMaximized) {

    chart.childList = chart.getChildren(data);

    //we also want to re-render the user content in the docked popover
    chart.updateDockedPopover(data);

    //required to update docked popover list
    chart.apply();
  }
};

PartitionMap.prototype.onSegmentHover = function (data, elementIndex) {

  //if the hovered element changes while we are animating record the new highlighted segment
  //but dont do anything until animation is finished
  if (chart.isAnimating) {
    chart.hoveredElement = elementIndex;
    return;
  }

  //if an element has been specified then it was trigged by the hover event
  //otherwise we have finished animating and my want to retrigger the event manually
  var targetElement = elementIndex !== null ? elementIndex : chart.hoveredElement;

  //if we have no target element then we can stop here
  if (targetElement === null) return;

  //if this was triggered by the finished animation and we have an element then we should fetch its data
  if (data === null) {
    data = chart.getSegmentData(targetElement);
  }

  chart.hoverTimeout = setTimeout(function () {

    //ensure the we still have values
    if (data === null || data === undefined || targetElement === null || targetElement === undefined) return;

    //get the corresponding text element
    chart.popoverElement = targetElement;
    chart.selectItem(data, targetElement);

    //if data is a zero item dont show the popover
    if (data.value === 0) return;

    //we do not want to show the popover if chart is maximized and the details of the segment are in the docked panel
    if (chart.isMaximized && chart.segmentsEqual(chart.dockedPopoverItem, data)) return;

    //position and show the popover
    chart.showPopover();

  }, chart.hoverDuration);
};

PartitionMap.prototype.onSegmentLeave = function () {
  chart.hoveredElement = null;
  clearTimeout(chart.hoverTimeout);
};

//IE doesnt support foreignObjects so we must use svg text which doesnt support CSS - therefore no ellipsis
//we must calculate the width of the text and see if it will fit comfortably within its bounds, if not add '...'
PartitionMap.prototype.wrap = function (data) {

  var x = chart.x(data.x);
  var width = chart.x(data.x + data.dx) - x;

  var self = d3.select(this);

  //reset text to original to calculate correct width
  self.text(data.key);

  //we should check if the segment is on screen before doing anything
  if (x < 0 || x > chart.width) return;

  //performance - if width is less than 55 px, ellipsis!!
  if (width < 55) {
    self.text('...');
    return;
  }

  //each character has an approx width of 7px - but we will assume 10 to be sure
  //if approx text width will fit then we dont need to clip
  if ((data.key.length * 10) < (width - 40)) {
    self.text(data.key);
    return;
  }

  //required because if element isnt in visible DOM IE will throw and error - animations wont work
  if (!chart.element.contains(self.node())) return;

  var textLength = self.node().getComputedTextLength();

  var text = data.key;

  while (textLength > (width - (2 * 20)) && text.length > 0) {
    text = text.slice(0, -1);
    self.text(text + '...');
    textLength = self.node().getComputedTextLength();
  }
};

PartitionMap.prototype.wrapEditText = function () {

  var self = d3.select(this);

  //get edit text
  var text = chart.edit && chart.edit.text ? chart.edit.text : "";

  //reset text to original to calculate correct width
  self.text(text);

  //if there is not text we dont need to do anything
  if (text === "") return;

  //required because if element isnt in visible DOM IE will throw and error - animations wont work
  if (!chart.element.contains(self.node())) return;

  try {

    var textLength = self.node().getComputedTextLength();

    while (textLength > 42 && text.length > 0) {
      text = text.slice(0, -1);
      self.text(text + '...');
      textLength = self.node().getComputedTextLength();
    }
  } catch(err) {}

};

//if a color has been used before for a specific key then use it, otherwise pick the next available one
PartitionMap.prototype.segmentColor = function (data) {

  //if a color was specified for the item by the user then use it instead
  var originalData = chart.getDetailedDataFromData(data);
  if (originalData.color) {
    return originalData.color;
  }

  var key = data.key;

  //root node will always be this color
  if (data.depth === 0) return chart.rootColor;

  var selectedPalette = (data.depth <= 4) ? data.depth - 1 : ((data.depth - 2) % 3) + 1;

  for (var i = 0; i < chart.usedColors.length; i++) {
    if (chart.usedColors[i].name === key && chart.usedColors[i].depth === data.depth) {
      return chart.usedColors[i].color;
    }
  }


  //sort the order of items in the row
  var allSiblings = chart.getAllSegmentSiblings(data);

  //group by parent and sort each group
  var groups = {};

  allSiblings.forEach(function (element, index) {
    var parent = element.parent.key + index;

    if (!groups[parent]) groups[parent] = [];
    groups[parent].push(element);
  });


  var siblings = [];

  var siblingContains = function (data) {
    for (var i = 0; i < siblings.length; i++) {
      if (siblings[i].key === data.key) return true;
    }
    return false;
  };

  //now sort each group
  for (var group in groups) {
    var currentGroup = groups[group];

    currentGroup.sort(function (a, b) {
      if (a.value < b.value) return 1;
      if (a.value > b.value) return -1;
      return 0;
    });

    for (var j = 0; j < currentGroup.length; j++) {
      var segment = currentGroup[j];

      if (!siblingContains(segment)) siblings.push(segment);
    }
  }

  var offset = -1;

  siblings.forEach(function (element, index) {
    if (element.key === data.key) offset = index;
  });

  if (offset >= chart.colors[selectedPalette].length) offset = offset % chart.colors[selectedPalette].length;

  var color = chart.colors[selectedPalette][offset];
  chart.usedColors.push({
    name: key,
    color: color,
    depth: data.depth
  });
  return color;
};

/*
  Find all segments at the same depth
*/
PartitionMap.prototype.getAllSegmentSiblings = function (data) {
  var depth = data.depth;

  //we need to find the root node
  var rootNode = data;
  while (rootNode.parent) rootNode = rootNode.parent;

  //iterate through all child nodes and find all segments at the target depth
  var segments = [];

  var checkDepth = function (node) {
    if (node.depth === depth) {
      segments.push(node);
      return;
    }

    //if not correct depth but has children then check them
    if (node.children && node.children.length > 0) {
      for (var i = 0; i < node.children.length; i++) checkDepth(node.children[i]);
    }
  };

  //begin recursive check - starting with root node
  checkDepth(rootNode);

  return segments;
};

PartitionMap.prototype.getSegmentData = function (index) {
  return d3.select(chart.segments[0][index]).data()[0];
};

PartitionMap.prototype.getElementIndex = function (data) {
  for (var i = 0; i < chart.segments[0].length; i++) {
    //get data of element
    var elementData = d3.select(chart.segments[0][i]).data()[0];

    //compare datas
    if (elementData.key === data.key && elementData.x === data.x && elementData.y === data.y) return i;
  }
  return 0;
};

PartitionMap.prototype.toggleMaximized = function () {
  if (chart.isMaximized) chart.minimize();
  else chart.maximize();
};

PartitionMap.prototype.disableMaximize = function () {
  chart.allowMaximize = false;
};

//perform actions to maximize partition
PartitionMap.prototype.maximize = function () {

  if (chart.isMaximized) return;

  chart.isMaximized = true;

  //if we have a toggle action then call it here in case we should prevent any more action
  if (chart.maximizeOptions.onToggle) {
    var stopPropagation = chart.maximizeOptions.onToggle(true);
    if (stopPropagation === true) return;
  }

  if (!this.maximizeOptions.shouldResize) {
    chart.element.className = "partition-map maximized";
    chart.dockedPopover.style.display = "inline-block";
    chart.redraw();
    chart.adjustPopoverDisplay();
    return;
  }

  if (!chart.maximizedContainer) {
    throw new Error('Page requires a "partition-container" if you wish to maximize partition chart');
  }

  chart.isTransitioning = true;

  //hide scrollbars
  if (chart.maximizeOptions.disableScrolling)
    document.getElementsByTagName("html")[0].style.overflow = 'hidden';

  //add the maximized class in here as we need the layout to update before angular does its stuff - reduce flickering
  chart.element.className = "partition-map maximized";

  //show the docked popover
  chart.dockedPopover.style.display = "inline-block";

  //if no item has ever been selected we should select the root node
  if (!chart.selectedItem) {
    chart.selectedItem = chart.getSegmentData(0);
  }

  //update the child list with the children of the selected item
  chart.childList = chart.getChildren(chart.selectedItem);

  //also lets update the user content
  chart.updateDockedPopover(chart.selectedItem);

  //redraw chart
  chart.redraw();

  //Set the side panel to the correct width
  chart.adjustPopoverDisplay();
};

PartitionMap.prototype.adjustPopoverDisplay = function () {
  //Set the side panel to the correct width
  chart.dockedPopover.style.width = this.maximizeOptions.sidePanelWidth + 'px';
  chart.element.style.width = 'calc(100% - ' + this.maximizeOptions.sidePanelWidth + 'px)';
};

//perform actions to minimize partition
PartitionMap.prototype.minimize = function () {
  if (!chart.isMaximized) return;

  chart.isMaximized = false;

  //if we have a toggle action then call it here in case we should prevent any more action
  if (chart.maximizeOptions.onToggle) {
    var stopPropagation = chart.maximizeOptions.onToggle(false);
    if (stopPropagation === true) return;
  }

  //show scrollbars
  document.getElementsByTagName("html")[0].style.overflow = '';

  //remove the maximized class in here as we need the layout to update before angular does its stuff - reduce flickering
  chart.element.className = "partition-map";

  //hide the docked popover
  this.dockedPopover.style.display = "none";

  chart.isTransitioning = true;

  chart.element.style.width = '';

  //redraw chart
  chart.redraw();

};

// on resize calculate the layout
PartitionMap.prototype.calculateLayout = function () {

  var disableScrolling = chart.maximizeOptions.disableScrolling;

  if (chart.isMaximized) {

    if (disableScrolling) {
      //store scroll location
      chart.scrollLocationX = window.pageXOffset;
      chart.scrollLocationY = window.pageYOffset;

      //scroll to top of page
      window.scrollTo(0, 0);
    }

    var dockedPopoverWidth = this.maximizeOptions.sidePanelWidth;

    //if we should resize to the container then do this
    if (chart.maximizeOptions.shouldResize) {

      //The chart wrapper needs to move to the position of the page container
      var top = ((chart.parent.offsetTop - chart.maximizedContainer.offsetTop) * -1);
      var left = ((chart.parent.offsetLeft - chart.maximizedContainer.offsetLeft) * -1);

      var documentWidth = (document.documentElement.clientWidth || document.body.clientWidth);
      var targetWidth = chart.maximizeOptions.fillScreen ? documentWidth - (chart.parent.getBoundingClientRect().left + left) : chart.maximizedContainer.offsetWidth;
      var targetHeight = chart.maximizeOptions.fillScreen ? window.innerHeight - (chart.parent.getBoundingClientRect().top + top) : chart.maximizedContainer.offsetHeight;

      chart.width = targetWidth - dockedPopoverWidth;
      chart.height = targetHeight;

      if (chart.width < 0) chart.width = 0;
      if (chart.height < 0) chart.height = 0;

      chart.parent.style.width = chart.width + dockedPopoverWidth + 'px';
      chart.parent.style.height = chart.height + 'px';

      if (Math.abs(top) !== 0) {
        chart.top += top;
        chart.parent.style.top = chart.top + 'px';
      }

      if (Math.abs(left) !== 0) {
        chart.left = left;
        chart.parent.style.left = chart.left + 'px';
      }

      //record the previous values to watch for changes
      chart.previousLeftOffset = chart.maximizedContainer.offsetLeft;
      chart.previousTopOffset = chart.maximizedContainer.offsetTop;
      chart.previousDocumentWidth = documentWidth;

    } else {
      //if we should only show the docked popover do this
      chart.width = chart.element.clientWidth;
      chart.height = chart.element.clientHeight;
    }


  } else {
    //remove any old maximized properties
    chart.parent.style.position = 'relative';
    chart.parent.style.top = '';
    chart.parent.style.left = '';
    chart.parent.style.width = '';
    chart.parent.style.height = '';

    chart.top = 0;
    chart.left = 0;
    chart.width = chart.element.clientWidth;
    chart.height = chart.element.clientHeight;

    if (disableScrolling) {
      //store to previous location
      window.scrollTo(chart.scrollLocationX, chart.scrollLocationY);
    }
  }

  //update button position
  chart.positionToggleButton();

  //update the popover position if possible
  chart.positionPopover();
};

// clear down and redraw
PartitionMap.prototype.redraw = function (data, callback) {

  //recalculate the size of the chart
  chart.calculateLayout();

  if (chart.width === 0 || chart.height === 0) return;

  chart.container.find('svg').remove();
  chart.x = d3.scale.linear().range([0, chart.width]);
  chart.y = d3.scale.linear().range([0, chart.height]);
  chart.draw(data ? data : chart.data);

  //make sure we reselect the selected node if there was one
  chart.isRedrawing = true;
  if (chart.selectedItem) chart.selectSegment(chart.selectedItem);
  chart.isRedrawing = false;

  //if we have a callback call it
  if (callback) callback();

};

PartitionMap.prototype.showPopover = function () {

  //if the map is maximized we do not want to show the popover
  if (chart.popoverEnabled === false || chart.popoverVisible) return;

  //set styling
  chart.getPopover().style.visibility = 'hidden';
  chart.getPopover().style.display = 'block';

  //if the chart has no children then resize it before positioning
  var popoverContainer = chart.getPopover().getElementsByClassName('popover-container');

  //ensure we have found it - then resize it accordingly
  if (popoverContainer && popoverContainer.length > 0) {
    popoverContainer[0].style.width = (chart.childList && chart.childList.length === 0) ? '285px' : '';
  }

  //this is required to let flot and scrollbar render without any flickering
  chart.popoverShowTimeout = setTimeout(function () {
    chart.getPopover().style.visibility = '';
  }, 200);

  //position popover after showing it - needed to calculate correct size of popover for positioning
  chart.positionPopover();

  //record popover visibility
  chart.popoverVisible = true;
};

PartitionMap.prototype.hidePopover = function () {

  //record popover visibility
  chart.popoverVisible = false;

  //set styling
  var popover = chart.getPopover();

  if (popover) {
    popover.style.display = 'none';
  }
};

PartitionMap.prototype.positionPopover = function () {

  // if we dont have a selected segment - dont calculate
  if (chart.popoverElement === null || chart.popoverElement === undefined) return;

  //get data of segment element
  var segmentData = chart.getSegmentData(chart.popoverElement);

  // check we have segmentData
  if (segmentData === null || segmentData === undefined) return;

  //calculate position
  var segmentY = chart.y(segmentData.y);

  //if off screen hide and reset
  if (segmentY < 0) {
    //if the segment is also not the visible parent segment
    if (!(segmentData.depth < chart.currentDepth && chart.isParentOf(segmentData, chart.selectedItem)) || chart.selectedItem === null) {
      chart.hidePopover();
      return;
    }
  }

  //get our popover element
  var popoverElement = chart.getPopover();

  //get containing element
  var partitionBox = chart.parent;
  var partitionBoxBounds = partitionBox.getBoundingClientRect();

  //get the corresponding text element to calculate the position from
  var textElement = chart.segmentLabels[0][chart.popoverElement];

  //get the position and size of the text element - cant use on getBoundingClientRect on tspan - IE10 wont work
  var textBounds = textElement.parentNode.getBoundingClientRect();

  //get the position and size of the popover element
  var popoverBounds = popoverElement.getBoundingClientRect();

  //Calculate new position of popover
  var popoverX = ((textBounds.left + (textBounds.width / 2)) - (popoverBounds.width / 2));
  var popoverY = (textBounds.top + textBounds.height);

  //take into account the partition box
  popoverX -= partitionBoxBounds.left;
  popoverY -= partitionBoxBounds.top;

  //reset popover classes
  popoverElement.className = "popover bottom partition-popover";

  //reset arrow margin to default
  chart.popoverArrow.style.marginLeft = '-11px';

  //store current window size for later
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  //store the container size for later - (for use if we are within a modal)
  var containerWidth = this.parent.offsetWidth;
  var containerHeight = this.parent.offsetHeight;

  var overlap = 0;

  if (chart.modalChart === true) {

    //if popover position is below the bottom of the window then adjust
    if ((popoverY + popoverBounds.height) > containerHeight) {
      popoverElement.className = "popover top partition-popover";
      popoverY -= (popoverBounds.height + 15);
    }

    //if popover calculated position is off screen then reposition accordingly
    if (popoverX < 20) {
      //position popover arrow to middle of text
      chart.popoverArrow.style.marginLeft = (popoverX - 31) + 'px';
      popoverX = 20;
    } else if ((popoverX + popoverBounds.width) > (containerWidth - 60)) {
      overlap = (containerWidth - (popoverX + popoverBounds.width)) - 60;
      chart.popoverArrow.style.marginLeft = ((overlap * -1) - 11) + 'px';
      popoverX += overlap;
    }

  } else {
    //if popover position is below the bottom of the window then adjust
    if (((popoverY + partitionBoxBounds.top) + popoverBounds.height) > windowHeight) {
      popoverElement.className = "popover top partition-popover";
      popoverY -= (popoverBounds.height + 15);
    }

    //if popover calculated position is off screen then reposition accordingly
    if ((popoverX + partitionBoxBounds.left) < 20) {
      //position popover arrow to middle of text
      chart.popoverArrow.style.marginLeft = ((popoverX + partitionBoxBounds.left) - 31) + 'px';
      popoverX = 20 - partitionBoxBounds.left;
    } else if ((popoverX + partitionBoxBounds.left + popoverBounds.width) > (windowWidth - 60)) {
      overlap = (windowWidth - (popoverX + partitionBoxBounds.left + popoverBounds.width)) - 60;
      chart.popoverArrow.style.marginLeft = ((overlap * -1) - 11) + 'px';
      popoverX += overlap;
    }
  }

  //now update the position of the popover
  popoverElement.style.top = popoverY + "px";
  popoverElement.style.left = popoverX + "px";
};

PartitionMap.prototype.getPopover = function () {
  //this is required because the directive has not be applied yet and popover element will be referenced incorrectly
  if (!chart.popover) {
    chart.popover = chart.parent.getElementsByClassName('partition-popover')[0];

    if (chart.popover === null || chart.popover === undefined) return;

    //get popover top arrow
    chart.popoverArrow = chart.popover.getElementsByClassName("arrow")[0];
  }
  return chart.popover;
};

PartitionMap.prototype.checkPopover = function (e) {
  if (chart.popoverVisible) {
    chart.mouseX = e.clientX;
    chart.mouseY = e.clientY;

    //check if the mouse is within the rect
    var rectElement = chart.segments[0][chart.popoverElement];
    var rectBounds = rectElement.getBoundingClientRect();

    //if it is within then do nothing
    if (chart.mouseX > rectBounds.left && chart.mouseX < rectBounds.right && chart.mouseY > rectBounds.top && chart.mouseY < rectBounds.bottom) return;

    // otherwise check if mouse is over the popover
    var popoverElement = chart.getPopover();
    var popoverBounds = popoverElement.getBoundingClientRect();

    //if mouse is over the popover or between the segment and the popover
    if (chart.mouseX > popoverBounds.left && chart.mouseX < popoverBounds.right && chart.mouseY > (popoverBounds.top - 2) && chart.mouseY < popoverBounds.bottom) return;

    if (chart.hoverLeaveTimeout) return;

    chart.hoverLeaveTimeout = setTimeout(function () {
      //recheck bounds
      //if it is within then do nothing
      if (chart.mouseX > rectBounds.left && chart.mouseX < rectBounds.right && chart.mouseY > rectBounds.top && chart.mouseY < rectBounds.bottom) {
        chart.hoverLeaveTimeout = null;
        return;
      }

      //if mouse is over the popover or between the segment and the popover
      if (chart.mouseX > popoverBounds.left && chart.mouseX < popoverBounds.right && chart.mouseY > (popoverBounds.top - 2) && chart.mouseY < popoverBounds.bottom) {
        chart.hoverLeaveTimeout = null;
        return;
      }

      // hide the popovers
      chart.hidePopover();

      chart.hoverLeaveTimeout = null;

    }, chart.hoverLeaveDuration);

  }
};

PartitionMap.prototype.selectItem = function (data) {

  //if popover is not enabled, do not update popover data
  if (this.popoverEnabled === false) return;

  //if the item is the same as the previously rendered item dont re-render
  //object equality is not guaranteed, but position is unique so use it instead
  if (data && chart.popoverItem && chart.popoverItem.key === data.key && chart.popoverItem.x === data.x && chart.popoverItem.y === data.y) return;

  //generate new child list
  chart.childList = chart.getChildren(data);

  //store data of popover item
  chart.popoverItem = data;

  //let the popover know to update
  var popoverData = data;
  popoverData.data = chart.getDetailedDataFromData(data);
  popoverData.data.parents = chart.getParentsData(popoverData);

  // ensure there is a formatted value
  if (popoverData.data && popoverData.data.value && !popoverData.formattedValue) {
    popoverData.formattedValue = chart.valueFormatter(popoverData.data.value);
  }

  chart.rootScope.$broadcast('popover-update', popoverData);
};

//object equality is not guaranteed, but position is unique so use it instead
PartitionMap.prototype.segmentsEqual = function (segmentOne, segmentTwo) {
  return (segmentOne && segmentTwo && segmentOne.key === segmentTwo.key && segmentOne.x === segmentTwo.x && segmentOne.y === segmentTwo.y);
};

PartitionMap.prototype.cloneObject = function (obj) {
  if (null === obj || "object" !== typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
};

PartitionMap.prototype.getChildren = function (root) {

  var children = [];

  if (!root || !root.children) return [];

  //generate formatted value
  root.formattedValue = chart.valueFormatter(root.value);

  var zeroNode;

  for (var nd = 0; nd < root.children.length; nd++) {

    //generate formatted value
    var childNode = root.children[nd];
    childNode.formattedValue = chart.valueFormatter(childNode.value);

    if (root.children[nd].key === '__zero__') {
      zeroNode = root.children[nd];
    } else {
      //push current item on to list
      children.push(childNode);
    }
  }

  if (zeroNode) {
    var rootData = chart.getDetailedDataFromData(root);

    //find all zero nodes and merge with the zero node
    for (var i = 0; i < rootData.children.length; i++) {
      var node = rootData.children[i];

      if (node.value === 0) {

        //clone object
        var newNode = chart.cloneObject(zeroNode);
        newNode.key = node.label;
        newNode.value = 0;
        newNode.formattedValue = chart.valueFormatter(0);
        children.push(newNode);
      }
    }
  }

  //return child nodes sorted
  return children;
};

//This will get the original data for all the parent segments
PartitionMap.prototype.getParentsData = function (data) {

  var currentSegment = data;

  var parents = [];

  while (currentSegment.hasOwnProperty('parent')) {
    parents.push(chart.getDetailedDataFromData(currentSegment.parent));
    currentSegment = currentSegment.parent;
  }

  return parents;
};

PartitionMap.prototype.updateDockedPopover = function (data) {

  //store the docked popover item
  chart.dockedPopoverItem = data;

  var userContentScope = chart.rootScope.$new(true);

  //add all the properties from data to scope
  for (var key in data) {
    userContentScope[key] = data[key];
  }

  //add this extra property containing the original data
  userContentScope.data = chart.getDetailedDataFromData(data);

  //add the parent information to data
  userContentScope.data.parents = chart.getParentsData(data);

  //update list of children
  chart.dockedChildList = chart.getChildren(data);

  if (chart.popoverTemplate) {
    //compile the template with the latest values

    //find the target area for the template
    var contentArea = angular.element(chart.dockedUserContent);

    //compile template and add it to the popover
    contentArea.empty().append(chart.popoverTemplate);
    chart.compile(contentArea)(userContentScope);

    //apply the scope if needed
    chart.apply();

    // esnsure scroll pane is initialized
    if(chart.scope.pane && chart.scope.pane.reinitialise) {
      chart.timeout(chart.scope.pane.reinitialise);  
    }
  }
};

//this method will allow us to take in a detailed json string and
//convert it to a simplifed one compatible with d3
PartitionMap.prototype.processData = function (data) {

  var output = {};
  for (var key in data) {
    var label = data[key].label ? data[key].label : "";

    if (data.hasOwnProperty(key)) {
      if (data[key].value) {
        output[label] = data[key].value;
      } else if (data[key].children) {
        output[label] = chart.processData(data[key].children);
      } else if (data[key].value === 0) {
        output.__zero__ = 0;
      }
    }
  }

  //if we have no data specified, store this fact
  chart.noData = chart.isEmpty(output);

  //required to ensure we update the UI on data change
  chart.apply();

  return output;
};

PartitionMap.prototype.isEmpty = function (obj) {
  for (var prop in obj) {
    if (obj.hasOwnProperty(prop))
      return false;
  }
  return true;
};


//we may want to get the original detailed data from simplifed data
PartitionMap.prototype.getDetailedDataFromData = function (data) {

  //lets get the heirarchy
  var steps = [data.key];
  var node = data;

  while (node.parent) {
    steps.push(node.parent.key);
    node = node.parent;
  }

  //we now have the heirarchy required - now reverse and traverse!
  node = chart.originalData;
  for (var i = steps.length - 1; i >= 0; i--) {

    for (var j = 0; j < node.length; j++) {
      var obj = node[j];

      if (obj.label === steps[i]) {
        if (!obj.children || i === 0) {
          node = obj;
        } else {
          node = obj.children;
        }
      }
    }
  }

  return node;
};

PartitionMap.prototype.isParentOf = function (parent, child) {
  var node = child;

  while (node.parent) {
    //using === doesnt always return correct value so check against unique properties
    if (node.parent.key === parent.key && node.parent.x === parent.x && node.parent.y === parent.y)
      return true;

    node = node.parent;
  }


  return false;
};

//check if segment has any zero siblings
PartitionMap.prototype.hasZeroSibling = function (data) {
  //if root node then always will be false
  if (!data.parent) return false;

  //get sibling segments
  var siblings = data.parent.children;

  for (var i = 0; i < siblings.length; i++) {
    var sibling = siblings[i];

    //if a zero sibling exists
    if (sibling.key === '__zero__') {
      return true;
    }
  }
  return false;
};

//calculate x position based on if the row has any zero values in it
PartitionMap.prototype.calculateX = function (data) {

  //if root node or no zero siblings then return normal position
  if (!data.parent) return data.x;

  //get the x position of the parent segment
  var parentX = chart.calculateX(data.parent);

  //get siblings
  var siblings = data.parent.children;

  //set initial start position equal to that of the parent
  var startPos = parentX;

  for (var i = 0; i < siblings.length; i++) {
    siblings[i].x = startPos;
    startPos += chart.calculateWidth(siblings[i]);

    if (siblings[i].key === data.key) return siblings[i].x;
  }
};

//calculate width based on if the row has any zero values in it
PartitionMap.prototype.calculateWidth = function (data) {

  //if root node then return 1 always
  if (!data.parent) return 1;

  //get width of parent
  var parentWidth = chart.calculateWidth(data.parent);
  var parentOffset = parentWidth / data.parent.dx;

  //check if there are any zero siblings
  var siblings = data.parent.children;
  var hasZero = chart.hasZeroSibling(data);

  if (hasZero) {

    //calculate width of zero item - 1/20th of its parent
    var zeroWidth = parentWidth / 20;

    //calculate how much we need to reduce each sibling by - share reduction between all
    var siblingReduction = (zeroWidth / (siblings.length - 1));

    if (data.key === '__zero__') {
      return zeroWidth * parentOffset;
    }
    return (data.dx - siblingReduction) * parentOffset;
  }

  return data.dx * parentOffset;
};

PartitionMap.prototype.setLoading = function (loading) {
  chart.isLoading = loading;
  chart.hidePopover();
  chart.updateToggleVisibility();
  chart.apply();
};

PartitionMap.prototype.updateToggleVisibility = function () {
  if (chart.isLoading) {
    chart.allowMaximize = false;
  } else {
    chart.allowMaximize = true && chart.maximizeOptions.buttonVisible;
  }
};

PartitionMap.prototype.apply = function () {
  //only apply scope if we need to
  if (!chart.rootScope.$$phase) {
    chart.rootScope.$apply();
  }
};

PartitionMap.prototype.calculateDepth = function (root, value) {
  //value is optional - if not specified default to 0
  if (!value) value = 0;

  //traverse nodes
  if (root.depth !== null) {
    //if the node has a depth greater than the currently known one then record this
    if (root.depth > value) value = root.depth;

    //if it has children then lets process them too!
    if (root.children) {

      //iterate each child and process
      for (var child = 0; child < root.children.length; child++) {
        var newVal = chart.calculateDepth(root.children[child], value);

        //if greater then store child greatest depth
        if (newVal > value) value = newVal;
      }
    }

    return value;
  }
};

PartitionMap.prototype.valueOrDefault = function (value, defaultValue) {
  return (value === null || value === undefined) ? defaultValue : value;
};

PartitionMap.prototype.handleWheelClick = function (e) {
  if (e.which === 2 && chart.isMaximized && chart.maximizeOptions.disableScrolling) {
    e.stopPropagation();
    e.preventDefault();
    e.cancelBubble = false;
    return false;
  }
};

PartitionMap.prototype.positionToggleButton = function () {
  //get the default button position depending on maximized state
  //var defaultPosition = chart.isMaximized ? chart.toggleButtonDefault.maximize : chart.toggleButtonDefault.minimize;

  //set default button position to the 'maximize' offset it the map should resize, otherwise keep the same.
  var defaultPosition;
  if (chart.isMaximized && chart.maximizeOptions.shouldResize) {
    defaultPosition = chart.toggleButtonDefault.maximize;
  } else defaultPosition = chart.toggleButtonDefault.minimize;

  //get the specified offset for the button
  var buttonOffset = chart.isMaximized ? chart.buttonOffset.maximize : chart.buttonOffset.minimize;

  //calculate the new positions based on the offset specified
  var x = defaultPosition.x + (buttonOffset.x * -1); //invert to provide expected behaviour
  var y = defaultPosition.y + buttonOffset.y;

  //position the button accordingly
  chart.toggleButton.style.right = x + 'px';
  chart.toggleButton.style.top = y + 'px';
};