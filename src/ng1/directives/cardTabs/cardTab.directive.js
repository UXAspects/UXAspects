export default function card() {
  return {
    restrict: 'E',
    template: "<li class=\"card-tab\"><div class=\"no-overflow\" ng-transclude></div></li>",
    transclude: true,
    replace: true,
    link: function (scope, element) {
      
      //find our tab content and hide it
      var tabContent = element[0].getElementsByTagName('tab-content');

      if (!tabContent || tabContent.length > 1) throw 'Card tabs can have only one tab-content element';

      if (tabContent.length === 0) return;

      tabContent[0].style.display = 'none';

    }
  };
}