import '../../../pages/components/components-sections/tabs/card-tabs-ng1/wrapper/card-tabs-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-card-tabs-wrapper'
})
export class CardTabsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdCardTabsWrapper', elementRef, injector);
    }
}