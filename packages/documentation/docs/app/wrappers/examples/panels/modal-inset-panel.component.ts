import '../../../pages/components/components-sections/panels/modal-inset-panel-ng1/wrapper/modal-inset-panel-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-modal-inset-panel-wrapper'
})
export class ModalInsetPanelComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdModalInsetPanelWrapper', elementRef, injector);
    }
}