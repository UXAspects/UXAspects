// load the template for list items
require('./dynamicSelectListItem.tmpl.html');

export default function dynamicSelect() {
  return {
    restrict: 'E',
    template: require('./dynamicSelect.html'),
    controller: 'DynamicSelectCtrl as vm',
    bindToController: true,
    replace: true,
    scope: {
      ngModel: '=',
      source: '=',
      selectAs: '@?',
      trackBy: '@?',
      options: '=?',
      ngDisabled: '=?'
    }
  };
}