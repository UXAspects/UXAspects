/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { WizardStepComponent } from './wizard-step.component';
export class WizardComponent {
    constructor() {
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
                template: `<div class="wizard-body">

    <div class="wizard-steps">

        <div class="wizard-step" [class.active]="stp.active" [class.visited]="stp.visited" [class.invalid]="stp.active && !stp.valid && invalidIndicator" (click)="gotoStep(stp)" *ngFor="let stp of steps">
            {{ stp.header }}
        </div>

    </div>

    <div class="wizard-content">
        <ng-content></ng-content>
    </div>

</div>

<div class="wizard-footer">
    <button #tip="ux-tooltip" class="btn button-secondary" *ngIf="previousVisible" [uxTooltip]="previousTooltip" [disabled]="previousDisabled || step === 0"
        (click)="previous(); tip.hide()">{{ previousText }}</button>

    <button #tip="ux-tooltip" class="btn button-primary" *ngIf="nextVisible && !isLastStep()" [uxTooltip]="nextTooltip" [disabled]="nextDisabled"
        (click)="next(); tip.hide()">{{ nextText }}</button>

    <button #tip="ux-tooltip" class="btn button-primary" *ngIf="finishVisible && isLastStep() || finishAlwaysVisible" [uxTooltip]="finishTooltip"
        [disabled]="finishDisabled" (click)="finish(); tip.hide()">{{ finishText }}</button>

    <button #tip="ux-tooltip" class="btn button-secondary" *ngIf="cancelVisible && !isLastStep() || cancelAlwaysVisible" [uxTooltip]="cancelTooltip"
        [disabled]="cancelDisabled" (click)="cancel(); tip.hide()">{{ cancelText }}</button>
</div>`,
                host: {
                    '[class]': 'orientation'
                }
            },] },
];
/** @nocollapse */
WizardComponent.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2l6YXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3dpemFyZC93aXphcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLFNBQVMsRUFBRSxlQUFlLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xILE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBcUM5RCxNQUFNOztxQkFFc0IsQ0FBQztxQkFFcUIsSUFBSSxTQUFTLEVBQXVCOzJCQUVoQyxZQUFZO3dCQUVsQyxNQUFNOzRCQUNGLFVBQVU7MEJBQ1osUUFBUTswQkFDUixRQUFROzJCQUVQLHFCQUFxQjsrQkFDakIseUJBQXlCOzZCQUMzQixtQkFBbUI7NkJBQ25CLG1CQUFtQjs0QkFFbkIsS0FBSztnQ0FDRCxLQUFLOzhCQUNQLEtBQUs7OEJBQ0wsS0FBSzsyQkFFUixJQUFJOytCQUNBLElBQUk7NkJBQ04sSUFBSTs2QkFDSixJQUFJO21DQUNFLEtBQUs7bUNBQ0wsS0FBSztzQkFFMUIsSUFBSSxZQUFZLEVBQVU7MEJBQ3RCLElBQUksWUFBWSxFQUFVO3dCQUM1QixJQUFJLFlBQVksRUFBUTsyQkFDckIsSUFBSSxZQUFZLEVBQVE7d0JBQzNCLElBQUksWUFBWSxFQUFROzRCQUNwQixJQUFJLFlBQVksRUFBcUI7MEJBQ3ZDLElBQUksWUFBWSxFQUFVO2dDQUVyQixLQUFLOzs7OztRQUc3QixJQUFJO1FBQ0osTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7Ozs7OztJQUV0QixJQUFJLElBQUksQ0FBQyxLQUFhOztRQUdsQixFQUFFLENBQUMsQ0FBQyxPQUFPLEtBQUssS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDOztZQUc1QixJQUFJLENBQUMsS0FBSyxH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Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNkpWLE1BQU07Ozs7O0lBQ0YsWUFBbUIsSUFBWSxFQUFTLEVBQVU7UUFBL0IsU0FBSSxHQUFKLElBQUksQ0FBUTtRQUFTLE9BQUUsR0FBRixFQUFFLENBQVE7S0FBSztDQUMxRCIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyVmlld0luaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPdXRwdXQsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgV2l6YXJkU3RlcENvbXBvbmVudCB9IGZyb20gJy4vd2l6YXJkLXN0ZXAuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC13aXphcmQnLFxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cIndpemFyZC1ib2R5XCI+XG5cbiAgICA8ZGl2IGNsYXNzPVwid2l6YXJkLXN0ZXBzXCI+XG5cbiAgICAgICAgPGRpdiBjbGFzcz1cIndpemFyZC1zdGVwXCIgW2NsYXNzLmFjdGl2ZV09XCJzdHAuYWN0aXZlXCIgW2NsYXNzLnZpc2l0ZWRdPVwic3RwLnZpc2l0ZWRcIiBbY2xhc3MuaW52YWxpZF09XCJzdHAuYWN0aXZlICYmICFzdHAudmFsaWQgJiYgaW52YWxpZEluZGljYXRvclwiIChjbGljayk9XCJnb3RvU3RlcChzdHApXCIgKm5nRm9yPVwibGV0IHN0cCBvZiBzdGVwc1wiPlxuICAgICAgICAgICAge3sgc3RwLmhlYWRlciB9fVxuICAgICAgICA8L2Rpdj5cblxuICAgIDwvZGl2PlxuXG4gICAgPGRpdiBjbGFzcz1cIndpemFyZC1jb250ZW50XCI+XG4gICAgICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbiAgICA8L2Rpdj5cblxuPC9kaXY+XG5cbjxkaXYgY2xhc3M9XCJ3aXphcmQtZm9vdGVyXCI+XG4gICAgPGJ1dHRvbiAjdGlwPVwidXgtdG9vbHRpcFwiIGNsYXNzPVwiYnRuIGJ1dHRvbi1zZWNvbmRhcnlcIiAqbmdJZj1cInByZXZpb3VzVmlzaWJsZVwiIFt1eFRvb2x0aXBdPVwicHJldmlvdXNUb29sdGlwXCIgW2Rpc2FibGVkXT1cInByZXZpb3VzRGlzYWJsZWQgfHwgc3RlcCA9PT0gMFwiXG4gICAgICAgIChjbGljayk9XCJwcmV2aW91cygpOyB0aXAuaGlkZSgpXCI+e3sgcHJldmlvdXNUZXh0IH19PC9idXR0b24+XG5cbiAgICA8YnV0dG9uICN0aXA9XCJ1eC10b29sdGlwXCIgY2xhc3M9XCJidG4gYnV0dG9uLXByaW1hcnlcIiAqbmdJZj1cIm5leHRWaXNpYmxlICYmICFpc0xhc3RTdGVwKClcIiBbdXhUb29sdGlwXT1cIm5leHRUb29sdGlwXCIgW2Rpc2FibGVkXT1cIm5leHREaXNhYmxlZFwiXG4gICAgICAgIChjbGljayk9XCJuZXh0KCk7IHRpcC5oaWRlKClcIj57eyBuZXh0VGV4dCB9fTwvYnV0dG9uPlxuXG4gICAgPGJ1dHRvbiAjdGlwPVwidXgtdG9vbHRpcFwiIGNsYXNzPVwiYnRuIGJ1dHRvbi1wcmltYXJ5XCIgKm5nSWY9XCJmaW5pc2hWaXNpYmxlICYmIGlzTGFzdFN0ZXAoKSB8fCBmaW5pc2hBbHdheXNWaXNpYmxlXCIgW3V4VG9vbHRpcF09XCJmaW5pc2hUb29sdGlwXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImZpbmlzaERpc2FibGVkXCIgKGNsaWNrKT1cImZpbmlzaCgpOyB0aXAuaGlkZSgpXCI+e3sgZmluaXNoVGV4dCB9fTwvYnV0dG9uPlxuXG4gICAgPGJ1dHRvbiAjdGlwPVwidXgtdG9vbHRpcFwiIGNsYXNzPVwiYnRuIGJ1dHRvbi1zZWNvbmRhcnlcIiAqbmdJZj1cImNhbmNlbFZpc2libGUgJiYgIWlzTGFzdFN0ZXAoKSB8fCBjYW5jZWxBbHdheXNWaXNpYmxlXCIgW3V4VG9vbHRpcF09XCJjYW5jZWxUb29sdGlwXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImNhbmNlbERpc2FibGVkXCIgKGNsaWNrKT1cImNhbmNlbCgpOyB0aXAuaGlkZSgpXCI+e3sgY2FuY2VsVGV4dCB9fTwvYnV0dG9uPlxuPC9kaXY+YCxcbiAgICBob3N0OiB7XG4gICAgICAgICdbY2xhc3NdJzogJ29yaWVudGF0aW9uJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgV2l6YXJkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBwcml2YXRlIF9zdGVwOiBudW1iZXIgPSAwO1xuXG4gICAgQENvbnRlbnRDaGlsZHJlbihXaXphcmRTdGVwQ29tcG9uZW50KSBzdGVwcyA9IG5ldyBRdWVyeUxpc3Q8V2l6YXJkU3RlcENvbXBvbmVudD4oKTtcblxuICAgIEBJbnB1dCgpIG9yaWVudGF0aW9uOiAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnID0gJ2hvcml6b250YWwnO1xuXG4gICAgQElucHV0KCkgbmV4dFRleHQ6IHN0cmluZyA9ICdOZXh0JztcbiAgICBASW5wdXQoKSBwcmV2aW91c1RleHQ6IHN0cmluZyA9ICdQcmV2aW91cyc7XG4gICAgQElucHV0KCkgY2FuY2VsVGV4dDogc3RyaW5nID0gJ0NhbmNlbCc7XG4gICAgQElucHV0KCkgZmluaXNoVGV4dDogc3RyaW5nID0gJ0ZpbmlzaCc7XG5cbiAgICBASW5wdXQoKSBuZXh0VG9vbHRpcDogc3RyaW5nID0gJ0dvIHRvIHRoZSBuZXh0IHN0ZXAnO1xuICAgIEBJbnB1dCgpIHByZXZpb3VzVG9vbHRpcDogc3RyaW5nID0gJ0dvIHRvIHRoZSBwcmV2aW91cyBzdGVwJztcbiAgICBASW5wdXQoKSBjYW5jZWxUb29sdGlwOiBzdHJpbmcgPSAnQ2FuY2VsIHRoZSB3aXphcmQnO1xuICAgIEBJbnB1dCgpIGZpbmlzaFRvb2x0aXA6IHN0cmluZyA9ICdGaW5pc2ggdGhlIHdpemFyZCc7XG5cbiAgICBASW5wdXQoKSBuZXh0RGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBwcmV2aW91c0Rpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgQElucHV0KCkgY2FuY2VsRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBASW5wdXQoKSBmaW5pc2hEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQElucHV0KCkgbmV4dFZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIHByZXZpb3VzVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgY2FuY2VsVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgZmluaXNoVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XG4gICAgQElucHV0KCkgY2FuY2VsQWx3YXlzVmlzaWJsZTogYm9vbGVhbiA9IGZhbHNlO1xuICAgIEBJbnB1dCgpIGZpbmlzaEFsd2F5c1Zpc2libGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBPdXRwdXQoKSBvbk5leHQgPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcbiAgICBAT3V0cHV0KCkgb25QcmV2aW91cyA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuICAgIEBPdXRwdXQoKSBvbkNhbmNlbCA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgICBAT3V0cHV0KCkgb25GaW5pc2hpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gICAgQE91dHB1dCgpIG9uRmluaXNoID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICAgIEBPdXRwdXQoKSBzdGVwQ2hhbmdpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPFN0ZXBDaGFuZ2luZ0V2ZW50PigpO1xuICAgIEBPdXRwdXQoKSBzdGVwQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgICBpbnZhbGlkSW5kaWNhdG9yOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICBASW5wdXQoKVxuICAgIGdldCBzdGVwKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3RlcDtcbiAgICB9XG4gICAgc2V0IHN0ZXAodmFsdWU6IG51bWJlcikge1xuXG4gICAgICAgIC8vIG9ubHkgYWNjZXB0IG51bWJlcnMgYXMgdmFsaWQgb3B0aW9uc1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykge1xuXG4gICAgICAgICAgICAvLyBzdG9yZSB0aGUgYWN0aXZlIHN0ZXBcbiAgICAgICAgICAgIHRoaXMuX3N0ZXAgPSB2YWx1ZTtcblxuICAgICAgICAgICAgLy8gdXBkYXRlIHdoaWNoIHN0ZXBzIHNob3VsZCBiZSBhY3RpdmVcbiAgICAgICAgICAgIHRoaXMudXBkYXRlKCk7XG5cbiAgICAgICAgICAgIC8vIGVtaXQgdGhlIGNoYW5nZSBldmVudFxuICAgICAgICAgICAgdGhpcy5zdGVwQ2hhbmdlLm5leHQodGhpcy5zdGVwKTtcblxuICAgICAgICAgICAgLy8gcmVzZXQgdGhlIGludmFsaWQgc3RhdGVcbiAgICAgICAgICAgIHRoaXMuaW52YWxpZEluZGljYXRvciA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGluaXRpYWxseSBzZXQgdGhlIGNvcnJlY3QgdmlzaWJpbGl0eSBvZiB0aGUgc3RlcHNcbiAgICAgICAgc2V0VGltZW91dCh0aGlzLnVwZGF0ZS5iaW5kKHRoaXMpKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBOYXZpZ2F0ZSB0byB0aGUgbmV4dCBzdGVwXG4gICAgICovXG4gICAgbmV4dCgpOiB2b2lkIHtcblxuICAgICAgICB0aGlzLnN0ZXBDaGFuZ2luZy5uZXh0KG5ldyBTdGVwQ2hhbmdpbmdFdmVudCh0aGlzLnN0ZXAsIHRoaXMuc3RlcCArIDEpKTtcblxuICAgICAgICAvLyBjaGVjayBpZiBjdXJyZW50IHN0ZXAgaXMgaW52YWxpZFxuICAgICAgICBpZiAoIXRoaXMuZ2V0Q3VycmVudFN0ZXAoKS52YWxpZCkge1xuICAgICAgICAgICAgdGhpcy5pbnZhbGlkSW5kaWNhdG9yID0gdHJ1ZTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIHdlIGFyZSBjdXJyZW50bHkgb24gdGhlIGxhc3Qgc3RlcFxuICAgICAgICBpZiAoKHRoaXMuc3RlcCArIDEpIDwgdGhpcy5zdGVwcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuc3RlcCsrO1xuXG4gICAgICAgICAgICAvLyBlbWl0IHRoZSBjdXJyZW50IHN0ZXBcbiAgICAgICAgICAgIHRoaXMub25OZXh0Lm5leHQodGhpcy5zdGVwKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIE5hdmlnYXRlIHRvIHRoZSBwcmV2aW91cyBzdGVwXG4gICAgICovXG4gICAgcHJldmlvdXMoKTogdm9pZCB7XG5cbiAgICAgICAgdGhpcy5zdGVwQ2hhbmdpbmcubmV4dChuZXcgU3RlcENoYW5naW5nRXZlbnQodGhpcy5zdGVwLCB0aGlzLnN0ZXAgLSAxKSk7XG5cbiAgICAgICAgLy8gY2hlY2sgaWYgd2UgYXJlIGN1cnJlbnRseSBvbiB0aGUgbGFzdCBzdGVwXG4gICAgICAgIGlmICh0aGlzLnN0ZXAgPiAwKSB7XG4gICAgICAgICAgICB0aGlzLnN0ZXAtLTtcblxuICAgICAgICAgICAgLy8gZW1pdCB0aGUgY3VycmVudCBzdGVwXG4gICAgICAgICAgICB0aGlzLm9uUHJldmlvdXMubmV4dCh0aGlzLnN0ZXApO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUGVyZm9ybSBhY3Rpb25zIHdoZW4gdGhlIGZpbmlzaCBidXR0b24gaXMgY2xpY2tlZFxuICAgICAqL1xuICAgIGZpbmlzaCgpOiBQcm9taXNlPHZvaWQ+IHtcblxuICAgICAgICAvLyBmaXJlcyB3aGVuIHRoZSBmaW5pc2ggYnV0dG9uIGlzIGNsaWNrZWQgYWx3YXlzXG4gICAgICAgIHRoaXMub25GaW5pc2hpbmcubmV4dCgpO1xuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBUaGlzIGlzIHJlcXVpcmVkIGJlY2F1c2Ugd2UgbmVlZCB0byBlbnN1cmUgY2hhbmdlIGRldGVjdGlvbiBoYXMgcnVuXG4gICAgICAgICAqIHRvIGRldGVybWluZSB3aGV0aGVyIG9yIG5vdCB3ZSBoYXZlIHRoZSBsYXRlc3QgdmFsdWUgZm9yIHRoZSAndmFsaWQnIGlucHV0XG4gICAgICAgICAqIG9uIHRoZSBjdXJyZW50IHN0ZXAuIFVuZm9ydHVuYXRlbHkgd2UgY2FuJ3QgdXNlIENoYW5nZURldGVjdG9yUmVmIGFzIHdlIGFyZSBsb29raW5nIHRvIHJ1blxuICAgICAgICAgKiBvbiBjb250ZW50IGNoaWxkcmVuLCBhbmQgd2UgY2FudCB1c2UgQXBwbGljYXRpb25SZWYudGljaygpIGFzIHRoaXMgZG9lcyBub3Qgd29yayBpbiBhIGh5YnJpZCBhcHAsIGVnLiBvdXIgZG9jc1xuICAgICAgICAgKi9cbiAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG5cbiAgICAgICAgICAgICAgICAvLyBvbmx5IGZpcmVzIHdoZW4gdGhlIGZpbmlzaCBidXR0b24gaXMgY2xpY2tlZCBhbmQgdGhlIHN0ZXAgaXMgdmFsaWRcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRDdXJyZW50U3RlcCgpLnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25GaW5pc2gubmV4dCgpOyAgICAgICAgXG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFBlcmZvcm0gYWN0aW9ucyB3aGVuIHRoZSBjYW5jZWwgYnV0dG9uIGlzIGNsaWNrZWRcbiAgICAgKi9cbiAgICBjYW5jZWwoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub25DYW5jZWwubmV4dCgpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFVwZGF0ZSB0aGUgYWN0aXZlIHN0YXRlIG9mIGVhY2ggc3RlcFxuICAgICAqL1xuICAgIHVwZGF0ZSgpOiB2b2lkIHtcbiAgICAgICAgLy8gdXBkYXRlIHdoaWNoIHN0ZXBzIHNob3VsZCBiZSBhY3RpdmVcbiAgICAgICAgdGhpcy5zdGVwcy5mb3JFYWNoKChzdGVwLCBpZHgpID0+IHN0ZXAuYWN0aXZlID0gaWR4ID09PSB0aGlzLnN0ZXApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEp1bXAgdG8gYSBzcGVjaWZpYyBzdGVwIG9ubHkgaWYgdGhlIHN0ZXAgaGFzIHByZXZpb3VzbHkgYmVlbiB2aXNpdGVkXG4gICAgICovXG4gICAgZ290b1N0ZXAoc3RlcDogV2l6YXJkU3RlcENvbXBvbmVudCk6IHZvaWQge1xuICAgICAgICBpZiAoc3RlcC52aXNpdGVkKSB7XG5cbiAgICAgICAgICAgIGNvbnN0IHN0ZXBJbmRleCA9IHRoaXMuc3RlcHMudG9BcnJheSgpLmZpbmRJbmRleChzdHAgPT4gc3RwID09PSBzdGVwKTtcblxuICAgICAgICAgICAgdGhpcy5zdGVwQ2hhbmdpbmcubmV4dChuZXcgU3RlcENoYW5naW5nRXZlbnQodGhpcy5zdGVwLCBzdGVwSW5kZXgpKTtcblxuICAgICAgICAgICAgdGhpcy5zdGVwID0gc3RlcEluZGV4O1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGV0ZXJtaW5lIGlmIHRoZSBjdXJyZW50IHN0ZXAgaXMgdGhlIGxhc3Qgc3RlcFxuICAgICAqL1xuICAgIGlzTGFzdFN0ZXAoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLnN0ZXAgPT09ICh0aGlzLnN0ZXBzLmxlbmd0aCAtIDEpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFJlc2V0IHRoZSB3aXphcmQgLSBnb2VzIHRvIGZpcnN0IHN0ZXAgYW5kIHJlc2V0cyB2aXNpdGVkIHN0YXRlXG4gICAgICovXG4gICAgcmVzZXQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gbWFyayBhbGwgc3RlcHMgYXMgbm90IHZpc2l0ZWRcbiAgICAgICAgdGhpcy5zdGVwcy5mb3JFYWNoKHN0ZXAgPT4gc3RlcC52aXNpdGVkID0gZmFsc2UpO1xuXG4gICAgICAgIC8vIGdvIHRvIHRoZSBmaXJzdCBzdGVwXG4gICAgICAgIHRoaXMuc3RlcCA9IDA7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogR2V0IHRoZSBzdGVwIGF0IHRoZSBjdXJyZW50IGluZGV4XG4gICAgICovXG4gICAgZ2V0Q3VycmVudFN0ZXAoKTogV2l6YXJkU3RlcENvbXBvbmVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldFN0ZXBBdEluZGV4KHRoaXMuc3RlcCk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmV0dXJuIGEgc3RlcCBhdCBhIHNwZWNpZmljIGluZGV4XG4gICAgICovXG4gICAgZ2V0U3RlcEF0SW5kZXgoaW5kZXg6IG51bWJlcik6IFdpemFyZFN0ZXBDb21wb25lbnQge1xuICAgICAgICByZXR1cm4gdGhpcy5zdGVwcy50b0FycmF5KClbaW5kZXhdO1xuICAgIH1cbn1cblxuZXhwb3J0IGNsYXNzIFN0ZXBDaGFuZ2luZ0V2ZW50IHtcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZnJvbTogbnVtYmVyLCBwdWJsaWMgdG86IG51bWJlcikgeyB9XG59Il19