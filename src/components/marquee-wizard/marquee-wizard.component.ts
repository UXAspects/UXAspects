import { Component, ContentChildren, Input, QueryList, TemplateRef } from '@angular/core';
import { filter } from 'rxjs/operators';
import { WizardComponent } from '../wizard/index';
import { MarqueeWizardStepComponent } from './marquee-wizard-step.component';
import { MarqueeWizardService, MarqueeWizardValidEvent } from './marquee-wizard.service';

@Component({
    selector: 'ux-marquee-wizard',
    templateUrl: './marquee-wizard.component.html',
    providers: [ MarqueeWizardService ]
})
export class MarqueeWizardComponent extends WizardComponent {

    @Input() description: string | TemplateRef<any>;
    @ContentChildren(MarqueeWizardStepComponent) steps = new QueryList<MarqueeWizardStepComponent>();

    get isTemplate(): boolean {
        return this.description && this.description instanceof TemplateRef;
    }

    constructor(marqueeWizardService: MarqueeWizardService) {
        super();

        marqueeWizardService.valid$.pipe(filter((event: MarqueeWizardValidEvent) => !event.valid))
            .subscribe(this.validChange.bind(this));
    }

    /**
     * If the current step is valid, mark it as
     * complete and go to the next step
     */
    next(): void {

        // get the current step
        const step = this.getCurrentStep() as MarqueeWizardStepComponent;

        if (step.valid) {
            super.next();

            // mark this step as completed
            step.setCompleted(true);
        } else {
            this.stepError.next(this.step);
        }
    }

    /**
     * Emit the onFinishing event and if valid the onFinish event.
     * Also mark the final step as completed if it is valid
     */
    finish(): Promise<void> {

        // get the current step
        const step = this.getCurrentStep() as MarqueeWizardStepComponent;

        // call the original finish function
        return super.finish().then(() => {
            // if the step is valid indicate that it is now complete
            if (step.valid) {
                step.setCompleted(true);
            } else {
                this.stepError.next(this.step);
            }
        });
    }

    /**
     * If a step in the wizard becomes invalid, all steps sequentially after
     * it, should become unvisited and incomplete
     */
    validChange(state: MarqueeWizardValidEvent): void {

        const steps = this.steps.toArray();
        const current = steps.findIndex(step => step === state.step);
        const affected = steps.slice(current);

        affected.forEach(step => {

            // the step should no longer be completed
            step.completed = false;

            // if the step is not the current step then also mark it as unvisited
            if (step !== state.step) {
                step.visited = false;
            }
        });

    }
}