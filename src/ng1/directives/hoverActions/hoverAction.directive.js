import { ENTER, LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';

export default function hoverAction() {
  return {
    restrict: 'E',
    replace: true,
    template: require('./hoverAction.html'),
    scope: {
      icon: '@',
      name: '@',
      click: '&',
      disabled: '=?'
    },
    require: '^hoverActions',
    /**
     * @param {ng.IScope} scope
     * @param {JQuery} element
     * @param {ng.IAttributes} attrs
     * @param {*} hoverActionCtrl
     */
    link: function (scope, element, _attrs, hoverActionCtrl) {

      const container = element.parent();

      // setup the component
      onInit();

      // on component destroy cleanup
      scope.$on('$destroy', onDestroy);

      // apply a class if the item is disabled
      scope.$watch('disabled', isDisabled => {
        // add or remove the class accordingly
        if (isDisabled) {
          element.addClass('hover-action-disabled');
        } else {
          element.removeClass('hover-action-disabled');
        }

        // set the tab index accordingly
        element.attr('tabindex', isDisabled ? '-1' : '0');
      });

      function onInit() {
        // attach event handlers
        element.on('focus', onFocus);
        element.on('blur', onBlur);
        element.on('keydown', onKeyDown);
        element.on('click', onClick);
      }

      function onDestroy() {
        element.off('focus', onFocus);
        element.off('blur', onBlur);
        element.off('keydown', onKeyDown);
        element.off('click', onClick);
      }


      function onClick(event) {

        // if we are disabled force focus
        if (!scope.disabled) {
          //evaluate the function
          scope.click();
        }

        //no longer force focus
        container.removeClass('action-hovered');

        event.stopPropagation();
        event.preventDefault();

      }

      function onFocus() {
        container.addClass('action-hovered');
      }

      function onBlur() {
        container.removeClass('action-hovered');
      }

      function onKeyDown(event) {

        switch (event.which) {

          case LEFT_ARROW: {

            // get the previous sibling if there is one and focus it
            const sibling = getSibling(false).focus();

            //if there are no more previous elements, highlight the hover element again
            if (sibling.length === 0) {
              hoverActionCtrl.hoverElement.focus();
              container.removeClass('action-hovered');
            }

            event.stopPropagation();
            event.preventDefault();
            break;
          }

          case RIGHT_ARROW: {
            // get the next sibling if there is one and focus it
            getSibling(true).focus();

            event.stopPropagation();
            event.preventDefault();
            break;
          }

          case ENTER: {
            //evaluate the function - unlike click retain focus
            if (!scope.disabled) {
              scope.click();
            }

            event.stopPropagation();
            event.preventDefault();
            break;
          }
        }
      }

      /**
       * @param {boolean} isNext
       * @param {JQuery} source
       */
      function getSibling(isNext, source = element) {
        // get the sibling
        const sibling = isNext ? source.next('.hover-action') : source.prev('.hover-action');

        // check if the sibling is disabled
        if (sibling.attr('disabled')) {
          return getSibling(isNext, sibling);
        }

        return sibling;
      }
    }
  };
}