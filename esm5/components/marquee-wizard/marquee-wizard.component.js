/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import { WizardComponent } from '../wizard/index';
import { MarqueeWizardStepComponent } from './marquee-wizard-step.component';
import { MarqueeWizardService } from './marquee-wizard.service';
var MarqueeWizardComponent = /** @class */ (function (_super) {
    tslib_1.__extends(MarqueeWizardComponent, _super);
    function MarqueeWizardComponent(marqueeWizardService) {
        var _this = _super.call(this) || this;
        _this.steps = new QueryList();
        marqueeWizardService.valid$.pipe(filter(function (event) { return !event.valid; })).subscribe(_this.validChange.bind(_this));
        return _this;
    }
    Object.defineProperty(MarqueeWizardComponent.prototype, "isTemplate", {
        get: /**
         * @return {?}
         */
        function () {
            return this.description && this.description instanceof TemplateRef;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * If the current step is valid, mark it as
     * complete and go to the next step
     */
    /**
     * If the current step is valid, mark it as
     * complete and go to the next step
     * @return {?}
     */
    MarqueeWizardComponent.prototype.next = /**
     * If the current step is valid, mark it as
     * complete and go to the next step
     * @return {?}
     */
    function () {
        // get the current step
        var /** @type {?} */ step = /** @type {?} */ (this.getCurrentStep());
        if (step.valid) {
            _super.prototype.next.call(this);
            // mark this step as completed
            step.setCompleted(true);
        }
    };
    /**
     * Emit the onFinishing event and if valid the onFinish event.
     * Also mark the final step as completed if it is valid
     */
    /**
     * Emit the onFinishing event and if valid the onFinish event.
     * Also mark the final step as completed if it is valid
     * @return {?}
     */
    MarqueeWizardComponent.prototype.finish = /**
     * Emit the onFinishing event and if valid the onFinish event.
     * Also mark the final step as completed if it is valid
     * @return {?}
     */
    function () {
        // get the current step
        var /** @type {?} */ step = /** @type {?} */ (this.getCurrentStep());
        // call the original finish function
        return _super.prototype.finish.call(this).then(function () {
            // if the step is valid indicate that it is now complete
            if (step.valid) {
                step.setCompleted(true);
            }
        });
    };
    /**
     * If a step in the wizard becomes invalid, all steps sequentially after
     * it, should become unvisited and incomplete
     */
    /**
     * If a step in the wizard becomes invalid, all steps sequentially after
     * it, should become unvisited and incomplete
     * @param {?} state
     * @return {?}
     */
    MarqueeWizardComponent.prototype.validChange = /**
     * If a step in the wizard becomes invalid, all steps sequentially after
     * it, should become unvisited and incomplete
     * @param {?} state
     * @return {?}
     */
    function (state) {
        var /** @type {?} */ steps = this.steps.toArray();
        var /** @type {?} */ current = steps.findIndex(function (step) { return step === state.step; });
        var /** @type {?} */ affected = steps.slice(current);
        affected.forEach(function (step) {
            // the step should no longer be completed
            step.completed = false;
            // if the step is not the current step then also mark it as unvisited
            if (step !== state.step) {
                step.visited = false;
            }
        });
    };
    MarqueeWizardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-marquee-wizard',
                    template: "<div class=\"marquee-wizard-side-panel\">\n\n    <div class=\"marquee-wizard-description-container\" *ngIf=\"description\">\n        <!-- If a template was provided display it -->\n        <ng-container *ngIf=\"isTemplate\" [ngTemplateOutlet]=\"description\"></ng-container>\n\n        <!-- Otherwise wimply display the string -->\n        <ng-container *ngIf=\"!isTemplate\">\n            <p>{{ description }}</p>\n        </ng-container>\n    </div>\n\n    <ul class=\"marquee-wizard-steps\">\n\n        <li class=\"marquee-wizard-step\" *ngFor=\"let step of steps\" (click)=\"gotoStep(step)\" [class.active]=\"step.active\" [class.visited]=\"step.visited\" [class.invalid]=\"!step.valid\">\n            <i class=\"marquee-wizard-step-icon\" [ngClass]=\"step.icon\"></i>\n            <span class=\"marquee-wizard-step-title\">{{ step.header }}</span>\n            <span class=\"marquee-wizard-step-status hpe-icon hpe-checkmark\" *ngIf=\"step.completed\"></span>\n        </li>\n\n    </ul>\n</div>\n\n<div class=\"marquee-wizard-content-panel\">\n    <div class=\"marquee-wizard-content\">\n        <ng-content></ng-content>\n    </div>\n\n    <div class=\"modal-footer\">\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-secondary\" *ngIf=\"previousVisible\" [uxTooltip]=\"previousTooltip\" container=\"body\"\n            [disabled]=\"previousDisabled || step === 0\" (click)=\"previous(); tip.hide()\">{{ previousText }}</button>\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-primary\" *ngIf=\"nextVisible && !isLastStep()\" [uxTooltip]=\"nextTooltip\" container=\"body\"\n            [disabled]=\"nextDisabled\" (click)=\"next(); tip.hide()\">{{ nextText }}</button>\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-primary\" *ngIf=\"finishVisible && isLastStep() || finishAlwaysVisible\" [uxTooltip]=\"finishTooltip\"\n            container=\"body\" [disabled]=\"finishDisabled\" (click)=\"finish(); tip.hide()\">{{ finishText }}</button>\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-secondary\" *ngIf=\"cancelVisible && !isLastStep() || cancelAlwaysVisible\" [uxTooltip]=\"cancelTooltip\"\n            container=\"body\" [disabled]=\"cancelDisabled\" (click)=\"cancel(); tip.hide()\">{{ cancelText }}</button>\n    </div>\n</div>",
                    providers: [MarqueeWizardService]
                }] }
    ];
    /** @nocollapse */
    MarqueeWizardComponent.ctorParameters = function () { return [
        { type: MarqueeWizardService }
    ]; };
    MarqueeWizardComponent.propDecorators = {
        description: [{ type: Input }],
        steps: [{ type: ContentChildren, args: [MarqueeWizardStepComponent,] }]
    };
    return MarqueeWizardComponent;
}(WizardComponent));
export { MarqueeWizardComponent };
function MarqueeWizardComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MarqueeWizardComponent.prototype.description;
    /** @type {?} */
    MarqueeWizardComponent.prototype.steps;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFycXVlZS13aXphcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWFycXVlZS13aXphcmQvbWFycXVlZS13aXphcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsb0JBQW9CLEVBQTJCLE1BQU0sMEJBQTBCLENBQUM7O0lBTzdDLGtEQUFlO0lBU3ZELGdDQUFZLG9CQUEwQztRQUF0RCxZQUNJLGlCQUFPLFNBS1Y7c0JBWm9ELElBQUksU0FBUyxFQUE4QjtRQVM1RixvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUM1QixNQUFNLENBQUMsVUFBQyxLQUE4QixJQUFLLE9BQUEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFaLENBQVksQ0FBQyxDQUMzRCxDQUFDLFNBQVMsQ0FBQyxLQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFJLENBQUMsQ0FBQyxDQUFDOztLQUM1QztJQVZELHNCQUFJLDhDQUFVOzs7O1FBQWQ7WUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsV0FBVyxZQUFZLFdBQVcsQ0FBQztTQUN0RTs7O09BQUE7SUFVRDs7O09BR0c7Ozs7OztJQUNILHFDQUFJOzs7OztJQUFKOztRQUdJLHFCQUFNLElBQUkscUJBQUcsSUFBSSxDQUFDLGNBQWMsRUFBZ0MsQ0FBQSxDQUFDO1FBRWpFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2IsaUJBQU0sSUFBSSxXQUFFLENBQUM7O1lBR2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQjtLQUNKO0lBRUQ7OztPQUdHOzs7Ozs7SUFDSCx1Q0FBTTs7Ozs7SUFBTjs7UUFHSSxxQkFBTSxJQUFJLHFCQUFHLElBQUksQ0FBQyxjQUFjLEVBQWdDLENBQUEsQ0FBQzs7UUFHakUsTUFBTSxDQUFDLGlCQUFNLE1BQU0sV0FBRSxDQUFDLElBQUksQ0FBQzs7WUFFdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQjtTQUNKLENBQUMsQ0FBQztLQUNOO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsNENBQVc7Ozs7OztJQUFYLFVBQVksS0FBOEI7UUFFdEMscUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkMscUJBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO1FBQzdELHFCQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXRDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJOztZQUdqQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzs7WUFHdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUN4QjtTQUNKLENBQUMsQ0FBQztLQUVOOztnQkE5RUosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLHF2RUFBOEM7b0JBQzlDLFNBQVMsRUFBRSxDQUFFLG9CQUFvQixDQUFFO2lCQUN0Qzs7OztnQkFOUSxvQkFBb0I7Ozs4QkFTeEIsS0FBSzt3QkFDTCxlQUFlLFNBQUMsMEJBQTBCOztpQ0FkL0M7RUFXNEMsZUFBZTtTQUE5QyxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIFF1ZXJ5TGlzdCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFdpemFyZENvbXBvbmVudCB9IGZyb20gJy4uL3dpemFyZC9pbmRleCc7XG5pbXBvcnQgeyBNYXJxdWVlV2l6YXJkU3RlcENvbXBvbmVudCB9IGZyb20gJy4vbWFycXVlZS13aXphcmQtc3RlcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFycXVlZVdpemFyZFNlcnZpY2UsIE1hcnF1ZWVXaXphcmRWYWxpZEV2ZW50IH0gZnJvbSAnLi9tYXJxdWVlLXdpemFyZC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1tYXJxdWVlLXdpemFyZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL21hcnF1ZWUtd2l6YXJkLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcm92aWRlcnM6IFsgTWFycXVlZVdpemFyZFNlcnZpY2UgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXJxdWVlV2l6YXJkQ29tcG9uZW50IGV4dGVuZHMgV2l6YXJkQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGRlc2NyaXB0aW9uOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWFycXVlZVdpemFyZFN0ZXBDb21wb25lbnQpIHN0ZXBzID0gbmV3IFF1ZXJ5TGlzdDxNYXJxdWVlV2l6YXJkU3RlcENvbXBvbmVudD4oKTtcblxuICAgIGdldCBpc1RlbXBsYXRlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbiAmJiB0aGlzLmRlc2NyaXB0aW9uIGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IobWFycXVlZVdpemFyZFNlcnZpY2U6IE1hcnF1ZWVXaXphcmRTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgbWFycXVlZVdpemFyZFNlcnZpY2UudmFsaWQkLnBpcGUoXG4gICAgICAgICAgICBmaWx0ZXIoKGV2ZW50OiBNYXJxdWVlV2l6YXJkVmFsaWRFdmVudCkgPT4gIWV2ZW50LnZhbGlkKVxuICAgICAgICApLnN1YnNjcmliZSh0aGlzLnZhbGlkQ2hhbmdlLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIElmIHRoZSBjdXJyZW50IHN0ZXAgaXMgdmFsaWQsIG1hcmsgaXQgYXNcbiAgICAgKiBjb21wbGV0ZSBhbmQgZ28gdG8gdGhlIG5leHQgc3RlcFxuICAgICAqL1xuICAgIG5leHQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IHN0ZXBcbiAgICAgICAgY29uc3Qgc3RlcCA9IHRoaXMuZ2V0Q3VycmVudFN0ZXAoKSBhcyBNYXJxdWVlV2l6YXJkU3RlcENvbXBvbmVudDtcblxuICAgICAgICBpZiAoc3RlcC52YWxpZCkge1xuICAgICAgICAgICAgc3VwZXIubmV4dCgpO1xuXG4gICAgICAgICAgICAvLyBtYXJrIHRoaXMgc3RlcCBhcyBjb21wbGV0ZWRcbiAgICAgICAgICAgIHN0ZXAuc2V0Q29tcGxldGVkKHRydWUpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW1pdCB0aGUgb25GaW5pc2hpbmcgZXZlbnQgYW5kIGlmIHZhbGlkIHRoZSBvbkZpbmlzaCBldmVudC5cbiAgICAgKiBBbHNvIG1hcmsgdGhlIGZpbmFsIHN0ZXAgYXMgY29tcGxldGVkIGlmIGl0IGlzIHZhbGlkXG4gICAgICovXG4gICAgZmluaXNoKCk6IFByb21pc2U8dm9pZD4ge1xuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBzdGVwXG4gICAgICAgIGNvbnN0IHN0ZXAgPSB0aGlzLmdldEN1cnJlbnRTdGVwKCkgYXMgTWFycXVlZVdpemFyZFN0ZXBDb21wb25lbnQ7XG5cbiAgICAgICAgLy8gY2FsbCB0aGUgb3JpZ2luYWwgZmluaXNoIGZ1bmN0aW9uXG4gICAgICAgIHJldHVybiBzdXBlci5maW5pc2goKS50aGVuKCgpID0+IHtcbiAgICAgICAgICAgIC8vIGlmIHRoZSBzdGVwIGlzIHZhbGlkIGluZGljYXRlIHRoYXQgaXQgaXMgbm93IGNvbXBsZXRlXG4gICAgICAgICAgICBpZiAoc3RlcC52YWxpZCkge1xuICAgICAgICAgICAgICAgIHN0ZXAuc2V0Q29tcGxldGVkKHRydWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiBhIHN0ZXAgaW4gdGhlIHdpemFyZCBiZWNvbWVzIGludmFsaWQsIGFsbCBzdGVwcyBzZXF1ZW50aWFsbHkgYWZ0ZXJcbiAgICAgKiBpdCwgc2hvdWxkIGJlY29tZSB1bnZpc2l0ZWQgYW5kIGluY29tcGxldGVcbiAgICAgKi9cbiAgICB2YWxpZENoYW5nZShzdGF0ZTogTWFycXVlZVdpemFyZFZhbGlkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBzdGVwcyA9IHRoaXMuc3RlcHMudG9BcnJheSgpO1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gc3RlcHMuZmluZEluZGV4KHN0ZXAgPT4gc3RlcCA9PT0gc3RhdGUuc3RlcCk7XG4gICAgICAgIGNvbnN0IGFmZmVjdGVkID0gc3RlcHMuc2xpY2UoY3VycmVudCk7XG5cbiAgICAgICAgYWZmZWN0ZWQuZm9yRWFjaChzdGVwID0+IHtcblxuICAgICAgICAgICAgLy8gdGhlIHN0ZXAgc2hvdWxkIG5vIGxvbmdlciBiZSBjb21wbGV0ZWRcbiAgICAgICAgICAgIHN0ZXAuY29tcGxldGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBzdGVwIGlzIG5vdCB0aGUgY3VycmVudCBzdGVwIHRoZW4gYWxzbyBtYXJrIGl0IGFzIHVudmlzaXRlZFxuICAgICAgICAgICAgaWYgKHN0ZXAgIT09IHN0YXRlLnN0ZXApIHtcbiAgICAgICAgICAgICAgICBzdGVwLnZpc2l0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG59Il19