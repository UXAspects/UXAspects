import '../../../pages/components/components-sections/tables/detail-row-responsive-ng1/wrapper/detail-row-responsive-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-detail-row-responsive-wrapper'
})
export class DetailRowResponsiveComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdDetailRowResponsiveWrapper', elementRef, injector);
    }
}