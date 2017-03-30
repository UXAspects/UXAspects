export default function d3Sankey() {
    var service = {
        getChart: getChart
    };

    return service;

    function getChart($container) {
        return new Sankey($container);
    }
}

/**
 * Sankey charting
 *
 *  Supported Option Properties:
 *  =============================
 * 	var defaultChartOptions = {
 *    paddingX: 30,										// padding on first col left-edge and last col right-edge
 *		linkHoverHL: true,							// whether to do link hover highlight
 *		col: {
 *				headerHeight: 60,
 *				headerLabelSpacing: 10,
 *				headerLabelLength: 18,
 *				paddingTop: 30,
 *				paddingBottom: 30
 *			},
 *			block:{
 *				minHeight: 70,								// minimum node height
 *				minWidth: 100,								// minimum node width
 *				spacingY: 15,									// vertical space between nodes
 *				paddingX: 10,									// horizontal padding inside a node
 *				paddingY: 7,									// veritcal padding inside a node
 *				calloutData: {								// data to display inside a node
 *					topLeft: {									// Settings for data  to be shown in the top-left corner, if needed
 *						key: 'datasize',					// the property of the node item to be shown
 *						nodeLabel: false,					// is the data to be shown as node label (i.e., not values with unit and label). If true, the valueUnit and label settings will be ignored.
 *						defaultShow: true,				// 'true' to always show the data, 'false' to only show the data on node hover highlight.
 *						valueUnit: 'b',						// the unit for the data, e.g., 'b' for byte in '80Mb'. Will be ignored if 'nodeLabel=true'
 *						label: 'data'							// the label of the data. . Will be ignored if 'nodeLabel=true'
 *					},
 *					bottomLeft: {								// Settings for data  to be shown in the bottom-left corner, if needed
 *						...
 *			  	},
 *					topRight: {									// Settings for data  to be shown in the top-right corner, if needed
 *						...
 *			  	},
 *					bottomRight: {							// Settings for data  to be shown in the bottom-right corner, if needed
 *						...
 *			  	}
 *			  }
 *			}
 *	 }
 *
 *
 */

var defaultChartOptions = {
    paddingX: 30,
    linkHoverHL: true,
    col: {
        headerHeight: 60,
        headerLabelSpacing: 10,
        paddingTop: 30,
        paddingBottom: 30
    },
    linkTooltip: {
        show: true,
        label: 'items'
    },
    block: {
        minHeight: 70,
        minWidth: 100,
        spacingY: 15,
        paddingX: 10,
        paddingY: 7,
        calloutData: {
            topLeft: {
                key: 'datasize',
                nodeLabel: false,
                defaultShow: true,
                valueUnit: 'b',
                binary: false,
                label: 'data'
            },
            topRight: {
                key: 'value',
                nodeLabel: false,
                defaultShow: true,
                valueUnit: null,
                label: 'items'
            },
            bottomRight: {},
            bottomLeft: {
                key: 'name',
                nodeLabel: true,
                defaultShow: true
            }
        }
    },
    overflow: {
        tooltip: {
            label: 'items',
            showTooltip: true
        }
    }
};

var hover_hl_delay = 10;

function Sankey($container) {
    this.$container = $container;
    this.element = $container[0];
    this.width = this.element.clientWidth;
    this.height = this.element.clientHeight;
    this.cols = [];
    this.blocks = [];
    this.links = [];
    this.overflows = [];
    this.options = {};
    this.clickFn = null;
    this.inited = false;
}


Sankey.prototype.init = function(options, click) {
    var chart = this;

    chart.options = $.extend(true, defaultChartOptions, options);
    if (click) {
        chart.clickFn = function(scope, node) {
            return click(node.currentTarget.__data__);
        };
    }
    chart.inited = true;

    if (chart.options.showColNumber === undefined) {
        chart.options.showColNumber = false;
        chart.options.col.headerLabelSpacing = 0;
    } else {
        if (chart.options.showColNumber === false) {
            chart.options.col.headerLabelSpacing = 0;
        }
    }

    chart.colPrefix = "aspects-sankey-";

    return chart;
};

