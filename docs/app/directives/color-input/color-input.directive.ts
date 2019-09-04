import { AfterViewInit, Directive, Input, OnChanges } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Directive({
    selector: '[uxd-color-input]',
    host: {
        '[style.box-shadow]': 'shadowStyle'
    }
})
export class ColorInputDirective implements AfterViewInit, OnChanges {

    @Input('uxd-color-input') value: string;

    shadowStyle: SafeStyle;

    constructor(private domSanitizer: DomSanitizer) { }

    ngOnChanges() {
        // update color value
        this.valueChanged();
    }

    ngAfterViewInit() {
        this.valueChanged();
    }

    valueChanged() {

        // if the value is undefined clear the color
        if (!this.value) {
            this.clearColor();
            return;
        }

        // attempt to match hex and rgb/rgba value anywhere in the string
        let hex = this.value.match(/#(?:[0-9a-f]{3}){1,2}/i);
        let rgba = this.value.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+(?:\.\d+)?))?\)/);

        // if a match was found update the color value
        if (hex && hex.length > 0) {

            // take the first match only
            this.setColor(hex[0]);

        } else if (rgba && rgba.length > 0) {

            // take the first match only
            this.setColor(rgba[0]);

        } else {
            this.clearColor();
        }
    }

    private setColor(color: string) {
        // santize input string
        this.shadowStyle = this.domSanitizer.bypassSecurityTrustStyle(`${color} 0px 4px 0px`);
    }

    private clearColor() {
        this.setColor('rgba(0, 0, 0, 0)');
    }
}