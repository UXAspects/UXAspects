import '../../../pages/components/components-sections/progress/progress-bar-ng1/wrapper/progress-bar-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-progress-bar-wrapper'
})
export class ProgressBarComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdProgressBarWrapper', elementRef, injector);
    }
}