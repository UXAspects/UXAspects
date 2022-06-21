import { $, browser } from 'protractor';

export class ColorPickerPage {

    colorPickerToggle = $('#color-picker-toggle');
    selectedColorHex = $('#selected-color-hex');

    async getPage(): Promise<void> {
        await browser.get('#/color-picker');
    }
}
