angular.module('app')
    .directive('checkbox', upgradeAdapter.downgradeNg2Component(CheckboxComponent));