import '../../../pages/components/components-sections/modals/square-modal-ng1/wrapper/square-modal-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-square-modal-wrapper'
})
export class SquareModalComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdSquareModalWrapper', elementRef, injector);
    }
}