/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export class ContactsNg1Component extends UpgradeComponent {
    /**
     * @param {?} elementRef
     * @param {?} injector
     */
    constructor(elementRef, injector) {
        super('contactGroup', elementRef, injector);
        this.overflowClick = new EventEmitter();
    }
}
ContactsNg1Component.decorators = [
    { type: Directive, args: [{
                selector: 'contact-group'
            },] },
];
/** @nocollapse */
ContactsNg1Component.ctorParameters = () => [
    { type: ElementRef, },
    { type: Injector, },
];
ContactsNg1Component.propDecorators = {
    "contacts": [{ type: Input },],
    "organization": [{ type: Input },],
    "size": [{ type: Input },],
    "colors": [{ type: Input },],
    "maxContacts": [{ type: Input },],
    "overflowClick": [{ type: Output },],
};
function ContactsNg1Component_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ContactsNg1Component.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ContactsNg1Component.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ContactsNg1Component.propDecorators;
    /** @type {?} */
    ContactsNg1Component.prototype.contacts;
    /** @type {?} */
    ContactsNg1Component.prototype.organization;
    /** @type {?} */
    ContactsNg1Component.prototype.size;
    /** @type {?} */
    ContactsNg1Component.prototype.colors;
    /** @type {?} */
    ContactsNg1Component.prototype.maxContacts;
    /** @type {?} */
    ContactsNg1Component.prototype.overflowClick;
}
/**
 * @record
 */
export function Contact() { }
function Contact_tsickle_Closure_declarations() {
    /** @type {?} */
    Contact.prototype.test;
    /** @type {?} */
    Contact.prototype.status;
    /** @type {?|undefined} */
    Contact.prototype.customTooltip;
}
/**
 * @record
 */
export function Organization() { }
function Organization_tsickle_Closure_declarations() {
    /** @type {?} */
    Organization.prototype.text;
    /** @type {?} */
    Organization.prototype.label;
    /** @type {?|undefined} */
    Organization.prototype.tooltip;
    /** @type {?|undefined} */
    Organization.prototype.customTooltip;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImh5YnJpZC9jb21wb25lbnRzL2NvbnRhY3RzL2NvbnRhY3RzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsWUFBWSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdGLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBSzNELE1BQU0sMkJBQTRCLFNBQVEsZ0JBQWdCOzs7OztJQVV0RCxZQUFZLFVBQXNCLEVBQUUsUUFBa0I7UUFDbEQsS0FBSyxDQUFDLGNBQWMsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7NkJBSEYsSUFBSSxZQUFZLEVBQVE7S0FJckU7OztZQWZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsZUFBZTthQUM1Qjs7OztZQUxtQixVQUFVO1lBQUUsUUFBUTs7O3lCQVFuQyxLQUFLOzZCQUNMLEtBQUs7cUJBQ0wsS0FBSzt1QkFDTCxLQUFLOzRCQUNMLEtBQUs7OEJBRUwsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSW5qZWN0b3IsIElucHV0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVXBncmFkZUNvbXBvbmVudCB9IGZyb20gJ0Bhbmd1bGFyL3VwZ3JhZGUvc3RhdGljJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdjb250YWN0LWdyb3VwJ1xufSlcbmV4cG9ydCBjbGFzcyBDb250YWN0c05nMUNvbXBvbmVudCBleHRlbmRzIFVwZ3JhZGVDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgY29udGFjdHM6IENvbnRhY3RbXTtcbiAgICBASW5wdXQoKSBvcmdhbml6YXRpb246IHN0cmluZztcbiAgICBASW5wdXQoKSBzaXplOiAnbWVkaXVtJyB8ICdzbWFsbCc7XG4gICAgQElucHV0KCkgY29sb3JzOiBhbnk7XG4gICAgQElucHV0KCkgbWF4Q29udGFjdHM6IG51bWJlcjtcblxuICAgIEBPdXRwdXQoKSBvdmVyZmxvd0NsaWNrOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBpbmplY3RvcjogSW5qZWN0b3IpIHtcbiAgICAgICAgc3VwZXIoJ2NvbnRhY3RHcm91cCcsIGVsZW1lbnRSZWYsIGluamVjdG9yKTtcbiAgICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29udGFjdCB7XG4gICAgdGVzdDogc3RyaW5nO1xuICAgIHN0YXR1czogJ2FjdGl2ZScgfCAncGFzc2l2ZSc7XG4gICAgY3VzdG9tVG9vbHRpcD86IHtcbiAgICAgICAgdGVtcGxhdGU6IHN0cmluZyxcbiAgICAgICAgdG9vbHRpcFBvc2l0aW9uOiBzdHJpbmc7XG4gICAgICAgIGRhdGE/OiBhbnk7XG4gICAgfTtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBPcmdhbml6YXRpb24ge1xuICAgIHRleHQ6IHN0cmluZztcbiAgICBsYWJlbDogJ2V4dGVybmFsJyB8ICdyaXNrJztcbiAgICB0b29sdGlwPzogc3RyaW5nO1xuICAgIGN1c3RvbVRvb2x0aXA/OiB7XG4gICAgICAgIHRlbXBsYXRlOiBzdHJpbmcsXG4gICAgICAgIHRvb2x0aXBQb3NpdGlvbjogc3RyaW5nO1xuICAgICAgICBkYXRhPzogYW55O1xuICAgIH07XG59Il19