import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
import '../../../pages/components/components-sections/buttons/dropdown-ng1/wrapper/dropdown-wrapper.directive';

@Directive({
    selector: 'uxd-dropdown-wrapper'
})
export class DropdownComponent extends UpgradeComponent {

    @Input() display: string = 'main';

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdDropdownWrapper', elementRef, injector);
    }
}