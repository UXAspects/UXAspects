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
                template: `<!-- Nav tabs -->
<ul role="tablist"
    class="nav nav-tabs"
    [class.minimal-tab]="minimal"
    [attr.aria-label]="ariaLabel"
    [attr.aria-orientation]="stacked === 'none' ? 'horizontal' : 'vertical'">

	<li role="presentation" 
        class="nav-item"
        *ngFor="let tab of tabset.tabs$ | async; let index = index"
        [class.active]="tab.active$ | async"
        [class.disabled]="tab.disabled"
        [ngClass]="tab.customClass">

        <a class="nav-link"
            [id]="tab.id"
            role="tab"
            [uxTabFocus]="tab"
            [tabindex]="(tab.active$ | async) ? 0 : -1"
            [class.highlighted]="(tabset.focused$ | async) && (tabset.highlighted$ | async) === tab"            
            (mousedown)="tabset.select(tab)"
            (focus)="tabset.focused$.next(true)"
            (blur)="tabset.focused$.next(false)"
            (mousedown)="tabset.focused$.next(true)"
            (keydown.ArrowUp)="selectPreviousTab($event)"
            (keydown.ArrowLeft)="selectPreviousTab($event)"
            (keydown.ArrowRight)="selectNextTab($event)"
            (keydown.ArrowDown)="selectNextTab($event)"
            (keydown.Home)="tabset.selectFirstTab(); $event.preventDefault()"
            (keydown.End)="tabset.selectLastTab(); $event.preventDefault()"
            [attr.aria-controls]="tab.id"
            [attr.aria-selected]="tab.active$ | async"
            [attr.aria-disabled]="tab.disabled">

            <span *ngIf="!tab.headingRef">{{ tab.heading }}</span>

            <ng-container *ngIf="tab.headingRef" [ngTemplateOutlet]="tab.headingRef"></ng-container>
        </a>

	</li>

</ul>

<!-- Tab panes -->
<div class="tab-content">
	<ng-content></ng-content>
</div>`,
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [TabsetService],
                host: {
                    '[class.tabs-left]': 'stacked === "left"',
                    '[class.tabs-right]': 'stacked === "right"',
                }
            },] },
];
/** @nocollapse */
TabsetComponent.ctorParameters = () => [
    { type: TabsetService, },
];
TabsetComponent.propDecorators = {
    "minimal": [{ type: Input },],
    "stacked": [{ type: Input },],
    "ariaLabel": [{ type: Input, args: ['aria-label',] },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFic2V0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhYnNldC90YWJzZXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUUxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sa0JBQWtCLENBQUM7QUEwRGpELE1BQU07Ozs7SUFNRixZQUFtQixNQUFxQjtRQUFyQixXQUFNLEdBQU4sTUFBTSxDQUFlO3VCQUpaLElBQUk7dUJBQ2MsTUFBTTtLQUdQOzs7Ozs7SUFLN0MsTUFBTSxDQUFDLEdBQWlCO1FBQ3BCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzNCOzs7OztJQUVELGlCQUFpQixDQUFDLEtBQW9COztRQUdsQyx1QkFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLEdBQUcsS0FBSyxXQUFXLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7UUFDcEUsdUJBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxHQUFHLEtBQUssU0FBUyxJQUFJLEtBQUssQ0FBQyxPQUFPLEtBQUssRUFBRSxDQUFDOztRQUdoRSxFQUFFLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxNQUFNLElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM3RSxNQUFNLENBQUM7U0FDVjs7UUFHRCxJQUFJLENBQUMsTUFBTSxDQUFDLGlCQUFpQixFQUFFLENBQUM7O1FBR2hDLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUMxQjs7Ozs7SUFFRCxhQUFhLENBQUMsS0FBb0I7O1FBRzlCLHVCQUFNLFVBQVUsR0FBRyxLQUFLLENBQUMsR0FBRyxLQUFLLFlBQVksSUFBSSxLQUFLLENBQUMsT0FBTyxLQUFLLEVBQUUsQ0FBQztRQUN0RSx1QkFBTSxTQUFTLEdBQUcsS0FBSyxDQUFDLEdBQUcsS0FBSyxXQUFXLElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxFQUFFLENBQUM7O1FBR3BFLEVBQUUsQ0FBQyxDQUFDLFVBQVUsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLE1BQU0sSUFBSSxTQUFTLElBQUksSUFBSSxDQUFDLE9BQU8sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2hGLE1BQU0sQ0FBQztTQUNWOztRQUdELElBQUksQ0FBQyxNQUFNLENBQUMsYUFBYSxFQUFFLENBQUM7O1FBRzVCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztLQUMxQjs7O1lBekdKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsV0FBVztnQkFDckIsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BOENQO2dCQUNILGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxTQUFTLEVBQUUsQ0FBQyxhQUFhLENBQUM7Z0JBQzFCLElBQUksRUFBRTtvQkFDRixtQkFBbUIsRUFBRSxvQkFBb0I7b0JBQ3pDLG9CQUFvQixFQUFFLHFCQUFxQjtpQkFDOUM7YUFDSjs7OztZQXpEUSxhQUFhOzs7d0JBNERqQixLQUFLO3dCQUNMLEtBQUs7MEJBQ0wsS0FBSyxTQUFDLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVGFiQ29tcG9uZW50IH0gZnJvbSAnLi90YWIvdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYWJzZXRTZXJ2aWNlIH0gZnJvbSAnLi90YWJzZXQuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtdGFic2V0JyxcbiAgICB0ZW1wbGF0ZTogYDwhLS0gTmF2IHRhYnMgLS0+XG48dWwgcm9sZT1cInRhYmxpc3RcIlxuICAgIGNsYXNzPVwibmF2IG5hdi10YWJzXCJcbiAgICBbY2xhc3MubWluaW1hbC10YWJdPVwibWluaW1hbFwiXG4gICAgW2F0dHIuYXJpYS1sYWJlbF09XCJhcmlhTGFiZWxcIlxuICAgIFthdHRyLmFyaWEtb3JpZW50YXRpb25dPVwic3RhY2tlZCA9PT0gJ25vbmUnID8gJ2hvcml6b250YWwnIDogJ3ZlcnRpY2FsJ1wiPlxuXG5cdDxsaSByb2xlPVwicHJlc2VudGF0aW9uXCIgXG4gICAgICAgIGNsYXNzPVwibmF2LWl0ZW1cIlxuICAgICAgICAqbmdGb3I9XCJsZXQgdGFiIG9mIHRhYnNldC50YWJzJCB8IGFzeW5jOyBsZXQgaW5kZXggPSBpbmRleFwiXG4gICAgICAgIFtjbGFzcy5hY3RpdmVdPVwidGFiLmFjdGl2ZSQgfCBhc3luY1wiXG4gICAgICAgIFtjbGFzcy5kaXNhYmxlZF09XCJ0YWIuZGlzYWJsZWRcIlxuICAgICAgICBbbmdDbGFzc109XCJ0YWIuY3VzdG9tQ2xhc3NcIj5cblxuICAgICAgICA8YSBjbGFzcz1cIm5hdi1saW5rXCJcbiAgICAgICAgICAgIFtpZF09XCJ0YWIuaWRcIlxuICAgICAgICAgICAgcm9sZT1cInRhYlwiXG4gICAgICAgICAgICBbdXhUYWJGb2N1c109XCJ0YWJcIlxuICAgICAgICAgICAgW3RhYmluZGV4XT1cIih0YWIuYWN0aXZlJCB8IGFzeW5jKSA/IDAgOiAtMVwiXG4gICAgICAgICAgICBbY2xhc3MuaGlnaGxpZ2h0ZWRdPVwiKHRhYnNldC5mb2N1c2VkJCB8IGFzeW5jKSAmJiAodGFic2V0LmhpZ2hsaWdodGVkJCB8IGFzeW5jKSA9PT0gdGFiXCIgICAgICAgICAgICBcbiAgICAgICAgICAgIChtb3VzZWRvd24pPVwidGFic2V0LnNlbGVjdCh0YWIpXCJcbiAgICAgICAgICAgIChmb2N1cyk9XCJ0YWJzZXQuZm9jdXNlZCQubmV4dCh0cnVlKVwiXG4gICAgICAgICAgICAoYmx1cik9XCJ0YWJzZXQuZm9jdXNlZCQubmV4dChmYWxzZSlcIlxuICAgICAgICAgICAgKG1vdXNlZG93bik9XCJ0YWJzZXQuZm9jdXNlZCQubmV4dCh0cnVlKVwiXG4gICAgICAgICAgICAoa2V5ZG93bi5BcnJvd1VwKT1cInNlbGVjdFByZXZpb3VzVGFiKCRldmVudClcIlxuICAgICAgICAgICAgKGtleWRvd24uQXJyb3dMZWZ0KT1cInNlbGVjdFByZXZpb3VzVGFiKCRldmVudClcIlxuICAgICAgICAgICAgKGtleWRvd24uQXJyb3dSaWdodCk9XCJzZWxlY3ROZXh0VGFiKCRldmVudClcIlxuICAgICAgICAgICAgKGtleWRvd24uQXJyb3dEb3duKT1cInNlbGVjdE5leHRUYWIoJGV2ZW50KVwiXG4gICAgICAgICAgICAoa2V5ZG93bi5Ib21lKT1cInRhYnNldC5zZWxlY3RGaXJzdFRhYigpOyAkZXZlbnQucHJldmVudERlZmF1bHQoKVwiXG4gICAgICAgICAgICAoa2V5ZG93bi5FbmQpPVwidGFic2V0LnNlbGVjdExhc3RUYWIoKTsgJGV2ZW50LnByZXZlbnREZWZhdWx0KClcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJ0YWIuaWRcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1zZWxlY3RlZF09XCJ0YWIuYWN0aXZlJCB8IGFzeW5jXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtZGlzYWJsZWRdPVwidGFiLmRpc2FibGVkXCI+XG5cbiAgICAgICAgICAgIDxzcGFuICpuZ0lmPVwiIXRhYi5oZWFkaW5nUmVmXCI+e3sgdGFiLmhlYWRpbmcgfX08L3NwYW4+XG5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJ0YWIuaGVhZGluZ1JlZlwiIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhYi5oZWFkaW5nUmVmXCI+PC9uZy1jb250YWluZXI+XG4gICAgICAgIDwvYT5cblxuXHQ8L2xpPlxuXG48L3VsPlxuXG48IS0tIFRhYiBwYW5lcyAtLT5cbjxkaXYgY2xhc3M9XCJ0YWItY29udGVudFwiPlxuXHQ8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5gLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW1RhYnNldFNlcnZpY2VdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzcy50YWJzLWxlZnRdJzogJ3N0YWNrZWQgPT09IFwibGVmdFwiJyxcbiAgICAgICAgJ1tjbGFzcy50YWJzLXJpZ2h0XSc6ICdzdGFja2VkID09PSBcInJpZ2h0XCInLFxuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgVGFic2V0Q29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIG1pbmltYWw6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHN0YWNrZWQ6ICdsZWZ0JyB8ICdyaWdodCcgfCAnbm9uZScgPSAnbm9uZSc7XG4gICAgQElucHV0KCdhcmlhLWxhYmVsJykgYXJpYUxhYmVsOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFic2V0OiBUYWJzZXRTZXJ2aWNlKSB7IH1cblxuICAgIC8qKlxuICAgICAqIEFsbG93IG1hbnVhbCB0YWIgc2VsZWN0ZWRcbiAgICAgKi9cbiAgICBzZWxlY3QodGFiOiBUYWJDb21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50YWJzZXQuc2VsZWN0KHRhYik7XG4gICAgfVxuXG4gICAgc2VsZWN0UHJldmlvdXNUYWIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBkZXRlcm1pbmUgd2hpY2ggYXJyb3cga2V5IGlzIHByZXNzZWRcbiAgICAgICAgY29uc3QgYXJyb3dMZWZ0ID0gZXZlbnQua2V5ID09PSAnQXJyb3dMZWZ0JyB8fCBldmVudC5rZXlDb2RlID09PSAzNztcbiAgICAgICAgY29uc3QgYXJyb3dVcCA9IGV2ZW50LmtleSA9PT0gJ0Fycm93VXAnIHx8IGV2ZW50LmtleUNvZGUgPT09IDM4O1xuXG4gICAgICAgIC8vIG9ubHkgcGVyZm9ybSBhY3Rpb24gaWYgdGhlIGFycm93IGtleSBtYXRjaGVzIHRoZSBvcmllbnRhdGlvblxuICAgICAgICBpZiAoYXJyb3dMZWZ0ICYmIHRoaXMuc3RhY2tlZCAhPT0gJ25vbmUnIHx8IGFycm93VXAgJiYgdGhpcy5zdGFja2VkID09PSAnbm9uZScpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIHBlcmZvcm0gc2VsZWN0aW9uXG4gICAgICAgIHRoaXMudGFic2V0LnNlbGVjdFByZXZpb3VzVGFiKCk7XG5cbiAgICAgICAgLy8gcHJldmVudCB0aGUgYnJvd3NlciBmcm9tIHNjcm9sbGluZyB3aGVuIGFycm93IGtleXMgYXJlIHByZXNzZWRcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG5cbiAgICBzZWxlY3ROZXh0VGFiKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gZGV0ZXJtaW5lIHdoaWNoIGFycm93IGtleSBpcyBwcmVzc2VkXG4gICAgICAgIGNvbnN0IGFycm93UmlnaHQgPSBldmVudC5rZXkgPT09ICdBcnJvd1JpZ2h0JyB8fCBldmVudC5rZXlDb2RlID09PSAzOTtcbiAgICAgICAgY29uc3QgYXJyb3dEb3duID0gZXZlbnQua2V5ID09PSAnQXJyb3dEb3duJyB8fCBldmVudC5rZXlDb2RlID09PSA0MDtcblxuICAgICAgICAvLyBvbmx5IHBlcmZvcm0gYWN0aW9uIGlmIHRoZSBhcnJvdyBrZXkgbWF0Y2hlcyB0aGUgb3JpZW50YXRpb25cbiAgICAgICAgaWYgKGFycm93UmlnaHQgJiYgdGhpcy5zdGFja2VkICE9PSAnbm9uZScgfHwgYXJyb3dEb3duICYmIHRoaXMuc3RhY2tlZCA9PT0gJ25vbmUnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBwZXJmb3JtIHNlbGVjdGlvblxuICAgICAgICB0aGlzLnRhYnNldC5zZWxlY3ROZXh0VGFiKCk7XG5cbiAgICAgICAgLy8gcHJldmVudCB0aGUgYnJvd3NlciBmcm9tIHNjcm9sbGluZyB3aGVuIGFycm93IGtleXMgYXJlIHByZXNzZWRcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG59Il19