Sankey.prototype.draw = function(dataset) {
    var chart = this;

    if (!chart.inited) {
        chart.init({});
    }

    chart._loadColumns(dataset.columns)
        ._loadBlocks(dataset.nodes)
        ._loadLinks(dataset.links)
        ._calculateLayout();

    chart.tooltip = d3.select(chart.element).append("div")
        .attr("class", "tooltip hidden");

    var svg = d3.select(chart.element).append("svg")
        .attr("width", chart.width)
        .attr("height", chart.height)
        .attr("viewBox", [0, 0, chart.width, chart.height].join(' '));

    //add gradient
    var defs = svg.append("defs");
    var overflowGradient = defs.append("linearGradient");
    overflowGradient.attr("id", "overflowGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");
    overflowGradient.append("stop")
        .attr("class", "stop1")
        .attr("offset", "25%");
    overflowGradient.append("stop")
        .attr("class", "stop2")
        .attr("offset", "100%");

    var nodeGradient = defs.append("linearGradient");
    nodeGradient.attr("id", "nodeGradient")
        .attr("x1", "0%")
        .attr("y1", "0%")
        .attr("x2", "0%")
        .attr("y2", "100%");
    nodeGradient.append("stop")
        .attr("class", "stop1")
        .attr("offset", "0%");
    nodeGradient.append("stop")
        .attr("class", "stop2")
        .attr("offset", "100%");


    chart._drawColumns(svg);
    chart._drawBlocks(svg);
    chart._drawLinks(svg);
    chart._drawOverflows(svg);

    return chart;
};

Sankey.prototype._loadColumns = function(columns) {
    var chart = this;
    chart.colsDef = d3.map(columns, function(d) {
        return d.id;
    });

    return chart;
};

Sankey.prototype._loadBlocks = function(nodes) {
    var chart = this;
    chart.blocks = nodes;

    chart.cols = d3.nest()
        .key(function(d) {
            return chart.colsDef.get(d.type).ordinal;
        })
        .sortKeys(d3.ascending)
        .rollup(function(leaves) {
            var col = {
                name: leaves && leaves[0] ? chart.colsDef.get(leaves[0].type).name : '',
                nodes: leaves,
                width: 0,
                x: 0
            };

            return col;
        })
        .entries(nodes);

    return chart;
};

Sankey.prototype._loadLinks = function(links) {
    var chart = this;

    chart.links = links;

    //assosciate links with the blocks
    links.forEach(function(link) {
        var block = chart.blocks.filter(function(block) {
            return block.id === link.source;
        })[0];
        var exit = block.exit || [];
        exit.push(link);
        block.exit = exit;
        link.sourceData = block;

        block = chart.blocks.filter(function(block) {
            return block.id === link.target;
        })[0];

        var enter = block.enter || [];
        enter.push(link);
        block.enter = enter;
        link.targetData = block;
    });

    return chart;

};

Sankey.prototype._calculateLayout = function() {
    var chart = this;

    chart._calculateColumnLayout();
    chart._calculateBlockLayout();
    chart._calculateLinkLayout();

    return chart;
};

Sankey.prototype._calculateColumnLayout = function() {
    var chart = this;

    var MIN_GRID_UNIT = 60;

    var numOfCols = chart.cols.length;

    var colGridUnit = (chart.width - (chart.options.paddingX * 2)) / ((numOfCols * 4.5) - 2);
    if (colGridUnit < MIN_GRID_UNIT) {
        colGridUnit = MIN_GRID_UNIT;
    }

    //get block min width
    var minBlockWidth = chart.options.block.minWidth;

    chart.blockWidth = colGridUnit * 2.5;
    chart.blockSpacing = colGridUnit * 2;

    var colWidth = chart.blockWidth + chart.blockSpacing;

    //ensure that the block width is acceptable
    if (chart.blockWidth < minBlockWidth) chart.blockWidth = minBlockWidth;

    //count the number of inner and outer columns
    var innerCols = (numOfCols - 2) < 0 ? 0 : numOfCols - 2;
    var outerCols = (numOfCols > 2) ? 2 : numOfCols;

    //calculate the projected width
    var projectedWidth = ((colWidth - colGridUnit + chart.options.paddingX) * innerCols) + (colWidth * outerCols);

    //projected width is greater than contain width then we need to try and resize
    if (projectedWidth > chart.element.offsetWidth) {

        //calculate how much we need to reduce by
        var shrinkAmount = projectedWidth - chart.element.offsetWidth;

        //how much would be need to shrink each block
        var blockShrink = shrinkAmount / numOfCols;

        //shrink each block as much as possible
        chart.blockWidth -= blockShrink;

        //ensure that the block width is acceptable
        if (chart.blockWidth < minBlockWidth) chart.blockWidth = minBlockWidth;

        //recalculate colWidth
        colWidth = chart.blockWidth + chart.blockSpacing;
    }

    var maxX = 0;
    chart.cols.colBlockX = [];
    chart.cols.forEach(function(obj, i) {
        var col = obj.values;
        col.width = (i !== 0 && i !== numOfCols - 1) ? colWidth : colWidth - colGridUnit + chart.options.paddingX;
        col.x = (i > 0) ? i * colWidth - colGridUnit + chart.options.paddingX : 0;

        maxX += col.width;

        chart.cols.colBlockX[i] = chart.options.paddingX + i * (chart.blockWidth + chart.blockSpacing);

    });

    if (maxX > chart.element.offsetWidth) {

        chart.width = maxX;
        chart.$container.css("overflow-x", "auto");

    } else {
        chart.width = chart.element.offsetWidth;
        chart.$container.css("overflow-x", "initial");
    }

};

