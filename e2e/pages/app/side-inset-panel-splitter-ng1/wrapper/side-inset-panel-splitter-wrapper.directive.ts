import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
declare const angular: ng.IAngularStatic;

angular.module('app').directive('uxdSideInsetPanelSplitterWrapper', () => {
    return {
        restrict: 'E',
        template: require('./side-inset-panel-splitter-wrapper.directive.html'),
        controller: ['$templateCache', function ($templateCache) {
            var vm = this;

        }],
        controllerAs: 'vm'
    };
});

@Directive({
    selector: 'uxd-side-inset-panel-splitter-wrapper'
})
export class SideInsetPanelSplitterComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdSideInsetPanelSplitterWrapper', elementRef, injector);
    }
}