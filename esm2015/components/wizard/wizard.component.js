/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { WizardStepComponent } from './wizard-step.component';
let /** @type {?} */ uniqueId = 0;
export class WizardComponent {
    constructor() {
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
        this.id = `ux-wizard-${uniqueId++}`;
        this.invalidIndicator = false;
        this._step = 0;
        this._onDestroy = new Subject();
    }
    /**
     * @return {?}
     */
    get step() {
        return this._step;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set step(value) {
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
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        // initially set the correct visibility of the steps
        setTimeout(this.update.bind(this));
        // initially set the ids for each step
        this.setWizardStepIds();
        // if the steps change then update the ids
        this.steps.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => this.setWizardStepIds());
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Set ids for each of the wizard steps
     * @return {?}
     */
    setWizardStepIds() {
        this.steps.forEach((step, idx) => step.id = `${this.id}-step-${idx}`);
    }
    /**
     * Navigate to the next step
     * @return {?}
     */
    next() {
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
    }
    /**
     * Navigate to the previous step
     * @return {?}
     */
    previous() {
        this.stepChanging.next(new StepChangingEvent(this.step, this.step - 1));
        // check if we are currently on the last step
        if (this.step > 0) {
            this.step--;
            // emit the current step
            this.onPrevious.next(this.step);
        }
    }
    /**
     * Perform actions when the finish button is clicked
     * @return {?}
     */
    finish() {
        // fires when the finish button is clicked always
        this.onFinishing.next();
        /**
                 * This is required because we need to ensure change detection has run
                 * to determine whether or not we have the latest value for the 'valid' input
                 * on the current step. Unfortunately we can't use ChangeDetectorRef as we are looking to run
                 * on content children, and we cant use ApplicationRef.tick() as this does not work in a hybrid app, eg. our docs
                 */
        return new Promise(resolve => {
            setTimeout(() => {
                // only fires when the finish button is clicked and the step is valid
                if (this.getCurrentStep().valid) {
                    this.onFinish.next();
                }
                else {
                    this.stepError.next(this.step);
                }
                resolve();
            });
        });
    }
    /**
     * Perform actions when the cancel button is clicked
     * @return {?}
     */
    cancel() {
        this.onCancel.next();
    }
    /**
     * Update the active state of each step
     * @return {?}
     */
    update() {
        // update which steps should be active
        this.steps.forEach((step, idx) => step.active = idx === this.step);
    }
    /**
     * Jump to a specific step only if the step has previously been visited
     * @param {?} step
     * @return {?}
     */
    gotoStep(step) {
        if (step.visited) {
            const /** @type {?} */ stepIndex = this.steps.toArray().findIndex(stp => stp === step);
            this.stepChanging.next(new StepChangingEvent(this.step, stepIndex));
            this.step = stepIndex;
        }
    }
    /**
     * Determine if the current step is the last step
     * @return {?}
     */
    isLastStep() {
        return this.step === (this.steps.length - 1);
    }
    /**
     * Reset the wizard - goes to first step and resets visited state
     * @return {?}
     */
    reset() {
        // mark all steps as not visited
        this.steps.forEach(step => step.visited = false);
        // go to the first step
        this.step = 0;
    }
    /**
     * Get the step at the current index
     * @return {?}
     */
    getCurrentStep() {
        return this.getStepAtIndex(this.step);
    }
    /**
     * Return a step at a specific index
     * @param {?} index
     * @return {?}
     */
    getStepAtIndex(index) {
        return this.steps.toArray()[index];
    }
}
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
export class StepChangingEvent {
    /**
     * @param {?} from
     * @param {?} to
     */
    constructor(from, to) {
        this.from = from;
        this.to = to;
    }
}
function StepChangingEvent_tsickle_Closure_declarations() {
    /** @type {?} */
    StepChangingEvent.prototype.from;
    /** @type {?} */
    StepChangingEvent.prototype.to;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3dpemFyZC93aXphcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdILE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBQ3ZDLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBRTlELHFCQUFJLFFBQVEsR0FBVyxDQUFDLENBQUM7QUFTekIsTUFBTTs7MkJBRWdELFlBQVk7d0JBRWxDLE1BQU07NEJBQ0YsVUFBVTswQkFDWixRQUFROzBCQUNSLFFBQVE7MkJBRVAscUJBQXFCOytCQUNqQix5QkFBeUI7NkJBQzNCLG1CQUFtQjs2QkFDbkIsbUJBQW1COzZCQUVuQixxQkFBcUI7aUNBQ2pCLHlCQUF5QjsrQkFDM0IsbUJBQW1COytCQUNuQixtQkFBbUI7NEJBRXJCLEtBQUs7Z0NBQ0QsS0FBSzs4QkFDUCxLQUFLOzhCQUNMLEtBQUs7MkJBRVIsSUFBSTsrQkFDQSxJQUFJOzZCQUNOLElBQUk7NkJBQ0osSUFBSTttQ0FDRSxLQUFLO21DQUNMLEtBQUs7c0JBRTFCLElBQUksWUFBWSxFQUFVOzBCQUN0QixJQUFJLFlBQVksRUFBVTt3QkFDNUIsSUFBSSxZQUFZLEVBQVE7MkJBQ3JCLElBQUksWUFBWSxFQUFRO3dCQUMzQixJQUFJLFlBQVksRUFBUTs0QkFDcEIsSUFBSSxZQUFZLEVBQXFCOzBCQUN2QyxJQUFJLFlBQVksRUFBVTt5QkFDM0IsSUFBSSxZQUFZLEVBQVU7cUJBRUYsSUFBSSxTQUFT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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFtTFYsTUFBTTs7Ozs7SUFDRixZQUFtQixJQUFZLEVBQVMsRUFBVTtRQUEvQixTQUFJLEdBQUosSUFBSSxDQUFRO1FBQVMsT0FBRSxHQUFGLEVBQUUsQ0FBUTtLQUFLO0NBQzFEIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgV2l6YXJkU3RlcENvbXBvbmVudCB9IGZyb20gJy4vd2l6YXJkLXN0ZXAuY29tcG9uZW50JztcblxubGV0IHVuaXF1ZUlkOiBudW1iZXIgPSAwO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LXdpemFyZCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL3dpemFyZC5jb21wb25lbnQuaHRtbCcsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzXSc6ICdvcmllbnRhdGlvbidcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIFdpemFyZENvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBvcmllbnRhdGlvbjogJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJyA9ICdob3Jpem9udGFsJztcblxuICAgIEBJbnB1dCgpIG5leHRUZXh0OiBzdHJpbmcgPSAnTmV4dCc7XG4gICAgQElucHV0KCkgcHJldmlvdXNUZXh0OiBzdHJpbmcgPSAnUHJldmlvdXMnO1xuICAgIEBJbnB1dCgpIGNhbmNlbFRleHQ6IHN0cmluZyA9ICdDYW5jZWwnO1xuICAgIEBJbnB1dCgpIGZpbmlzaFRleHQ6IHN0cmluZyA9ICdGaW5pc2gnO1xuXG4gICAgQElucHV0KCkgbmV4dFRvb2x0aXA6IHN0cmluZyA9ICdHbyB0byB0aGUgbmV4dCBzdGVwJztcbiAgICBASW5wdXQoKSBwcmV2aW91c1Rvb2x0aXA6IHN0cmluZyA9ICdHbyB0byB0aGUgcHJldmlvdXMgc3RlcCc7XG4gICAgQElucHV0KCkgY2FuY2VsVG9vbHRpcDogc3RyaW5nID0gJ0NhbmNlbCB0aGUgd2l6YXJkJztcbiAgICBASW5wdXQoKSBmaW5pc2hUb29sdGlwOiBzdHJpbmcgPSAnRmluaXNoIHRoZSB3aXphcmQnO1xuXG4gICAgQElucHV0KCkgbmV4dEFyaWFMYWJlbDogc3RyaW5nID0gJ0dvIHRvIHRoZSBuZXh0IHN0ZXAnO1xuICAgIEBJbnB1dCgpIHByZXZpb3VzQXJpYUxhYmVsOiBzdHJpbmcgPSAnR28gdG8gdGhlIHByZXZpb3VzIHN0ZXAnO1xuICAgIEBJbnB1dCgpIGNhbmNlbEFyaWFMYWJlbDogc3RyaW5nID0gJ0NhbmNlbCB0aGUgd2l6YXJkJztcbiAgICBASW5wdXQoKSBmaW5pc2hBcmlhTGFiZWw6IHN0cmluZyA9ICdGaW5pc2ggdGhlIHdpemFyZCc7XG5cbiAgICBASW5wdXQoKSBuZXh0RGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBwcmV2aW91c0Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgY2FuY2VsRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBmaW5pc2hEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgbmV4dFZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHByZXZpb3VzVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgY2FuY2VsVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgZmluaXNoVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgY2FuY2VsQWx3YXlzVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGZpbmlzaEFsd2F5c1Zpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKSBvbk5leHQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgICBAT3V0cHV0KCkgb25QcmV2aW91cyA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICAgIEBPdXRwdXQoKSBvbkNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgb25GaW5pc2hpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpIG9uRmluaXNoID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIEBPdXRwdXQoKSBzdGVwQ2hhbmdpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPFN0ZXBDaGFuZ2luZ0V2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBzdGVwQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG4gICAgQE91dHB1dCgpIHN0ZXBFcnJvciA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihXaXphcmRTdGVwQ29tcG9uZW50KSBzdGVwcyA9IG5ldyBRdWVyeUxpc3Q8V2l6YXJkU3RlcENvbXBvbmVudD4oKTtcblxuICAgIGlkOiBzdHJpbmcgPSBgdXgtd2l6YXJkLSR7dW5pcXVlSWQrK31gO1xuICAgIGludmFsaWRJbmRpY2F0b3I6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgpXG4gICAgZ2V0IHN0ZXAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdGVwO1xuICAgIH1cbiAgICBzZXQgc3RlcCh2YWx1ZTogbnVtYmVyKSB7XG5cbiAgICAgICAgLy8gb25seSBhY2NlcHQgbnVtYmVycyBhcyB2YWxpZCBvcHRpb25zXG4gICAgICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG5cbiAgICAgICAgICAgIC8vIHN0b3JlIHRoZSBhY3RpdmUgc3RlcFxuICAgICAgICAgICAgdGhpcy5fc3RlcCA9IHZhbHVlO1xuXG4gICAgICAgICAgICAvLyB1cGRhdGUgd2hpY2ggc3RlcHMgc2hvdWxkIGJlIGFjdGl2ZVxuICAgICAgICAgICAgdGhpcy51cGRhdGUoKTtcblxuICAgICAgICAgICAgLy8gZW1pdCB0aGUgY2hhbmdlIGV2ZW50XG4gICAgICAgICAgICB0aGlzLnN0ZXBDaGFuZ2UubmV4dCh0aGlzLnN0ZXApO1xuXG4gICAgICAgICAgICAvLyByZXNldCB0aGUgaW52YWxpZCBzdGF0ZVxuICAgICAgICAgICAgdGhpcy5pbnZhbGlkSW5kaWNhdG9yID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIF9zdGVwOiBudW1iZXIgPSAwO1xuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaW5pdGlhbGx5IHNldCB0aGUgY29ycmVjdCB2aXNpYmlsaXR5IG9mIHRoZSBzdGVwc1xuICAgICAgICBzZXRUaW1lb3V0KHRoaXMudXBkYXRlLmJpbmQodGhpcykpO1xuXG4gICAgICAgIC8vIGluaXRpYWxseSBzZXQgdGhlIGlkcyBmb3IgZWFjaCBzdGVwXG4gICAgICAgIHRoaXMuc2V0V2l6YXJkU3RlcElkcygpO1xuXG4gICAgICAgIC8vIGlmIHRoZSBzdGVwcyBjaGFuZ2UgdGhlbiB1cGRhdGUgdGhlIGlkc1xuICAgICAgICB0aGlzLnN0ZXBzLmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSkuc3Vic2NyaWJlKCgpID0+IHRoaXMuc2V0V2l6YXJkU3RlcElkcygpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgLyoqIFNldCBpZHMgZm9yIGVhY2ggb2YgdGhlIHdpemFyZCBzdGVwcyAqL1xuICAgIHNldFdpemFyZFN0ZXBJZHMoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc3RlcHMuZm9yRWFjaCgoc3RlcCwgaWR4KSA9PiBzdGVwLmlkID0gYCR7dGhpcy5pZH0tc3RlcC0ke2lkeH1gKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOYXZpZ2F0ZSB0byB0aGUgbmV4dCBzdGVwXG4gICAgICovXG4gICAgbmV4dCgpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLnN0ZXBDaGFuZ2luZy5uZXh0KG5ldyBTdGVwQ2hhbmdpbmdFdmVudCh0aGlzLnN0ZXAsIHRoaXMuc3RlcCArIDEpKTtcblxuICAgICAgICAvLyBjaGVjayBpZiBjdXJyZW50IHN0ZXAgaXMgaW52YWxpZFxuICAgICAgICBpZiAoIXRoaXMuZ2V0Q3VycmVudFN0ZXAoKS52YWxpZCkge1xuICAgICAgICAgICAgdGhpcy5pbnZhbGlkSW5kaWNhdG9yID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuc3RlcEVycm9yLm5leHQodGhpcy5zdGVwKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIHdlIGFyZSBjdXJyZW50bHkgb24gdGhlIGxhc3Qgc3RlcFxuICAgICAgICBpZiAoKHRoaXMuc3RlcCArIDEpIDwgdGhpcy5zdGVwcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcCsrO1xuXG4gICAgICAgICAgICAvLyBlbWl0IHRoZSBjdXJyZW50IHN0ZXBcbiAgICAgICAgICAgIHRoaXMub25OZXh0Lm5leHQodGhpcy5zdGVwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5hdmlnYXRlIHRvIHRoZSBwcmV2aW91cyBzdGVwXG4gICAgICovXG4gICAgcHJldmlvdXMoKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5zdGVwQ2hhbmdpbmcubmV4dChuZXcgU3RlcENoYW5naW5nRXZlbnQodGhpcy5zdGVwLCB0aGlzLnN0ZXAgLSAxKSk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgd2UgYXJlIGN1cnJlbnRseSBvbiB0aGUgbGFzdCBzdGVwXG4gICAgICAgIGlmICh0aGlzLnN0ZXAgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0ZXAtLTtcblxuICAgICAgICAgICAgLy8gZW1pdCB0aGUgY3VycmVudCBzdGVwXG4gICAgICAgICAgICB0aGlzLm9uUHJldmlvdXMubmV4dCh0aGlzLnN0ZXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhY3Rpb25zIHdoZW4gdGhlIGZpbmlzaCBidXR0b24gaXMgY2xpY2tlZFxuICAgICAqL1xuICAgIGZpbmlzaCgpOiBQcm9taXNlPHZvaWQ+IHtcblxuICAgICAgICAvLyBmaXJlcyB3aGVuIHRoZSBmaW5pc2ggYnV0dG9uIGlzIGNsaWNrZWQgYWx3YXlzXG4gICAgICAgIHRoaXMub25GaW5pc2hpbmcubmV4dCgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGlzIHJlcXVpcmVkIGJlY2F1c2Ugd2UgbmVlZCB0byBlbnN1cmUgY2hhbmdlIGRldGVjdGlvbiBoYXMgcnVuXG4gICAgICAgICAqIHRvIGRldGVybWluZSB3aGV0aGVyIG9yIG5vdCB3ZSBoYXZlIHRoZSBsYXRlc3QgdmFsdWUgZm9yIHRoZSAndmFsaWQnIGlucHV0XG4gICAgICAgICAqIG9uIHRoZSBjdXJyZW50IHN0ZXAuIFVuZm9ydHVuYXRlbHkgd2UgY2FuJ3QgdXNlIENoYW5nZURldGVjdG9yUmVmIGFzIHdlIGFyZSBsb29raW5nIHRvIHJ1blxuICAgICAgICAgKiBvbiBjb250ZW50IGNoaWxkcmVuLCBhbmQgd2UgY2FudCB1c2UgQXBwbGljYXRpb25SZWYudGljaygpIGFzIHRoaXMgZG9lcyBub3Qgd29yayBpbiBhIGh5YnJpZCBhcHAsIGVnLiBvdXIgZG9jc1xuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBvbmx5IGZpcmVzIHdoZW4gdGhlIGZpbmlzaCBidXR0b24gaXMgY2xpY2tlZCBhbmQgdGhlIHN0ZXAgaXMgdmFsaWRcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRDdXJyZW50U3RlcCgpLnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25GaW5pc2gubmV4dCgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RlcEVycm9yLm5leHQodGhpcy5zdGVwKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhY3Rpb25zIHdoZW4gdGhlIGNhbmNlbCBidXR0b24gaXMgY2xpY2tlZFxuICAgICAqL1xuICAgIGNhbmNlbCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vbkNhbmNlbC5uZXh0KCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogVXBkYXRlIHRoZSBhY3RpdmUgc3RhdGUgb2YgZWFjaCBzdGVwXG4gICAgICovXG4gICAgdXBkYXRlKCk6IHZvaWQge1xuICAgICAgICAvLyB1cGRhdGUgd2hpY2ggc3RlcHMgc2hvdWxkIGJlIGFjdGl2ZVxuICAgICAgICB0aGlzLnN0ZXBzLmZvckVhY2goKHN0ZXAsIGlkeCkgPT4gc3RlcC5hY3RpdmUgPSBpZHggPT09IHRoaXMuc3RlcCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogSnVtcCB0byBhIHNwZWNpZmljIHN0ZXAgb25seSBpZiB0aGUgc3RlcCBoYXMgcHJldmlvdXNseSBiZWVuIHZpc2l0ZWRcbiAgICAgKi9cbiAgICBnb3RvU3RlcChzdGVwOiBXaXphcmRTdGVwQ29tcG9uZW50KTogdm9pZCB7XG4gICAgICAgIGlmIChzdGVwLnZpc2l0ZWQpIHtcblxuICAgICAgICAgICAgY29uc3Qgc3RlcEluZGV4ID0gdGhpcy5zdGVwcy50b0FycmF5KCkuZmluZEluZGV4KHN0cCA9PiBzdHAgPT09IHN0ZXApO1xuXG4gICAgICAgICAgICB0aGlzLnN0ZXBDaGFuZ2luZy5uZXh0KG5ldyBTdGVwQ2hhbmdpbmdFdmVudCh0aGlzLnN0ZXAsIHN0ZXBJbmRleCkpO1xuXG4gICAgICAgICAgICB0aGlzLnN0ZXAgPSBzdGVwSW5kZXg7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZXRlcm1pbmUgaWYgdGhlIGN1cnJlbnQgc3RlcCBpcyB0aGUgbGFzdCBzdGVwXG4gICAgICovXG4gICAgaXNMYXN0U3RlcCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuc3RlcCA9PT0gKHRoaXMuc3RlcHMubGVuZ3RoIC0gMSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVzZXQgdGhlIHdpemFyZCAtIGdvZXMgdG8gZmlyc3Qgc3RlcCBhbmQgcmVzZXRzIHZpc2l0ZWQgc3RhdGVcbiAgICAgKi9cbiAgICByZXNldCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBtYXJrIGFsbCBzdGVwcyBhcyBub3QgdmlzaXRlZFxuICAgICAgICB0aGlzLnN0ZXBzLmZvckVhY2goc3RlcCA9PiBzdGVwLnZpc2l0ZWQgPSBmYWxzZSk7XG5cbiAgICAgICAgLy8gZ28gdG8gdGhlIGZpcnN0IHN0ZXBcbiAgICAgICAgdGhpcy5zdGVwID0gMDtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBHZXQgdGhlIHN0ZXAgYXQgdGhlIGN1cnJlbnQgaW5kZXhcbiAgICAgKi9cbiAgICBnZXRDdXJyZW50U3RlcCgpOiBXaXphcmRTdGVwQ29tcG9uZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RlcEF0SW5kZXgodGhpcy5zdGVwKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBSZXR1cm4gYSBzdGVwIGF0IGEgc3BlY2lmaWMgaW5kZXhcbiAgICAgKi9cbiAgICBnZXRTdGVwQXRJbmRleChpbmRleDogbnVtYmVyKTogV2l6YXJkU3RlcENvbXBvbmVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0ZXBzLnRvQXJyYXkoKVtpbmRleF07XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgU3RlcENoYW5naW5nRXZlbnQge1xuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBmcm9tOiBudW1iZXIsIHB1YmxpYyB0bzogbnVtYmVyKSB7IH1cbn0iXX0=