Sankey.prototype._calculateBlockLayout = function() {
    var chart = this;

    chart.blocks.forEach(function(block) {
        var colId = chart.colsDef.get(block.type).ordinal;

        block.enter = block.enter || [];
        block.exit = block.exit || [];
        block.x = chart.cols.colBlockX[colId];
        //width
        block.width = chart.blockWidth;
        //calculate the total data, if not available
        if (typeof block.value === "undefined") {
            var total = 0;
            if (block.enter && block.enter.length) {
                block.enter.forEach(function(link) {
                    total += link.value;
                });
            } else if (block.exit) {
                block.exit.forEach(function(link) {
                    total += link.value;
                });
            }
            block.value = total;
        }
    });

    //Get the highest sum total across each column; we'll use this to determine a normalised height for each block
    var colTotals = [];
    chart.cols.forEach(function(col, colIndex) {
        colTotals[colIndex] = d3.sum(col.values.nodes, function(n) {
            return n.value;
        });
    });
    var maxColTotal = d3.max(colTotals, function(ct) {
        return ct;
    });

    var maxTotalNum = d3.max(chart.cols, function(d) {
        return d.values.nodes.length;
    });
    var availableMaxHeight = (chart.height - chart.options.col.headerHeight - chart.options.col.paddingTop - chart.options.col.paddingBottom - ((maxTotalNum - 1) * chart.options.block.spacingY));
    var maxHeight = d3.max([chart.options.block.minHeight, availableMaxHeight / maxTotalNum]);

    var maxBlockY = 0;
    //ok now try and calculate the y and height of the blocks

    chart.cols.forEach(function(col) {
        var nodes = col.values.nodes;

        //keep track of y
        var currenty = chart.options.col.headerHeight + chart.options.col.paddingTop;

        var maxExtraSpacingPerBlock = (maxTotalNum * chart.options.block.spacingY);

        //This part is important for keeping the heights of columns with the same total consistent with each other
        //If there is more than one node in the column, remove some height from each node proportionate to
        //the number of codes in the column and the extra space needed for the vertical spacing.
        var maxExtraSpacingForColumn = ((nodes.length - 1) * chart.options.block.spacingY);
        //i.e. when this value is non-zero
        if (maxExtraSpacingForColumn) {
            //determine how much each block needs to be reduced by
            maxExtraSpacingForColumn = maxExtraSpacingForColumn / nodes.length;
        }

        //In the following, "overflow" refers to a block which had its size increased above the calculated value

        //overflowHeight = the difference between a block's calculated height and the minHeight where the calculated height was too small
        col.overflowHeight = [];
        //nonOverflowHeight = the calculated blockheights where it was above the minHeight
        col.nonOverflowHeight = [];

        nodes.forEach(function(block, index) {
            //calculate height
            var blockPercentOfColTotal = (block.value / maxColTotal);
            //The block's value as a percentage of the available space
            var proposedHeight = (blockPercentOfColTotal * (availableMaxHeight - maxExtraSpacingPerBlock)) - maxExtraSpacingForColumn;

            //Record whether this height was usable or not and keep a running total
            block.proposedHeight = proposedHeight;
            if (proposedHeight < chart.options.block.minHeight) {
                col.overflowHeight[index] = chart.options.block.minHeight - proposedHeight;
            } else {
                col.nonOverflowHeight[index] = proposedHeight;
            }
        });

        col.overflowHeight.total = d3.sum(col.overflowHeight);
        col.nonOverflowHeight.total = d3.sum(col.nonOverflowHeight);


        nodes.forEach(function(block, index) {

            //Adjust node scaling to accomodate nodes enlargened to the min size
            if (col.overflowHeight.length && !col.overflowHeight[index]) {
                //to be precise this node's sizing was fine
                //but it must be adjusted regardless to accommodate the ones which had to be increased up to the minHeight
                var blockPercentageOfBlocksAboveMinHeight = (block.proposedHeight / col.nonOverflowHeight.total);
                var totalMinHeightOverflowToRedistribute = col.overflowHeight.total;
                block.proposedHeight -= blockPercentageOfBlocksAboveMinHeight * totalMinHeightOverflowToRedistribute;
            }

            block.height = d3.max([block.proposedHeight, chart.options.block.minHeight]);

            block.y = currenty;
            currenty += block.height + chart.options.block.spacingY;

            maxBlockY = d3.max([maxBlockY, currenty]);
        });
    });

    maxHeight = d3.max([chart.height, maxBlockY + 20]);
    if (maxHeight > chart.height) {
        chart.height = maxHeight;
        chart.$container.css("overflow-y", "auto");
    } else {
        chart.$container.css("overflow-y", "initial");
    }

    return chart;
};

