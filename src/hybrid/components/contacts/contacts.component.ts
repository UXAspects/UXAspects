import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'ux-contact-group-ng1'
})
export class ContactsComponent extends UpgradeComponent {

    @Input() contacts: Contact[];
    @Input() organization: string;
    @Input() size: 'medium' | 'small';
    @Input() colors: any;
    @Input() maxContacts: number;

    @Output() overflowClick: EventEmitter<void> = new EventEmitter<void>();

    constructor(elementRef: ElementRef, injector: Injector) {
        super('contactGroup', elementRef, injector);
    }
}

export interface Contact {
    test: string;
    status: 'active' | 'passive';
    customTooltip?: {
        template: string,
        tooltipPosition: string;
        data?: any;
    };
}

export interface Organization {
    text: string;
    label: 'external' | 'risk';
    tooltip?: string;
    customTooltip?: {
        template: string,
        tooltipPosition: string;
        data?: any;
    };
}