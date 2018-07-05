/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
var ColorService = (function () {
    function ColorService() {
        this._colorSet = colorSets.keppel;
        if (this._colorSet.colorClassSet) {
            this.setColors();
        }
        else {
            for (var /** @type {?} */ key in this._colorSet.colorValueSet) {
                this._colors[key] = this.getColorValueByHex(this._colorSet.colorValueSet[key]);
            }
        }
    }
    /**
     * @return {?}
     */
    ColorService.prototype.setColors = /**
     * @return {?}
     */
    function () {
        this._html = '';
        for (var /** @type {?} */ key in this._colorSet.colorClassSet) {
            this._html += '<div class="' + this._colorSet.colorClassSet[key] + '-color"></div>';
        }
        this._element = document.createElement('div');
        this._element.className = 'color-chart';
        this._element.innerHTML = this._html;
        document.body.appendChild(this._element);
        this._colors = {};
        for (var /** @type {?} */ key in this._colorSet.colorClassSet) {
            this._colors[key] = this.getColorValue(this._colorSet.colorClassSet[key]);
        }
        this._element.parentNode.removeChild(this._element);
    };
    /**
     * @param {?} color
     * @return {?}
     */
    ColorService.prototype.getColorValueByHex = /**
     * @param {?} color
     * @return {?}
     */
    function (color) {
        var /** @type {?} */ hex = color.replace('#', '');
        var /** @type {?} */ r = parseInt(hex.substring(0, 2), 16).toString();
        var /** @type {?} */ g = parseInt(hex.substring(2, 4), 16).toString();
        var /** @type {?} */ b = parseInt(hex.substring(4, 6), 16).toString();
        return new ThemeColor(r, g, b, '1');
    };
    /**
     * @param {?} color
     * @return {?}
     */
    ColorService.prototype.getColorValue = /**
     * @param {?} color
     * @return {?}
     */
    function (color) {
        var /** @type {?} */ target = this._element.querySelector('.' + this._colorSet.colorClassSet[color] + '-color');
        if (!target) {
            throw new Error('Invalid color');
        }
        var /** @type {?} */ colorValue = window.getComputedStyle(target).backgroundColor;
        var /** @type {?} */ rgba = colorValue.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);
        return new ThemeColor(rgba[1], rgba[2], rgba[3], rgba[4]);
    };
    /**
     * @param {?} color
     * @return {?}
     */
    ColorService.prototype.getColor = /**
     * @param {?} color
     * @return {?}
     */
    function (color) {
        var /** @type {?} */ themeColor = this._colors[this.resolveColorName(color)];
        if (!themeColor) {
            throw new Error('Color not found: ' + color);
        }
        return new ThemeColor(themeColor.getRed(), themeColor.getGreen(), themeColor.getBlue(), themeColor.getAlpha());
    };
    /**
     * @return {?}
     */
    ColorService.prototype.getColorSet = /**
     * @return {?}
     */
    function () {
        return this._colorSet;
    };
    /**
     * @param {?} colorSet
     * @return {?}
     */
    ColorService.prototype.setColorSet = /**
     * @param {?} colorSet
     * @return {?}
     */
    function (colorSet) {
        this._colorSet = colorSet;
        this._colors = {};
        if (this._colorSet.colorClassSet) {
            this.setColors();
        }
        else {
            for (var /** @type {?} */ key in this._colorSet.colorValueSet) {
                this._colors[key] = this.getColorValueByHex(this._colorSet.colorValueSet[key]);
            }
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    ColorService.prototype.resolve = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (!value) {
            return;
        }
        var /** @type {?} */ colorName = this.resolveColorName(value);
        for (var /** @type {?} */ color in this._colors) {
            if (colorName === color.toLowerCase()) {
                return this.getColor(colorName).toRgba();
            }
        }
        return value;
    };
    /**
     * @param {?=} value
     * @return {?}
     */
    ColorService.prototype.resolveColorName = /**
     * @param {?=} value
     * @return {?}
     */
    function (value) {
        if (value === void 0) { value = ''; }
        return value.replace(/\s+/g, '-').toLowerCase();
    };
    ColorService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    ColorService.ctorParameters = function () { return []; };
    return ColorService;
}());
export { ColorService };
function ColorService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ColorService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ColorService.ctorParameters;
    /** @type {?} */
    ColorService.prototype._html;
    /** @type {?} */
    ColorService.prototype._element;
    /** @type {?} */
    ColorService.prototype._colors;
    /** @type {?} */
    ColorService.prototype._colorSet;
}
var ThemeColor = (function () {
    function ThemeColor(r, g, b, a) {
        this._r = r;
        this._g = g;
        this._b = b;
        this._a = a === undefined ? '1' : a;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    ThemeColor.parse = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        var /** @type {?} */ r, /** @type {?} */ g, /** @type {?} */ b, /** @type {?} */ a = '1';
        var /** @type {?} */ rgbaPattern = /^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/;
        var /** @type {?} */ shortHexPattern = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
        var /** @type {?} */ longHexPattern = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/;
        var /** @type {?} */ rgbaMatch = value.match(rgbaPattern);
        var /** @type {?} */ shortHexMatch = value.match(shortHexPattern);
        var /** @type {?} */ longHexMatch = value.match(longHexPattern);
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
            throw new Error("Cannot parse color - " + value + " is not a valid color.");
        }
        return new ThemeColor(r, g, b, a);
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.toHex = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ red = parseInt(this._r).toString(16);
        var /** @type {?} */ green = parseInt(this._g).toString(16);
        var /** @type {?} */ blue = parseInt(this._b).toString(16);
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
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.toRgb = /**
     * @return {?}
     */
    function () {
        return 'rgb(' + this._r + ', ' + this._g + ', ' + this._b + ')';
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.toRgba = /**
     * @return {?}
     */
    function () {
        return 'rgba(' + this._r + ', ' + this._g + ', ' + this._b + ', ' + this._a + ')';
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.getRed = /**
     * @return {?}
     */
    function () {
        return this._r;
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.getGreen = /**
     * @return {?}
     */
    function () {
        return this._g;
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.getBlue = /**
     * @return {?}
     */
    function () {
        return this._b;
    };
    /**
     * @return {?}
     */
    ThemeColor.prototype.getAlpha = /**
     * @return {?}
     */
    function () {
        return this._a;
    };
    /**
     * @param {?} red
     * @return {?}
     */
    ThemeColor.prototype.setRed = /**
     * @param {?} red
     * @return {?}
     */
    function (red) {
        this._r = red;
        return this;
    };
    /**
     * @param {?} green
     * @return {?}
     */
    ThemeColor.prototype.setGreen = /**
     * @param {?} green
     * @return {?}
     */
    function (green) {
        this._g = green;
        return this;
    };
    /**
     * @param {?} blue
     * @return {?}
     */
    ThemeColor.prototype.setBlue = /**
     * @param {?} blue
     * @return {?}
     */
    function (blue) {
        this._b = blue;
        return this;
    };
    /**
     * @param {?} alpha
     * @return {?}
     */
    ThemeColor.prototype.setAlpha = /**
     * @param {?} alpha
     * @return {?}
     */
    function (alpha) {
        this._a = alpha.toString();
        return this;
    };
    return ThemeColor;
}());
export { ThemeColor };
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
export var /** @type {?} */ colorSets = {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3Iuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9jb2xvci9jb2xvci5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDOztJQVd2Qzt5QkFGeUIsU0FBUyxDQUFDLE1BQU07UUFHckMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQztTQUNwQjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osR0FBRyxDQUFDLENBQUMscUJBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzthQUNsRjtTQUNKO0tBQ0o7Ozs7SUFFTyxnQ0FBUzs7OztRQUViLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBRWhCLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLEtBQUssSUFBSSxjQUFjLEdBQUcsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsZ0JBQWdCLENBQUM7U0FDdkY7UUFFRCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDOUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLEdBQUcsYUFBYSxDQUFDO1FBQ3hDLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUM7UUFFckMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBRXpDLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWxCLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDM0MsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDN0U7UUFFRCxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDOzs7Ozs7SUFHaEQseUNBQWtCOzs7O2NBQUMsS0FBYTtRQUNwQyxxQkFBTSxHQUFHLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFbkMscUJBQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN2RCxxQkFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ3ZELHFCQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7UUFFdkQsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDOzs7Ozs7SUFHaEMsb0NBQWE7Ozs7Y0FBQyxLQUFzQjtRQUV4QyxxQkFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxHQUFHLFFBQVEsQ0FBQyxDQUFDO1FBRWpHLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUNWLE1BQU0sSUFBSSxLQUFLLENBQUMsZUFBZSxDQUFDLENBQUM7U0FDcEM7UUFFRCxxQkFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLGVBQWUsQ0FBQztRQUVuRSxxQkFBTSxJQUFJLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyw0REFBNEQsQ0FBQyxDQUFDO1FBRTVGLE1BQU0sQ0FBQyxJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBRzlELCtCQUFROzs7O0lBQVIsVUFBUyxLQUFzQjtRQUMzQixxQkFBTSxVQUFVLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM5RCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDZCxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixHQUFHLEtBQUssQ0FBQyxDQUFDO1NBQ2hEO1FBRUQsTUFBTSxDQUFDLElBQUksVUFBVSxDQUFDLFVBQVUsQ0FBQyxNQUFNLEVBQUUsRUFBRSxVQUFVLENBQUMsUUFBUSxFQUFFLEVBQUUsVUFBVSxDQUFDLE9BQU8sRUFBRSxFQUFFLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQ2xIOzs7O0lBRUQsa0NBQVc7OztJQUFYO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUM7S0FDekI7Ozs7O0lBRUQsa0NBQVc7Ozs7SUFBWCxVQUFZLFFBQWtCO1FBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1FBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBRWxCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7U0FDcEI7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEdBQUcsQ0FBQyxDQUFDLHFCQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7YUFDbEY7U0FDSjtLQUNKOzs7OztJQUVELDhCQUFPOzs7O0lBQVAsVUFBUSxLQUFhO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNULE1BQU0sQ0FBQztTQUNWO1FBRUQscUJBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUUvQyxHQUFHLENBQUMsQ0FBQyxxQkFBSSxLQUFLLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDN0IsRUFBRSxDQUFDLENBQUMsU0FBUyxLQUFLLEtBQUssQ0FBQyxXQUFXLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDO2FBQzVDO1NBQ0o7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDO0tBQ2hCOzs7OztJQUVELHVDQUFnQjs7OztJQUFoQixVQUFpQixLQUFrQjtRQUFsQixzQkFBQSxFQUFBLFVBQWtCO1FBQy9CLE1BQU0sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNuRDs7Z0JBOUdKLFVBQVU7Ozs7dUJBSFg7O1NBSWEsWUFBWTs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0h6QixJQUFBO0lBT0ksb0JBQVksQ0FBUyxFQUFFLENBQVMsRUFBRSxDQUFTLEVBQUUsQ0FBUztRQUNsRCxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNaLElBQUksQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQ1osSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDWixJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxTQUFTLEdBQUcsR0FBRyxHQUFHLENBQUMsQ0FBQztLQUN2Qzs7Ozs7SUFFTSxnQkFBSzs7OztJQUFaLFVBQWEsS0FBYTtRQUN0QixxQkFBSSxDQUFDLG1CQUFFLENBQUMsbUJBQUUsQ0FBQyxtQkFBRSxDQUFDLEdBQUcsR0FBRyxDQUFDO1FBRXJCLHFCQUFNLFdBQVcsR0FBRyw0REFBNEQsQ0FBQztRQUNqRixxQkFBTSxlQUFlLEdBQUcsa0NBQWtDLENBQUM7UUFDM0QscUJBQU0sY0FBYyxHQUFHLDBDQUEwQyxDQUFDO1FBRWxFLHFCQUFNLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQzNDLHFCQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQ25ELHFCQUFNLFlBQVksR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBRWpELEVBQUUsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDWixDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLENBQUMsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNqQixDQUFDLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDekM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUN0QixDQUFDLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM3QyxDQUFDLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUM3QyxDQUFDLEdBQUcsUUFBUSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUNoRDtRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO1lBQ3ZCLENBQUMsR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztZQUNqRSxDQUFDLEdBQUcsUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDakUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQ3BFO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLDBCQUF3QixLQUFLLDJCQUF3QixDQUFDLENBQUM7U0FDMUU7UUFDRCxNQUFNLENBQUMsSUFBSSxVQUFVLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7S0FDckM7Ozs7SUFFRCwwQkFBSzs7O0lBQUw7UUFDSSxxQkFBSSxHQUFHLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDekMscUJBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzNDLHFCQUFJLElBQUksR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUUxQyxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakIsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLENBQUM7U0FDbkI7UUFDRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkIsS0FBSyxHQUFHLEdBQUcsR0FBRyxLQUFLLENBQUM7U0FDdkI7UUFDRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEIsSUFBSSxHQUFHLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDckI7UUFFRCxNQUFNLENBQUMsR0FBRyxHQUFHLEdBQUcsR0FBRyxLQUFLLEdBQUcsSUFBSSxDQUFDO0tBQ25DOzs7O0lBRUQsMEJBQUs7OztJQUFMO1FBQ0ksTUFBTSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksR0FBRyxJQUFJLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQztLQUNuRTs7OztJQUVELDJCQUFNOzs7SUFBTjtRQUNJLE1BQU0sQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLEdBQUcsSUFBSSxDQUFDLEVBQUUsR0FBRyxHQUFHLENBQUM7S0FDckY7Ozs7SUFFRCwyQkFBTTs7O0lBQU47UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztLQUNsQjs7OztJQUVELDZCQUFROzs7SUFBUjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDO0tBQ2xCOzs7O0lBRUQsNEJBQU87OztJQUFQO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUM7S0FDbEI7Ozs7SUFFRCw2QkFBUTs7O0lBQVI7UUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztLQUNsQjs7Ozs7SUFFRCwyQkFBTTs7OztJQUFOLFVBQU8sR0FBVztRQUNkLElBQUksQ0FBQyxFQUFFLEdBQUcsR0FBRyxDQUFDO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmOzs7OztJQUVELDZCQUFROzs7O0lBQVIsVUFBUyxLQUFhO1FBQ2xCLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFDO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjs7Ozs7SUFFRCw0QkFBTzs7OztJQUFQLFVBQVEsSUFBWTtRQUNoQixJQUFJLENBQUMsRUFBRSxHQUFHLElBQUksQ0FBQztRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUM7S0FDZjs7Ozs7SUFFRCw2QkFBUTs7OztJQUFSLFVBQVMsS0FBc0I7UUFDM0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQztLQUNmO3FCQTVOTDtJQTZOQyxDQUFBO0FBekdELHNCQXlHQzs7Ozs7Ozs7Ozs7QUFFRCxNQUFNLENBQUMscUJBQU0sU0FBUyxHQUFHO0lBQ3JCLE1BQU0sRUFBRTtRQUNKLGFBQWEsRUFBRTtZQUNYLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFdBQVcsRUFBRSxXQUFXO1lBQ3hCLFlBQVksRUFBRSxZQUFZO1lBQzFCLFlBQVksRUFBRSxZQUFZO1lBQzFCLFlBQVksRUFBRSxZQUFZO1lBQzFCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLFVBQVUsRUFBRSxVQUFVO1lBQ3RCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLE9BQU8sRUFBRSxPQUFPO1lBQ2hCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLFFBQVEsRUFBRSxRQUFRO1lBQ2xCLElBQUksRUFBRSxJQUFJO1lBQ1YsU0FBUyxFQUFFLFNBQVM7WUFDcEIsVUFBVSxFQUFFLFVBQVU7WUFDdEIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsWUFBWSxFQUFFLFlBQVk7WUFDMUIsYUFBYSxFQUFFLGFBQWE7WUFDNUIsYUFBYSxFQUFFLGFBQWE7WUFDNUIsYUFBYSxFQUFFLGFBQWE7WUFDNUIsYUFBYSxFQUFFLGFBQWE7WUFDNUIsYUFBYSxFQUFFLGFBQWE7WUFDNUIsbUJBQW1CLEVBQUUsbUJBQW1CO1lBQ3hDLG1CQUFtQixFQUFFLG1CQUFtQjtTQUMzQztLQUNKO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsZUFBZSxFQUFFO1lBQ2IsVUFBVSxFQUFFLFNBQVM7WUFDckIsTUFBTSxFQUFFLFNBQVM7WUFDakIsWUFBWSxFQUFFLFNBQVM7WUFDdkIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLFNBQVM7WUFDdEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsZUFBZSxFQUFFLFNBQVM7WUFDMUIsYUFBYSxFQUFFLFNBQVM7WUFDeEIsTUFBTSxFQUFFLFNBQVM7WUFDakIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsVUFBVSxFQUFFLFNBQVM7WUFDckIsV0FBVyxFQUFFLFNBQVM7WUFDdEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsa0JBQWtCLEVBQUUsU0FBUztZQUM3QixTQUFTLEVBQUUsU0FBUztZQUNwQixRQUFRLEVBQUUsU0FBUztZQUNuQixnQkFBZ0IsRUFBRSxTQUFTO1lBQzNCLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLFdBQVcsRUFBRSxTQUFTO1lBQ3RCLFlBQVksRUFBRSxTQUFTO1lBQ3ZCLE1BQU0sRUFBRSxTQUFTO1lBQ2pCLFFBQVEsRUFBRSxTQUFTO1lBQ25CLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLGFBQWEsRUFBRSxTQUFTO1lBQ3hCLGtCQUFrQixFQUFFLFNBQVM7WUFDN0IsV0FBVyxFQUFFLFNBQVM7WUFDdEIsYUFBYSxFQUFFLFNBQVM7WUFDeEIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsV0FBVyxFQUFFLFNBQVM7WUFDdEIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsZUFBZSxFQUFFLFNBQVM7WUFDMUIsS0FBSyxFQUFFLFNBQVM7WUFDaEIsWUFBWSxFQUFFLFNBQVM7WUFDdkIsWUFBWSxFQUFFLFNBQVM7WUFDdkIsY0FBYyxFQUFFLFNBQVM7WUFDekIsTUFBTSxFQUFFLFNBQVM7WUFDakIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsWUFBWSxFQUFFLFNBQVM7WUFDdkIsY0FBYyxFQUFFLFNBQVM7WUFDekIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsV0FBVyxFQUFFLFNBQVM7WUFDdEIsWUFBWSxFQUFFLFNBQVM7WUFDdkIsWUFBWSxFQUFFLFNBQVM7WUFDdkIsWUFBWSxFQUFFLFNBQVM7WUFDdkIsVUFBVSxFQUFFLFNBQVM7WUFDckIsVUFBVSxFQUFFLFNBQVM7WUFDckIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLFNBQVM7WUFDbEIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsUUFBUSxFQUFFLFNBQVM7WUFDbkIsSUFBSSxFQUFFLFNBQVM7WUFDZixTQUFTLEVBQUUsU0FBUztZQUNwQixVQUFVLEVBQUUsUUFBUTtZQUNwQixZQUFZLEVBQUUsU0FBUztZQUN2QixZQUFZLEVBQUUsU0FBUztZQUN2QixhQUFhLEVBQUUsU0FBUztZQUN4QixhQUFhLEVBQUUsU0FBUztZQUN4QixhQUFhLEVBQUUsU0FBUztZQUN4QixhQUFhLEVBQUUsU0FBUztZQUN4QixhQUFhLEVBQUUsU0FBUztZQUN4QixtQkFBbUIsRUFBRSxTQUFTO1lBQzlCLG1CQUFtQixFQUFFLFNBQVM7U0FDakM7S0FDSjtDQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb2xvckNsYXNzU2V0LCBDb2xvclZhbHVlU2V0IH0gZnJvbSAnLi9jb2xvci5zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENvbG9yU2VydmljZSB7XG5cbiAgICBwcml2YXRlIF9odG1sOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gICAgcHJpdmF0ZSBfY29sb3JzOiBUaGVtZUNvbG9ycztcbiAgICBwcml2YXRlIF9jb2xvclNldDogYW55ID0gY29sb3JTZXRzLmtlcHBlbDtcblxuICAgIGNvbnN0cnVjdG9yKCkge1xuICAgICAgICBpZiAodGhpcy5fY29sb3JTZXQuY29sb3JDbGFzc1NldCkge1xuICAgICAgICAgICAgdGhpcy5zZXRDb2xvcnMoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9jb2xvclNldC5jb2xvclZhbHVlU2V0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29sb3JzW2tleV0gPSB0aGlzLmdldENvbG9yVmFsdWVCeUhleCh0aGlzLl9jb2xvclNldC5jb2xvclZhbHVlU2V0W2tleV0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBzZXRDb2xvcnMoKSB7XG5cbiAgICAgICAgdGhpcy5faHRtbCA9ICcnO1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9jb2xvclNldC5jb2xvckNsYXNzU2V0KSB7XG4gICAgICAgICAgICB0aGlzLl9odG1sICs9ICc8ZGl2IGNsYXNzPVwiJyArIHRoaXMuX2NvbG9yU2V0LmNvbG9yQ2xhc3NTZXRba2V5XSArICctY29sb3JcIj48L2Rpdj4nO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICB0aGlzLl9lbGVtZW50LmNsYXNzTmFtZSA9ICdjb2xvci1jaGFydCc7XG4gICAgICAgIHRoaXMuX2VsZW1lbnQuaW5uZXJIVE1MID0gdGhpcy5faHRtbDtcblxuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHRoaXMuX2VsZW1lbnQpO1xuXG4gICAgICAgIHRoaXMuX2NvbG9ycyA9IHt9O1xuXG4gICAgICAgIGZvciAobGV0IGtleSBpbiB0aGlzLl9jb2xvclNldC5jb2xvckNsYXNzU2V0KSB7XG4gICAgICAgICAgICB0aGlzLl9jb2xvcnNba2V5XSA9IHRoaXMuZ2V0Q29sb3JWYWx1ZSh0aGlzLl9jb2xvclNldC5jb2xvckNsYXNzU2V0W2tleV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHRoaXMuX2VsZW1lbnQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29sb3JWYWx1ZUJ5SGV4KGNvbG9yOiBzdHJpbmcpOiBUaGVtZUNvbG9yIHtcbiAgICAgICAgY29uc3QgaGV4ID0gY29sb3IucmVwbGFjZSgnIycsICcnKTtcblxuICAgICAgICBjb25zdCByID0gcGFyc2VJbnQoaGV4LnN1YnN0cmluZygwLCAyKSwgMTYpLnRvU3RyaW5nKCk7XG4gICAgICAgIGNvbnN0IGcgPSBwYXJzZUludChoZXguc3Vic3RyaW5nKDIsIDQpLCAxNikudG9TdHJpbmcoKTtcbiAgICAgICAgY29uc3QgYiA9IHBhcnNlSW50KGhleC5zdWJzdHJpbmcoNCwgNiksIDE2KS50b1N0cmluZygpO1xuXG4gICAgICAgIHJldHVybiBuZXcgVGhlbWVDb2xvcihyLCBnLCBiLCAnMScpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Q29sb3JWYWx1ZShjb2xvcjogQ29sb3JJZGVudGlmaWVyKTogVGhlbWVDb2xvciB7XG5cbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5fZWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuJyArIHRoaXMuX2NvbG9yU2V0LmNvbG9yQ2xhc3NTZXRbY29sb3JdICsgJy1jb2xvcicpO1xuXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY29sb3InKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbG9yVmFsdWUgPSB3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZSh0YXJnZXQpLmJhY2tncm91bmRDb2xvcjtcblxuICAgICAgICBjb25zdCByZ2JhID0gY29sb3JWYWx1ZS5tYXRjaCgvXnJnYmE/XFwoKFxcZCspLFxccyooXFxkKyksXFxzKihcXGQrKSg/OixcXHMqKFxcZCsoPzpcXC5cXGQrKT8pKT9cXCkkLyk7XG5cbiAgICAgICAgcmV0dXJuIG5ldyBUaGVtZUNvbG9yKHJnYmFbMV0sIHJnYmFbMl0sIHJnYmFbM10sIHJnYmFbNF0pO1xuICAgIH1cblxuICAgIGdldENvbG9yKGNvbG9yOiBDb2xvcklkZW50aWZpZXIpOiBUaGVtZUNvbG9yIHtcbiAgICAgICAgY29uc3QgdGhlbWVDb2xvciA9IHRoaXMuX2NvbG9yc1t0aGlzLnJlc29sdmVDb2xvck5hbWUoY29sb3IpXTtcbiAgICAgICAgaWYgKCF0aGVtZUNvbG9yKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvbG9yIG5vdCBmb3VuZDogJyArIGNvbG9yKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBuZXcgVGhlbWVDb2xvcih0aGVtZUNvbG9yLmdldFJlZCgpLCB0aGVtZUNvbG9yLmdldEdyZWVuKCksIHRoZW1lQ29sb3IuZ2V0Qmx1ZSgpLCB0aGVtZUNvbG9yLmdldEFscGhhKCkpO1xuICAgIH1cblxuICAgIGdldENvbG9yU2V0KCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fY29sb3JTZXQ7XG4gICAgfVxuXG4gICAgc2V0Q29sb3JTZXQoY29sb3JTZXQ6IENvbG9yU2V0KSB7XG4gICAgICAgIHRoaXMuX2NvbG9yU2V0ID0gY29sb3JTZXQ7XG4gICAgICAgIHRoaXMuX2NvbG9ycyA9IHt9O1xuXG4gICAgICAgIGlmICh0aGlzLl9jb2xvclNldC5jb2xvckNsYXNzU2V0KSB7XG4gICAgICAgICAgICB0aGlzLnNldENvbG9ycygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZm9yIChsZXQga2V5IGluIHRoaXMuX2NvbG9yU2V0LmNvbG9yVmFsdWVTZXQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb2xvcnNba2V5XSA9IHRoaXMuZ2V0Q29sb3JWYWx1ZUJ5SGV4KHRoaXMuX2NvbG9yU2V0LmNvbG9yVmFsdWVTZXRba2V5XSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICByZXNvbHZlKHZhbHVlOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgICAgICBpZiAoIXZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBjb2xvck5hbWUgPSB0aGlzLnJlc29sdmVDb2xvck5hbWUodmFsdWUpO1xuXG4gICAgICAgIGZvciAobGV0IGNvbG9yIGluIHRoaXMuX2NvbG9ycykge1xuICAgICAgICAgICAgaWYgKGNvbG9yTmFtZSA9PT0gY29sb3IudG9Mb3dlckNhc2UoKSkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmdldENvbG9yKGNvbG9yTmFtZSkudG9SZ2JhKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuXG4gICAgcmVzb2x2ZUNvbG9yTmFtZSh2YWx1ZTogc3RyaW5nID0gJycpOiBzdHJpbmcge1xuICAgICAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgvXFxzKy9nLCAnLScpLnRvTG93ZXJDYXNlKCk7XG4gICAgfVxufVxuXG5leHBvcnQgY2xhc3MgVGhlbWVDb2xvciB7XG5cbiAgICBwcml2YXRlIF9yOiBzdHJpbmc7XG4gICAgcHJpdmF0ZSBfZzogc3RyaW5nO1xuICAgIHByaXZhdGUgX2I6IHN0cmluZztcbiAgICBwcml2YXRlIF9hOiBzdHJpbmc7XG5cbiAgICBjb25zdHJ1Y3RvcihyOiBzdHJpbmcsIGc6IHN0cmluZywgYjogc3RyaW5nLCBhOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fciA9IHI7XG4gICAgICAgIHRoaXMuX2cgPSBnO1xuICAgICAgICB0aGlzLl9iID0gYjtcbiAgICAgICAgdGhpcy5fYSA9IGEgPT09IHVuZGVmaW5lZCA/ICcxJyA6IGE7XG4gICAgfVxuXG4gICAgc3RhdGljIHBhcnNlKHZhbHVlOiBzdHJpbmcpOiBUaGVtZUNvbG9yIHtcbiAgICAgICAgbGV0IHIsIGcsIGIsIGEgPSAnMSc7XG5cbiAgICAgICAgY29uc3QgcmdiYVBhdHRlcm4gPSAvXnJnYmE/XFwoKFxcZCspLFxccyooXFxkKyksXFxzKihcXGQrKSg/OixcXHMqKFxcZCsoPzpcXC5cXGQrKT8pKT9cXCkkLztcbiAgICAgICAgY29uc3Qgc2hvcnRIZXhQYXR0ZXJuID0gL14jPyhbYS1mXFxkXSkoW2EtZlxcZF0pKFthLWZcXGRdKSQvaTtcbiAgICAgICAgY29uc3QgbG9uZ0hleFBhdHRlcm4gPSAvXiM/KFthLWZcXGRdezJ9KShbYS1mXFxkXXsyfSkoW2EtZlxcZF17Mn0pJC87XG5cbiAgICAgICAgY29uc3QgcmdiYU1hdGNoID0gdmFsdWUubWF0Y2gocmdiYVBhdHRlcm4pO1xuICAgICAgICBjb25zdCBzaG9ydEhleE1hdGNoID0gdmFsdWUubWF0Y2goc2hvcnRIZXhQYXR0ZXJuKTtcbiAgICAgICAgY29uc3QgbG9uZ0hleE1hdGNoID0gdmFsdWUubWF0Y2gobG9uZ0hleFBhdHRlcm4pO1xuXG4gICAgICAgIGlmIChyZ2JhTWF0Y2gpIHtcbiAgICAgICAgICAgIHIgPSByZ2JhTWF0Y2hbMV07XG4gICAgICAgICAgICBnID0gcmdiYU1hdGNoWzJdO1xuICAgICAgICAgICAgYiA9IHJnYmFNYXRjaFszXTtcbiAgICAgICAgICAgIGEgPSByZ2JhTWF0Y2hbNF0gPyByZ2JhTWF0Y2hbNF0gOiAnMSc7XG4gICAgICAgIH0gZWxzZSBpZiAobG9uZ0hleE1hdGNoKSB7XG4gICAgICAgICAgICByID0gcGFyc2VJbnQobG9uZ0hleE1hdGNoWzFdLCAxNikudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGcgPSBwYXJzZUludChsb25nSGV4TWF0Y2hbMl0sIDE2KS50b1N0cmluZygpO1xuICAgICAgICAgICAgYiA9IHBhcnNlSW50KGxvbmdIZXhNYXRjaFszXSwgMTYpLnRvU3RyaW5nKCk7XG4gICAgICAgIH0gZWxzZSBpZiAoc2hvcnRIZXhNYXRjaCkge1xuICAgICAgICAgICAgciA9IHBhcnNlSW50KHNob3J0SGV4TWF0Y2hbMV0gKyBzaG9ydEhleE1hdGNoWzFdLCAxNikudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIGcgPSBwYXJzZUludChzaG9ydEhleE1hdGNoWzJdICsgc2hvcnRIZXhNYXRjaFsyXSwgMTYpLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICBiID0gcGFyc2VJbnQoc2hvcnRIZXhNYXRjaFszXSArIHNob3J0SGV4TWF0Y2hbM10sIDE2KS50b1N0cmluZygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBDYW5ub3QgcGFyc2UgY29sb3IgLSAke3ZhbHVlfSBpcyBub3QgYSB2YWxpZCBjb2xvci5gKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbmV3IFRoZW1lQ29sb3IociwgZywgYiwgYSk7XG4gICAgfVxuXG4gICAgdG9IZXgoKSB7XG4gICAgICAgIGxldCByZWQgPSBwYXJzZUludCh0aGlzLl9yKS50b1N0cmluZygxNik7XG4gICAgICAgIGxldCBncmVlbiA9IHBhcnNlSW50KHRoaXMuX2cpLnRvU3RyaW5nKDE2KTtcbiAgICAgICAgbGV0IGJsdWUgPSBwYXJzZUludCh0aGlzLl9iKS50b1N0cmluZygxNik7XG5cbiAgICAgICAgaWYgKHJlZC5sZW5ndGggPCAyKSB7XG4gICAgICAgICAgICByZWQgPSAnMCcgKyByZWQ7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGdyZWVuLmxlbmd0aCA8IDIpIHtcbiAgICAgICAgICAgIGdyZWVuID0gJzAnICsgZ3JlZW47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGJsdWUubGVuZ3RoIDwgMikge1xuICAgICAgICAgICAgYmx1ZSA9ICcwJyArIGJsdWU7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gJyMnICsgcmVkICsgZ3JlZW4gKyBibHVlO1xuICAgIH1cblxuICAgIHRvUmdiKCkge1xuICAgICAgICByZXR1cm4gJ3JnYignICsgdGhpcy5fciArICcsICcgKyB0aGlzLl9nICsgJywgJyArIHRoaXMuX2IgKyAnKSc7XG4gICAgfVxuXG4gICAgdG9SZ2JhKCkge1xuICAgICAgICByZXR1cm4gJ3JnYmEoJyArIHRoaXMuX3IgKyAnLCAnICsgdGhpcy5fZyArICcsICcgKyB0aGlzLl9iICsgJywgJyArIHRoaXMuX2EgKyAnKSc7XG4gICAgfVxuXG4gICAgZ2V0UmVkKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fcjtcbiAgICB9XG5cbiAgICBnZXRHcmVlbigpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2c7XG4gICAgfVxuXG4gICAgZ2V0Qmx1ZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2I7XG4gICAgfVxuXG4gICAgZ2V0QWxwaGEoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hO1xuICAgIH1cblxuICAgIHNldFJlZChyZWQ6IHN0cmluZykge1xuICAgICAgICB0aGlzLl9yID0gcmVkO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9XG5cbiAgICBzZXRHcmVlbihncmVlbjogc3RyaW5nKSB7XG4gICAgICAgIHRoaXMuX2cgPSBncmVlbjtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfVxuXG4gICAgc2V0Qmx1ZShibHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5fYiA9IGJsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cblxuICAgIHNldEFscGhhKGFscGhhOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICAgICAgdGhpcy5fYSA9IGFscGhhLnRvU3RyaW5nKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH1cbn1cblxuZXhwb3J0IGNvbnN0IGNvbG9yU2V0cyA9IHtcbiAgICBrZXBwZWw6IHtcbiAgICAgICAgY29sb3JDbGFzc1NldDoge1xuICAgICAgICAgICAgJ3ByaW1hcnknOiAncHJpbWFyeScsXG4gICAgICAgICAgICAnYWNjZW50JzogJ2FjY2VudCcsXG4gICAgICAgICAgICAnc2Vjb25kYXJ5JzogJ3NlY29uZGFyeScsXG4gICAgICAgICAgICAnYWx0ZXJuYXRlMSc6ICdhbHRlcm5hdGUxJyxcbiAgICAgICAgICAgICdhbHRlcm5hdGUyJzogJ2FsdGVybmF0ZTInLFxuICAgICAgICAgICAgJ2FsdGVybmF0ZTMnOiAnYWx0ZXJuYXRlMycsXG4gICAgICAgICAgICAndmlicmFudDEnOiAndmlicmFudDEnLFxuICAgICAgICAgICAgJ3ZpYnJhbnQyJzogJ3ZpYnJhbnQyJyxcbiAgICAgICAgICAgICdncmV5MSc6ICdncmV5MScsXG4gICAgICAgICAgICAnZ3JleTInOiAnZ3JleTInLFxuICAgICAgICAgICAgJ2dyZXkzJzogJ2dyZXkzJyxcbiAgICAgICAgICAgICdncmV5NCc6ICdncmV5NCcsXG4gICAgICAgICAgICAnZ3JleTUnOiAnZ3JleTUnLFxuICAgICAgICAgICAgJ2dyZXk2JzogJ2dyZXk2JyxcbiAgICAgICAgICAgICdncmV5Nyc6ICdncmV5NycsXG4gICAgICAgICAgICAnZ3JleTgnOiAnZ3JleTgnLFxuICAgICAgICAgICAgJ2NoYXJ0MSc6ICdjaGFydDEnLFxuICAgICAgICAgICAgJ2NoYXJ0Mic6ICdjaGFydDInLFxuICAgICAgICAgICAgJ2NoYXJ0Myc6ICdjaGFydDMnLFxuICAgICAgICAgICAgJ2NoYXJ0NCc6ICdjaGFydDQnLFxuICAgICAgICAgICAgJ2NoYXJ0NSc6ICdjaGFydDUnLFxuICAgICAgICAgICAgJ2NoYXJ0Nic6ICdjaGFydDYnLFxuICAgICAgICAgICAgJ29rJzogJ29rJyxcbiAgICAgICAgICAgICd3YXJuaW5nJzogJ3dhcm5pbmcnLFxuICAgICAgICAgICAgJ2NyaXRpY2FsJzogJ2NyaXRpY2FsJyxcbiAgICAgICAgICAgICdwYXJ0aXRpb24xJzogJ3BhcnRpdGlvbjEnLFxuICAgICAgICAgICAgJ3BhcnRpdGlvbjknOiAncGFydGl0aW9uOScsXG4gICAgICAgICAgICAncGFydGl0aW9uMTAnOiAncGFydGl0aW9uMTAnLFxuICAgICAgICAgICAgJ3BhcnRpdGlvbjExJzogJ3BhcnRpdGlvbjExJyxcbiAgICAgICAgICAgICdwYXJ0aXRpb24xMic6ICdwYXJ0aXRpb24xMicsXG4gICAgICAgICAgICAncGFydGl0aW9uMTMnOiAncGFydGl0aW9uMTMnLFxuICAgICAgICAgICAgJ3BhcnRpdGlvbjE0JzogJ3BhcnRpdGlvbjE0JyxcbiAgICAgICAgICAgICdzb2NpYWwtY2hhcnQtbm9kZSc6ICdzb2NpYWwtY2hhcnQtbm9kZScsXG4gICAgICAgICAgICAnc29jaWFsLWNoYXJ0LWVkZ2UnOiAnc29jaWFsLWNoYXJ0LWVkZ2UnXG4gICAgICAgIH1cbiAgICB9LFxuICAgIG1pY3JvRm9jdXM6IHtcbiAgICAgICAgJ2NvbG9yVmFsdWVTZXQnOiB7XG4gICAgICAgICAgICAnY2VydWxlYW4nOiAnIzE2NjhjMScsXG4gICAgICAgICAgICAnYXF1YSc6ICcjMjljZWZmJyxcbiAgICAgICAgICAgICdhcXVhbWFyaW5lJzogJyMyZmQ2YzMnLFxuICAgICAgICAgICAgJ2Z1Y2hzaWEnOiAnI2M2MTc5ZCcsXG4gICAgICAgICAgICAnaW5kaWdvJzogJyM3NDI1YWQnLFxuICAgICAgICAgICAgJ2RhcmstYmx1ZSc6ICcjMjMxY2E1JyxcbiAgICAgICAgICAgICd3aGl0ZSc6ICcjZmZmZmZmJyxcbiAgICAgICAgICAgICdzbGlnaHRseS1ncmF5JzogJyNmNWY3ZjgnLFxuICAgICAgICAgICAgJ2JyaWdodC1ncmF5JzogJyNmMWYyZjMnLFxuICAgICAgICAgICAgJ2dyYXknOiAnI2RjZGVkZicsXG4gICAgICAgICAgICAnc2lsdmVyJzogJyNiZGJlYzAnLFxuICAgICAgICAgICAgJ2RpbS1ncmF5JzogJyM2NTY2NjgnLFxuICAgICAgICAgICAgJ2RhcmstZ3JheSc6ICcjMzIzNDM1JyxcbiAgICAgICAgICAgICdibGFjayc6ICcjMDAwMDAwJyxcbiAgICAgICAgICAgICdjcmltc29uLW5lZ2F0aXZlJzogJyNlNTAwNGMnLFxuICAgICAgICAgICAgJ2Fwcmljb3QnOiAnI2Y0OGIzNCcsXG4gICAgICAgICAgICAneWVsbG93JzogJyNmY2RiMWYnLFxuICAgICAgICAgICAgJ2dyZWVuLXBvc2l0aXZlJzogJyMxYWFjNjAnLFxuICAgICAgICAgICAgJ3VsdHJhbWFyaW5lJzogJyMzOTM5YzYnLFxuICAgICAgICAgICAgJ3NreWJsdWUnOiAnIzAwYWJmMycsXG4gICAgICAgICAgICAncGFsZS1hcXVhJzogJyM0M2U0ZmYnLFxuICAgICAgICAgICAgJ3BhbGUtZ3JlZW4nOiAnIzFmZmJiYScsXG4gICAgICAgICAgICAnbGltZSc6ICcjNzVkYTRkJyxcbiAgICAgICAgICAgICdvcmFuZ2UnOiAnI2ZmY2UwMCcsXG4gICAgICAgICAgICAnbWFnZW50YSc6ICcjZWIyM2MyJyxcbiAgICAgICAgICAgICdwYWxlLXB1cnBsZSc6ICcjYmE0N2UyJyxcbiAgICAgICAgICAgICdkYXJrLXVsdHJhbWFyaW5lJzogJyMyNzE3ODInLFxuICAgICAgICAgICAgJ3N0ZWVsYmx1ZSc6ICcjMDE0MjcyJyxcbiAgICAgICAgICAgICdhcmN0aWMtYmx1ZSc6ICcjMGI4ZWFjJyxcbiAgICAgICAgICAgICdlbWVyYWxkJzogJyMwMGE5ODknLFxuICAgICAgICAgICAgJ29saXZlJzogJyM1YmJhMzYnLFxuICAgICAgICAgICAgJ2dvbGRlbnJvZCc6ICcjZmZiMDAwJyxcbiAgICAgICAgICAgICdwdXJwbGUnOiAnIzliMWU4MycsXG4gICAgICAgICAgICAncGFsZS1lZ2dwbGFudCc6ICcjNTIxNmFjJyxcbiAgICAgICAgICAgICdyZWQnOiAnI2ZmNDU0ZicsXG4gICAgICAgICAgICAncGFsZS1hbWJlcic6ICcjZmZiMjRkJyxcbiAgICAgICAgICAgICdwYWxlLWxlbW9uJzogJyNmZGUxNTknLFxuICAgICAgICAgICAgJ3BhbGUtZW1lcmFsZCc6ICcjMzNjMTgwJyxcbiAgICAgICAgICAgICdwbHVtJzogJyNiMjE2NDYnLFxuICAgICAgICAgICAgJ2NvcHBlcic6ICcjZTU3ODI4JyxcbiAgICAgICAgICAgICdhbWJlcic6ICcjZmZjMDAyJyxcbiAgICAgICAgICAgICdsZWFmLWdyZWVuJzogJyMxMThjNGYnLFxuICAgICAgICAgICAgJ2ZvcmVzdC1ncmVlbic6ICcjMDA2NDVhJyxcbiAgICAgICAgICAgICdwcmltYXJ5JzogJyMwMDczZTcnLFxuICAgICAgICAgICAgJ2FjY2VudCc6ICcjNzQyNWFkJyxcbiAgICAgICAgICAgICdzZWNvbmRhcnknOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICAnYWx0ZXJuYXRlMSc6ICcjMjljZWZmJyxcbiAgICAgICAgICAgICdhbHRlcm5hdGUyJzogJyMyZmQ2YzMnLFxuICAgICAgICAgICAgJ2FsdGVybmF0ZTMnOiAnI2M2MTc5ZCcsXG4gICAgICAgICAgICAndmlicmFudDEnOiAnIzQzZTRmZicsXG4gICAgICAgICAgICAndmlicmFudDInOiAnI2ZmY2UwMCcsXG4gICAgICAgICAgICAnZ3JleTEnOiAnIzAwMDAwMCcsXG4gICAgICAgICAgICAnZ3JleTInOiAnIzMyMzQzNScsXG4gICAgICAgICAgICAnZ3JleTMnOiAnIzY1NjY2OCcsXG4gICAgICAgICAgICAnZ3JleTQnOiAnI2JkYmVjMCcsXG4gICAgICAgICAgICAnZ3JleTUnOiAnI2RjZGVkZicsXG4gICAgICAgICAgICAnZ3JleTYnOiAnI2YxZjJmMycsXG4gICAgICAgICAgICAnZ3JleTcnOiAnI2Y1ZjdmOCcsXG4gICAgICAgICAgICAnZ3JleTgnOiAnI2ZmZmZmZicsXG4gICAgICAgICAgICAnY2hhcnQxJzogJyMzOTM5YzYnLFxuICAgICAgICAgICAgJ2NoYXJ0Mic6ICcjMDBhYmYzJyxcbiAgICAgICAgICAgICdjaGFydDMnOiAnIzc1ZGE0ZCcsXG4gICAgICAgICAgICAnY2hhcnQ0JzogJyNmZmNlMDAnLFxuICAgICAgICAgICAgJ2NoYXJ0NSc6ICcjZWIyM2MyJyxcbiAgICAgICAgICAgICdjaGFydDYnOiAnI2JhNDdlMicsXG4gICAgICAgICAgICAnb2snOiAnIzFhYWM2MCcsXG4gICAgICAgICAgICAnd2FybmluZyc6ICcjZjQ4YjM0JyxcbiAgICAgICAgICAgICdjcml0aWNhbCc6ICdlNTAwNGMnLFxuICAgICAgICAgICAgJ3BhcnRpdGlvbjEnOiAnIzc0MjVhZCcsXG4gICAgICAgICAgICAncGFydGl0aW9uOSc6ICcjNTIxNmFjJyxcbiAgICAgICAgICAgICdwYXJ0aXRpb24xMCc6ICcjNWJiYTM2JyxcbiAgICAgICAgICAgICdwYXJ0aXRpb24xMSc6ICcjMDE0MjcyJyxcbiAgICAgICAgICAgICdwYXJ0aXRpb24xMic6ICcjZmZiMDAwJyxcbiAgICAgICAgICAgICdwYXJ0aXRpb24xMyc6ICcjYmRiZWMwJyxcbiAgICAgICAgICAgICdwYXJ0aXRpb24xNCc6ICcjMjcxNzgyJyxcbiAgICAgICAgICAgICdzb2NpYWwtY2hhcnQtbm9kZSc6ICcjZmYwMGZmJyxcbiAgICAgICAgICAgICdzb2NpYWwtY2hhcnQtZWRnZSc6ICcjZmYwMGZmJ1xuICAgICAgICB9XG4gICAgfVxufTtcblxuZXhwb3J0IGludGVyZmFjZSBUaGVtZUNvbG9ycyB7XG4gICAgW25hbWU6IHN0cmluZ106IFRoZW1lQ29sb3I7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sb3JTZXQge1xuICAgIGNvbG9yQ2xhc3NTZXQ/OiBDb2xvckNsYXNzU2V0O1xuICAgIGNvbG9yVmFsdWVTZXQ/OiBDb2xvclZhbHVlU2V0O1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIENvbG9yQ2xhc3NTZXQge1xuICAgIFtuYW1lOiBzdHJpbmddOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ29sb3JWYWx1ZVNldCB7XG4gICAgW25hbWU6IHN0cmluZ106IHN0cmluZztcbn1cblxuZXhwb3J0IHR5cGUgQ29sb3JJZGVudGlmaWVyID0gc3RyaW5nO1xuIl19