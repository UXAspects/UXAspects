import '../../../pages/components/components-sections/scrollbar/infinite-scroll-load-more-ng1/wrapper/infinite-scroll-load-more-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-infinite-scroll-load-more-wrapper'
})
export class InfiniteScrollLoadMoreComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdInfiniteScrollLoadMoreWrapper', elementRef, injector);
    }
}