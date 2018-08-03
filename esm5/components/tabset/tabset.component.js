/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TabsetService } from './tabset.service';
var TabsetComponent = /** @class */ (function () {
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
                }] }
    ];
    /** @nocollapse */
    TabsetComponent.ctorParameters = function () { return [
        { type: TabsetService }
    ]; };
    TabsetComponent.propDecorators = {
        minimal: [{ type: Input }],
        stacked: [{ type: Input }],
        ariaLabel: [{ type: Input, args: ['aria-label',] }]
    };
    return TabsetComponent;
}());
export { TabsetComponent };
function TabsetComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TabsetComponent.prototype.minimal;
    /** @type {?} */
    TabsetComponent.prototype.stacked;
    /** @type {?} */
    TabsetComponent.prototype.ariaLabel;
    /** @type {?} */
    TabsetComponent.prototype.tabset;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhYnNldC90YWJzZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7O0lBa0I3Qyx5QkFBbUIsTUFBcUI7UUFBckIsV0FBTSxHQUFOLE1BQU0sQ0FBZTt1QkFKWixJQUFJO3VCQUNjLE1BQU07S0FHUDtJQUU3Qzs7T0FFRzs7Ozs7O0lBQ0gsZ0NBQU07Ozs7O0lBQU4sVUFBTyxHQUFpQjtRQUNwQixJQUFJLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUMzQjs7Ozs7SUFFRCwyQ0FBaUI7Ozs7SUFBakIsVUFBa0IsS0FBb0I7O1FBR2xDLHFCQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLFdBQVcsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNwRSxxQkFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7O1FBR2hFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE1BQU0sSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzdFLE1BQU0sQ0FBQztTQUNWOztRQUdELElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs7UUFHaEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQzFCOzs7OztJQUVELHVDQUFhOzs7O0lBQWIsVUFBYyxLQUFvQjs7UUFHOUIscUJBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssWUFBWSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ3RFLHFCQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLFdBQVcsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQzs7UUFHcEUsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssTUFBTSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEYsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7UUFHNUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQzFCOztnQkEzREosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxXQUFXO29CQUNyQixxMERBQXNDO29CQUN0QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO29CQUMxQixJQUFJLEVBQUU7d0JBQ0YsbUJBQW1CLEVBQUUsb0JBQW9CO3dCQUN6QyxvQkFBb0IsRUFBRSxxQkFBcUI7cUJBQzlDO2lCQUNKOzs7O2dCQVhRLGFBQWE7OzswQkFjakIsS0FBSzswQkFDTCxLQUFLOzRCQUNMLEtBQUssU0FBQyxZQUFZOzswQkFsQnZCOztTQWNhLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGFiQ29tcG9uZW50IH0gZnJvbSAnLi90YWIvdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYWJzZXRTZXJ2aWNlIH0gZnJvbSAnLi90YWJzZXQuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtdGFic2V0JyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vdGFic2V0LmNvbXBvbmVudC5odG1sJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcm92aWRlcnM6IFtUYWJzZXRTZXJ2aWNlXSxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3MudGFicy1sZWZ0XSc6ICdzdGFja2VkID09PSBcImxlZnRcIicsXG4gICAgICAgICdbY2xhc3MudGFicy1yaWdodF0nOiAnc3RhY2tlZCA9PT0gXCJyaWdodFwiJyxcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFRhYnNldENvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBtaW5pbWFsOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBzdGFja2VkOiAnbGVmdCcgfCAncmlnaHQnIHwgJ25vbmUnID0gJ25vbmUnO1xuICAgIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIHRhYnNldDogVGFic2V0U2VydmljZSkgeyB9XG5cbiAgICAvKipcbiAgICAgKiBBbGxvdyBtYW51YWwgdGFiIHNlbGVjdGVkXG4gICAgICovXG4gICAgc2VsZWN0KHRhYjogVGFiQ29tcG9uZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMudGFic2V0LnNlbGVjdCh0YWIpO1xuICAgIH1cblxuICAgIHNlbGVjdFByZXZpb3VzVGFiKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIHdoaWNoIGFycm93IGtleSBpcyBwcmVzc2VkXG4gICAgICAgIGNvbnN0IGFycm93TGVmdCA9IGV2ZW50LmtleSA9PT0gJ0Fycm93TGVmdCcgfHwgZXZlbnQua2V5Q29kZSA9PT0gMzc7XG4gICAgICAgIGNvbnN0IGFycm93VXAgPSBldmVudC5rZXkgPT09ICdBcnJvd1VwJyB8fCBldmVudC5rZXlDb2RlID09PSAzODtcblxuICAgICAgICAvLyBvbmx5IHBlcmZvcm0gYWN0aW9uIGlmIHRoZSBhcnJvdyBrZXkgbWF0Y2hlcyB0aGUgb3JpZW50YXRpb25cbiAgICAgICAgaWYgKGFycm93TGVmdCAmJiB0aGlzLnN0YWNrZWQgIT09ICdub25lJyB8fCBhcnJvd1VwICYmIHRoaXMuc3RhY2tlZCA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwZXJmb3JtIHNlbGVjdGlvblxuICAgICAgICB0aGlzLnRhYnNldC5zZWxlY3RQcmV2aW91c1RhYigpO1xuXG4gICAgICAgIC8vIHByZXZlbnQgdGhlIGJyb3dzZXIgZnJvbSBzY3JvbGxpbmcgd2hlbiBhcnJvdyBrZXlzIGFyZSBwcmVzc2VkXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxuXG4gICAgc2VsZWN0TmV4dFRhYihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGRldGVybWluZSB3aGljaCBhcnJvdyBrZXkgaXMgcHJlc3NlZFxuICAgICAgICBjb25zdCBhcnJvd1JpZ2h0ID0gZXZlbnQua2V5ID09PSAnQXJyb3dSaWdodCcgfHwgZXZlbnQua2V5Q29kZSA9PT0gMzk7XG4gICAgICAgIGNvbnN0IGFycm93RG93biA9IGV2ZW50LmtleSA9PT0gJ0Fycm93RG93bicgfHwgZXZlbnQua2V5Q29kZSA9PT0gNDA7XG5cbiAgICAgICAgLy8gb25seSBwZXJmb3JtIGFjdGlvbiBpZiB0aGUgYXJyb3cga2V5IG1hdGNoZXMgdGhlIG9yaWVudGF0aW9uXG4gICAgICAgIGlmIChhcnJvd1JpZ2h0ICYmIHRoaXMuc3RhY2tlZCAhPT0gJ25vbmUnIHx8IGFycm93RG93biAmJiB0aGlzLnN0YWNrZWQgPT09ICdub25lJykge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gcGVyZm9ybSBzZWxlY3Rpb25cbiAgICAgICAgdGhpcy50YWJzZXQuc2VsZWN0TmV4dFRhYigpO1xuXG4gICAgICAgIC8vIHByZXZlbnQgdGhlIGJyb3dzZXIgZnJvbSBzY3JvbGxpbmcgd2hlbiBhcnJvdyBrZXlzIGFyZSBwcmVzc2VkXG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfVxufSJdfQ==