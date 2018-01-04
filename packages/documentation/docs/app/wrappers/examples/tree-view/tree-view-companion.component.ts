import '../../../pages/components/components-sections/tree-view/tree-view-companion-view-ng1/wrapper/tree-view-companion-view-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-tree-view-companion-view-wrapper'
})
export class TreeViewCompanionViewComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdTreeViewCompanionViewWrapper', elementRef, injector);
    }
}