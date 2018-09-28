/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
var /** @type {?} */ uniqueId = 0;
var TimelineEventComponent = /** @class */ (function () {
    function TimelineEventComponent() {
        this.id = "ux-timeline-event-" + uniqueId++;
    }
    TimelineEventComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-timeline-event',
                    template: "<div class=\"timeline-badge\" [ngClass]=\"badgeColor\" [attr.aria-describedby]=\"id\">\r\n    <span>{{ badgeTitle }}</span>\r\n</div>\r\n\r\n<div class=\"timeline-panel\" [id]=\"id\">\r\n    <ng-content></ng-content>\r\n</div>\r\n"
                }] }
    ];
    TimelineEventComponent.propDecorators = {
        id: [{ type: Input }],
        badgeColor: [{ type: Input }],
        badgeTitle: [{ type: Input }]
    };
    return TimelineEventComponent;
}());
export { TimelineEventComponent };
function TimelineEventComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TimelineEventComponent.prototype.id;
    /** @type {?} */
    TimelineEventComponent.prototype.badgeColor;
    /** @type {?} */
    TimelineEventComponent.prototype.badgeTitle;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUtZXZlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGltZWxpbmUvdGltZWxpbmUtZXZlbnQvdGltZWxpbmUtZXZlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRCxxQkFBSSxRQUFRLEdBQVcsQ0FBQyxDQUFDOzs7a0JBUUMsdUJBQXFCLFFBQVEsRUFBSTs7O2dCQU4xRCxTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtvQkFDN0Isa1BBQThDO2lCQUNqRDs7O3FCQUdJLEtBQUs7NkJBQ0wsS0FBSzs2QkFDTCxLQUFLOztpQ0FaVjs7U0FRYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5sZXQgdW5pcXVlSWQ6IG51bWJlciA9IDA7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndXgtdGltZWxpbmUtZXZlbnQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RpbWVsaW5lLWV2ZW50LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGltZWxpbmVFdmVudENvbXBvbmVudCB7XHJcblxyXG4gICAgQElucHV0KCkgaWQ6IHN0cmluZyA9IGB1eC10aW1lbGluZS1ldmVudC0ke3VuaXF1ZUlkKyt9YDtcclxuICAgIEBJbnB1dCgpIGJhZGdlQ29sb3I6IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGJhZGdlVGl0bGU6IHN0cmluZztcclxufSJdfQ==