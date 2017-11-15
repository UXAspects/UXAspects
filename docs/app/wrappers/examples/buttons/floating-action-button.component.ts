import '../../../pages/components/components-sections/buttons/floating-action-button-ng1/wrapper/floating-action-button-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-floating-action-button-wrapper'
})
export class FloatingActionButtonComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdFloatingActionButtonWrapper', elementRef, injector);
    }
}