import '../../../pages/components/components-sections/input-controls/input-expand-ng1/wrapper/input-expand-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-input-expand-wrapper'
})
export class InputExpandComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdInputExpandWrapper', elementRef, injector);
    }
}