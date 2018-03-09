import '../../../pages/components/components-sections/tables/multiple-column-sorting-ng1/wrapper/multi-column-sorting-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-multi-column-sorting-wrapper'
})
export class MultiColumnSortingComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdMultiColumnSortingWrapper', elementRef, injector);
    }
}