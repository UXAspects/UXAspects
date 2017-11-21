import '../../../pages/components/components-sections/buttons/pagination-ng1/wrapper/pagination-wrapper.directive.ts';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-pagination-wrapper'
})
export class PaginationComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdPaginationWrapper', elementRef, injector);
    }
}