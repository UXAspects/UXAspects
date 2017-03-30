export default function filterContainer() {
  return {
    restrict: "E",
    template: require('./filterContainer.html'),
    controller: "FilterContainerCtrl as fil",
    transclude: true,
    replace: true,
    scope: {
      clearTooltip: "@"
    }
  };
}