import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const NUMBER_PICKER_VALUE_ACCESSOR: any;
export declare class NumberPickerComponent implements ControlValueAccessor {
    private _min;
    private _max;
    private _step;
    private _disabled;
    private _value;
    private _propagateChange;
    valid: boolean;
    valueChange: EventEmitter<number>;
    value: number;
    min: number;
    max: number;
    step: number;
    disabled: boolean;
    increment(event: MouseEvent | KeyboardEvent): void;
    decrement(event: MouseEvent | KeyboardEvent): void;
    isValid(): boolean;
    onScroll(event: WheelEvent): void;
    writeValue(value: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
}
