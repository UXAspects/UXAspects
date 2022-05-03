import { browser } from 'protractor';

export class ColorPickerPage {

    async getPage(): Promise<void> {
        await browser.get('#/color-picker');
    }

}