import '../../../pages/components/components-sections/input-controls/tags-ng1/wrapper/tags-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-tags-wrapper'
})
export class TagsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdTagsWrapper', elementRef, injector);
    }
}