import '../../../pages/components/components-sections/drag-and-drop/draggable-cards-list-view-ng1/wrapper/draggable-cards-list-view-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'uxd-draggable-cards-list-view-wrapper'
})
export class DraggableCardsListViewComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdDraggableCardsListViewWrapper', elementRef, injector);
    }
}