import { ChangeDetectionStrategy, Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { pairwise, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { HasFocusIndicatorCtor, HasFocusInidicator, mixinFocusIndicator, _HasFocusIndicatorInputs } from '../../common/index';
import { ColorPickerColor } from './color-picker-color';

// Values corresponding to stylesheet
const BUTTON_MARGIN = 8;
const BUTTON_WIDTHS = {
    'sm': 26,
    'md': 32,
    'lg': 40
};

let uniqueId = 0;

// Boilerplate for applying mixins to ColorPickerComponent.
export class ColorPickerBase { }

// Add all focus indicator properties to a new base class
export const _ColorPickerMixinBase: HasFocusIndicatorCtor & typeof ColorPickerBase = mixinFocusIndicator(ColorPickerBase);

@Component({
    selector: 'ux-color-picker',
    exportAs: 'ux-color-picker',
    templateUrl: 'color-picker.component.html',
    inputs: [..._HasFocusIndicatorInputs],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorPickerComponent extends _ColorPickerMixinBase implements OnInit, OnDestroy, HasFocusInidicator {

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

export type ColorPickerInputColors = ColorPickerColor | string;
export type ColorPickerButtonStyle = 'square' | 'circle';
export type ColorPickerButtonSize = 'sm' | 'md' | 'lg';
export type ColorPickerInputMode = 'hex' | 'rgba';