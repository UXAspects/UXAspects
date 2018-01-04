import '../../../pages/components/components-sections/hierarchy-bar/hierarchy-bar-ng1/wrapper/hierarchy-bar-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-hierarchy-bar-wrapper'
})
export class HierarchyBarComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdHierarchyBarWrapper', elementRef, injector);
    }
}