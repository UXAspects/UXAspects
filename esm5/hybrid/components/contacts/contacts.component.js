/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
var ContactsNg1Component = (function (_super) {
    tslib_1.__extends(ContactsNg1Component, _super);
    function ContactsNg1Component(elementRef, injector) {
        var _this = _super.call(this, 'contactGroup', elementRef, injector) || this;
        _this.overflowClick = new EventEmitter();
        return _this;
    }
    ContactsNg1Component.decorators = [
        { type: Directive, args: [{
                    selector: 'contact-group'
                },] },
    ];
    /** @nocollapse */
    ContactsNg1Component.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Injector, },
    ]; };
    ContactsNg1Component.propDecorators = {
        "contacts": [{ type: Input },],
        "organization": [{ type: Input },],
        "size": [{ type: Input },],
        "colors": [{ type: Input },],
        "maxContacts": [{ type: Input },],
        "overflowClick": [{ type: Output },],
    };
    return ContactsNg1Component;
}(UpgradeComponent));
export { ContactsNg1Component };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFjdHMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImh5YnJpZC9jb21wb25lbnRzL2NvbnRhY3RzL2NvbnRhY3RzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQzs7SUFLakIsZ0RBQWdCO0lBVXRELDhCQUFZLFVBQXNCLEVBQUUsUUFBa0I7UUFBdEQsWUFDSSxrQkFBTSxjQUFjLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQyxTQUM5Qzs4QkFKNkMsSUFBSSxZQUFZLEVBQVE7O0tBSXJFOztnQkFmSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGVBQWU7aUJBQzVCOzs7O2dCQUxtQixVQUFVO2dCQUFFLFFBQVE7Ozs2QkFRbkMsS0FBSztpQ0FDTCxLQUFLO3lCQUNMLEtBQUs7MkJBQ0wsS0FBSztnQ0FDTCxLQUFLO2tDQUVMLE1BQU07OytCQWRYO0VBTTBDLGdCQUFnQjtTQUE3QyxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEluamVjdG9yLCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFVwZ3JhZGVDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci91cGdyYWRlL3N0YXRpYyc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnY29udGFjdC1ncm91cCdcbn0pXG5leHBvcnQgY2xhc3MgQ29udGFjdHNOZzFDb21wb25lbnQgZXh0ZW5kcyBVcGdyYWRlQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGNvbnRhY3RzOiBDb250YWN0W107XG4gICAgQElucHV0KCkgb3JnYW5pemF0aW9uOiBzdHJpbmc7XG4gICAgQElucHV0KCkgc2l6ZTogJ21lZGl1bScgfCAnc21hbGwnO1xuICAgIEBJbnB1dCgpIGNvbG9yczogYW55O1xuICAgIEBJbnB1dCgpIG1heENvbnRhY3RzOiBudW1iZXI7XG5cbiAgICBAT3V0cHV0KCkgb3ZlcmZsb3dDbGljazogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoZWxlbWVudFJlZjogRWxlbWVudFJlZiwgaW5qZWN0b3I6IEluamVjdG9yKSB7XG4gICAgICAgIHN1cGVyKCdjb250YWN0R3JvdXAnLCBlbGVtZW50UmVmLCBpbmplY3Rvcik7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbnRhY3Qge1xuICAgIHRlc3Q6IHN0cmluZztcbiAgICBzdGF0dXM6ICdhY3RpdmUnIHwgJ3Bhc3NpdmUnO1xuICAgIGN1c3RvbVRvb2x0aXA/OiB7XG4gICAgICAgIHRlbXBsYXRlOiBzdHJpbmcsXG4gICAgICAgIHRvb2x0aXBQb3NpdGlvbjogc3RyaW5nO1xuICAgICAgICBkYXRhPzogYW55O1xuICAgIH07XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgT3JnYW5pemF0aW9uIHtcbiAgICB0ZXh0OiBzdHJpbmc7XG4gICAgbGFiZWw6ICdleHRlcm5hbCcgfCAncmlzayc7XG4gICAgdG9vbHRpcD86IHN0cmluZztcbiAgICBjdXN0b21Ub29sdGlwPzoge1xuICAgICAgICB0ZW1wbGF0ZTogc3RyaW5nLFxuICAgICAgICB0b29sdGlwUG9zaXRpb246IHN0cmluZztcbiAgICAgICAgZGF0YT86IGFueTtcbiAgICB9O1xufSJdfQ==