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
        marqueeWizardService.valid$.pipe(filter(function (event) { return !event.valid; }))
            .subscribe(_this.validChange.bind(_this));
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
        else {
            this.stepError.next(this.step);
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
        var _this = this;
        // get the current step
        var /** @type {?} */ step = /** @type {?} */ (this.getCurrentStep());
        // call the original finish function
        return _super.prototype.finish.call(this).then(function () {
            // if the step is valid indicate that it is now complete
            if (step.valid) {
                step.setCompleted(true);
            }
            else {
                _this.stepError.next(_this.step);
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
                    template: "<div class=\"marquee-wizard-side-panel\">\n\n    <div class=\"marquee-wizard-description-container\" *ngIf=\"description\">\n        <!-- If a template was provided display it -->\n        <ng-container *ngIf=\"isTemplate\" [ngTemplateOutlet]=\"description\"></ng-container>\n\n        <!-- Otherwise wimply display the string -->\n        <ng-container *ngIf=\"!isTemplate\">\n            <p>{{ description }}</p>\n        </ng-container>\n    </div>\n\n    <ul class=\"marquee-wizard-steps\"\n        uxTabbableList\n        direction=\"vertical\"\n        role=\"tablist\"\n        aria-orientation=\"vertical\">\n\n        <li *ngFor=\"let step of steps; let index = index\"\n            role=\"tab\"\n            uxTabbableListItem\n            [disabled]=\"!step.visited\"\n            class=\"marquee-wizard-step\"\n            [class.active]=\"step.active\"\n            [class.visited]=\"step.visited\"\n            [class.invalid]=\"!step.valid\"\n            [attr.aria-posinset]=\"index + 1\"\n            [attr.aria-setsize]=\"steps.length\"\n            [attr.aria-selected]=\"step.active\"\n            [attr.aria-controls]=\"step.id\"\n            [id]=\"step.id + '-label'\"\n            (click)=\"gotoStep(step)\"\n            (keydown.enter)=\"gotoStep(step)\">\n\n            <i class=\"marquee-wizard-step-icon\" [ngClass]=\"step.icon\"></i>\n            <span class=\"marquee-wizard-step-title\">{{ step.header }}</span>\n            <span class=\"marquee-wizard-step-status hpe-icon hpe-checkmark\" *ngIf=\"step.completed\"></span>\n        </li>\n\n    </ul>\n</div>\n\n<div class=\"marquee-wizard-content-panel\">\n    <div class=\"marquee-wizard-content\">\n        <ng-content></ng-content>\n    </div>\n\n    <div class=\"modal-footer\">\n\n        <button #tip=\"ux-tooltip\"\n                class=\"btn button-secondary\"\n                *ngIf=\"previousVisible\"\n                [uxTooltip]=\"previousTooltip\"\n                [attr.aria-label]=\"previousAriaLabel\"\n                container=\"body\"\n                [disabled]=\"previousDisabled || step === 0\"\n                (click)=\"previous(); tip.hide()\">\n                {{ previousText }}\n        </button>\n\n        <button #tip=\"ux-tooltip\"\n                class=\"btn button-primary\"\n                *ngIf=\"nextVisible && !isLastStep()\"\n                [uxTooltip]=\"nextTooltip\"\n                [attr.aria-label]=\"nextAriaLabel\"\n                container=\"body\"\n                [disabled]=\"nextDisabled\"\n                (click)=\"next(); tip.hide()\">\n                {{ nextText }}\n        </button>\n\n        <button #tip=\"ux-tooltip\"\n                class=\"btn button-primary\"\n                *ngIf=\"finishVisible && isLastStep() || finishAlwaysVisible\"\n                [uxTooltip]=\"finishTooltip\"\n                [attr.aria-label]=\"finishAriaLabel\"\n                container=\"body\"\n                [disabled]=\"finishDisabled\"\n                (click)=\"finish(); tip.hide()\">\n                {{ finishText }}\n        </button>\n\n        <button #tip=\"ux-tooltip\"\n                class=\"btn button-secondary\"\n                *ngIf=\"cancelVisible && !isLastStep() || cancelAlwaysVisible\"\n                [uxTooltip]=\"cancelTooltip\"\n                [attr.aria-label]=\"cancelAriaLabel\"\n                container=\"body\"\n                [disabled]=\"cancelDisabled\"\n                (click)=\"cancel(); tip.hide()\">\n                {{ cancelText }}\n        </button>\n    </div>\n</div>",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFycXVlZS13aXphcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWFycXVlZS13aXphcmQvbWFycXVlZS13aXphcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUNsRCxPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM3RSxPQUFPLEVBQUUsb0JBQW9CLEVBQTJCLE1BQU0sMEJBQTBCLENBQUM7O0lBTzdDLGtEQUFlO0lBU3ZELGdDQUFZLG9CQUEwQztRQUF0RCxZQUNJLGlCQUFPLFNBSVY7c0JBWG9ELElBQUksU0FBUyxFQUE4QjtRQVM1RixvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFDLEtBQThCLElBQUssT0FBQSxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQVosQ0FBWSxDQUFDLENBQUM7YUFDckYsU0FBUyxDQUFDLEtBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxDQUFDLENBQUM7O0tBQy9DO0lBVEQsc0JBQUksOENBQVU7Ozs7UUFBZDtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLFlBQVksV0FBVyxDQUFDO1NBQ3RFOzs7T0FBQTtJQVNEOzs7T0FHRzs7Ozs7O0lBQ0gscUNBQUk7Ozs7O0lBQUo7O1FBR0kscUJBQU0sSUFBSSxxQkFBRyxJQUFJLENBQUMsY0FBYyxFQUFnQyxDQUFBLENBQUM7UUFFakUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDYixpQkFBTSxJQUFJLFdBQUUsQ0FBQzs7WUFHYixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzNCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDbEM7S0FDSjtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsdUNBQU07Ozs7O0lBQU47UUFBQSxpQkFjQzs7UUFYRyxxQkFBTSxJQUFJLHFCQUFHLElBQUksQ0FBQyxjQUFjLEVBQWdDLENBQUEsQ0FBQzs7UUFHakUsTUFBTSxDQUFDLGlCQUFNLE1BQU0sV0FBRSxDQUFDLElBQUksQ0FBQzs7WUFFdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLEtBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEtBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsQztTQUNKLENBQUMsQ0FBQztLQUNOO0lBRUQ7OztPQUdHOzs7Ozs7O0lBQ0gsNENBQVc7Ozs7OztJQUFYLFVBQVksS0FBOEI7UUFFdEMscUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkMscUJBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksRUFBbkIsQ0FBbUIsQ0FBQyxDQUFDO1FBQzdELHFCQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXRDLFFBQVEsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJOztZQUdqQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzs7WUFHdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUN4QjtTQUNKLENBQUMsQ0FBQztLQUVOOztnQkFqRkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxtQkFBbUI7b0JBQzdCLG0vR0FBOEM7b0JBQzlDLFNBQVMsRUFBRSxDQUFFLG9CQUFvQixDQUFFO2lCQUN0Qzs7OztnQkFOUSxvQkFBb0I7Ozs4QkFTeEIsS0FBSzt3QkFDTCxlQUFlLFNBQUMsMEJBQTBCOztpQ0FkL0M7RUFXNEMsZUFBZTtTQUE5QyxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgSW5wdXQsIFF1ZXJ5TGlzdCwgVGVtcGxhdGVSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFdpemFyZENvbXBvbmVudCB9IGZyb20gJy4uL3dpemFyZC9pbmRleCc7XG5pbXBvcnQgeyBNYXJxdWVlV2l6YXJkU3RlcENvbXBvbmVudCB9IGZyb20gJy4vbWFycXVlZS13aXphcmQtc3RlcC5jb21wb25lbnQnO1xuaW1wb3J0IHsgTWFycXVlZVdpemFyZFNlcnZpY2UsIE1hcnF1ZWVXaXphcmRWYWxpZEV2ZW50IH0gZnJvbSAnLi9tYXJxdWVlLXdpemFyZC5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1tYXJxdWVlLXdpemFyZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL21hcnF1ZWUtd2l6YXJkLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcm92aWRlcnM6IFsgTWFycXVlZVdpemFyZFNlcnZpY2UgXVxufSlcbmV4cG9ydCBjbGFzcyBNYXJxdWVlV2l6YXJkQ29tcG9uZW50IGV4dGVuZHMgV2l6YXJkQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGRlc2NyaXB0aW9uOiBzdHJpbmcgfCBUZW1wbGF0ZVJlZjxhbnk+O1xuICAgIEBDb250ZW50Q2hpbGRyZW4oTWFycXVlZVdpemFyZFN0ZXBDb21wb25lbnQpIHN0ZXBzID0gbmV3IFF1ZXJ5TGlzdDxNYXJxdWVlV2l6YXJkU3RlcENvbXBvbmVudD4oKTtcblxuICAgIGdldCBpc1RlbXBsYXRlKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kZXNjcmlwdGlvbiAmJiB0aGlzLmRlc2NyaXB0aW9uIGluc3RhbmNlb2YgVGVtcGxhdGVSZWY7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IobWFycXVlZVdpemFyZFNlcnZpY2U6IE1hcnF1ZWVXaXphcmRTZXJ2aWNlKSB7XG4gICAgICAgIHN1cGVyKCk7XG5cbiAgICAgICAgbWFycXVlZVdpemFyZFNlcnZpY2UudmFsaWQkLnBpcGUoZmlsdGVyKChldmVudDogTWFycXVlZVdpemFyZFZhbGlkRXZlbnQpID0+ICFldmVudC52YWxpZCkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKHRoaXMudmFsaWRDaGFuZ2UuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgdGhlIGN1cnJlbnQgc3RlcCBpcyB2YWxpZCwgbWFyayBpdCBhc1xuICAgICAqIGNvbXBsZXRlIGFuZCBnbyB0byB0aGUgbmV4dCBzdGVwXG4gICAgICovXG4gICAgbmV4dCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgc3RlcFxuICAgICAgICBjb25zdCBzdGVwID0gdGhpcy5nZXRDdXJyZW50U3RlcCgpIGFzIE1hcnF1ZWVXaXphcmRTdGVwQ29tcG9uZW50O1xuXG4gICAgICAgIGlmIChzdGVwLnZhbGlkKSB7XG4gICAgICAgICAgICBzdXBlci5uZXh0KCk7XG5cbiAgICAgICAgICAgIC8vIG1hcmsgdGhpcyBzdGVwIGFzIGNvbXBsZXRlZFxuICAgICAgICAgICAgc3RlcC5zZXRDb21wbGV0ZWQodHJ1ZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0ZXBFcnJvci5uZXh0KHRoaXMuc3RlcCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbWl0IHRoZSBvbkZpbmlzaGluZyBldmVudCBhbmQgaWYgdmFsaWQgdGhlIG9uRmluaXNoIGV2ZW50LlxuICAgICAqIEFsc28gbWFyayB0aGUgZmluYWwgc3RlcCBhcyBjb21wbGV0ZWQgaWYgaXQgaXMgdmFsaWRcbiAgICAgKi9cbiAgICBmaW5pc2goKTogUHJvbWlzZTx2b2lkPiB7XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IHN0ZXBcbiAgICAgICAgY29uc3Qgc3RlcCA9IHRoaXMuZ2V0Q3VycmVudFN0ZXAoKSBhcyBNYXJxdWVlV2l6YXJkU3RlcENvbXBvbmVudDtcblxuICAgICAgICAvLyBjYWxsIHRoZSBvcmlnaW5hbCBmaW5pc2ggZnVuY3Rpb25cbiAgICAgICAgcmV0dXJuIHN1cGVyLmZpbmlzaCgpLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgLy8gaWYgdGhlIHN0ZXAgaXMgdmFsaWQgaW5kaWNhdGUgdGhhdCBpdCBpcyBub3cgY29tcGxldGVcbiAgICAgICAgICAgIGlmIChzdGVwLnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgc3RlcC5zZXRDb21wbGV0ZWQodHJ1ZSk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuc3RlcEVycm9yLm5leHQodGhpcy5zdGVwKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgYSBzdGVwIGluIHRoZSB3aXphcmQgYmVjb21lcyBpbnZhbGlkLCBhbGwgc3RlcHMgc2VxdWVudGlhbGx5IGFmdGVyXG4gICAgICogaXQsIHNob3VsZCBiZWNvbWUgdW52aXNpdGVkIGFuZCBpbmNvbXBsZXRlXG4gICAgICovXG4gICAgdmFsaWRDaGFuZ2Uoc3RhdGU6IE1hcnF1ZWVXaXphcmRWYWxpZEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgY29uc3Qgc3RlcHMgPSB0aGlzLnN0ZXBzLnRvQXJyYXkoKTtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHN0ZXBzLmZpbmRJbmRleChzdGVwID0+IHN0ZXAgPT09IHN0YXRlLnN0ZXApO1xuICAgICAgICBjb25zdCBhZmZlY3RlZCA9IHN0ZXBzLnNsaWNlKGN1cnJlbnQpO1xuXG4gICAgICAgIGFmZmVjdGVkLmZvckVhY2goc3RlcCA9PiB7XG5cbiAgICAgICAgICAgIC8vIHRoZSBzdGVwIHNob3VsZCBubyBsb25nZXIgYmUgY29tcGxldGVkXG4gICAgICAgICAgICBzdGVwLmNvbXBsZXRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgc3RlcCBpcyBub3QgdGhlIGN1cnJlbnQgc3RlcCB0aGVuIGFsc28gbWFyayBpdCBhcyB1bnZpc2l0ZWRcbiAgICAgICAgICAgIGlmIChzdGVwICE9PSBzdGF0ZS5zdGVwKSB7XG4gICAgICAgICAgICAgICAgc3RlcC52aXNpdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxufSJdfQ==