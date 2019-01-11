import { coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

let uniqueId = 0;

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

    @Input() id: string = `ux-number-picker-${uniqueId++}`;
    @Input() valid: boolean = true;
    @Input('aria-labelledby') labelledBy: string;
    @Output() valueChange = new EventEmitter<number>();

    @Input()
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
        this._min = coerceNumberProperty(value);
    }

    @Input()
    get max(): number {
        return this._max;
    }

    set max(value) {
        this._max = coerceNumberProperty(value);
    }

    @Input()
    get step(): number {
        return this._step;
    }

    set step(value) {
        this._step = coerceNumberProperty(value);
    }

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

        // get the distance scrolled
        const scrollValue = event.deltaY || (event as any).wheelDelta;

        // increment or decrement accordingly
        scrollValue < 0 ? this.increment(event) : this.decrement(event);
    }

    writeValue(value: number): void {
        if (value !== undefined) {
            this._value = value;
        }
    }

    registerOnChange(fn: (_: any) => {}): void {
        this._propagateChange = fn;
    }

    registerOnTouched(fn: (_: any) => {}): void { }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

}