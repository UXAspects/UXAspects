export class ThemeColor {

    constructor(private _r: string, private _g: string, private _b: string, private _a: string = '1') { }

    /**
     * Create a ThemeColor object from a CSS color string
     * @param value The CSS color string to derive a ThemeColor object from
     */
    static parse(value: string): ThemeColor {
        let r, g, b, a = '1';

        const rgbaPattern = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
        const shortHexPattern = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const longHexPattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;

        const rgbaMatch = value.match(rgbaPattern);
        const shortHexMatch = value.match(shortHexPattern);
        const longHexMatch = value.match(longHexPattern);

        if (rgbaMatch) {
            r = rgbaMatch[1];
            g = rgbaMatch[2];
            b = rgbaMatch[3];
            a = rgbaMatch[4] ? rgbaMatch[4] : '1';
        } else if (longHexMatch) {
            r = parseInt(longHexMatch[1], 16).toString();
            g = parseInt(longHexMatch[2], 16).toString();
            b = parseInt(longHexMatch[3], 16).toString();
        } else if (shortHexMatch) {
            r = parseInt(shortHexMatch[1] + shortHexMatch[1], 16).toString();
            g = parseInt(shortHexMatch[2] + shortHexMatch[2], 16).toString();
            b = parseInt(shortHexMatch[3] + shortHexMatch[3], 16).toString();
        } else {
            throw new Error(`Cannot parse color - ${value} is not a valid color.`);
        }
        return new ThemeColor(r, g, b, a);
    }

    /**
     * Clone a theme color so it can be modified without affecting other places using the color
     * @param themeColor The original theme color to clone
     */
    static from(themeColor: ThemeColor): ThemeColor {
        return new ThemeColor(themeColor.getRed(), themeColor.getGreen(), themeColor.getBlue(), themeColor.getAlpha());
    }

    /**
     * Determine if an object is an instance of a theme color.
     * Using a simple instanceof check will not always work in plunker
     * where the ThemeColor is from @ux-aspects/ux-aspects and the color
     * comes from @micro-focus/ux-aspects
     */
    static isInstanceOf(themeColor: any): boolean {
        return typeof themeColor.getRed === 'function' &&
            typeof themeColor.getGreen === 'function' &&
            typeof themeColor.getBlue === 'function' &&
            typeof themeColor.getAlpha === 'function';
    }

    /**
     * Convert the theme color to a CSS hex color code
     */
    toHex(): string {
        let red = parseInt(this._r).toString(16);
        let green = parseInt(this._g).toString(16);
        let blue = parseInt(this._b).toString(16);

        if (red.length < 2) {
            red = '0' + red;
        }
        if (green.length < 2) {
            green = '0' + green;
        }
        if (blue.length < 2) {
            blue = '0' + blue;
        }

        return '#' + red + green + blue;
    }

    /**
     * Convert the theme color to a CSS rgb color code
     */
    toRgb(): string {
        return 'rgb(' + this._r + ', ' + this._g + ', ' + this._b + ')';
    }

    /**
     * Convert the theme color to a CSS rgbs color code
     */
    toRgba(): string {
        return 'rgba(' + this._r + ', ' + this._g + ', ' + this._b + ', ' + this._a + ')';
    }

    /**
     * Get the red value from the RGBA color value
     */
    getRed(): string {
        return this._r;
    }

    /**
     * Get the green value from the RGBA color value
     */
    getGreen(): string {
        return this._g;
    }


    /**
     * Get the blue value from the RGBA color value
     */
    getBlue(): string {
        return this._b;
    }


    /**
     * Get the alpha value from the RGBA color value
     */
    getAlpha(): string {
        return this._a;
    }

    /**
     * Set the red value from the RGBA color value
     */
    setRed(red: string): this {
        this._r = red;
        return this;
    }

    /**
     * Set the green value from the RGBA color value
     */
    setGreen(green: string): this {
        this._g = green;
        return this;
    }

    /**
     * Set the blue value from the RGBA color value
     */
    setBlue(blue: string): this {
        this._b = blue;
        return this;
    }

    /**
     * Set the alpha value from the RGBA color value
     */
    setAlpha(alpha: string | number): this {
        this._a = alpha.toString();
        return this;
    }
}