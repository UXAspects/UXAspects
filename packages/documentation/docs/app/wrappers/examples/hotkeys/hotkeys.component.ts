import '../../../pages/components/components-sections/keyboard/hotkeys-ng1/wrapper/hotkeys-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-hotkeys-wrapper'
})
export class HotkeysComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdHotkeysWrapper', elementRef, injector);
    }
}