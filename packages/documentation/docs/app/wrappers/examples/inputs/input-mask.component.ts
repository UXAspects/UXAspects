import '../../../pages/components/components-sections/input-controls/input-mask-ng1/wrapper/input-mask-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-input-mask-wrapper'
})
export class InputMaskComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdInputMaskWrapper', elementRef, injector);
    }
}