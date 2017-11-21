import '../../../pages/components/components-sections/utilities/expanding-content-ng1/wrapper/expanding-content-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-expanding-content-wrapper'
})
export class ExpandingContentComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdExpandingContentWrapper', elementRef, injector);
    }
}