import '../../../pages/components/components-sections/modals/marquee-modal-ng1/wrapper/marquee-modal-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-marquee-modal-wrapper'
})
export class MarqueeModalComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdMarqueeModalWrapper', elementRef, injector);
    }
}