import '../../../pages/components/components-sections/input-controls/expanding-text-area-ng1/wrapper/expanding-text-area-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-expanding-text-area-wrapper'
})
export class ExpandingTextAreaComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdExpandingTextAreaWrapper', elementRef, injector);
    }
}