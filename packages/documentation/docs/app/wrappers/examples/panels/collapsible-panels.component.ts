import '../../../pages/components/components-sections/panels/collapsible-panels-ng1/wrapper/collapsible-panels-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-collapsible-panels-wrapper'
})
export class CollapsiblePanelsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdCollapsiblePanelsWrapper', elementRef, injector);
    }
}