import '../../../pages/components/components-sections/tabs/stacked-tabs-ng1/wrapper/stacked-tabs-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-stacked-tabs-wrapper'
})
export class StackedTabsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdStackedTabsWrapper', elementRef, injector);
    }
}