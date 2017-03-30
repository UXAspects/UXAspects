export default function displaySelectOptions() {
  return {
    restrict: "E",
    transclude: true,
    replace: true,
    template: require('./displaySelectOptions.html'),
    controller: "DisplaySelectOptionsCtrl as ds"
  };
}