import { BooleanInput, coerceBooleanProperty, coerceNumberProperty } from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  Output,
  forwardRef,
  inject,
} from '@angular/core';
import { ControlValueAccessor, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';

let uniqueId = 0;

export const NUMBER_PICKER_VALUE_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => NumberPickerComponent),
  multi: true,
};

@Component({
  selector: 'ux-number-picker, ux-number-picker-inline',
  templateUrl: './number-picker.component.html',
  providers: [NUMBER_PICKER_VALUE_ACCESSOR],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class.ux-number-picker-invalid]': '!_valid && !disabled && !_formGroup',
  },
  standalone: false,
})
export class NumberPickerComponent implements ControlValueAccessor, OnDestroy, OnChanges {
  readonly _formGroup = inject(FormGroupDirective, { optional: true });

  private readonly _changeDetector = inject(ChangeDetectorRef);

  private _min: number;
  private _max: number;
  private _step: number | ((value: number, direction: StepDirection) => number) = 1;
  private _disabled: boolean = false;
  private _value: number = 0;
  private _lastValue: number;
  private _focused: boolean = false;
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private _propagateChange = (_: number) => {};
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  _touchedChange = () => {};

  /** Sets the id of the number picker. The child input will have this value with a -input suffix as its id. */
  @Input() id: string = `ux-number-picker-${uniqueId++}`;

  /** Provide an aria label for the number picker. */
  @Input('aria-label') ariaLabel: string;

  /** Provide an aria labelledby attribute */
  @Input('aria-labelledby') labelledBy: string;

  /** Define the precision of floating point values */
  @Input() precision: number = Number.MAX_SAFE_INTEGER.toString().length - 1;

  /** The placeholder text which appears in the text input area when it is empty.*/
  @Input() placeholder: string;

  /** Specified if this is a required input. */
  @Input() required: boolean;

  /** Specified if this is a readonly input. */
  @Input() set readonly(value: boolean) {
    this._readonly = coerceBooleanProperty(value);
  }

  get readonly(): boolean {
    return this._readonly;
  }

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
  set step(value: number | ((value: number, direction: StepDirection) => number)) {
    if (typeof value === 'function') {
      this._step = value;
    } else {
      this._step = coerceNumberProperty(value);
    }
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
  private _readonly: boolean = false;

  ngOnChanges(): void {
    this._valid = this.isValid();
  }

  ngOnDestroy(): void {
    this._isDestroyed = true;
  }

  getStep(direction: StepDirection): number {
    return typeof this._step === 'number' ? this._step : this._step(this.value, direction);
  }

  increment(event?: MouseEvent | KeyboardEvent): void {
    if (event) {
      event.preventDefault();
    }

    if (!this.disabled && !this.readonly) {
      this.value = Math.max(
        Math.min(
          this.value + this.getStep(StepDirection.Increment),
          this.getMaxValueForComparison()
        ),
        this.getMinValueForComparison()
      );

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

    if (!this.disabled && !this.readonly) {
      this.value = Math.min(
        Math.max(
          this.value - this.getStep(StepDirection.Decrement),
          this.getMinValueForComparison()
        ),
        this.getMaxValueForComparison()
      );

      // account for javascripts terrible handling of floating point numbers
      this.value = parseFloat(this.value.toPrecision(this.precision));

      // emit the value to the Output and Angular forms
      this._emitValueChange(this.value);
    }
  }

  isValid(): boolean {
    return (
      this.value >= this.getMinValueForComparison() && this.value <= this.getMaxValueForComparison()
    );
  }

  onScroll(event: WheelEvent): void {
    if (!this._focused) {
      return;
    }
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

  registerOnChange(fn: (_: number) => void): void {
    this._propagateChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this._touchedChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetector.markForCheck();
  }

  /** Set the value and emit the change to the output and Angular forms. */
  _emitValueChange(value: number): void {
    // This is a workaround for angular bug https://github.com/angular/angular/issues/12540
    if (value === this._lastValue) {
      return;
    }
    this._lastValue = value;
    this.valueChange.emit(value);
    this._propagateChange(value);
  }

  getMaxValueForComparison(): number {
    return this.max === undefined || this.max === null ? Infinity : this.max;
  }

  getMinValueForComparison(): number {
    return this.min === undefined || this.min === null ? -Infinity : this.min;
  }

  @HostListener('focusin')
  onFocusIn(): void {
    this._focused = true;
  }

  @HostListener('focusout')
  onFocusOut(): void {
    this._focused = false;
  }

  static ngAcceptInputType_readonly: BooleanInput;
}

export enum StepDirection {
  Increment,
  Decrement,
}
