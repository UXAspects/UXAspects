import { AfterViewInit, EventEmitter, OnDestroy, QueryList } from '@angular/core';
import { WizardStepComponent } from './wizard-step.component';
export declare class WizardComponent implements AfterViewInit, OnDestroy {
    orientation: 'horizontal' | 'vertical';
    nextText: string;
    previousText: string;
    cancelText: string;
    finishText: string;
    nextTooltip: string;
    previousTooltip: string;
    cancelTooltip: string;
    finishTooltip: string;
    nextAriaLabel: string;
    previousAriaLabel: string;
    cancelAriaLabel: string;
    finishAriaLabel: string;
    nextDisabled: boolean;
    previousDisabled: boolean;
    cancelDisabled: boolean;
    finishDisabled: boolean;
    nextVisible: boolean;
    previousVisible: boolean;
    cancelVisible: boolean;
    finishVisible: boolean;
    cancelAlwaysVisible: boolean;
    finishAlwaysVisible: boolean;
    onNext: EventEmitter<number>;
    onPrevious: EventEmitter<number>;
    onCancel: EventEmitter<void>;
    onFinishing: EventEmitter<void>;
    onFinish: EventEmitter<void>;
    stepChanging: EventEmitter<StepChangingEvent>;
    stepChange: EventEmitter<number>;
    stepError: EventEmitter<number>;
    steps: QueryList<WizardStepComponent>;
    id: string;
    invalidIndicator: boolean;
    step: number;
    private _step;
    private _onDestroy;
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    /** Set ids for each of the wizard steps */
    setWizardStepIds(): void;
    /**
     * Navigate to the next step
     */
    next(): void;
    /**
     * Navigate to the previous step
     */
    previous(): void;
    /**
     * Perform actions when the finish button is clicked
     */
    finish(): Promise<void>;
    /**
     * Perform actions when the cancel button is clicked
     */
    cancel(): void;
    /**
     * Update the active state of each step
     */
    update(): void;
    /**
     * Jump to a specific step only if the step has previously been visited
     */
    gotoStep(step: WizardStepComponent): void;
    /**
     * Determine if the current step is the last step
     */
    isLastStep(): boolean;
    /**
     * Reset the wizard - goes to first step and resets visited state
     */
    reset(): void;
    /**
     * Get the step at the current index
     */
    getCurrentStep(): WizardStepComponent;
    /**
     * Return a step at a specific index
     */
    getStepAtIndex(index: number): WizardStepComponent;
}
export declare class StepChangingEvent {
    from: number;
    to: number;
    constructor(from: number, to: number);
}
