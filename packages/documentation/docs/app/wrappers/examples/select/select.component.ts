import '../../../pages/components/components-sections/select/select-ng1/wrapper/select-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-select-wrapper'
})
export class SelectComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdSelectWrapper', elementRef, injector);
    }
}