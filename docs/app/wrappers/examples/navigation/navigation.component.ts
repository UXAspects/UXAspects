import '../../../pages/components/components-sections/side-navigation/navigation-ng1/wrapper/navigation-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-navigation-wrapper'
})
export class NavigationComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdNavigationWrapper', elementRef, injector);
    }
}