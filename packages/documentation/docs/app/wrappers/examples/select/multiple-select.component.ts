import '../../../pages/components/components-sections/select/multiple-select-table-ng1/wrapper/multiple-select-table-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-multiple-select-table-wrapper'
})
export class MultipleSelectTableComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdMultipleSelectTableWrapper', elementRef, injector);
    }
}