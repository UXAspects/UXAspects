import '../../../pages/components/components-sections/tables/reorderable-table-ng1/wrapper/reorderable-table-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-reorderable-table-wrapper'
})
export class ReorderableTableComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdReorderableTableWrapper', elementRef, injector);
    }
}