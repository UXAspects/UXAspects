import { EventEmitter } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
export declare const RADIOBUTTON_VALUE_ACCESSOR: any;
export declare class RadioButtonComponent implements ControlValueAccessor {
    id: string;
    simplified: boolean;
    disabled: boolean;
    name: string;
    clickable: boolean;
    option: any;
    valueChange: EventEmitter<any>;
    value: boolean;
    private _value;
    onTouchedCallback: () => void;
    onChangeCallback: (_: any) => void;
    checkItem(): void;
    keyDown(event: KeyboardEvent): void;
    writeValue(value: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
