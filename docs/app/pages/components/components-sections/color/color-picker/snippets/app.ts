import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { ColorPickerColor, ColorService } from '@ux-aspects/ux-aspects';

@Component({
    selector: 'app',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.css']
})
export class AppComponent {
    colors: ColorPickerColor[][];
    selected: ColorPickerColor;
    columns = 4;
    buttonStyle = 'circle';
    buttonSize = 'md';
    showTooltips = false;
    showInput = false;

    isPickerOpen = true;

    @ViewChild('toggleButton') toggleButton: ElementRef;
    @ViewChild('dropdownMenu') dropdownMenu: ElementRef;

    private _colorNames = [
        ['Primary', 'Accent', 'Secondary', 'Alternate1', 'Alternate2', 'Alternate3', 'Vibrant1',
            'Vibrant2'],
        ['Grey1', 'Grey2', 'Grey3', 'Grey4', 'Grey5', 'Grey6', 'Grey7', 'Grey8']
    ];

    constructor(colorService: ColorService) {
        this.colors = this._colorNames.map(row =>
            row.map(colorName => new ColorPickerColor(colorName, colorService.resolve(colorName))));
        this.selected = this.colors[0][0];
    }

    colorPickerSelectedChange(): void {
        if (!this.showInput) {
            this.isPickerOpen = false;
        }
    }

    @HostListener('document:click', ['$event.target'])
    clickHandler(target: Node): void {
        // Close on outside click
        if (
            !this.toggleButton.nativeElement.contains(target) &&
            !this.dropdownMenu.nativeElement.contains(target)
        ) {
            this.isPickerOpen = false;
        }
    }
}