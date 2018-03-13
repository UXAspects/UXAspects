import { Injectable, Inject, OnDestroy } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { Subscription } from 'rxjs/Subscription';
import { ColorValueSet, ColorClassSet } from './color.service';
import { ThemeService, Theme } from '../theme/theme.service';

@Injectable()
export class ColorService implements OnDestroy {

    private _html: string;
    private _element: HTMLElement;
    private _colors: ThemeColors;
    private _colorSet: any = colorSets.keppel;
    private _subscription: Subscription;

    constructor(private _themeService: ThemeService, @Inject(DOCUMENT) document: Document) {
        if (this._colorSet.colorClassSet) {
            this.setColors();
        } else {
            for (let key in this._colorSet.colorValueSet) {
                this._colors[key] = this.getColorValueByHex(this._colorSet.colorValueSet[key]);
            }
        }

        // update the color palette on theme change
        this._subscription = _themeService.theme$.subscribe(theme => {

            switch (theme) {
                
                case Theme.Keppel:
                    this.setColorSet(colorSets.keppel);
                    break;
                
                case Theme.MicroFocus:
                    this.setColorSet(colorSets.microFocus);
                    break;
            }
        });
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }

    private setColors() {

        this._html = '';

        for (let key in this._colorSet.colorClassSet) {
            this._html += '<div class="' + this._colorSet.colorClassSet[key] + '-color"></div>';
        }

        this._element = document.createElement('div');
        this._element.className = 'color-chart';
        this._element.innerHTML = this._html;

        document.body.appendChild(this._element);

        this._colors = {};

        for (let key in this._colorSet.colorClassSet) {
            this._colors[key] = this.getColorValue(this._colorSet.colorClassSet[key]);
        }

        this._element.parentNode.removeChild(this._element);
    }

    private getColorValueByHex(color: string): ThemeColor {
        const hex = color.replace('#', '');

        const r = parseInt(hex.substring(0, 2), 16).toString();
        const g = parseInt(hex.substring(2, 4), 16).toString();
        const b = parseInt(hex.substring(4, 6), 16).toString();

        return new ThemeColor(r, g, b, '1');
    }

    private getColorValue(color: ColorIdentifier): ThemeColor {

        const target = this._element.querySelector('.' + this._colorSet.colorClassSet[color] + '-color');

        if (!target) {
            throw new Error('Invalid color');
        }

        const colorValue = window.getComputedStyle(target).backgroundColor;

        const rgba = colorValue.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        return new ThemeColor(rgba[1], rgba[2], rgba[3], rgba[4]);
    }

    getColor(color: ColorIdentifier): ThemeColor {
        const themeColor = this._colors[color.toLowerCase()];
        return new ThemeColor(themeColor.getRed(), themeColor.getGreen(), themeColor.getBlue(), themeColor.getAlpha());
    }

    getColorSet() {
        return this._colorSet;
    }

    setColorSet(colorSet: ColorSet) {
        this._colorSet = colorSet;
        this._colors = {};

        if (this._colorSet.colorClassSet) {
            this.setColors();
        } else {
            for (let key in this._colorSet.colorValueSet) {
                this._colors[key] = this.getColorValueByHex(this._colorSet.colorValueSet[key]);
            }
        }

        // for those users still setting the theme via color service - propagate changes to the theme service
        switch (colorSet) {

            case colorSets.keppel:
                this._themeService.setTheme(Theme.Keppel);
                break;

            case colorSets.microFocus:
                this._themeService.setTheme(Theme.MicroFocus);
                break;
        }
    }

    resolve(value: string): string {
        if (!value) {
            return;
        }
        
        const colorName = this.resolveColorName(value);
        
        for (let color in this._colors) {
            if (colorName === color.toLowerCase()) {
                return this.getColor(colorName).toRgba();
            }
        }

        return value;
    }

