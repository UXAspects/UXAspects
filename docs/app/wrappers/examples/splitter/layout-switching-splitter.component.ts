import '../../../pages/components/components-sections/splitter/layout-switching-splitter-ng1/wrapper/layout-switching-splitter-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-layout-switching-splitter-wrapper'
})
export class LayoutSwitchingSplitterComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdLayoutSwitchingSplitterWrapper', elementRef, injector);
    }
}