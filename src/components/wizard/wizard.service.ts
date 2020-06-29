import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { WizardStep } from './wizard-step';

/**
 * This service is required to provide a form of communication
 * between the marquee wizard steps and the containing marquee wizard.
 * We cannot inject the Host due to the steps being content children
 * rather than view children.
 */
@Injectable()
export class WizardService {
    valid$ = new Subject<WizardValidEvent>();
}

export interface WizardValidEvent {
    step: WizardStep;
    valid: boolean;
}
