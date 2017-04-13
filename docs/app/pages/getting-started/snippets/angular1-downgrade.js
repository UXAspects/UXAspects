import { CheckboxComponent } from 'ux-aspects/components/checkbox/checkbox.component';

angular.module('app')
    .directive('checkbox', upgradeAdapter.downgradeNg2Component(CheckboxComponent));