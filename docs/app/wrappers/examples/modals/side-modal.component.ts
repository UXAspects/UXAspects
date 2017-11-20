import '../../../pages/components/components-sections/modals/side-modal-ng1/wrapper/side-modal-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-side-modal-wrapper'
})
export class SideModalComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdSideModalWrapper', elementRef, injector);
    }
}