/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
let /** @type {?} */ uniqueId = 0;
export class TimelineEventComponent {
    constructor() {
        this.id = `ux-timeline-event-${uniqueId++}`;
    }
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
function TimelineEventComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TimelineEventComponent.prototype.id;
    /** @type {?} */
    TimelineEventComponent.prototype.badgeColor;
    /** @type {?} */
    TimelineEventComponent.prototype.badgeTitle;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGltZWxpbmUtZXZlbnQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdGltZWxpbmUvdGltZWxpbmUtZXZlbnQvdGltZWxpbmUtZXZlbnQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUVqRCxxQkFBSSxRQUFRLEdBQVcsQ0FBQyxDQUFDO0FBTXpCLE1BQU07O2tCQUVvQixxQkFBcUIsUUFBUSxFQUFFLEVBQUU7Ozs7WUFOMUQsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLGtQQUE4QzthQUNqRDs7O2lCQUdJLEtBQUs7eUJBQ0wsS0FBSzt5QkFDTCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5cclxubGV0IHVuaXF1ZUlkOiBudW1iZXIgPSAwO1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3V4LXRpbWVsaW5lLWV2ZW50JyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi90aW1lbGluZS1ldmVudC5jb21wb25lbnQuaHRtbCdcclxufSlcclxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lRXZlbnRDb21wb25lbnQge1xyXG5cclxuICAgIEBJbnB1dCgpIGlkOiBzdHJpbmcgPSBgdXgtdGltZWxpbmUtZXZlbnQtJHt1bmlxdWVJZCsrfWA7XHJcbiAgICBASW5wdXQoKSBiYWRnZUNvbG9yOiBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBiYWRnZVRpdGxlOiBzdHJpbmc7XHJcbn0iXX0=