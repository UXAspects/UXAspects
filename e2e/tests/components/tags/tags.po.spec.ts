import { $, browser, by, element, ElementFinder, Key, protractor } from 'protractor';

export class TagsPage {

    tagsInput = $('ux-tag-input');
    customizeExampleSection = $('#accordion');
    rangeErrorMessage = $('#rangeErrorMessage');
    inputPatternErrorMessage = $('#inputPatternErrorMessage');
    addOnPaste = $('#addOnPaste');
    disabled = $('#tagInputDisabled');
    enforceTagLimits = $('#enforceTagLimits');
    minTags = $('#minTags');
    maxTags = $('#maxTags');
    tagPattern = $('#tagPattern');
    placeholder = $('#placeholder');
    tagDelimiters = $('#tagDelimiters');
    enableTypeahead = $('#enableTypeahead');
    freeInput = $('#freeInput');
    selectFirst = $('#selectFirst');
    showTypeaheadOnClick = $('#showTypeaheadOnClick');
    typeahead = $('ux-typeahead');

    async getPage(): Promise<void> {
        await browser.get('#/tags');
    }

    getNumberOfTags() {
        return this.tagsInput.$$('ol').get(0).$$('li.ux-tag').count();
    }

    getTagName(index: number) {
        return this.tagsInput.$$('ol').get(0).$$('li.ux-tag').get(index).$('span.ux-tag-text').getText();
    }

    async sendCharactersToTagsInput(chars: string) {
        await this.tagsInput.$$('ol').get(0).$('li.ux-tag-input').$('input.ux-tag-input').sendKeys(chars);
    }

    async clickOnTagsInput() {
        await this.tagsInput.$$('ol').get(0).$('li.ux-tag-input').$('input.ux-tag-input').click();
    }

    async typeInATag(tagName: string) {
        await this.sendCharactersToTagsInput(tagName);
        await this.sendCharactersToTagsInput(Key.ENTER);
    }

    confirmTagCloseIconIsVisible(index: number) {
        return this.tagsInput.$$('ol').get(0).$$('li.ux-tag').get(index).$('button.ux-tag-remove').isPresent();
    }

    closeATag(index: number) {
        return this.tagsInput.$$('ol').get(0).$$('li.ux-tag').get(index).$('button.ux-tag-remove').click();
    }

    async copyAndPasteTags(tags: string) {
        // Create a temporary input element if it does not already exist.
        await browser.executeScript(function () {
            if (!document.getElementById('tempInput')) {
                var el = document.createElement('input');
                el.setAttribute('id', 'tempInput');
                document.getElementsByTagName('body')[0].appendChild(el);
            }
        });

        // Set the input value to the specified text.
        var newInput = element(by.id('tempInput'));
        await newInput.clear();
        await newInput.sendKeys(tags);

        // Select all and copy.
        await newInput.sendKeys(Key.chord(Key.CONTROL, 'a'));
        await newInput.sendKeys(Key.chord(Key.CONTROL, 'c'));

        // Paste into the tags input box.
        await this.tagsInput.$('ol').$('li.ux-tag-input').$('input.ux-tag-input').sendKeys(Key.chord(Key.CONTROL, 'v') + Key.ENTER);
    }

    confirmTagsInputIsAvailable() {
        return browser.isElementPresent(this.tagsInput.$$('ol').get(0).$('li.ux-tag-input'));
    }

    confirmTagsInputIsDisabled() {
        return browser.isElementPresent(this.tagsInput.$$('ol').get(0).$('li.ux-tag-input').$('input.ux-tag-input').getAttribute('disabled'));
    }

    async clearTagsInput() {
        await this.tagsInput.$$('ol').get(0).$('li.ux-tag-input').$('input.ux-tag-input').clear();
    }

    async changeTagPattern(chars: string) {
        await this.tagPattern.clear();
        await this.tagPattern.sendKeys(chars);
    }

    async changeMinTags(chars: string) {
        await this.minTags.$('input').clear();
        await this.minTags.$('input').sendKeys(chars);
    }

    async changeMaxTags(chars: string) {
        await this.maxTags.$('input').clear();
        await this.maxTags.$('input').sendKeys(chars);
    }

    getTagInputsPlaceholderText() {
        return this.tagsInput.$$('ol').get(0).$('li.ux-tag-input').$('input.ux-tag-input').getAttribute('placeholder');
    }

    waitForTypeaheadListToBeDisplayed() {
        return browser.wait(protractor.ExpectedConditions.visibilityOf(this.tagsInput.$('ux-typeahead')));
    }

    getNumberOfTagsInTypeaheadList() {
        return this.tagsInput.$('ux-typeahead').$('div.ux-typeahead-options').$('ol').$$('li').count();
    }

    getTypeaheadItem(index: number) {
        return this.tagsInput.$('ux-typeahead').$('div.ux-typeahead-options').$('ol').$$('li').get(index);
    }

    confirmTypeaheadClassExists(item: ElementFinder, soughtClass: string) {
        return item.getAttribute('class').then(function (classes: string) {
            const allClasses = classes.split(' ');
            if (allClasses.indexOf(soughtClass) > -1) {
                return true;
            } else {
                return false;
            }
        });
    }

    confirmTypeaheadItemIsDisabled(index: number) {
        const typeaheadItem = this.getTypeaheadItem(index);
        return this.confirmTypeaheadClassExists(typeaheadItem, 'disabled');
    }

    confirmTypeaheadItemIsHighlighted(index: number) {
        const typeaheadItem = this.getTypeaheadItem(index);
        return this.confirmTypeaheadClassExists(typeaheadItem, 'highlighted');
    }

    async addTypeaheadItem(index: number) {
        const typeaheadItem = this.getTypeaheadItem(index);
        await typeaheadItem.$('span.ux-typeahead-option').click();
    }

    confirmRangeErrorIsVisible() {
        return this.rangeErrorMessage.isPresent();
    }

    confirmInputPatternErrorIsVisible() {
        return this.inputPatternErrorMessage.isPresent();
    }

    getRangeErrorMessage() {
        return this.rangeErrorMessage.getText();
    }

    getInputPatternErrorMessage() {
        return this.inputPatternErrorMessage.getText();
    }
}
