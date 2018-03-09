import '../../../pages/components/components-sections/scrollbar/custom-scrollbar-ng1/wrapper/custom-scrollbar-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-custom-scrollbar-wrapper'
})
export class CustomScrollbarComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdCustomScrollbarWrapper', elementRef, injector);
    }
}