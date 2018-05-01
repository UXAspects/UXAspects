import '../../../pages/components/components-sections/drag-and-drop/draggable-cards-ng1/wrapper/draggable-cards-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'uxd-draggable-cards-wrapper'
})
export class DraggableCardsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdDraggableCardsWrapper', elementRef, injector);
    }
}