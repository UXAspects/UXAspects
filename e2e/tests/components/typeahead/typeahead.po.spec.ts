import { browser, by, element } from 'protractor';

export class TypeaheadPage {

    typeaheadInput = element(by.id('typeahead-input'));
    radioDirection = element(by.id('radio1'));
    maxHeight = element(by.id('max-height'));
    maxHeightDecrease = element(by.id('max-height-decrease'));
    typeahead = element(by.tagName('ux-typeahead'));
    typeaheadOptions = element(by.tagName('ux-typeahead-options-list'));

    async getPage(): Promise<void> {
        await browser.driver.manage().window().setSize(1200, 900);
        await browser.get('#/typeahead');
    }

    async clickOnDropDirectionUp() {
        return await this.radioDirection.$('ux-radio-button[option="up"]').$('.ux-radio-button').click();
    }

    async clickOnDropDirectionDown() {
        return await this.radioDirection.$('ux-radio-button[option="down"]').$('.ux-radio-button').click();
    }

    async clickOnMaxHeight() {
        return await this.maxHeight.click();
    }

    async clickOnMaxHeightDecrease() {
        return await this.maxHeightDecrease.click();
    }

    async getTypeaheadClass(): Promise<string> {
        return await this.typeahead.getAttribute('class');
    }

    async getTypeaheadOptionListClass(): Promise<string> {
        return await this.typeaheadOptions.getAttribute('class');
    }

}
