import '../../../pages/components/components-sections/scrollbar/infinite-scroll-ng1/wrapper/infinite-scroll-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-infinite-scroll-wrapper'
})
export class InfiniteScrollComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdInfiniteScrollWrapper', elementRef, injector);
    }
}