Sankey.prototype._calculateLinkLayout = function() {
    var chart = this;

    chart.blocks.forEach(function(block) {
        var currenty = 0;
        //do enter first
        var totalExit = 0;
        var colId = chart.colsDef.get(block.type).ordinal;

        if (block.enter && block.enter.length) {
            currenty = block.y;
            block.enter.forEach(function(link) {
                link.tr = [block.x, currenty];
                link.br = [block.x, link.tr[1] + ((link.value / block.value) * block.height)];
                currenty = link.br[1];
            });
        }
        if (block.exit && block.exit.length) {
            currenty = block.y;
            block.exit.forEach(function(link) {
                link.tl = [block.x + block.width, currenty];
                link.bl = [block.x + block.width, link.tl[1] + ((link.value / block.value) * block.height)];
                currenty = link.bl[1];

                totalExit += link.value;
            });
            //check for missed data
            //not sure i am happy with this check
            if (block.value > totalExit) {
                var overflow = {};
                var x = (block.x + block.width);
                var r = 20;
                var remainingHeight = block.y + block.height - currenty;
                overflow.path = "M" + x + "," + currenty +
                    "A" + r + "," + r + " 0 0,1" +
                    (x + r) + "," + (currenty + r) + " " +
                    "v" + Math.max(r, remainingHeight) + "h-" + r + "Z";
                if (chart.options.overflow.tooltip.showTooltip) {
                    overflow.tooltip = (block.value - totalExit) + " " + chart.options.overflow.tooltip.label;
                }
                chart.overflows.push(overflow);
            }
        } else if (colId !== chart.cols.length - 1) {
            //if there is no exit blocks
            //check if bloack is last col
            currenty = block.y;
            var blockOverflow = {};
            var blockX = (block.x + block.width);
            var blockR = 20;
            var remainingBlockHeight = block.y + block.height - currenty;
            blockOverflow.path = "M" + blockX + "," + currenty +
                "A" + blockR + "," + blockR + " 0 0,1" +
                (blockX + blockR) + "," + (currenty + blockR) + " " +
                "v" + Math.max(blockR, remainingBlockHeight) + "h-" + blockR + "Z";
            chart.overflows.push(blockOverflow);
        }
    });

    chart.links.forEach(function(link) {
        var dist = chart.blockSpacing / 2,
            tl = link.tl,
            tr = link.tr,
            br = link.br,
            bl = link.bl,
            tlcp = [tl[0] + dist, tl[1]],
            trcp = [tr[0] - dist, tr[1]],
            blcp = [bl[0] + dist, bl[1]],
            brcp = [br[0] - dist, br[1]];

        link.path = "M" + tl[0] + "," + tl[1] +
            "C" + tlcp[0] + "," + tlcp[1] +
            " " + trcp[0] + "," + trcp[1] +
            " " + tr[0] + "," + tr[1] +
            "L" + br[0] + "," + br[1] +
            "C" + brcp[0] + "," + brcp[1] +
            " " + blcp[0] + "," + blcp[1] +
            " " + bl[0] + "," + bl[1] +
            "L" + tl[0] + "," + tl[1];
    });

    return chart;

};

