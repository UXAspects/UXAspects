//UX Aspects - Flot label resize fix - allow to specify minimum distance between labels

(function($) {
  var options = {
    grid: {}
  };

  function init(plot) {

    //store is ready state
    var isReady = false;

    function onResize() {

      //get options - we may not need to do anything
      var options = plot.getOptions();

      // if not enabled then do nothing
      if(!options.grid.preventOverlap) return;

      //get surface object - has cache we need to clear
      var surface = plot.getSurface();

      //if no surface there isnt anything we can do
      if(!surface || !surface.textContainer) return;

      //get axis
      var xaxis = surface.textContainer[0].getElementsByClassName('flot-x-axis');
      var yaxis = surface.textContainer[0].getElementsByClassName('flot-y-axis');

      //remove all x-axis labels
      for (x = 0; x < xaxis.length; x++) {
        var axis = xaxis[x];
        while(axis.hasChildNodes()) axis.removeChild(axis.lastChild);
      }

      //remove all y-axis labels
      for (y = 0; y < yaxis.length; y++) {
        var axis = yaxis[y];
        while(axis.hasChildNodes()) axis.removeChild(axis.lastChild);
      }

      //clear cache - forces redrawing of labels - correct size and position
      surface._textCache = {};

      //resize and redraw grid
      plot.resize();
      plot.setupGrid();
      plot.draw();

      //get label spacing value
      var labelSpacing = 5;

      //lets go through each x axis
      for (x = 0; x < xaxis.length; x++) {

        //lets get all the labels
        var labelElements = xaxis[x].getElementsByClassName('tickLabel');

        //convert html collection to array
        var labels = [];

        for(var i = 0; i < labelElements.length; i++) {
          labels.push(labelElements[i]);
        }

        //now sort array based on position
        labels.sort(function(a, b) {

          if(a.offsetLeft < b.offsetLeft) return -1;
          if(a.offsetLeft > b.offsetLeft) return 1;

          //should never be 0 but here just in case
          return 0;
        });

        //go through all the labels (except the last one) and adjust spacing
        for(var l = 0; l < labels.length; l++) {

          //get current label, previous and next one
          var currentLabel = labels[l];
          var previousLabel = l > 0 ? labels[l - 1] : null;
          var nextLabel = l < labels.length ? labels[l + 1] : null;

          //calculate the end position of the previous label
          var previousEnd = previousLabel ? previousLabel.offsetLeft + previousLabel.offsetWidth : null;

          //calculate the positions of current label
          var currentStart = currentLabel.offsetLeft;
          var currentEnd = currentLabel.offsetLeft + currentLabel.offsetWidth;

          var currentWidth = currentEnd - currentStart;
          var currentMidpoint = currentStart + (currentWidth / 2);

          var newWidth = currentWidth;

          //calculate starting position of the next label
          var nextStart = nextLabel ? nextLabel.offsetLeft : null;

          //calculate the distance between the two
          var distance = nextStart - currentEnd;

          //if there is a previous label then check for overlap
          if(previousLabel && previousEnd) {

            var previousDistance = currentStart - previousEnd;
            var previousOverlap = labelSpacing - previousDistance;

            //if there is overlap then move and resize the label
            if(previousOverlap > 0) {
              newWidth -= previousOverlap;
            }
          }

          //if there is a next label then check for overlap
          if(nextLabel && nextStart) {

            var nextDistance = nextStart - currentEnd;
            var nextOverlap = labelSpacing - nextDistance;

            //if there is overlap then move and resize the label
            if(nextOverlap > 0) {
              newWidth -= nextOverlap;
            }
          }

          if(newWidth < currentWidth) {
            currentStart += ((currentWidth - newWidth) / 2);
          }
          else if(currentWidth < newWidth) {
            currentStart -= ((newWidth - currentWidth) / 2);
          }

          currentLabel.style.left = currentStart + 'px';
          currentLabel.style.maxWidth = newWidth + 'px';

        }

      }
    }

    //call this function on chart load to perform initial label alteration
    function ready() {
      if(!isReady) {
        //perform initially to add padding
        onResize();

        //change state so this wont happen every time overlay is requested
        isReady = true;
      }
    }

    //bind to placeholder resize event
    function bindEvents(plot, eventHolder) {
      plot.getPlaceholder().resize(onResize);
    }

    // clean up after we are done
    function shutdown(plot, eventHolder) {
      plot.getPlaceholder().unbind("resize", onResize);
    }

    //bind to events
    plot.hooks.bindEvents.push(bindEvents);
    plot.hooks.drawOverlay.push(ready);
    plot.hooks.shutdown.push(shutdown);
  }

  $.plot.plugins.push({
    init: init,
    options: options,
    name: 'labelspacing',
    version: '1.0'
  });
})(jQuery);
