import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const NUMBER_PICKER_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberPickerComponent),
    multi: true
};

@Component({
    selector: 'ux-number-picker',
    templateUrl: './number-picker.component.html',
    providers: [NUMBER_PICKER_VALUE_ACCESSOR],
    host: {
        '[class.has-error]': '!isValid()'
    }
})
export class NumberPickerComponent implements ControlValueAccessor {

    private _min: number = -Infinity;
    private _max: number = Infinity;
    private _step: number = 1;
    private _disabled: boolean = false;
    private _value: number = 0;
    private _propagateChange = (_: any) => { };

    @Input() valid: boolean = true;
    @Output() valueChange = new EventEmitter<number>();

    @Input('value')
    get value(): number {
        return this._value;
    }
    set value(value: number) {
        this._value = value;
        this.valueChange.emit(value);
        this._propagateChange(value);
    }

    @Input()
    get min(): number {
        return this._min;
    }
    set min(value) {
        this._min = typeof value === 'string' ? parseFloat(value) : value;
    }

    @Input()
    get max(): number {
        return this._max;
    }
    set max(value) {
        this._max = typeof value === 'string' ? parseFloat(value) : value;
    }

    @Input()
    get step(): number {
        return this._step;
    }
    set step(value) {
        this._step = typeof value === 'string' ? parseFloat(value) : value;
    }

    @Input()
    get disabled(): boolean {
        return this._disabled;
    }
    set disabled(value) {
        this._disabled = typeof value === 'string' && (value === '' || value === 'true' || value === 'disabled') || value === true;
    }

    increment(event: MouseEvent | KeyboardEvent): void {
        event.preventDefault();

        if (!this.disabled) {
            this.value = Math.max(Math.min(this.value + this.step, this.max), this.min);
        }
    }

    decrement(event: MouseEvent | KeyboardEvent): void {
        event.preventDefault();

        if (!this.disabled) {
            this.value = Math.min(Math.max(this.value - this.step, this.min), this.max);
        }
    }

    isValid(): boolean {
        if (this.value < this.min || this.value > this.max) {
            return false;
        }

        return this.valid;
    }

    onScroll(event: WheelEvent): void {

        let scrollValue = event.deltaY || event.wheelDelta;

        if (scrollValue < 0) {
            this.increment(event);
        } else {
            this.decrement(event);
        }
    }

    writeValue(value: any): void {
        if (value !== undefined) {
            this._value = value;
        }
    }

    registerOnChange(fn: any): void {
        this._propagateChange = fn;
    }

    registerOnTouched(fn: any): void { }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

}