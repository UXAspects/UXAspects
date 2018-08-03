/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
var TimelineEventComponent = /** @class */ (function () {
    function TimelineEventComponent() {
    }
    TimelineEventComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-timeline-event',
                    template: "<div class=\"timeline-badge\" [ngClass]=\"badgeColor\">\r\n    <span>{{badgeTitle}}</span>\r\n</div>\r\n<div class=\"timeline-panel\">\r\n    <ng-content></ng-content>\r\n</div>\r\n"
                }] }
    ];
    TimelineEventComponent.propDecorators = {
        badgeColor: [{ type: Input }],
        badgeTitle: [{ type: Input }]
    };
    return TimelineEventComponent;
}());
export { TimelineEventComponent };
function TimelineEventComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TimelineEventComponent.prototype.badgeColor;
    /** @type {?} */
    TimelineEventComponent.prototype.badgeTitle;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUtZXZlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGltZWxpbmUvdGltZWxpbmUtZXZlbnQvdGltZWxpbmUtZXZlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Z0JBRWhELFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsbUJBQW1CO29CQUM3QixpTUFBOEM7aUJBQ2pEOzs7NkJBR0ksS0FBSzs2QkFDTCxLQUFLOztpQ0FUVjs7U0FNYSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndXgtdGltZWxpbmUtZXZlbnQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICcuL3RpbWVsaW5lLWV2ZW50LmNvbXBvbmVudC5odG1sJ1xyXG59KVxyXG5leHBvcnQgY2xhc3MgVGltZWxpbmVFdmVudENvbXBvbmVudCB7XHJcblxyXG4gICAgQElucHV0KCkgYmFkZ2VDb2xvcjogc3RyaW5nO1xyXG4gICAgQElucHV0KCkgYmFkZ2VUaXRsZTogc3RyaW5nO1xyXG59Il19