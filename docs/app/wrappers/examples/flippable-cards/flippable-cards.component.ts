import '../../../pages/components/components-sections/flippable-cards/flippable-cards-ng1/wrapper/flippable-cards-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-flippable-cards-wrapper'
})
export class FlippableCardsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdFlippableCardsWrapper', elementRef, injector);
    }
}