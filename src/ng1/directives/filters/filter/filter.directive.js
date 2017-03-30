export default function filter() {
  return {
    restrict: "E",
    require: "^filterContainer",
    controller: "FilterCtrl as fc",
    template: function (tElem, tAttrs) {
      if (tAttrs.filterOptions) {
        return require('./filterOptions.html');
      }
      return require('./filter.html');
    },
    scope: {
      name: "=",
      dynamicOptions: "=?filterOptions",
      displayConfiguration: "=?",
      updateCallback: "=?"
    },
    transclude: true,
    replace: true,
    link: function (scope, element, attr, controller) {
      scope.fc.filterContainer = controller;
      scope.fc.filterContainer.addFilters(scope.fc);

      //To remove search string from dynamic filters
      if (element.hasClass('dynamic-filter-toggle')) {
        element.on('click', function () {
          if (!element.hasClass('open')) {
            element.find('ul li.input-container > input')[0].value = "";
          }
        });
      }

    }
  };
}