import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, OnDestroy, Optional, Output, OnChanges } from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

let uniqueId = 0;

export const NUMBER_PICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberPickerComponent),
    multi: true
};

@Component({
    selector: 'ux-number-picker, ux-number-picker-inline',
    templateUrl: './number-picker.component.html',
    providers: [NUMBER_PICKER_VALUE_ACCESSOR],
    host: {
        '[class.ux-number-picker-invalid]': '!_valid && !disabled && !_formGroup'
    }
})
export class NumberPickerComponent implements ControlValueAccessor, OnDestroy, OnChanges {
    private _min: number = -Infinity;
    private _max: number = Infinity;
    private _step: number = 1;
    private _disabled: boolean = false;
    private _value: number = 0;
    private _lastValue: number;
    private _propagateChange = (_: number) => {};
    _touchedChange = () => {};


    /** Sets the id of the number picker. The child input will have this value with a -input suffix as its id. */
    @Input() id: string = `ux-number-picker-${uniqueId++}`;

    /** Can be used to show a red outline around the input to indicate an invalid value. By default the error state will appear if the user enters a number below the minimum value or above the maximum value. */
    @Input() valid: boolean = true;

    /** Provide an aria labelledby attribute */
    @Input('aria-labelledby') labelledBy: string;

    /** Define the precision of floating point values */
    @Input() precision: number = 6;

    /** If two way binding is used this value will be updated any time the number picker value changes. */
    @Output() valueChange = new EventEmitter<number>();

    /** Sets the value displayed in the number picker component. */
    @Input()
    get value(): number {
        return this._value;
    }

    set value(value: number) {
        if (this._value !== value) {
            this._value = value;
            this._valid = this.isValid();
        }
    }

    /** Defines the minimum value the number picker can set. */
    @Input()
    get min(): number {
        return this._min;
    }

    set min(value) {
        this._min = coerceNumberProperty(value);
    }

    /** Defines the maximum value the number picker can set. */
    @Input()
    get max(): number {
        return this._max;
    }

    set max(value) {
        this._max = coerceNumberProperty(value);
    }

    /** Defines the amount the number picker should increase or decrease when the buttons or arrow keys are used. */
    @Input()
    get step(): number {
        return this._step;
    }

    set step(value) {
        this._step = coerceNumberProperty(value);
    }

    /** Indicate if the number picker is disabled or not. */
    @Input()
    get disabled(): boolean {
        return this._disabled;
    }

    set disabled(value) {
        this._disabled = coerceBooleanProperty(value);
    }

    get inputId(): string {
        return this.id + '-input';
    }

    /** Store the current valid state */
    _valid: boolean = true;

    /** This is a flag to indicate when the component has been destroyed to avoid change detection being made after the component
     *  is no longer instantiated. A workaround for Angular Forms bug (https://github.com/angular/angular/issues/27803) */
    private _isDestroyed: boolean = false;

    constructor(
        private _changeDetector: ChangeDetectorRef,
        @Optional() public _formGroup: FormGroupDirective
    ) {}

    ngOnChanges(): void {
        this._valid = this.isValid();
    }

    ngOnDestroy(): void {
        this._isDestroyed = true;
    }

    increment(event?: MouseEvent | KeyboardEvent): void {
        if (event) {
            event.preventDefault();
        }

        if (!this.disabled) {
            this.value = Math.max(Math.min(this.value + this.step, this.max), this.min);

            // account for javascripts terrible handling of floating point numbers
            this.value = parseFloat(this.value.toPrecision(this.precision));

            // emit the value to the Output and Angular forms
            this._emitValueChange(this.value);
        }
    }

    decrement(event?: MouseEvent | KeyboardEvent): void {
        if (event) {
            event.preventDefault();
        }

        if (!this.disabled) {
            this.value = Math.min(Math.max(this.value - this.step, this.min), this.max);

            // account for javascripts terrible handling of floating point numbers
            this.value = parseFloat(this.value.toPrecision(this.precision));

            // emit the value to the Output and Angular forms
            this._emitValueChange(this.value);
        }
    }

    isValid(): boolean {
        if (this.value < this.min || this.value > this.max) {
            return false;
        }

        return this.valid;
    }

    onScroll(event: WheelEvent): void {
        // get the distance scrolled
        const scrollValue = event.deltaY || (event as any).wheelDelta;

        // increment or decrement accordingly
        scrollValue < 0 ? this.increment(event) : this.decrement(event);
    }

    writeValue(value: number): void {
        if (value !== undefined) {
            this._value = value;
            this._valid = this.isValid();
            // if the component is not destroyed then run change detection
            // workaround for Angular bug (https://portal.digitalsafe.net/browse/EL-3694)
            if (!this._isDestroyed) {
                this._changeDetector.detectChanges();
            }
        }
    }

    registerOnChange(fn: (_: number) => {}): void {
        this._propagateChange = fn;
    }

    registerOnTouched(fn: () => {}): void {
        this._touchedChange = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    _emitValueChange(value: number): void {
        // Set the value and emit the change to the output and Angular forms.
        // This is a workaround for angular bug https://github.com/angular/angular/issues/12540
        if (value === this._lastValue) {
            return;
        }
        this._lastValue = value;
        this.valueChange.emit(value);
        this._propagateChange(value);
    }

}

