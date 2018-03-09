import '../../../pages/components/components-sections/search/search-history-ng1/wrapper/search-history-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-search-history-wrapper'
})
export class SearchHistoryComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdSearchHistoryWrapper', elementRef, injector);
    }
}