/*
    UX Aspects Timeline Flot plugin
    v1.0
*/

(function($) {

  function init(plot) {

    var isReady = false,
      mouseDown = false,
      tooltip = null;
    var dragStart = 0,
      mouseDownAction = 0; //0 - do nothing, 1 - left resize, 2 - move, 3 - right resize
    var selectionHandler = null,
      mouseUpHandler = null,
      mouseMoveHandler = null;

    var originalStart = 0, originalEnd = 0, originalWidth = 0, didResize = false, previousStart, previousEnd, dragTimeout, dragTimeoutBegun;

    var timeline = {
      start: null,
      end: null,
      keyboardNavigation: null,
      dragHandles: {
        width: null,
        color: null,
        tooltips: {
          enabled: false,
          onHover: false,
          onDrag: false,
          onDragEnd: false
        },
        tooltipFormatter: null
      },
      zoom: {
        enabled: false,
        minimumRange: 0
      },
      color: null,
      callback: null
    };

    function setup(options) {
      if (options.timeline && !isReady) {
        timeline.start = options.timeline.start;
        timeline.end = options.timeline.end;
        timeline.keyboardNavigation = options.timeline.keyboardNavigation;
        timeline.dragHandles = options.timeline.dragHandles;
        timeline.color = options.timeline.color;
        timeline.callback = options.timeline.callback;
        timeline.zoom = options.timeline.zoom;
        isReady = true;

        var xaxis = plot.getAxes().xaxis;

        //ensure the drag handles are within the bounds
        if(timeline.start < xaxis.min) timeline.start = xaxis.min;
        if(timeline.end > xaxis.max) timeline.end = xaxis.max;

        originalStart = xaxis.min;
        originalEnd = xaxis.max;
        originalWidth = originalEnd - originalStart;

        //set the initial start positions
        previousStart = options.timeline.start;
        previousEnd = options.timeline.end;

        createTooltip();

        zoomTimeline();
      }
    }

    function updateCursor(e) {
      var offset = plot.getPlaceholder().offset();
      var plotOffset = plot.getPlotOffset();

      var overlap = 3;
      var minimumRange = 10;
      var mouseX = e.pageX - offset.left;
      var mouseY = e.pageY - offset.top;

      var xaxis = plot.getAxes().xaxis;
      var startPos = xaxis.p2c(timeline.start) + plotOffset.left;
      var endPos = xaxis.p2c(timeline.end) + plotOffset.left;

      var handleWidth = timeline.dragHandles.width;

      //update cursor and set mouseDownAction
      if (mouseX < startPos + overlap && mouseX >= (startPos - (handleWidth + overlap))) {
        plot.getPlaceholder().css('cursor', 'e-resize');
        if (!mouseDown) mouseDownAction = 1;
      } else if (mouseX > (endPos - overlap) && mouseX <= (endPos + (handleWidth + overlap))) {
        plot.getPlaceholder().css('cursor', 'w-resize');
        if (!mouseDown) mouseDownAction = 3;
      } else if (mouseX >= (startPos + overlap) && mouseX < (endPos - overlap)) {
        plot.getPlaceholder().css('cursor', 'move');
        if (!mouseDown) mouseDownAction = 2;
      } else {
        plot.getPlaceholder().css('cursor', 'auto');
        if (!mouseDown) mouseDownAction = 0;
      }

      //clear the timeout
      clearTimeout(dragTimeout);
      if(dragTimeoutBegun === true) {
        hideTooltip();
      }

      if (!mouseDown && timeline.dragHandles.tooltips.enabled !== false && timeline.dragHandles.tooltips.onHover === true) {
        positionTooltip(e.pageX, e.pageY, plot);
      }
      else if (mouseDown && timeline.dragHandles.tooltips.enabled !== false && timeline.dragHandles.tooltips.onDrag === true) {
        positionTooltip(e.pageX, e.pageY, plot);
      } else if(mouseDown && timeline.dragHandles.tooltips.enabled !== false && timeline.dragHandles.tooltips.onDragEnd === true) {
        dragTimeout = setTimeout(function() {
          dragTimeoutBegun = true;
          positionTooltip(e.pageX, e.pageY, plot);
        }, 500);
      }
      else {
        hideTooltip();
      }

      // if we are dragging left handle
      if (mouseDown && mouseDownAction === 1) {

        //set didResize state for zooming
        didResize = true;

        //keep within bounds
        if (mouseX < plotOffset.left) mouseX = plotOffset.left;
        if (mouseX > (endPos - minimumRange)) mouseX = (endPos - minimumRange);
        timeline.start = xaxis.c2p(mouseX - plotOffset.left);
        plot.triggerRedrawOverlay();
      }

      // if we are dragging main overlay
      if (mouseDown && mouseDownAction === 2) {

        //set didResize state for zooming
        didResize = false;

        //keep within bounds
        var diff = dragStart < mouseX ? mouseX - dragStart : ((dragStart - mouseX) * -1);
        var newStart = startPos + diff;
        var newEnd = endPos + diff;
        var width = endPos - startPos;

        //if moving left
        if (diff < 0) {
          if (newStart < plotOffset.left) {
            newStart = plotOffset.left;
            newEnd = newStart + width;
          }
        } else {
          if (newEnd > (plot.width() + plotOffset.left)) {
            newEnd = (plot.width() + plotOffset.left);
            newStart = newEnd - width;
          }
        }

        timeline.start = xaxis.c2p(newStart - plotOffset.left);
        timeline.end = xaxis.c2p(newEnd - plotOffset.left);

        dragStart = mouseX;

        plot.triggerRedrawOverlay();
      }

      //if we are dragging right handle
      if (mouseDown && mouseDownAction === 3) {

        //set didResize state for zooming
        didResize = true;

        //keep within bounds
        if (mouseX > (plot.width() + plotOffset.left)) mouseX = (plot.width() + plotOffset.left);
        if (mouseX < startPos + 10) mouseX = startPos + 10;

        timeline.end = xaxis.c2p(mouseX - plotOffset.left);
        plot.triggerRedrawOverlay();
      }

    }

    function createTooltip() {

      var existingTooltip = document.getElementById("timeline-tooltip");
      if (existingTooltip) {
        tooltip = existingTooltip;
        return;
      }

      //tooltip element
      tooltip = document.createElement("div");
      tooltip.className = "tooltip";
      tooltip.setAttribute("id", "timeline-tooltip");

      //tooltip arrow element
      var tooltipArrow = document.createElement("div");
      tooltipArrow.className = "tooltip-arrow";

      //tooltip contents element
      var tooltipContents = document.createElement("div");
      tooltipContents.className = "tooltip-inner";

      //add elements to tooltip
      tooltip.appendChild(tooltipArrow);
      tooltip.appendChild(tooltipContents);

      tooltip.style.display = 'none';
      tooltip.style.position = 'absolute';
      tooltip.style.pointerEvents = 'none';

      document.body.appendChild(tooltip);
    }

    function getTooltipText(value, axis) {
      if(timeline.dragHandles && timeline.dragHandles.tooltipFormatter) {
        return timeline.dragHandles.tooltipFormatter(value, axis);
      }
      else if(axis.tickFormatter) {
        return axis.tickFormatter(value, axis);
      }
      return value;
    }

    function positionTooltip(x, y, plot) {

      if(mouseDownAction === 0) {
        hideTooltip();
        return;
      }

      var offset = plot.getPlaceholder().offset();
      var plotOffset = plot.getPlotOffset();

      var xaxis = plot.getAxes().xaxis;
      var startPos = xaxis.p2c(timeline.start) + plotOffset.left + offset.left;
      var endPos = xaxis.p2c(timeline.end) + plotOffset.left + offset.left;
      var middle = ((xaxis.p2c(timeline.end) - xaxis.p2c(timeline.start)) / 2) + startPos;

      var startTick = getTooltipText(timeline.start, xaxis);
      var endTick = getTooltipText(timeline.end, xaxis);
      var middleTick = startTick + " - " + endTick;

      var innerTooltip = tooltip.getElementsByClassName("tooltip-inner")[0];
      var tooltipArrow = tooltip.getElementsByClassName("tooltip-arrow")[0];

      tooltip.style.width = '';
      tooltip.style.display = 'block';
      tooltip.style.opacity = 1;
      tooltip.style.zIndex = 100000;

      var tooltipWidth;
      var tooltipHeight;

      innerTooltip.style.maxWidth = '400px';

      if (mouseDownAction === 1) {
        tooltip.className = "tooltip right";
        innerTooltip.innerHTML = startTick;

        //calulate widths and heights as text might have changed them
        tooltipWidth = tooltip.offsetWidth;
        tooltipHeight = tooltip.offsetHeight;

        //reset arrow margin
        tooltipArrow.style.marginLeft = '0';

        //calculate positions
        x = startPos + 10;
        y = (offset.top + (plot.height() / 2)) - (tooltipHeight / 2) + plotOffset.top;
      }
      if (mouseDownAction === 2) {
        tooltip.className = "tooltip top";
        innerTooltip.innerHTML = middleTick;

        //calulate widths and heights as text might have changed them
        tooltipWidth = tooltip.offsetWidth;
        tooltipHeight = tooltip.offsetHeight;

        //calculate x position
        x = middle - (tooltipWidth / 2);

        //if the tooltip will be off screen then change position so it wont be
        if(x < 0) {
          tooltipArrow.style.marginLeft = (x - (tooltipArrow.offsetWidth / 2)) + 'px';
          x = 0;
        } else {
          tooltipArrow.style.marginLeft = -(tooltipArrow.offsetWidth / 2) + 'px';
        }

        y = offset.top - (tooltipHeight / 2) + plotOffset.top;
      }
      if (mouseDownAction === 3) {
        tooltip.className = "tooltip left";
        innerTooltip.innerHTML = endTick;

        //calulate widths and heights as text might have changed them
        tooltipWidth = tooltip.offsetWidth;
        tooltipHeight = tooltip.offsetHeight;

        //calculate x position
        x = endPos - (tooltipWidth + 10);

        if(x < 0) {
          tooltip.style.width = (tooltipWidth + x) + 'px';
          x = endPos - ((tooltipWidth + x) + 10);
          tooltipHeight = tooltip.offsetHeight;
        }

        //reset arrow margin
        tooltipArrow.style.marginLeft = '0';

        y = (offset.top + (plot.height() / 2)) - (tooltipHeight / 2) + plotOffset.top;
      }

      tooltip.style.top = y + 'px';
      tooltip.style.left = x + 'px';
    }

    function hideTooltip() {
      if(tooltip) tooltip.style.display = 'none';
    }

    function enableTextSelection() {
      document.onselectstart = selectionHandler;
    }

    function disableTextSelection() {
      selectionHandler = document.onselectstart;
      document.onselectstart = function() {
        return false
      };
    }

    function selectAction(e) {

      //set drag start value for moving the area
      var offset = plot.getPlaceholder().offset();
      dragStart = e.pageX - offset.left;

      mouseDown = true;
      disableTextSelection();

      //add on mouse up handler to deselect when not over canvas
      mouseUpHandler = document.onmouseup;

      document.onmouseup = function() {
        deselectAction();
        return false;
      };

      //add mouse move handler to allow moving outside of the canvas
      mouseMoveHandler = document.onmousemove;
      document.onmousemove = function(e) {
        updateCursor(e);
        return false;
      };
    }

    function deselectAction(e) {
      mouseDown = false;
      enableTextSelection();
      hideTooltip();

      //restore mouse event handlers
      document.onmouseup = mouseUpHandler;
      document.onmousemove = mouseMoveHandler;

      //timeline zoom
      zoomTimeline();

      //call callback function
      if (timeline.callback)
        timeline.callback({
          start: timeline.start,
          end: timeline.end
        });
    }

    function deselectNoAction() {
      mouseDown = false;
      enableTextSelection();
      hideTooltip();

      //restore mouse event handlers
      document.onmouseup = mouseUpHandler;
      document.onmousemove = mouseMoveHandler;
    }

    function zoomTimeline() {

      //check if zooming is enabled
      if(!timeline.zoom.enabled) return;

      //constant for gap size
      var gapConstant = 30;

      //get x axis
      var xaxis = plot.getAxes().xaxis;

      //get min, max and width of current axis
      var xStart = xaxis.min;
      var xEnd = xaxis.max;
      var xWidth = xEnd - xStart;

      //get min, max and width points on timeline
      var timelineStart = timeline.start;
      var timelineEnd = timeline.end;
      var timelineWidth = timelineEnd - timelineStart;

      //if no resizing took place we may need to move the x axis scale
      if(!didResize) {

        //we are zooming in! now caluclate our gap size
        var gapSize = (timelineWidth / 100) * gapConstant;

        //calculate our new xaxis range
        start = timelineStart - gapSize;
        end = timelineEnd + gapSize;

        updateTimelinePosition(start, end, gapSize);

        //our work is done here
        return;
      }

      //create variables to hold our new start and end positions
      var start, end;

      //determine if we are zooming in or zooming out
      if(timelineStart > previousStart || timelineEnd < previousEnd) {
        //we are zooming in! now caluclate our gap size
        var gapSize = (timelineWidth / 100) * gapConstant;

        //calculate our new xaxis range
        start = timelineStart - gapSize;
        end = timelineEnd + gapSize;

        updateTimelinePosition(start, end, gapSize);

      } else {
        //we are zooming out! now caluclate our gap size
        var gapSize = (timelineWidth / 100) * gapConstant;

        //calculate our new xaxis range
        start = timelineStart - gapSize;
        end = timelineEnd + gapSize;

        updateTimelinePosition(start, end, gapSize);
      }
    }

    function updateTimelinePosition(start, end, gapSize) {

      //get x axis
      var xaxis = plot.getAxes().xaxis;

      //get min and max points on timeline
      var timelineStart = timeline.start;
      var timelineEnd = timeline.end;
      var timelineWidth = timelineEnd - timelineStart;

      //check how we are moving
      if(!didResize) {
        //if there is overlap dont change range
        if(start < originalStart) {
          end += (originalStart - start);
          start = originalStart;

          if(end > originalEnd) {
            end = originalEnd;
          }
        }
        if(end > originalEnd) {
          start += (originalEnd - end);
          end = originalEnd;

          if(start < originalStart) {
            start = originalStart;
          }
        }
      }
      else if(timelineStart !== previousStart) {

        //ensure timeline range is greater than minimumRange
        if(timelineWidth < timeline.zoom.minimumRange) {
          timeline.start = timeline.end - timeline.zoom.minimumRange;
          plot.triggerRedrawOverlay();

          //call callback function
          if (timeline.callback) timeline.callback({ start: timeline.start, end: timeline.end });
          zoomTimeline();
          return;
        }

        //if one end is as far as it can go, place extra space on the other side
        if(end > originalEnd) {
          end = originalEnd;
          start -= gapSize;
        }

        //we are moving the left handle
        if(start < originalStart) {
          end += (originalStart - start);
          start = originalStart;

          if(end > originalEnd) {
            end = originalEnd;
          }
        }
        if(end > originalEnd) end = originalEnd;
      }
      else if(timelineEnd !== previousEnd) {

        //ensure timeline range is greater than minimumRange
        if(timelineWidth < timeline.zoom.minimumRange) {
          timeline.end = timeline.start + timeline.zoom.minimumRange;
          plot.triggerRedrawOverlay();

          //call callback function
          if (timeline.callback) timeline.callback({ start: timeline.start, end: timeline.end });
          zoomTimeline();
          return;
        }

        //if one end is as far as it can go, place extra space on the other side
        if(start < originalStart) {
          start = originalStart;
          end += gapSize;
        }

        if(end > originalEnd) {
          start += (originalEnd - end);
          end = originalEnd;

          if(start < originalStart) {
            start = originalStart;
          }
        }
      } else {

        if(start < originalStart) {
          end += (originalStart - start);
          start = originalStart;

          if(end > originalEnd) {
            end = originalEnd;
          }
        }

        if(end > originalEnd) {
          start += (originalEnd - end);
          end = originalEnd;

          if(start < originalStart) {
            start = originalStart;
          }
        }

        if(start < originalStart) start = originalStart;
        if(end > originalEnd) end = originalEnd;
      }

      //update the 'previous' values for next time round
      previousStart = timelineStart;
      previousEnd = timelineEnd;

      //update our x axis
      xaxis.options.min = start;
      xaxis.options.max = end;

      //reset did resize - assume we arent by default
      didResize = false;

      plot.setupGrid();
			plot.draw();
    }

    function keyboardNavigation(e) {
      var xaxis = plot.getAxes().xaxis;
      var xmin = xaxis.min;
      var xmax = xaxis.max;
      var xwidth = (xmax - xmin) / 10;

      // Check if anything input-like is focussed.
      if ($(document.activeElement).is(":input")) return;

      switch (e.keyCode) {
        case 37:
          var width = timeline.end - timeline.start;
          var step = xwidth / (xwidth / width);
          //set the new starting position
          timeline.start -= step;

          //ensure within bounds
          if (timeline.start < xmin) timeline.start = xmin;

          //set end position
          timeline.end = timeline.start + width;

          //redraw chart
          plot.triggerRedrawOverlay();

          //fire callback
          if (timeline.callback)
            timeline.callback({
              start: timeline.start,
              end: timeline.end
            });
          break;

        case 39:
          var width = timeline.end - timeline.start;
          var step = xwidth / (xwidth / width);

          //set the new end position
          timeline.end += step;

          //ensure within bounds
          if (timeline.end > xmax) timeline.end = xmax;

          //set start position
          timeline.start = timeline.end - width;

          //redraw chart
          plot.triggerRedrawOverlay();

          //fire callback
          if (timeline.callback)
            timeline.callback({
              start: timeline.start,
              end: timeline.end
            });
          break;
      }

      //timeline zoom
      zoomTimeline();
    }

    function drawOverlay(plot, ctx) {
      var options = plot.getOptions();

      //make sure we only draw if the chart is a timeline chart and is enabled
      if (!options || !options.timeline || (options.timeline && !options.timeline.enabled)) return;

      var plotOffset = plot.getPlotOffset();

      ctx.save();

      ctx.translate(plotOffset.left, plotOffset.top);

      ctx.clearRect(0, 0, plot.width(), plot.height());

      var overlayColor = $.color.parse(timeline.color);
      var handleColor = $.color.parse(timeline.dragHandles.color);

      ctx.fillStyle = overlayColor;
      ctx.fill();

      var xaxis = plot.getAxes().xaxis;

      //ensure we have valid start and end points
      if (!timeline.start) {
        timeline.start = xaxis.min;
      }
      if (!timeline.end) {
        timeline.end = xaxis.max;
      }

      var startPos = xaxis.p2c(timeline.start);
      var endPos = xaxis.p2c(timeline.end);

      var minPos = xaxis.p2c(xaxis.min);
      var maxPos = xaxis.p2c(xaxis.max);

      //ensure the handles are in the correct positions
      if(startPos < minPos) startPos = minPos;
      if(endPos > maxPos) endPos = maxPos;

      //ensure we have the correct end point
      if(endPos > (plot.width() + plotOffset.left)) {
        endPos = plot.width() + plotOffset.left;
      }

      //make sure if canvas size has changed then we are aware
      var plotPlaceholder = plot.getPlaceholder();
      var placeholderWidth = plotPlaceholder.width();

      var maxPosOffset = placeholderWidth - (plotOffset.left + plotOffset.right);

      //ensure position on canvas is correct
      if(endPos > maxPosOffset) endPos = maxPosOffset;

      var width = endPos - startPos;
      var height = plot.height();

      ctx.fillRect(startPos, 0, width, height);

      var handleWidth = timeline.dragHandles.width;

      //set handle color
      ctx.fillStyle = handleColor;
      ctx.fill();

      //left drag handle
      ctx.fillRect(startPos - handleWidth, 0, handleWidth, height);

      //right drag handle
      ctx.fillRect(endPos, 0, handleWidth, height);

      ctx.restore();
    }

    plot.hooks.bindEvents.push(function(plot, canvas) {
      var options = plot.getOptions();

      if (options && options.timeline.enabled) {
        canvas.mousemove(updateCursor);
        canvas.mousedown(selectAction);
        canvas.mouseleave(hideTooltip);

        //we need to hide any tooltips on scroll
        document.addEventListener("scroll", deselectNoAction);

        if (options.timeline.keyboardNavigation !== false) {
          $(document).keydown(keyboardNavigation);
        }
      }
    });

    plot.hooks.draw.push(function(plot, ctx) {
        plot.triggerRedrawOverlay();
    });

    plot.hooks.drawOverlay.push(function(plot, ctx) {
      var options = plot.getOptions();

      if (options && options.timeline.enabled) {
        if (!isReady) setup(plot.getOptions());

        drawOverlay(plot, ctx);
      }
    });

    plot.hooks.shutdown.push(function(plot, canvas) {
      var options = plot.getOptions();

      if (options && options.timeline.enabled) {
        canvas.unbind("mousemove", updateCursor);
        canvas.unbind("mousedown", selectAction);
        canvas.unbind("mouseleave", hideTooltip);

        //unbind scroll event
        document.removeEventListener("scroll", deselectNoAction);

        if (options.timeline.keyboardNavigation !== false) {
          $(document).unbind("keydown", keyboardNavigation);
        }
      }
    });

  }

  $.plot.plugins.push({
    init: init,
    options: {
      timeline: {
        enabled: false,
        color: "rgba(97,71,103,0.2)",
        start: null,
        end: null,
        keyboardNavigation: true,
        dragHandles: {
          width: '5',
          color: 'rgb(97,71,103)'
        },
        callback: null
      }
    },
    name: 'timeline',
    version: '1.0'
  });

})(jQuery);
