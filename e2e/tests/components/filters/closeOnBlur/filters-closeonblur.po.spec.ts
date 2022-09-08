import { $, browser } from 'protractor';
import { FiltersPage } from '../filters.po.spec';

export class FiltersCloseOnBlurPage extends FiltersPage {

    async getPage(): Promise<void> {
        await browser.get('#/filters/close-on-blur');
    }

    topFocus = $('#top-focus');
    closeOnBlur = $('#closeOnBlur');

    async activeElementClasses(): Promise<string> {
        return await browser.driver.switchTo().activeElement().getAttribute('class');
    };
}
