import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject, combineLatest, Subject } from 'rxjs';
import { pairwise, takeUntil } from 'rxjs/operators';
import { ColorPickerColor } from './color-picker-color';
import { ColorPickerButtonSize, ColorPickerButtonStyle, ColorPickerInputColors, ColorPickerInputMode } from './color-picker.type';

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

    /**
     * The collection of colors to display in the color swatch.
     *
     * Colors can be specified either as a string, which is the hex or RGBA value of the color; or as a `ColorPickerColor` object,
     * which allows a name to be associated with the color. See below for details of the `ColorPickerColor` class.
     * This property is either a one-dimensional or two-dimensional array. If a two-dimensional array is provided,
     * the colors will be split into rows, providing more control over the appearance of the swatch.
     */
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

    /**
     * The currently selected color. If this is one of the `colors` in the colors collection, it will be visually
     * highlighted in the swatch. It will also be shown in the input panel, if enabled (see showInput).
     * Note that this will always be a `ColorPickerColor` object, even if plain strings are provided to the colors property.
     * See below for details of the `ColorPickerColor` class.
     */
    @Input()
    set selected(selected: ColorPickerColor) {
        this.selected$.next(selected);
    }

    /**
     * The number of columns to display in the color swatch. Set this to -1 if the width should be specified by a stylesheet
     * instead, e.g. to provide a responsive layout.
     */
    @Input()
    set columns(columns: number) {
        this.columns$.next(columns);
    }

    /** The style of the color swatch buttons. */
    @Input()
    buttonStyle: ColorPickerButtonStyle = 'circle';

    /** The size of the color swatch buttons. Three size variants are currently supported. */
    @Input()
    set buttonSize(buttonSize: ColorPickerButtonSize) {
        this.buttonSize$.next(buttonSize);
    }

    /** Whether to show tooltips above the color swatch buttons. These contain the color name if provided; otherwise the color hex/RGBA value. */
    @Input()
    showTooltips: boolean = false;

    /** Whether to show the hex/RGBA input panel. */
    @Input()
    showInput: boolean = false;

    /** The default input mode to display in the input panel. The user can switch modes using the toggle button. */
    @Input()
    inputMode: ColorPickerInputMode = 'hex';

    /** Emitted when the user changes the selected color, either by clicking a color swatch button, or entering a valid color value into the input panel text field. */
    @Output()
    selectedChange = new EventEmitter<ColorPickerColor>();

    /** Emitted when the user presses enter in the input panel text field. This can be used to commit a color change and/or close a popup. */
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