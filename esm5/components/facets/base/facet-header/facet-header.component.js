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
    FacetHeaderComponent.ctorParameters = function () { return []; };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtaGVhZGVyLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2ZhY2V0cy9iYXNlL2ZhY2V0LWhlYWRlci9mYWNldC1oZWFkZXIuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLE1BQU0sZUFBZSxDQUFDOzs7eUJBZXJDLElBQUk7d0JBQ0wsSUFBSTs4QkFDaUIsSUFBSSxZQUFZLEVBQVc7Ozs7O0lBRTdFLDJDQUFZOzs7SUFBWjs7UUFHSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNqQixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMvQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDM0M7S0FDSjs7Z0JBeEJKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsaUJBQWlCO29CQUMzQixRQUFRLEVBQUUsK0tBQ2dHO29CQUMxRyxJQUFJLEVBQUU7d0JBQ0YsVUFBVSxFQUFFLEdBQUc7d0JBQ2YsU0FBUyxFQUFFLGdCQUFnQjt3QkFDM0IsZUFBZSxFQUFFLGdCQUFnQjtxQkFDcEM7aUJBQ0o7Ozs7OzJCQUdJLEtBQUs7OEJBQ0wsS0FBSzs2QkFDTCxLQUFLO21DQUNMLE1BQU07OytCQWpCWDs7U0FZYSxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZhY2V0LWhlYWRlcicsXG4gICAgdGVtcGxhdGU6IGA8c3BhbiBjbGFzcz1cImZhY2V0LWhlYWRlci10aXRsZVwiPnt7IGhlYWRlciB9fTwvc3Bhbj5cbjxzcGFuIGNsYXNzPVwiaHBlLWljb25cIiBbY2xhc3MuaHBlLWRvd25dPVwiZXhwYW5kZWRcIiBbY2xhc3MuaHBlLXByZXZpb3VzXT1cIiFleHBhbmRlZFwiICpuZ0lmPVwiY2FuRXhwYW5kXCI+PC9zcGFuPmAsXG4gICAgaG9zdDoge1xuICAgICAgICAndGFiaW5kZXgnOiAnMCcsXG4gICAgICAgICcoY2xpY2spJzogJ3RvZ2dsZUV4cGFuZCgpJyxcbiAgICAgICAgJyhrZXl1cC5lbnRlciknOiAndG9nZ2xlRXhwYW5kKCknXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBGYWNldEhlYWRlckNvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBjYW5FeHBhbmQ6IGJvb2xlYW4gPSB0cnVlOyAgICBcbiAgICBASW5wdXQoKSBleHBhbmRlZDogYm9vbGVhbiA9IHRydWU7XG4gICAgQE91dHB1dCgpIGV4cGFuZGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICB0b2dnbGVFeHBhbmQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgbm90IGV4cGFuZGFibGUgdGhlbiBkbyBub3RoaW5nXG4gICAgICAgIGlmICh0aGlzLmNhbkV4cGFuZCkge1xuICAgICAgICAgICAgdGhpcy5leHBhbmRlZCA9ICF0aGlzLmV4cGFuZGVkO1xuICAgICAgICAgICAgdGhpcy5leHBhbmRlZENoYW5nZS5lbWl0KHRoaXMuZXhwYW5kZWQpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==