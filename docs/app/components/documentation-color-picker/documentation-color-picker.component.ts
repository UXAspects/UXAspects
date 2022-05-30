import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewChild } from "@angular/core";
import { ColorPickerColor, MenuItemType, MenuTriggerDirective } from "@ux-aspects/ux-aspects";

@Component({
    selector: 'uxd-documentation-color-picker',
    templateUrl: './documentation-color-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styleUrls: ['./documentation-color-picker.component.less']
})
export class DocumentationColorPickerComponent {

    @ViewChild(MenuTriggerDirective) menuTrigger?: MenuTriggerDirective;

    /** Colors to display on color picker widget. */
    @Input() colors: ColorPickerColor[][];

    /** Selected color for color picker. */
    @Input() selected: ColorPickerColor;

    /** Emit when the currently selected value changes. */
    @Output() selectedChange = new EventEmitter<ColorPickerColor>();

    menuItemType: MenuItemType = MenuItemType.Custom;

    close(): void {
        this.menuTrigger?.closeMenu();
    }

    onColorPickerSelectedChange(color: ColorPickerColor): void {
        this.selectedChange.next(color);
        this.close();
    }
}