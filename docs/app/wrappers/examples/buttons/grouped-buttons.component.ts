import '../../../pages/components/components-sections/buttons/grouped-buttons-ng1/wrapper/grouped-buttons-wrapper.directive';

import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-grouped-buttons-wrapper'
})
export class GroupedButtonsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdGroupedButtonsWrapper', elementRef, injector);
    }
}