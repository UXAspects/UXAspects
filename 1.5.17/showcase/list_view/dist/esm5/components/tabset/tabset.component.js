/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TabsetService } from './tabset.service';
var TabsetComponent = (function () {
    function TabsetComponent(tabset) {
        this.tabset = tabset;
        this.minimal = true;
        this.stacked = 'none';
    }
    /**
     * Allow manual tab selected
     */
    /**
     * Allow manual tab selected
     * @param {?} tab
     * @return {?}
     */
    TabsetComponent.prototype.select = /**
     * Allow manual tab selected
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        this.tabset.select(tab);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TabsetComponent.prototype.selectPreviousTab = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // determine which arrow key is pressed
        var /** @type {?} */ arrowLeft = event.key === 'ArrowLeft' || event.keyCode === 37;
        var /** @type {?} */ arrowUp = event.key === 'ArrowUp' || event.keyCode === 38;
        // only perform action if the arrow key matches the orientation
        if (arrowLeft && this.stacked !== 'none' || arrowUp && this.stacked === 'none') {
            return;
        }
        // perform selection
        this.tabset.selectPreviousTab();
        // prevent the browser from scrolling when arrow keys are pressed
        event.preventDefault();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TabsetComponent.prototype.selectNextTab = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // determine which arrow key is pressed
        var /** @type {?} */ arrowRight = event.key === 'ArrowRight' || event.keyCode === 39;
        var /** @type {?} */ arrowDown = event.key === 'ArrowDown' || event.keyCode === 40;
        // only perform action if the arrow key matches the orientation
        if (arrowRight && this.stacked !== 'none' || arrowDown && this.stacked === 'none') {
            return;
        }
        // perform selection
        this.tabset.selectNextTab();
        // prevent the browser from scrolling when arrow keys are pressed
        event.preventDefault();
    };
    TabsetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-tabset',
                    template: "<!-- Nav tabs -->\n<ul role=\"tablist\"\n    class=\"nav nav-tabs\"\n    [class.minimal-tab]=\"minimal\"\n    [attr.aria-label]=\"ariaLabel\"\n    [attr.aria-orientation]=\"stacked === 'none' ? 'horizontal' : 'vertical'\">\n\n\t<li role=\"presentation\" \n        class=\"nav-item\"\n        *ngFor=\"let tab of tabset.tabs$ | async; let index = index\"\n        [class.active]=\"tab.active$ | async\"\n        [class.disabled]=\"tab.disabled\"\n        [ngClass]=\"tab.customClass\">\n\n        <a class=\"nav-link\"\n            [id]=\"tab.id\"\n            role=\"tab\"\n            [uxTabFocus]=\"tab\"\n            [tabindex]=\"(tab.active$ | async) ? 0 : -1\"\n            [class.highlighted]=\"(tabset.focused$ | async) && (tabset.highlighted$ | async) === tab\"            \n            (mousedown)=\"tabset.select(tab)\"\n            (focus)=\"tabset.focused$.next(true)\"\n            (blur)=\"tabset.focused$.next(false)\"\n            (mousedown)=\"tabset.focused$.next(true)\"\n            (keydown.ArrowUp)=\"selectPreviousTab($event)\"\n            (keydown.ArrowLeft)=\"selectPreviousTab($event)\"\n            (keydown.ArrowRight)=\"selectNextTab($event)\"\n            (keydown.ArrowDown)=\"selectNextTab($event)\"\n            (keydown.Home)=\"tabset.selectFirstTab(); $event.preventDefault()\"\n            (keydown.End)=\"tabset.selectLastTab(); $event.preventDefault()\"\n            [attr.aria-controls]=\"tab.id\"\n            [attr.aria-selected]=\"tab.active$ | async\"\n            [attr.aria-disabled]=\"tab.disabled\">\n\n            <span *ngIf=\"!tab.headingRef\">{{ tab.heading }}</span>\n\n            <ng-container *ngIf=\"tab.headingRef\" [ngTemplateOutlet]=\"tab.headingRef\"></ng-container>\n        </a>\n\n\t</li>\n\n</ul>\n\n<!-- Tab panes -->\n<div class=\"tab-content\">\n\t<ng-content></ng-content>\n</div>",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    providers: [TabsetService],
                    host: {
                        '[class.tabs-left]': 'stacked === "left"',
                        '[class.tabs-right]': 'stacked === "right"',
                    }
                },] },
    ];
    /** @nocollapse */
    TabsetComponent.ctorParameters = function () { return [
        { type: TabsetService, },
    ]; };
    TabsetComponent.propDecorators = {
        "minimal": [{ type: Input },],
        "stacked": [{ type: Input },],
        "ariaLabel": [{ type: Input, args: ['aria-label',] },],
    };
    return TabsetComponent;
}());
export { TabsetComponent };
function TabsetComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TabsetComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TabsetComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    TabsetComponent.propDecorators;
    /** @type {?} */
    TabsetComponent.prototype.minimal;
    /** @type {?} */
    TabsetComponent.prototype.stacked;
    /** @type {?} */
    TabsetComponent.prototype.ariaLabel;
    /** @type {?} */
    TabsetComponent.prototype.tabset;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhYnNldC90YWJzZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0lBZ0U3Qyx5QkFBbUIsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTt1QkFKWixJQUFJO3VCQUNjLE1BQU07S0FHUDtJQUU3Qzs7T0FFRzs7Ozs7O0lBQ0gsZ0NBQU07Ozs7O0lBQU4sVUFBTyxHQUFpQjtRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMzQjs7Ozs7SUFFRCwyQ0FBaUI7Ozs7SUFBakIsVUFBa0IsS0FBb0I7O1FBR2xDLHFCQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLFdBQVcsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNwRSxxQkFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7O1FBR2hFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE1BQU0sSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzdFLE1BQU0sQ0FBQztTQUNWOztRQUdELElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs7UUFHaEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQzFCOzs7OztJQUVELHVDQUFhOzs7O0lBQWIsVUFBYyxLQUFvQjs7UUFHOUIscUJBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssWUFBWSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ3RFLHFCQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLFdBQVcsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQzs7UUFHcEUsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssTUFBTSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEYsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7UUFHNUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQzFCOztnQkF6R0osU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxXQUFXO29CQUNyQixRQUFRLEVBQUUsMnpEQThDUDtvQkFDSCxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO29CQUMxQixJQUFJLEVBQUU7d0JBQ0YsbUJBQW1CLEVBQUUsb0JBQW9CO3dCQUN6QyxvQkFBb0IsRUFBRSxxQkFBcUI7cUJBQzlDO2lCQUNKOzs7O2dCQXpEUSxhQUFhOzs7NEJBNERqQixLQUFLOzRCQUNMLEtBQUs7OEJBQ0wsS0FBSyxTQUFDLFlBQVk7OzBCQWhFdkI7O1NBNERhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGFiQ29tcG9uZW50IH0gZnJvbSAnLi90YWIvdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYWJzZXRTZXJ2aWNlIH0gZnJvbSAnLi90YWJzZXQuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtdGFic2V0JyxcbiAgICB0ZW1wbGF0ZTogYDwhLS0gTmF2IHRhYnMgLS0+XG48dWwgcm9sZT1cInRhYmxpc3RcIlxuICAgIGNsYXNzPVwibmF2IG5hdi10YWJzXCJcbiAgICBbY2xhc3MubWluaW1hbC10YWJdPVwibWluaW1hbFwiXG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIlxuICAgIFthdHRyLmFyaWEtb3JpZW50YXRpb25dPVwic3RhY2tlZCA9PT0gJ25vbmUnID8gJ2hvcml6b250YWwnIDogJ3ZlcnRpY2FsJ1wiPlxuXG5cdDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgXG4gICAgICAgIGNsYXNzPVwibmF2LWl0ZW1cIlxuICAgICAgICAqbmdGb3I9XCJsZXQgdGFiIG9mIHRhYnNldC50YWJzJCB8IGFzeW5jOyBsZXQgaW5kZXggPSBpbmRleFwiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwidGFiLmFjdGl2ZSQgfCBhc3luY1wiXG4gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIlxuICAgICAgICBbbmdDbGFzc109XCJ0YWIuY3VzdG9tQ2xhc3NcIj5cblxuICAgICAgICA8YSBjbGFzcz1cIm5hdi1saW5rXCJcbiAgICAgICAgICAgIFtpZF09XCJ0YWIuaWRcIlxuICAgICAgICAgICAgcm9sZT1cInRhYlwiXG4gICAgICAgICAgICBbdXhUYWJGb2N1c109XCJ0YWJcIlxuICAgICAgICAgICAgW3RhYmluZGV4XT1cIih0YWIuYWN0aXZlJCB8IGFzeW5jKSA/IDAgOiAtMVwiXG4gICAgICAgICAgICBbY2xhc3MuaGlnaGxpZ2h0ZWRdPVwiKHRhYnNldC5mb2N1c2VkJCB8IGFzeW5jKSAmJiAodGFic2V0LmhpZ2hsaWdodGVkJCB8IGFzeW5jKSA9PT0gdGFiXCIgICAgICAgICAgICBcbiAgICAgICAgICAgIChtb3VzZWRvd24pPVwidGFic2V0LnNlbGVjdCh0YWIpXCJcbiAgICAgICAgICAgIChmb2N1cyk9XCJ0YWJzZXQuZm9jdXNlZCQubmV4dCh0cnVlKVwiXG4gICAgICAgICAgICAoYmx1cik9XCJ0YWJzZXQuZm9jdXNlZCQubmV4dChmYWxzZSlcIlxuICAgICAgICAgICAgKG1vdXNlZG93bik9XCJ0YWJzZXQuZm9jdXNlZCQubmV4dCh0cnVlKVwiXG4gICAgICAgICAgICAoa2V5ZG93bi5BcnJvd1VwKT1cInNlbGVjdFByZXZpb3VzVGFiKCRldmVudClcIlxuICAgICAgICAgICAgKGtleWRvd24uQXJyb3dMZWZ0KT1cInNlbGVjdFByZXZpb3VzVGFiKCRldmVudClcIlxuICAgICAgICAgICAgKGtleWRvd24uQXJyb3dSaWdodCk9XCJzZWxlY3ROZXh0VGFiKCRldmVudClcIlxuICAgICAgICAgICAgKGtleWRvd24uQXJyb3dEb3duKT1cInNlbGVjdE5leHRUYWIoJGV2ZW50KVwiXG4gICAgICAgICAgICAoa2V5ZG93bi5Ib21lKT1cInRhYnNldC5zZWxlY3RGaXJzdFRhYigpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgICAgICAgICAoa2V5ZG93bi5FbmQpPVwidGFic2V0LnNlbGVjdExhc3RUYWIoKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJ0YWIuaWRcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJ0YWIuYWN0aXZlJCB8IGFzeW5jXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCI+XG5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXRhYi5oZWFkaW5nUmVmXCI+e3sgdGFiLmhlYWRpbmcgfX08L3NwYW4+XG5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0YWIuaGVhZGluZ1JlZlwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhYi5oZWFkaW5nUmVmXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvYT5cblxuXHQ8L2xpPlxuXG48L3VsPlxuXG48IS0tIFRhYiBwYW5lcyAtLT5cbjxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPlxuXHQ8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5gLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW1RhYnNldFNlcnZpY2VdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy50YWJzLWxlZnRdJzogJ3N0YWNrZWQgPT09IFwibGVmdFwiJyxcbiAgICAgICAgJ1tjbGFzcy50YWJzLXJpZ2h0XSc6ICdzdGFja2VkID09PSBcInJpZ2h0XCInLFxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgVGFic2V0Q29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIG1pbmltYWw6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHN0YWNrZWQ6ICdsZWZ0JyB8ICdyaWdodCcgfCAnbm9uZScgPSAnbm9uZSc7XG4gICAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFic2V0OiBUYWJzZXRTZXJ2aWNlKSB7IH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93IG1hbnVhbCB0YWIgc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBzZWxlY3QodGFiOiBUYWJDb21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWJzZXQuc2VsZWN0KHRhYik7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUYWIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgd2hpY2ggYXJyb3cga2V5IGlzIHByZXNzZWRcbiAgICAgICAgY29uc3QgYXJyb3dMZWZ0ID0gZXZlbnQua2V5ID09PSAnQXJyb3dMZWZ0JyB8fCBldmVudC5rZXlDb2RlID09PSAzNztcbiAgICAgICAgY29uc3QgYXJyb3dVcCA9IGV2ZW50LmtleSA9PT0gJ0Fycm93VXAnIHx8IGV2ZW50LmtleUNvZGUgPT09IDM4O1xuXG4gICAgICAgIC8vIG9ubHkgcGVyZm9ybSBhY3Rpb24gaWYgdGhlIGFycm93IGtleSBtYXRjaGVzIHRoZSBvcmllbnRhdGlvblxuICAgICAgICBpZiAoYXJyb3dMZWZ0ICYmIHRoaXMuc3RhY2tlZCAhPT0gJ25vbmUnIHx8IGFycm93VXAgJiYgdGhpcy5zdGFja2VkID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBlcmZvcm0gc2VsZWN0aW9uXG4gICAgICAgIHRoaXMudGFic2V0LnNlbGVjdFByZXZpb3VzVGFiKCk7XG5cbiAgICAgICAgLy8gcHJldmVudCB0aGUgYnJvd3NlciBmcm9tIHNjcm9sbGluZyB3aGVuIGFycm93IGtleXMgYXJlIHByZXNzZWRcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBzZWxlY3ROZXh0VGFiKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIHdoaWNoIGFycm93IGtleSBpcyBwcmVzc2VkXG4gICAgICAgIGNvbnN0IGFycm93UmlnaHQgPSBldmVudC5rZXkgPT09ICdBcnJvd1JpZ2h0JyB8fCBldmVudC5rZXlDb2RlID09PSAzOTtcbiAgICAgICAgY29uc3QgYXJyb3dEb3duID0gZXZlbnQua2V5ID09PSAnQXJyb3dEb3duJyB8fCBldmVudC5rZXlDb2RlID09PSA0MDtcblxuICAgICAgICAvLyBvbmx5IHBlcmZvcm0gYWN0aW9uIGlmIHRoZSBhcnJvdyBrZXkgbWF0Y2hlcyB0aGUgb3JpZW50YXRpb25cbiAgICAgICAgaWYgKGFycm93UmlnaHQgJiYgdGhpcy5zdGFja2VkICE9PSAnbm9uZScgfHwgYXJyb3dEb3duICYmIHRoaXMuc3RhY2tlZCA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwZXJmb3JtIHNlbGVjdGlvblxuICAgICAgICB0aGlzLnRhYnNldC5zZWxlY3ROZXh0VGFiKCk7XG5cbiAgICAgICAgLy8gcHJldmVudCB0aGUgYnJvd3NlciBmcm9tIHNjcm9sbGluZyB3aGVuIGFycm93IGtleXMgYXJlIHByZXNzZWRcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59Il19