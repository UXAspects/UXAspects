import '../../../pages/components/components-sections/tree-view/tree-grid-asynchronous-loading-ng1/wrapper/tree-grid-asynchronous-loading-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-tree-grid-asynchronous-loading-wrapper'
})
export class TreeGridAsynchronousLoadingComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdTreeGridAsynchronousLoadingWrapper', elementRef, injector);
    }
}