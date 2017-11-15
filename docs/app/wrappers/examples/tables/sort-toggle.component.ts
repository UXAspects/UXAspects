import '../../../pages/components/components-sections/tables/sort-direction-toggle-ng1/wrapper/sort-toggle-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-sort-toggle-wrapper'
})
export class SortToggleComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdSortToggleWrapper', elementRef, injector);
    }
}