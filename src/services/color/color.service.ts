import { Inject, Injectable, Optional } from '@angular/core';
import { ColorSet, colorSets, COLOR_SET_TOKEN } from './color-sets/index';
import { ThemeColor } from './theme-color';

@Injectable({
    providedIn: 'root'
})
export class ColorService {

    /** Set the default theme to the Keppel colorset */
    private _theme: Readonly<Theme> = this.getTheme(this._colorSet);

    /** Allow the color set to be provided in a forRoot function otherwise set it to the Keppel theme by default */
    constructor(@Optional() @Inject(COLOR_SET_TOKEN) private _colorSet: ColorSet) { }

    /**
     * Get a ThemeColor object from a color name
     * @param colorName The name of the color from the color palette
     */
    getColor(colorName: ColorIdentifier): ThemeColor {

        // get the matching ThemeColor from the active theme
        const themeColor = this._theme[this.resolveColorName(colorName)];

        // if there is not a match then throw an error
        if (!themeColor) {
            throw new Error('Color not found: ' + colorName);
        }

        return new ThemeColor(themeColor.getRed(), themeColor.getGreen(), themeColor.getBlue(), themeColor.getAlpha());
    }

    /**
     * Get the active color set
     */
    getColorSet(): ColorSet {
        return this._colorSet;
    }

    /**
     * Define the current color set and produce a Theme from it
     */
    setColorSet(colorSet: ColorSet): void {
        this._colorSet = colorSet;
        this._theme = this.getTheme(colorSet);
    }

    /**
     * Resolve a color value. This may be the name of a color from the color set
     * or it may simply be a hex or rgb(a) color value. This function will return
     * a CSS color value regardless of which one of these formats it is
     * @param value The color name, hex code or rgb(a) value to resolve
     * @returns If the color is the name of a color in the set, the `rgba` color will be returned, otherwise the original CSS value will be returned.
     */
    resolve(value: string): string {
        if (!value) {
            return;
        }

        const colorName = this.resolveColorName(value);

        for (const color in this._theme) {
            if (colorName === color.toLowerCase()) {
                return this.getColor(colorName).toRgba();
            }
        }

        return value;
    }

    /**
     * Converts a color name to an appropriate ColorSet name. For example
     * a color may be written in lower-camel-case, however color sets are in
     * kebab-case. This will convert to the appropriate naming format
     * @param colorName The color name to resolve
     */
    resolveColorName(colorName: string = ''): string {
        return colorName.replace(/\s+/g, '-').toLowerCase();
    }

    /** Determine if the current colorset has a specific color */
    colorExists(name: string): boolean {
        return !!Object.keys(this._theme).find(colorName => colorName === this.resolveColorName(name));
    }

    /** Create a theme from a colorset */
    private getTheme(colorSet: ColorSet): Readonly<Theme> {
        // create a new theme object
        const theme: Theme = {};

        // ensure we have a colorset
        if (!colorSet) {
            colorSet = colorSets.keppel;
        }

        // iterate over each hex code and convert it to a theme color
        for (const color in colorSet.colorValueSet) {
            theme[color] = ThemeColor.parse(colorSet.colorValueSet[color]);
        }

        return theme;
    }
}

export interface Theme {
    [name: string]: ThemeColor;
}

export type ColorIdentifier = string;