import { ThemeColor } from '../../services/color/index';
import { ColorPickerInputMode } from './color-picker.component';

/**
 * Type representing a color, including its descriptive name.
 */
export class ColorPickerColor {

    /**
     * Human-readable name of the color.
     */
    name: string;

    /**
     * Hex value of the color, e.g. `#ffffff`.
     */
    get hex(): string {
        return this._originalHexValue ? this._originalHexValue : this._color.toHex();
    }

    /**
     * RGBA value of the color, e.g. `rgba(255, 255, 255, 1)`.
     */
    get rgba(): string {
        return this._originalRgbaValue ? this._originalRgbaValue : this._color.toRgba();
    }

    get r(): number {
        return parseInt(this._color.getRed());
    }

    get g(): number {
        return parseInt(this._color.getGreen());
    }

    get b(): number {
        return parseInt(this._color.getBlue());
    }

    get a(): number {
        return parseFloat(this._color.getAlpha());
    }

    private _color: ThemeColor;
    private _originalHexValue: string;
    private _originalRgbaValue: string;

    constructor(name: string, value: string, inputMode?: ColorPickerInputMode) {
        this.name = name;
        this._color = ThemeColor.parse(value);

        // Preserve the format entered by the user if it's valid
        if (inputMode === 'hex') {
            this._originalHexValue = value;
        } else if (inputMode === 'rgba') {
            this._originalRgbaValue = value;
        }
    }

    toString(): string {
        return this._color.toRgba();
    }
}