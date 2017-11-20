import '../../../pages/components/components-sections/tree-view/tree-view-ng1/wrapper/tree-view-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-tree-view-wrapper'
})
export class TreeViewComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdTreeViewWrapper', elementRef, injector);
    }
}