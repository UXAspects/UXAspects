import '../../../pages/components/components-sections/tables/single-column-sorting-ng1/wrapper/single-column-sorting-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-single-column-sorting-wrapper'
})
export class SingleColumnSortingComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdSingleColumnSortingWrapper', elementRef, injector);
    }
}