import '../../../pages/components/components-sections/tables/detail-row-header-ng1/wrapper/service/detail-row-data.service';
import '../../../pages/components/components-sections/tables/detail-row-header-ng1/wrapper/detail-row-header-wrapper.directive';

import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-detail-row-header-wrapper'
})
export class DetailRowHeaderComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdDetailRowHeaderWrapper', elementRef, injector);
    }
}