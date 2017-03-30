export default function extendedCheckboxHit() {
  return {
    restrict: "A",
    link: function (scope, element) {
      element.on('click', function () {
        element.children("[multiple-list-select-item]").click();
        return false;
      });
    }
  };
}