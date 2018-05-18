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

    @Input() set value(value: any) {
        console.log(value);
        this._value = value;
        this.valueChange.next(value);

        this.onTouchedCallback();
        this.onChangeCallback(value);
    }

    get value(): any {
        return this._value;
    }

    @Input() type: string = 'text';
    @Input() min: string;
    @Input() max: string;
    @Input() placeholder: string = '';
    @Input() disabled: boolean = false;
    @Input() spinners: boolean = true;
    @Input() readOnly: boolean = true;
    @Input() scrolling: boolean = true;
    @Input() arrowkeys: boolean = true;

    @Input() incrementAriaLabel: string;
    @Input() inputAriaLabel: string;
    @Input() decrementAriaLabel: string;

    @Output() valueChange = new EventEmitter<any>();

    @Output() increment = new EventEmitter<void>();
    @Output() decrement = new EventEmitter<void>();

    onTouchedCallback: () => void = () => { };
    onChangeCallback: (_: Date) => void = () => { };

    private _value: any;

    scroll(event: MouseWheelEvent): void {

        if (!this.scrolling) {
            return;
        }

        if (event.wheelDelta > 0) {
            this.triggerIncrement();
        } else {
            this.triggerDecrement();
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

    writeValue(value: any): void {
        this.value = value;
    }

    registerOnChange(fn: (_: any) => void): void {
        this.onChangeCallback = fn;
    }

    registerOnTouched(fn: () => void): void {
        this.onTouchedCallback = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

}