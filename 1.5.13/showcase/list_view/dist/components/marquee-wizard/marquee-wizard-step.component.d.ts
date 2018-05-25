import { EventEmitter } from '@angular/core';
import { WizardStepComponent } from '../wizard/index';
import { MarqueeWizardService } from './marquee-wizard.service';
export declare class MarqueeWizardStepComponent extends WizardStepComponent {
    private _marqueeWizardService;
    icon: string;
    completed: boolean;
    completedChange: EventEmitter<boolean>;
    valid: boolean;
    private _valid;
    constructor(_marqueeWizardService: MarqueeWizardService);
    /**
     * Update the completed state and emit the latest value
     * @param completed whether or not the step is completed
     */
    setCompleted(completed: boolean): void;
}
