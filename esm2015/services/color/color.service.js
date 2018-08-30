/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
export class ColorService {
    constructor() {
        this._colorSet = colorSets.keppel;
        if (this._colorSet.colorClassSet) {
            this.setColors();
        }
        else {
            for (let /** @type {?} */ key in this._colorSet.colorValueSet) {
                this._colors[key] = this.getColorValueByHex(this._colorSet.colorValueSet[key]);
            }
        }
    }
    /**
     * @return {?}
     */
    setColors() {
        this._html = '';
        for (let /** @type {?} */ key in this._colorSet.colorClassSet) {
            this._html += '<div class="' + this._colorSet.colorClassSet[key] + '-color"></div>';
        }
        this._element = document.createElement('div');
        this._element.className = 'color-chart';
        this._element.innerHTML = this._html;
        document.body.appendChild(this._element);
        this._colors = {};
        for (let /** @type {?} */ key in this._colorSet.colorClassSet) {
            this._colors[key] = this.getColorValue(this._colorSet.colorClassSet[key]);
        }
        this._element.parentNode.removeChild(this._element);
    }
    /**
     * @param {?} color
     * @return {?}
     */
    getColorValueByHex(color) {
        const /** @type {?} */ hex = color.replace('#', '');
        const /** @type {?} */ r = parseInt(hex.substring(0, 2), 16).toString();
        const /** @type {?} */ g = parseInt(hex.substring(2, 4), 16).toString();
        const /** @type {?} */ b = parseInt(hex.substring(4, 6), 16).toString();
        return new ThemeColor(r, g, b, '1');
    }
    /**
     * @param {?} color
     * @return {?}
     */
    getColorValue(color) {
        const /** @type {?} */ target = this._element.querySelector('.' + this._colorSet.colorClassSet[color] + '-color');
        if (!target) {
            throw new Error('Invalid color');
        }
        const /** @type {?} */ colorValue = window.getComputedStyle(target).backgroundColor;
        const /** @type {?} */ rgba = colorValue.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        return new ThemeColor(rgba[1], rgba[2], rgba[3], rgba[4]);
    }
    /**
     * @param {?} color
     * @return {?}
     */
    getColor(color) {
        const /** @type {?} */ themeColor = this._colors[this.resolveColorName(color)];
        if (!themeColor) {
            throw new Error('Color not found: ' + color);
        }
        return new ThemeColor(themeColor.getRed(), themeColor.getGreen(), themeColor.getBlue(), themeColor.getAlpha());
    }
    /**
     * @return {?}
     */
    getColorSet() {
        return this._colorSet;
    }
    /**
     * @param {?} colorSet
     * @return {?}
     */
    setColorSet(colorSet) {
        this._colorSet = colorSet;
        this._colors = {};
        if (this._colorSet.colorClassSet) {
            this.setColors();
        }
        else {
            for (let /** @type {?} */ key in this._colorSet.colorValueSet) {
                this._colors[key] = this.getColorValueByHex(this._colorSet.colorValueSet[key]);
            }
        }
    }
    /**
     * @param {?} value
     * @return {?}
     */
    resolve(value) {
        if (!value) {
            return;
        }
        const /** @type {?} */ colorName = this.resolveColorName(value);
        for (let /** @type {?} */ color in this._colors) {
            if (colorName === color.toLowerCase()) {
                return this.getColor(colorName).toRgba();
            }
        }
        return value;
    }
    /**
     * @param {?=} value
     * @return {?}
     */
    resolveColorName(value = '') {
        return value.replace(/\s+/g, '-').toLowerCase();
    }
}
ColorService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
ColorService.ctorParameters = () => [];
function ColorService_tsickle_Closure_declarations() {
    /** @type {?} */
    ColorService.prototype._html;
    /** @type {?} */
    ColorService.prototype._element;
    /** @type {?} */
    ColorService.prototype._colors;
    /** @type {?} */
    ColorService.prototype._colorSet;
}
export class ThemeColor {
    /**
     * @param {?} r
     * @param {?} g
     * @param {?} b
     * @param {?} a
     */
    constructor(r, g, b, a) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a === undefined ? '1' : a;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    static parse(value) {
        let /** @type {?} */ r, /** @type {?} */ g, /** @type {?} */ b, /** @type {?} */ a = '1';
        const /** @type {?} */ rgbaPattern = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
        const /** @type {?} */ shortHexPattern = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        const /** @type {?} */ longHexPattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i;
        const /** @type {?} */ rgbaMatch = value.match(rgbaPattern);
        const /** @type {?} */ shortHexMatch = value.match(shortHexPattern);
        const /** @type {?} */ longHexMatch = value.match(longHexPattern);
        if (rgbaMatch) {
            r = rgbaMatch[1];
            g = rgbaMatch[2];
            b = rgbaMatch[3];
            a = rgbaMatch[4] ? rgbaMatch[4] : '1';
        }
        else if (longHexMatch) {
            r = parseInt(longHexMatch[1], 16).toString();
            g = parseInt(longHexMatch[2], 16).toString();
            b = parseInt(longHexMatch[3], 16).toString();
        }
        else if (shortHexMatch) {
            r = parseInt(shortHexMatch[1] + shortHexMatch[1], 16).toString();
            g = parseInt(shortHexMatch[2] + shortHexMatch[2], 16).toString();
            b = parseInt(shortHexMatch[3] + shortHexMatch[3], 16).toString();
        }
        else {
            throw new Error(`Cannot parse color - ${value} is not a valid color.`);
        }
        return new ThemeColor(r, g, b, a);
    }
    /**
     * @return {?}
     */
    toHex() {
        let /** @type {?} */ red = parseInt(this._r).toString(16);
        let /** @type {?} */ green = parseInt(this._g).toString(16);
        let /** @type {?} */ blue = parseInt(this._b).toString(16);
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
     * @return {?}
     */
    toRgb() {
        return 'rgb(' + this._r + ', ' + this._g + ', ' + this._b + ')';
    }
    /**
     * @return {?}
     */
    toRgba() {
        return 'rgba(' + this._r + ', ' + this._g + ', ' + this._b + ', ' + this._a + ')';
    }
    /**
     * @return {?}
     */
    getRed() {
        return this._r;
    }
    /**
     * @return {?}
     */
    getGreen() {
        return this._g;
    }
    /**
     * @return {?}
     */
    getBlue() {
        return this._b;
    }
    /**
     * @return {?}
     */
    getAlpha() {
        return this._a;
    }
    /**
     * @param {?} red
     * @return {?}
     */
    setRed(red) {
        this._r = red;
        return this;
    }
    /**
     * @param {?} green
     * @return {?}
     */
    setGreen(green) {
        this._g = green;
        return this;
    }
    /**
     * @param {?} blue
     * @return {?}
     */
    setBlue(blue) {
        this._b = blue;
        return this;
    }
    /**
     * @param {?} alpha
     * @return {?}
     */
    setAlpha(alpha) {
        this._a = alpha.toString();
        return this;
    }
}
function ThemeColor_tsickle_Closure_declarations() {
    /** @type {?} */
    ThemeColor.prototype._r;
    /** @type {?} */
    ThemeColor.prototype._g;
    /** @type {?} */
    ThemeColor.prototype._b;
    /** @type {?} */
    ThemeColor.prototype._a;
}
export const /** @type {?} */ colorSets = {
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
            'forest-green': '#00645a',
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
/**
 * @record
 */
export function ThemeColors() { }
function ThemeColors_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [name: string]: ThemeColor;
    */
}
/**
 * @record
 */
export function ColorSet() { }
function ColorSet_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    ColorSet.prototype.colorClassSet;
    /** @type {?|undefined} */
    ColorSet.prototype.colorValueSet;
}
/**
 * @record
 */
