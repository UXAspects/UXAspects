previewPaneItem.$inject = ["keyboardService", "$timeout"];

export default function previewPaneItem(keyboardService, $timeout) {
    return {
        restrict: "A",
        controller: "PreviewPaneItemCtrl as pptc",
        scope: true,
        link: function(scope, element, attrs, ctrl) {
            scope.keydownSelect = scope.$eval(attrs.keydownSelect);

            let preselected = scope.$eval(attrs.preselected);

            var KEYS = {
                UP: 38,
                DOWN: 40,
                PAGEUP: 33,
                PAGEDOWN: 34,
                HOME: 36,
                END: 35,
                ESC: 27,
                ENTER: 13
            };

            // listen for this item getting selected externally
            scope.$on('$previewPaneItemSelect', (event, data) => {
              let index = element.index();
              let selected = element.hasClass('preview-pane-selected-item');

              if(data === index && selected === false) {
                selectItem(element);
              }
            });

            // if this item should be preselected then select it
            if (preselected === true) {
                selectItem(element);
            }

            function appendClass(el) {
                angular.element('.preview-pane-selected-item').removeClass('preview-pane-selected-item');
                angular.element(el).addClass('preview-pane-selected-item');
            }

            // on click, select the item
            element.on('click', function() {
                selectItem(element);
            });

            // up keypress - go to previous item
            keyboardService.keydown(element, KEYS.UP, function(evt) {
                evt.preventDefault();
                var goToItem = element.prev('[preview-pane-item]');
                goToItem.focus();
                appendClass(goToItem);
                keyDownSelect(goToItem);
            });

            // down key press - go to next item
            keyboardService.keydown(element, KEYS.DOWN, function(evt) {
                evt.preventDefault();
                var goToItem = element.next('[preview-pane-item]');
                goToItem.focus();
                appendClass(goToItem);
                keyDownSelect(goToItem);
            });

            // pg up key press - go to 10th previous item or 1st item if not possible
            keyboardService.keydown(element, KEYS.PAGEUP, function(evt) {
                evt.preventDefault();
                var itemToJumpTo = element.prevAll('[preview-pane-item]');
                if (itemToJumpTo.length) {
                    var goToItem = element.prevAll('[preview-pane-item]:eq(10)').length ? element.prevAll('[preview-pane-item]:eq(10)') : itemToJumpTo.slice(-1);
                    goToItem.focus();
                    appendClass(goToItem);
                    keyDownSelect(goToItem);
                }
            });

            // pg down key press - go to 10th next item or last item if not possible
            keyboardService.keydown(element, KEYS.PAGEDOWN, function(evt) {
                evt.preventDefault();
                var itemToJumpTo = element.nextAll('[preview-pane-item]');
                if (itemToJumpTo.length) {
                    var goToItem = element.nextAll('[preview-pane-item]:eq(10)').length ? element.nextAll('[preview-pane-item]:eq(10)') : itemToJumpTo.slice(-1);
                    goToItem.focus();
                    appendClass(goToItem);
                    keyDownSelect(goToItem);
                }
            });

            // home key press - go to the first item
            keyboardService.keydown(element, KEYS.HOME, function(evt) {
                evt.preventDefault();
                var goToItem = element.prevAll('[preview-pane-item]:last');
                goToItem.focus();
                appendClass(goToItem);
                keyDownSelect(goToItem);
            });

            // end key press - go to the last item
            keyboardService.keydown(element, KEYS.END, function(evt) {
                evt.preventDefault();
                var goToItem = element.nextAll('[preview-pane-item]:last');
                goToItem.focus();
                appendClass(goToItem);
                keyDownSelect(goToItem);
            });

            // remove focus from item
            keyboardService.keydown(element, KEYS.ESC, function(evt) {
                evt.preventDefault();
                element.blur();
            });

            // select the item
            keyboardService.keydown(element, KEYS.ENTER, function() {
                selectItem(element);
            });

            function keyDownSelect(item) {
                if (scope.keydownSelect && item.length)
                    selectItem(item);
            }

            function selectItem(item) {

                $timeout(() => {
                    appendClass(item);
                    ctrl.select(item.index());
                });
            }

        }
    };
}