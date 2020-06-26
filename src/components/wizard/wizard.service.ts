import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { MarqueeWizardStepComponent } from '../marquee-wizard/marquee-wizard-step.component';
import { WizardStepComponent } from './wizard-step.component';

/**
 * This service is required to provide a form of communication
 * between the marquee wizard steps and the containing marquee wizard.
 * We cannot inject the Host due to the steps being content children
 * rather than view children.
 */
@Injectable()
export class WizardService {
    valid$ = new Subject<WizardValidEvent | MarqueeWizardValidEvent>();

    resetValid(): void {
        this.valid$ = new Subject<WizardValidEvent | MarqueeWizardValidEvent>();
    }
}

export interface WizardValidEvent {
    step: WizardStepComponent;
    valid: boolean;
}

export interface MarqueeWizardValidEvent {
    step: MarqueeWizardStepComponent;
    valid: boolean;
}
