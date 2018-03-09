export default function searchCategories() {
    return {
      restrict: 'E',
      template: require('./searchCategories.html'),
      controller: 'SearchCategoriesCtrl as vm',
      bindToController: true,
      replace: true,
      scope: {
        ngModel: '=',
        categories: '=',
        options: '=?'
      }
    };
  }