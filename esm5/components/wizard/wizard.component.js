/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { WizardStepComponent } from './wizard-step.component';
var /** @type {?} */ uniqueId = 0;
var WizardComponent = /** @class */ (function () {
    function WizardComponent() {
        this.orientation = 'horizontal';
        this.nextText = 'Next';
        this.previousText = 'Previous';
        this.cancelText = 'Cancel';
        this.finishText = 'Finish';
        this.nextTooltip = 'Go to the next step';
        this.previousTooltip = 'Go to the previous step';
        this.cancelTooltip = 'Cancel the wizard';
        this.finishTooltip = 'Finish the wizard';
        this.nextAriaLabel = 'Go to the next step';
        this.previousAriaLabel = 'Go to the previous step';
        this.cancelAriaLabel = 'Cancel the wizard';
        this.finishAriaLabel = 'Finish the wizard';
        this.nextDisabled = false;
        this.previousDisabled = false;
        this.cancelDisabled = false;
        this.finishDisabled = false;
        this.nextVisible = true;
        this.previousVisible = true;
        this.cancelVisible = true;
        this.finishVisible = true;
        this.cancelAlwaysVisible = false;
        this.finishAlwaysVisible = false;
        this.onNext = new EventEmitter();
        this.onPrevious = new EventEmitter();
        this.onCancel = new EventEmitter();
        this.onFinishing = new EventEmitter();
        this.onFinish = new EventEmitter();
        this.stepChanging = new EventEmitter();
        this.stepChange = new EventEmitter();
        this.stepError = new EventEmitter();
        this.steps = new QueryList();
        this.id = "ux-wizard-" + uniqueId++;
        this.invalidIndicator = false;
        this._step = 0;
        this._onDestroy = new Subject();
    }
    Object.defineProperty(WizardComponent.prototype, "step", {
        get: /**
         * @return {?}
         */
        function () {
            return this._step;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            // only accept numbers as valid options
            if (typeof value === 'number') {
                // store the active step
                this._step = value;
                // update which steps should be active
                this.update();
                // emit the change event
                this.stepChange.next(this.step);
                // reset the invalid state
                this.invalidIndicator = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    WizardComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // initially set the correct visibility of the steps
        setTimeout(this.update.bind(this));
        // initially set the ids for each step
        this.setWizardStepIds();
        // if the steps change then update the ids
        this.steps.changes.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this.setWizardStepIds(); });
    };
    /**
     * @return {?}
     */
    WizardComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /** Set ids for each of the wizard steps */
    /**
     * Set ids for each of the wizard steps
     * @return {?}
     */
    WizardComponent.prototype.setWizardStepIds = /**
     * Set ids for each of the wizard steps
     * @return {?}
     */
    function () {
        var _this = this;
        this.steps.forEach(function (step, idx) { return step.id = _this.id + "-step-" + idx; });
    };
    /**
     * Navigate to the next step
     */
    /**
     * Navigate to the next step
     * @return {?}
     */
    WizardComponent.prototype.next = /**
     * Navigate to the next step
     * @return {?}
     */
    function () {
        this.stepChanging.next(new StepChangingEvent(this.step, this.step + 1));
        // check if current step is invalid
        if (!this.getCurrentStep().valid) {
            this.invalidIndicator = true;
            this.stepError.next(this.step);
            return;
        }
        // check if we are currently on the last step
        if ((this.step + 1) < this.steps.length) {
            this.step++;
            // emit the current step
            this.onNext.next(this.step);
        }
    };
    /**
     * Navigate to the previous step
     */
    /**
     * Navigate to the previous step
     * @return {?}
     */
    WizardComponent.prototype.previous = /**
     * Navigate to the previous step
     * @return {?}
     */
    function () {
        this.stepChanging.next(new StepChangingEvent(this.step, this.step - 1));
        // check if we are currently on the last step
        if (this.step > 0) {
            this.step--;
            // emit the current step
            this.onPrevious.next(this.step);
        }
    };
    /**
     * Perform actions when the finish button is clicked
     */
    /**
     * Perform actions when the finish button is clicked
     * @return {?}
     */
    WizardComponent.prototype.finish = /**
     * Perform actions when the finish button is clicked
     * @return {?}
     */
    function () {
        var _this = this;
        // fires when the finish button is clicked always
        this.onFinishing.next();
        /**
                 * This is required because we need to ensure change detection has run
                 * to determine whether or not we have the latest value for the 'valid' input
                 * on the current step. Unfortunately we can't use ChangeDetectorRef as we are looking to run
                 * on content children, and we cant use ApplicationRef.tick() as this does not work in a hybrid app, eg. our docs
                 */
        return new Promise(function (resolve) {
            setTimeout(function () {
                // only fires when the finish button is clicked and the step is valid
                if (_this.getCurrentStep().valid) {
                    _this.onFinish.next();
                }
                else {
                    _this.stepError.next(_this.step);
                }
                resolve();
            });
        });
    };
    /**
     * Perform actions when the cancel button is clicked
     */
    /**
     * Perform actions when the cancel button is clicked
     * @return {?}
     */
    WizardComponent.prototype.cancel = /**
     * Perform actions when the cancel button is clicked
     * @return {?}
     */
    function () {
        this.onCancel.next();
    };
    /**
     * Update the active state of each step
     */
    /**
     * Update the active state of each step
     * @return {?}
     */
    WizardComponent.prototype.update = /**
     * Update the active state of each step
     * @return {?}
     */
    function () {
        var _this = this;
        // update which steps should be active
        this.steps.forEach(function (step, idx) { return step.active = idx === _this.step; });
    };
    /**
     * Jump to a specific step only if the step has previously been visited
     */
    /**
     * Jump to a specific step only if the step has previously been visited
     * @param {?} step
     * @return {?}
     */
    WizardComponent.prototype.gotoStep = /**
     * Jump to a specific step only if the step has previously been visited
     * @param {?} step
     * @return {?}
     */
    function (step) {
        if (step.visited) {
            var /** @type {?} */ stepIndex = this.steps.toArray().findIndex(function (stp) { return stp === step; });
            this.stepChanging.next(new StepChangingEvent(this.step, stepIndex));
            this.step = stepIndex;
        }
    };
    /**
     * Determine if the current step is the last step
     */
    /**
     * Determine if the current step is the last step
     * @return {?}
     */
    WizardComponent.prototype.isLastStep = /**
     * Determine if the current step is the last step
     * @return {?}
     */
    function () {
        return this.step === (this.steps.length - 1);
    };
    /**
     * Reset the wizard - goes to first step and resets visited state
     */
    /**
     * Reset the wizard - goes to first step and resets visited state
     * @return {?}
     */
    WizardComponent.prototype.reset = /**
     * Reset the wizard - goes to first step and resets visited state
     * @return {?}
     */
    function () {
        // mark all steps as not visited
        this.steps.forEach(function (step) { return step.visited = false; });
        // go to the first step
        this.step = 0;
    };
    /**
     * Get the step at the current index
     */
    /**
     * Get the step at the current index
     * @return {?}
     */
    WizardComponent.prototype.getCurrentStep = /**
     * Get the step at the current index
     * @return {?}
     */
    function () {
        return this.getStepAtIndex(this.step);
    };
    /**
     * Return a step at a specific index
     */
    /**
     * Return a step at a specific index
     * @param {?} index
     * @return {?}
     */
    WizardComponent.prototype.getStepAtIndex = /**
     * Return a step at a specific index
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return this.steps.toArray()[index];
    };
    WizardComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-wizard',
                    template: "<div class=\"wizard-body\">\n\n    <div class=\"wizard-steps\"\n        uxTabbableList\n        [direction]=\"orientation\"\n        role=\"tablist\"\n        [attr.aria-orientation]=\"orientation\">\n\n        <div *ngFor=\"let stp of steps; let index = index\"\n            role=\"tab\"\n            uxTabbableListItem\n            [disabled]=\"!stp.visited\"\n            class=\"wizard-step\"\n            [class.active]=\"stp.active\"\n            [class.visited]=\"stp.visited\"\n            [class.invalid]=\"stp.active && !stp.valid && invalidIndicator\"\n            [attr.aria-posinset]=\"index + 1\"\n            [attr.aria-setsize]=\"steps.length\"\n            [attr.aria-selected]=\"stp.active\"\n            [attr.aria-controls]=\"stp.id\"\n            [id]=\"stp.id + '-label'\"\n            (click)=\"gotoStep(stp)\"\n            (keydown.enter)=\"gotoStep(stp)\">\n            {{ stp.header }}\n        </div>\n\n    </div>\n\n    <div class=\"wizard-content\">\n        <ng-content></ng-content>\n    </div>\n\n</div>\n\n<div class=\"wizard-footer\">\n    <button #tip=\"ux-tooltip\"\n            class=\"btn button-secondary\"\n            *ngIf=\"previousVisible\"\n            [uxTooltip]=\"previousTooltip\"\n            [disabled]=\"previousDisabled || step === 0\"\n            [attr.aria-label]=\"previousAriaLabel\"\n            (click)=\"previous(); tip.hide()\">\n        {{ previousText }}\n    </button>\n\n    <button #tip=\"ux-tooltip\"\n            class=\"btn button-primary\"\n            *ngIf=\"nextVisible && !isLastStep()\"\n            [uxTooltip]=\"nextTooltip\"\n            [disabled]=\"nextDisabled\"\n            [attr.aria-label]=\"nextAriaLabel\"\n            (click)=\"next(); tip.hide()\">\n        {{ nextText }}\n    </button>\n\n    <button #tip=\"ux-tooltip\"\n            class=\"btn button-primary\"\n            *ngIf=\"finishVisible && isLastStep() || finishAlwaysVisible\"\n            [uxTooltip]=\"finishTooltip\"\n            [disabled]=\"finishDisabled\"\n            [attr.aria-label]=\"finishAriaLabel\"\n            (click)=\"finish(); tip.hide()\">\n        {{ finishText }}\n    </button>\n\n    <button #tip=\"ux-tooltip\"\n            class=\"btn button-secondary\"\n            *ngIf=\"cancelVisible && !isLastStep() || cancelAlwaysVisible\"\n            [uxTooltip]=\"cancelTooltip\"\n            [disabled]=\"cancelDisabled\"\n            [attr.aria-label]=\"cancelAriaLabel\"\n            (click)=\"cancel(); tip.hide()\">\n        {{ cancelText }}\n    </button>\n</div>\n",
                    host: {
                        '[class]': 'orientation'
                    }
                }] }
    ];
    WizardComponent.propDecorators = {
        orientation: [{ type: Input }],
        nextText: [{ type: Input }],
        previousText: [{ type: Input }],
        cancelText: [{ type: Input }],
        finishText: [{ type: Input }],
        nextTooltip: [{ type: Input }],
        previousTooltip: [{ type: Input }],
        cancelTooltip: [{ type: Input }],
        finishTooltip: [{ type: Input }],
        nextAriaLabel: [{ type: Input }],
        previousAriaLabel: [{ type: Input }],
        cancelAriaLabel: [{ type: Input }],
        finishAriaLabel: [{ type: Input }],
        nextDisabled: [{ type: Input }],
        previousDisabled: [{ type: Input }],
        cancelDisabled: [{ type: Input }],
        finishDisabled: [{ type: Input }],
        nextVisible: [{ type: Input }],
        previousVisible: [{ type: Input }],
        cancelVisible: [{ type: Input }],
        finishVisible: [{ type: Input }],
        cancelAlwaysVisible: [{ type: Input }],
        finishAlwaysVisible: [{ type: Input }],
        onNext: [{ type: Output }],
        onPrevious: [{ type: Output }],
        onCancel: [{ type: Output }],
        onFinishing: [{ type: Output }],
        onFinish: [{ type: Output }],
        stepChanging: [{ type: Output }],
        stepChange: [{ type: Output }],
        stepError: [{ type: Output }],
        steps: [{ type: ContentChildren, args: [WizardStepComponent,] }],
        step: [{ type: Input }]
    };
    return WizardComponent;
}());
export { WizardComponent };
function WizardComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    WizardComponent.prototype.orientation;
    /** @type {?} */
    WizardComponent.prototype.nextText;
    /** @type {?} */
    WizardComponent.prototype.previousText;
    /** @type {?} */
    WizardComponent.prototype.cancelText;
    /** @type {?} */
    WizardComponent.prototype.finishText;
    /** @type {?} */
    WizardComponent.prototype.nextTooltip;
    /** @type {?} */
    WizardComponent.prototype.previousTooltip;
    /** @type {?} */
    WizardComponent.prototype.cancelTooltip;
    /** @type {?} */
    WizardComponent.prototype.finishTooltip;
    /** @type {?} */
    WizardComponent.prototype.nextAriaLabel;
    /** @type {?} */
    WizardComponent.prototype.previousAriaLabel;
    /** @type {?} */
    WizardComponent.prototype.cancelAriaLabel;
    /** @type {?} */
    WizardComponent.prototype.finishAriaLabel;
    /** @type {?} */
    WizardComponent.prototype.nextDisabled;
    /** @type {?} */
    WizardComponent.prototype.previousDisabled;
    /** @type {?} */
    WizardComponent.prototype.cancelDisabled;
    /** @type {?} */
    WizardComponent.prototype.finishDisabled;
    /** @type {?} */
    WizardComponent.prototype.nextVisible;
    /** @type {?} */
    WizardComponent.prototype.previousVisible;
    /** @type {?} */
    WizardComponent.prototype.cancelVisible;
    /** @type {?} */
    WizardComponent.prototype.finishVisible;
    /** @type {?} */
    WizardComponent.prototype.cancelAlwaysVisible;
    /** @type {?} */
    WizardComponent.prototype.finishAlwaysVisible;
    /** @type {?} */
    WizardComponent.prototype.onNext;
    /** @type {?} */
    WizardComponent.prototype.onPrevious;
    /** @type {?} */
    WizardComponent.prototype.onCancel;
    /** @type {?} */
    WizardComponent.prototype.onFinishing;
    /** @type {?} */
    WizardComponent.prototype.onFinish;
    /** @type {?} */
    WizardComponent.prototype.stepChanging;
    /** @type {?} */
    WizardComponent.prototype.stepChange;
    /** @type {?} */
    WizardComponent.prototype.stepError;
    /** @type {?} */
    WizardComponent.prototype.steps;
    /** @type {?} */
    WizardComponent.prototype.id;
    /** @type {?} */
    WizardComponent.prototype.invalidIndicator;
    /** @type {?} */
    WizardComponent.prototype._step;
    /** @type {?} */
    WizardComponent.prototype._onDestroy;
}
var StepChangingEvent = /** @class */ (function () {
    function StepChangingEvent(from, to) {
        this.from = from;
        this.to = to;
    }
    return StepChangingEvent;
}());
export { StepChangingEvent };
function StepChangingEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    StepChangingEvent.prototype.from;
    /** @type {?} */
    StepChangingEvent.prototype.to;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3dpemFyZC93aXphcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTlELHFCQUFJLFFBQVEsR0FBVyxDQUFDLENBQUM7OzsyQkFXNkIsWUFBWTt3QkFFbEMsTUFBTTs0QkFDRixVQUFVOzBCQUNaLFFBQVE7MEJBQ1IsUUFBUTsyQkFFUCxxQkFBcUI7K0JBQ2pCLHlCQUF5Qjs2QkFDM0IsbUJBQW1COzZCQUNuQixtQkFBbUI7NkJBRW5CLHFCQUFxQjtpQ0FDakIseUJBQXlCOytCQUMzQixtQkFBbUI7K0JBQ25CLG1CQUFtQjs0QkFFckIsS0FBSztnQ0FDRCxLQUFLOzhCQUNQLEtBQUs7OEJBQ0wsS0FBSzsyQkFFUixJQUFJOytCQUNBLElBQUk7NkJBQ04sSUFBSTs2QkFDSixJQUFJO21DQUNFLEtBQUs7bUNBQ0wsS0FBSztzQkFFMUIsSUFBSSxZQUFZLEVBQVU7MEJBQ3RCLElBQUksWUFBWSxFQUFVO3dCQUM1QixJQUFJLFlBQVksRUFBUTsyQkFDckIsSUFBSSxZQUFZLEVBQVE7d0JBQzNCLElBQUksWUFBWSxFQUFROzRCQUNwQixJQUFJLFlBQVksRUFBcUI7MEJBQ3ZDLElBQUksWUFBWSxFQUFVO3lCQUMzQixJQUFJLFlBQVksRUFBVTtxQkFFRixJQUFJLFNBQVMsRUFBdUI7a0JB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SztnQ0FFTCxLQUFLO29DQUNMLEtBQUs7a0NBQ0wsS0FBSztrQ0FDTCxLQUFLOytCQUVMLEtBQUs7bUNBQ0wsS0FBSztpQ0FDTCxLQUFLO2lDQUNMLEtBQUs7OEJBRUwsS0FBSztrQ0FDTCxLQUFLO2dDQUNMLEtBQUs7Z0NBQ0wsS0FBSztzQ0FDTCxLQUFLO3NDQUNMLEtBQUs7eUJBRUwsTUFBTTs2QkFDTixNQUFNOzJCQUNOLE1BQU07OEJBQ04sTUFBTTsyQkFDTixNQUFNOytCQUNOLE1BQU07NkJBQ04sTUFBTTs0QkFDTixNQUFNO3dCQUVOLGVBQWUsU0FBQyxtQkFBbUI7dUJBS25DLEtBQUs7OzBCQTNEVjs7U0FjYSxlQUFlOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnTzVCLElBQUE7SUFDSSwyQkFBbUIsSUFBWSxFQUFTLEVBQVU7UUFBL0IsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQVE7S0FBSzs0QkEvTzNEO0lBZ1BDLENBQUE7QUFGRCw2QkFFQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFdpemFyZFN0ZXBDb21wb25lbnQgfSBmcm9tICcuL3dpemFyZC1zdGVwLmNvbXBvbmVudCc7XG5cbmxldCB1bmlxdWVJZDogbnVtYmVyID0gMDtcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC13aXphcmQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi93aXphcmQuY29tcG9uZW50Lmh0bWwnLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzc10nOiAnb3JpZW50YXRpb24nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBXaXphcmRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XG5cbiAgICBASW5wdXQoKSBuZXh0VGV4dDogc3RyaW5nID0gJ05leHQnO1xuICAgIEBJbnB1dCgpIHByZXZpb3VzVGV4dDogc3RyaW5nID0gJ1ByZXZpb3VzJztcbiAgICBASW5wdXQoKSBjYW5jZWxUZXh0OiBzdHJpbmcgPSAnQ2FuY2VsJztcbiAgICBASW5wdXQoKSBmaW5pc2hUZXh0OiBzdHJpbmcgPSAnRmluaXNoJztcblxuICAgIEBJbnB1dCgpIG5leHRUb29sdGlwOiBzdHJpbmcgPSAnR28gdG8gdGhlIG5leHQgc3RlcCc7XG4gICAgQElucHV0KCkgcHJldmlvdXNUb29sdGlwOiBzdHJpbmcgPSAnR28gdG8gdGhlIHByZXZpb3VzIHN0ZXAnO1xuICAgIEBJbnB1dCgpIGNhbmNlbFRvb2x0aXA6IHN0cmluZyA9ICdDYW5jZWwgdGhlIHdpemFyZCc7XG4gICAgQElucHV0KCkgZmluaXNoVG9vbHRpcDogc3RyaW5nID0gJ0ZpbmlzaCB0aGUgd2l6YXJkJztcblxuICAgIEBJbnB1dCgpIG5leHRBcmlhTGFiZWw6IHN0cmluZyA9ICdHbyB0byB0aGUgbmV4dCBzdGVwJztcbiAgICBASW5wdXQoKSBwcmV2aW91c0FyaWFMYWJlbDogc3RyaW5nID0gJ0dvIHRvIHRoZSBwcmV2aW91cyBzdGVwJztcbiAgICBASW5wdXQoKSBjYW5jZWxBcmlhTGFiZWw6IHN0cmluZyA9ICdDYW5jZWwgdGhlIHdpemFyZCc7XG4gICAgQElucHV0KCkgZmluaXNoQXJpYUxhYmVsOiBzdHJpbmcgPSAnRmluaXNoIHRoZSB3aXphcmQnO1xuXG4gICAgQElucHV0KCkgbmV4dERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgcHJldmlvdXNEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGNhbmNlbERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgZmluaXNoRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIG5leHRWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBwcmV2aW91c1Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGNhbmNlbFZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGZpbmlzaFZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGNhbmNlbEFsd2F5c1Zpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBmaW5pc2hBbHdheXNWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgb25OZXh0ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gICAgQE91dHB1dCgpIG9uUHJldmlvdXMgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgICBAT3V0cHV0KCkgb25DYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpIG9uRmluaXNoaW5nID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIEBPdXRwdXQoKSBvbkZpbmlzaCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgc3RlcENoYW5naW5nID0gbmV3IEV2ZW50RW1pdHRlcjxTdGVwQ2hhbmdpbmdFdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgc3RlcENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICAgIEBPdXRwdXQoKSBzdGVwRXJyb3IgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oV2l6YXJkU3RlcENvbXBvbmVudCkgc3RlcHMgPSBuZXcgUXVlcnlMaXN0PFdpemFyZFN0ZXBDb21wb25lbnQ+KCk7XG5cbiAgICBpZDogc3RyaW5nID0gYHV4LXdpemFyZC0ke3VuaXF1ZUlkKyt9YDtcbiAgICBpbnZhbGlkSW5kaWNhdG9yOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBzdGVwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgICB9XG4gICAgc2V0IHN0ZXAodmFsdWU6IG51bWJlcikge1xuXG4gICAgICAgIC8vIG9ubHkgYWNjZXB0IG51bWJlcnMgYXMgdmFsaWQgb3B0aW9uc1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgYWN0aXZlIHN0ZXBcbiAgICAgICAgICAgIHRoaXMuX3N0ZXAgPSB2YWx1ZTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHdoaWNoIHN0ZXBzIHNob3VsZCBiZSBhY3RpdmVcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICAgICAgICAgIC8vIGVtaXQgdGhlIGNoYW5nZSBldmVudFxuICAgICAgICAgICAgdGhpcy5zdGVwQ2hhbmdlLm5leHQodGhpcy5zdGVwKTtcblxuICAgICAgICAgICAgLy8gcmVzZXQgdGhlIGludmFsaWQgc3RhdGVcbiAgICAgICAgICAgIHRoaXMuaW52YWxpZEluZGljYXRvciA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyID0gMDtcbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGluaXRpYWxseSBzZXQgdGhlIGNvcnJlY3QgdmlzaWJpbGl0eSBvZiB0aGUgc3RlcHNcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcblxuICAgICAgICAvLyBpbml0aWFsbHkgc2V0IHRoZSBpZHMgZm9yIGVhY2ggc3RlcFxuICAgICAgICB0aGlzLnNldFdpemFyZFN0ZXBJZHMoKTtcblxuICAgICAgICAvLyBpZiB0aGUgc3RlcHMgY2hhbmdlIHRoZW4gdXBkYXRlIHRoZSBpZHNcbiAgICAgICAgdGhpcy5zdGVwcy5jaGFuZ2VzLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZSgoKSA9PiB0aGlzLnNldFdpemFyZFN0ZXBJZHMoKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIC8qKiBTZXQgaWRzIGZvciBlYWNoIG9mIHRoZSB3aXphcmQgc3RlcHMgKi9cbiAgICBzZXRXaXphcmRTdGVwSWRzKCk6IHZvaWQge1xuICAgICAgICB0aGlzLnN0ZXBzLmZvckVhY2goKHN0ZXAsIGlkeCkgPT4gc3RlcC5pZCA9IGAke3RoaXMuaWR9LXN0ZXAtJHtpZHh9YCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTmF2aWdhdGUgdG8gdGhlIG5leHQgc3RlcFxuICAgICAqL1xuICAgIG5leHQoKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5zdGVwQ2hhbmdpbmcubmV4dChuZXcgU3RlcENoYW5naW5nRXZlbnQodGhpcy5zdGVwLCB0aGlzLnN0ZXAgKyAxKSk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgY3VycmVudCBzdGVwIGlzIGludmFsaWRcbiAgICAgICAgaWYgKCF0aGlzLmdldEN1cnJlbnRTdGVwKCkudmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW52YWxpZEluZGljYXRvciA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnN0ZXBFcnJvci5uZXh0KHRoaXMuc3RlcCk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB3ZSBhcmUgY3VycmVudGx5IG9uIHRoZSBsYXN0IHN0ZXBcbiAgICAgICAgaWYgKCh0aGlzLnN0ZXAgKyAxKSA8IHRoaXMuc3RlcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnN0ZXArKztcblxuICAgICAgICAgICAgLy8gZW1pdCB0aGUgY3VycmVudCBzdGVwXG4gICAgICAgICAgICB0aGlzLm9uTmV4dC5uZXh0KHRoaXMuc3RlcCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOYXZpZ2F0ZSB0byB0aGUgcHJldmlvdXMgc3RlcFxuICAgICAqL1xuICAgIHByZXZpb3VzKCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuc3RlcENoYW5naW5nLm5leHQobmV3IFN0ZXBDaGFuZ2luZ0V2ZW50KHRoaXMuc3RlcCwgdGhpcy5zdGVwIC0gMSkpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHdlIGFyZSBjdXJyZW50bHkgb24gdGhlIGxhc3Qgc3RlcFxuICAgICAgICBpZiAodGhpcy5zdGVwID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zdGVwLS07XG5cbiAgICAgICAgICAgIC8vIGVtaXQgdGhlIGN1cnJlbnQgc3RlcFxuICAgICAgICAgICAgdGhpcy5vblByZXZpb3VzLm5leHQodGhpcy5zdGVwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYWN0aW9ucyB3aGVuIHRoZSBmaW5pc2ggYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgKi9cbiAgICBmaW5pc2goKTogUHJvbWlzZTx2b2lkPiB7XG5cbiAgICAgICAgLy8gZmlyZXMgd2hlbiB0aGUgZmluaXNoIGJ1dHRvbiBpcyBjbGlja2VkIGFsd2F5c1xuICAgICAgICB0aGlzLm9uRmluaXNoaW5nLm5leHQoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBpcyByZXF1aXJlZCBiZWNhdXNlIHdlIG5lZWQgdG8gZW5zdXJlIGNoYW5nZSBkZXRlY3Rpb24gaGFzIHJ1blxuICAgICAgICAgKiB0byBkZXRlcm1pbmUgd2hldGhlciBvciBub3Qgd2UgaGF2ZSB0aGUgbGF0ZXN0IHZhbHVlIGZvciB0aGUgJ3ZhbGlkJyBpbnB1dFxuICAgICAgICAgKiBvbiB0aGUgY3VycmVudCBzdGVwLiBVbmZvcnR1bmF0ZWx5IHdlIGNhbid0IHVzZSBDaGFuZ2VEZXRlY3RvclJlZiBhcyB3ZSBhcmUgbG9va2luZyB0byBydW5cbiAgICAgICAgICogb24gY29udGVudCBjaGlsZHJlbiwgYW5kIHdlIGNhbnQgdXNlIEFwcGxpY2F0aW9uUmVmLnRpY2soKSBhcyB0aGlzIGRvZXMgbm90IHdvcmsgaW4gYSBoeWJyaWQgYXBwLCBlZy4gb3VyIGRvY3NcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gb25seSBmaXJlcyB3aGVuIHRoZSBmaW5pc2ggYnV0dG9uIGlzIGNsaWNrZWQgYW5kIHRoZSBzdGVwIGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q3VycmVudFN0ZXAoKS52YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRmluaXNoLm5leHQoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0ZXBFcnJvci5uZXh0KHRoaXMuc3RlcCk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYWN0aW9ucyB3aGVuIHRoZSBjYW5jZWwgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgKi9cbiAgICBjYW5jZWwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DYW5jZWwubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgYWN0aXZlIHN0YXRlIG9mIGVhY2ggc3RlcFxuICAgICAqL1xuICAgIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgLy8gdXBkYXRlIHdoaWNoIHN0ZXBzIHNob3VsZCBiZSBhY3RpdmVcbiAgICAgICAgdGhpcy5zdGVwcy5mb3JFYWNoKChzdGVwLCBpZHgpID0+IHN0ZXAuYWN0aXZlID0gaWR4ID09PSB0aGlzLnN0ZXApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEp1bXAgdG8gYSBzcGVjaWZpYyBzdGVwIG9ubHkgaWYgdGhlIHN0ZXAgaGFzIHByZXZpb3VzbHkgYmVlbiB2aXNpdGVkXG4gICAgICovXG4gICAgZ290b1N0ZXAoc3RlcDogV2l6YXJkU3RlcENvbXBvbmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoc3RlcC52aXNpdGVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0ZXBJbmRleCA9IHRoaXMuc3RlcHMudG9BcnJheSgpLmZpbmRJbmRleChzdHAgPT4gc3RwID09PSBzdGVwKTtcblxuICAgICAgICAgICAgdGhpcy5zdGVwQ2hhbmdpbmcubmV4dChuZXcgU3RlcENoYW5naW5nRXZlbnQodGhpcy5zdGVwLCBzdGVwSW5kZXgpKTtcblxuICAgICAgICAgICAgdGhpcy5zdGVwID0gc3RlcEluZGV4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIGlmIHRoZSBjdXJyZW50IHN0ZXAgaXMgdGhlIGxhc3Qgc3RlcFxuICAgICAqL1xuICAgIGlzTGFzdFN0ZXAoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0ZXAgPT09ICh0aGlzLnN0ZXBzLmxlbmd0aCAtIDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRoZSB3aXphcmQgLSBnb2VzIHRvIGZpcnN0IHN0ZXAgYW5kIHJlc2V0cyB2aXNpdGVkIHN0YXRlXG4gICAgICovXG4gICAgcmVzZXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gbWFyayBhbGwgc3RlcHMgYXMgbm90IHZpc2l0ZWRcbiAgICAgICAgdGhpcy5zdGVwcy5mb3JFYWNoKHN0ZXAgPT4gc3RlcC52aXNpdGVkID0gZmFsc2UpO1xuXG4gICAgICAgIC8vIGdvIHRvIHRoZSBmaXJzdCBzdGVwXG4gICAgICAgIHRoaXMuc3RlcCA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzdGVwIGF0IHRoZSBjdXJyZW50IGluZGV4XG4gICAgICovXG4gICAgZ2V0Q3VycmVudFN0ZXAoKTogV2l6YXJkU3RlcENvbXBvbmVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN0ZXBBdEluZGV4KHRoaXMuc3RlcCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgc3RlcCBhdCBhIHNwZWNpZmljIGluZGV4XG4gICAgICovXG4gICAgZ2V0U3RlcEF0SW5kZXgoaW5kZXg6IG51bWJlcik6IFdpemFyZFN0ZXBDb21wb25lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGVwcy50b0FycmF5KClbaW5kZXhdO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFN0ZXBDaGFuZ2luZ0V2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZnJvbTogbnVtYmVyLCBwdWJsaWMgdG86IG51bWJlcikgeyB9XG59Il19