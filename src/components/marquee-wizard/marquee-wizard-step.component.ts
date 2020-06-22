import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, ElementRef, EventEmitter, Input, OnChanges, Output, Renderer2, SimpleChanges, TemplateRef } from '@angular/core';
import { WizardStepComponent } from '../wizard/index';
import { MarqueeWizardStepIconDirective } from './marquee-wizard-step-icon.directive';
import { MarqueeWizardService } from './marquee-wizard.service';

@Component({
    selector: 'ux-marquee-wizard-step',
    templateUrl: './marquee-wizard-step.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeWizardStepComponent extends WizardStepComponent implements OnChanges {

    /** Determine the completed state of this step */
    @Input() completed: boolean = false;

    /** Emit when the completed step changes */
    @Output() completedChange = new EventEmitter<boolean>();

    /** Detect if an icon has been defined using the directive */
    @ContentChild(MarqueeWizardStepIconDirective, { read: TemplateRef, static: false }) _iconTemplate: TemplateRef<void>;

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

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.valid && changes.valid.currentValue !== changes.valid.previousValue) {
            this._marqueeWizardService.valid$.next({ step: this, valid: changes.valid.currentValue });
        }
    }
}
