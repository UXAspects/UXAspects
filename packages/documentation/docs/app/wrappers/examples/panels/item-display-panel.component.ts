import '../../../pages/components/components-sections/panels/item-display-panel-ng1/wrapper/item-display-panel-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-item-display-panel-wrapper'
})
export class ItemDisplayPanelComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdItemDisplayPanelWrapper', elementRef, injector);
    }
}