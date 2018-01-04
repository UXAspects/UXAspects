import '../../../pages/components/components-sections/splitter/splitter-ng1/wrapper/splitter-wrapper.directive';

import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-splitter-wrapper'
})
export class SplitterComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdSplitterWrapper', elementRef, injector);
    }
}