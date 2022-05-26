import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ColorPickerColor, ColorService, MenuItemType, MenuTriggerDirective } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent implements AfterViewInit {

    @ViewChild(MenuTriggerDirective) menuTrigger?: MenuTriggerDirective;

    colors: ColorPickerColor[][];
    selected: ColorPickerColor;
    columns = 4;
    buttonStyle = 'circle';
    buttonSize = 'md';
    showTooltips = false;
    showInput = false;
    menuItemType: MenuItemType = MenuItemType.Custom;

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

    ngAfterViewInit(): void {
        this.menuTrigger.openMenu();
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
