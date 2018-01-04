treegridRowKeyHandler.$inject = ["keyboardService"];

export default  function treegridRowKeyHandler(keyboardService) {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {

      var Keys = {
        left: 37,
        right: 39
      };

      keyboardService.keydown(elem, Keys.left, function(e) {
        scope.$apply(function() {
          if (attrs.treegridContract && scope.$eval(attrs.treegridContract)) {
            e.stopPropagation();
          }
        });
      }, 20);

      keyboardService.keydown(elem, Keys.right, function(e) {
        scope.$apply(function() {
          if (attrs.treegridExpand && scope.$eval(attrs.treegridExpand)) {
            e.stopPropagation();
          }
        });
      }, 10);
    }
  };
}