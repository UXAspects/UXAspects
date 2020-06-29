import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { WizardStep } from './wizard-step';
import { WizardService } from './wizard.service';


@Component({
    selector: 'ux-wizard-step',
    templateUrl: './wizard-step.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'role': 'tabpanel'
    }
})
export class WizardStepComponent implements WizardStep {

    /** The text to be displayed in the wizard step tab. */
    @Input() header: string;

    /**
     * If set to `true` the 'Next' or 'Finish' button will become disabled when the current step is invalid.
     * This will override the value set on the `ux-wizard`.
     */
    @Input() disableNextWhenInvalid: boolean | undefined;

    /**
     * Defines whether a step is valid. The user will not be able to proceed to the next step if this property has a value of false.
     * If the new value is false is will also set the visited value to false.
     */
    protected _valid: boolean = true;

    @Input()
    set valid(value: boolean) {
        this.setValid(value);
    }

    get valid(): boolean {
        return this._valid;
    }

    /**
     * A custom function which returns the validation status for the step. This function will be called when 'Next' or
     * 'Finish' is clicked. A promise may be returned if asynchronous validation is required. If using this property,
     * ensure that `disableNextWhenInvalid` is false.
     */
    @Input() validator: () => boolean | Promise<boolean>;

    /**
     * Defines whether or not this step has previously been visited.
     * A visited step can be clicked on and jumped to at any time.
     * By default, steps will become 'visited' when the user navigates to a step for the first time.
     */
    @Input() visited: boolean = false;

    /**
     * Defines the currently visible step.
     */
    protected _active: boolean = false;

    set active(value: boolean) {

        // store the active state of the step
        this._active = value;

        // if the value is true then the step should also be marked as visited
        if (value === true) {
            this.visited = true;
        }

        // mark for change detection
        this._changeDetector.markForCheck();
    }

    /** Emits when visited changes. */
    @Output() visitedChange = new EventEmitter<boolean>();

    get active(): boolean {
        return this._active;
    }

    constructor(
        private readonly _wizardService: WizardService,
        private readonly _changeDetector: ChangeDetectorRef) { }

    setVisited(value: boolean): void {
        this.visited = value;
        this.visitedChange.emit(value);
    }

    protected setValid(value: boolean): void {
        if (this._valid === value) {
            return;
        }

        this._valid = value;

        requestAnimationFrame(() => {
            this.setVisited(value);
            this._wizardService.valid$.next({ step: this, valid: value });
        });
    }
}
