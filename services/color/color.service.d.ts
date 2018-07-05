import { ColorClassSet, ColorValueSet } from './color.service';
export declare class ColorService {
    private _html;
    private _element;
    private _colors;
    private _colorSet;
    constructor();
    private setColors();
    private getColorValueByHex(color);
    private getColorValue(color);
    getColor(color: ColorIdentifier): ThemeColor;
    getColorSet(): any;
    setColorSet(colorSet: ColorSet): void;
    resolve(value: string): string;
    resolveColorName(value?: string): string;
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
    keppel: {
        colorClassSet: {
            'primary': string;
            'accent': string;
            'secondary': string;
            'alternate1': string;
            'alternate2': string;
            'alternate3': string;
            'vibrant1': string;
            'vibrant2': string;
            'grey1': string;
            'grey2': string;
            'grey3': string;
            'grey4': string;
            'grey5': string;
            'grey6': string;
            'grey7': string;
            'grey8': string;
            'chart1': string;
            'chart2': string;
            'chart3': string;
            'chart4': string;
            'chart5': string;
            'chart6': string;
            'ok': string;
            'warning': string;
            'critical': string;
            'partition1': string;
            'partition9': string;
            'partition10': string;
            'partition11': string;
            'partition12': string;
            'partition13': string;
            'partition14': string;
            'social-chart-node': string;
            'social-chart-edge': string;
        };
    };
    microFocus: {
        'colorValueSet': {
            'cerulean': string;
            'aqua': string;
            'aquamarine': string;
            'fuchsia': string;
            'indigo': string;
            'dark-blue': string;
            'white': string;
            'slightly-gray': string;
            'bright-gray': string;
            'gray': string;
            'silver': string;
            'dim-gray': string;
            'dark-gray': string;
            'black': string;
            'crimson-negative': string;
            'apricot': string;
            'yellow': string;
            'green-positive': string;
            'ultramarine': string;
            'skyblue': string;
            'pale-aqua': string;
            'pale-green': string;
            'lime': string;
            'orange': string;
            'magenta': string;
            'pale-purple': string;
            'dark-ultramarine': string;
            'steelblue': string;
            'arctic-blue': string;
            'emerald': string;
            'olive': string;
            'goldenrod': string;
            'purple': string;
            'pale-eggplant': string;
            'red': string;
            'pale-amber': string;
            'pale-lemon': string;
            'pale-emerald': string;
            'plum': string;
            'copper': string;
            'amber': string;
            'leaf-green': string;
            'forest-green': string;
            'primary': string;
            'accent': string;
            'secondary': string;
            'alternate1': string;
            'alternate2': string;
            'alternate3': string;
            'vibrant1': string;
            'vibrant2': string;
            'grey1': string;
            'grey2': string;
            'grey3': string;
            'grey4': string;
            'grey5': string;
            'grey6': string;
            'grey7': string;
            'grey8': string;
            'chart1': string;
            'chart2': string;
            'chart3': string;
            'chart4': string;
            'chart5': string;
            'chart6': string;
            'ok': string;
            'warning': string;
            'critical': string;
            'partition1': string;
            'partition9': string;
            'partition10': string;
            'partition11': string;
            'partition12': string;
            'partition13': string;
            'partition14': string;
            'social-chart-node': string;
            'social-chart-edge': string;
        };
    };
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
