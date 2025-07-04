import { FocusOrigin } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, forwardRef, inject, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusIndicatorDirective } from '../../directives/accessibility';
import { FocusableItemToken } from '../menu';
import { FocusableControl } from '../menu/interfaces/focusable-control.interface';
import { RadioButtonGroupDirective } from './radio-button-group/radio-button-group.directive';

export const RADIOBUTTON_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioButtonComponent),
    multi: true
};

let uniqueRadioId = 0;

@Component({
    selector: 'ux-radio-button',
    templateUrl: './radiobutton.component.html',
    providers: [RADIOBUTTON_VALUE_ACCESSOR, {
            provide: FocusableItemToken,
            useExisting: RadioButtonComponent
        }],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class RadioButtonComponent<T = unknown> implements ControlValueAccessor, OnChanges, FocusableControl {
    private readonly _changeDetector = inject(ChangeDetectorRef);

    private readonly _group = inject(RadioButtonGroupDirective, { optional: true });

    /** Provide a default unique id value for the radiobutton */
    _radioButtonId: string = `ux-radio-button-${++uniqueRadioId}`;

    /** Specify a unique Id for this component */
    @Input() id: string = this._radioButtonId;

    /** Specify a form name for the input element */
    @Input() name: string | null;

    /** Specify the role of the input element. */
    @Input() inputRole: string;

    /** This should be a two way binding and will store the currently selected option. Each radio button in the same group should have the same value variable. */
    @Input() value: T;

    /** Specify if this is a required input */
    @Input() required: boolean;

    /** Specify the tabindex */
    @Input() tabindex: number;

    /** If set to `true` the radio button will not change state when clicked. */
    @Input() clickable: boolean = true;

    /** If this value is set to `true` then the radio button will be disabled */
    @Input() disabled: boolean = false;

    /** If set to `true` the checkbox will be displayed without a border and background. */
    @Input() simplified: boolean = false;

    /**
     * This should contain the value that this radio button represents. This will be stored in the value variable when the radio button is selected.
     * No two radio buttons should have the same option value within the same group of radio buttons.
     */
    @Input() option: T;

    /** Specify an aria label for the input element */
    @Input('aria-label') ariaLabel: string = '';

    /** Specify an aria labelledby property for the input element */
    @Input('aria-labelledby') ariaLabelledby: string = null;

    /** Specify an aria describedby property for the input element */
    @Input('aria-describedby') ariaDescribedby: string = null;

    /** Emits when the value has been changed. */
    @Output() valueChange: EventEmitter<T> = new EventEmitter<T>();

    /** Get the focus indicator to set focus */
    @ViewChild(FocusIndicatorDirective)
    _focusIndicator?: FocusIndicatorDirective;

    /** Determine if the underlying input component has been focused with the keyboard */
    _focused: boolean = false;

    /** Internally store the current tabindex */
    _internalTabindex: number = null;

    /** Used to inform Angular forms that the component has been touched */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onTouchedCallback: () => void = () => { };

    /** Used to inform Angular forms that the component value has changed */
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChangeCallback: (_: any) => void = () => { };

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.disabled && this._group && !changes.disabled.firstChange) {
            this._group.determineAndSetInternalTabIndex();
        }
    }

    /** Select the current option */
    select(): void {

        if (this.disabled || !this.clickable) {
            return;
        }

        // toggle the checked state
        this.value = this.option;

        // if there is a group set the selected value
        if (this._group) {
            this._group.value = this.option;
            this._group.emitChange(this.option);
        }

        // emit the value
        this.valueChange.emit(this.value);

        // update the value if used within a form control
        this.onChangeCallback(this.value);

        // mark the component as touched
        this.onTouchedCallback();
    }

    // Functions required to update ng-model
    writeValue(value: T): void {
        if (value !== this.value) {
            this.value = value;
            this._changeDetector.detectChanges();
        }
    }

    /** Allow Angular forms for provide us with a callback for when the input value changes */

    registerOnChange(fn: () => void): void {
        this.onChangeCallback = fn;
    }

    /** Allow Angular forms for provide us with a callback for when the touched state changes */
    registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }

    /** Allow Angular forms to disable the component */
    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this._changeDetector.markForCheck();
    }

    /** Set the internal tab index of the radio button */
    setInternalTabindex(tabIndex): void {
        this._internalTabindex = tabIndex;
        this._changeDetector.detectChanges();
    }

    /** Focus the input element */
    focus(origin: FocusOrigin): void {
        this._focusIndicator.focus(origin);
    }

    setInputTabIndex(tabindex: number): void {
        this.tabindex = tabindex;
        this._changeDetector.detectChanges();
    }
}
