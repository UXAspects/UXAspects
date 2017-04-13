import { ControlValueAccessor } from '@angular/forms';
export declare const RADIOBUTTON_VALUE_ACCESSOR: any;
export declare class RadioButtonComponent implements ControlValueAccessor {
    simplified: boolean;
    disabled: boolean;
    name: string;
    clickable: boolean;
    option: any;
    id: string;
    private model;
    private onTouchedCallback;
    private onChangeCallback;
    checkItem(): void;
    keyDown(event: KeyboardEvent): void;
    writeValue(value: boolean): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
}
