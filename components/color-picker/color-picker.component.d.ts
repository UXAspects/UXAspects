import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export declare class ColorPickerComponent implements OnInit, OnDestroy {
    id: string;
    inputColors: ColorPickerInputColors[] | ColorPickerInputColors[][];
    selected: ColorPickerColor;
    columns: number;
    buttonStyle: ColorPickerButtonStyle;
    buttonSize: ColorPickerButtonSize;
    showTooltips: boolean;
    showInput: boolean;
    inputMode: ColorPickerInputMode;
    selectedChange: EventEmitter<ColorPickerColor>;
    inputSubmit: EventEmitter<void>;
    cssWidth: string;
    colors: ColorPickerColor[][];
    selected$: BehaviorSubject<ColorPickerColor>;
    columns$: BehaviorSubject<number>;
    buttonSize$: BehaviorSubject<ColorPickerButtonSize>;
    inputPatterns: {
        'hex': RegExp;
        'rgba': RegExp;
    };
    private _onDestroy;
    ngOnInit(): void;
    ngOnDestroy(): void;
    updateColorValue(input: string, mode: ColorPickerInputMode): void;
    toggleColorEntryType(): void;
}
export declare type ColorPickerInputColors = ColorPickerColor | string;
export declare type ColorPickerButtonStyle = 'square' | 'circle';
export declare type ColorPickerButtonSize = 'sm' | 'md' | 'lg';
export declare type ColorPickerInputMode = 'hex' | 'rgba';
/**
 * Type representing a color, including its descriptive name.
 */
export declare class ColorPickerColor {
    /**
     * Human-readable name of the color.
     */
    name: string;
    /**
     * Hex value of the color, e.g. `#ffffff`.
     */
    readonly hex: string;
    /**
     * RGBA value of the color, e.g. `rgba(255, 255, 255, 1)`.
     */
    readonly rgba: string;
    readonly r: number;
    readonly g: number;
    readonly b: number;
    readonly a: number;
    private _color;
    private _originalHexValue;
    private _originalRgbaValue;
    constructor(name: string, value: string, inputMode?: ColorPickerInputMode);
    toString(): string;
}
