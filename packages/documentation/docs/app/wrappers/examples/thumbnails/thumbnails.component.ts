import '../../../pages/components/components-sections/buttons/thumbnail-ng1/wrapper/thumbnail-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-thumbnail-wrapper'
})
export class ThumbnailComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdThumbnailWrapper', elementRef, injector);
    }
}