export default function overflowTooltip() {
  return {
    restrict: "A",
    link: function (scope, element) {

      // store the original text
      var originalText = element.text();

      // remember if text is truncated or not
      var textTruncated = false;

      // create ellipsis if required
      element.dotdotdot({
        ellipsis: "…",
        wrap: "word",
        fallbackToLetter: true,
        watch: true,
        callback: function (truncated) {

          // only update tooltip if changes have been detected
          if (truncated !== textTruncated) {

            // remember whether or not the text is truncated for next time
            textTruncated = truncated;

            // either create or destroy the tooltip accordingly
            updateTooltip();
          }
        }
      });

      //watch for changes to the content
      var observer = new MutationObserver(function () {

        // get the element text
        var text = element.text();

        // check if it ends in an ellipsis
        var ellipsisIndex = text.lastIndexOf('…');

        // if there is no ellipsis then update the original text
        if (text !== originalText && ellipsisIndex === -1) {

          // reset the original text and remember we currently have no truncation
          originalText = text;
          textTruncated = false;

          // update the original content
          element.trigger("rebindText.dot", element);

          // perform truncation
          element.trigger("update.dot");
        }
      });

      // pass in the target node, as well as the observer options
      observer.observe(element.get(0), {
        characterData: true,
        subtree: true,
        childList: true
      });

      scope.$on('$destroy', function () {
        // stop watching for changes
        observer.disconnect();

        // destroy the tooltip
        element.tooltip('destroy');

        // destroy the dotdotdot
        element.trigger('destroy.dot');
      });

      function updateTooltip() {

        // if the text is now truncated then create a tooltip
        if (textTruncated === true) {

          // if a tooltip has already been added to element - destroy its data first
          if (element.data('bs.tooltip') !== null) {
            element.tooltip('hide');
            element.removeData('bs.tooltip');
          }

          // create tooltip
          element.tooltip({
            title: originalText,
            container: 'body'
          });

        } else {
          element.tooltip('destroy');
        }
      }

    }
  };
}