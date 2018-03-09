import '../../../pages/components/components-sections/tables/fixed-header-table-ng1/wrapper/fixed-header-table-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'uxd-fixed-header-table-wrapper'
})
export class FixedHeaderTableComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdFixedHeaderTableWrapper', elementRef, injector);
    }
}