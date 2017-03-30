/*
    UX Aspects Scrollable Bar Chart Flot plugin
    v1.0
*/

(function($) {
  var options = {
    xaxis: {
      scrollable: {
        enabled: false,
        range: null,
        lowerBound: null,
        upperBound: null,
        color: '#614767',
        callback: null
      }
    }
  };


  function init(plot) {

    var element;
    var leftButton, rightButton;

    //options
    var range, lowerBound, upperBound, buttonColor, callback;

    //constants
    var BUTTON_SIZE = 25, INDENTATION = 7;

    function processOptions(plot, options) {
      //store the values globally
      var options = plot.getXAxes()[0].options.scrollable;

      //if scrolling is not enabled, no point
      if(!options.enabled) return;

      //get and store each option
      range = options.range;
      lowerBound = options.lowerBound;
      upperBound = options.upperBound;
      buttonColor = options.color;
      callback = options.callback;

      //inform dev if missing options
      if(!range) console.log('Scrollable Chart - Please specify a range.');
      if(!lowerBound) console.log('Scrollable Chart - Please specify a lower bound.');
      if(!upperBound) console.log('Scrollable Chart - Please specify an upper bound.');

      //get the current start position
      var min = Math.max(plot.getXAxes()[0].options.min, lowerBound);

      //set the max according to the min and range
      var max = Math.min(min + range, upperBound);

      //update values
      plot.getXAxes()[0].options.min = min;
      plot.getXAxes()[0].options.max = max;

    }

    function drawOverlay(plot, canvas) {
      //if scrolling is not enabled we dont need to do any more
      if(!plot.getXAxes()[0].options.scrollable.enabled) return;

      //store element
      element = $(plot.getCanvas()).parent()[0];

      //if buttons havent been drawn then we need to add them
      if(!buttonsDrawn()) createButtons();

    }

    function buttonsDrawn() {
      //check if chart has buttons drawn already
      return $(element).find('.flot-chart-scroll').length > 0;
    }

    function createButtons() {

      //ensure we have the info we need and buttons arent already drawn
      if (!element) return;

      //create left button elements
      leftButton = document.createElement('div');
      var leftIcon = document.createElement('i');

      //create right button elements
      rightButton = document.createElement('div');
      var rightIcon = document.createElement('i');

      //set styling
      leftButton.className = "flot-chart-scroll";
      rightButton.className = "flot-chart-scroll";
      leftIcon.className = "left";
      rightIcon.className = "right";

      //calculate button positions
      var plotOffset = plot.getPlotOffset();
      var leftButtonOffset = plotOffset.left + INDENTATION;
      var rightButtonOffset = plotOffset.right + INDENTATION;

      //calculate vertical center
      var verticalCenter = ((plot.height() / 2) - (BUTTON_SIZE / 2)) + plotOffset.top;

      //set button size
      leftButton.style.width = BUTTON_SIZE + 'px';
      rightButton.style.width = BUTTON_SIZE + 'px';

      //set button positions
      leftButton.style.left = leftButtonOffset + 'px';
      leftButton.style.top = verticalCenter + 'px';
      leftButton.style.float = 'left';

      rightButton.style.right = rightButtonOffset + 'px';
      rightButton.style.top = verticalCenter + 'px';
      rightButton.style.float = 'right';

      //set colours
      leftButton.style.backgroundColor = buttonColor;
      rightButton.style.backgroundColor = buttonColor;

      //attach event handlers
      leftButton.addEventListener('click', scrollLeft);
      rightButton.addEventListener('click', scrollRight);

      //add icons to buttons
      leftButton.appendChild(leftIcon);
      rightButton.appendChild(rightIcon);

      //add buttons to containers
      element.appendChild(leftButton);
      element.appendChild(rightButton);

      //update the button visibility
      buttonVisibility();
    }

    function updateRange(min, max) {

      plot.getXAxes()[0].options.min = min;
      plot.getXAxes()[0].options.max = max;

      //get chart data and options
      var data = plot.getData();
      var options = plot.getOptions();

      plot.shutdown();
      plot.destroy();

      //now recreate the chart
      plot = $.plot(element, data, options);

      //recreate buttons
      createButtons();

      //update button visibility
      buttonVisibility();

      if(callback) callback({ start: min, end: max });
    }

    function scrollLeft() {
      var min = Math.max(plot.getXAxes()[0].options.min - range, lowerBound);
      var max = Math.min(min + range, upperBound);

      updateRange(min, max);
    }

    function scrollRight() {
      var max = Math.min(plot.getXAxes()[0].options.max + range, upperBound);
      var min = Math.max(max - range, lowerBound);

      updateRange(min, max);
    }

    function buttonVisibility() {
      var min = Math.ceil(plot.getXAxes()[0].options.min);
      var max = Math.ceil(plot.getXAxes()[0].options.max);

      if(min <= Math.ceil(lowerBound)) leftButton.style.display = 'none';
      else leftButton.style.display = 'block';


      if(max >= Math.ceil(upperBound)) rightButton.style.display = 'none';
      else rightButton.style.display = 'block';

    }

    plot.hooks.processOptions.push(processOptions);
    plot.hooks.drawOverlay.push(drawOverlay);
  }

  $.plot.plugins.push({
    init: init,
    options: options,
    name: 'scrollable',
    version: '1.0'
  });
})(jQuery);
