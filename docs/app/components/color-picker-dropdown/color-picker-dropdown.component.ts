import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ColorPickerColor,
  ColorPickerModule,
  IconModule,
  MenuModule,
  MenuTriggerDirective,
} from '@ux-aspects/ux-aspects';

@Component({
  selector: 'uxd-color-picker-dropdown',
  templateUrl: './color-picker-dropdown.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MenuModule, IconModule, ColorPickerModule],
})
export class ColorPickerDropdownComponent {
  @ViewChild(MenuTriggerDirective) menuTrigger?: MenuTriggerDirective;

  /** Colors to display on color picker widget. */
  @Input() colors: ColorPickerColor[][];

  /** Selected color for color picker. */
  @Input() selected: ColorPickerColor;

  /** Emit when the currently selected value changes. */
  @Output() selectedChange = new EventEmitter<ColorPickerColor>();

  close(): void {
    this.menuTrigger?.closeMenu();
  }

  onColorPickerSelectedChange(color: ColorPickerColor): void {
    this.selectedChange.emit(color);
    this.close();
  }
}
