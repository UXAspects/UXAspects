export default function pageTitle($rootScope) {
  return {
    link: function (scope, element, attrs) {
      //set title to default;
      var title = attrs.pageTitle;

      var listener = function (event, toState) {
        if (toState.data && toState.data.pageTitle) {
          title = toState.data.pageTitle;
        }

        //title element in head
        element.text(title);

      };
      $rootScope.$on('$stateChangeStart', listener);
    }
  };
}