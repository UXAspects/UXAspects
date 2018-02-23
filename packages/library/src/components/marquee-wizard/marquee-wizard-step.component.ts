import { Component, Input, Output, EventEmitter } from '@angular/core';
import { WizardStepComponent } from '../wizard/index';
import { MarqueeWizardService } from './marquee-wizard.service';

@Component({
    selector: 'ux-marquee-wizard-step',
    templateUrl: './marquee-wizard-step.component.html'
})
export class MarqueeWizardStepComponent extends WizardStepComponent {

    @Input() icon: string;
    @Input() completed: boolean = false;
    @Output() completedChange = new EventEmitter<boolean>();
    
    get valid(): boolean {
        return this._valid;
    }

    set valid(valid: boolean) {
        this._valid = valid;

        if (this._marqueeWizardService) {
            this._marqueeWizardService.valid$.next({ step: this, valid: valid });
        }
    }

    private _valid: boolean = true;

    constructor(private _marqueeWizardService: MarqueeWizardService) {
        super();
    }

    /**
     * Update the completed state and emit the latest value
     * @param completed whether or not the step is completed
     */
    setCompleted(completed: boolean): void {
        this.completed = completed;
        this.completedChange.emit(completed);
    }
}