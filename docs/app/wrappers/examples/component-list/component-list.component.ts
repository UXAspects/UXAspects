import '../../../pages/components/components-sections/component-list/component-list-ng1/wrapper/component-list-wrapper.directive';

import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-component-list-wrapper'
})
export class ComponentListComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdComponentListWrapper', elementRef, injector);
    }
}