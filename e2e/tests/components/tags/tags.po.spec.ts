import { browser, element, by, Key } from 'protractor';

export class TagsPage {
    
    getPage(): void {
        browser.get('/tags');
    }
    
    titleText = browser.getTitle();
    
    tagsInput = element(by.id('tagsInput'));
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
    
    getNumberOfTags = function() {
        return this.tagsInput.$('ol').$$('li.ux-tag').count();
    };
    
    getTagName = function(index: number) {
        return this.tagsInput.$('ol').$$('li.ux-tag').get(index).$('span.ux-tag-text').getText();
    };
    
    sendCharactersToTagsInput = function(chars: string) {
        this.tagsInput.$('ol').$('li.ux-tag-input').$('input.ux-tag-input').sendKeys(chars);
    };
    
    clickOnTagsInput = function() {
        this.tagsInput.$('ol').$('li.ux-tag-input').$('input.ux-tag-input').click();
    };
    
    typeInATag = function(tagName: string) {
        this.sendCharactersToTagsInput(tagName);
        this.sendCharactersToTagsInput(Key.ENTER);
    };
    
    confirmTagCloseIconIsVisible = function(index: number) {
        return this.tagsInput.$('ol').$$('li.ux-tag').get(index).$('button.ux-tag-remove').isPresent();
    };
    
    closeATag = function(index: number) {
        return this.tagsInput.$('ol').$$('li.ux-tag').get(index).$('button.ux-tag-remove').click();
    };
    
    copyAndPasteTags = function(tags: string) {
        // Create a temporary input element if it does not already exist        
        browser.executeScript(function () {
            if (!document.getElementById('tempInput')) {
                var el = document.createElement('input');
                el.setAttribute('id', 'tempInput');
                document.getElementsByTagName('body')[0].appendChild(el);
            }
        });

        // Set the input value to the specified text
        var newInput = element(by.id('tempInput'));
        newInput.clear();
        newInput.sendKeys(tags);

        // Select all and copy
        newInput.sendKeys(Key.chord(Key.CONTROL, 'a'));
        newInput.sendKeys(Key.chord(Key.CONTROL, 'c'));
        
        // Paste into the tags input box
        this.tagsInput.$('ol').$('li.ux-tag-input').$('input.ux-tag-input').sendKeys(Key.chord(Key.CONTROL, 'v') + Key.ENTER);
        // this.tagsInput.$('ol').$('li.ux-tag-input').$('input.ux-tag-input').sendKeys(Key.ENTER);
    };
    
    confirmTagsInputIsDisabled = function() {
        return this.tagsInput.$('ol').$('li.ux-tag-input').$('input.ux-tag-input').getAttribute('disabled').isPresent();
    };

    changeMinTags = function(chars: string) {
        this.minTags.$('input').clear();
        this.minTags.$('input').sendKeys(chars);
    };
    
    changeMaxTags = function(chars: string) {
        this.maxTags.$('input').clear();
        this.maxTags.$('input').sendKeys(chars);
    };
    
    getTagInputsPlaceholderText = function() {
        return this.tagsInput.$('ol').$('li.ux-tag-input').$('input.ux-tag-input').getAttribute('placeholder');
    };

    getNumberOfTagsInTypeaheadList = function() {
        return this.tagsInput.$('ux-typeahead').$('div.ux-typeahead-options').$('ol').$$('li').count();
    };
    
    getTypeaheadItem = function(index: number) {
        return this.tagsInput.$('ux-typeahead').$('div.ux-typeahead-options').$('ol').$$('li').get(index);
    };
    
    confirmTypeaheadClassExists = function(item: any, soughtClass: string) {
        return item.getAttribute('class').then(function(classes: any) {
            var allClasses = classes.split(' ');
            if (allClasses.indexOf(soughtClass) > -1) {
                return true;
            } else {
                return false;
            }
        });
    };
    
    confirmTypeaheadItemIsDisabled = function(index: number) {
        var typeaheadItem = this.getTypeaheadItem(index);
        return this.confirmTypeaheadClassExists(typeaheadItem, 'disabled');
    };

    confirmTypeaheadItemIsHighlighted = function(index: number) {
        var typeaheadItem = this.getTypeaheadItem(index);
        return this.confirmTypeaheadClassExists(typeaheadItem, 'highlighted');
    };
    
    addTypeaheadItem = function(index: number) {
        var typeaheadItem = this.getTypeaheadItem(index);
        typeaheadItem.$('span.ux-typeahead-option').click();
    };

    toggleCustomizeExampleSection = function() {
        this.customizeExampleSection.$('accordion-group').$('div.panel').$('div.panel-heading').$('div.panel-title').$('div.accordion-toggle').click();
    };
    
    confirmCustomizeExampleSectionIsOpen = function() {
        return this.customizeExampleSection.$('accordion-group').getAttribute('class').then(function(classes: any) {
            var allClasses = classes.split(' ');
            if (allClasses.indexOf('panel-open') > -1) {
                return true;
            } else {
                return false;
            }
        });
    };

    confirmRangeErrorIsVisible = function() {
        return this.rangeErrorMessage.isPresent();
    };
    
    confirmInputPatternErrorIsVisible = function() {
        return this.inputPatternErrorMessage.isPresent();
    };
    
    getRangeErrorMessage = function() {
        return this.rangeErrorMessage.getText();
    };
    
    getInputPatternErrorMessage = function() {
        return this.inputPatternErrorMessage.getText();
    };    
}
