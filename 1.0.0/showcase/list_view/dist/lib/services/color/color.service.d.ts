export declare class ColorService {
    private html;
    private element;
    private colors;
    constructor(document: any);
    getColorValue(color: string): ThemeColor;
    getColor(color: string): any;
}
export declare class ThemeColor {
    private r;
    private g;
    private b;
    private a;
    constructor(r: string, g: string, b: string, a: string);
    toHex(): string;
    toRgb(): string;
    toRgba(): string;
    setRed(red: string): this;
    setGreen(green: string): this;
    setBlue(blue: string): this;
    setAlpha(alpha: string): this;
}
