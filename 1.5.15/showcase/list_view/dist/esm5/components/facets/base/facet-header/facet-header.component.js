/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Output, EventEmitter, Input } from '@angular/core';
var FacetHeaderComponent = (function () {
    function FacetHeaderComponent() {
        this.canExpand = true;
        this.expanded = true;
        this.expandedChange = new EventEmitter();
    }
    /**
     * @return {?}
     */
    FacetHeaderComponent.prototype.toggleExpand = /**
     * @return {?}
     */
    function () {
        // if not expandable then do nothing
        if (this.canExpand) {
            this.expanded = !this.expanded;
            this.expandedChange.emit(this.expanded);
        }
    };
    FacetHeaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-facet-header',
                    template: "<span class=\"facet-header-title\">{{ header }}</span>\n<span class=\"hpe-icon\" [class.hpe-down]=\"expanded\" [class.hpe-previous]=\"!expanded\" *ngIf=\"canExpand\"></span>",
                    host: {
                        'tabindex': '0',
                        '(click)': 'toggleExpand()',
                        '(keyup.enter)': 'toggleExpand()'
                    }
                },] },
    ];
    /** @nocollapse */
    FacetHeaderComponent.propDecorators = {
        "header": [{ type: Input },],
        "canExpand": [{ type: Input },],
        "expanded": [{ type: Input },],
        "expandedChange": [{ type: Output },],
    };
    return FacetHeaderComponent;
}());
export { FacetHeaderComponent };
function FacetHeaderComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FacetHeaderComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FacetHeaderComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FacetHeaderComponent.propDecorators;
    /** @type {?} */
    FacetHeaderComponent.prototype.header;
    /** @type {?} */
    FacetHeaderComponent.prototype.canExpand;
    /** @type {?} */
    FacetHeaderComponent.prototype.expanded;
    /** @type {?} */
    FacetHeaderComponent.prototype.expandedChange;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZhY2V0cy9iYXNlL2ZhY2V0LWhlYWRlci9mYWNldC1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7eUJBZXJDLElBQUk7d0JBQ0wsSUFBSTs4QkFDaUIsSUFBSSxZQUFZLEVBQVc7Ozs7O0lBRTdFLDJDQUFZOzs7SUFBWjs7UUFHSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDM0M7S0FDSjs7Z0JBeEJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsK0tBQ2dHO29CQUMxRyxJQUFJLEVBQUU7d0JBQ0YsVUFBVSxFQUFFLEdBQUc7d0JBQ2YsU0FBUyxFQUFFLGdCQUFnQjt3QkFDM0IsZUFBZSxFQUFFLGdCQUFnQjtxQkFDcEM7aUJBQ0o7Ozs7MkJBR0ksS0FBSzs4QkFDTCxLQUFLOzZCQUNMLEtBQUs7bUNBQ0wsTUFBTTs7K0JBakJYOztTQVlhLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmFjZXQtaGVhZGVyJyxcbiAgICB0ZW1wbGF0ZTogYDxzcGFuIGNsYXNzPVwiZmFjZXQtaGVhZGVyLXRpdGxlXCI+e3sgaGVhZGVyIH19PC9zcGFuPlxuPHNwYW4gY2xhc3M9XCJocGUtaWNvblwiIFtjbGFzcy5ocGUtZG93bl09XCJleHBhbmRlZFwiIFtjbGFzcy5ocGUtcHJldmlvdXNdPVwiIWV4cGFuZGVkXCIgKm5nSWY9XCJjYW5FeHBhbmRcIj48L3NwYW4+YCxcbiAgICBob3N0OiB7XG4gICAgICAgICd0YWJpbmRleCc6ICcwJyxcbiAgICAgICAgJyhjbGljayknOiAndG9nZ2xlRXhwYW5kKCknLFxuICAgICAgICAnKGtleXVwLmVudGVyKSc6ICd0b2dnbGVFeHBhbmQoKSdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0SGVhZGVyQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGhlYWRlcjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNhbkV4cGFuZDogYm9vbGVhbiA9IHRydWU7ICAgIFxuICAgIEBJbnB1dCgpIGV4cGFuZGVkOiBib29sZWFuID0gdHJ1ZTtcbiAgICBAT3V0cHV0KCkgZXhwYW5kZWRDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIHRvZ2dsZUV4cGFuZCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiBub3QgZXhwYW5kYWJsZSB0aGVuIGRvIG5vdGhpbmdcbiAgICAgICAgaWYgKHRoaXMuY2FuRXhwYW5kKSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZGVkID0gIXRoaXMuZXhwYW5kZWQ7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZGVkQ2hhbmdlLmVtaXQodGhpcy5leHBhbmRlZCk7XG4gICAgICAgIH1cbiAgICB9XG59Il19