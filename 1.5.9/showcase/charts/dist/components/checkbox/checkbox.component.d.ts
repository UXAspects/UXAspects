import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const CHECKBOX_VALUE_ACCESSOR: any;
export declare class CheckboxComponent implements ControlValueAccessor {
    name: string;
    clickable: boolean;
    disabled: boolean;
    simplified: boolean;
    indeterminateValue: any;
    valueChange: EventEmitter<any>;
    value: any;
    private _value;
    onTouchedCallback: () => void;
    onChangeCallback: (_: any) => void;
    constructor();
    toggleChecked(): void;
    keyDown(event: KeyboardEvent): void;
    writeValue(value: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
