import '../../../pages/components/components-sections/keyboard/keyboard-service-ng1/wrapper/keyboard-service-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-keyboard-service-wrapper'
})
export class KeyboardServiceComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdKeyboardServiceWrapper', elementRef, injector);
    }
}