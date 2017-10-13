import { Component, Input, ContentChildren, QueryList, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { WizardStepComponent } from './wizard-step.component';

@Component({
    selector: 'ux-wizard',
    templateUrl: './wizard.component.html',
    host: {
        '[class]': 'orientation'
    }
})
export class WizardComponent implements AfterViewInit {

    private _step: number = 0;

    @ContentChildren(WizardStepComponent) steps = new QueryList<WizardStepComponent>();

    @Input() orientation: 'horizontal' | 'vertical' = 'horizontal';

    @Input() nextText: string = 'Next';
    @Input() previousText: string = 'Previous';
    @Input() cancelText: string = 'Cancel';
    @Input() finishText: string = 'Finish';

    @Input() nextTooltip: string = 'Go to the next step';
    @Input() previousTooltip: string = 'Go to the previous step';
    @Input() cancelTooltip: string = 'Cancel the wizard';
    @Input() finishTooltip: string = 'Finish the wizard';

    @Input() nextDisabled: boolean = false;
    @Input() previousDisabled: boolean = false;
    @Input() cancelDisabled: boolean = false;
    @Input() finishDisabled: boolean = false;

    @Input() nextVisible: boolean = true;
    @Input() previousVisible: boolean = true;
    @Input() cancelVisible: boolean = true;
    @Input() finishVisible: boolean = true;
    @Input() cancelAlwaysVisible: boolean = false;
    @Input() finishAlwaysVisible: boolean = false;

    @Output() onNext = new EventEmitter<number>();
    @Output() onPrevious = new EventEmitter<number>();
    @Output() onCancel = new EventEmitter<void>();
    @Output() onFinish = new EventEmitter<void>();
    @Output() stepChange = new EventEmitter<number>();

    invalidIndicator: boolean = false;

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

    ngAfterViewInit(): void {

        // initially set the correct visibility of the steps
        setTimeout(this.update.bind(this));
    }


    /**
     * Navigate to the next step
     */
    next(): void {

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
     */
    previous(): void {
        
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
    finish(): void {
        this.onFinish.next();        
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
            this.step = this.steps.toArray().findIndex(stp => stp === step);
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