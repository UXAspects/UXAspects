import { ComponentFixture } from '@angular/core/testing';
import { WizardTestWrapper } from '../wizard/wizard-test-wrapper';

export class MarqueeWizardTestWrapper<T> extends WizardTestWrapper<T> {
    constructor(fixture: ComponentFixture<T>) {
        super(fixture);

        this.allStepsSelector = '.marquee-wizard-step';
        this.activeStepSelector = '.marquee-wizard-step.active';
        this.stepButtonsSelector = '.modal-footer button';
    }
}
