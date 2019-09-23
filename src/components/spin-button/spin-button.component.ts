import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export const SPIN_BUTTON_VALUE_ACCESSOR: any = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SpinButtonComponent),
    multi: true
};

@Component({
    selector: 'ux-spin-button',
    templateUrl: './spin-button.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [SPIN_BUTTON_VALUE_ACCESSOR]
})
export class SpinButtonComponent implements ControlValueAccessor {

    @Input() set value(value: string | number) {
        this._value = value;
        this.onChangeCallback(value);
        this.onTouchedCallback();
    }

    get value(): string | number {
        return this._value;
    }

    @Input() type: string = 'text';
    @Input() min: number;
    @Input() max: number;
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;
    @Input() spinners: boolean = true;
    @Input() readOnly: boolean = true;
    @Input() scrolling: boolean = true;
    @Input() arrowkeys: boolean = true;
    @Input() maxLength: number = Infinity;

    @Input() incrementAriaLabel: string;
    @Input() inputAriaLabel: string;
    @Input() decrementAriaLabel: string;

    @Output() valueChange = new EventEmitter<string | number>();

    @Output() increment = new EventEmitter<void>();
    @Output() decrement = new EventEmitter<void>();

    onTouchedCallback: () => void = () => { };
    onChangeCallback: (_: string | number) => void = () => { };

    private _value: string | number;
    private _regexKeypress = RegExp(/^[0-9.,-]+$/);
    private _regexPaste = RegExp(/^\-?\d+(\.\d+)?$/);

    scroll(event: WheelEvent): void {

        if (!this.scrolling) {
            return;
        }

        if (event.deltaY > 0) {
            this.triggerDecrement();
        } else {
            this.triggerIncrement();
        }

        event.preventDefault();
    }

    triggerIncrement(): void {
        if (!this.disabled) {
            this.increment.emit();
        }
    }

    triggerDecrement(): void {
        if (!this.disabled) {
            this.decrement.emit();
        }
    }

    writeValue(value: string | number): void {
        this.value = value;
    }

    registerOnChange(fn: (_: string | number) => void): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    onKeypress(event: KeyboardEvent): boolean {

        // we only need to perform checks if the type is number
        if (this.type !== 'number') {
            return;
        }

        if (!this._regexKeypress.test(event.key)) {
            return false;
        }

        return true;
    }

    onPaste(event: ClipboardEvent): void {

        // we only need to perform checks if the type is number
        if (this.type !== 'number') {
            return;
        }

        // get the value being pasted
        const value = event.clipboardData.getData('text');

        // check if it contains the character
        if (!this._regexPaste.test(value)) {

            // inset the numeric value only if there is one
            const numericValue = parseFloat(value);

            if (!isNaN(numericValue)) {
                this.value = numericValue;
            }

            event.stopPropagation();
            event.preventDefault();
        }
    }

    onValueChange(input: HTMLInputElement, value: string): void {

        // ensure the value is not longer than the maxLength (verify value is a string in case it is
        // null or undefined, before trying to check the length.
        if (typeof value === 'string' && value.length > this.maxLength) {

            // if the type specified is a number then it may begin with a 0
            // e.g. "02", in which case if we add a second digit we should drop
            // the leading "0" and allow the non-zero number to be added
            if (this.type === 'number') {
                value = parseFloat(value).toString();
            }

            // remove any characters over the max length
            value = value.substring(0, this.maxLength);

            // We must manually update the input value in this case rather than relying
            // on Angular, as if value was previously "11" and we add an additional digit
            // e.g. "112", after performing the substring, the outputted value would again
            // be "11" which Angular would not recognize as having changed so it will not
            // update the value displayed in the input.
            input.value = value;
        }

        // emit the value after all length checks
        this.valueChange.emit(value);
    }
}