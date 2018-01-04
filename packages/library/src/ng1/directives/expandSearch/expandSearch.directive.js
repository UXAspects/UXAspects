export default function expandSearch() {
  return {
    restrict: 'A',
    link: function (scope, element) {
      element.bind('click', function () {
        var parent = element.parents(".navbar-static-top").toggleClass("show-search");
        if (parent.hasClass("show-search")) {
          parent.find(".navbar-form-search input").focus();
        }
      });
    }
  };
}