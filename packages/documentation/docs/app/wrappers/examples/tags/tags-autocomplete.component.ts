import '../../../pages/components/components-sections/input-controls/tags-ng1/wrapper/tags-autocomplete-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-tags-autocomplete-wrapper'
})
export class TagsAutocompleteComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdTagsAutocompleteWrapper', elementRef, injector);
    }
}