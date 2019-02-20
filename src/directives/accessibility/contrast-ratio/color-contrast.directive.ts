import { Directive, HostBinding, Input } from '@angular/core';
import { ColorService, ThemeColor } from '../../../services/color/index';
import { ContrastService } from './contrast.service';

@Directive({
    selector: '[uxColorContrast]'
})
export class ColorContrastDirective {

    /**
     * Define the background color for contrast comparison.
     * This can be a CSS color value or the name of a
     * color from the color palette.
     */
    @Input() set uxColorContrast(backgroundColor: string) {
        this._backgroundColor = ThemeColor.parse(this._colorService.resolve(backgroundColor));
    }

    /**
     * Define the light color for contrast comparison.
     * This can be a CSS color value or the name of a
     * color from the color palette.
     */
    @Input() set lightColor(lightColor: string) {
        this._lightColor = ThemeColor.parse(this._colorService.resolve(lightColor));
    }

    /**
     * Define the dark color for contrast comparison.
     * This can be a CSS color value or the name of a
     * color from the color palette.
     */
    @Input() set darkColor(darkColor: string) {
        this._darkColor = ThemeColor.parse(this._colorService.resolve(darkColor));
    }

    /** Determine the color to set based on the supplied parameters */
    @HostBinding('style.color')
    get _color(): string | null {
        return this._backgroundColor ? this._contrastService.getContrastColor(this._backgroundColor, this._lightColor, this._darkColor) : null;
    }

    /** Store the background color as a ThemeColor object */
    private _backgroundColor: ThemeColor;

    /** Store the light color as a ThemeColor object */
    private _lightColor: ThemeColor = ThemeColor.parse('#fff');

    /** Store the light color as a ThemeColor object */
    private _darkColor: ThemeColor = ThemeColor.parse('#000');

    constructor(private _colorService: ColorService, private _contrastService: ContrastService) { }

}