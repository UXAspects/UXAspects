import '../../../pages/components/components-sections/tree-view/tree-grid-ng1/wrapper/tree-grid-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-tree-grid-wrapper'
})
export class TreeGridComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdTreeGridWrapper', elementRef, injector);
    }
}