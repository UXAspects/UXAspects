/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { TabsetService } from './tabset.service';
export class TabsetComponent {
    /**
     * @param {?} tabset
     */
    constructor(tabset) {
        this.tabset = tabset;
        this.minimal = true;
        this.stacked = 'none';
    }
    /**
     * Allow manual tab selected
     * @param {?} tab
     * @return {?}
     */
    select(tab) {
        this.tabset.select(tab);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    selectPreviousTab(event) {
        // determine which arrow key is pressed
        const /** @type {?} */ arrowLeft = event.key === 'ArrowLeft' || event.keyCode === 37;
        const /** @type {?} */ arrowUp = event.key === 'ArrowUp' || event.keyCode === 38;
        // only perform action if the arrow key matches the orientation
        if (arrowLeft && this.stacked !== 'none' || arrowUp && this.stacked === 'none') {
            return;
        }
        // perform selection
        this.tabset.selectPreviousTab();
        // prevent the browser from scrolling when arrow keys are pressed
        event.preventDefault();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    selectNextTab(event) {
        // determine which arrow key is pressed
        const /** @type {?} */ arrowRight = event.key === 'ArrowRight' || event.keyCode === 39;
        const /** @type {?} */ arrowDown = event.key === 'ArrowDown' || event.keyCode === 40;
        // only perform action if the arrow key matches the orientation
        if (arrowRight && this.stacked !== 'none' || arrowDown && this.stacked === 'none') {
            return;
        }
        // perform selection
        this.tabset.selectNextTab();
        // prevent the browser from scrolling when arrow keys are pressed
        event.preventDefault();
    }
}
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
TabsetComponent.ctorParameters = () => [
    { type: TabsetService }
];
TabsetComponent.propDecorators = {
    minimal: [{ type: Input }],
    stacked: [{ type: Input }],
    ariaLabel: [{ type: Input, args: ['aria-label',] }]
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhYnNldC90YWJzZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUFZakQsTUFBTTs7OztJQU1GLFlBQW1CLE1BQXFCO1FBQXJCLFdBQU0sR0FBTixNQUFNLENBQWU7dUJBSlosSUFBSTt1QkFDYyxNQUFNO0tBR1A7Ozs7OztJQUs3QyxNQUFNLENBQUMsR0FBaUI7UUFDcEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDM0I7Ozs7O0lBRUQsaUJBQWlCLENBQUMsS0FBb0I7O1FBR2xDLHVCQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLFdBQVcsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUNwRSx1QkFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLEdBQUcsS0FBSyxTQUFTLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7O1FBR2hFLEVBQUUsQ0FBQyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE1BQU0sSUFBSSxPQUFPLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQzdFLE1BQU0sQ0FBQztTQUNWOztRQUdELElBQUksQ0FBQyxNQUFNLENBQUMsaUJBQWlCLEVBQUUsQ0FBQzs7UUFHaEMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQzFCOzs7OztJQUVELGFBQWEsQ0FBQyxLQUFvQjs7UUFHOUIsdUJBQU0sVUFBVSxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssWUFBWSxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDO1FBQ3RFLHVCQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLFdBQVcsSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQzs7UUFHcEUsRUFBRSxDQUFDLENBQUMsVUFBVSxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssTUFBTSxJQUFJLFNBQVMsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEYsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsSUFBSSxDQUFDLE1BQU0sQ0FBQyxhQUFhLEVBQUUsQ0FBQzs7UUFHNUIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO0tBQzFCOzs7WUEzREosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxXQUFXO2dCQUNyQixxMERBQXNDO2dCQUN0QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsU0FBUyxFQUFFLENBQUMsYUFBYSxDQUFDO2dCQUMxQixJQUFJLEVBQUU7b0JBQ0YsbUJBQW1CLEVBQUUsb0JBQW9CO29CQUN6QyxvQkFBb0IsRUFBRSxxQkFBcUI7aUJBQzlDO2FBQ0o7Ozs7WUFYUSxhQUFhOzs7c0JBY2pCLEtBQUs7c0JBQ0wsS0FBSzt3QkFDTCxLQUFLLFNBQUMsWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUYWJDb21wb25lbnQgfSBmcm9tICcuL3RhYi90YWIuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYnNldFNlcnZpY2UgfSBmcm9tICcuL3RhYnNldC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC10YWJzZXQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi90YWJzZXQuY29tcG9uZW50Lmh0bWwnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW1RhYnNldFNlcnZpY2VdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy50YWJzLWxlZnRdJzogJ3N0YWNrZWQgPT09IFwibGVmdFwiJyxcbiAgICAgICAgJ1tjbGFzcy50YWJzLXJpZ2h0XSc6ICdzdGFja2VkID09PSBcInJpZ2h0XCInLFxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgVGFic2V0Q29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIG1pbmltYWw6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHN0YWNrZWQ6ICdsZWZ0JyB8ICdyaWdodCcgfCAnbm9uZScgPSAnbm9uZSc7XG4gICAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFic2V0OiBUYWJzZXRTZXJ2aWNlKSB7IH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93IG1hbnVhbCB0YWIgc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBzZWxlY3QodGFiOiBUYWJDb21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWJzZXQuc2VsZWN0KHRhYik7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUYWIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgd2hpY2ggYXJyb3cga2V5IGlzIHByZXNzZWRcbiAgICAgICAgY29uc3QgYXJyb3dMZWZ0ID0gZXZlbnQua2V5ID09PSAnQXJyb3dMZWZ0JyB8fCBldmVudC5rZXlDb2RlID09PSAzNztcbiAgICAgICAgY29uc3QgYXJyb3dVcCA9IGV2ZW50LmtleSA9PT0gJ0Fycm93VXAnIHx8IGV2ZW50LmtleUNvZGUgPT09IDM4O1xuXG4gICAgICAgIC8vIG9ubHkgcGVyZm9ybSBhY3Rpb24gaWYgdGhlIGFycm93IGtleSBtYXRjaGVzIHRoZSBvcmllbnRhdGlvblxuICAgICAgICBpZiAoYXJyb3dMZWZ0ICYmIHRoaXMuc3RhY2tlZCAhPT0gJ25vbmUnIHx8IGFycm93VXAgJiYgdGhpcy5zdGFja2VkID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBlcmZvcm0gc2VsZWN0aW9uXG4gICAgICAgIHRoaXMudGFic2V0LnNlbGVjdFByZXZpb3VzVGFiKCk7XG5cbiAgICAgICAgLy8gcHJldmVudCB0aGUgYnJvd3NlciBmcm9tIHNjcm9sbGluZyB3aGVuIGFycm93IGtleXMgYXJlIHByZXNzZWRcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBzZWxlY3ROZXh0VGFiKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIHdoaWNoIGFycm93IGtleSBpcyBwcmVzc2VkXG4gICAgICAgIGNvbnN0IGFycm93UmlnaHQgPSBldmVudC5rZXkgPT09ICdBcnJvd1JpZ2h0JyB8fCBldmVudC5rZXlDb2RlID09PSAzOTtcbiAgICAgICAgY29uc3QgYXJyb3dEb3duID0gZXZlbnQua2V5ID09PSAnQXJyb3dEb3duJyB8fCBldmVudC5rZXlDb2RlID09PSA0MDtcblxuICAgICAgICAvLyBvbmx5IHBlcmZvcm0gYWN0aW9uIGlmIHRoZSBhcnJvdyBrZXkgbWF0Y2hlcyB0aGUgb3JpZW50YXRpb25cbiAgICAgICAgaWYgKGFycm93UmlnaHQgJiYgdGhpcy5zdGFja2VkICE9PSAnbm9uZScgfHwgYXJyb3dEb3duICYmIHRoaXMuc3RhY2tlZCA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwZXJmb3JtIHNlbGVjdGlvblxuICAgICAgICB0aGlzLnRhYnNldC5zZWxlY3ROZXh0VGFiKCk7XG5cbiAgICAgICAgLy8gcHJldmVudCB0aGUgYnJvd3NlciBmcm9tIHNjcm9sbGluZyB3aGVuIGFycm93IGtleXMgYXJlIHByZXNzZWRcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59Il19