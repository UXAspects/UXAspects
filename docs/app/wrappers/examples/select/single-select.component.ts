import '../../../pages/components/components-sections/select/single-select-table-ng1/wrapper/single-select-table-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-single-select-table-wrapper'
})
export class SingleSelectTableComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdSingleSelectTableWrapper', elementRef, injector);
    }
}