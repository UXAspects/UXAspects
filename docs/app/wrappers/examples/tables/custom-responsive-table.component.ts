import '../../../pages/components/components-sections/tables/custom-responsive-table-ng1/wrapper/custom-responsive-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-custom-responsive-table-wrapper'
})
export class CustomResponsiveTableComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdCustomResponsiveTableWrapper', elementRef, injector);
    }
}