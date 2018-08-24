import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { pairwise, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { ThemeColor } from '../../services/color/color.service';

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
    templateUrl: 'color-picker.component.html'
})
export class ColorPickerComponent implements OnInit, OnDestroy {

    @Input()
    @HostBinding('attr.id')
    id: string = `ux-color-picker-${uniqueId++}`;

    @Input('colors')
    set inputColors(colors: ColorPickerInputColors[] | ColorPickerInputColors[][]) {

        let normalizedColors: ColorPickerInputColors[][];

        // If it's a 1d array, convert it to 2d
        if (colors.length === 0 || !Array.isArray(colors[0])) {
            normalizedColors = [<ColorPickerInputColors[]>colors];
        } else {
            normalizedColors = <ColorPickerInputColors[][]>colors;
        }

        // Convert any string colors to ColorPickerColor
        this.colors = normalizedColors.map(row => {
            return row.map(color => color instanceof ColorPickerColor ? color : new ColorPickerColor(color, color));
        });
    }

    @Input()
    set selected(selected: ColorPickerColor) {
        this.selected$.next(selected);
    }

    @Input()
    set columns(columns: number) {
        this.columns$.next(columns);
    }

    @Input()
    buttonStyle: ColorPickerButtonStyle = 'circle';

    @Input()
    set buttonSize(buttonSize: ColorPickerButtonSize) {
        this.buttonSize$.next(buttonSize);
    }

    @Input()
    showTooltips: boolean = false;

    @Input()
    showInput: boolean = false;

    @Input()
    inputMode: ColorPickerInputMode = 'hex';

    @Output()
    selectedChange = new EventEmitter<ColorPickerColor>();

    @Output()
    inputSubmit = new EventEmitter<void>();

    @HostBinding('style.width')
    cssWidth = 'auto';

    colors: ColorPickerColor[][] = [];
    selected$ = new BehaviorSubject<ColorPickerColor>(null);
    columns$ = new BehaviorSubject<number>(-1);
    buttonSize$ = new BehaviorSubject<ColorPickerButtonSize>('md');
    inputPatterns = {
        'hex': /^#(?:[\da-fA-F]{3}){1,2}$/,
        'rgba': /^(?:rgb\(\d{1,3},\s*\d{1,3},\s*\d{1,3}\))|(?:rgba\(\d{1,3},\s*\d{1,3},\s*\d{1,3},\s*\d(\.\d+)?\))$/
    };

    private _onDestroy = new Subject();

    ngOnInit(): void {

        // Skip emitting the initial selectedChange
        this.selected$.pipe(pairwise(), takeUntil(this._onDestroy)).subscribe(([prev, curr]) => {
            if (prev) {
                this.selectedChange.emit(curr);
            }
        });

        // Set the width based on column count and button size
        combineLatest(this.columns$, this.buttonSize$)
            .pipe(takeUntil(this._onDestroy))
            .subscribe(([columns, buttonSize]) => {
                if (columns > 0) {
                    const w = columns * (BUTTON_WIDTHS[buttonSize] + (2 * BUTTON_MARGIN));
                    this.cssWidth = `${w}px`;
                } else {
                    this.cssWidth = 'auto';
                }
            });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    updateColorValue(input: string, mode: ColorPickerInputMode): void {
        if (this.inputPatterns[mode].test(input)) {
            this.selected$.next(new ColorPickerColor('Custom', input, mode));
        }
    }

    toggleColorEntryType(): void {
        this.inputMode = (this.inputMode === 'hex') ? 'rgba' : 'hex';
    }
}

export type ColorPickerButtonStyle = 'square' | 'circle';
export type ColorPickerButtonSize = 'sm' | 'md' | 'lg';
export type ColorPickerInputMode = 'hex' | 'rgba';

type ColorPickerInputColors = ColorPickerColor | string;

/**
 * Type representing a color, including its descriptive name.
 */
export class ColorPickerColor {

    /**
     * Human-readable name of the color.
     */
    name: string;

    /**
     * Hex value of the color, e.g. `#ffffff`.
     */
    get hex(): string {
        return this._originalHexValue ? this._originalHexValue : this._color.toHex();
    }

    /**
     * RGBA value of the color, e.g. `rgba(255, 255, 255, 1)`.
     */
    get rgba(): string {
        return this._originalRgbaValue ? this._originalRgbaValue : this._color.toRgba();
    }

    get r(): number {
        return parseInt(this._color.getRed());
    }

    get g(): number {
        return parseInt(this._color.getGreen());
    }

    get b(): number {
        return parseInt(this._color.getBlue());
    }

    get a(): number {
        return parseFloat(this._color.getAlpha());
    }

    private _color: ThemeColor;
    private _originalHexValue: string;
    private _originalRgbaValue: string;

    constructor(name: string, value: string, inputMode?: ColorPickerInputMode) {
        this.name = name;
        this._color = ThemeColor.parse(value);

        // Preserve the format entered by the user if it's valid
        if (inputMode === 'hex') {
            this._originalHexValue = value;
        } else if (inputMode === 'rgba') {
            this._originalRgbaValue = value;
        }
    }

    toString(): string {
        return this._color.toRgba();
    }
}