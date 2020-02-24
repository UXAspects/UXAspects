import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, Output, Renderer2, TemplateRef } from '@angular/core';
import { WizardStepComponent } from '../wizard/index';
import { MarqueeWizardStepIconDirective } from './marquee-wizard-step-icon.directive';
import { MarqueeWizardService } from './marquee-wizard.service';

@Component({
    selector: 'ux-marquee-wizard-step',
    templateUrl: './marquee-wizard-step.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeWizardStepComponent extends WizardStepComponent {

    /** Determine the completed state of this step */
    @Input() completed: boolean = false;

    /** Emit when the completed step changes */
    @Output() completedChange = new EventEmitter<boolean>();

    /** Detect if an icon has been defined using the directive */
    @ContentChild(MarqueeWizardStepIconDirective, { read: TemplateRef, static: false }) _iconTemplate: TemplateRef<void>;

    get valid(): boolean {
        return this._valid;
    }

    set valid(valid: boolean) {
        this._valid = valid;

        if (this._marqueeWizardService) {
            this._marqueeWizardService.valid$.next({ step: this, valid: valid });
        }
    }

    /** Store the validity of the current step */
    private _valid: boolean = true;

    constructor(
        changeDetector: ChangeDetectorRef,
        elementRef: ElementRef,
        renderer: Renderer2,
        private readonly _marqueeWizardService: MarqueeWizardService
    ) {
        super(changeDetector, elementRef, renderer);
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