function createSVGtext(caption, x, y, classname, colNumber, dx, headerlength) {
    //  This function attempts to create a new svg "text" element, chopping
    //  it up into "tspan" pieces, if the caption is too long
    //
    var svgText = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    svgText.setAttributeNS(null, 'x', x + dx);
    svgText.setAttributeNS(null, 'y', y);

    //  The following two variables should really be passed as parameters

    var MAXIMUM_CHARS_PER_LINE = headerlength;

    var LINE_HEIGHT = 22;

    var words = caption.split(" ");
    var line = "";
    if (colNumber !== null) {
        var svgTSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
        svgTSpan.setAttributeNS(null, 'x', x);
        svgTSpan.setAttributeNS(null, 'y', y);
        svgTSpan.setAttributeNS(null, 'class', 'col-num');
        var tSpanTextNode = document.createTextNode(colNumber + 1);
        svgTSpan.appendChild(tSpanTextNode);
        svgText.appendChild(svgTSpan);
    }

    var truncated = false;
    var numOfRows = 0;

    for (var n = 0; n < words.length; n++) {
        var testLine = line + words[n] + " ";
        if (testLine.length > MAXIMUM_CHARS_PER_LINE) {
            if (colNumber === null) {
                if (numOfRows < 1) {
                    //  Add a new <tspan> element
                    var svgTextSpanElement = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
                    svgTextSpanElement.setAttributeNS(null, 'x', x);
                    svgTextSpanElement.setAttributeNS(null, 'y', y);
                    svgTextSpanElement.setAttributeNS(null, 'dx', dx);
                    svgTextSpanElement.setAttributeNS(null, 'class', classname);

                    var tSpanTextElement = document.createTextNode(line);
                    svgTextSpanElement.appendChild(tSpanTextElement);
                    svgText.appendChild(svgTextSpanElement);

                    line = words[n] + " ";
                    y += LINE_HEIGHT;
                }
            }
            numOfRows = numOfRows + 1;
        } else {
            if (colNumber !== null) {
                if (numOfRows < 1) {
                    line = testLine;
                }
            } else {
                line = testLine;
            }
        }
    }

    if (!truncated && numOfRows > 1) {
        line = line + "...";
        truncated = true;
    }
    var svgTextSpan = document.createElementNS('http://www.w3.org/2000/svg', 'tspan');
    svgTextSpan.setAttributeNS(null, 'x', x);
    svgTextSpan.setAttributeNS(null, 'y', y);
    svgTextSpan.setAttributeNS(null, 'dx', dx);
    svgTextSpan.setAttributeNS(null, 'class', classname);
    var textSpanTextNode = document.createTextNode(line);
    svgTextSpan.appendChild(textSpanTextNode);

    svgText.appendChild(svgTextSpan);
    if (truncated) {
        svgText.setAttributeNS(null, 'tooltip', caption);
    }
    return svgText;
}

Sankey.prototype._drawColumns = function(svg) {
    var chart = this;

    var cols = svg.append("g").selectAll(".column")
        .data(chart.cols)
        .enter().append("g")
        .attr("class", function(d) {
            return "column " + chart.colPrefix + chart.getColumnType(d);
        });

    var colHeader = cols.append("g")
        .attr("class", "col-header");

    colHeader.append("rect")
        .attr("height", chart.options.col.headerHeight)
        .attr("width", function(d) {
            return d.values.width;
        })
        .attr("transform", function(d) {
            return "translate(" + d.values.x + "," + 0 + ")";
        })
        .on("mouseenter", function() {
            if (chart.hoverId) {
                clearTimeout(chart.hoverId);
                chart.hoverId = null;
            }
            chart.hlClearId = setTimeout(function() {
                chart._clearHover();
                chart.hlClearId = null;
            }, hover_hl_delay);
        })
        .on("mouseout", function() {
            if (chart.hlClearId) {
                clearTimeout(chart.hlClearId);
            }
        });

    var colBodyHeight = chart.height - chart.options.col.headerHeight;
    var colBody = cols.append("g")
        .attr("class", "col-body");

    colBody.append("rect")
        .attr("height", colBodyHeight)
        .attr("width", function(d) {
            return d.values.width;
        })
        .attr("transform", function(d) {
            return "translate(" + d.values.x + "," + chart.options.col.headerHeight + ")";
        })
        .on("mouseenter", function() {
            if (chart.hoverId) {
                clearTimeout(chart.hoverId);
                chart.hoverId = null;
            }
            chart.hlClearId = setTimeout(function() {
                chart._clearHover();
                chart.hlClearId = null;
            }, hover_hl_delay);
        })
        .on("mouseout", function() {
            if (chart.hlClearId) {
                clearTimeout(chart.hlClearId);
            }
        });
    var headerInnerText = [];

    cols.append("line")
        .attr("class", function(d, i) {
            return i ? "header-seperator" : '';
        })
        .attr("x1", function(d) {
            return d.values.x;
        })
        .attr("y1", "0")
        .attr("x2", function(d, i) {
            if (chart.options.showColNumber) {
                d.values.array = createSVGtext(d.values.name, chart.cols.colBlockX[i], (chart.options.col.headerHeight - chart.options.col.headerLabelLength - 10), "col-title", i, chart.options.col.headerLabelSpacing, chart.options.col.headerLabelLength);
            } else {
                d.values.array = createSVGtext(d.values.name, chart.cols.colBlockX[i], (chart.options.col.headerHeight - chart.options.col.headerLabelLength - 10), "col-title", null, chart.options.col.headerLabelSpacing, chart.options.col.headerLabelLength);
            }

            headerInnerText.push(new Array(d.values.array.childNodes));
            return d.values.x;
        })
        .attr("y2", chart.height);

    headerInnerText.forEach(function(val) {
        val.forEach(function() {
            colHeader.append(function(d) {
                    return d.values.array;
                })
                .attr("class", "header-text")
                .attr("x", function(d, i) {
                    return chart.cols.colBlockX[i];
                })
                .attr("y", chart.options.col.headerHeight - chart.options.col.headerLabelLength);
        });
    });
};

