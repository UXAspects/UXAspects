/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { AccordionService } from '../accordion.service';
let /** @type {?} */ uniqueId = 1;
export class AccordionPanelComponent {
    /**
     * @param {?} accordion
     */
    constructor(accordion) {
        this.accordion = accordion;
        this.panelId = `ux-accordion-panel-${uniqueId++}`;
        this.headingId = `${this.panelId}-heading`;
        this.disabled = false;
        this.expanded = false;
        this.expandedChange = new EventEmitter();
        accordion.collapse.subscribe(() => this.collapse());
    }
    /**
     * @return {?}
     */
    toggle() {
        if (this.expanded) {
            this.collapse();
            return;
        }
        // check if we should collapse others
        if (this.accordion.collapseOthers) {
            this.accordion.collapseAll();
        }
        // store the new expanded state
        this.expand();
    }
    /**
     * @return {?}
     */
    expand() {
        if (this.disabled === false && this.expanded === false) {
            this.expanded = true;
            this.expandedChange.next(true);
        }
    }
    /**
     * @return {?}
     */
    collapse() {
        if (this.disabled === false && this.expanded === true) {
            this.expanded = false;
            this.expandedChange.next(false);
        }
    }
}
AccordionPanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-accordion-panel',
                template: "<div class=\"panel-heading\"\n      role=\"button\"\n      [tabindex]=\"disabled ? -1 : 0\"\n      [id]=\"headingId\"\n      [attr.aria-expanded]=\"expanded\"\n      [attr.aria-controls]=\"panelId\"\n      (click)=\"toggle()\"\n      (keydown.enter)=\"toggle()\"\n      (keydown.space)=\"toggle(); $event.preventDefault()\"\n      (keydown.spacebar)=\"toggle(); $event.preventDefault()\">\n\n  <div class=\"panel-title\">\n      {{ heading }}\n      <ng-content select=\"ux-accordion-panel-header\"></ng-content>\n  </div>\n</div>\n\n<div [id]=\"panelId\"\n      class=\"panel-collapse collapse\"\n      [class.in]=\"expanded\"\n      role=\"tabpanel\"\n      [attr.aria-labelledby]=\"headingId\">\n\n  <div class=\"panel-body\">\n    <ng-content></ng-content>\n  </div>\n</div>",
                host: {
                    'class': 'panel panel-default',
                    'role': 'tab'
                }
            }] }
];
/** @nocollapse */
AccordionPanelComponent.ctorParameters = () => [
    { type: AccordionService }
];
AccordionPanelComponent.propDecorators = {
    panelId: [{ type: Input }],
    headingId: [{ type: Input }],
    disabled: [{ type: Input }],
    heading: [{ type: Input }],
    expanded: [{ type: Input }, { type: HostBinding, args: ['class.panel-open',] }],
    expandedChange: [{ type: Output }]
};
function AccordionPanelComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AccordionPanelComponent.prototype.panelId;
    /** @type {?} */
    AccordionPanelComponent.prototype.headingId;
    /** @type {?} */
    AccordionPanelComponent.prototype.disabled;
    /** @type {?} */
    AccordionPanelComponent.prototype.heading;
    /** @type {?} */
    AccordionPanelComponent.prototype.expanded;
    /** @type {?} */
    AccordionPanelComponent.prototype.expandedChange;
    /** @type {?} */
    AccordionPanelComponent.prototype.accordion;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2FjY29yZGlvbi9hY2NvcmRpb24tcGFuZWwvYWNjb3JkaW9uLXBhbmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQscUJBQUksUUFBUSxHQUFXLENBQUMsQ0FBQztBQVV6QixNQUFNOzs7O0lBV0YsWUFBbUIsU0FBMkI7UUFBM0IsY0FBUyxHQUFULFNBQVMsQ0FBa0I7dUJBVG5CLHNCQUFzQixRQUFRLEVBQUUsRUFBRTt5QkFDaEMsR0FBRyxJQUFJLENBQUMsT0FBTyxVQUFVO3dCQUV6QixLQUFLO3dCQUU0QixLQUFLOzhCQUV4QyxJQUFJLFlBQVksRUFBVztRQUdsRCxTQUFTLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUN2RDs7OztJQUVELE1BQU07UUFFRixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNoQixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEIsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO1lBQ2hDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDaEM7O1FBR0QsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDO0tBQ2pCOzs7O0lBRUQsTUFBTTtRQUNGLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNyRCxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNsQztLQUNKOzs7O0lBRUQsUUFBUTtRQUNKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQztLQUNKOzs7WUFuREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxvQkFBb0I7Z0JBQzlCLHN4QkFBK0M7Z0JBQy9DLElBQUksRUFBRTtvQkFDRixPQUFPLEVBQUUscUJBQXFCO29CQUM5QixNQUFNLEVBQUUsS0FBSztpQkFDaEI7YUFDSjs7OztZQVhRLGdCQUFnQjs7O3NCQWNwQixLQUFLO3dCQUNMLEtBQUs7dUJBRUwsS0FBSztzQkFDTCxLQUFLO3VCQUNMLEtBQUssWUFBSSxXQUFXLFNBQUMsa0JBQWtCOzZCQUV2QyxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFdmVudEVtaXR0ZXIsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY2NvcmRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vYWNjb3JkaW9uLnNlcnZpY2UnO1xuXG5sZXQgdW5pcXVlSWQ6IG51bWJlciA9IDE7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtYWNjb3JkaW9uLXBhbmVsJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYWNjb3JkaW9uLXBhbmVsLmNvbXBvbmVudC5odG1sJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICdwYW5lbCBwYW5lbC1kZWZhdWx0JyxcbiAgICAgICAgJ3JvbGUnOiAndGFiJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQWNjb3JkaW9uUGFuZWxDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgcGFuZWxJZDogc3RyaW5nID0gYHV4LWFjY29yZGlvbi1wYW5lbC0ke3VuaXF1ZUlkKyt9YDtcbiAgICBASW5wdXQoKSBoZWFkaW5nSWQ6IHN0cmluZyA9IGAke3RoaXMucGFuZWxJZH0taGVhZGluZ2A7XG5cbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGhlYWRpbmc6IHN0cmluZztcbiAgICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzLnBhbmVsLW9wZW4nKSBleHBhbmRlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIGV4cGFuZGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGFjY29yZGlvbjogQWNjb3JkaW9uU2VydmljZSkge1xuICAgICAgICBhY2NvcmRpb24uY29sbGFwc2Uuc3Vic2NyaWJlKCgpID0+IHRoaXMuY29sbGFwc2UoKSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuXG4gICAgICAgIGlmICh0aGlzLmV4cGFuZGVkKSB7XG4gICAgICAgICAgICB0aGlzLmNvbGxhcHNlKCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB3ZSBzaG91bGQgY29sbGFwc2Ugb3RoZXJzXG4gICAgICAgIGlmICh0aGlzLmFjY29yZGlvbi5jb2xsYXBzZU90aGVycykge1xuICAgICAgICAgICAgdGhpcy5hY2NvcmRpb24uY29sbGFwc2VBbGwoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHN0b3JlIHRoZSBuZXcgZXhwYW5kZWQgc3RhdGVcbiAgICAgICAgdGhpcy5leHBhbmQoKTtcbiAgICB9XG5cbiAgICBleHBhbmQoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkID09PSBmYWxzZSAmJiB0aGlzLmV4cGFuZGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgdGhpcy5leHBhbmRlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZGVkQ2hhbmdlLm5leHQodHJ1ZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBjb2xsYXBzZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgPT09IGZhbHNlICYmIHRoaXMuZXhwYW5kZWQgPT09IHRydWUpIHtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2UubmV4dChmYWxzZSk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=