export function ColorClassSet() { }
function ColorClassSet_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [name: string]: string;
    */
}
/**
 * @record
 */
export function ColorValueSet() { }
function ColorValueSet_tsickle_Closure_declarations() {
    /* TODO: handle strange member:
    [name: string]: string;
    */
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9jb2xvci9jb2xvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE1BQU07SUFPRjt5QkFGeUIsU0FBUyxDQUFDLE1BQU07UUFHckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osR0FBRyxDQUFDLENBQUMscUJBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNsRjtTQUNKO0tBQ0o7Ozs7SUFFTyxTQUFTO1FBRWIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7UUFFaEIsR0FBRyxDQUFDLENBQUMscUJBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsS0FBSyxJQUFJLGNBQWMsR0FBRyxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztTQUN2RjtRQUVELElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsR0FBRyxhQUFhLENBQUM7UUFDeEMsSUFBSSxD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S0FBSztRQUNELHFCQUFJLEdBQUcsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUN6QyxxQkFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDM0MscUJBQUksSUFBSSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBRTFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsQ0FBQztTQUNuQjtRQUNELEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQixLQUFLLEdBQUcsR0FBRyxHQUFHLEtBQUssQ0FBQztTQUN2QjtRQUNELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNsQixJQUFJLEdBQUcsR0FBRyxHQUFHLElBQUksQ0FBQztTQUNyQjtRQUVELE1BQU0sQ0FBQyxHQUFHLEdBQUcsR0FBRyxHQUFHLEtBQUssR0FBRyxJQUFJLENBQUM7S0FDbkM7Ozs7SUFFRCxLQUFLO1FBQ0QsTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztLQUNuRTs7OztJQUVELE1BQU07UUFDRixNQUFNLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxHQUFHLElBQUksQ0FBQyxFQUFFLEdBQUcs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USxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsSUFBSSxFQUFFLFNBQVM7WUFDZixTQUFTLEVBQUUsU0FBUztZQUNwQixVQUFVLEVBQUUsUUFBUTtZQUNwQixZQUFZLEVBQUUsU0FBUztZQUN2QixZQUFZLEVBQUUsU0FBUztZQUN2QixhQUFhLEVBQUUsU0FBUztZQUN4QixhQUFhLEVBQUUsU0FBUztZQUN4QixhQUFhLEVBQUUsU0FBUztZQUN4QixhQUFhLEVBQUUsU0FBUztZQUN4QixhQUFhLEVBQUUsU0FBUztZQUN4QixtQkFBbUIsRUFBRSxTQUFTO1lBQzlCLG1CQUFtQixFQUFFLFNBQVM7U0FDakM7S0FDSjtDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2xvckNsYXNzU2V0LCBDb2xvclZhbHVlU2V0IH0gZnJvbSAnLi9jb2xvci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbG9yU2VydmljZSB7XG5cbiAgICBwcml2YXRlIF9odG1sOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfY29sb3JzOiBUaGVtZUNvbG9ycztcbiAgICBwcml2YXRlIF9jb2xvclNldDogYW55ID0gY29sb3JTZXRzLmtlcHBlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBpZiAodGhpcy5fY29sb3JTZXQuY29sb3JDbGFzc1NldCkge1xuICAgICAgICAgICAgdGhpcy5zZXRDb2xvcnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9jb2xvclNldC5jb2xvclZhbHVlU2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29sb3JzW2tleV0gPSB0aGlzLmdldENvbG9yVmFsdWVCeUhleCh0aGlzLl9jb2xvclNldC5jb2xvclZhbHVlU2V0W2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDb2xvcnMoKSB7XG5cbiAgICAgICAgdGhpcy5faHRtbCA9ICcnO1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9jb2xvclNldC5jb2xvckNsYXNzU2V0KSB7XG4gICAgICAgICAgICB0aGlzLl9odG1sICs9ICc8ZGl2IGNsYXNzPVwiJyArIHRoaXMuX2NvbG9yU2V0LmNvbG9yQ2xhc3NTZXRba2V5XSArICctY29sb3JcIj48L2Rpdj4nO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTmFtZSA9ICdjb2xvci1jaGFydCc7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5faHRtbDtcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuX2NvbG9ycyA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9jb2xvclNldC5jb2xvckNsYXNzU2V0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xvcnNba2V5XSA9IHRoaXMuZ2V0Q29sb3JWYWx1ZSh0aGlzLl9jb2xvclNldC5jb2xvckNsYXNzU2V0W2tleV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX2VsZW1lbnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29sb3JWYWx1ZUJ5SGV4KGNvbG9yOiBzdHJpbmcpOiBUaGVtZUNvbG9yIHtcbiAgICAgICAgY29uc3QgaGV4ID0gY29sb3IucmVwbGFjZSgnIycsICcnKTtcblxuICAgICAgICBjb25zdCByID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZygwLCAyKSwgMTYpLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGcgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDIsIDQpLCAxNikudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgYiA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNCwgNiksIDE2KS50b1N0cmluZygpO1xuXG4gICAgICAgIHJldHVybiBuZXcgVGhlbWVDb2xvcihyLCBnLCBiLCAnMScpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29sb3JWYWx1ZShjb2xvcjogQ29sb3JJZGVudGlmaWVyKTogVGhlbWVDb2xvciB7XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIHRoaXMuX2NvbG9yU2V0LmNvbG9yQ2xhc3NTZXRbY29sb3JdICsgJy1jb2xvcicpO1xuXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29sb3InKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbG9yVmFsdWUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpLmJhY2tncm91bmRDb2xvcjtcblxuICAgICAgICBjb25zdCByZ2JhID0gY29sb3JWYWx1ZS5tYXRjaCgvXnJnYmE/XFwoKFxcZCspLFxccyooXFxkKyksXFxzKihcXGQrKSg/OixcXHMqKFxcZCsoPzpcXC5cXGQrKT8pKT9cXCkkLyk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBUaGVtZUNvbG9yKHJnYmFbMV0sIHJnYmFbMl0sIHJnYmFbM10sIHJnYmFbNF0pO1xuICAgIH1cblxuICAgIGdldENvbG9yKGNvbG9yOiBDb2xvcklkZW50aWZpZXIpOiBUaGVtZUNvbG9yIHtcbiAgICAgICAgY29uc3QgdGhlbWVDb2xvciA9IHRoaXMuX2NvbG9yc1t0aGlzLnJlc29sdmVDb2xvck5hbWUoY29sb3IpXTtcbiAgICAgICAgaWYgKCF0aGVtZUNvbG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbG9yIG5vdCBmb3VuZDogJyArIGNvbG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgVGhlbWVDb2xvcih0aGVtZUNvbG9yLmdldFJlZCgpLCB0aGVtZUNvbG9yLmdldEdyZWVuKCksIHRoZW1lQ29sb3IuZ2V0Qmx1ZSgpLCB0aGVtZUNvbG9yLmdldEFscGhhKCkpO1xuICAgIH1cblxuICAgIGdldENvbG9yU2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sb3JTZXQ7XG4gICAgfVxuXG4gICAgc2V0Q29sb3JTZXQoY29sb3JTZXQ6IENvbG9yU2V0KSB7XG4gICAgICAgIHRoaXMuX2NvbG9yU2V0ID0gY29sb3JTZXQ7XG4gICAgICAgIHRoaXMuX2NvbG9ycyA9IHt9O1xuXG4gICAgICAgIGlmICh0aGlzLl9jb2xvclNldC5jb2xvckNsYXNzU2V0KSB7XG4gICAgICAgICAgICB0aGlzLnNldENvbG9ycygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX2NvbG9yU2V0LmNvbG9yVmFsdWVTZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2xvcnNba2V5XSA9IHRoaXMuZ2V0Q29sb3JWYWx1ZUJ5SGV4KHRoaXMuX2NvbG9yU2V0LmNvbG9yVmFsdWVTZXRba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNvbHZlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb2xvck5hbWUgPSB0aGlzLnJlc29sdmVDb2xvck5hbWUodmFsdWUpO1xuXG4gICAgICAgIGZvciAobGV0IGNvbG9yIGluIHRoaXMuX2NvbG9ycykge1xuICAgICAgICAgICAgaWYgKGNvbG9yTmFtZSA9PT0gY29sb3IudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbG9yKGNvbG9yTmFtZSkudG9SZ2JhKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmVzb2x2ZUNvbG9yTmFtZSh2YWx1ZTogc3RyaW5nID0gJycpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvXFxzKy9nLCAnLScpLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGhlbWVDb2xvciB7XG5cbiAgICBwcml2YXRlIF9yOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfZzogc3RyaW5nO1xuICAgIHByaXZhdGUgX2I6IHN0cmluZztcbiAgICBwcml2YXRlIF9hOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihyOiBzdHJpbmcsIGc6IHN0cmluZywgYjogc3RyaW5nLCBhOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fciA9IHI7XG4gICAgICAgIHRoaXMuX2cgPSBnO1xuICAgICAgICB0aGlzLl9iID0gYjtcbiAgICAgICAgdGhpcy5fYSA9IGEgPT09IHVuZGVmaW5lZCA/ICcxJyA6IGE7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlKHZhbHVlOiBzdHJpbmcpOiBUaGVtZUNvbG9yIHtcbiAgICAgICAgbGV0IHIsIGcsIGIsIGEgPSAnMSc7XG5cbiAgICAgICAgY29uc3QgcmdiYVBhdHRlcm4gPSAvXnJnYmE/XFwoKFxcZCspLFxccyooXFxkKyksXFxzKihcXGQrKSg/OixcXHMqKFxcZCsoPzpcXC5cXGQrKT8pKT9cXCkkLztcbiAgICAgICAgY29uc3Qgc2hvcnRIZXhQYXR0ZXJuID0gL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaTtcbiAgICAgICAgY29uc3QgbG9uZ0hleFBhdHRlcm4gPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC9pO1xuXG4gICAgICAgIGNvbnN0IHJnYmFNYXRjaCA9IHZhbHVlLm1hdGNoKHJnYmFQYXR0ZXJuKTtcbiAgICAgICAgY29uc3Qgc2hvcnRIZXhNYXRjaCA9IHZhbHVlLm1hdGNoKHNob3J0SGV4UGF0dGVybik7XG4gICAgICAgIGNvbnN0IGxvbmdIZXhNYXRjaCA9IHZhbHVlLm1hdGNoKGxvbmdIZXhQYXR0ZXJuKTtcblxuICAgICAgICBpZiAocmdiYU1hdGNoKSB7XG4gICAgICAgICAgICByID0gcmdiYU1hdGNoWzFdO1xuICAgICAgICAgICAgZyA9IHJnYmFNYXRjaFsyXTtcbiAgICAgICAgICAgIGIgPSByZ2JhTWF0Y2hbM107XG4gICAgICAgICAgICBhID0gcmdiYU1hdGNoWzRdID8gcmdiYU1hdGNoWzRdIDogJzEnO1xuICAgICAgICB9IGVsc2UgaWYgKGxvbmdIZXhNYXRjaCkge1xuICAgICAgICAgICAgciA9IHBhcnNlSW50KGxvbmdIZXhNYXRjaFsxXSwgMTYpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBnID0gcGFyc2VJbnQobG9uZ0hleE1hdGNoWzJdLCAxNikudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGIgPSBwYXJzZUludChsb25nSGV4TWF0Y2hbM10sIDE2KS50b1N0cmluZygpO1xuICAgICAgICB9IGVsc2UgaWYgKHNob3J0SGV4TWF0Y2gpIHtcbiAgICAgICAgICAgIHIgPSBwYXJzZUludChzaG9ydEhleE1hdGNoWzFdICsgc2hvcnRIZXhNYXRjaFsxXSwgMTYpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBnID0gcGFyc2VJbnQoc2hvcnRIZXhNYXRjaFsyXSArIHNob3J0SGV4TWF0Y2hbMl0sIDE2KS50b1N0cmluZygpO1xuICAgICAgICAgICAgYiA9IHBhcnNlSW50KHNob3J0SGV4TWF0Y2hbM10gKyBzaG9ydEhleE1hdGNoWzNdLCAxNikudG9TdHJpbmcoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IHBhcnNlIGNvbG9yIC0gJHt2YWx1ZX0gaXMgbm90IGEgdmFsaWQgY29sb3IuYCk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5ldyBUaGVtZUNvbG9yKHIsIGcsIGIsIGEpO1xuICAgIH1cblxuICAgIHRvSGV4KCkge1xuICAgICAgICBsZXQgcmVkID0gcGFyc2VJbnQodGhpcy5fcikudG9TdHJpbmcoMTYpO1xuICAgICAgICBsZXQgZ3JlZW4gPSBwYXJzZUludCh0aGlzLl9nKS50b1N0cmluZygxNik7XG4gICAgICAgIGxldCBibHVlID0gcGFyc2VJbnQodGhpcy5fYikudG9TdHJpbmcoMTYpO1xuXG4gICAgICAgIGlmIChyZWQubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgcmVkID0gJzAnICsgcmVkO1xuICAgICAgICB9XG4gICAgICAgIGlmIChncmVlbi5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICBncmVlbiA9ICcwJyArIGdyZWVuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChibHVlLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIGJsdWUgPSAnMCcgKyBibHVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuICcjJyArIHJlZCArIGdyZWVuICsgYmx1ZTtcbiAgICB9XG5cbiAgICB0b1JnYigpIHtcbiAgICAgICAgcmV0dXJuICdyZ2IoJyArIHRoaXMuX3IgKyAnLCAnICsgdGhpcy5fZyArICcsICcgKyB0aGlzLl9iICsgJyknO1xuICAgIH1cblxuICAgIHRvUmdiYSgpIHtcbiAgICAgICAgcmV0dXJuICdyZ2JhKCcgKyB0aGlzLl9yICsgJywgJyArIHRoaXMuX2cgKyAnLCAnICsgdGhpcy5fYiArICcsICcgKyB0aGlzLl9hICsgJyknO1xuICAgIH1cblxuICAgIGdldFJlZCgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3I7XG4gICAgfVxuXG4gICAgZ2V0R3JlZW4oKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9nO1xuICAgIH1cblxuICAgIGdldEJsdWUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9iO1xuICAgIH1cblxuICAgIGdldEFscGhhKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fYTtcbiAgICB9XG5cbiAgICBzZXRSZWQocmVkOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fciA9IHJlZDtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0R3JlZW4oZ3JlZW46IHN0cmluZykge1xuICAgICAgICB0aGlzLl9nID0gZ3JlZW47XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEJsdWUoYmx1ZTogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2IgPSBibHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRBbHBoYShhbHBoYTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgIHRoaXMuX2EgPSBhbHBoYS50b1N0cmluZygpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG59XG5cbmV4cG9ydCBjb25zdCBjb2xvclNldHMgPSB7XG4gICAga2VwcGVsOiB7XG4gICAgICAgIGNvbG9yQ2xhc3NTZXQ6IHtcbiAgICAgICAgICAgICdwcmltYXJ5JzogJ3ByaW1hcnknLFxuICAgICAgICAgICAgJ2FjY2VudCc6ICdhY2NlbnQnLFxuICAgICAgICAgICAgJ3NlY29uZGFyeSc6ICdzZWNvbmRhcnknLFxuICAgICAgICAgICAgJ2FsdGVybmF0ZTEnOiAnYWx0ZXJuYXRlMScsXG4gICAgICAgICAgICAnYWx0ZXJuYXRlMic6ICdhbHRlcm5hdGUyJyxcbiAgICAgICAgICAgICdhbHRlcm5hdGUzJzogJ2FsdGVybmF0ZTMnLFxuICAgICAgICAgICAgJ3ZpYnJhbnQxJzogJ3ZpYnJhbnQxJyxcbiAgICAgICAgICAgICd2aWJyYW50Mic6ICd2aWJyYW50MicsXG4gICAgICAgICAgICAnZ3JleTEnOiAnZ3JleTEnLFxuICAgICAgICAgICAgJ2dyZXkyJzogJ2dyZXkyJyxcbiAgICAgICAgICAgICdncmV5Myc6ICdncmV5MycsXG4gICAgICAgICAgICAnZ3JleTQnOiAnZ3JleTQnLFxuICAgICAgICAgICAgJ2dyZXk1JzogJ2dyZXk1JyxcbiAgICAgICAgICAgICdncmV5Nic6ICdncmV5NicsXG4gICAgICAgICAgICAnZ3JleTcnOiAnZ3JleTcnLFxuICAgICAgICAgICAgJ2dyZXk4JzogJ2dyZXk4JyxcbiAgICAgICAgICAgICdjaGFydDEnOiAnY2hhcnQxJyxcbiAgICAgICAgICAgICdjaGFydDInOiAnY2hhcnQyJyxcbiAgICAgICAgICAgICdjaGFydDMnOiAnY2hhcnQzJyxcbiAgICAgICAgICAgICdjaGFydDQnOiAnY2hhcnQ0JyxcbiAgICAgICAgICAgICdjaGFydDUnOiAnY2hhcnQ1JyxcbiAgICAgICAgICAgICdjaGFydDYnOiAnY2hhcnQ2JyxcbiAgICAgICAgICAgICdvayc6ICdvaycsXG4gICAgICAgICAgICAnd2FybmluZyc6ICd3YXJuaW5nJyxcbiAgICAgICAgICAgICdjcml0aWNhbCc6ICdjcml0aWNhbCcsXG4gICAgICAgICAgICAncGFydGl0aW9uMSc6ICdwYXJ0aXRpb24xJyxcbiAgICAgICAgICAgICdwYXJ0aXRpb245JzogJ3BhcnRpdGlvbjknLFxuICAgICAgICAgICAgJ3BhcnRpdGlvbjEwJzogJ3BhcnRpdGlvbjEwJyxcbiAgICAgICAgICAgICdwYXJ0aXRpb24xMSc6ICdwYXJ0aXRpb24xMScsXG4gICAgICAgICAgICAncGFydGl0aW9uMTInOiAncGFydGl0aW9uMTInLFxuICAgICAgICAgICAgJ3BhcnRpdGlvbjEzJzogJ3BhcnRpdGlvbjEzJyxcbiAgICAgICAgICAgICdwYXJ0aXRpb24xNCc6ICdwYXJ0aXRpb24xNCcsXG4gICAgICAgICAgICAnc29jaWFsLWNoYXJ0LW5vZGUnOiAnc29jaWFsLWNoYXJ0LW5vZGUnLFxuICAgICAgICAgICAgJ3NvY2lhbC1jaGFydC1lZGdlJzogJ3NvY2lhbC1jaGFydC1lZGdlJ1xuICAgICAgICB9XG4gICAgfSxcbiAgICBtaWNyb0ZvY3VzOiB7XG4gICAgICAgICdjb2xvclZhbHVlU2V0Jzoge1xuICAgICAgICAgICAgJ2NlcnVsZWFuJzogJyMxNjY4YzEnLFxuICAgICAgICAgICAgJ2FxdWEnOiAnIzI5Y2VmZicsXG4gICAgICAgICAgICAnYXF1YW1hcmluZSc6ICcjMmZkNmMzJyxcbiAgICAgICAgICAgICdmdWNoc2lhJzogJyNjNjE3OWQnLFxuICAgICAgICAgICAgJ2luZGlnbyc6ICcjNzQyNWFkJyxcbiAgICAgICAgICAgICdkYXJrLWJsdWUnOiAnIzIzMWNhNScsXG4gICAgICAgICAgICAnd2hpdGUnOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICAnc2xpZ2h0bHktZ3JheSc6ICcjZjVmN2Y4JyxcbiAgICAgICAgICAgICdicmlnaHQtZ3JheSc6ICcjZjFmMmYzJyxcbiAgICAgICAgICAgICdncmF5JzogJyNkY2RlZGYnLFxuICAgICAgICAgICAgJ3NpbHZlcic6ICcjYmRiZWMwJyxcbiAgICAgICAgICAgICdkaW0tZ3JheSc6ICcjNjU2NjY4JyxcbiAgICAgICAgICAgICdkYXJrLWdyYXknOiAnIzMyMzQzNScsXG4gICAgICAgICAgICAnYmxhY2snOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICAnY3JpbXNvbi1uZWdhdGl2ZSc6ICcjZTUwMDRjJyxcbiAgICAgICAgICAgICdhcHJpY290JzogJyNmNDhiMzQnLFxuICAgICAgICAgICAgJ3llbGxvdyc6ICcjZmNkYjFmJyxcbiAgICAgICAgICAgICdncmVlbi1wb3NpdGl2ZSc6ICcjMWFhYzYwJyxcbiAgICAgICAgICAgICd1bHRyYW1hcmluZSc6ICcjMzkzOWM2JyxcbiAgICAgICAgICAgICdza3libHVlJzogJyMwMGFiZjMnLFxuICAgICAgICAgICAgJ3BhbGUtYXF1YSc6ICcjNDNlNGZmJyxcbiAgICAgICAgICAgICdwYWxlLWdyZWVuJzogJyMxZmZiYmEnLFxuICAgICAgICAgICAgJ2xpbWUnOiAnIzc1ZGE0ZCcsXG4gICAgICAgICAgICAnb3JhbmdlJzogJyNmZmNlMDAnLFxuICAgICAgICAgICAgJ21hZ2VudGEnOiAnI2ViMjNjMicsXG4gICAgICAgICAgICAncGFsZS1wdXJwbGUnOiAnI2JhNDdlMicsXG4gICAgICAgICAgICAnZGFyay11bHRyYW1hcmluZSc6ICcjMjcxNzgyJyxcbiAgICAgICAgICAgICdzdGVlbGJsdWUnOiAnIzAxNDI3MicsXG4gICAgICAgICAgICAnYXJjdGljLWJsdWUnOiAnIzBiOGVhYycsXG4gICAgICAgICAgICAnZW1lcmFsZCc6ICcjMDBhOTg5JyxcbiAgICAgICAgICAgICdvbGl2ZSc6ICcjNWJiYTM2JyxcbiAgICAgICAgICAgICdnb2xkZW5yb2QnOiAnI2ZmYjAwMCcsXG4gICAgICAgICAgICAncHVycGxlJzogJyM5YjFlODMnLFxuICAgICAgICAgICAgJ3BhbGUtZWdncGxhbnQnOiAnIzUyMTZhYycsXG4gICAgICAgICAgICAncmVkJzogJyNmZjQ1NGYnLFxuICAgICAgICAgICAgJ3BhbGUtYW1iZXInOiAnI2ZmYjI0ZCcsXG4gICAgICAgICAgICAncGFsZS1sZW1vbic6ICcjZmRlMTU5JyxcbiAgICAgICAgICAgICdwYWxlLWVtZXJhbGQnOiAnIzMzYzE4MCcsXG4gICAgICAgICAgICAncGx1bSc6ICcjYjIxNjQ2JyxcbiAgICAgICAgICAgICdjb3BwZXInOiAnI2U1NzgyOCcsXG4gICAgICAgICAgICAnYW1iZXInOiAnI2ZmYzAwMicsXG4gICAgICAgICAgICAnbGVhZi1ncmVlbic6ICcjMTE4YzRmJyxcbiAgICAgICAgICAgICdmb3Jlc3QtZ3JlZW4nOiAnIzAwNjQ1YScsXG4gICAgICAgICAgICAncHJpbWFyeSc6ICcjMDA3M2U3JyxcbiAgICAgICAgICAgICdhY2NlbnQnOiAnIzc0MjVhZCcsXG4gICAgICAgICAgICAnc2Vjb25kYXJ5JzogJyNmZmZmZmYnLFxuICAgICAgICAgICAgJ2FsdGVybmF0ZTEnOiAnIzI5Y2VmZicsXG4gICAgICAgICAgICAnYWx0ZXJuYXRlMic6ICcjMmZkNmMzJyxcbiAgICAgICAgICAgICdhbHRlcm5hdGUzJzogJyNjNjE3OWQnLFxuICAgICAgICAgICAgJ3ZpYnJhbnQxJzogJyM0M2U0ZmYnLFxuICAgICAgICAgICAgJ3ZpYnJhbnQyJzogJyNmZmNlMDAnLFxuICAgICAgICAgICAgJ2dyZXkxJzogJyMwMDAwMDAnLFxuICAgICAgICAgICAgJ2dyZXkyJzogJyMzMjM0MzUnLFxuICAgICAgICAgICAgJ2dyZXkzJzogJyM2NTY2NjgnLFxuICAgICAgICAgICAgJ2dyZXk0JzogJyNiZGJlYzAnLFxuICAgICAgICAgICAgJ2dyZXk1JzogJyNkY2RlZGYnLFxuICAgICAgICAgICAgJ2dyZXk2JzogJyNmMWYyZjMnLFxuICAgICAgICAgICAgJ2dyZXk3JzogJyNmNWY3ZjgnLFxuICAgICAgICAgICAgJ2dyZXk4JzogJyNmZmZmZmYnLFxuICAgICAgICAgICAgJ2NoYXJ0MSc6ICcjMzkzOWM2JyxcbiAgICAgICAgICAgICdjaGFydDInOiAnIzAwYWJmMycsXG4gICAgICAgICAgICAnY2hhcnQzJzogJyM3NWRhNGQnLFxuICAgICAgICAgICAgJ2NoYXJ0NCc6ICcjZmZjZTAwJyxcbiAgICAgICAgICAgICdjaGFydDUnOiAnI2ViMjNjMicsXG4gICAgICAgICAgICAnY2hhcnQ2JzogJyNiYTQ3ZTInLFxuICAgICAgICAgICAgJ29rJzogJyMxYWFjNjAnLFxuICAgICAgICAgICAgJ3dhcm5pbmcnOiAnI2Y0OGIzNCcsXG4gICAgICAgICAgICAnY3JpdGljYWwnOiAnZTUwMDRjJyxcbiAgICAgICAgICAgICdwYXJ0aXRpb24xJzogJyM3NDI1YWQnLFxuICAgICAgICAgICAgJ3BhcnRpdGlvbjknOiAnIzUyMTZhYycsXG4gICAgICAgICAgICAncGFydGl0aW9uMTAnOiAnIzViYmEzNicsXG4gICAgICAgICAgICAncGFydGl0aW9uMTEnOiAnIzAxNDI3MicsXG4gICAgICAgICAgICAncGFydGl0aW9uMTInOiAnI2ZmYjAwMCcsXG4gICAgICAgICAgICAncGFydGl0aW9uMTMnOiAnI2JkYmVjMCcsXG4gICAgICAgICAgICAncGFydGl0aW9uMTQnOiAnIzI3MTc4MicsXG4gICAgICAgICAgICAnc29jaWFsLWNoYXJ0LW5vZGUnOiAnI2ZmMDBmZicsXG4gICAgICAgICAgICAnc29jaWFsLWNoYXJ0LWVkZ2UnOiAnI2ZmMDBmZidcbiAgICAgICAgfVxuICAgIH1cbn07XG5cbmV4cG9ydCBpbnRlcmZhY2UgVGhlbWVDb2xvcnMge1xuICAgIFtuYW1lOiBzdHJpbmddOiBUaGVtZUNvbG9yO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbG9yU2V0IHtcbiAgICBjb2xvckNsYXNzU2V0PzogQ29sb3JDbGFzc1NldDtcbiAgICBjb2xvclZhbHVlU2V0PzogQ29sb3JWYWx1ZVNldDtcbn1cblxuZXhwb3J0IGludGVyZmFjZSBDb2xvckNsYXNzU2V0IHtcbiAgICBbbmFtZTogc3RyaW5nXTogc3RyaW5nO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbG9yVmFsdWVTZXQge1xuICAgIFtuYW1lOiBzdHJpbmddOiBzdHJpbmc7XG59XG5cbmV4cG9ydCB0eXBlIENvbG9ySWRlbnRpZmllciA9IHN0cmluZztcbiJdfQ==