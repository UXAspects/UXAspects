import '../../../pages/components/components-sections/side-navigation/navigation/wrapper/boldify.directive';
import '../../../pages/components/components-sections/side-navigation/app-navigator/wrapper/app-navigator-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-app-navigator-wrapper'
})
export class AppNavigatorComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdAppNavigatorWrapper', elementRef, injector);
    }
}