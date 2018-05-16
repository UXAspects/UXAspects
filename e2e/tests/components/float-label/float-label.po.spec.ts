import { browser, element, by, $, ElementFinder } from 'protractor';

export class FloatLabelPage {

    usernameInput = element(by.id('username'));
    usernameLabel = element(by.id('username-label'));
    locationInput = element(by.id('location'));
    locationLabel = element(by.id('location-label'));
    locationButton = element(by.id('location-button'));
    modeFocusButton = $('ux-radio-button#mode-focus');

    getPage(): void {
        browser.get('#/float-label');
    }
}