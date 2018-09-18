DisplayPanelItemDirective.$inject = ['$displayPanel', 'keyboardService', '$timeout'];

export function DisplayPanelItemDirective($displayPanel, keyboardService, $timeout) {
  return {
    restrict: 'A',
    scope: true,
    link: function (scope, element, attrs) {
      scope.displayPanelItem = scope.$eval(attrs.displayPanelItem);
      scope.shadow = scope.$eval(attrs.shadow);

      const showDisplayPanel = function () {
        const isFirst = (element.is(':first-child')) ? true : false;
        const isLast = (element.is(':last-child')) ? true : false;

        $displayPanel.open(element, scope.displayPanelItem, scope.shadow, isFirst, isLast);
      };

      const hideDisplayPanel = () => $displayPanel.close(scope.displayPanelItem);

      //update the panel if it visible
      const updatePanel = function () {
        if ($displayPanel.panelOpen() && !$displayPanel.panelHidden()) {
          $timeout(() => showDisplayPanel());
        }
      };

      // this will be the item we are focusing on
      let goToItem = element;

      //listen for click
      element[0].addEventListener('click', () => $timeout(() => showDisplayPanel()));

      //listen for focus
      element[0].addEventListener('focus', updatePanel);

      // down key press - go to next item
      keyboardService.keydown(element, 40, function (evt) {
        evt.preventDefault();
        goToNext();
      });

      // up keypress - go to previous item
      keyboardService.keydown(element, 38, function (evt) {
        evt.preventDefault();
        goToPrevious();
      });

      //go to previous item in the list
      function goToPrevious() {
        goToItem = element.prev('[display-panel-item]');
        goToItem.focus();
      }

      // down key press - go to next item
      keyboardService.keydown(element, 40, function (evt) {
        evt.preventDefault();
        goToNext();
      });

      //go to next item in the list
      function goToNext() {
        goToItem = element.next('[display-panel-item]');
        goToItem.focus();
      }

      // when clicking Previous button go to previous item
      scope.$on('$displayPanelPrevious', function () {
        if ($displayPanel.getCurrentPanel() === element) {
          goToPrevious();
        }
      });

      // when clicking Next button go to next item
      scope.$on('$displayPanelNext', function () {
        if ($displayPanel.getCurrentPanel() === element) {
          goToNext();
        }
      });

      // pg up key press - go to 10th previous item or 1st item if not possible
      keyboardService.keydown(element, 33, function (evt) {
        evt.preventDefault();
        const itemToJumpTo = element.prevAll('[display-panel-item]');
        if (itemToJumpTo.length) {
          goToItem = element.prevAll('[display-panel-item]:eq(10)').length ? element.prevAll('[display-panel-item]:eq(10)') : itemToJumpTo[itemToJumpTo.length - 1];
          goToItem.focus();
        }
      });

      // pg down key press - go to 10th next item or last item if not possible
      keyboardService.keydown(element, 34, function (evt) {
        evt.preventDefault();
        const itemToJumpTo = element.nextAll('[display-panel-item]');
        if (itemToJumpTo.length) {
          goToItem = element.nextAll('[display-panel-item]:eq(10)').length ? element.nextAll('[display-panel-item]:eq(10)') : itemToJumpTo[itemToJumpTo.length - 1];
          goToItem.focus();
        }
      });

      // home key press - go to the first item
      keyboardService.keydown(element, 36, function (evt) {
        evt.preventDefault();
        goToItem = element.prevAll('[display-panel-item]:last');
        goToItem.focus();
      });

      // end key press - go to the last item
      keyboardService.keydown(element, 35, function (evt) {
        evt.preventDefault();
        goToItem = element.nextAll('[display-panel-item]:last');
        goToItem.focus();
      });

      // esc key press - if display panel is open, close it. Otherwise blur focus on item
      keyboardService.keydown(element, 27, function (evt) {
        evt.preventDefault();
        if ($displayPanel.panelOpen() && !$displayPanel.panelHidden()) {
          hideDisplayPanel();
        } else {
          element.blur();
        }
      });

      // enter key press - show the display panel
      keyboardService.keydown(element, 13, () => $timeout(() => showDisplayPanel()));

      // spacebar press - show the display panel
      keyboardService.keydown(element, 32, evt => evt.preventDefault());

    }
  };
}