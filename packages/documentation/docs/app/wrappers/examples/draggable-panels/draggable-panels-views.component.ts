import '../../../pages/components/components-sections/draggable-panels/draggable-panels-views-ng1/wrapper/draggable-panels-views-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-draggable-panels-views-wrapper'
})
export class DraggablePanelsViewsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdDraggablePanelsViewsWrapper', elementRef, injector);
    }
}