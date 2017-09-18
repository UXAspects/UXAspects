import {
    DOCUMENT
} from '@angular/platform-browser';
import {
    Injectable,
    Inject
} from '@angular/core';

export class ColorService {

    private _html: string;
    private _element: HTMLElement;
    private _colors: ThemeColors;
    private _colorSet: any  = colorSets.keppel;

    constructor(@Inject(DOCUMENT) document: any) {
        this._setColors();
    }

    private _setColors() {

        this._html = '';

        for (let key in this._colorSet) {
            this._html += '<div class="' + this._colorSet[key] + '-color"></div>';
        }

        this._element = document.createElement('div');
        this._element.className = 'color-chart';
        this._element.innerHTML = this._html;

        document.body.appendChild(this._element);

        this._colors = {};

        for (let key in this._colorSet) {
            this._colors[key] = this.getColorValue(this._colorSet[key]);
        }

        this._element.parentNode.removeChild(this._element);
    }

    private getColorValue(color: ColorIdentifier): ThemeColor {

        let target = this._element.querySelector('.' + this._colorSet[color] + '-color');

        if (!target) {
            throw new Error('Invalid color');
        }

        let colorValue = window.getComputedStyle(target).backgroundColor;

        let rgba = colorValue.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        return new ThemeColor(rgba[1], rgba[2], rgba[3], rgba[4]);
    }

    getColor(color: ColorIdentifier): ThemeColor {
        return this._colors[color.toLowerCase()];
    }

    getColorSet() {
        return this._colorSet;
    }

    setColorSet(colorSet: ColorSet) {
        this._colorSet = colorSet;
        this._setColors();
    }
}

export class ThemeColor {

    private _r: string;
    private _g: string;
    private _b: string;
    private _a: string;

    constructor(r: string, g: string, b: string, a: string) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a === undefined ? '1' : a;
    }

    static parse(value: string): ThemeColor {
        let r, g, b, a = '1';

        var rgbaPattern = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
        var shortHexPattern = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        var longHexPattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/;

        let rgbaMatch = value.match(rgbaPattern);
        let shortHexMatch = value.match(shortHexPattern);
        let longHexMatch = value.match(longHexPattern);

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

    toHex() {
        var red = parseInt(this._r).toString(16);
        var green = parseInt(this._g).toString(16);
        var blue = parseInt(this._b).toString(16);

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

    toRgb() {
        return 'rgb(' + this._r + ', ' + this._g + ', ' + this._b + ')';
    }

    toRgba() {
        return 'rgba(' + this._r + ', ' + this._g + ', ' + this._b + ', ' + this._a + ')';
    }

    getRed() {
        return this._r;
    }

    getGreen() {
        return this._g;
    }

    getBlue() {
        return this._b;
    }

    getAlpha() {
        return this._a;
    }

    setRed(red: string) {
        this._r = red;
        return this;
    }

    setGreen(green: string) {
        this._g = green;
        return this;
    }

    setBlue(blue: string) {
        this._b = blue;
        return this;
    }

    setAlpha(alpha: string | number) {
        this._a = alpha.toString();
        return this;
    }
}

export const colorSets = {
    keppel: require('../../data/keppel-colors.json'),
    microFocus: require('../../data/micro-focus-colors.json')
};

export interface ThemeColors {
    [name: string]: ThemeColor;
}

export interface ColorSet {
    [name: string]: string;
}

export type ColorIdentifier = string;