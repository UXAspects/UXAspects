import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { WizardStepComponent } from '../wizard/index';
import { MarqueeWizardStepIconDirective } from './marquee-wizard-step-icon.directive';

@Component({
    selector: 'ux-marquee-wizard-step',
    templateUrl: './marquee-wizard-step.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeWizardStepComponent<TContext = any> extends WizardStepComponent {

    /** Define additional data that will be available within the stepTemplate context */
    @Input() context: TContext;

    /** Determine the completed state of this step */
    @Input() completed: boolean = false;

    /** Emit when the completed step changes */
    @Output() completedChange = new EventEmitter<boolean>();

    /** Detect if an icon has been defined using the directive */
    @ContentChild(MarqueeWizardStepIconDirective, { read: TemplateRef, static: false }) _iconTemplate: TemplateRef<void>;

    /**
     * Update the completed state and emit the latest value
     * @param completed whether or not the step is completed
     */
    setCompleted(completed: boolean): void {
        this.completed = completed;
        this.completedChange.emit(completed);
    }
}