    resolveColorName(value: string = ''): string {
        return value.replace(/\s+/g, '-').toLowerCase();
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

        const rgbaPattern = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
        const shortHexPattern = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const longHexPattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/;

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

    toHex() {
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
    keppel: {
        colorClassSet: {
            'primary': 'primary',
            'accent': 'accent',
            'secondary': 'secondary',
            'alternate1': 'alternate1',
            'alternate2': 'alternate2',
            'alternate3': 'alternate3',
            'vibrant1': 'vibrant1',
            'vibrant2': 'vibrant2',
            'grey1': 'grey1',
            'grey2': 'grey2',
            'grey3': 'grey3',
            'grey4': 'grey4',
            'grey5': 'grey5',
            'grey6': 'grey6',
            'grey7': 'grey7',
            'grey8': 'grey8',
            'chart1': 'chart1',
            'chart2': 'chart2',
            'chart3': 'chart3',
            'chart4': 'chart4',
            'chart5': 'chart5',
            'chart6': 'chart6',
            'ok': 'ok',
            'warning': 'warning',
            'critical': 'critical',
            'partition1': 'partition1',
            'partition9': 'partition9',
            'partition10': 'partition10',
            'partition11': 'partition11',
            'partition12': 'partition12',
            'partition13': 'partition13',
            'partition14': 'partition14',
            'social-chart-node': 'social-chart-node',
            'social-chart-edge': 'social-chart-edge'
        }
    },
    microFocus: {
        'colorValueSet': {
            'cerulean': '#1668c1',
            'aqua': '#29ceff',
            'aquamarine': '#2fd6c3',
            'fuchsia': '#c6179d',
            'indigo': '#7425ad',
            'dark-blue': '#231ca5',
            'white': '#ffffff',
            'slightly-gray': '#f5f7f8',
            'bright-gray': '#f1f2f3',
            'gray': '#dcdedf',
            'silver': '#bdbec0',
            'dim-gray': '#656668',
            'dark-gray': '#323435',
            'black': '#000000',
            'crimson-negative': '#e5004c',
            'apricot': '#f48b34',
            'yellow': '#fcdb1f',
            'green-positive': '#1aac60',
            'ultramarine': '#3939c6',
            'skyblue': '#00abf3',
            'pale-aqua': '#43e4ff',
            'pale-green': '#1ffbba',
            'lime': '#75da4d',
            'orange': '#ffce00',
            'magenta': '#eb23c2',
            'pale-purple': '#ba47e2',
            'dark-ultramarine': '#271782',
            'steelblue': '#014272',
            'arctic-blue': '#0b8eac',
            'emerald': '#00a989',
            'olive': '#5bba36',
            'goldenrod': '#ffb000',
            'purple': '#9b1e83',
            'pale-eggplant': '#5216ac',
            'red': '#ff454f',
            'pale-amber': '#ffb24d',
            'pale-lemon': '#fde159',
            'pale-emerald': '#33c180',
            'plum': '#b21646',
            'copper': '#e57828',
            'amber': '#ffc002',
            'leaf-green': '#118c4f',
            'primary': '#0073e7',
            'accent': '#7425ad',
            'secondary': '#ffffff',
            'alternate1': '#29ceff',
            'alternate2': '#2fd6c3',
            'alternate3': '#c6179d',
            'vibrant1': '#43e4ff',
            'vibrant2': '#ffce00',
            'grey1': '#000000',
            'grey2': '#323435',
            'grey3': '#656668',
            'grey4': '#bdbec0',
            'grey5': '#dcdedf',
            'grey6': '#f1f2f3',
            'grey7': '#f5f7f8',
            'grey8': '#ffffff',
            'chart1': '#3939c6',
            'chart2': '#00abf3',
            'chart3': '#75da4d',
            'chart4': '#ffce00',
            'chart5': '#eb23c2',
            'chart6': '#ba47e2',
            'ok': '#1aac60',
            'warning': '#f48b34',
            'critical': 'e5004c',
            'partition1': '#7425ad',
            'partition9': '#5216ac',
            'partition10': '#5bba36',
            'partition11': '#014272',
            'partition12': '#ffb000',
            'partition13': '#bdbec0',
            'partition14': '#271782',
            'social-chart-node': '#ff00ff',
            'social-chart-edge': '#ff00ff'
        }
    }
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

export type ColorIdentifier = string;