Sankey.prototype._drawBlocks = function(svg) {
    var chart = this;

    var node = svg.append("g").selectAll(".node")
        .data(chart.blocks)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) {
            return "translate(" + d.x + "," + d.y + ")";
        })
        .each(function(d) {
            d.element = this;
        });

    node.append("rect")
        .attr("class", "node-body")
        .attr("height", function(d) {
            return d.height;
        })
        .attr("width", function(d) {
            return d.width;
        })
        .on("mouseover", function(d) {
            if (!d3.select(this.parentNode).classed("target-node")) {
                chart.hoverId = setTimeout(function() {
                    var hlNodes = d3.selectAll('.target-node').selectAll('.hover');
                    if (hlNodes.length > 0 && hlNodes[0].parentNode) {
                        chart._hoverBlock(hlNodes[0].parentNode.__data__, false);
                    }
                    chart._hoverBlock(d, true);
                    chart.hoverId = null;
                }, hover_hl_delay);
            }
        })
        .on("mouseout", function(d) {
            var coords = d3.mouse(this);
            var mouseX = Math.floor(coords[0]);
            var mouseY = Math.floor(coords[1]);

            var xOut = mouseX <= 0 || mouseX >= Math.floor(d.width);
            var yOut = mouseY <= 0 || mouseY >= Math.floor(d.height);

            if (xOut || yOut) {
                if (chart.hoverId) {
                    clearTimeout(chart.hoverId);
                    chart.hoverId = null;

                } else {
                    chart._clearHover();
                }
            }
        });

    var calloutOptions = chart.options.block.calloutData;
    if (calloutOptions.topLeft && calloutOptions.topLeft.key) {
        chart._addCalloutData(calloutOptions.topLeft, node, true, true);
    }

    if (calloutOptions.topRight && calloutOptions.topRight.key) {
        chart._addCalloutData(calloutOptions.topRight, node, false, true);
    }

    if (calloutOptions.bottomLeft && calloutOptions.bottomLeft.key) {
        chart._addCalloutData(calloutOptions.bottomLeft, node, true, false);
    }

    if (calloutOptions.bottomRight && calloutOptions.bottomRight.key) {
        chart._addCalloutData(calloutOptions.bottomRight, node, false, false);
    }

    if (chart.clickFn) {
        node.attr("ng-click", "chart.clickFn(this, $event)");
    }
    return chart;

};

Sankey.prototype.getColumnFromBlock = function(svg, nodeType) {
    var chart = this;
    var cols = chart.cols;

    var col = null;
    cols.some(function(nodeLists, colIndex) {
        return nodeLists.values.nodes.some(function(node) {
            if (node.type === nodeType) {
                col = cols[colIndex];
            }
            return (node.type === nodeType);
        });
    });

    return col;
};

Sankey.prototype.getColumnType = function(col) {
    if (col && col.values) {
        if (col.values.nodes && col.values.nodes.length) {
            return col.values.nodes[0].type;
        }

    }
    return "";
};


Sankey.prototype.truncateText = function(node) {

    //if we have no text then return
    if (!node.name) return node.name;

    //get block name
    var textElement = d3.select(this);

    //set the text to the node name
    textElement.text(node.name);

    //padding text should be from left and right
    var paddingLeft = 10;
    var paddingRight = 10;

    //get text node
    var textNode = d3.select(this).node();

    //required because if element isnt in visible DOM IE will throw and error - animations wont work
    if (!document.body.contains(textNode)) return;

    //calculate text width
    var textLength = textNode.getComputedTextLength();

    //get block width
    var blockWidth = node.width;

    //maximum text size - take padding into account
    var maxTextLength = blockWidth - (paddingLeft + paddingRight);

    if (textLength > maxTextLength) {

        //store current shortened text
        var shortenedText = node.name;

        //we need to ellipsis text
        while (textLength > maxTextLength && shortenedText.length > 0) {
            shortenedText = shortenedText.slice(0, -1);
            textElement.text(shortenedText + '...');
            textLength = textNode.getComputedTextLength();
        }

        //add tooltip to element
        $(this).attr('tooltip', node.name);

        //return shortenedText (plus ellipsis) is truncation is required.
        return shortenedText + '...';
    }

    //return original string if no truncation required
    return node.name;
};

