/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import { WizardComponent } from '../wizard/index';
import { MarqueeWizardStepComponent } from './marquee-wizard-step.component';
import { MarqueeWizardService } from './marquee-wizard.service';
export class MarqueeWizardComponent extends WizardComponent {
    /**
     * @param {?} marqueeWizardService
     */
    constructor(marqueeWizardService) {
        super();
        this.steps = new QueryList();
        marqueeWizardService.valid$.pipe(filter((event) => !event.valid))
            .subscribe(this.validChange.bind(this));
    }
    /**
     * @return {?}
     */
    get isTemplate() {
        return this.description && this.description instanceof TemplateRef;
    }
    /**
     * If the current step is valid, mark it as
     * complete and go to the next step
     * @return {?}
     */
    next() {
        // get the current step
        const /** @type {?} */ step = /** @type {?} */ (this.getCurrentStep());
        if (step.valid) {
            super.next();
            // mark this step as completed
            step.setCompleted(true);
        }
        else {
            this.stepError.next(this.step);
        }
    }
    /**
     * Emit the onFinishing event and if valid the onFinish event.
     * Also mark the final step as completed if it is valid
     * @return {?}
     */
    finish() {
        // get the current step
        const /** @type {?} */ step = /** @type {?} */ (this.getCurrentStep());
        // call the original finish function
        return super.finish().then(() => {
            // if the step is valid indicate that it is now complete
            if (step.valid) {
                step.setCompleted(true);
            }
            else {
                this.stepError.next(this.step);
            }
        });
    }
    /**
     * If a step in the wizard becomes invalid, all steps sequentially after
     * it, should become unvisited and incomplete
     * @param {?} state
     * @return {?}
     */
    validChange(state) {
        const /** @type {?} */ steps = this.steps.toArray();
        const /** @type {?} */ current = steps.findIndex(step => step === state.step);
        const /** @type {?} */ affected = steps.slice(current);
        affected.forEach(step => {
            // the step should no longer be completed
            step.completed = false;
            // if the step is not the current step then also mark it as unvisited
            if (step !== state.step) {
                step.visited = false;
            }
        });
    }
}
MarqueeWizardComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-marquee-wizard',
                template: "<div class=\"marquee-wizard-side-panel\">\n\n    <div class=\"marquee-wizard-description-container\" *ngIf=\"description\">\n        <!-- If a template was provided display it -->\n        <ng-container *ngIf=\"isTemplate\" [ngTemplateOutlet]=\"description\"></ng-container>\n\n        <!-- Otherwise wimply display the string -->\n        <ng-container *ngIf=\"!isTemplate\">\n            <p>{{ description }}</p>\n        </ng-container>\n    </div>\n\n    <ul class=\"marquee-wizard-steps\"\n        uxTabbableList\n        direction=\"vertical\"\n        role=\"tablist\"\n        aria-orientation=\"vertical\">\n\n        <li *ngFor=\"let step of steps; let index = index\"\n            role=\"tab\"\n            uxTabbableListItem\n            [disabled]=\"!step.visited\"\n            class=\"marquee-wizard-step\"\n            [class.active]=\"step.active\"\n            [class.visited]=\"step.visited\"\n            [class.invalid]=\"!step.valid\"\n            [attr.aria-posinset]=\"index + 1\"\n            [attr.aria-setsize]=\"steps.length\"\n            [attr.aria-selected]=\"step.active\"\n            [attr.aria-controls]=\"step.id\"\n            [id]=\"step.id + '-label'\"\n            (click)=\"gotoStep(step)\"\n            (keydown.enter)=\"gotoStep(step)\">\n\n            <i class=\"marquee-wizard-step-icon\" [ngClass]=\"step.icon\"></i>\n            <span class=\"marquee-wizard-step-title\">{{ step.header }}</span>\n            <span class=\"marquee-wizard-step-status hpe-icon hpe-checkmark\" *ngIf=\"step.completed\"></span>\n        </li>\n\n    </ul>\n</div>\n\n<div class=\"marquee-wizard-content-panel\">\n    <div class=\"marquee-wizard-content\">\n        <ng-content></ng-content>\n    </div>\n\n    <div class=\"modal-footer\">\n\n        <button #tip=\"ux-tooltip\"\n                class=\"btn button-secondary\"\n                *ngIf=\"previousVisible\"\n                [uxTooltip]=\"previousTooltip\"\n                [attr.aria-label]=\"previousAriaLabel\"\n                container=\"body\"\n                [disabled]=\"previousDisabled || step === 0\"\n                (click)=\"previous(); tip.hide()\">\n                {{ previousText }}\n        </button>\n\n        <button #tip=\"ux-tooltip\"\n                class=\"btn button-primary\"\n                *ngIf=\"nextVisible && !isLastStep()\"\n                [uxTooltip]=\"nextTooltip\"\n                [attr.aria-label]=\"nextAriaLabel\"\n                container=\"body\"\n                [disabled]=\"nextDisabled\"\n                (click)=\"next(); tip.hide()\">\n                {{ nextText }}\n        </button>\n\n        <button #tip=\"ux-tooltip\"\n                class=\"btn button-primary\"\n                *ngIf=\"finishVisible && isLastStep() || finishAlwaysVisible\"\n                [uxTooltip]=\"finishTooltip\"\n                [attr.aria-label]=\"finishAriaLabel\"\n                container=\"body\"\n                [disabled]=\"finishDisabled\"\n                (click)=\"finish(); tip.hide()\">\n                {{ finishText }}\n        </button>\n\n        <button #tip=\"ux-tooltip\"\n                class=\"btn button-secondary\"\n                *ngIf=\"cancelVisible && !isLastStep() || cancelAlwaysVisible\"\n                [uxTooltip]=\"cancelTooltip\"\n                [attr.aria-label]=\"cancelAriaLabel\"\n                container=\"body\"\n                [disabled]=\"cancelDisabled\"\n                (click)=\"cancel(); tip.hide()\">\n                {{ cancelText }}\n        </button>\n    </div>\n</div>",
                providers: [MarqueeWizardService]
            }] }
];
/** @nocollapse */
MarqueeWizardComponent.ctorParameters = () => [
    { type: MarqueeWizardService }
];
MarqueeWizardComponent.propDecorators = {
    description: [{ type: Input }],
    steps: [{ type: ContentChildren, args: [MarqueeWizardStepComponent,] }]
};
function MarqueeWizardComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MarqueeWizardComponent.prototype.description;
    /** @type {?} */
    MarqueeWizardComponent.prototype.steps;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFycXVlZS13aXphcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWFycXVlZS13aXphcmQvbWFycXVlZS13aXphcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBMkIsTUFBTSwwQkFBMEIsQ0FBQztBQU96RixNQUFNLDZCQUE4QixTQUFRLGVBQWU7Ozs7SUFTdkQsWUFBWSxvQkFBMEM7UUFDbEQsS0FBSyxFQUFFLENBQUM7cUJBUHlDLElBQUksU0FBUyxFQUE4QjtRQVM1RixvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLEtBQThCLEVBQUUsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO2FBQ3JGLFNBQVMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQy9DOzs7O0lBVEQsSUFBSSxVQUFVO1FBQ1YsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxDQUFDLFdBQVcsWUFBWSxXQUFXLENBQUM7S0FDdEU7Ozs7OztJQWFELElBQUk7O1FBR0EsdUJBQU0sSUFBSSxxQkFBRyxJQUFJLENBQUMsY0FBYyxFQUFnQyxDQUFBLENBQUM7UUFFakUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDYixLQUFLLENBQUMsSUFBSSxFQUFFLENBQUM7O1lBR2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUMzQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2xDO0tBQ0o7Ozs7OztJQU1ELE1BQU07O1FBR0YsdUJBQU0sSUFBSSxxQkFBRyxJQUFJLENBQUMsY0FBYyxFQUFnQyxDQUFBLENBQUM7O1FBR2pFLE1BQU0sQ0FBQyxLQUFLLENBQUMsTUFBTSxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTs7WUFFNUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzQjtZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUNsQztTQUNKLENBQUMsQ0FBQztLQUNOOzs7Ozs7O0lBTUQsV0FBVyxDQUFDLEtBQThCO1FBRXRDLHVCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQ25DLHVCQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3RCx1QkFBTSxRQUFRLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUV0QyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFOztZQUdwQixJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQzs7WUFHdkIsRUFBRSxDQUFDLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQzthQUN4QjtTQUNKLENBQUMsQ0FBQztLQUVOOzs7WUFqRkosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxtQkFBbUI7Z0JBQzdCLG0vR0FBOEM7Z0JBQzlDLFNBQVMsRUFBRSxDQUFFLG9CQUFvQixDQUFFO2FBQ3RDOzs7O1lBTlEsb0JBQW9COzs7MEJBU3hCLEtBQUs7b0JBQ0wsZUFBZSxTQUFDLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBJbnB1dCwgUXVlcnlMaXN0LCBUZW1wbGF0ZVJlZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgV2l6YXJkQ29tcG9uZW50IH0gZnJvbSAnLi4vd2l6YXJkL2luZGV4JztcbmltcG9ydCB7IE1hcnF1ZWVXaXphcmRTdGVwQ29tcG9uZW50IH0gZnJvbSAnLi9tYXJxdWVlLXdpemFyZC1zdGVwLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBNYXJxdWVlV2l6YXJkU2VydmljZSwgTWFycXVlZVdpemFyZFZhbGlkRXZlbnQgfSBmcm9tICcuL21hcnF1ZWUtd2l6YXJkLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LW1hcnF1ZWUtd2l6YXJkJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vbWFycXVlZS13aXphcmQuY29tcG9uZW50Lmh0bWwnLFxuICAgIHByb3ZpZGVyczogWyBNYXJxdWVlV2l6YXJkU2VydmljZSBdXG59KVxuZXhwb3J0IGNsYXNzIE1hcnF1ZWVXaXphcmRDb21wb25lbnQgZXh0ZW5kcyBXaXphcmRDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgZGVzY3JpcHRpb246IHN0cmluZyB8IFRlbXBsYXRlUmVmPGFueT47XG4gICAgQENvbnRlbnRDaGlsZHJlbihNYXJxdWVlV2l6YXJkU3RlcENvbXBvbmVudCkgc3RlcHMgPSBuZXcgUXVlcnlMaXN0PE1hcnF1ZWVXaXphcmRTdGVwQ29tcG9uZW50PigpO1xuXG4gICAgZ2V0IGlzVGVtcGxhdGUoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRlc2NyaXB0aW9uICYmIHRoaXMuZGVzY3JpcHRpb24gaW5zdGFuY2VvZiBUZW1wbGF0ZVJlZjtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihtYXJxdWVlV2l6YXJkU2VydmljZTogTWFycXVlZVdpemFyZFNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoKTtcblxuICAgICAgICBtYXJxdWVlV2l6YXJkU2VydmljZS52YWxpZCQucGlwZShmaWx0ZXIoKGV2ZW50OiBNYXJxdWVlV2l6YXJkVmFsaWRFdmVudCkgPT4gIWV2ZW50LnZhbGlkKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodGhpcy52YWxpZENoYW5nZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgY3VycmVudCBzdGVwIGlzIHZhbGlkLCBtYXJrIGl0IGFzXG4gICAgICogY29tcGxldGUgYW5kIGdvIHRvIHRoZSBuZXh0IHN0ZXBcbiAgICAgKi9cbiAgICBuZXh0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBzdGVwXG4gICAgICAgIGNvbnN0IHN0ZXAgPSB0aGlzLmdldEN1cnJlbnRTdGVwKCkgYXMgTWFycXVlZVdpemFyZFN0ZXBDb21wb25lbnQ7XG5cbiAgICAgICAgaWYgKHN0ZXAudmFsaWQpIHtcbiAgICAgICAgICAgIHN1cGVyLm5leHQoKTtcblxuICAgICAgICAgICAgLy8gbWFyayB0aGlzIHN0ZXAgYXMgY29tcGxldGVkXG4gICAgICAgICAgICBzdGVwLnNldENvbXBsZXRlZCh0cnVlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcEVycm9yLm5leHQodGhpcy5zdGVwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVtaXQgdGhlIG9uRmluaXNoaW5nIGV2ZW50IGFuZCBpZiB2YWxpZCB0aGUgb25GaW5pc2ggZXZlbnQuXG4gICAgICogQWxzbyBtYXJrIHRoZSBmaW5hbCBzdGVwIGFzIGNvbXBsZXRlZCBpZiBpdCBpcyB2YWxpZFxuICAgICAqL1xuICAgIGZpbmlzaCgpOiBQcm9taXNlPHZvaWQ+IHtcblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgc3RlcFxuICAgICAgICBjb25zdCBzdGVwID0gdGhpcy5nZXRDdXJyZW50U3RlcCgpIGFzIE1hcnF1ZWVXaXphcmRTdGVwQ29tcG9uZW50O1xuXG4gICAgICAgIC8vIGNhbGwgdGhlIG9yaWdpbmFsIGZpbmlzaCBmdW5jdGlvblxuICAgICAgICByZXR1cm4gc3VwZXIuZmluaXNoKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBpZiB0aGUgc3RlcCBpcyB2YWxpZCBpbmRpY2F0ZSB0aGF0IGl0IGlzIG5vdyBjb21wbGV0ZVxuICAgICAgICAgICAgaWYgKHN0ZXAudmFsaWQpIHtcbiAgICAgICAgICAgICAgICBzdGVwLnNldENvbXBsZXRlZCh0cnVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5zdGVwRXJyb3IubmV4dCh0aGlzLnN0ZXApO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiBhIHN0ZXAgaW4gdGhlIHdpemFyZCBiZWNvbWVzIGludmFsaWQsIGFsbCBzdGVwcyBzZXF1ZW50aWFsbHkgYWZ0ZXJcbiAgICAgKiBpdCwgc2hvdWxkIGJlY29tZSB1bnZpc2l0ZWQgYW5kIGluY29tcGxldGVcbiAgICAgKi9cbiAgICB2YWxpZENoYW5nZShzdGF0ZTogTWFycXVlZVdpemFyZFZhbGlkRXZlbnQpOiB2b2lkIHtcblxuICAgICAgICBjb25zdCBzdGVwcyA9IHRoaXMuc3RlcHMudG9BcnJheSgpO1xuICAgICAgICBjb25zdCBjdXJyZW50ID0gc3RlcHMuZmluZEluZGV4KHN0ZXAgPT4gc3RlcCA9PT0gc3RhdGUuc3RlcCk7XG4gICAgICAgIGNvbnN0IGFmZmVjdGVkID0gc3RlcHMuc2xpY2UoY3VycmVudCk7XG5cbiAgICAgICAgYWZmZWN0ZWQuZm9yRWFjaChzdGVwID0+IHtcblxuICAgICAgICAgICAgLy8gdGhlIHN0ZXAgc2hvdWxkIG5vIGxvbmdlciBiZSBjb21wbGV0ZWRcbiAgICAgICAgICAgIHN0ZXAuY29tcGxldGVkID0gZmFsc2U7XG5cbiAgICAgICAgICAgIC8vIGlmIHRoZSBzdGVwIGlzIG5vdCB0aGUgY3VycmVudCBzdGVwIHRoZW4gYWxzbyBtYXJrIGl0IGFzIHVudmlzaXRlZFxuICAgICAgICAgICAgaWYgKHN0ZXAgIT09IHN0YXRlLnN0ZXApIHtcbiAgICAgICAgICAgICAgICBzdGVwLnZpc2l0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICB9XG59Il19