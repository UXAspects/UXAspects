import { browser, by, element } from 'protractor';

export class TypeaheadPage {

    form = element(by.tagName('form'));
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
        return this.radioDirection.$('ux-radio-button[option="up"]').$('.ux-radio-button').click();
    }

    async clickOnDropDirectionDown() {
        return this.radioDirection.$('ux-radio-button[option="down"]').$('.ux-radio-button').click();
    }

    async clickOnMaxHeight() {
        return this.maxHeight.click();
    }

    async clickOnMaxHeightDecrease() {
        return this.maxHeightDecrease.click();
    }

    async getTypeaheadClass(): Promise<string> {
        return this.typeahead.getAttribute('class');
    }

    async getTypeaheadOptionListClass(): Promise<string> {
        return this.typeaheadOptions.getAttribute('class');
    }

    async dragTypeaheadScrollBar(delta: number): Promise<void> {
        const size = await this.typeahead.getSize();

        await browser.actions()
            .mouseMove(this.typeahead, { x: size.width - 10, y: 30 })
            .mouseDown()
            .mouseMove({ x: 0, y: delta })
            .mouseUp()
            .perform();
    }

    async isInputFocused(): Promise<boolean> {
        const activeElement = await browser.driver.switchTo().activeElement();
        return this.typeaheadInput.equals(activeElement);
    }

    async setFormTabIndex(index: number): Promise<void> {
        await browser.executeScript(`arguments[0].setAttribute('tabindex', '${ index }')`, this.form);
    }

}
