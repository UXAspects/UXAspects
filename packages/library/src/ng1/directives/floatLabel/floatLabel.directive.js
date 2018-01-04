export default function floatLabel() {
  return {
    restrict: "C",
    link: function (scope, element) {
      var childInput = element.children(":input");

      childInput.attr('data-value', childInput.val()).on('keyup', function () {
        childInput.attr('data-value', childInput.val());
      });

    }
  };
}