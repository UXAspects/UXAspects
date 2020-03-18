import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, HostBinding, Input, Renderer2 } from '@angular/core';

@Component({
    selector: 'ux-wizard-step',
    templateUrl: './wizard-step.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    host: {
        'role': 'tabpanel'
    }
})
export class WizardStepComponent {

    /** The text to be displayed in the wizard step tab. */
    @Input() header: string;

    /**
     * If set to `true` the 'Next' or 'Finish' button will become disabled when the current step is invalid.
     * This will override the value set on the `ux-wizard`.
     */
    @Input() disableNextWhenInvalid: boolean | undefined;

    /** Allows you to define whether or not a step is valid. The user will not be able to proceed to the next step if this property has a value of false. */
    @Input() valid: boolean = true;

    /** Emits when visited changes. */
    @Input() visitedChange = new EventEmitter<boolean>();

    /**
     * A custom function which returns the validation status for the step. This function will be called when 'Next' or
     * 'Finish' is clicked. A promise may be returned if asynchronous validation is required. If using this property,
     * ensure that `disableNextWhenInvalid` is false.
     */
    @Input() validator: () => boolean | Promise<boolean>;

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

        // mark for change detection
        this._changeDetector.markForCheck();
    }

    @HostBinding('attr.aria-expanded')
    get active(): boolean {
        return this._active;
    }

    constructor(
        private readonly _changeDetector: ChangeDetectorRef,
        private readonly _elementRef: ElementRef,
        private readonly _renderer: Renderer2) { }

    setId(id: string): void {
        this._renderer.setAttribute(this._elementRef.nativeElement, 'id', id);
        this._renderer.setAttribute(this._elementRef.nativeElement, 'aria-labelledby', `${id}-label`);
    }
}