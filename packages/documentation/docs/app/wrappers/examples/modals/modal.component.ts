import '../../../pages/components/components-sections/modals/modal-ng1/wrapper/modal-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-modal-wrapper'
})
export class ModalComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdModalWrapper', elementRef, injector);
    }
}