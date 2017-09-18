export declare class ColorService {
    private _html;
    private _element;
    private _colors;
    constructor(document: any);
    private getColorValue(color);
    getColor(color: ColorIdentifier): ThemeColor;
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
export declare type ColorIdentifier = 'primary' | 'accent' | 'secondary' | 'alternate1' | 'alternate2' | 'alternate3' | 'vibrant1' | 'vibrant2' | 'grey1' | 'grey2' | 'grey3' | 'grey4' | 'grey5' | 'grey6' | 'grey7' | 'grey8' | 'chart1' | 'chart2' | 'chart3' | 'chart4' | 'chart5' | 'chart6' | 'ok' | 'warning' | 'critical' | string;
