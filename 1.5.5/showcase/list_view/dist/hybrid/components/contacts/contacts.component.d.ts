import { ElementRef, Injector, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export declare class ContactsNg1Component extends UpgradeComponent {
    contacts: Contact[];
    organization: string;
    size: 'medium' | 'small';
    colors: any;
    maxContacts: number;
    overflowClick: EventEmitter<void>;
    constructor(elementRef: ElementRef, injector: Injector);
}
export interface Contact {
    test: string;
    status: 'active' | 'passive';
    customTooltip?: {
        template: string;
        tooltipPosition: string;
        data?: any;
    };
}
export interface Organization {
    text: string;
    label: 'external' | 'risk';
    tooltip?: string;
    customTooltip?: {
        template: string;
        tooltipPosition: string;
        data?: any;
    };
}
