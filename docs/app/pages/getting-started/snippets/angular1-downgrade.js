import { CheckboxComponent } from 'ux-aspects';

angular.module('app')
    .directive('checkbox', upgradeAdapter.downgradeNg2Component(CheckboxComponent));