import '../../../pages/components/components-sections/utilities/list-item-filter-ng1/wrapper/list-item-filter-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-list-item-filter-wrapper'
})
export class ListItemFilterComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdListItemFilterWrapper', elementRef, injector);
    }
}