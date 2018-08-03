/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { WizardStepComponent } from './wizard-step.component';
var WizardComponent = /** @class */ (function () {
    function WizardComponent() {
        this._step = 0;
        this.steps = new QueryList();
        this.orientation = 'horizontal';
        this.nextText = 'Next';
        this.previousText = 'Previous';
        this.cancelText = 'Cancel';
        this.finishText = 'Finish';
        this.nextTooltip = 'Go to the next step';
        this.previousTooltip = 'Go to the previous step';
        this.cancelTooltip = 'Cancel the wizard';
        this.finishTooltip = 'Finish the wizard';
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
        this.invalidIndicator = false;
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
        // initially set the correct visibility of the steps
        setTimeout(this.update.bind(this));
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
                    template: "<div class=\"wizard-body\">\n\n    <div class=\"wizard-steps\">\n\n        <div class=\"wizard-step\" [class.active]=\"stp.active\" [class.visited]=\"stp.visited\" [class.invalid]=\"stp.active && !stp.valid && invalidIndicator\" (click)=\"gotoStep(stp)\" *ngFor=\"let stp of steps\">\n            {{ stp.header }}\n        </div>\n\n    </div>\n\n    <div class=\"wizard-content\">\n        <ng-content></ng-content>\n    </div>\n\n</div>\n\n<div class=\"wizard-footer\">\n    <button #tip=\"ux-tooltip\" class=\"btn button-secondary\" *ngIf=\"previousVisible\" [uxTooltip]=\"previousTooltip\" [disabled]=\"previousDisabled || step === 0\"\n        (click)=\"previous(); tip.hide()\">{{ previousText }}</button>\n\n    <button #tip=\"ux-tooltip\" class=\"btn button-primary\" *ngIf=\"nextVisible && !isLastStep()\" [uxTooltip]=\"nextTooltip\" [disabled]=\"nextDisabled\"\n        (click)=\"next(); tip.hide()\">{{ nextText }}</button>\n\n    <button #tip=\"ux-tooltip\" class=\"btn button-primary\" *ngIf=\"finishVisible && isLastStep() || finishAlwaysVisible\" [uxTooltip]=\"finishTooltip\"\n        [disabled]=\"finishDisabled\" (click)=\"finish(); tip.hide()\">{{ finishText }}</button>\n\n    <button #tip=\"ux-tooltip\" class=\"btn button-secondary\" *ngIf=\"cancelVisible && !isLastStep() || cancelAlwaysVisible\" [uxTooltip]=\"cancelTooltip\"\n        [disabled]=\"cancelDisabled\" (click)=\"cancel(); tip.hide()\">{{ cancelText }}</button>\n</div>",
                    host: {
                        '[class]': 'orientation'
                    }
                }] }
    ];
    WizardComponent.propDecorators = {
        steps: [{ type: ContentChildren, args: [WizardStepComponent,] }],
        orientation: [{ type: Input }],
        nextText: [{ type: Input }],
        previousText: [{ type: Input }],
        cancelText: [{ type: Input }],
        finishText: [{ type: Input }],
        nextTooltip: [{ type: Input }],
        previousTooltip: [{ type: Input }],
        cancelTooltip: [{ type: Input }],
        finishTooltip: [{ type: Input }],
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
        step: [{ type: Input }]
    };
    return WizardComponent;
}());
export { WizardComponent };
function WizardComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    WizardComponent.prototype._step;
    /** @type {?} */
    WizardComponent.prototype.steps;
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
    WizardComponent.prototype.invalidIndicator;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3dpemFyZC93aXphcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7cUJBV2xDLENBQUM7cUJBRXFCLElBQUksU0FBUyxFQUF1QjsyQkFFaEMsWUFBWTt3QkFFbEMsTUFBTTs0QkFDRixVQUFVOzBCQUNaLFFBQVE7MEJBQ1IsUUFBUTsyQkFFUCxxQkFBcUI7K0JBQ2pCLHlCQUF5Qjs2QkFDM0IsbUJBQW1COzZCQUNuQixtQkFBbUI7NEJBRW5CLEtBQUs7Z0NBQ0QsS0FBSzs4QkFDUCxLQUFLOzhCQUNMLEtBQUs7MkJBRVIsSUFBSTsrQkFDQSxJQUFJOzZCQUNOLElBQUk7NkJBQ0osSUFBSTttQ0FDRSxLQUFLO21DQUNMLEtBQUs7c0JBRTFCLElBQUksWUFBWSxFQUFVOzBCQUN0QixJQUFJLFlBQVksRUFBVTt3QkFDNUIsSUFBSSxZQUFZLEVBQVE7MkJBQ3JCLElBQUksWUFBWSxFQUFRO3dCQUMzQixJQUFJLFlBQVksRUFBUTs0QkFDcEIsSUFBSSxZQUFZLEVBQXFCOzBCQUN2QyxJQUFJLFlBQVksRUFBVTtnQ0FFckIsS0FBSzs7SUFFakMsc0JBQ0ksaUNBQUk7Ozs7UUFEUjtZQUVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO1NBQ3JCOzs7OztRQUNELFVBQVMsS0FBYTs7WUFHbEIsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQzs7Z0JBRzVCLElBQUksQ0FBQyxLQUFLLEdBQUcs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S0FBSzs4QkFFTCxLQUFLO2tDQUNMLEtBQUs7Z0NBQ0wsS0FBSztnQ0FDTCxLQUFLOytCQUVMLEtBQUs7bUNBQ0wsS0FBSztpQ0FDTCxLQUFLO2lDQUNMLEtBQUs7OEJBRUwsS0FBSztrQ0FDTCxLQUFLO2dDQUNMLEtBQUs7Z0NBQ0wsS0FBSztzQ0FDTCxLQUFLO3NDQUNMLEtBQUs7eUJBRUwsTUFBTTs2QkFDTixNQUFNOzJCQUNOLE1BQU07OEJBQ04sTUFBTTsyQkFDTixNQUFNOytCQUNOLE1BQU07NkJBQ04sTUFBTTt1QkFJTixLQUFLOzswQkFsRFY7O1NBVWEsZUFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFNNUIsSUFBQTtJQUNJLDJCQUFtQixJQUFZLEVBQVMsRUFBVTtRQUEvQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBUTtLQUFLOzRCQWhOM0Q7SUFpTkMsQ0FBQTtBQUZELDZCQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXaXphcmRTdGVwQ29tcG9uZW50IH0gZnJvbSAnLi93aXphcmQtc3RlcC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXdpemFyZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3dpemFyZC5jb21wb25lbnQuaHRtbCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzXSc6ICdvcmllbnRhdGlvbidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFdpemFyZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuXG4gICAgcHJpdmF0ZSBfc3RlcDogbnVtYmVyID0gMDtcblxuICAgIEBDb250ZW50Q2hpbGRyZW4oV2l6YXJkU3RlcENvbXBvbmVudCkgc3RlcHMgPSBuZXcgUXVlcnlMaXN0PFdpemFyZFN0ZXBDb21wb25lbnQ+KCk7XG5cbiAgICBASW5wdXQoKSBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcblxuICAgIEBJbnB1dCgpIG5leHRUZXh0OiBzdHJpbmcgPSAnTmV4dCc7XG4gICAgQElucHV0KCkgcHJldmlvdXNUZXh0OiBzdHJpbmcgPSAnUHJldmlvdXMnO1xuICAgIEBJbnB1dCgpIGNhbmNlbFRleHQ6IHN0cmluZyA9ICdDYW5jZWwnO1xuICAgIEBJbnB1dCgpIGZpbmlzaFRleHQ6IHN0cmluZyA9ICdGaW5pc2gnO1xuXG4gICAgQElucHV0KCkgbmV4dFRvb2x0aXA6IHN0cmluZyA9ICdHbyB0byB0aGUgbmV4dCBzdGVwJztcbiAgICBASW5wdXQoKSBwcmV2aW91c1Rvb2x0aXA6IHN0cmluZyA9ICdHbyB0byB0aGUgcHJldmlvdXMgc3RlcCc7XG4gICAgQElucHV0KCkgY2FuY2VsVG9vbHRpcDogc3RyaW5nID0gJ0NhbmNlbCB0aGUgd2l6YXJkJztcbiAgICBASW5wdXQoKSBmaW5pc2hUb29sdGlwOiBzdHJpbmcgPSAnRmluaXNoIHRoZSB3aXphcmQnO1xuXG4gICAgQElucHV0KCkgbmV4dERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgcHJldmlvdXNEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGNhbmNlbERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgZmluaXNoRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpIG5leHRWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBwcmV2aW91c1Zpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGNhbmNlbFZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGZpbmlzaFZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGNhbmNlbEFsd2F5c1Zpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBmaW5pc2hBbHdheXNWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBAT3V0cHV0KCkgb25OZXh0ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gICAgQE91dHB1dCgpIG9uUHJldmlvdXMgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgICBAT3V0cHV0KCkgb25DYW5jZWwgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpIG9uRmluaXNoaW5nID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIEBPdXRwdXQoKSBvbkZpbmlzaCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgc3RlcENoYW5naW5nID0gbmV3IEV2ZW50RW1pdHRlcjxTdGVwQ2hhbmdpbmdFdmVudD4oKTtcbiAgICBAT3V0cHV0KCkgc3RlcENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgaW52YWxpZEluZGljYXRvcjogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KClcbiAgICBnZXQgc3RlcCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0ZXA7XG4gICAgfVxuICAgIHNldCBzdGVwKHZhbHVlOiBudW1iZXIpIHtcblxuICAgICAgICAvLyBvbmx5IGFjY2VwdCBudW1iZXJzIGFzIHZhbGlkIG9wdGlvbnNcbiAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcblxuICAgICAgICAgICAgLy8gc3RvcmUgdGhlIGFjdGl2ZSBzdGVwXG4gICAgICAgICAgICB0aGlzLl9zdGVwID0gdmFsdWU7XG5cbiAgICAgICAgICAgIC8vIHVwZGF0ZSB3aGljaCBzdGVwcyBzaG91bGQgYmUgYWN0aXZlXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZSgpO1xuXG4gICAgICAgICAgICAvLyBlbWl0IHRoZSBjaGFuZ2UgZXZlbnRcbiAgICAgICAgICAgIHRoaXMuc3RlcENoYW5nZS5uZXh0KHRoaXMuc3RlcCk7XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IHRoZSBpbnZhbGlkIHN0YXRlXG4gICAgICAgICAgICB0aGlzLmludmFsaWRJbmRpY2F0b3IgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBpbml0aWFsbHkgc2V0IHRoZSBjb3JyZWN0IHZpc2liaWxpdHkgb2YgdGhlIHN0ZXBzXG4gICAgICAgIHNldFRpbWVvdXQodGhpcy51cGRhdGUuYmluZCh0aGlzKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTmF2aWdhdGUgdG8gdGhlIG5leHQgc3RlcFxuICAgICAqL1xuICAgIG5leHQoKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5zdGVwQ2hhbmdpbmcubmV4dChuZXcgU3RlcENoYW5naW5nRXZlbnQodGhpcy5zdGVwLCB0aGlzLnN0ZXAgKyAxKSk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgY3VycmVudCBzdGVwIGlzIGludmFsaWRcbiAgICAgICAgaWYgKCF0aGlzLmdldEN1cnJlbnRTdGVwKCkudmFsaWQpIHtcbiAgICAgICAgICAgIHRoaXMuaW52YWxpZEluZGljYXRvciA9IHRydWU7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBjaGVjayBpZiB3ZSBhcmUgY3VycmVudGx5IG9uIHRoZSBsYXN0IHN0ZXBcbiAgICAgICAgaWYgKCh0aGlzLnN0ZXAgKyAxKSA8IHRoaXMuc3RlcHMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLnN0ZXArKztcblxuICAgICAgICAgICAgLy8gZW1pdCB0aGUgY3VycmVudCBzdGVwXG4gICAgICAgICAgICB0aGlzLm9uTmV4dC5uZXh0KHRoaXMuc3RlcCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOYXZpZ2F0ZSB0byB0aGUgcHJldmlvdXMgc3RlcFxuICAgICAqL1xuICAgIHByZXZpb3VzKCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuc3RlcENoYW5naW5nLm5leHQobmV3IFN0ZXBDaGFuZ2luZ0V2ZW50KHRoaXMuc3RlcCwgdGhpcy5zdGVwIC0gMSkpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIHdlIGFyZSBjdXJyZW50bHkgb24gdGhlIGxhc3Qgc3RlcFxuICAgICAgICBpZiAodGhpcy5zdGVwID4gMCkge1xuICAgICAgICAgICAgdGhpcy5zdGVwLS07XG5cbiAgICAgICAgICAgIC8vIGVtaXQgdGhlIGN1cnJlbnQgc3RlcFxuICAgICAgICAgICAgdGhpcy5vblByZXZpb3VzLm5leHQodGhpcy5zdGVwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYWN0aW9ucyB3aGVuIHRoZSBmaW5pc2ggYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgKi9cbiAgICBmaW5pc2goKTogUHJvbWlzZTx2b2lkPiB7XG5cbiAgICAgICAgLy8gZmlyZXMgd2hlbiB0aGUgZmluaXNoIGJ1dHRvbiBpcyBjbGlja2VkIGFsd2F5c1xuICAgICAgICB0aGlzLm9uRmluaXNoaW5nLm5leHQoKTtcblxuICAgICAgICAvKipcbiAgICAgICAgICogVGhpcyBpcyByZXF1aXJlZCBiZWNhdXNlIHdlIG5lZWQgdG8gZW5zdXJlIGNoYW5nZSBkZXRlY3Rpb24gaGFzIHJ1blxuICAgICAgICAgKiB0byBkZXRlcm1pbmUgd2hldGhlciBvciBub3Qgd2UgaGF2ZSB0aGUgbGF0ZXN0IHZhbHVlIGZvciB0aGUgJ3ZhbGlkJyBpbnB1dFxuICAgICAgICAgKiBvbiB0aGUgY3VycmVudCBzdGVwLiBVbmZvcnR1bmF0ZWx5IHdlIGNhbid0IHVzZSBDaGFuZ2VEZXRlY3RvclJlZiBhcyB3ZSBhcmUgbG9va2luZyB0byBydW5cbiAgICAgICAgICogb24gY29udGVudCBjaGlsZHJlbiwgYW5kIHdlIGNhbnQgdXNlIEFwcGxpY2F0aW9uUmVmLnRpY2soKSBhcyB0aGlzIGRvZXMgbm90IHdvcmsgaW4gYSBoeWJyaWQgYXBwLCBlZy4gb3VyIGRvY3NcbiAgICAgICAgICovXG4gICAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuXG4gICAgICAgICAgICAgICAgLy8gb25seSBmaXJlcyB3aGVuIHRoZSBmaW5pc2ggYnV0dG9uIGlzIGNsaWNrZWQgYW5kIHRoZSBzdGVwIGlzIHZhbGlkXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q3VycmVudFN0ZXAoKS52YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm9uRmluaXNoLm5leHQoKTsgICAgICAgIFxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFjdGlvbnMgd2hlbiB0aGUgY2FuY2VsIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgICovXG4gICAgY2FuY2VsKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9uQ2FuY2VsLm5leHQoKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBVcGRhdGUgdGhlIGFjdGl2ZSBzdGF0ZSBvZiBlYWNoIHN0ZXBcbiAgICAgKi9cbiAgICB1cGRhdGUoKTogdm9pZCB7XG4gICAgICAgIC8vIHVwZGF0ZSB3aGljaCBzdGVwcyBzaG91bGQgYmUgYWN0aXZlXG4gICAgICAgIHRoaXMuc3RlcHMuZm9yRWFjaCgoc3RlcCwgaWR4KSA9PiBzdGVwLmFjdGl2ZSA9IGlkeCA9PT0gdGhpcy5zdGVwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBKdW1wIHRvIGEgc3BlY2lmaWMgc3RlcCBvbmx5IGlmIHRoZSBzdGVwIGhhcyBwcmV2aW91c2x5IGJlZW4gdmlzaXRlZFxuICAgICAqL1xuICAgIGdvdG9TdGVwKHN0ZXA6IFdpemFyZFN0ZXBDb21wb25lbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKHN0ZXAudmlzaXRlZCkge1xuXG4gICAgICAgICAgICBjb25zdCBzdGVwSW5kZXggPSB0aGlzLnN0ZXBzLnRvQXJyYXkoKS5maW5kSW5kZXgoc3RwID0+IHN0cCA9PT0gc3RlcCk7XG5cbiAgICAgICAgICAgIHRoaXMuc3RlcENoYW5naW5nLm5leHQobmV3IFN0ZXBDaGFuZ2luZ0V2ZW50KHRoaXMuc3RlcCwgc3RlcEluZGV4KSk7XG5cbiAgICAgICAgICAgIHRoaXMuc3RlcCA9IHN0ZXBJbmRleDtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERldGVybWluZSBpZiB0aGUgY3VycmVudCBzdGVwIGlzIHRoZSBsYXN0IHN0ZXBcbiAgICAgKi9cbiAgICBpc0xhc3RTdGVwKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGVwID09PSAodGhpcy5zdGVwcy5sZW5ndGggLSAxKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXNldCB0aGUgd2l6YXJkIC0gZ29lcyB0byBmaXJzdCBzdGVwIGFuZCByZXNldHMgdmlzaXRlZCBzdGF0ZVxuICAgICAqL1xuICAgIHJlc2V0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIG1hcmsgYWxsIHN0ZXBzIGFzIG5vdCB2aXNpdGVkXG4gICAgICAgIHRoaXMuc3RlcHMuZm9yRWFjaChzdGVwID0+IHN0ZXAudmlzaXRlZCA9IGZhbHNlKTtcblxuICAgICAgICAvLyBnbyB0byB0aGUgZmlyc3Qgc3RlcFxuICAgICAgICB0aGlzLnN0ZXAgPSAwO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEdldCB0aGUgc3RlcCBhdCB0aGUgY3VycmVudCBpbmRleFxuICAgICAqL1xuICAgIGdldEN1cnJlbnRTdGVwKCk6IFdpemFyZFN0ZXBDb21wb25lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5nZXRTdGVwQXRJbmRleCh0aGlzLnN0ZXApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJldHVybiBhIHN0ZXAgYXQgYSBzcGVjaWZpYyBpbmRleFxuICAgICAqL1xuICAgIGdldFN0ZXBBdEluZGV4KGluZGV4OiBudW1iZXIpOiBXaXphcmRTdGVwQ29tcG9uZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RlcHMudG9BcnJheSgpW2luZGV4XTtcbiAgICB9XG59XG5cbmV4cG9ydCBjbGFzcyBTdGVwQ2hhbmdpbmdFdmVudCB7XG4gICAgY29uc3RydWN0b3IocHVibGljIGZyb206IG51bWJlciwgcHVibGljIHRvOiBudW1iZXIpIHsgfVxufSJdfQ==