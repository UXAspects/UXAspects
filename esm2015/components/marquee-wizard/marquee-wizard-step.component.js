/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WizardStepComponent } from '../wizard/index';
import { MarqueeWizardService } from './marquee-wizard.service';
export class MarqueeWizardStepComponent extends WizardStepComponent {
    /**
     * @param {?} _marqueeWizardService
     */
    constructor(_marqueeWizardService) {
        super();
        this._marqueeWizardService = _marqueeWizardService;
        this.completed = false;
        this.completedChange = new EventEmitter();
        this._valid = true;
    }
    /**
     * @return {?}
     */
    get valid() {
        return this._valid;
    }
    /**
     * @param {?} valid
     * @return {?}
     */
    set valid(valid) {
        this._valid = valid;
        if (this._marqueeWizardService) {
            this._marqueeWizardService.valid$.next({ step: this, valid: valid });
        }
    }
    /**
     * Update the completed state and emit the latest value
     * @param {?} completed whether or not the step is completed
     * @return {?}
     */
    setCompleted(completed) {
        this.completed = completed;
        this.completedChange.emit(completed);
    }
}
MarqueeWizardStepComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-marquee-wizard-step',
                template: "<ng-container *ngIf=\"active\">\n    <ng-content></ng-content>\n</ng-container>"
            }] }
];
/** @nocollapse */
MarqueeWizardStepComponent.ctorParameters = () => [
    { type: MarqueeWizardService }
];
MarqueeWizardStepComponent.propDecorators = {
    icon: [{ type: Input }],
    completed: [{ type: Input }],
    completedChange: [{ type: Output }]
};
function MarqueeWizardStepComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    MarqueeWizardStepComponent.prototype.icon;
    /** @type {?} */
    MarqueeWizardStepComponent.prototype.completed;
    /** @type {?} */
    MarqueeWizardStepComponent.prototype.completedChange;
    /** @type {?} */
    MarqueeWizardStepComponent.prototype._valid;
    /** @type {?} */
    MarqueeWizardStepComponent.prototype._marqueeWizardService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFycXVlZS13aXphcmQtc3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9tYXJxdWVlLXdpemFyZC9tYXJxdWVlLXdpemFyZC1zdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQU1oRSxNQUFNLGlDQUFrQyxTQUFRLG1CQUFtQjs7OztJQW9CL0QsWUFBb0IscUJBQTJDO1FBQzNELEtBQUssRUFBRSxDQUFDO1FBRFEsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFzQjt5QkFqQmpDLEtBQUs7K0JBQ1AsSUFBSSxZQUFZLEVBQVc7c0JBYzdCLElBQUk7S0FJN0I7Ozs7SUFoQkQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDdEI7Ozs7O0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBYztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN4RTtLQUNKOzs7Ozs7SUFZRCxZQUFZLENBQUMsU0FBa0I7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDeEM7OztZQW5DSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsMkZBQW1EO2FBQ3REOzs7O1lBTFEsb0JBQW9COzs7bUJBUXhCLEtBQUs7d0JBQ0wsS0FBSzs4QkFDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdpemFyZFN0ZXBDb21wb25lbnQgfSBmcm9tICcuLi93aXphcmQvaW5kZXgnO1xuaW1wb3J0IHsgTWFycXVlZVdpemFyZFNlcnZpY2UgfSBmcm9tICcuL21hcnF1ZWUtd2l6YXJkLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LW1hcnF1ZWUtd2l6YXJkLXN0ZXAnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9tYXJxdWVlLXdpemFyZC1zdGVwLmNvbXBvbmVudC5odG1sJ1xufSlcbmV4cG9ydCBjbGFzcyBNYXJxdWVlV2l6YXJkU3RlcENvbXBvbmVudCBleHRlbmRzIFdpemFyZFN0ZXBDb21wb25lbnQge1xuXG4gICAgQElucHV0KCkgaWNvbjogc3RyaW5nO1xuICAgIEBJbnB1dCgpIGNvbXBsZXRlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBPdXRwdXQoKSBjb21wbGV0ZWRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG4gICAgXG4gICAgZ2V0IHZhbGlkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fdmFsaWQ7XG4gICAgfVxuXG4gICAgc2V0IHZhbGlkKHZhbGlkOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX3ZhbGlkID0gdmFsaWQ7XG5cbiAgICAgICAgaWYgKHRoaXMuX21hcnF1ZWVXaXphcmRTZXJ2aWNlKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXJxdWVlV2l6YXJkU2VydmljZS52YWxpZCQubmV4dCh7IHN0ZXA6IHRoaXMsIHZhbGlkOiB2YWxpZCB9KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgX3ZhbGlkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcnF1ZWVXaXphcmRTZXJ2aWNlOiBNYXJxdWVlV2l6YXJkU2VydmljZSkge1xuICAgICAgICBzdXBlcigpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgY29tcGxldGVkIHN0YXRlIGFuZCBlbWl0IHRoZSBsYXRlc3QgdmFsdWVcbiAgICAgKiBAcGFyYW0gY29tcGxldGVkIHdoZXRoZXIgb3Igbm90IHRoZSBzdGVwIGlzIGNvbXBsZXRlZFxuICAgICAqL1xuICAgIHNldENvbXBsZXRlZChjb21wbGV0ZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5jb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XG4gICAgICAgIHRoaXMuY29tcGxldGVkQ2hhbmdlLmVtaXQoY29tcGxldGVkKTtcbiAgICB9XG59Il19