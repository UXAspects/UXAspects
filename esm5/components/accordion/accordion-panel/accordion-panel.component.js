/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, EventEmitter, HostBinding, Input, Output } from '@angular/core';
import { AccordionService } from '../accordion.service';
var /** @type {?} */ uniqueId = 1;
var AccordionPanelComponent = /** @class */ (function () {
    function AccordionPanelComponent(accordion) {
        var _this = this;
        this.accordion = accordion;
        this.panelId = "ux-accordion-panel-" + uniqueId++;
        this.headingId = this.panelId + "-heading";
        this.disabled = false;
        this.expanded = false;
        this.expandedChange = new EventEmitter();
        accordion.collapse.subscribe(function () { return _this.collapse(); });
    }
    /**
     * @return {?}
     */
    AccordionPanelComponent.prototype.toggle = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @return {?}
     */
    AccordionPanelComponent.prototype.expand = /**
     * @return {?}
     */
    function () {
        if (this.disabled === false && this.expanded === false) {
            this.expanded = true;
            this.expandedChange.next(true);
        }
    };
    /**
     * @return {?}
     */
    AccordionPanelComponent.prototype.collapse = /**
     * @return {?}
     */
    function () {
        if (this.disabled === false && this.expanded === true) {
            this.expanded = false;
            this.expandedChange.next(false);
        }
    };
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
    AccordionPanelComponent.ctorParameters = function () { return [
        { type: AccordionService }
    ]; };
    AccordionPanelComponent.propDecorators = {
        panelId: [{ type: Input }],
        headingId: [{ type: Input }],
        disabled: [{ type: Input }],
        heading: [{ type: Input }],
        expanded: [{ type: Input }, { type: HostBinding, args: ['class.panel-open',] }],
        expandedChange: [{ type: Output }]
    };
    return AccordionPanelComponent;
}());
export { AccordionPanelComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2FjY29yZGlvbi9hY2NvcmRpb24tcGFuZWwvYWNjb3JkaW9uLXBhbmVsLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDcEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFeEQscUJBQUksUUFBUSxHQUFXLENBQUMsQ0FBQzs7SUFxQnJCLGlDQUFtQixTQUEyQjtRQUE5QyxpQkFFQztRQUZrQixjQUFTLEdBQVQsU0FBUyxDQUFrQjt1QkFUbkIsd0JBQXNCLFFBQVEsRUFBSTt5QkFDN0IsSUFBSSxDQUFDLE9BQU8sYUFBVTt3QkFFekIsS0FBSzt3QkFFNEIsS0FBSzs4QkFFeEMsSUFBSSxZQUFZLEVBQVc7UUFHbEQsU0FBUyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxRQUFRLEVBQUUsRUFBZixDQUFlLENBQUMsQ0FBQztLQUN2RDs7OztJQUVELHdDQUFNOzs7SUFBTjtRQUVJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNoQixNQUFNLENBQUM7U0FDVjs7UUFHRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUNoQzs7UUFHRCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7S0FDakI7Ozs7SUFFRCx3Q0FBTTs7O0lBQU47UUFDSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsUUFBUSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDckQsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEM7S0FDSjs7OztJQUVELDBDQUFROzs7SUFBUjtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxRQUFRLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNwRCxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztZQUN0QixJQUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQztLQUNKOztnQkFuREosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxvQkFBb0I7b0JBQzlCLHN4QkFBK0M7b0JBQy9DLElBQUksRUFBRTt3QkFDRixPQUFPLEVBQUUscUJBQXFCO3dCQUM5QixNQUFNLEVBQUUsS0FBSztxQkFDaEI7aUJBQ0o7Ozs7Z0JBWFEsZ0JBQWdCOzs7MEJBY3BCLEtBQUs7NEJBQ0wsS0FBSzsyQkFFTCxLQUFLOzBCQUNMLEtBQUs7MkJBQ0wsS0FBSyxZQUFJLFdBQVcsU0FBQyxrQkFBa0I7aUNBRXZDLE1BQU07O2tDQXRCWDs7U0FhYSx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPdXRwdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjY29yZGlvblNlcnZpY2UgfSBmcm9tICcuLi9hY2NvcmRpb24uc2VydmljZSc7XG5cbmxldCB1bmlxdWVJZDogbnVtYmVyID0gMTtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1hY2NvcmRpb24tcGFuZWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hY2NvcmRpb24tcGFuZWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ3BhbmVsIHBhbmVsLWRlZmF1bHQnLFxuICAgICAgICAncm9sZSc6ICd0YWInXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBBY2NvcmRpb25QYW5lbENvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBwYW5lbElkOiBzdHJpbmcgPSBgdXgtYWNjb3JkaW9uLXBhbmVsLSR7dW5pcXVlSWQrK31gO1xuICAgIEBJbnB1dCgpIGhlYWRpbmdJZDogc3RyaW5nID0gYCR7dGhpcy5wYW5lbElkfS1oZWFkaW5nYDtcblxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgaGVhZGluZzogc3RyaW5nO1xuICAgIEBJbnB1dCgpIEBIb3N0QmluZGluZygnY2xhc3MucGFuZWwtb3BlbicpIGV4cGFuZGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgZXhwYW5kZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgYWNjb3JkaW9uOiBBY2NvcmRpb25TZXJ2aWNlKSB7XG4gICAgICAgIGFjY29yZGlvbi5jb2xsYXBzZS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5jb2xsYXBzZSgpKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG5cbiAgICAgICAgaWYgKHRoaXMuZXhwYW5kZWQpIHtcbiAgICAgICAgICAgIHRoaXMuY29sbGFwc2UoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIHdlIHNob3VsZCBjb2xsYXBzZSBvdGhlcnNcbiAgICAgICAgaWYgKHRoaXMuYWNjb3JkaW9uLmNvbGxhcHNlT3RoZXJzKSB7XG4gICAgICAgICAgICB0aGlzLmFjY29yZGlvbi5jb2xsYXBzZUFsbCgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIG5ldyBleHBhbmRlZCBzdGF0ZVxuICAgICAgICB0aGlzLmV4cGFuZCgpO1xuICAgIH1cblxuICAgIGV4cGFuZCgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgPT09IGZhbHNlICYmIHRoaXMuZXhwYW5kZWQgPT09IGZhbHNlKSB7XG4gICAgICAgICAgICB0aGlzLmV4cGFuZGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuZXhwYW5kZWRDaGFuZ2UubmV4dCh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGNvbGxhcHNlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCA9PT0gZmFsc2UgJiYgdGhpcy5leHBhbmRlZCA9PT0gdHJ1ZSkge1xuICAgICAgICAgICAgdGhpcy5leHBhbmRlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5leHBhbmRlZENoYW5nZS5uZXh0KGZhbHNlKTtcbiAgICAgICAgfVxuICAgIH1cblxufSJdfQ==