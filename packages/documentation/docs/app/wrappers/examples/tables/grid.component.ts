import '../../../pages/components/components-sections/grid/grid-ng1/wrapper/grid-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-grid-wrapper'
})
export class GridComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdGridWrapper', elementRef, injector);
    }
}