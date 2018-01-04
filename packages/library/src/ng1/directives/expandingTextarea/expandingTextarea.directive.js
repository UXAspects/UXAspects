export default function expandingTextarea() {
  return {
    restrict: 'A',
    link: function (scope, element, attrs) {
      var disableReturn = attrs.disableReturn ? (attrs.disableReturn.trim().toLowerCase() === 'true' ? true : false) : false;
      var maxVisibleLines = attrs.maxVisibleLines ? +attrs.maxVisibleLines : 0;

      $(element[0]).expandingTextarea({
        disableReturn: disableReturn,
        maxVisibleLines: maxVisibleLines
      });
    }
  };
}
