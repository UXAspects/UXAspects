import '../../../pages/components/components-sections/search/search-builder-ng1/wrapper/search-builder-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-search-builder-wrapper'
})
export class SearchBuilderComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdSearchBuilderWrapper', elementRef, injector);
    }
}