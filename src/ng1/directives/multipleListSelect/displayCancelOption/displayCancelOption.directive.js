export default function displayCancelOption() {
  return {
    restrict: "E",
    transclude: true,
    replace: true,
    template: require('./displayCancelOption.html'),
    controller: "DisplayCancelOptionCtrl as dc"
  };
}