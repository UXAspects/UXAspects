import { AfterViewInit, Component, ContentChild, ContentChildren, EventEmitter, Input, OnDestroy, Output, QueryList, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { tick } from '../../common/index';
import { WizardStepComponent } from './wizard-step.component';

let uniqueId: number = 0;

@Component({
    selector: 'ux-wizard',
    templateUrl: './wizard.component.html',
    host: {
        '[class]': 'orientation'
    }
})
export class WizardComponent implements AfterViewInit, OnDestroy {

    /** Defines whether or not the wizard should be displayed in a `horizontal` or `vertical` layout. */
    @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';

    /** Defines the text displayed in the 'Next' button. */
    @Input() nextText: string = 'Next';

    /** Defines the text displayed in the 'Previous' button. */
    @Input() previousText: string = 'Previous';

    /** Defines the text displayed in the 'Cancel' button. */
    @Input() cancelText: string = 'Cancel';

    /** Defines the text displayed in the 'Finish' button. */
    @Input() finishText: string = 'Finish';

    /** Defines the text displayed in the tooltip when the 'Next' button is hovered. */
    @Input() nextTooltip: string = 'Go to the next step';

    /** Defines the text displayed in the tooltip when the 'Previous' button is hovered. */
    @Input() previousTooltip: string = 'Go to the previous step';

    /** Defines the text displayed in the tooltip when the 'Cancel' button is hovered. */
    @Input() cancelTooltip: string = 'Cancel the wizard';

    /** Defines the text displayed in the tooltip when the 'Finish' button is hovered. */
    @Input() finishTooltip: string = 'Finish the wizard';

    /** Defines the text for the aria label on the 'Next' button. */
    @Input() nextAriaLabel: string = 'Go to the next step';

    /** Defines the text for the aria label on the 'Previous' button. */
    @Input() previousAriaLabel: string = 'Go to the previous step';

    /** Defines the text for the aria label on the 'Cancel' button. */
    @Input() cancelAriaLabel: string = 'Cancel the wizard';

    /** Defines the text for the aria label on the 'Finish' button. */
    @Input() finishAriaLabel: string = 'Finish the wizard';

    /** If set to `true` the 'Next' button will appear disabled and will not respond to clicks. */
    @Input() nextDisabled: boolean = false;

    /** If set to `true` the 'Previous' button will appear disabled and will not respond to clicks. */
    @Input() previousDisabled: boolean = false;

    /** If set to `true` the 'Cancel' button will appear disabled and will not respond to clicks. */
    @Input() cancelDisabled: boolean = false;

    /** If set to `true` the 'Finish' button will appear disabled and will not respond to clicks. */
    @Input() finishDisabled: boolean = false;

    /** If set to `false` the 'Next' button will be hidden. */
    @Input() nextVisible: boolean = true;

      /** If set to true the 'Next' button will become disabled when the current step is invalid **/
      @Input() disableNextWhenInvalid: boolean = false;

    /** If set to `false` the 'Previous' button will be hidden. */
    @Input() previousVisible: boolean = true;

    /** If set to `false` the 'Cancel' button will be hidden. */
    @Input() cancelVisible: boolean = true;

    /** If set to false the 'Finish' button will be hidden. */
    @Input() finishVisible: boolean = true;

    /** If set to `true` the 'Cancel' button will be visible even on the last step. By default it will be hidden on the final step. */
    @Input() cancelAlwaysVisible: boolean = false;

    /** If set to `true` the 'Finish' button will be visible on all steps of the wizard. By default this button will only be visible on the final step of the wizard. */
    @Input() finishAlwaysVisible: boolean = false;

    /** Emits when the wizard has moved to the next step. It will receive the current step index as a parameter. */
    @Output() onNext = new EventEmitter<number>();

    /** Emits when the wizard has moved to the previous step. It will receive the current step index as a parameter. */
    @Output() onPrevious = new EventEmitter<number>();

    /** Emits when the 'Cancel' button has been pressed. */
    @Output() onCancel = new EventEmitter<void>();

    /** Emits when the 'Finish' button is clicked, but before the finish event fires. This fires regardless of the validity of the final step. */
    @Output() onFinishing = new EventEmitter<void>();

    /** Emits when the 'Finish' button has been pressed and the final step is valid. */
    @Output() onFinish = new EventEmitter<void>();

    /** Emits before the current step changes. The event contains the current step index in the `from` property, and the requested step index in the `to` property. */
    @Output() stepChanging = new EventEmitter<StepChangingEvent>();

    /** Emits when the current step has changed. */
    @Output() stepChange = new EventEmitter<number>();

    /** Emits when the user tries to continue but the current step is invalid. */
    @Output() stepError = new EventEmitter<number>();

    @ContentChildren(WizardStepComponent) steps = new QueryList<WizardStepComponent>();

    @ContentChild('footerTemplate', { static: false }) footerTemplate: TemplateRef<WizardFooterContext>;

    id: string = `ux-wizard-${uniqueId++}`;
    invalidIndicator: boolean = false;

    /**
     * The current active step. When the step changes an event will be emitted containing the index of the newly active step.
     * If this is not specifed the wizard will start on the first step.
     */
    @Input()
    get step() {
        return this._step;
    }
    set step(value: number) {

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

    private _step: number = 0;
    private _onDestroy = new Subject<void>();

    ngAfterViewInit(): void {

        // initially set the correct visibility of the steps
        setTimeout(this.update.bind(this));

        // initially set the ids for each step
        this.setWizardStepIds();

        // if the steps change then update the ids
        this.steps.changes.pipe(tick(), takeUntil(this._onDestroy)).subscribe(() => {
            this.setWizardStepIds();
            this.update();
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Set ids for each of the wizard steps */
    setWizardStepIds(): void {
        this.steps.forEach((step, idx) => step.id = `${this.id}-step-${idx}`);
    }

    /**
     * Navigate to the next step
     */
    next(): void {

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
     * If the validation is false then disable the next button
     * and do not allow progression onto the next step however
     * if the validation is set to true then the next button
     * disable the next button and give a greyed out
     * appearance as an indicator
     */
    isNextDisabled(): boolean {
        const { valid, disableNextWhenInvalid } = this.getCurrentStep() as WizardStepComponent;
        return disableNextWhenInvalid && !valid;
    }

    /**
     * Navigate to the previous step
     */
    previous(): void {

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
     */
    finish(): Promise<void> {

        // fires when the finish button is clicked always
        this.onFinishing.next();

        /**
         * This is required because we need to ensure change detection has run
         * to determine whether or not we have the latest value for the 'valid' input
         * on the current step. Unfortunately we can't use ChangeDetectorRef as we are looking to run
         * on content children, and we cant use ApplicationRef.tick() as this does not work in a hybrid app, eg. our docs
         */
        return new Promise<void>(resolve => {
            setTimeout(() => {

                // only fires when the finish button is clicked and the step is valid
                if (this.getCurrentStep().valid) {
                    this.onFinish.next();
                } else {
                    this.stepError.next(this.step);
                }

                resolve();
            });
        });
    }

    /**
     * Perform actions when the cancel button is clicked
     */
    cancel(): void {
        this.onCancel.next();
    }

    /**
     * Update the active state of each step
     */
    update(): void {
        // update which steps should be active
        this.steps.forEach((step, idx) => step.active = idx === this.step);
    }

    /**
     * Jump to a specific step only if the step has previously been visited
     */
    gotoStep(step: WizardStepComponent): void {
        if (step.visited) {

            const stepIndex = this.steps.toArray().findIndex(stp => stp === step);

            this.stepChanging.next(new StepChangingEvent(this.step, stepIndex));

            this.step = stepIndex;
        }
    }

    /**
     * Determine if the current step is the last step
     */
    isLastStep(): boolean {
        return this.step === (this.steps.length - 1);
    }

    /**
     * Reset the wizard - goes to first step and resets visited state
     */
    reset(): void {

        // mark all steps as not visited
        this.steps.forEach(step => step.visited = false);

        // go to the first step
        this.step = 0;
    }

    /**
     * Get the step at the current index
     */
    getCurrentStep(): WizardStepComponent {
        return this.getStepAtIndex(this.step);
    }

    /**
     * Return a step at a specific index
     */
    getStepAtIndex(index: number): WizardStepComponent {
        return this.steps.toArray()[index];
    }
}

export class StepChangingEvent {
    constructor(public from: number, public to: number) { }
}

export interface WizardFooterContext {
    step: number;
}