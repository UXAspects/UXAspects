import { Injectable } from '@angular/core';
import { ThemeColor } from '../../../services/color/index';

@Injectable()
export class ContrastService {
    /**
     * Calculate the contract ratio between two colors.
     * This uses the official WCAG Color Contrast Ratio
     * Algorithm: https://www.w3.org/TR/WCAG20-TECHS/G17.html
     */
    getContrastColor(backgroundColor: ThemeColor, lightColor: ThemeColor, darkColor: ThemeColor): string {
        // get a ThemeColor from the ColorPickerColor
        const themeColor = ThemeColor.parse(backgroundColor.toHex());

        const background = this.getLuminance(themeColor);
        const light = this.getLuminance(lightColor);
        const dark = this.getLuminance(darkColor);

        // determine the contrast for both black and white
        const whiteContrast = (light + 0.05) / (background + 0.05);
        const blackContrast = (background + 0.05) / (dark + 0.05);

        // return the color with the most contrast ratio
        return blackContrast > whiteContrast ? '#000' : '#fff';
    }

    private getLuminance(color: ThemeColor): number {

        // normalize the colors
        let r = +color.getRed() / 255;
        let g = +color.getGreen() / 255;
        let b = +color.getBlue() / 255;

        // calculate the value required for each color component
        r = r <= 0.03928 ? r / 12.92 : Math.pow((r + 0.055) / 1.055, 2.4);
        g = g <= 0.03928 ? g / 12.92 : Math.pow((g + 0.055) / 1.055, 2.4);
        b = b <= 0.03928 ? b / 12.92 : Math.pow((b + 0.055) / 1.055, 2.4);

        // return the luminance
        return (0.2126 * r) + (0.7152 * g) + (0.0722 * b);
    }
}