import '../../../pages/components/components-sections/contacts/contacts-overflow-ng1/wrapper/contacts-overflow-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-contacts-overflow-wrapper'
})
export class ContactsOverflowComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdContactsOverflowWrapper', elementRef, injector);
    }
}