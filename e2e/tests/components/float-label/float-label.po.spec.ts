import { $, browser, by, element } from 'protractor';

export class FloatLabelPage {

    usernameInput = element(by.id('username'));
    usernameLabel = element(by.id('username-label'));
    locationInput = element(by.id('location'));
    locationLabel = element(by.id('location-label'));
    locationButton = element(by.id('location-button'));
    initialInput = element(by.id('initial'));
    initialLabel = element(by.id('initial-label'));
    modeFocusButton = $('ux-radio-button#mode-focus');

    async getPage(): Promise<void> {
        await browser.get('#/float-label');
    }
}