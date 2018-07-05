/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { WizardStepComponent } from './wizard-step.component';
var WizardComponent = (function () {
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
                },] },
    ];
    /** @nocollapse */
    WizardComponent.ctorParameters = function () { return []; };
    WizardComponent.propDecorators = {
        "steps": [{ type: ContentChildren, args: [WizardStepComponent,] },],
        "orientation": [{ type: Input },],
        "nextText": [{ type: Input },],
        "previousText": [{ type: Input },],
        "cancelText": [{ type: Input },],
        "finishText": [{ type: Input },],
        "nextTooltip": [{ type: Input },],
        "previousTooltip": [{ type: Input },],
        "cancelTooltip": [{ type: Input },],
        "finishTooltip": [{ type: Input },],
        "nextDisabled": [{ type: Input },],
        "previousDisabled": [{ type: Input },],
        "cancelDisabled": [{ type: Input },],
        "finishDisabled": [{ type: Input },],
        "nextVisible": [{ type: Input },],
        "previousVisible": [{ type: Input },],
        "cancelVisible": [{ type: Input },],
        "finishVisible": [{ type: Input },],
        "cancelAlwaysVisible": [{ type: Input },],
        "finishAlwaysVisible": [{ type: Input },],
        "onNext": [{ type: Output },],
        "onPrevious": [{ type: Output },],
        "onCancel": [{ type: Output },],
        "onFinishing": [{ type: Output },],
        "onFinish": [{ type: Output },],
        "stepChanging": [{ type: Output },],
        "stepChange": [{ type: Output },],
        "step": [{ type: Input },],
    };
    return WizardComponent;
}());
export { WizardComponent };
function WizardComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    WizardComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    WizardComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    WizardComponent.propDecorators;
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
var StepChangingEvent = (function () {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3dpemFyZC93aXphcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDOzs7cUJBdUNsQyxDQUFDO3FCQUVxQixJQUFJLFNBQVMsRUFBdUI7MkJBRWhDLFlBQVk7d0JBRWxDLE1BQU07NEJBQ0YsVUFBVTswQkFDWixRQUFROzBCQUNSLFFBQVE7MkJBRVAscUJBQXFCOytCQUNqQix5QkFBeUI7NkJBQzNCLG1CQUFtQjs2QkFDbkIsbUJBQW1COzRCQUVuQixLQUFLO2dDQUNELEtBQUs7OEJBQ1AsS0FBSzs4QkFDTCxLQUFLOzJCQUVSLElBQUk7K0JBQ0EsSUFBSTs2QkFDTixJQUFJOzZCQUNKLElBQUk7bUNBQ0UsS0FBSzttQ0FDTCxLQUFLO3NCQUUxQixJQUFJLFlBQVksRUFBVTswQkFDdEIsSUFBSSxZQUFZLEVBQVU7d0JBQzVCLElBQUksWUFBWSxFQUFROzJCQUNyQixJQUFJLFlBQVksRUFBUTt3QkFDM0IsSUFBSSxZQUFZLEVBQVE7NEJBQ3BCLElBQUksWUFBWSxFQUFxQjswQkFDdkMsSUFBSSxZQUFZLEVBQVU7Z0NBRXJCLEtBQUs7OzBCQUc3QixpQ0FBSTs7Ozs7WUFDSixNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzs7Ozs7O1FBRXRCLFVBQVMsS0FBYTs7WUFHbEIsRUFBRSxDQUFDLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQzs7Z0JBRzVCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDOztn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QUVMLEtBQUs7b0NBQ0wsS0FBSztrQ0FDTCxLQUFLO2tDQUNMLEtBQUs7aUNBRUwsS0FBSztxQ0FDTCxLQUFLO21DQUNMLEtBQUs7bUNBQ0wsS0FBSztnQ0FFTCxLQUFLO29DQUNMLEtBQUs7a0NBQ0wsS0FBSztrQ0FDTCxLQUFLO3dDQUNMLEtBQUs7d0NBQ0wsS0FBSzsyQkFFTCxNQUFNOytCQUNOLE1BQU07NkJBQ04sTUFBTTtnQ0FDTixNQUFNOzZCQUNOLE1BQU07aUNBQ04sTUFBTTsrQkFDTixNQUFNO3lCQUlOLEtBQUs7OzBCQTlFVjs7U0FzQ2EsZUFBZTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXFNNUIsSUFBQTtJQUNJLDJCQUFtQixJQUFZLEVBQVMsRUFBVTtRQUEvQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBUTtLQUFLOzRCQTVPM0Q7SUE2T0MsQ0FBQTtBQUZELDZCQUVDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEV2ZW50RW1pdHRlciwgSW5wdXQsIE91dHB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBXaXphcmRTdGVwQ29tcG9uZW50IH0gZnJvbSAnLi93aXphcmQtc3RlcC5jb21wb25lbnQnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXdpemFyZCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwid2l6YXJkLWJvZHlcIj5cblxuICAgIDxkaXYgY2xhc3M9XCJ3aXphcmQtc3RlcHNcIj5cblxuICAgICAgICA8ZGl2IGNsYXNzPVwid2l6YXJkLXN0ZXBcIiBbY2xhc3MuYWN0aXZlXT1cInN0cC5hY3RpdmVcIiBbY2xhc3MudmlzaXRlZF09XCJzdHAudmlzaXRlZFwiIFtjbGFzcy5pbnZhbGlkXT1cInN0cC5hY3RpdmUgJiYgIXN0cC52YWxpZCAmJiBpbnZhbGlkSW5kaWNhdG9yXCIgKGNsaWNrKT1cImdvdG9TdGVwKHN0cClcIiAqbmdGb3I9XCJsZXQgc3RwIG9mIHN0ZXBzXCI+XG4gICAgICAgICAgICB7eyBzdHAuaGVhZGVyIH19XG4gICAgICAgIDwvZGl2PlxuXG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IGNsYXNzPVwid2l6YXJkLWNvbnRlbnRcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICAgIDwvZGl2PlxuXG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cIndpemFyZC1mb290ZXJcIj5cbiAgICA8YnV0dG9uICN0aXA9XCJ1eC10b29sdGlwXCIgY2xhc3M9XCJidG4gYnV0dG9uLXNlY29uZGFyeVwiICpuZ0lmPVwicHJldmlvdXNWaXNpYmxlXCIgW3V4VG9vbHRpcF09XCJwcmV2aW91c1Rvb2x0aXBcIiBbZGlzYWJsZWRdPVwicHJldmlvdXNEaXNhYmxlZCB8fCBzdGVwID09PSAwXCJcbiAgICAgICAgKGNsaWNrKT1cInByZXZpb3VzKCk7IHRpcC5oaWRlKClcIj57eyBwcmV2aW91c1RleHQgfX08L2J1dHRvbj5cblxuICAgIDxidXR0b24gI3RpcD1cInV4LXRvb2x0aXBcIiBjbGFzcz1cImJ0biBidXR0b24tcHJpbWFyeVwiICpuZ0lmPVwibmV4dFZpc2libGUgJiYgIWlzTGFzdFN0ZXAoKVwiIFt1eFRvb2x0aXBdPVwibmV4dFRvb2x0aXBcIiBbZGlzYWJsZWRdPVwibmV4dERpc2FibGVkXCJcbiAgICAgICAgKGNsaWNrKT1cIm5leHQoKTsgdGlwLmhpZGUoKVwiPnt7IG5leHRUZXh0IH19PC9idXR0b24+XG5cbiAgICA8YnV0dG9uICN0aXA9XCJ1eC10b29sdGlwXCIgY2xhc3M9XCJidG4gYnV0dG9uLXByaW1hcnlcIiAqbmdJZj1cImZpbmlzaFZpc2libGUgJiYgaXNMYXN0U3RlcCgpIHx8IGZpbmlzaEFsd2F5c1Zpc2libGVcIiBbdXhUb29sdGlwXT1cImZpbmlzaFRvb2x0aXBcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiZmluaXNoRGlzYWJsZWRcIiAoY2xpY2spPVwiZmluaXNoKCk7IHRpcC5oaWRlKClcIj57eyBmaW5pc2hUZXh0IH19PC9idXR0b24+XG5cbiAgICA8YnV0dG9uICN0aXA9XCJ1eC10b29sdGlwXCIgY2xhc3M9XCJidG4gYnV0dG9uLXNlY29uZGFyeVwiICpuZ0lmPVwiY2FuY2VsVmlzaWJsZSAmJiAhaXNMYXN0U3RlcCgpIHx8IGNhbmNlbEFsd2F5c1Zpc2libGVcIiBbdXhUb29sdGlwXT1cImNhbmNlbFRvb2x0aXBcIlxuICAgICAgICBbZGlzYWJsZWRdPVwiY2FuY2VsRGlzYWJsZWRcIiAoY2xpY2spPVwiY2FuY2VsKCk7IHRpcC5oaWRlKClcIj57eyBjYW5jZWxUZXh0IH19PC9idXR0b24+XG48L2Rpdj5gLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ1tjbGFzc10nOiAnb3JpZW50YXRpb24nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBXaXphcmRDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICAgIHByaXZhdGUgX3N0ZXA6IG51bWJlciA9IDA7XG5cbiAgICBAQ29udGVudENoaWxkcmVuKFdpemFyZFN0ZXBDb21wb25lbnQpIHN0ZXBzID0gbmV3IFF1ZXJ5TGlzdDxXaXphcmRTdGVwQ29tcG9uZW50PigpO1xuXG4gICAgQElucHV0KCkgb3JpZW50YXRpb246ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCcgPSAnaG9yaXpvbnRhbCc7XG5cbiAgICBASW5wdXQoKSBuZXh0VGV4dDogc3RyaW5nID0gJ05leHQnO1xuICAgIEBJbnB1dCgpIHByZXZpb3VzVGV4dDogc3RyaW5nID0gJ1ByZXZpb3VzJztcbiAgICBASW5wdXQoKSBjYW5jZWxUZXh0OiBzdHJpbmcgPSAnQ2FuY2VsJztcbiAgICBASW5wdXQoKSBmaW5pc2hUZXh0OiBzdHJpbmcgPSAnRmluaXNoJztcblxuICAgIEBJbnB1dCgpIG5leHRUb29sdGlwOiBzdHJpbmcgPSAnR28gdG8gdGhlIG5leHQgc3RlcCc7XG4gICAgQElucHV0KCkgcHJldmlvdXNUb29sdGlwOiBzdHJpbmcgPSAnR28gdG8gdGhlIHByZXZpb3VzIHN0ZXAnO1xuICAgIEBJbnB1dCgpIGNhbmNlbFRvb2x0aXA6IHN0cmluZyA9ICdDYW5jZWwgdGhlIHdpemFyZCc7XG4gICAgQElucHV0KCkgZmluaXNoVG9vbHRpcDogc3RyaW5nID0gJ0ZpbmlzaCB0aGUgd2l6YXJkJztcblxuICAgIEBJbnB1dCgpIG5leHREaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIHByZXZpb3VzRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBjYW5jZWxEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGZpbmlzaERpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKSBuZXh0VmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgcHJldmlvdXNWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBjYW5jZWxWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBmaW5pc2hWaXNpYmxlOiBib29sZWFuID0gdHJ1ZTtcbiAgICBASW5wdXQoKSBjYW5jZWxBbHdheXNWaXNpYmxlOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgZmluaXNoQWx3YXlzVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIG9uTmV4dCA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICAgIEBPdXRwdXQoKSBvblByZXZpb3VzID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gICAgQE91dHB1dCgpIG9uQ2FuY2VsID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIEBPdXRwdXQoKSBvbkZpbmlzaGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgb25GaW5pc2ggPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpIHN0ZXBDaGFuZ2luZyA9IG5ldyBFdmVudEVtaXR0ZXI8U3RlcENoYW5naW5nRXZlbnQ+KCk7XG4gICAgQE91dHB1dCgpIHN0ZXBDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICAgIGludmFsaWRJbmRpY2F0b3I6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHN0ZXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICAgIH1cbiAgICBzZXQgc3RlcCh2YWx1ZTogbnVtYmVyKSB7XG5cbiAgICAgICAgLy8gb25seSBhY2NlcHQgbnVtYmVycyBhcyB2YWxpZCBvcHRpb25zXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG5cbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBhY3RpdmUgc3RlcFxuICAgICAgICAgICAgdGhpcy5fc3RlcCA9IHZhbHVlO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgd2hpY2ggc3RlcHMgc2hvdWxkIGJlIGFjdGl2ZVxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcblxuICAgICAgICAgICAgLy8gZW1pdCB0aGUgY2hhbmdlIGV2ZW50XG4gICAgICAgICAgICB0aGlzLnN0ZXBDaGFuZ2UubmV4dCh0aGlzLnN0ZXApO1xuXG4gICAgICAgICAgICAvLyByZXNldCB0aGUgaW52YWxpZCBzdGF0ZVxuICAgICAgICAgICAgdGhpcy5pbnZhbGlkSW5kaWNhdG9yID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaW5pdGlhbGx5IHNldCB0aGUgY29ycmVjdCB2aXNpYmlsaXR5IG9mIHRoZSBzdGVwc1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5hdmlnYXRlIHRvIHRoZSBuZXh0IHN0ZXBcbiAgICAgKi9cbiAgICBuZXh0KCk6IHZvaWQge1xuXG4gICAgICAgIHRoaXMuc3RlcENoYW5naW5nLm5leHQobmV3IFN0ZXBDaGFuZ2luZ0V2ZW50KHRoaXMuc3RlcCwgdGhpcy5zdGVwICsgMSkpO1xuXG4gICAgICAgIC8vIGNoZWNrIGlmIGN1cnJlbnQgc3RlcCBpcyBpbnZhbGlkXG4gICAgICAgIGlmICghdGhpcy5nZXRDdXJyZW50U3RlcCgpLnZhbGlkKSB7XG4gICAgICAgICAgICB0aGlzLmludmFsaWRJbmRpY2F0b3IgPSB0cnVlO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgd2UgYXJlIGN1cnJlbnRseSBvbiB0aGUgbGFzdCBzdGVwXG4gICAgICAgIGlmICgodGhpcy5zdGVwICsgMSkgPCB0aGlzLnN0ZXBzLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5zdGVwKys7XG5cbiAgICAgICAgICAgIC8vIGVtaXQgdGhlIGN1cnJlbnQgc3RlcFxuICAgICAgICAgICAgdGhpcy5vbk5leHQubmV4dCh0aGlzLnN0ZXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogTmF2aWdhdGUgdG8gdGhlIHByZXZpb3VzIHN0ZXBcbiAgICAgKi9cbiAgICBwcmV2aW91cygpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLnN0ZXBDaGFuZ2luZy5uZXh0KG5ldyBTdGVwQ2hhbmdpbmdFdmVudCh0aGlzLnN0ZXAsIHRoaXMuc3RlcCAtIDEpKTtcblxuICAgICAgICAvLyBjaGVjayBpZiB3ZSBhcmUgY3VycmVudGx5IG9uIHRoZSBsYXN0IHN0ZXBcbiAgICAgICAgaWYgKHRoaXMuc3RlcCA+IDApIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcC0tO1xuXG4gICAgICAgICAgICAvLyBlbWl0IHRoZSBjdXJyZW50IHN0ZXBcbiAgICAgICAgICAgIHRoaXMub25QcmV2aW91cy5uZXh0KHRoaXMuc3RlcCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBQZXJmb3JtIGFjdGlvbnMgd2hlbiB0aGUgZmluaXNoIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgICovXG4gICAgZmluaXNoKCk6IFByb21pc2U8dm9pZD4ge1xuXG4gICAgICAgIC8vIGZpcmVzIHdoZW4gdGhlIGZpbmlzaCBidXR0b24gaXMgY2xpY2tlZCBhbHdheXNcbiAgICAgICAgdGhpcy5vbkZpbmlzaGluZy5uZXh0KCk7XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFRoaXMgaXMgcmVxdWlyZWQgYmVjYXVzZSB3ZSBuZWVkIHRvIGVuc3VyZSBjaGFuZ2UgZGV0ZWN0aW9uIGhhcyBydW5cbiAgICAgICAgICogdG8gZGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IHdlIGhhdmUgdGhlIGxhdGVzdCB2YWx1ZSBmb3IgdGhlICd2YWxpZCcgaW5wdXRcbiAgICAgICAgICogb24gdGhlIGN1cnJlbnQgc3RlcC4gVW5mb3J0dW5hdGVseSB3ZSBjYW4ndCB1c2UgQ2hhbmdlRGV0ZWN0b3JSZWYgYXMgd2UgYXJlIGxvb2tpbmcgdG8gcnVuXG4gICAgICAgICAqIG9uIGNvbnRlbnQgY2hpbGRyZW4sIGFuZCB3ZSBjYW50IHVzZSBBcHBsaWNhdGlvblJlZi50aWNrKCkgYXMgdGhpcyBkb2VzIG5vdCB3b3JrIGluIGEgaHlicmlkIGFwcCwgZWcuIG91ciBkb2NzXG4gICAgICAgICAqL1xuICAgICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4ocmVzb2x2ZSA9PiB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcblxuICAgICAgICAgICAgICAgIC8vIG9ubHkgZmlyZXMgd2hlbiB0aGUgZmluaXNoIGJ1dHRvbiBpcyBjbGlja2VkIGFuZCB0aGUgc3RlcCBpcyB2YWxpZFxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldEN1cnJlbnRTdGVwKCkudmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbkZpbmlzaC5uZXh0KCk7ICAgICAgICBcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhY3Rpb25zIHdoZW4gdGhlIGNhbmNlbCBidXR0b24gaXMgY2xpY2tlZFxuICAgICAqL1xuICAgIGNhbmNlbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNhbmNlbC5uZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBhY3RpdmUgc3RhdGUgb2YgZWFjaCBzdGVwXG4gICAgICovXG4gICAgdXBkYXRlKCk6IHZvaWQge1xuICAgICAgICAvLyB1cGRhdGUgd2hpY2ggc3RlcHMgc2hvdWxkIGJlIGFjdGl2ZVxuICAgICAgICB0aGlzLnN0ZXBzLmZvckVhY2goKHN0ZXAsIGlkeCkgPT4gc3RlcC5hY3RpdmUgPSBpZHggPT09IHRoaXMuc3RlcCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSnVtcCB0byBhIHNwZWNpZmljIHN0ZXAgb25seSBpZiB0aGUgc3RlcCBoYXMgcHJldmlvdXNseSBiZWVuIHZpc2l0ZWRcbiAgICAgKi9cbiAgICBnb3RvU3RlcChzdGVwOiBXaXphcmRTdGVwQ29tcG9uZW50KTogdm9pZCB7XG4gICAgICAgIGlmIChzdGVwLnZpc2l0ZWQpIHtcblxuICAgICAgICAgICAgY29uc3Qgc3RlcEluZGV4ID0gdGhpcy5zdGVwcy50b0FycmF5KCkuZmluZEluZGV4KHN0cCA9PiBzdHAgPT09IHN0ZXApO1xuXG4gICAgICAgICAgICB0aGlzLnN0ZXBDaGFuZ2luZy5uZXh0KG5ldyBTdGVwQ2hhbmdpbmdFdmVudCh0aGlzLnN0ZXAsIHN0ZXBJbmRleCkpO1xuXG4gICAgICAgICAgICB0aGlzLnN0ZXAgPSBzdGVwSW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgdGhlIGN1cnJlbnQgc3RlcCBpcyB0aGUgbGFzdCBzdGVwXG4gICAgICovXG4gICAgaXNMYXN0U3RlcCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RlcCA9PT0gKHRoaXMuc3RlcHMubGVuZ3RoIC0gMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXQgdGhlIHdpemFyZCAtIGdvZXMgdG8gZmlyc3Qgc3RlcCBhbmQgcmVzZXRzIHZpc2l0ZWQgc3RhdGVcbiAgICAgKi9cbiAgICByZXNldCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBtYXJrIGFsbCBzdGVwcyBhcyBub3QgdmlzaXRlZFxuICAgICAgICB0aGlzLnN0ZXBzLmZvckVhY2goc3RlcCA9PiBzdGVwLnZpc2l0ZWQgPSBmYWxzZSk7XG5cbiAgICAgICAgLy8gZ28gdG8gdGhlIGZpcnN0IHN0ZXBcbiAgICAgICAgdGhpcy5zdGVwID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHN0ZXAgYXQgdGhlIGN1cnJlbnQgaW5kZXhcbiAgICAgKi9cbiAgICBnZXRDdXJyZW50U3RlcCgpOiBXaXphcmRTdGVwQ29tcG9uZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RlcEF0SW5kZXgodGhpcy5zdGVwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBzdGVwIGF0IGEgc3BlY2lmaWMgaW5kZXhcbiAgICAgKi9cbiAgICBnZXRTdGVwQXRJbmRleChpbmRleDogbnVtYmVyKTogV2l6YXJkU3RlcENvbXBvbmVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0ZXBzLnRvQXJyYXkoKVtpbmRleF07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3RlcENoYW5naW5nRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBmcm9tOiBudW1iZXIsIHB1YmxpYyB0bzogbnVtYmVyKSB7IH1cbn0iXX0=