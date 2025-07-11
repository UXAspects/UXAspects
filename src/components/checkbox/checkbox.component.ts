import { FocusOrigin } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  ExistingProvider,
  forwardRef,
  inject,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { FocusIndicatorDirective } from '../../directives/accessibility';
import { FocusableItemToken } from '../menu';
import { FocusableControl } from '../menu/interfaces/focusable-control.interface';

export const CHECKBOX_VALUE_ACCESSOR: ExistingProvider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckboxComponent),
  multi: true,
};

let uniqueCheckboxId = 0;

@Component({
  selector: 'ux-checkbox',
  templateUrl: './checkbox.component.html',
  providers: [
    CHECKBOX_VALUE_ACCESSOR,
    {
      provide: FocusableItemToken,
      useExisting: CheckboxComponent,
    },
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class CheckboxComponent<T = number> implements ControlValueAccessor, FocusableControl {
  private readonly _changeDetector = inject(ChangeDetectorRef);

  /** Provide a default unique id value for the checkbox */
  _checkboxId: string = `ux-checkbox-${++uniqueCheckboxId}`;

  /** Determines if the checkbox should be checked, unchecked or indeterminate. */
  @Input() id: string = this._checkboxId;

  /** Specifies the form name of the element. */
  @Input() name: string | null;

  /** Determines if the checkbox should be checked, unchecked or indeterminate. */
  @Input() value: boolean | T = false;

  /** Specified if this is a required input. */
  @Input() required: boolean;

  /** Specifies the tabindex of the input. */
  @Input() tabindex: number = 0;

  /** If set to `true` the checkbox will not toggle state when clicked. */
  @Input() clickable: boolean = true;

  /** If set to `true` the checkbox will be displayed without a border and background. */
  @Input() simplified: boolean = false;

  /**
   * If `value` is set to the indeterminate value specified using this attribute, it will neither
   * display the checkbox as checked or unchecked, and will instead show the indeterminate variation.
   */
  @Input() indeterminateValue: T | number = -1;

  /** Specify if the checkbox should be disabled. */
  @Input() disabled: boolean = false;

  /** Provide an aria label for the checkbox. */
  @Input('aria-label') ariaLabel: string = '';

  /** Provide an aria-labelled by property for the checkbox. */
  @Input('aria-labelledby') ariaLabelledby: string = null;

  /** Emits when `value` has been changed. */
  @Output() valueChange = new EventEmitter<boolean | T>();

  /** Determine if the underlying input component has been focused with the keyboard */
  _focused: boolean = false;

  /** Used to inform Angular forms that the component has been touched */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onTouchedCallback: () => void = () => {};

  /** Used to inform Angular forms that the component value has changed */
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onChangeCallback: (_: boolean | T) => void = () => {};

  /** Get the focus indicator to set focus */
  @ViewChild(FocusIndicatorDirective)
  _focusIndicator?: FocusIndicatorDirective;

  /** Toggle the current state of the checkbox */
  toggle(): void {
    if (this.disabled || !this.clickable) {
      return;
    }

    if (this.value === this.indeterminateValue) {
      this.value = true;
    } else {
      // toggle the checked state
      this.value = !this.value;
    }

    // emit the value
    this.valueChange.emit(this.value);

    // update the value if used within a form control
    this.onChangeCallback(this.value);

    // mark the component as touched
    this.onTouchedCallback();
  }

  // Functions required to update ngModel
  writeValue(value: boolean | T): void {
    if (value !== this.value) {
      this.value = value;
      this._changeDetector.markForCheck();
    }
  }

  /** Allow Angular forms for provide us with a callback for when the input value changes */
  registerOnChange(fn: (_: boolean | T) => void): void {
    this.onChangeCallback = fn;
  }

  /** Allow Angular forms for provide us with a callback for when the touched state changes */
  registerOnTouched(fn: () => void): void {
    this.onTouchedCallback = fn;
  }

  /** Allow Angular forms to disable the component */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
    this._changeDetector.markForCheck();
  }

  /** Focus the input element */
  focus(origin: FocusOrigin): void {
    this._focusIndicator.focus(origin);
  }

  setInputTabIndex(tabindex: number): void {
    this.tabindex = tabindex;
    this._changeDetector.markForCheck();
  }
}
