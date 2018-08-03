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
        marqueeWizardService.valid$.pipe(filter((event) => !event.valid)).subscribe(this.validChange.bind(this));
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
                template: "<div class=\"marquee-wizard-side-panel\">\n\n    <div class=\"marquee-wizard-description-container\" *ngIf=\"description\">\n        <!-- If a template was provided display it -->\n        <ng-container *ngIf=\"isTemplate\" [ngTemplateOutlet]=\"description\"></ng-container>\n\n        <!-- Otherwise wimply display the string -->\n        <ng-container *ngIf=\"!isTemplate\">\n            <p>{{ description }}</p>\n        </ng-container>\n    </div>\n\n    <ul class=\"marquee-wizard-steps\">\n\n        <li class=\"marquee-wizard-step\" *ngFor=\"let step of steps\" (click)=\"gotoStep(step)\" [class.active]=\"step.active\" [class.visited]=\"step.visited\" [class.invalid]=\"!step.valid\">\n            <i class=\"marquee-wizard-step-icon\" [ngClass]=\"step.icon\"></i>\n            <span class=\"marquee-wizard-step-title\">{{ step.header }}</span>\n            <span class=\"marquee-wizard-step-status hpe-icon hpe-checkmark\" *ngIf=\"step.completed\"></span>\n        </li>\n\n    </ul>\n</div>\n\n<div class=\"marquee-wizard-content-panel\">\n    <div class=\"marquee-wizard-content\">\n        <ng-content></ng-content>\n    </div>\n\n    <div class=\"modal-footer\">\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-secondary\" *ngIf=\"previousVisible\" [uxTooltip]=\"previousTooltip\" container=\"body\"\n            [disabled]=\"previousDisabled || step === 0\" (click)=\"previous(); tip.hide()\">{{ previousText }}</button>\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-primary\" *ngIf=\"nextVisible && !isLastStep()\" [uxTooltip]=\"nextTooltip\" container=\"body\"\n            [disabled]=\"nextDisabled\" (click)=\"next(); tip.hide()\">{{ nextText }}</button>\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-primary\" *ngIf=\"finishVisible && isLastStep() || finishAlwaysVisible\" [uxTooltip]=\"finishTooltip\"\n            container=\"body\" [disabled]=\"finishDisabled\" (click)=\"finish(); tip.hide()\">{{ finishText }}</button>\n\n        <button #tip=\"ux-tooltip\" class=\"btn button-secondary\" *ngIf=\"cancelVisible && !isLastStep() || cancelAlwaysVisible\" [uxTooltip]=\"cancelTooltip\"\n            container=\"body\" [disabled]=\"cancelDisabled\" (click)=\"cancel(); tip.hide()\">{{ cancelText }}</button>\n    </div>\n</div>",
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFycXVlZS13aXphcmQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbWFycXVlZS13aXphcmQvbWFycXVlZS13aXphcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEMsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQ2xELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzdFLE9BQU8sRUFBRSxvQkFBb0IsRUFBMkIsTUFBTSwwQkFBMEIsQ0FBQztBQU96RixNQUFNLDZCQUE4QixTQUFRLGVBQWU7Ozs7SUFTdkQsWUFBWSxvQkFBMEM7UUFDbEQsS0FBSyxFQUFFLENBQUM7cUJBUHlDLElBQUksU0FBUyxFQUE4QjtRQVM1RixvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUM1QixNQUFNLENBQUMsQ0FBQyxLQUE4QixFQUFFLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FDM0QsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUM1Qzs7OztJQVZELElBQUksVUFBVTtRQUNWLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksQ0FBQyxXQUFXLFlBQVksV0FBVyxDQUFDO0tBQ3RFOzs7Ozs7SUFjRCxJQUFJOztRQUdBLHVCQUFNLElBQUkscUJBQUcsSUFBSSxDQUFDLGNBQWMsRUFBZ0MsQ0FBQSxDQUFDO1FBRWpFLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2IsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDOztZQUdiLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDM0I7S0FDSjs7Ozs7O0lBTUQsTUFBTTs7UUFHRix1QkFBTSxJQUFJLHFCQUFHLElBQUksQ0FBQyxjQUFjLEVBQWdDLENBQUEsQ0FBQzs7UUFHakUsTUFBTSxDQUFDLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFOztZQUU1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzNCO1NBQ0osQ0FBQyxDQUFDO0tBQ047Ozs7Ozs7SUFNRCxXQUFXLENBQUMsS0FBOEI7UUFFdEMsdUJBQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLENBQUM7UUFDbkMsdUJBQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzdELHVCQUFNLFFBQVEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRXRDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7O1lBR3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDOztZQUd2QixFQUFFLENBQUMsQ0FBQyxJQUFJLEtBQUssS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBQ3RCLElBQUksQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDO2FBQ3hCO1NBQ0osQ0FBQyxDQUFDO0tBRU47OztZQTlFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG1CQUFtQjtnQkFDN0IscXZFQUE4QztnQkFDOUMsU0FBUyxFQUFFLENBQUUsb0JBQW9CLENBQUU7YUFDdEM7Ozs7WUFOUSxvQkFBb0I7OzswQkFTeEIsS0FBSztvQkFDTCxlQUFlLFNBQUMsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIElucHV0LCBRdWVyeUxpc3QsIFRlbXBsYXRlUmVmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBXaXphcmRDb21wb25lbnQgfSBmcm9tICcuLi93aXphcmQvaW5kZXgnO1xuaW1wb3J0IHsgTWFycXVlZVdpemFyZFN0ZXBDb21wb25lbnQgfSBmcm9tICcuL21hcnF1ZWUtd2l6YXJkLXN0ZXAuY29tcG9uZW50JztcbmltcG9ydCB7IE1hcnF1ZWVXaXphcmRTZXJ2aWNlLCBNYXJxdWVlV2l6YXJkVmFsaWRFdmVudCB9IGZyb20gJy4vbWFycXVlZS13aXphcmQuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtbWFycXVlZS13aXphcmQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tYXJxdWVlLXdpemFyZC5jb21wb25lbnQuaHRtbCcsXG4gICAgcHJvdmlkZXJzOiBbIE1hcnF1ZWVXaXphcmRTZXJ2aWNlIF1cbn0pXG5leHBvcnQgY2xhc3MgTWFycXVlZVdpemFyZENvbXBvbmVudCBleHRlbmRzIFdpemFyZENvbXBvbmVudCB7XG5cbiAgICBASW5wdXQoKSBkZXNjcmlwdGlvbjogc3RyaW5nIHwgVGVtcGxhdGVSZWY8YW55PjtcbiAgICBAQ29udGVudENoaWxkcmVuKE1hcnF1ZWVXaXphcmRTdGVwQ29tcG9uZW50KSBzdGVwcyA9IG5ldyBRdWVyeUxpc3Q8TWFycXVlZVdpemFyZFN0ZXBDb21wb25lbnQ+KCk7XG5cbiAgICBnZXQgaXNUZW1wbGF0ZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGVzY3JpcHRpb24gJiYgdGhpcy5kZXNjcmlwdGlvbiBpbnN0YW5jZW9mIFRlbXBsYXRlUmVmO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKG1hcnF1ZWVXaXphcmRTZXJ2aWNlOiBNYXJxdWVlV2l6YXJkU2VydmljZSkge1xuICAgICAgICBzdXBlcigpO1xuXG4gICAgICAgIG1hcnF1ZWVXaXphcmRTZXJ2aWNlLnZhbGlkJC5waXBlKFxuICAgICAgICAgICAgZmlsdGVyKChldmVudDogTWFycXVlZVdpemFyZFZhbGlkRXZlbnQpID0+ICFldmVudC52YWxpZClcbiAgICAgICAgKS5zdWJzY3JpYmUodGhpcy52YWxpZENoYW5nZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBJZiB0aGUgY3VycmVudCBzdGVwIGlzIHZhbGlkLCBtYXJrIGl0IGFzXG4gICAgICogY29tcGxldGUgYW5kIGdvIHRvIHRoZSBuZXh0IHN0ZXBcbiAgICAgKi9cbiAgICBuZXh0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBzdGVwXG4gICAgICAgIGNvbnN0IHN0ZXAgPSB0aGlzLmdldEN1cnJlbnRTdGVwKCkgYXMgTWFycXVlZVdpemFyZFN0ZXBDb21wb25lbnQ7XG5cbiAgICAgICAgaWYgKHN0ZXAudmFsaWQpIHtcbiAgICAgICAgICAgIHN1cGVyLm5leHQoKTtcblxuICAgICAgICAgICAgLy8gbWFyayB0aGlzIHN0ZXAgYXMgY29tcGxldGVkXG4gICAgICAgICAgICBzdGVwLnNldENvbXBsZXRlZCh0cnVlKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEVtaXQgdGhlIG9uRmluaXNoaW5nIGV2ZW50IGFuZCBpZiB2YWxpZCB0aGUgb25GaW5pc2ggZXZlbnQuXG4gICAgICogQWxzbyBtYXJrIHRoZSBmaW5hbCBzdGVwIGFzIGNvbXBsZXRlZCBpZiBpdCBpcyB2YWxpZFxuICAgICAqL1xuICAgIGZpbmlzaCgpOiBQcm9taXNlPHZvaWQ+IHtcblxuICAgICAgICAvLyBnZXQgdGhlIGN1cnJlbnQgc3RlcFxuICAgICAgICBjb25zdCBzdGVwID0gdGhpcy5nZXRDdXJyZW50U3RlcCgpIGFzIE1hcnF1ZWVXaXphcmRTdGVwQ29tcG9uZW50O1xuXG4gICAgICAgIC8vIGNhbGwgdGhlIG9yaWdpbmFsIGZpbmlzaCBmdW5jdGlvblxuICAgICAgICByZXR1cm4gc3VwZXIuZmluaXNoKCkudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAvLyBpZiB0aGUgc3RlcCBpcyB2YWxpZCBpbmRpY2F0ZSB0aGF0IGl0IGlzIG5vdyBjb21wbGV0ZVxuICAgICAgICAgICAgaWYgKHN0ZXAudmFsaWQpIHtcbiAgICAgICAgICAgICAgICBzdGVwLnNldENvbXBsZXRlZCh0cnVlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSWYgYSBzdGVwIGluIHRoZSB3aXphcmQgYmVjb21lcyBpbnZhbGlkLCBhbGwgc3RlcHMgc2VxdWVudGlhbGx5IGFmdGVyXG4gICAgICogaXQsIHNob3VsZCBiZWNvbWUgdW52aXNpdGVkIGFuZCBpbmNvbXBsZXRlXG4gICAgICovXG4gICAgdmFsaWRDaGFuZ2Uoc3RhdGU6IE1hcnF1ZWVXaXphcmRWYWxpZEV2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgY29uc3Qgc3RlcHMgPSB0aGlzLnN0ZXBzLnRvQXJyYXkoKTtcbiAgICAgICAgY29uc3QgY3VycmVudCA9IHN0ZXBzLmZpbmRJbmRleChzdGVwID0+IHN0ZXAgPT09IHN0YXRlLnN0ZXApO1xuICAgICAgICBjb25zdCBhZmZlY3RlZCA9IHN0ZXBzLnNsaWNlKGN1cnJlbnQpO1xuXG4gICAgICAgIGFmZmVjdGVkLmZvckVhY2goc3RlcCA9PiB7XG5cbiAgICAgICAgICAgIC8vIHRoZSBzdGVwIHNob3VsZCBubyBsb25nZXIgYmUgY29tcGxldGVkXG4gICAgICAgICAgICBzdGVwLmNvbXBsZXRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyBpZiB0aGUgc3RlcCBpcyBub3QgdGhlIGN1cnJlbnQgc3RlcCB0aGVuIGFsc28gbWFyayBpdCBhcyB1bnZpc2l0ZWRcbiAgICAgICAgICAgIGlmIChzdGVwICE9PSBzdGF0ZS5zdGVwKSB7XG4gICAgICAgICAgICAgICAgc3RlcC52aXNpdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgfVxufSJdfQ==