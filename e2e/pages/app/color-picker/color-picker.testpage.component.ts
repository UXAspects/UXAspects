import { Component, ViewChild } from '@angular/core';
import { ColorPickerColor, ColorService, MenuTriggerDirective } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app-color-picker',
    templateUrl: 'color-picker.testpage.component.html'
})

export class ColorPickerTestPageComponent {

    @ViewChild(MenuTriggerDirective) menuTrigger?: MenuTriggerDirective;

    colors: ColorPickerColor[][];
    selected: ColorPickerColor;
    columns = 4;
    buttonStyle = 'circle';
    buttonSize = 'md';
    showTooltips = false;
    showInput = false;

    private _colorNames = [
        [
            'Primary',
            'Accent',
            'Secondary',
            'Alternate1',
            'Alternate2',
            'Alternate3',
            'Vibrant1',
            'Vibrant2'
        ],
        ['Grey1', 'Grey2', 'Grey3', 'Grey4', 'Grey5', 'Grey6', 'Grey7', 'Grey8']
    ];

    constructor(colorService: ColorService) {
        this.colors = this._colorNames.map(row =>
            row.map(colorName => new ColorPickerColor(colorName, colorService.resolve(colorName))));
        this.selected = this.colors[0][0];
    }

    close(): void {
        this.menuTrigger?.closeMenu();
    }

    onColorPickerSelectedChange(): void {
        if (!this.showInput) {
            this.close();
        }
    }
}
