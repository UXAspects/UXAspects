import { QueryList, TemplateRef } from '@angular/core';
import { WizardComponent } from '../wizard/index';
import { MarqueeWizardStepComponent } from './marquee-wizard-step.component';
import { MarqueeWizardService, MarqueeWizardValidEvent } from './marquee-wizard.service';
export declare class MarqueeWizardComponent extends WizardComponent {
    description: string | TemplateRef<any>;
    steps: QueryList<MarqueeWizardStepComponent>;
    readonly isTemplate: boolean;
    constructor(marqueeWizardService: MarqueeWizardService);
    /**
     * If the current step is valid, mark it as
     * complete and go to the next step
     */
    next(): void;
    /**
     * Emit the onFinishing event and if valid the onFinish event.
     * Also mark the final step as completed if it is valid
     */
    finish(): Promise<void>;
    /**
     * If a step in the wizard becomes invalid, all steps sequentially after
     * it, should become unvisited and incomplete
     */
    validChange(state: MarqueeWizardValidEvent): void;
}