Sankey.prototype._addCalloutData = function(calloutOption, svgNode, isLeft, isTop) {
    var chart = this;

    var dataText = svgNode.append("text");
    var classes;
    if (calloutOption.nodeLabel) {
        classes = isLeft ? "node-label node-label-left" : "node-label node-label-right";
        dataText.text(function(d) {
            return d[calloutOption.key];
        });

    } else {
        classes = isLeft ? "callout callout-left" : "callout callout-right";

        var valuesMedian = d3.median(chart.blocks, function(block) {
            return block[calloutOption.key];
        });
        var valueUnitPrefix = calloutOption.binary ? chart._formatBinaryPrefix(valuesMedian) : d3.formatPrefix(valuesMedian, 1);

        var dy = isTop ? '1.1em' :
            calloutOption.label ? '-1.1em' : '-' + chart.options.block.paddingY + 'px';

        if (calloutOption.click) {
            dataText.on("click", function(data) {
                d3.event.stopPropagation();
                calloutOption.click(data);
            });
        }

        dataText.append("tspan")
            .attr("class", "callout-value")
            .attr("dy", dy)
            .text(function(d) {
                var val = d3.round(valueUnitPrefix.scale(d[calloutOption.key]));
                if (val > 0) {
                    if (angular.isFunction(calloutOption.valueFormatter)) {
                        var formattedValue = calloutOption.valueFormatter(val);
                        return angular.isDefined(formattedValue) ? formattedValue : val;
                    }
                    return val;
                }
                return "\ufe64" + 1;
            });

        var unit = valueUnitPrefix.symbol;
        if (calloutOption.valueUnit) {
            unit += calloutOption.valueUnit;
        }
        dataText.append("tspan")
            .attr("class", "callout-unit")
            .text(unit);

        if (calloutOption.label) {
            dy = '0.9em';
            var labelText = dataText.append("tspan")
                .attr("class", "callout-label")
                .attr("dy", dy)
                .text(calloutOption.label);

            if (isLeft) {
                labelText.attr("x", chart.options.block.paddingX);
            } else {
                labelText.attr("x", function(d) {
                    return d.width - chart.options.block.paddingX;
                });
            }
        }
    }

    if (!calloutOption.defaultShow) {
        classes += ' default-hide';
    }

    dataText.attr("class", classes);
    if (isLeft) {
        dataText.attr("x", chart.options.block.paddingX);
    } else {
        dataText.attr("x", function(d) {
            return d.width - chart.options.block.paddingX;
        });
    }

    if (calloutOption.nodeLabel) {
        if (isTop) {
            dataText.attr("y", chart.options.block.paddingY);
        } else {
            dataText.attr("y", function(d) {
                return d.height - chart.options.block.paddingY;
            });
        }
        dataText.each(chart.truncateText);
    } else {
        if (isTop) {
            dataText.attr("y", 0);
        } else {
            dataText.attr("y", function(d) {
                return d.height;
            });
        }

    }

    return chart;

};

Sankey.prototype._formatBinaryPrefix = function(valuesMedian) {
    var result = {
        symbol: ""
    };
    if (valuesMedian < 1024) {
        result.symbol = "";
    } else if (valuesMedian < 1024 * 1024) {
        result.symbol = "k";
    } else if (valuesMedian < 1024 * 1024 * 1024) {
        result.symbol = "M";
    } else if (valuesMedian < 1024 * 1024 * 1024 * 1024) {
        result.symbol = "G";
    } else if (valuesMedian < 1024 * 1024 * 1024 * 1024 * 1024) {
        result.symbol = "T";
    } else if (valuesMedian < 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
        result.symbol = "P";
    } else if (valuesMedian < 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
        result.symbol = "E";
    }
    result.scale = function(v) {
        switch (result.symbol) {
            case "k":
                return v / 1024;
            case "M":
                return v / 1024 / 1024;
            case "G":
                return v / 1024 / 1024 / 1024;
            case "T":
                return v / 1024 / 1024 / 1024 / 1024;
            case "P":
                return v / 1024 / 1024 / 1024 / 1024 / 1024;
            case "E":
                return v / 1024 / 1024 / 1024 / 1024 / 1024 / 1024;
        }
        return v;
    };
    return result;
};

