import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChild, EventEmitter, Input, OnInit, Output, TemplateRef } from '@angular/core';
import { WizardStepComponent } from '../wizard/index';
import { MarqueeWizardStepIconDirective } from './marquee-wizard-step-icon.directive';
import { MarqueeWizardService } from './marquee-wizard.service';

@Component({
    selector: 'ux-marquee-wizard-step',
    templateUrl: './marquee-wizard-step.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MarqueeWizardStepComponent extends WizardStepComponent implements OnInit {

    /** @deprecated Define the icon to display - use `uxMarqueeWizardStepIcon directive instead */
    @Input() icon: string;

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

    private _valid: boolean = true;

    constructor(
        changeDetector: ChangeDetectorRef,
        private readonly _marqueeWizardService: MarqueeWizardService
    ) {
        super(changeDetector);
    }

    ngOnInit(): void {
        if (this.icon) {
            console.warn(`Marquee wizard step [icon] property has been deprecated. Instead use the '*uxMarqueeWizardStepIcon' directive.`);
        }
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