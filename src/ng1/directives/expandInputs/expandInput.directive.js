export default function expandInput() {
  return {
    restrict: "E",
    template: require('./expandInput.html'),
    controller: "ExpandInputCtrl as vm",
    bindToController: true,
    replace: true,
    scope: {
      focus: "&",
      name: "@elname",
      placeHolder: "@",
      className: "@",
      clearTextIcon: "@",
      closeSearch: "@",
      expandAlways: "=",
      onEnter: "=?"
    }
  };
}