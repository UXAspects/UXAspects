import { ColorValueSet, ColorClassSet } from './color.service';
export declare class ColorService {
    private _html;
    private _element;
    private _colors;
    private _colorSet;
    constructor(document: any);
    private _setColors();
    private _getColorValueByHex(color);
    private getColorValue(color);
    getColor(color: ColorIdentifier): ThemeColor;
    getColorSet(): any;
    setColorSet(colorSet: ColorSet): void;
}
export declare class ThemeColor {
    private _r;
    private _g;
    private _b;
    private _a;
    constructor(r: string, g: string, b: string, a: string);
    static parse(value: string): ThemeColor;
    toHex(): string;
    toRgb(): string;
    toRgba(): string;
    getRed(): string;
    getGreen(): string;
    getBlue(): string;
    getAlpha(): string;
    setRed(red: string): this;
    setGreen(green: string): this;
    setBlue(blue: string): this;
    setAlpha(alpha: string | number): this;
}
export declare const colorSets: {
    keppel: any;
    microFocus: any;
};
export interface ThemeColors {
    [name: string]: ThemeColor;
}
export interface ColorSet {
    colorClassSet?: ColorClassSet;
    colorValueSet?: ColorValueSet;
}
export interface ColorClassSet {
    [name: string]: string;
}
export interface ColorValueSet {
    [name: string]: string;
}
export declare type ColorIdentifier = string;
