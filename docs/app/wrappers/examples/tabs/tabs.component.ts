import '../../../pages/components/components-sections/tabs/tabs-ng1/wrapper/tabs-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-tabs-wrapper'
})
export class TabsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdTabsWrapper', elementRef, injector);
    }
}