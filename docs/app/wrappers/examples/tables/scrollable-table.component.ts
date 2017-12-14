import '../../../pages/components/components-sections/tables/scrollable-table-ng1/wrapper/scrollable-table-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-scrollable-table-wrapper'
})
export class ScrollableTableComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdScrollableTableWrapper', elementRef, injector);
    }
}