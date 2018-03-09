import '../../../pages/components/components-sections/input-controls/tags-ng1/wrapper/tags-custom-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-tags-custom-wrapper'
})
export class TagsCustomComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdTagsCustomWrapper', elementRef, injector);
    }
}