import '../../../pages/components/components-sections/contacts/contacts-ng1/wrapper/contacts-wrapper.directive';
import { Directive, ElementRef, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
    
@Directive({
    selector: 'uxd-contacts-wrapper'
})
export class ContactsComponent extends UpgradeComponent {

    constructor(elementRef: ElementRef, injector: Injector) {
        super('uxdContactsWrapper', elementRef, injector);
    }
}