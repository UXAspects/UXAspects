/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, Input, Output } from '@angular/core';
export class FacetHeaderComponent {
    constructor() {
        this.canExpand = true;
        this.expanded = true;
        this.expandedChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    toggleExpand() {
        // if not expandable then do nothing
        if (this.canExpand) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    }
}
FacetHeaderComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-header',
                template: "<span class=\"facet-header-title\">{{ header }}</span>\n<span class=\"hpe-icon\" [class.hpe-down]=\"expanded\" [class.hpe-previous]=\"!expanded\" *ngIf=\"canExpand\"></span>",
                host: {
                    'role': 'button',
                    'tabindex': '0',
                    '(click)': 'toggleExpand()',
                    '(keyup.enter)': 'toggleExpand()',
                    '[attr.aria-expanded]': 'expanded',
                    '[attr.aria-label]': 'header + \' Facet: Activate to \' + (expanded ? \'collapse\' : \'expand\')'
                }
            }] }
];
FacetHeaderComponent.propDecorators = {
    header: [{ type: Input }],
    canExpand: [{ type: Input }],
    expanded: [{ type: Input }],
    expandedChange: [{ type: Output }]
};
function FacetHeaderComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FacetHeaderComponent.prototype.header;
    /** @type {?} */
    FacetHeaderComponent.prototype.canExpand;
    /** @type {?} */
    FacetHeaderComponent.prototype.expanded;
    /** @type {?} */
    FacetHeaderComponent.prototype.expandedChange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZhY2V0cy9iYXNlL2ZhY2V0LWhlYWRlci9mYWNldC1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBY3ZFLE1BQU07O3lCQUc0QixJQUFJO3dCQUNMLElBQUk7OEJBQ2lCLElBQUksWUFBWSxFQUFXOzs7OztJQUU3RSxZQUFZOztRQUdSLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBQy9CLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUMzQztLQUNKOzs7WUExQkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxpQkFBaUI7Z0JBQzNCLHlMQUE0QztnQkFDNUMsSUFBSSxFQUFFO29CQUNGLE1BQU0sRUFBRSxRQUFRO29CQUNoQixVQUFVLEVBQUUsR0FBRztvQkFDZixTQUFTLEVBQUUsZ0JBQWdCO29CQUMzQixlQUFlLEVBQUUsZ0JBQWdCO29CQUNqQyxzQkFBc0IsRUFBRSxVQUFVO29CQUNsQyxtQkFBbUIsRUFBRSw0RUFBNEU7aUJBQ3BHO2FBQ0o7OztxQkFHSSxLQUFLO3dCQUNMLEtBQUs7dUJBQ0wsS0FBSzs2QkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1mYWNldC1oZWFkZXInLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9mYWNldC1oZWFkZXIuY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ3JvbGUnOiAnYnV0dG9uJyxcbiAgICAgICAgJ3RhYmluZGV4JzogJzAnLFxuICAgICAgICAnKGNsaWNrKSc6ICd0b2dnbGVFeHBhbmQoKScsXG4gICAgICAgICcoa2V5dXAuZW50ZXIpJzogJ3RvZ2dsZUV4cGFuZCgpJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtZXhwYW5kZWRdJzogJ2V4cGFuZGVkJyxcbiAgICAgICAgJ1thdHRyLmFyaWEtbGFiZWxdJzogJ2hlYWRlciArIFxcJyBGYWNldDogQWN0aXZhdGUgdG8gXFwnICsgKGV4cGFuZGVkID8gXFwnY29sbGFwc2VcXCcgOiBcXCdleHBhbmRcXCcpJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRmFjZXRIZWFkZXJDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XG4gICAgQElucHV0KCkgY2FuRXhwYW5kOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBleHBhbmRlZDogYm9vbGVhbiA9IHRydWU7XG4gICAgQE91dHB1dCgpIGV4cGFuZGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICB0b2dnbGVFeHBhbmQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgbm90IGV4cGFuZGFibGUgdGhlbiBkbyBub3RoaW5nXG4gICAgICAgIGlmICh0aGlzLmNhbkV4cGFuZCkge1xuICAgICAgICAgICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuICAgICAgICAgICAgdGhpcy5leHBhbmRlZENoYW5nZS5lbWl0KHRoaXMuZXhwYW5kZWQpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==