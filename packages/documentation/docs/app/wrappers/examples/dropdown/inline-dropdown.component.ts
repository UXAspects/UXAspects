import '../../../pages/components/components-sections/input-controls/inline-dropdown-ng1/wrapper/inline-dropdown-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-inline-dropdown-wrapper'
})
export class InlineDropdownComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdInlineDropdownWrapper', elementRef, injector);
    }
}