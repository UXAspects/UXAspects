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
                template: `<ng-container *ngIf="active">
    <ng-content></ng-content>
</ng-container>`
            },] },
];
/** @nocollapse */
MarqueeWizardStepComponent.ctorParameters = () => [
    { type: MarqueeWizardService, },
];
MarqueeWizardStepComponent.propDecorators = {
    "icon": [{ type: Input },],
    "completed": [{ type: Input },],
    "completedChange": [{ type: Output },],
};
function MarqueeWizardStepComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    MarqueeWizardStepComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    MarqueeWizardStepComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    MarqueeWizardStepComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFycXVlZS13aXphcmQtc3RlcC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9tYXJxdWVlLXdpemFyZC9tYXJxdWVlLXdpemFyZC1zdGVwLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN2RSxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQVFoRSxNQUFNLGlDQUFrQyxTQUFRLG1CQUFtQjs7OztJQW9CL0QsWUFBb0IscUJBQTJDO1FBQzNELEtBQUssRUFBRSxDQUFDO1FBRFEsMEJBQXFCLEdBQXJCLHFCQUFxQixDQUFzQjt5QkFqQmpDLEtBQUs7K0JBQ1AsSUFBSSxZQUFZLEVBQVc7c0JBYzdCLElBQUk7S0FJN0I7Ozs7SUFoQkQsSUFBSSxLQUFLO1FBQ0wsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDdEI7Ozs7O0lBRUQsSUFBSSxLQUFLLENBQUMsS0FBYztRQUNwQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVwQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQztTQUN4RTtLQUNKOzs7Ozs7SUFZRCxZQUFZLENBQUMsU0FBa0I7UUFDM0IsSUFBSSxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDM0IsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7S0FDeEM7OztZQXJDSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHdCQUF3QjtnQkFDbEMsUUFBUSxFQUFFOztnQkFFRTthQUNmOzs7O1lBUFEsb0JBQW9COzs7cUJBVXhCLEtBQUs7MEJBQ0wsS0FBSztnQ0FDTCxNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBJbnB1dCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFdpemFyZFN0ZXBDb21wb25lbnQgfSBmcm9tICcuLi93aXphcmQvaW5kZXgnO1xuaW1wb3J0IHsgTWFycXVlZVdpemFyZFNlcnZpY2UgfSBmcm9tICcuL21hcnF1ZWUtd2l6YXJkLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LW1hcnF1ZWUtd2l6YXJkLXN0ZXAnLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRhaW5lciAqbmdJZj1cImFjdGl2ZVwiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvbmctY29udGFpbmVyPmBcbn0pXG5leHBvcnQgY2xhc3MgTWFycXVlZVdpemFyZFN0ZXBDb21wb25lbnQgZXh0ZW5kcyBXaXphcmRTdGVwQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIGljb246IHN0cmluZztcbiAgICBASW5wdXQoKSBjb21wbGV0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBAT3V0cHV0KCkgY29tcGxldGVkQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuICAgIFxuICAgIGdldCB2YWxpZCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3ZhbGlkO1xuICAgIH1cblxuICAgIHNldCB2YWxpZCh2YWxpZDogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl92YWxpZCA9IHZhbGlkO1xuXG4gICAgICAgIGlmICh0aGlzLl9tYXJxdWVlV2l6YXJkU2VydmljZSkge1xuICAgICAgICAgICAgdGhpcy5fbWFycXVlZVdpemFyZFNlcnZpY2UudmFsaWQkLm5leHQoeyBzdGVwOiB0aGlzLCB2YWxpZDogdmFsaWQgfSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF92YWxpZDogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9tYXJxdWVlV2l6YXJkU2VydmljZTogTWFycXVlZVdpemFyZFNlcnZpY2UpIHtcbiAgICAgICAgc3VwZXIoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIGNvbXBsZXRlZCBzdGF0ZSBhbmQgZW1pdCB0aGUgbGF0ZXN0IHZhbHVlXG4gICAgICogQHBhcmFtIGNvbXBsZXRlZCB3aGV0aGVyIG9yIG5vdCB0aGUgc3RlcCBpcyBjb21wbGV0ZWRcbiAgICAgKi9cbiAgICBzZXRDb21wbGV0ZWQoY29tcGxldGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuY29tcGxldGVkID0gY29tcGxldGVkO1xuICAgICAgICB0aGlzLmNvbXBsZXRlZENoYW5nZS5lbWl0KGNvbXBsZXRlZCk7XG4gICAgfVxufSJdfQ==