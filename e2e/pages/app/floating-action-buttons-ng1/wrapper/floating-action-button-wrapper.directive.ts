import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
declare const angular: ng.IAngularStatic;

angular.module('app').directive('uxdFloatingActionButtonWrapper', () => {
    return {
        restrict: 'E',
        template: require('./floating-action-button-wrapper.directive.html'),
        controller: ['$templateCache', function ($templateCache) {
            var vm = this;

            vm.selectFloatingActionButton = function () { };

            vm.items = [{
                icon: 'hpe-add',
                event: this.selectFloatingActionButton
            }, {
                icon: 'hpe-analytics',
                event: this.selectFloatingActionButton
            }, {
                icon: 'hpe-app',
                event: this.selectFloatingActionButton
            }];
        }],
        controllerAs: 'vm'
    };
});

/**
 * Angular Upgraded Component
 */
@Directive({
    selector: 'uxd-floating-action-button-wrapper'
})
export class FloatingActionButtonComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdFloatingActionButtonWrapper', elementRef, injector);
    }
}