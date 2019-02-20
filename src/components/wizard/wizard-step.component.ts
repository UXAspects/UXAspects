import { Component, EventEmitter, HostBinding, Input } from '@angular/core';

@Component({
    selector: 'ux-wizard-step',
    templateUrl: './wizard-step.component.html',
    host: {
        'role': 'tabpanel',
        '[attr.aria-labelledby]': 'id + "-label"'
    }
})
export class WizardStepComponent {

    /** The text to be displayed in the wizard step tab. */
    @Input() header: string;

    /** Allows you to define whether or not a step is valid. The user will not be able to proceed to the next step if this property has a value of false. */
    @Input() valid: boolean = true;

    /** Emits when visited changes. */
    @Input() visitedChange = new EventEmitter<boolean>();

    private _active: boolean = false;
    private _visited: boolean = false;

    /**
     * Defines whether or not this step has previously been visited.
     * A visited step can be clicked on and jumped to at any time.
     * By default, steps will become 'visited' when the user navigates to a step for the first time.
     */
    @Input()
    get visited(): boolean {
        return this._visited;
    }

    set visited(value: boolean) {
        this._visited = value;
        this.visitedChange.next(value);
    }

    set active(value: boolean) {

        // store the active state of the step
        this._active = value;

        // if the value is true then the step should also be marked as visited
        if (value === true) {
            this.visited = true;
        }
    }

    @HostBinding('attr.aria-expanded')
    get active(): boolean {
        return this._active;
    }

    @HostBinding('id') id: string;
}