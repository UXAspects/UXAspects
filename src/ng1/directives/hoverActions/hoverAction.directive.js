export default function hoverAction() {
  return {
    restrict: 'E',
    replace: true,
    template: require('./hoverAction.html'),
    scope: {
      icon: "@",
      name: "@",
      click: "&"
    },
    require: '^hoverActions',
    link: function (scope, element, attrs, hoverActionCtrl) {

      /*
        Properties
      */
      var container = element.parent();

      /*
        Bind to events
      */
      element.focus(onFocus);
      element.blur(onBlur);
      element.keydown(onKeyDown);
      element.click(onClick);

      /*
        Event handlers
      */

      function onClick(evt) {
        //evaluate the function
        scope.click();

        //no longer force focus
        container.removeClass('action-hovered');

        evt.stopPropagation();
        evt.preventDefault();

      }

      function onFocus() {
        container.addClass('action-hovered');
      }

      function onBlur() {
        container.removeClass('action-hovered');
      }

      function onKeyDown(evt) {
        //if left arrow key is pressed
        if (evt.keyCode === 37) {
          //try and select the previous action if there is one
          var previousBtn = element.prev('.hover-action').focus();

          //if there are no more previous elements, highlight the hover element again
          if (previousBtn.length === 0) {
            hoverActionCtrl.hoverElement.focus();
            container.removeClass('action-hovered');
          }

          evt.stopPropagation();
          evt.preventDefault();

        }

        //if right arrow key is pressed
        if (evt.keyCode === 39) {
          //try and select the next action if there is one
          element.next('.hover-action').focus();
          evt.stopPropagation();
          evt.preventDefault();

        }

        //if return key was pressed
        if (evt.keyCode === 13) {
          //evaluate the function - unlike click retain focus
          scope.click();

          evt.stopPropagation();
          evt.preventDefault();
        }
      }
    }
  };
}