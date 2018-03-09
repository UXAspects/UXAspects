import '../../../pages/components/components-sections/draggable-panels/draggable-panels-ng1/wrapper/draggable-panels-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-draggable-panels-wrapper'
})
export class DraggablePanelsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdDraggablePanelsWrapper', elementRef, injector);
    }
}