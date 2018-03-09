import '../../../pages/components/components-sections/tabs/detailed-tab-example-ng1/wrapper/detailed-tab-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-detailed-tab-wrapper'
})
export class DetailedTabComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdDetailedTabWrapper', elementRef, injector);
    }
}