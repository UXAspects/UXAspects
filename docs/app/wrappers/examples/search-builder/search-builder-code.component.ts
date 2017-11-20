import '../../../pages/components/components-sections/search/search-builder-ng1/wrapper/search-builder-code-wrapper.directive';
import { Directive, ElementRef, Injector, Input } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-search-builder-code-wrapper'
})
export class SearchBuilderCodeComponent extends UpgradeComponent {

    @Input() snippets: any;
    
    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdSearchBuilderCodeWrapper', elementRef, injector);
    }
}