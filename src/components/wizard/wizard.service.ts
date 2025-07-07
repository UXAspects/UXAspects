import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * This service is required to provide a form of communication
 * between the marquee wizard steps and the containing marquee wizard.
 * We cannot inject the Host due to the steps being content children
 * rather than view children.
 */
@Injectable()
export class WizardService<TWizardStep> {
  validChange$ = new Subject<WizardValidEvent<TWizardStep>>();
}

export interface WizardValidEvent<TWizardStep> {
  step: TWizardStep;
  valid: boolean;
}
