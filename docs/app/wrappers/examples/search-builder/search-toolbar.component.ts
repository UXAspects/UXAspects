import '../../../pages/components/components-sections/search/search-toolbar-ng1/wrapper/search-toolbar-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-search-toolbar-wrapper'
})
export class SearchToolbarComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdSearchToolbarWrapper', elementRef, injector);
    }
}