splitter.$inject = ["$compile", "$timeout"];

export default function splitter($compile, $timeout) {
    return {
        restrict: "E",
        template: require('./splitter.html'),
        transclude: true,
        replace: true,
        scope: {
            direction: '@',
            gutterSize: '@?',
            snapOffset: '@?',
            onDrag: '=?',
            onDragStart: '=?',
            onDragEnd: '=?',
            reinitialize: '=?'
        },
        link: function (scope, element) {

            var container, panels, horizontal, gutter, options, dragHandle, ratio, parentHeight, parentWidth, height, width, sidePanelW, sidePanelH;

            function init() {
                //get splitter container element
                container = element[0];

                //get splitter panels
                panels = getPanels();

                //get direction
                horizontal = scope.direction !== 'vertical';

                //set the orientation class
                element.addClass(horizontal ? 'horizontal' : 'vertical');

                Split(panels, getOptions());

                //Add a side-inset panel style toggle button
                setUpToggleButton();
            }
            scope.reinitialize = function () {
                element.children(".gutter").remove();
                init();
            };

            $timeout(init);

            /*
              Convert HTML Collection to array
            */
            function getPanels() {

                //get panels - but only immediate children!
                var children = container.children;

                var output = [];

                for (var i = 0; i < children.length; i++) {
                    var child = angular.element(children[i]);

                    if (child.hasClass('splitter-panel')) {
                        var panel = children[i];

                        //Check if the panel should be hidden
                        //This attribute is also used in the plugin and panels hidden here will be exempt from width/height calculations
                        if (panel.attributes.getNamedItem("splitter-panel-collapsed")) {

                            //Record the 'display' value
                            panel._display = panel.style.display;

                            //Hide the panel
                            panel.style.display = "none";
                        } else if (angular.isDefined(panel._display)) {
                            //Panel was previously hidden and needs to be shown

                            //If the last value was the default, then revert to that default
                            if (panel._display === "") {
                                panel.style.removeProperty("display");
                            } else {
                                //Otherwise maybe there was a deliberate value we should respect
                                panel.style.display = panel._display;
                            }
                        }

                        output.push(panel);
                    }
                }

                return output;
            }

            /*
              Generate the options object based on specified settings
            */
            function getOptions() {
                options = {};

                //mandatory options
                options.direction = horizontal ? 'horizontal' : 'vertical';
                options.sizes = getPanelSizes();
                options.minSize = getMinimumSizes();
                options.gutterSize = parseInt(scope.gutterSize) || 10;

                //optional options
                if (scope.snapOffset) options.snapOffset = parseInt(scope.snapOffset);
                if (scope.onDrag) options.onDrag = scope.onDrag;
                if (scope.onDragStart) options.onDragStart = scope.onDragStart;
                if (scope.onDragEnd) options.onDragEnd = scope.onDragEnd;

                return options;
            }

            /*
              Get all the sizes specified for each panel
            */
            function getPanelSizes() {
                var sizes = [];

                panels.forEach(function (panel) {

                    //get sizes
                    var size = panel.hasAttribute('size') ? parseInt(panel.getAttribute('size')) : null;

                    //if size is not specified - throw an error - it is required
                    if (!size) throw new Error('Splitter - All panels must have size specified');

                    //store these values to use in options
                    sizes.push(size);
                });
                return sizes;
            }

            /**
             * Get the size of the main panel
             */
            function getMainPanelSize() {

                let match;

                panels.forEach(panel => {
                    if (panel.hasAttribute('splitter-main')) {
                        match = panel;
                    }
                });

                return match ? match.getAttribute('size') : 0;
            }

            /**
             * Get the size of the side panel
             */
            function getSidePanelSize() {

                let match;

                panels.forEach(panel => {
                    if (panel.hasAttribute('splitter-side')) {
                        match = panel;
                    }
                });

                return match ? match.getAttribute('size') : 0;
            }

            /*
              Get all the minimum sizes for the panels
            */
            function getMinimumSizes() {
                var minSizes = [];

                panels.forEach(function (panel) {
                    var minSize = panel.hasAttribute('min-size') ? parseInt(panel.getAttribute('min-size')) : 100;
                    minSizes.push(minSize);
                });

                return minSizes;
            }

            /*
              Add a toggle to the mainpanel
            */
            function setUpToggleButton() {

                var mainPanel, sidePanel;

                panels.forEach(function (panel, index) {

                    if (panel.hasAttribute('splitter-side')) {
                        sidePanel = angular.element(panel);
                        sidePanel._index = index;
                        sidePanel[0].style.float = "none";
                    }

                    if (panel.hasAttribute('splitter-main')) {
                        mainPanel = angular.element(panel);
                        mainPanel._index = index;
                        mainPanel[0].style.float = "none";
                    }
                });

                if (mainPanel && sidePanel) {
                    gutter = getGutter(mainPanel._index, sidePanel._index, panels.length);
                    createToggleButton(mainPanel, sidePanel, panels.length);
                }
            }

            /*
              Create a toggle for the side panel
            */
            function createToggleButton(mainPanel, sidePanel) {

                var toggleDirection;

                options = getOptions();

                //Prevent the panel from sliding below the container
                container.style.overflow = "hidden";

                //Find out if the toggle switch should face left or right/top or bottom
                if (options.direction === "horizontal") {
                    //Prevent the panel from sliding below the container
                    container.style.display = "flex";
                    toggleDirection = (mainPanel._index < sidePanel._index) ? "right" : "left";
                } else {
                    toggleDirection = (mainPanel._index < sidePanel._index) ? "bottom" : "top";
                }

                //Set the splitter CSS
                scope.splitterPositionClass = toggleDirection;

                //Create a toggle button
                var toggle = angular.element('<div class="side-inset-splitter-toggle-container ' + scope.splitterPositionClass + '"><div class="side-inset-splitter-toggle"><a class="hpe-icon"></a></div></div>');

                //Add the toggle button to the main panel
                dragHandle = gutter[0].querySelector(".drag-handle");
                dragHandle.classList.add("hidden-drag-handle");
                if (scope.splitterPositionClass === "top" || scope.splitterPositionClass === "left")
                    toggle.insertAfter(gutter);
                else
                    toggle.insertBefore(gutter);

                //Remember the toggle state
                var toggleState = "collapsed";
                //Start with the gutter hidden
                hideGutter();
                //Set the right direction for the toggle button
                if (options.direction === "horizontal") {
                    //Start with the side panel collapsed
                    collapseSidePanel(mainPanel, sidePanel);
                    toggleButtonIcon(toggle, toggleDirection === "right" ? "hpe-previous" : "hpe-next");
                    ratio = null;
                } else {
                    //Start with the side panel collapsed
                    collapseSidePanel(mainPanel, sidePanel, true);
                    toggleButtonIcon(toggle, toggleDirection === "bottom" ? "hpe-up" : "hpe-down");
                    ratio = null;
                }

                //The transitions will only be added temporarily when the toggle is clicked
                mainPanel.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
                    removeTransitionClasses(mainPanel);
                });
                sidePanel.on("webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend", function () {
                    removeTransitionClasses(sidePanel);
                });

                toggle.on('mousedown', function (event) {
                    event.stopPropagation();
                });

                //Bind the click logic for the toggle button
                toggle.on("click", function () {

                    addTransitionClasses(mainPanel, sidePanel);

                    if (toggleState === "collapsed") {
                        toggleState = "expanded";
                        showGutter();
                        toggleButtonIcon(toggle);
                        expandSidePanel(mainPanel, sidePanel);
                        return;
                    }
                    if (toggleState === "expanded") {
                        toggleState = "collapsed";
                        hideGutter();
                        toggleButtonIcon(toggle);
                        collapseSidePanel(mainPanel, sidePanel);
                        return;
                    }
                });
            }

            function addTransitionClasses(mainPanel, sidePanel) {
                if (options.direction === "horizontal") {
                    mainPanel[0].style.transition = "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
                    sidePanel[0].style.transition = "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
                } else {
                    mainPanel[0].style.transition = "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
                    sidePanel[0].style.transition = "height 0.4s cubic-bezier(0.4, 0, 0.2, 1)";
                }
            }

            function removeTransitionClasses(elem) {
                elem[0].style.transition = "";
            }

            function toggleButtonIcon(toggle, iconClass) {
                //Find the <a> element with our icon
                var icon = toggle.find("a");

                //If this method was called with a class then use it
                if (iconClass) {
                    icon.addClass(iconClass);
                    return;
                }

                if (options.direction === "horizontal") {
                    //Otherwise toggle 'next' to 'previous'
                    if (icon.hasClass("hpe-next")) {
                        icon.removeClass("hpe-next");
                        icon.addClass("hpe-previous");
                        return;
                    }

                    //Or 'previous' to 'next'
                    if (icon.hasClass("hpe-previous")) {
                        icon.removeClass("hpe-previous");
                        icon.addClass("hpe-next");
                        return;
                    }
                } else {
                    //Otherwise toggle 'up' to 'down'
                    if (icon.hasClass("hpe-up")) {
                        icon.removeClass("hpe-up");
                        icon.addClass("hpe-down");
                        return;
                    }

                    //Or 'down' to 'up'
                    if (icon.hasClass("hpe-down")) {
                        icon.removeClass("hpe-down");
                        icon.addClass("hpe-up");
                        return;
                    }
                }

            }

            function hideGutter() {
                gutter.data("originalWidth", gutter.width());
                gutter.data("originalHeight", gutter.height());
                gutter.width("0");
                gutter.height("0");
            }

            function showGutter() {
                if (options.direction === "horizontal") {
                    gutter.width(gutter.data("originalWidth"));
                } else {
                    gutter[0].style.width = "100%";
                }
                gutter.height(gutter.data("originalHeight"));
            }

            function getGutter(mainPanelIndex, sidePanelIndex) {
                var gutterIndex = 0;
                if (sidePanelIndex > mainPanelIndex) {
                    //side panel to the right of main panel
                    gutterIndex = sidePanelIndex - 1;
                }
                return element.find(".gutter").eq(gutterIndex);
            }

            function getWidths(mainPanel, sidePanel) {
                parentWidth = mainPanel.parent().outerWidth();

                width = (parentWidth / 100) * getMainPanelSize();
                sidePanelW = sidePanel ? (parentWidth / 100) * getSidePanelSize() : parentWidth - width;
            }

            function getHeights(mainPanel, sidePanel) {
                parentHeight = mainPanel.parent().outerWidth();

                height = (parentHeight / 100) * getMainPanelSize();
                sidePanelH = sidePanel ? (parentHeight / 100) * getSidePanelSize() : parentHeight - height;
            }

            function collapseSidePanel(mainPanel, sidePanel, initial) {

                if (options.direction === "horizontal") {
                    //get the sizes
                    getWidths(mainPanel, sidePanel);

                    //calculate how the sizes should be split when we expand again
                    ratio = mainPanel.outerWidth() / (mainPanel.outerWidth() + sidePanel.outerWidth());

                    //get the percentage the of the splitter the main panel should fill
                    var percentageWidth = ((width + sidePanelW + options.gutterSize) / (parentWidth)) * 100;

                    //set the styles
                    sidePanel[0].style.overflowY = "hidden";
                    sidePanel[0].style.width = "0";
                    mainPanel[0].style.width = percentageWidth + "%";


                } else {
                    //get the sizes
                    getHeights(mainPanel, sidePanel);

                    //calculate how the sizes should be split when we expand again
                    ratio = mainPanel.outerHeight() / (mainPanel.outerHeight() + sidePanel.outerHeight());

                    var percentageHeight;
                    //calculate the percentage of the splitter the main panel should fill
                    if (getPanels().length > 2) {
                        percentageHeight = ((height + sidePanelH + options.gutterSize / 2) / parentHeight) * 100;
                    } else {
                        percentageHeight = ((height + sidePanelH + options.gutterSize) / parentHeight) * 100;
                    }

                    //set the styles
                    sidePanel[0].style.overflowY = "auto";
                    sidePanel[0].style.width = "100%";
                    sidePanel[0].style.height = "0";
                    //we dont want to set this the first time the page loads and there are more than 2 panels
                    if (initial && getPanels().length > 2) {
                        percentageHeight = ((height + options.gutterSize / 2) / parentHeight) * 100;
                    }
                    mainPanel[0].style.height = percentageHeight + "%";
                }
                dragHandle.classList.add("hidden-drag-handle");
            }

            function expandSidePanel(mainPanel, sidePanel) {

                if (options.direction === "horizontal") {
                    //get the sizes
                    getWidths(mainPanel);

                    //calculate the percentage the panels need to fill
                    var percentageWidth = ((width - options.gutterSize) / parentWidth) * 100;

                    //set the styles
                    sidePanel[0].style.overflowY = "auto";

                    if (ratio) {
                        mainPanel[0].style.width = (((parentWidth * ratio) / parentWidth) * 100) + "%";
                        sidePanel[0].style.width = (((parentWidth * (1 - ratio)) / parentWidth) * 100) + "%";
                    } else {
                        //initially they are split to the specified sizes
                        mainPanel[0].style.width = percentageWidth + "%";
                        sidePanel[0].style.width = (100 - percentageWidth) + "%";
                    }

                } else {
                    //get the sizes
                    getHeights(mainPanel);
                    //calculate the percentage the panels need to fill
                    var percentageHeight;
                    if (getPanels().length > 2) {
                        percentageHeight = ((height - options.gutterSize / 2) / parentHeight) * 100;
                    } else {
                        percentageHeight = ((height - options.gutterSize) / parentHeight) * 100;
                    }

                    //set the styles
                    sidePanel[0].style.overflowY = "auto";
                    sidePanel[0].style.width = "100%";

                    if (ratio) {
                        mainPanel[0].style.height = (((parentHeight * ratio) / parentHeight) * 100) + "%";
                        sidePanel[0].style.height = (((parentHeight * (1 - ratio)) / parentHeight) * 100) + "%";
                    } else {
                        //initially they are split to the specified sizes
                        mainPanel[0].style.height = percentageHeight + "%";
                        sidePanel[0].style.height = (100 - percentageHeight) + "%";
                    }

                }
                dragHandle.classList.remove("hidden-drag-handle");
            }
        }
    };
}