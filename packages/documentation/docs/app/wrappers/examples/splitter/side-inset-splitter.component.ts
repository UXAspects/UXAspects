import '../../../pages/components/components-sections/splitter/side-inset-panel-splitter-ng1/wrapper/side-inset-panel-splitter-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-side-inset-panel-splitter-wrapper'
})
export class SideInsetPanelSplitterComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdSideInsetPanelSplitterWrapper', elementRef, injector);
    }
}