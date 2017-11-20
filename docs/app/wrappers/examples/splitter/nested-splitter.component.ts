import '../../../pages/components/components-sections/splitter/nested-splitter-ng1/wrapper/nested-splitter-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-nested-splitter-wrapper'
})
export class NestedSplitterComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdNestedSplitterWrapper', elementRef, injector);
    }
}