Sankey.prototype._drawLinks = function(svg) {
    var chart = this;

    var link = svg.append("g").selectAll(".link")
        .data(chart.links)
        .enter().append("path")
        .attr("class", "link")
        .attr("title", function(d) {
            if (chart.options.linkTooltip.show) {
                return d.value + " " + chart.options.linkTooltip.label;
            } else return "";
        })
        .attr("d", function(d) {
            return d.path;
        })
        .each(function(d) {
            d.element = this;
        })
        .sort(function(a, b) {
            return b.height - a.height;
        });
    link.forEach(function(l) {
        $(l).tooltip({
            container: 'body',
            html: true,
            template: '<div class="tooltip linkTooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
            animation: false,
            delay: 0

        });
    });
    if (chart.options.linkHoverHL) {
        link.on("mouseover", function(d) {

                if (chart.options.linkTooltip.show) {

                    var tooltipWidth = 0,
                        tooltipHeight = 0;
                    var tooltip = $('body').find('.tooltip.linkTooltip.top.in');
                    //if condition to avoid width being undefined, when movement is rapid that it goes over the tooltip
                    if ($(tooltip).length > 0) {
                        tooltipWidth = $(tooltip)[0].offsetWidth;
                        tooltipHeight = $(tooltip)[0].offsetHeight;
                    }
                    var mousePos = {
                        x: -1,
                        y: -1
                    };

                    $(document).mousemove(function(event) {
                        mousePos.x = event.pageX;
                        mousePos.y = event.pageY;
                        if ($(tooltip).length > 0) {
                            $(tooltip)[0].style.top = mousePos.y - tooltipHeight + "px";
                            $(tooltip)[0].style.left = mousePos.x - (tooltipWidth / 2) + "px";
                        }
                    });
                }
                chart.hoverId = setTimeout(function() {
                    chart._hoverLink(d, true);
                    chart.hoverId = null;
                }, hover_hl_delay);
            })
            .on("mouseout", function() {

                if (chart.options.linkTooltip.show) {
                    //Stop tracking mousemove (which was enabled for link tooltips)
                    $(document).off("mousemove");
                }
                if (chart.hoverId) {
                    clearTimeout(chart.hoverId);
                    chart.hoverId = null;
                } else {
                    chart._clearHover();
                }
            });
    }

    return chart;
};

Sankey.prototype._drawOverflows = function(svg) {
    var chart = this;

    svg.append("g").selectAll(".overflow")
        .data(chart.overflows)
        .enter().append("path")
        .attr("class", "overflow")
        .style("stroke-width", 0)
        .attr("d", function(d) {
            return d.path;
        })
        .attr("tooltip", function(d) {
            return d.tooltip || "";
        })
        .style("fill", "url(#overflowGradient)");

    return chart;
};


Sankey.prototype._hoverBlock = function(block, classed) {
    var chart = this;
    chart._clearHover();

    d3.select(block.element).classed("hover", classed).classed("target-node", classed);

    block.enter.concat(block.exit).forEach(function(link) {
        if (link.targetData) {
            var node = d3.select(link.targetData.element).classed("hover", classed);
            if (link.targetData !== block) {
                node.classed("link-node", classed);
            }
        }
        if (link.sourceData) {
            var linkNode = d3.select(link.sourceData.element).classed("hover", classed);
            if (link.sourceData !== block) {
                linkNode.classed("link-node", classed);
            }
        }
        d3.select(link.element).classed("hover", classed);
    });

    //chart.colPrefix
    var hoverCol = $("." + chart.colPrefix + block.type);
    var colClass = hoverCol.attr("class");
    hoverCol.attr("class", colClass + " hover");

    return chart;

};

Sankey.prototype._hoverLink = function(link, classed) {
    var chart = this;
    chart._clearHover();

    d3.select(link.element).classed("hover", classed);
    if (link.targetData) {
        d3.select(link.targetData.element).classed("hover", classed).classed("link-node", classed);
    }
    if (link.sourceData) {
        d3.select(link.sourceData.element).classed("hover", classed).classed("link-node", classed);
    }

    return chart;
};

Sankey.prototype._clearHover = function() {
    var chart = this;
    d3.selectAll("g.node").classed("hover", false).classed("target-node", false).classed("link-node", false);
    d3.selectAll("path.link").classed("hover", false);
    d3.selectAll("g.column").classed("hover", false);


    return chart;
};