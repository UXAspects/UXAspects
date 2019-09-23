declare const angular: ng.IAngularStatic;
import { FixedHeaderTableWrapperController } from './fixed-header-table-wrapper.controller';

angular.module('app').directive('uxdFixedHeaderTableWrapper', () => {
    return {
        restrict: 'E',
        controller: FixedHeaderTableWrapperController as any,
        controllerAs: 'vm',
        template: require('./fixed-header-table-wrapper.directive.html')
    };
});