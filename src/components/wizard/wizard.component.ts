import { AfterContentInit, Component, ContentChild, ContentChildren, EventEmitter, Input, OnDestroy, OnInit, Output, QueryList, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { tick } from '../../common/index';
import { WizardStepComponent } from './wizard-step.component';
import { WizardService, WizardValidEvent } from './wizard.service';

let uniqueId: number = 0;

@Component({
    selector: 'ux-wizard',
    templateUrl: './wizard.component.html',
    providers: [WizardService],
    host: {
        '[class]': 'orientation'
    }
})
export class WizardComponent implements OnInit, AfterContentInit, OnDestroy {

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

    /** If set to `true` the 'Next' or 'Finish' button will become disabled when the current step is invalid. */
    @Input() disableNextWhenInvalid: boolean = false;

    /** Whether to set `visited` to false on subsequent steps after a validation fault. */
    @Input() resetVisitedOnValidationError: boolean = false;

    /** If set to false it will allow users to navigate to every step */
    @Input() sequential: boolean = true;

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

    id: string = `ux-wizard-${ uniqueId++ }`;
    invalidIndicator: boolean = false;

    /**
     * The current active step. When the step changes an event will be emitted containing the index of the newly active step.
     * If this is not specified the wizard will start on the first step.
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
    protected readonly _onDestroy = new Subject<void>();

    constructor(protected readonly _wizardService: WizardService<WizardStepComponent>) {
    }

    ngOnInit(): void {
        // initially set the correct visibility of the steps
        setTimeout(this.update.bind(this));

        // watch for changes to valid subject
        this._wizardService.validChange$.pipe(
            filter((event: WizardValidEvent<WizardStepComponent>) => !event.valid),
            takeUntil(this._onDestroy)
        ).subscribe((event: WizardValidEvent<WizardStepComponent>) => this.setFutureStepsUnvisited(event.step));
    }

    ngAfterContentInit(): void {
        this.steps.changes.pipe(tick(), takeUntil(this._onDestroy)).subscribe(this.update.bind(this));
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /**
     * Navigate to the next step
     */
    async next(): Promise<void> {

        this.stepChanging.next(new StepChangingEvent(this.step, this.step + 1));

        const step = this.getCurrentStep();

        // Disable the button while waiting on validation
        this.nextDisabled = true;

        try {
            // Fetch validation status
            const validationResult = this.isStepValid();
            step.valid = validationResult instanceof Promise ? await validationResult : validationResult;
        } finally {
            // Re-enable button
            this.nextDisabled = false;
        }

        // check if current step is invalid
        if (!step.valid) {
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
     * Whether the Next or Finish button should be disabled.
     */
    isNextDisabled(): boolean {
        const step = this.getCurrentStep();

        // ensure the step is not null before we try to access its properties. It may be null if an ngFor is being
        // used and the steps haven't rendered yet
        if (!step) {
            return false;
        }

        // Use the `disableNextWhenInvalid` setting to determine whether to disable the Next/Finish button
        // based on validation.
        // If not defined on the WizardStepComponent, use the value from WizardComponent.
        return (step.disableNextWhenInvalid === undefined ? this.disableNextWhenInvalid : step.disableNextWhenInvalid) && !step.valid;
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
    async finish(): Promise<void> {

        // fires when the finish button is clicked always
        this.onFinishing.next();

        // Disable the button while waiting on validation
        this.finishDisabled = true;

        try {
            // Fetch validation status
            const validationResult = this.isStepValid();
            this.getCurrentStep().valid = validationResult instanceof Promise ? await validationResult : validationResult;
        } finally {
            // Re-enable button
            this.finishDisabled = false;
        }

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
                    this.onFinish.emit();
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
        if (step.visited || !this.sequential) {

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
        this.steps.forEach(step => step.setVisitedAndEmitChangeEvent(false));

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

    /**
     * If a step in the wizard becomes invalid, all steps sequentially after
     * it should become unvisited
     */
    protected setFutureStepsUnvisited(currentStep: WizardStepComponent): void {
        if (!this.resetVisitedOnValidationError) {
            return;
        }

        this.getFutureSteps(currentStep).forEach(step => {
            step.setVisitedAndEmitChangeEvent(false);
        });
    }

    /**
     * Get the currently active step and all steps beyond it
     */
    protected getFutureSteps(currentStep: WizardStepComponent): WizardStepComponent[] {
        const currentIndex = this.steps.toArray().indexOf(currentStep);
        return this.steps.toArray().slice(currentIndex + 1);
    }

    /**
     * Returns the valid status of the current step, including the `validation` function (if provided).
     */
    private isStepValid(): boolean | Promise<boolean> {

        // get the current active step
        const currentStep = this.getCurrentStep();

        // if there is no validator then return the valid state
        if (!currentStep.validator) {
            return currentStep.valid;
        }

        // get the validator result
        return currentStep.validator();
    }
}

export class StepChangingEvent {
    constructor(public from: number, public to: number) {
    }
}

export interface WizardFooterContext {
    step: number;
}
