import { browser, by, element, ElementFinder, Key, protractor } from 'protractor';

export class TagsPage {

    tagsInput = element(by.tagName('ux-tag-input'));
    customizeExampleSection = element(by.id('accordion'));
    rangeErrorMessage = element(by.id('rangeErrorMessage'));
    inputPatternErrorMessage = element(by.id('inputPatternErrorMessage'));
    addOnPaste = element(by.id('addOnPaste'));
    disabled = element(by.id('tagInputDisabled'));
    enforceTagLimits = element(by.id('enforceTagLimits'));
    minTags = element(by.id('minTags'));
    maxTags = element(by.id('maxTags'));
    tagPattern = element(by.id('tagPattern'));
    placeholder = element(by.id('placeholder'));
    tagDelimiters = element(by.id('tagDelimiters'));
    enableTypeahead = element(by.id('enableTypeahead'));
    freeInput = element(by.id('freeInput'));
    selectFirst = element(by.id('selectFirst'));
    showTypeaheadOnClick = element(by.id('showTypeaheadOnClick'));

    getPage(): void {
        browser.get('#/tags');
    }

    getNumberOfTags() {
        return this.tagsInput.$$('ol').get(0).$$('li.ux-tag').count();
    }

    getTagName(index: number) {
        return this.tagsInput.$$('ol').get(0).$$('li.ux-tag').get(index).$('span.ux-tag-text').getText();
    }

    sendCharactersToTagsInput(chars: string) {
        this.tagsInput.$$('ol').get(0).$('li.ux-tag-input').$('input.ux-tag-input').sendKeys(chars);
    }

    clickOnTagsInput() {
        this.tagsInput.$$('ol').get(0).$('li.ux-tag-input').$('input.ux-tag-input').click();
    }

    typeInATag(tagName: string) {
        this.sendCharactersToTagsInput(tagName);
        this.sendCharactersToTagsInput(Key.ENTER);
    }

    confirmTagCloseIconIsVisible(index: number) {
        return this.tagsInput.$$('ol').get(0).$$('li.ux-tag').get(index).$('button.ux-tag-remove').isPresent();
    }

    closeATag(index: number) {
        return this.tagsInput.$$('ol').get(0).$$('li.ux-tag').get(index).$('button.ux-tag-remove').click();
    }

    copyAndPasteTags(tags: string) {
        // Create a temporary input element if it does not already exist.
        browser.executeScript(function () {
            if (!document.getElementById('tempInput')) {
                var el = document.createElement('input');
                el.setAttribute('id', 'tempInput');
                document.getElementsByTagName('body')[0].appendChild(el);
            }
        });

        // Set the input value to the specified text.
        var newInput = element(by.id('tempInput'));
        newInput.clear();
        newInput.sendKeys(tags);

        // Select all and copy.
        newInput.sendKeys(Key.chord(Key.CONTROL, 'a'));
        newInput.sendKeys(Key.chord(Key.CONTROL, 'c'));

        // Paste into the tags input box.
        this.tagsInput.$('ol').$('li.ux-tag-input').$('input.ux-tag-input').sendKeys(Key.chord(Key.CONTROL, 'v') + Key.ENTER);
    }

    confirmTagsInputIsAvailable() {
        return browser.isElementPresent(this.tagsInput.$$('ol').get(0).$('li.ux-tag-input'));
    }

    confirmTagsInputIsDisabled() {
        return browser.isElementPresent(this.tagsInput.$$('ol').get(0).$('li.ux-tag-input').$('input.ux-tag-input').getAttribute('disabled'));
    }

    clearTagsInput() {
        this.tagsInput.$$('ol').get(0).$('li.ux-tag-input').$('input.ux-tag-input').clear();
    }

    changeTagPattern(chars: string) {
        this.tagPattern.clear();
        this.tagPattern.sendKeys(chars);
    }

    changeMinTags(chars: string) {
        this.minTags.$('input').clear();
        this.minTags.$('input').sendKeys(chars);
    }

    changeMaxTags(chars: string) {
        this.maxTags.$('input').clear();
        this.maxTags.$('input').sendKeys(chars);
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
            var allClasses = classes.split(' ');
            if (allClasses.indexOf(soughtClass) > -1) {
                return true;
            } else {
                return false;
            }
        });
    }

    confirmTypeaheadItemIsDisabled(index: number) {
        var typeaheadItem = this.getTypeaheadItem(index);
        return this.confirmTypeaheadClassExists(typeaheadItem, 'disabled');
    }

    confirmTypeaheadItemIsHighlighted(index: number) {
        var typeaheadItem = this.getTypeaheadItem(index);
        return this.confirmTypeaheadClassExists(typeaheadItem, 'highlighted');
    }

    addTypeaheadItem(index: number) {
        var typeaheadItem = this.getTypeaheadItem(index);
        typeaheadItem.$('span.ux-typeahead-option').click();
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
