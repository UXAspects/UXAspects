displayPanel.$inject = ["$templateRequest", "$q", "$compile", "$timeout", "$displayPanel", "$document", "$rootScope", "$window"];

export default function displayPanel($templateRequest, $q, $compile, $timeout, $displayPanel, $document, $rootScope, $window) {
    return {
        restrict: 'A',
        template: require('./displayPanel.html'),
        link: function(scope, element) {

            var nativeElement = element[0];
            var displayPanel = nativeElement.querySelector(".display-panel");
            var affixDisplayPanel = new AffixDisplayPanel(displayPanel, scope.modalOpt);

            if (scope.modalOpt.animate) {
                //animate in from the right
                displayPanel.style.transform = "translate(110%)";

                displayPanel.classList.add("display-panel-animate");

                $timeout(function() {
                    displayPanel.style.transform = "translate(0)";
                });
            }

            // once the panel appears update its position
            $timeout(()=> {
              affixOnScrollEventHandler();
            });

            scope.close = function() {
                $displayPanel.close(scope.modalOpt);
            };

            //go to next item
            scope.next = function() {
                $rootScope.$broadcast("$displayPanelNext");
            };

            //go to previous item
            scope.previous = function() {
                $rootScope.$broadcast("$displayPanelPrevious");
            };

            //watch for top changing
            scope.$watch("modalOpt.top", function() {
                scope.top = scope.modalOpt.top + "px";
            });

            //close the panel if click is not on the items or the display panel
            $document.on('mouseup', clickOutsidePanel);

            scope.$on("$destroy", function() {
                $document.off('click', clickOutsidePanel);
                $window.removeEventListener('scroll', affixOnScrollEventHandler);
            });

            $window.addEventListener('scroll', affixOnScrollEventHandler);

            function affixOnScrollEventHandler() {
                affixDisplayPanel.currentScrollPosition = $window.pageYOffset;

                if ($displayPanel.panelOpen() && !$displayPanel.panelHidden()) {
                    affixDisplayPanel.update();
                }
            }

            function clickOutsidePanel(event) {

                var target = event.target;

                if ($displayPanel.panelOpen() && !$displayPanel.panelHidden() && angular.element(target).closest(".display-panel").length < 1) {

                    var closePanel = true;
                    while (target && target.nodeName !== "BODY") {
                        if (isDisplayPanelItem(target)) {
                            closePanel = false;
                            break;
                        } else {
                            target = target.parentNode;
                        }
                    }

                    if (closePanel) {
                        $displayPanel.close(scope.modalOpt);
                    }
                }
            }

            function isDisplayPanelItem(target) {
                
                if (!target.hasAttribute) {
                    return false;
                }
                
                if (target.hasAttribute("display-panel-item")) {
                    return true;
                }
                // If opened by the service, check the element passed into the open function
                var sourceElement = $displayPanel.getCurrentPanel();
                if (sourceElement && sourceElement.is && sourceElement.has(target).length > 0) {
                    return true;
                }
                return false;
            }
        }
    };
}

/*
  Class to handle affixing of the panel
*/
class AffixDisplayPanel {

    constructor(displayPanel, options) {

        // Display Panel - operations are performed here.
        this.displayPanel = displayPanel;
        //check whether element is fixed.
        this.affixed = false;
        // check if the triggerelement is set
        this.triggerSet = false;
        //update the trigger only once.
        this.trigger = 0;

        // store the modal options
        this.options = options;
        
        // // keep track of the last scroll position to determine if it has changed
        this.previousScrollPosition = 0;
        // //current scrollPosition - will be updated by event handler outside this object
        this.currentScrollPosition = 0;

        this.reference = document.querySelector(options.reference);
    }

    updateTrigger(element) {
        if (this.triggerSet === false) {
            this.triggerSet = true;
            this.trigger = this.options && this.options.top ? this.options.top : element.offsetTop;
        }
        return this.trigger;
    }

    /*
     * # Updates the element
     * decides whether the object should be stuck or not
     * will only execute if the scroll position has changed.
     */

    update() {

        if (this.currentScrollPosition !== this.previousScrollPosition) {

            if (this.displayPanel !== undefined) {

                var trigger = this.updateTrigger(this.displayPanel);

                if (this.currentScrollPosition > trigger) {
                    
                    if (!this.displayPanel.classList.contains('affix-element')) {
                        // set the top position of the element
                        if(this.reference){
                            this.displayPanel.style.top = this.reference.offsetHeight + 'px';
                        } else {

                            let newTop = this.trigger - this.currentScrollPosition;
                            if (newTop < 0 ){
                                newTop = 0;
                            }
                            this.displayPanel.style.top = newTop + 'px';
                        }
                        
                    } else {
                        // update the top position
                        this.displayPanel.style.top = (this.displayPanel.offsetTop + this.displayPanel.scrollHeight) + 'px';

                    }

                    this.affixed = true;

                } else if (this.currentScrollPosition <= trigger) {

                    // restore the top position
                    if (this.reference) {
                        this.displayPanel.style.top = this.reference.offsetHeight + 'px';
                    } else {
                        let newTop = this.trigger - this.currentScrollPosition;
                        if (newTop < 0 ){
                            newTop = 0;
                        }
                        this.displayPanel.style.top = newTop + 'px';

                        // reset affixed state and trigger values
                        this.affixed = false;
                        this.triggerSet = false;
                        this.trigger = 0;
                    }
                    
                }
            }
            this.previousScrollPosition = this.currentScrollPosition;
        }
    }
}