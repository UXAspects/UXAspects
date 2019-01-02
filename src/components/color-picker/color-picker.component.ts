import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ColorPickerColor } from './color-picker-color';

// Values corresponding to stylesheet
const BUTTON_MARGIN = 8;
const BUTTON_WIDTHS = {
    'sm': 26,
    'md': 32,
    'lg': 40
};

let uniqueId = 0;

@Component({
    selector: 'ux-color-picker',
    exportAs: 'ux-color-picker',
    templateUrl: 'color-picker.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerComponent implements OnInit, OnDestroy {

    @Input()
    @HostBinding('attr.id')
    id: string = `ux-color-picker-${uniqueId++}`;

    @Input()
    set colors(colors: ColorPickerInputColors[] | ColorPickerInputColors[][]) {

        let normalizedColors: ColorPickerInputColors[][];

        // If it's a 1d array, convert it to 2d
        if (colors.length === 0 || !Array.isArray(colors[0])) {
            normalizedColors = [<ColorPickerInputColors[]>colors];
        } else {
            normalizedColors = <ColorPickerInputColors[][]>colors;
        }

        // Convert any string colors to ColorPickerColor
        this._colors = normalizedColors.map(row =>
            row.map(color => color instanceof ColorPickerColor ? color : new ColorPickerColor(color, color)));
    }

    @Input()
    set selected(value: ColorPickerColor) {
        this._selected = value;
        this.setInputValue();
    }

    get selected(): ColorPickerColor {
        return this._selected;
    }

    @Input()
    columns: number = -1;

    @Input()
    buttonStyle: ColorPickerButtonStyle = 'circle';

    @Input()
    buttonSize: ColorPickerButtonSize = 'md';

    @Input()
    showTooltips: boolean = false;

    @Input()
    showInput: boolean = false;

    @Input()
    inputMode: ColorPickerInputMode = 'hex';

    @Input()
    colorAriaLabel: (color: ColorPickerColor) => string = this.getColorAriaLabel;

    @Input()
    switchModeAriaLabel: (mode: ColorPickerInputMode) => string = this.getSwitchModeAriaLabel;

    @Input()
    inputAriaLabel: (mode: ColorPickerInputMode) => string = this.getInputAriaLabel;

    @Output()
    selectedChange = new EventEmitter<ColorPickerColor>();

    @Output()
    inputSubmit = new EventEmitter<void>();

    inputPatterns = {
        'hex': /^#(?:[\da-fA-F]{3}){1,2}$/,
        'rgba': /^(?:rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\))|(?:rgba\(\d{1,3},\s*\d{1,3},\s*\d{1,3},\s*\d(\.\d+)?\))$/
    };

    // Fields that should be private but are required in the view
    _colors: ColorPickerColor[][] = [];
    _input = new FormControl(this._selection, [Validators.pattern(this._pattern)]);

    private _selected: ColorPickerColor = null;
    private _onDestroy = new Subject<void>();

    ngOnInit(): void {
        this.setInputValue();
        this._input.valueChanges.pipe(takeUntil(this._onDestroy)).subscribe(value => this.setColorValue(value));
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    @HostBinding('style.width')
    get _width(): string {
        return this.columns > 0 ? `${this.columns * (BUTTON_WIDTHS[this.buttonSize] + (2 * BUTTON_MARGIN))}px` : 'auto';
    }

    get _selection(): string {
        return this.selected ? this.selected[this.inputMode] : null;
    }

    get _pattern(): RegExp {
        return this.inputPatterns[this.inputMode];
    }

    setColorValue(value: string): void {
        if (this._pattern.test(value)) {

            // update the input value and input validation
            this.setInputValue();

            // emit the latest value
            this.selectedChange.emit(new ColorPickerColor('Custom', value, this.inputMode));
        }
    }

    toggleInputMode(): void {

        // update the input type to the next option
        this.inputMode = this.inputMode === 'hex' ? 'rgba' : 'hex';

        // update the value to display in the correct format
        this.setInputValue();
    }

    private setInputValue(): void {

        // update the value to display in the correct format
        this._input.setValue(this._selection, { emitEvent: false });

        // update the FormControl validators to reflect the new format
        this._input.setValidators([Validators.pattern(this._pattern)]);

        // perform validation
        this._input.updateValueAndValidity({ emitEvent: false });
    }

    private getColorAriaLabel(color: ColorPickerColor): string {
        return `Select color ${color.name}`;
    }

    private getSwitchModeAriaLabel(mode: ColorPickerInputMode): string {
        return `Switch input mode to ${mode === 'hex' ? 'RGBA' : 'hex'}`;
    }

    private getInputAriaLabel(mode: ColorPickerInputMode): string {
        return `Edit ${mode} color value`;
    }
}

export type ColorPickerInputColors = ColorPickerColor | string;
export type ColorPickerButtonStyle = 'square' | 'circle';
export type ColorPickerButtonSize = 'sm' | 'md' | 'lg';
export type ColorPickerInputMode = 'hex' | 'rgba';