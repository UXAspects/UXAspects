import {
    DOCUMENT
} from '@angular/platform-browser';
import {
    Injectable,
    Inject
} from '@angular/core';

export class ColorService {

    private html = '<div class="primary-color"></div>' +
        '<div class="accent-color"></div>' +
        '<div class="secondary-color"></div>' +
        '<div class="alternate1-color"></div>' +
        '<div class="alternate2-color"></div>' +
        '<div class="alternate3-color"></div>' +
        '<div class="vibrant1-color"></div>' +
        '<div class="vibrant2-color"></div>' +
        '<div class="grey1-color"></div>' +
        '<div class="grey2-color"></div>' +
        '<div class="grey3-color"></div>' +
        '<div class="grey4-color"></div>' +
        '<div class="grey5-color"></div>' +
        '<div class="grey6-color"></div>' +
        '<div class="grey7-color"></div>' +
        '<div class="grey8-color"></div>' +
        '<div class="chart1-color"></div>' +
        '<div class="chart2-color"></div>' +
        '<div class="chart3-color"></div>' +
        '<div class="chart4-color"></div>' +
        '<div class="chart5-color"></div>' +
        '<div class="chart6-color"></div>' +
        '<div class="ok-color"></div>' +
        '<div class="warning-color"></div>' +
        '<div class="critical-color"></div>';

    private element: HTMLElement;
    private colors: any;

    constructor(@Inject(DOCUMENT) document: Document) {
        this.element = document.createElement('div');
        this.element.className = 'color-chart';
        this.element.innerHTML = this.html;

        document.body.appendChild(this.element);

        this.colors = {
            primary: this.getColorValue('primary'),
            accent: this.getColorValue('accent'),
            secondary: this.getColorValue('secondary'),
            alternate1: this.getColorValue('alternate1'),
            alternate2: this.getColorValue('alternate2'),
            alternate3: this.getColorValue('alternate3'),
            vibrant1: this.getColorValue('vibrant1'),
            vibrant2: this.getColorValue('vibrant2'),
            grey1: this.getColorValue('grey1'),
            grey2: this.getColorValue('grey2'),
            grey3: this.getColorValue('grey3'),
            grey4: this.getColorValue('grey4'),
            grey5: this.getColorValue('grey5'),
            grey6: this.getColorValue('grey6'),
            grey7: this.getColorValue('grey7'),
            grey8: this.getColorValue('grey8'),
            chart1: this.getColorValue('chart1'),
            chart2: this.getColorValue('chart2'),
            chart3: this.getColorValue('chart3'),
            chart4: this.getColorValue('chart4'),
            chart5: this.getColorValue('chart5'),
            chart6: this.getColorValue('chart6'),
            ok: this.getColorValue('ok'),
            warning: this.getColorValue('warning'),
            critical: this.getColorValue('critical')
        };

        this.element.parentNode.removeChild(this.element);
    }



    getColorValue(color: string) {

        let target = this.element.querySelector('.' + color + '-color');

        if (!target) {
            throw new Error('Invalid color');
        }

        let colorValue = window.getComputedStyle(target).backgroundColor;

        let rgba = colorValue.match(/^rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)$/);

        return new ThemeColor(rgba[1], rgba[2], rgba[3], rgba[4]);

    }



    getColor(color: string) {
        return this.colors[color];
    }

}

export class ThemeColor {

    private r: string;
    private g: string;
    private b: string;
    private a: string;

    constructor(r: string, g: string, b: string, a: string) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a === undefined ? '1' : a;
    }

    toHex() {
        var red = parseInt(this.r).toString(16);
        var green = parseInt(this.g).toString(16);
        var blue = parseInt(this.b).toString(16);

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
        return 'rgb(' + this.r + ', ' + this.g + ', ' + this.b + ')';
    }

    toRgba() {
        return 'rgba(' + this.r + ', ' + this.g + ', ' + this.b + ', ' + this.a + ')';
    }

    setRed(red: string) {
        this.r = red;
        return this;
    }

    setGreen(green: string) {
        this.g = green;
        return this;
    }

    setBlue(blue: string) {
        this.b = blue;
        return this;
    }

    setAlpha(alpha: string) {
        this.a = alpha;
        return this;
    }
}