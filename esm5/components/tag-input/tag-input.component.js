/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { DOCUMENT } from '@angular/common';
import { Component, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Inject, Input, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TypeaheadComponent, TypeaheadKeyService } from '../typeahead/index';
import { TagInputEvent } from './tag-input-event';
var /** @type {?} */ uniqueId = 0;
var /** @type {?} */ TAGINPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(function () { return TagInputComponent; }),
    multi: true
};
var /** @type {?} */ TAGINPUT_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(function () { return TagInputComponent; }),
    multi: true
};
var TagInputComponent = /** @class */ (function () {
    function TagInputComponent(_element, _document, _typeaheadKeyService) {
        this._element = _element;
        this._document = _document;
        this._typeaheadKeyService = _typeaheadKeyService;
        this.id = "ux-tag-input-" + ++uniqueId;
        this.tagsChange = new EventEmitter();
        this.inputChange = new EventEmitter();
        this.addOnPaste = true;
        this.disabled = false;
        this.enforceTagLimits = false;
        this.freeInput = true;
        this.maxTags = Number.MAX_VALUE;
        this.minTags = 0;
        this.placeholder = '';
        this.showTypeaheadOnClick = false;
        this.tagDelimiters = '';
        this.tagClass = function () { return undefined; };
        this.validationErrors = {};
        // Workaround for EL-3224 until the issue can be diagnosed.
        this.trackAriaDescendant = true;
        this.tagAdding = new EventEmitter();
        this.tagAdded = new EventEmitter();
        this.tagInvalidated = new EventEmitter();
        this.tagRemoving = new EventEmitter();
        this.tagRemoved = new EventEmitter();
        this.tagClick = new EventEmitter();
        this.selectedIndex = -1;
        this.tagApi = {
            getTagDisplay: this.getTagDisplay.bind(this),
            removeTagAt: this.removeTagAt.bind(this),
            canRemoveTagAt: this.canRemoveTagAt.bind(this)
        };
        this.valid = true;
        this.inputValid = true;
        this._input = '';
        this._tags = [];
        this._onChangeHandler = function () { };
        this._onTouchedHandler = function () { };
    }
    Object.defineProperty(TagInputComponent.prototype, "tags", {
        get: /**
         * @return {?}
         */
        function () {
            if (!this._tags) {
                this._tags = [];
            }
            return this._tags;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._tags = value;
            this._onChangeHandler(this._tags);
            this.tagsChange.emit(this._tags);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TagInputComponent.prototype, "input", {
        get: /**
         * @return {?}
         */
        function () {
            return this._input;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._input = value;
            this.inputChange.emit(value);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    TagInputComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.tagTemplate) {
            this.tagTemplate = this._defaultTagTemplate;
        }
    };
    /**
     * @return {?}
     */
    TagInputComponent.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // Watch for optional child typeahead control
        this.connectTypeahead(this.typeaheadQuery.first);
        this.typeaheadQuery.changes.subscribe(function (query) {
            _this.connectTypeahead(query.first);
        });
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    TagInputComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes["disabled"]) {
            if (changes["disabled"].currentValue) {
                // Clear selection and close dropdown
                this.selectedIndex = -1;
                if (this.typeahead) {
                    this.typeahead.open = false;
                }
            }
        }
        // Update validation status
        this.validate();
    };
    /**
     * @param {?} value
     * @return {?}
     */
    TagInputComponent.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value) {
            this.tags = value;
        }
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TagInputComponent.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChangeHandler = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    TagInputComponent.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouchedHandler = fn;
    };
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    TagInputComponent.prototype.setDisabledState = /**
     * @param {?} isDisabled
     * @return {?}
     */
    function (isDisabled) {
        this.disabled = isDisabled;
    };
    /**
     * @return {?}
     */
    TagInputComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._typeaheadSubscription) {
            this._typeaheadSubscription.unsubscribe();
        }
    };
    /**
     * Validate the value of the control (tags property).
     */
    /**
     * Validate the value of the control (tags property).
     * @return {?}
     */
    TagInputComponent.prototype.validate = /**
     * Validate the value of the control (tags property).
     * @return {?}
     */
    function () {
        this.valid = true;
        var /** @type {?} */ tagRangeError = null;
        if (this.tags && (this.tags.length < this.minTags || this.tags.length > this.maxTags)) {
            tagRangeError = {
                given: this.tags.length,
                min: this.minTags,
                max: this.maxTags
            };
            this.valid = false;
        }
        this.validationErrors['tagRangeError'] = tagRangeError;
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TagInputComponent.prototype.keyHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            return;
        }
        // Get the input field cursor location
        var /** @type {?} */ inputCursorPos = this.tagInput.nativeElement.selectionStart;
        // Determine if the input field has any text selected
        var /** @type {?} */ hasSelection = this.tagInput.nativeElement.selectionStart !== this.tagInput.nativeElement.selectionEnd;
        // Determine if a tag has focus
        var /** @type {?} */ tagSelected = this.isValidTagIndex(this.selectedIndex);
        var /** @type {?} */ inputLength = this.input ? this.input.length : 0;
        // Check whether the arrow keys can move the selection. Otherwise the input field takes the event.
        var /** @type {?} */ canNavigateLeft = tagSelected || (inputCursorPos <= 0 && !hasSelection);
        var /** @type {?} */ canNavigateRight = tagSelected || (inputCursorPos >= inputLength && !hasSelection);
        // Forward key events to the typeahead component.
        this._typeaheadKeyService.handleKey(event, this.typeahead);
        switch (event.key) {
            case 'Enter':
                // Check if a typeahead option is highlighted
                if (this.typeahead && this.typeahead.open && this.typeahead.highlighted) {
                    // Add the typeahead option as a tag, clear the input, and close the dropdown
                    this.commitTypeahead(this.typeahead.highlighted);
                    this.typeahead.open = false;
                }
                else {
                    // Validate and add the input text as a tag, if possible
                    this.commitInput();
                }
                event.preventDefault();
                break;
            case 'Backspace':
                if (canNavigateLeft) {
                    this.backspace();
                    event.stopPropagation();
                    event.preventDefault();
                }
                break;
            case 'Delete':
            case 'Del':
                if (tagSelected) {
                    this.removeTagAt(this.selectedIndex);
                }
                break;
            case 'ArrowLeft':
            case 'Left':
                if (canNavigateLeft) {
                    this.moveSelection(-1);
                    event.preventDefault();
                }
                break;
            case 'ArrowRight':
            case 'Right':
                if (canNavigateRight) {
                    this.moveSelection(1);
                    event.preventDefault();
                }
                break;
        }
        // Check for keys in the tagDelimiters
        if (this.tagDelimiters && this.tagDelimiters.indexOf(this.getKeyChar(event)) >= 0) {
            // Commit previous text
            this.commitInput();
            event.stopPropagation();
            event.preventDefault();
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TagInputComponent.prototype.focusOutHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        var _this = this;
        // If a click on the typeahead is in progress, don't do anything.
        // This works around an issue in IE where clicking a scrollbar drops focus.
        if (this.typeahead && this.typeahead.clicking) {
            return;
        }
        // Close the dropdown on blur
        setTimeout(function () {
            if (!_this._element.nativeElement.contains(_this._document.activeElement)) {
                _this.selectedIndex = -1;
                if (_this.typeahead) {
                    _this.typeahead.open = false;
                }
            }
        }, 200);
    };
    /**
     * @param {?} event
     * @param {?} tag
     * @param {?} index
     * @return {?}
     */
    TagInputComponent.prototype.tagClickHandler = /**
     * @param {?} event
     * @param {?} tag
     * @param {?} index
     * @return {?}
     */
    function (event, tag, index) {
        if (this.disabled) {
            return;
        }
        // Send tagClick event
        var /** @type {?} */ tagClickEvent = new TagInputEvent(tag);
        this.tagClick.emit(tagClickEvent);
        // Prevent focus if preventDefault() was called
        if (tagClickEvent.defaultPrevented()) {
            event.preventDefault();
            return;
        }
        // Select the tag (for IE that doesn't propagate focus)
        this.selectTagAt(index);
    };
    /**
     * @return {?}
     */
    TagInputComponent.prototype.inputClickHandler = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        if (this.typeahead && this.showTypeaheadOnClick) {
            this.typeahead.open = true;
        }
    };
    /**
     * @return {?}
     */
    TagInputComponent.prototype.inputFocusHandler = /**
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        this.selectInput();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TagInputComponent.prototype.inputPasteHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            return;
        }
        if (this.addOnPaste) {
            // Get text from the clipboard
            var /** @type {?} */ input = null;
            if (event.clipboardData) {
                input = event.clipboardData.getData('text/plain');
            }
            else if ((/** @type {?} */ (window)).clipboardData) {
                // Internet Explorer only
                input = (/** @type {?} */ (window)).clipboardData.getData('Text');
            }
            // Commit the clipboard text directly
            if (this.commit(input)) {
                this.selectInput();
                event.stopPropagation();
                event.preventDefault();
            }
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    TagInputComponent.prototype.typeaheadOptionSelectedHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        if (this.disabled) {
            return;
        }
        // When the typeahead sends the optionSelected event, commit the object directly
        this.commitTypeahead(event.option);
    };
    /**
     * Commit the current input value and clear the input field if successful.
     */
    /**
     * Commit the current input value and clear the input field if successful.
     * @return {?}
     */
    TagInputComponent.prototype.commitInput = /**
     * Commit the current input value and clear the input field if successful.
     * @return {?}
     */
    function () {
        if (this.commit(this.input)) {
            this.selectInput();
            this.input = '';
        }
    };
    /**
     * Commit the given tag object and clear the input if successful.
     */
    /**
     * Commit the given tag object and clear the input if successful.
     * @param {?} tag
     * @return {?}
     */
    TagInputComponent.prototype.commitTypeahead = /**
     * Commit the given tag object and clear the input if successful.
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
        if (this.addTag(tag)) {
            this.selectInput();
            this.input = '';
        }
    };
    /**
     * Commit the given string value as one or more tags, if validation passes. Returns true if the tag(s) were created.
     */
    /**
     * Commit the given string value as one or more tags, if validation passes. Returns true if the tag(s) were created.
     * @param {?} input
     * @return {?}
     */
    TagInputComponent.prototype.commit = /**
     * Commit the given string value as one or more tags, if validation passes. Returns true if the tag(s) were created.
     * @param {?} input
     * @return {?}
     */
    function (input) {
        if (input && this.freeInput) {
            // Split the tags by the tagDelimiters if configured
            var /** @type {?} */ newTags = this.splitTagInput(input);
            // Check tag validation for all of the individual values
            var /** @type {?} */ allValid = true;
            try {
                for (var newTags_1 = tslib_1.__values(newTags), newTags_1_1 = newTags_1.next(); !newTags_1_1.done; newTags_1_1 = newTags_1.next()) {
                    var newTag = newTags_1_1.value;
                    var /** @type {?} */ valid = this.validateTag(newTag);
                    if (!valid) {
                        allValid = false;
                    }
                }
            }
            catch (e_1_1) { e_1 = { error: e_1_1 }; }
            finally {
                try {
                    if (newTags_1_1 && !newTags_1_1.done && (_a = newTags_1.return)) _a.call(newTags_1);
                }
                finally { if (e_1) throw e_1.error; }
            }
            // Add the tags if all are valid
            if (allValid) {
                try {
                    for (var newTags_2 = tslib_1.__values(newTags), newTags_2_1 = newTags_2.next(); !newTags_2_1.done; newTags_2_1 = newTags_2.next()) {
                        var newTag = newTags_2_1.value;
                        this.addTag(this.createTag(newTag));
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (newTags_2_1 && !newTags_2_1.done && (_b = newTags_2.return)) _b.call(newTags_2);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
                return true;
            }
        }
        return false;
        var e_1, _a, e_2, _b;
    };
    /**
     * If no tag is selected, select the rightmost tag. If a tag is selected, remove it.
     */
    /**
     * If no tag is selected, select the rightmost tag. If a tag is selected, remove it.
     * @return {?}
     */
    TagInputComponent.prototype.backspace = /**
     * If no tag is selected, select the rightmost tag. If a tag is selected, remove it.
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        if (!this.isValidTagIndex(this.selectedIndex)) {
            this.selectTagAt(this.tags.length - 1);
        }
        else {
            this.removeTagAt(this.selectedIndex);
        }
    };
    /**
     * Move the highlighted option forwards or backwards in the list. Wraps at the limits.
     * @param d Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     */
    /**
     * Move the highlighted option forwards or backwards in the list. Wraps at the limits.
     * @param {?} d Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    TagInputComponent.prototype.moveSelection = /**
     * Move the highlighted option forwards or backwards in the list. Wraps at the limits.
     * @param {?} d Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    function (d) {
        if (this.disabled) {
            return;
        }
        if (this.isValidSelectIndex(this.selectedIndex)) {
            this.selectedIndex += d;
            // Do wrapping of selection when out of bounds
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.tags.length;
            }
            else if (this.selectedIndex > this.tags.length) {
                this.selectedIndex = 0;
            }
        }
    };
    /**
     * Returns a value to display for the given tag. Uses display function/property name if set, otherwise assumes that the tag is a simple string.
     */
    /**
     * Returns a value to display for the given tag. Uses display function/property name if set, otherwise assumes that the tag is a simple string.
     * @param {?} tag
     * @return {?}
     */
    TagInputComponent.prototype.getTagDisplay = /**
     * Returns a value to display for the given tag. Uses display function/property name if set, otherwise assumes that the tag is a simple string.
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
        if (typeof this.display === 'function') {
            return this.display(tag);
        }
        if (typeof this.display === 'string') {
            return tag[/** @type {?} */ (this.display)];
        }
        return tag;
    };
    /**
     * Returns true if the given index is selected (tag index or input field).
     */
    /**
     * Returns true if the given index is selected (tag index or input field).
     * @param {?} index
     * @return {?}
     */
    TagInputComponent.prototype.isSelected = /**
     * Returns true if the given index is selected (tag index or input field).
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return index === this.selectedIndex;
    };
    /**
     * Select the tag at the given index. Does nothing if disabled is true.
     */
    /**
     * Select the tag at the given index. Does nothing if disabled is true.
     * @param {?} tagIndex
     * @return {?}
     */
    TagInputComponent.prototype.selectTagAt = /**
     * Select the tag at the given index. Does nothing if disabled is true.
     * @param {?} tagIndex
     * @return {?}
     */
    function (tagIndex) {
        if (this.disabled) {
            return;
        }
        if (this.isValidTagIndex(tagIndex)) {
            this.selectedIndex = tagIndex;
        }
    };
    /**
     * Select the input field, giving it focus. Does nothing if disabled is true.
     */
    /**
     * Select the input field, giving it focus. Does nothing if disabled is true.
     * @return {?}
     */
    TagInputComponent.prototype.selectInput = /**
     * Select the input field, giving it focus. Does nothing if disabled is true.
     * @return {?}
     */
    function () {
        if (this.disabled) {
            return;
        }
        this.selectedIndex = this.tags.length;
    };
    /**
     * Remove the tag at the given index. Does nothing if disabled is true or the minTags property prevents removal.
     */
    /**
     * Remove the tag at the given index. Does nothing if disabled is true or the minTags property prevents removal.
     * @param {?} tagIndex
     * @return {?}
     */
    TagInputComponent.prototype.removeTagAt = /**
     * Remove the tag at the given index. Does nothing if disabled is true or the minTags property prevents removal.
     * @param {?} tagIndex
     * @return {?}
     */
    function (tagIndex) {
        if (this.disabled || !this.canRemoveTagAt(tagIndex)) {
            return;
        }
        // Check that the tagIndex is in range
        if (this.isValidTagIndex(tagIndex)) {
            var /** @type {?} */ tag = this.tags[tagIndex];
            var /** @type {?} */ tagRemovingEvent = new TagInputEvent(tag);
            this.tagRemoving.emit(tagRemovingEvent);
            if (!tagRemovingEvent.defaultPrevented()) {
                // Select input first to avoid issues with dropping focus
                this.selectInput();
                // Remove the tag
                this.tags.splice(tagIndex, 1);
                // Set focus again since indices have changed
                this.selectInput();
                this.tagRemoved.emit(new TagInputEvent(tag));
                this.validate();
            }
        }
    };
    /**
     * Returns true if the tag at the given index can be removed.
     */
    /**
     * Returns true if the tag at the given index can be removed.
     * @param {?} tagIndex
     * @return {?}
     */
    TagInputComponent.prototype.canRemoveTagAt = /**
     * Returns true if the tag at the given index can be removed.
     * @param {?} tagIndex
     * @return {?}
     */
    function (tagIndex) {
        return this.tags.length > this.minTags || !this.enforceTagLimits;
    };
    /**
     * Returns true if the input field should be available.
     */
    /**
     * Returns true if the input field should be available.
     * @return {?}
     */
    TagInputComponent.prototype.isInputVisible = /**
     * Returns true if the input field should be available.
     * @return {?}
     */
    function () {
        return this.tags.length < this.maxTags || !this.enforceTagLimits;
    };
    /**
     * Returns true if any part of the control has focus.
     */
    /**
     * Returns true if any part of the control has focus.
     * @return {?}
     */
    TagInputComponent.prototype.hasFocus = /**
     * Returns true if any part of the control has focus.
     * @return {?}
     */
    function () {
        return this.isValidSelectIndex(this.selectedIndex);
    };
    /**
     * @param {?} typeahead
     * @return {?}
     */
    TagInputComponent.prototype.connectTypeahead = /**
     * @param {?} typeahead
     * @return {?}
     */
    function (typeahead) {
        var _this = this;
        if (this._typeaheadSubscription) {
            this._typeaheadSubscription.unsubscribe();
            this._typeaheadSubscription = null;
        }
        this.typeahead = typeahead;
        if (this.typeahead) {
            // Set up event handler for selected options
            this._typeaheadSubscription = this.typeahead.optionSelected.subscribe(this.typeaheadOptionSelectedHandler.bind(this));
            // Set up event handler for the highlighted element
            // Added a delay to move it out of the current change detection cycle
            if (this.trackAriaDescendant) {
                this._typeaheadSubscription.add(this.typeahead.highlightedElementChange.subscribe(function (element) {
                    _this.highlightedElement = element;
                }));
            }
        }
    };
    /**
     * Validate the given tagValue with the tagPattern, if set. Update validationErrors on validation failure.
     * @param {?} tagValue
     * @return {?}
     */
    TagInputComponent.prototype.validateTag = /**
     * Validate the given tagValue with the tagPattern, if set. Update validationErrors on validation failure.
     * @param {?} tagValue
     * @return {?}
     */
    function (tagValue) {
        var /** @type {?} */ inputPattern = null;
        this.inputValid = true;
        if (this.tagPattern && !this.tagPattern.test(tagValue)) {
            inputPattern = {
                given: tagValue,
                pattern: this.tagPattern
            };
            this.inputValid = false;
        }
        this.validationErrors['inputPattern'] = inputPattern;
        return this.inputValid;
    };
    /**
     * Create a tag object for the given tagValue. If createTagHandler is specified, use it; otherwise if displayProperty is specified, create an object with the tagValue as the single named property; otherwise return the tagValue itself.
     * @param {?} tagValue
     * @return {?}
     */
    TagInputComponent.prototype.createTag = /**
     * Create a tag object for the given tagValue. If createTagHandler is specified, use it; otherwise if displayProperty is specified, create an object with the tagValue as the single named property; otherwise return the tagValue itself.
     * @param {?} tagValue
     * @return {?}
     */
    function (tagValue) {
        var /** @type {?} */ tag = null;
        if (this.createTagHandler && typeof this.createTagHandler === 'function') {
            tag = this.createTagHandler(tagValue);
        }
        else if (typeof this.display === 'string') {
            tag = {};
            tag[/** @type {?} */ (this.display)] = tagValue;
        }
        else {
            tag = tagValue;
        }
        return tag;
    };
    /**
     * Add a tag object, calling the tagAdding and tagAdded events. Returns true if the tag was added to the tags array.
     * @param {?} tag
     * @return {?}
     */
    TagInputComponent.prototype.addTag = /**
     * Add a tag object, calling the tagAdding and tagAdded events. Returns true if the tag was added to the tags array.
     * @param {?} tag
     * @return {?}
     */
    function (tag) {
        if (tag) {
            // Verify that the new tag can be displayed
            var /** @type {?} */ displayValue = this.getTagDisplay(tag);
            if (displayValue && typeof displayValue === 'string' && displayValue.length > 0) {
                var /** @type {?} */ tagAddingEvent = new TagInputEvent(tag);
                this.tagAdding.emit(tagAddingEvent);
                if (!tagAddingEvent.defaultPrevented()) {
                    this.tags = this.tags || [];
                    this.tags.push(tag);
                    this.tagAdded.emit(new TagInputEvent(tag));
                    this.validate();
                    return true;
                }
            }
        }
        return false;
    };
    /**
     * Returns true if the given tagIndex is a valid tag index.
     * @param {?} tagIndex
     * @return {?}
     */
    TagInputComponent.prototype.isValidTagIndex = /**
     * Returns true if the given tagIndex is a valid tag index.
     * @param {?} tagIndex
     * @return {?}
     */
    function (tagIndex) {
        return tagIndex >= 0 && tagIndex < this.tags.length;
    };
    /**
     * Returns true if the given index is a valid selection index (tags or input field).
     * @param {?} index
     * @return {?}
     */
    TagInputComponent.prototype.isValidSelectIndex = /**
     * Returns true if the given index is a valid selection index (tags or input field).
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return index >= 0 && index <= this.tags.length;
    };
    /**
     * Returns the character corresponding to the given key event, mainly for IE compatibility.
     * @param {?} event
     * @return {?}
     */
    TagInputComponent.prototype.getKeyChar = /**
     * Returns the character corresponding to the given key event, mainly for IE compatibility.
     * @param {?} event
     * @return {?}
     */
    function (event) {
        switch (event.key) {
            case 'Spacebar':
                return ' ';
        }
        return event.key;
    };
    /**
     * Returns an array of strings corresponding to the input string split by the tagDelimiters characters.
     * @param {?} input
     * @return {?}
     */
    TagInputComponent.prototype.splitTagInput = /**
     * Returns an array of strings corresponding to the input string split by the tagDelimiters characters.
     * @param {?} input
     * @return {?}
     */
    function (input) {
        var /** @type {?} */ tagValues = [input];
        if (this.tagDelimiters && typeof this.tagDelimiters === 'string') {
            var /** @type {?} */ escapedDelimiters = this.tagDelimiters.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            var /** @type {?} */ delimiterRegex = new RegExp("[" + escapedDelimiters + "]", 'g');
            tagValues = input.split(delimiterRegex).filter(function (s) { return s.length > 0; });
        }
        return tagValues;
    };
    TagInputComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-tag-input',
                    template: "<ol [attr.role]=\"typeahead ? 'combobox' : 'none'\" [attr.aria-haspopup]=\"typeahead ? 'listbox' : null\">\n    <li *ngFor=\"let tag of tags; let i = index\" class=\"ux-tag\"\n        [class.disabled]=\"disabled\"\n        [ngClass]=\"tagClass(tag, i, isSelected(i))\"\n        [attr.tabindex]=\"disabled ? null : 0\"\n        [focusIf]=\"isSelected(i)\"\n        (click)=\"tagClickHandler($event, tag, i)\"\n        (focus)=\"selectTagAt(i)\">\n\n        <ng-container [ngTemplateOutlet]=\"tagTemplate\"\n            [ngTemplateOutletContext]=\"{tag: tag, index: i, disabled: disabled, api: tagApi}\">\n        </ng-container>\n\n    </li>\n    <li *ngIf=\"isInputVisible()\" class=\"ux-tag-input\" role=\"none\">\n        <input #tagInput type=\"text\" [attr.id]=\"id\" class=\"ux-tag-input\"\n            [(ngModel)]=\"input\"\n            [class.invalid]=\"!inputValid\"\n            [attr.aria-activedescendant]=\"highlightedElement?.id\"\n            [attr.aria-autocomplete]=\"typeahead ? 'list' : 'none'\"\n            [attr.aria-controls]=\"typeahead?.id\"\n            aria-multiline=\"false\"\n            [placeholder]=\"disabled ? '' : (placeholder || '')\"\n            [disabled]=\"disabled\"\n            [focusIf]=\"isSelected(tags.length)\"\n            (click)=\"inputClickHandler()\"\n            (focus)=\"inputFocusHandler()\"\n            (paste)=\"inputPasteHandler($event)\">\n    </li>\n</ol>\n\n<ng-content #typeahead></ng-content>\n\n<ng-template #defaultTagTemplate let-tag=\"tag\" let-index=\"index\" let-disabled=\"disabled\" let-api=\"api\">\n    <span class=\"ux-tag-text\">{{api.getTagDisplay(tag)}}</span>\n    <button *ngIf=\"api.canRemoveTagAt(index)\"\n        type=\"button\"\n        class=\"ux-tag-remove\"\n        aria-label=\"Remove Item\"\n        [disabled]=\"disabled\"\n        (click)=\"api.removeTagAt(index); $event.stopPropagation();\">\n        <span class=\"hpe-icon hpe-close\"></span>\n    </button>\n</ng-template>",
                    providers: [TAGINPUT_VALUE_ACCESSOR, TAGINPUT_VALIDATOR],
                    host: {
                        '[class.disabled]': 'disabled',
                        '[class.focus]': 'hasFocus()',
                        '[class.invalid]': '!valid || !inputValid'
                    }
                }] }
    ];
    /** @nocollapse */
    TagInputComponent.ctorParameters = function () { return [
        { type: ElementRef },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
        { type: TypeaheadKeyService }
    ]; };
    TagInputComponent.propDecorators = {
        id: [{ type: Input }, { type: HostBinding, args: ['attr.id',] }],
        tags: [{ type: Input, args: ['tags',] }],
        tagsChange: [{ type: Output }],
        input: [{ type: Input, args: ['input',] }],
        inputChange: [{ type: Output }],
        display: [{ type: Input }],
        addOnPaste: [{ type: Input }],
        disabled: [{ type: Input }],
        enforceTagLimits: [{ type: Input }],
        freeInput: [{ type: Input }],
        maxTags: [{ type: Input }],
        minTags: [{ type: Input }],
        placeholder: [{ type: Input }],
        showTypeaheadOnClick: [{ type: Input }],
        tagDelimiters: [{ type: Input }],
        tagPattern: [{ type: Input }],
        tagTemplate: [{ type: Input }],
        tagClass: [{ type: Input }],
        validationErrors: [{ type: Input }],
        createTagHandler: [{ type: Input, args: ['createTag',] }],
        trackAriaDescendant: [{ type: Input }],
        tagAdding: [{ type: Output }],
        tagAdded: [{ type: Output }],
        tagInvalidated: [{ type: Output }],
        tagRemoving: [{ type: Output }],
        tagRemoved: [{ type: Output }],
        tagClick: [{ type: Output }],
        typeaheadQuery: [{ type: ContentChildren, args: [TypeaheadComponent,] }],
        tagInput: [{ type: ViewChild, args: ['tagInput',] }],
        _defaultTagTemplate: [{ type: ViewChild, args: ['defaultTagTemplate',] }],
        keyHandler: [{ type: HostListener, args: ['keydown', ['$event'],] }],
        focusOutHandler: [{ type: HostListener, args: ['focusout', ['$event'],] }]
    };
    return TagInputComponent;
}());
export { TagInputComponent };
function TagInputComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    TagInputComponent.prototype.id;
    /** @type {?} */
    TagInputComponent.prototype.tagsChange;
    /** @type {?} */
    TagInputComponent.prototype.inputChange;
    /** @type {?} */
    TagInputComponent.prototype.display;
    /** @type {?} */
    TagInputComponent.prototype.addOnPaste;
    /** @type {?} */
    TagInputComponent.prototype.disabled;
    /** @type {?} */
    TagInputComponent.prototype.enforceTagLimits;
    /** @type {?} */
    TagInputComponent.prototype.freeInput;
    /** @type {?} */
    TagInputComponent.prototype.maxTags;
    /** @type {?} */
    TagInputComponent.prototype.minTags;
    /** @type {?} */
    TagInputComponent.prototype.placeholder;
    /** @type {?} */
    TagInputComponent.prototype.showTypeaheadOnClick;
    /** @type {?} */
    TagInputComponent.prototype.tagDelimiters;
    /** @type {?} */
    TagInputComponent.prototype.tagPattern;
    /** @type {?} */
    TagInputComponent.prototype.tagTemplate;
    /** @type {?} */
    TagInputComponent.prototype.tagClass;
    /** @type {?} */
    TagInputComponent.prototype.validationErrors;
    /** @type {?} */
    TagInputComponent.prototype.createTagHandler;
    /** @type {?} */
    TagInputComponent.prototype.trackAriaDescendant;
    /** @type {?} */
    TagInputComponent.prototype.tagAdding;
    /** @type {?} */
    TagInputComponent.prototype.tagAdded;
    /** @type {?} */
    TagInputComponent.prototype.tagInvalidated;
    /** @type {?} */
    TagInputComponent.prototype.tagRemoving;
    /** @type {?} */
    TagInputComponent.prototype.tagRemoved;
    /** @type {?} */
    TagInputComponent.prototype.tagClick;
    /** @type {?} */
    TagInputComponent.prototype.typeaheadQuery;
    /** @type {?} */
    TagInputComponent.prototype.tagInput;
    /** @type {?} */
    TagInputComponent.prototype._defaultTagTemplate;
    /** @type {?} */
    TagInputComponent.prototype.selectedIndex;
    /** @type {?} */
    TagInputComponent.prototype.tagApi;
    /** @type {?} */
    TagInputComponent.prototype.valid;
    /** @type {?} */
    TagInputComponent.prototype.inputValid;
    /** @type {?} */
    TagInputComponent.prototype.typeahead;
    /** @type {?} */
    TagInputComponent.prototype.highlightedElement;
    /** @type {?} */
    TagInputComponent.prototype._input;
    /** @type {?} */
    TagInputComponent.prototype._tags;
    /** @type {?} */
    TagInputComponent.prototype._onChangeHandler;
    /** @type {?} */
    TagInputComponent.prototype._onTouchedHandler;
    /** @type {?} */
    TagInputComponent.prototype._typeaheadSubscription;
    /** @type {?} */
    TagInputComponent.prototype._element;
    /** @type {?} */
    TagInputComponent.prototype._document;
    /** @type {?} */
    TagInputComponent.prototype._typeaheadKeyService;
}
/**
 * The API available to tag templates.
 * @record
 */
export function TagApi() { }
function TagApi_tsickle_Closure_declarations() {
    /**
     * Returns the display value of the given tag, according to the displayProperty property.
     * @type {?}
     */
    TagApi.prototype.getTagDisplay;
    /**
     * Removes the tag at the given index, if possible.
     * @type {?}
     */
    TagApi.prototype.removeTagAt;
    /**
     * 	Returns true if the tag at the given index can be removed.
     * @type {?}
     */
    TagApi.prototype.canRemoveTagAt;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhZy1pbnB1dC90YWctaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBb0IsU0FBUyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBRSxTQUFTLEVBQWlCLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDclAsT0FBTyxFQUF3QixhQUFhLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4RixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU3RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbEQscUJBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQUVqQixxQkFBTSx1QkFBdUIsR0FBRztJQUM1QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGlCQUFpQixFQUFqQixDQUFpQixDQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUNGLHFCQUFNLGtCQUFrQixHQUFHO0lBQ3ZCLE9BQU8sRUFBRSxhQUFhO0lBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsY0FBTSxPQUFBLGlCQUFpQixFQUFqQixDQUFpQixDQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQzs7SUErRkUsMkJBQ1ksVUFDa0IsU0FBYyxFQUNoQztRQUZBLGFBQVEsR0FBUixRQUFRO1FBQ1UsY0FBUyxHQUFULFNBQVMsQ0FBSztRQUNoQyx5QkFBb0IsR0FBcEIsb0JBQW9CO2tCQXBGYyxrQkFBZ0IsRUFBRSxRQUFVOzBCQWVuRCxJQUFJLFlBQVksRUFBUzsyQkFXeEIsSUFBSSxZQUFZLEVBQVU7MEJBR25CLElBQUk7d0JBQ04sS0FBSztnQ0FDRyxLQUFLO3lCQUNaLElBQUk7dUJBQ1AsTUFBTSxDQUFDLFNBQVM7dUJBQ2hCLENBQUM7MkJBQ0csRUFBRTtvQ0FDUSxLQUFLOzZCQUNiLEVBQUU7d0JBR0csY0FBTSxPQUFBLFNBQVMsRUFBVCxDQUFTO2dDQUNwQixFQUFFOzttQ0FJSyxJQUFJO3lCQUV0QixJQUFJLFlBQVksRUFBaUI7d0JBQ2xDLElBQUksWUFBWSxFQUFpQjs4QkFDM0IsSUFBSSxZQUFZLEVBQWlCOzJCQUNwQyxJQUFJLFlBQVksRUFBaUI7MEJBQ2xDLElBQUksWUFBWSxFQUFpQjt3QkFDbkMsSUFBSSxZQUFZLEVBQWlCOzZCQVE5QixDQUFDLENBQUM7c0JBRVQ7WUFDYixhQUFhLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQzVDLFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDeEMsY0FBYyxFQUFFLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQztTQUNqRDtxQkFFZ0IsSUFBSTswQkFDQyxJQUFJO3NCQU1ELEVBQUU7cUJBQ0osRUFBRTtnQ0FDb0IsZUFBUztpQ0FDZCxlQUFTO0tBTVM7SUFsRjFELHNCQUNJLG1DQUFJOzs7O1FBRFI7WUFFSSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO2dCQUNkLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO2FBQ25CO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUM7U0FDckI7Ozs7O1FBQ0QsVUFBUyxLQUFZO1lBQ2pCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO1lBQ25CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3BDOzs7T0FMQTtJQVNELHNCQUNJLG9DQUFLOzs7O1FBRFQ7WUFFSSxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUN0Qjs7Ozs7UUFDRCxVQUFVLEtBQWE7WUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7WUFDcEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDaEM7OztPQUpBOzs7O0lBa0VELG9DQUFROzs7SUFBUjtRQUNJLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDcEIsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUM7U0FDL0M7S0FDSjs7OztJQUVELDhDQUFrQjs7O0lBQWxCO1FBQUEsaUJBTUM7O1FBSkcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLFVBQUMsS0FBSztZQUN4QyxLQUFJLENBQUMsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RDLENBQUMsQ0FBQztLQUNOOzs7OztJQUVELHVDQUFXOzs7O0lBQVgsVUFBWSxPQUFzQjtRQUM5QixFQUFFLENBQUMsQ0FBQyxPQUFPLGNBQVcsQ0FBQztZQUNuQixFQUFFLENBQUMsQ0FBQyxPQUFPLGFBQVUsWUFBWSxDQUFDLENBQUMsQ0FBQzs7Z0JBRWhDLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ3hCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO29CQUNqQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7aUJBQy9CO2FBQ0o7U0FDSjs7UUFHRCxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDbkI7Ozs7O0lBRUQsc0NBQVU7Ozs7SUFBVixVQUFXLEtBQVk7UUFDbkIsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNSLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO1NBQ3JCO0tBQ0o7Ozs7O0lBRUQsNENBQWdCOzs7O0lBQWhCLFVBQWlCLEVBQU87UUFDcEIsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztLQUM5Qjs7Ozs7SUFFRCw2Q0FBaUI7Ozs7SUFBakIsVUFBa0IsRUFBTztRQUNyQixJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0tBQy9COzs7OztJQUVELDRDQUFnQjs7OztJQUFoQixVQUFpQixVQUFtQjtRQUNoQyxJQUFJLENBQUMsUUFBUSxHQUFHLFVBQVUsQ0FBQztLQUM5Qjs7OztJQUVELHVDQUFXOzs7SUFBWDtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzdDO0tBQ0o7SUFFRDs7T0FFRzs7Ozs7SUFDSCxvQ0FBUTs7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7UUFDbEIscUJBQUksYUFBYSxHQUFHLElBQUksQ0FBQztRQUN6QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3BGLGFBQWEsR0FBRztnQkFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNO2dCQUN2QixHQUFHLEVBQUUsSUFBSSxDQUFDLE9BQU87Z0JBQ2pCLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTzthQUNwQixDQUFDO1lBQ0YsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7U0FDdEI7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEdBQUcsYUFBYSxDQUFDO0tBQzFEOzs7OztJQUdELHNDQUFVOzs7O0lBRFYsVUFDVyxLQUFvQjtRQUUzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFOztRQUc5QixxQkFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxDQUFDOztRQUdsRSxxQkFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsY0FBYyxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQzs7UUFHN0cscUJBQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBRTdELHFCQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDOztRQUd2RCxxQkFBTSxlQUFlLEdBQUcsV0FBVyxJQUFJLENBQUMsY0FBYyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQzlFLHFCQUFNLGdCQUFnQixHQUFHLFdBQVcsSUFBSSxDQUFDLGNBQWMsSUFBSSxXQUFXLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzs7UUFHekYsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBRTNELE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1lBQ2hCLEtBQUssT0FBTzs7Z0JBRVIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7O29CQUV0RSxJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQ2pELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQztpQkFDL0I7Z0JBQUMsSUFBSSxDQUFDLENBQUM7O29CQUVKLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztpQkFDdEI7Z0JBQ0QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixLQUFLLENBQUM7WUFDVixLQUFLLFdBQVc7Z0JBQ1osRUFBRSxDQUFDLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDO29CQUNqQixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7b0JBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztpQkFDMUI7Z0JBQ0QsS0FBSyxDQUFDO1lBQ1YsS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLEtBQUs7Z0JBQ04sRUFBRSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztvQkFDZCxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztpQkFDeEM7Z0JBQ0QsS0FBSyxDQUFDO1lBQ1YsS0FBSyxXQUFXLENBQUM7WUFDakIsS0FBSyxNQUFNO2dCQUNQLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxDQUFDLENBQUM7b0JBQ2xCLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDdkIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2lCQUMxQjtnQkFDRCxLQUFLLENBQUM7WUFDVixLQUFLLFlBQVksQ0FBQztZQUNsQixLQUFLLE9BQU87Z0JBQ1IsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO29CQUNuQixJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN0QixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7aUJBQzFCO2dCQUNELEtBQUssQ0FBQztTQUNiOztRQUdELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7O1lBRWhGLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDeEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1NBQzFCO0tBQ0o7Ozs7O0lBR0QsMkNBQWU7Ozs7SUFEZixVQUNnQixLQUFpQjtRQURqQyxpQkFrQkM7OztRQWJHLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzVDLE1BQU0sQ0FBQztTQUNWOztRQUdELFVBQVUsQ0FBQztZQUNQLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLEtBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN0RSxLQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUN4QixFQUFFLENBQUMsQ0FBQyxLQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztvQkFDakIsS0FBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2lCQUMvQjthQUNKO1NBQ0osRUFBRSxHQUFHLENBQUMsQ0FBQztLQUNYOzs7Ozs7O0lBRUQsMkNBQWU7Ozs7OztJQUFmLFVBQWdCLEtBQWlCLEVBQUUsR0FBUSxFQUFFLEtBQWE7UUFFdEQsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7U0FBRTs7UUFHOUIscUJBQU0sYUFBYSxHQUFHLElBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDOztRQUdsQyxFQUFFLENBQUMsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDbkMsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3ZCLE1BQU0sQ0FBQztTQUNWOztRQUdELElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7S0FDM0I7Ozs7SUFFRCw2Q0FBaUI7OztJQUFqQjtRQUVJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDO1NBQUU7UUFFOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUM5QjtLQUNKOzs7O0lBRUQsNkNBQWlCOzs7SUFBakI7UUFFSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFO1FBRTlCLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUN0Qjs7Ozs7SUFFRCw2Q0FBaUI7Ozs7SUFBakIsVUFBa0IsS0FBcUI7UUFFbkMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7U0FBRTtRQUU5QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQzs7WUFFbEIscUJBQUksS0FBSyxHQUFXLElBQUksQ0FBQztZQUN6QixFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQztnQkFDdEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ3JEO1lBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLG1CQUFNLE1BQU0sRUFBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7O2dCQUVyQyxLQUFLLEdBQUcsbUJBQU0sTUFBTSxFQUFDLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUN2RDs7WUFHRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixLQUFLLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUMxQjtTQUNKO0tBQ0o7Ozs7O0lBRUQsMERBQThCOzs7O0lBQTlCLFVBQStCLEtBQTJCO1FBRXRELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDO1NBQUU7O1FBRzlCLElBQUksQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3RDO0lBRUQ7O09BRUc7Ozs7O0lBQ0gsdUNBQVc7Ozs7SUFBWDtRQUNJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMxQixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLEtBQUssR0FBRyxFQUFFLENBQUM7U0FDbkI7S0FDSjtJQUVEOztPQUVHOzs7Ozs7SUFDSCwyQ0FBZTs7Ozs7SUFBZixVQUFnQixHQUFRO1FBQ3BCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25CLElBQUksQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUNuQixJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQztTQUNuQjtLQUNKO0lBRUQ7O09BRUc7Ozs7OztJQUNILGtDQUFNOzs7OztJQUFOLFVBQU8sS0FBYTtRQUNoQixFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7O1lBRzFCLHFCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDOztZQUcxQyxxQkFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDOztnQkFDcEIsR0FBRyxDQUFDLENBQWUsSUFBQSxZQUFBLGlCQUFBLE9BQU8sQ0FBQSxnQ0FBQTtvQkFBckIsSUFBSSxNQUFNLG9CQUFBO29CQUNYLHFCQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUN2QyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7d0JBQ1QsUUFBUSxHQUFHLEtBQUssQ0FBQztxQkFDcEI7aUJBQ0o7Ozs7Ozs7Ozs7WUFHRCxFQUFFLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDOztvQkFDWCxHQUFHLENBQUMsQ0FBZSxJQUFBLFlBQUEsaUJBQUEsT0FBTyxDQUFBLGdDQUFBO3dCQUFyQixJQUFJLE1BQU0sb0JBQUE7d0JBQ1gsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7cUJBQ3ZDOzs7Ozs7Ozs7Z0JBRUQsTUFBTSxDQUFDLElBQUksQ0FBQzthQUNmO1NBQ0o7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDOztLQUNoQjtJQUVEOztPQUVHOzs7OztJQUNILHFDQUFTOzs7O0lBQVQ7UUFFSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFO1FBRTlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDMUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3hDO0tBQ0o7SUFFRDs7O09BR0c7Ozs7OztJQUNILHlDQUFhOzs7OztJQUFiLFVBQWMsQ0FBUztRQUVuQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFO1FBRTlCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzlDLElBQUksQ0FBQyxhQUFhLElBQUksQ0FBQyxDQUFDOztZQUd4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7YUFDekM7WUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxhQUFhLEdBQUcsQ0FBQyxDQUFDO2FBQzFCO1NBQ0o7S0FDSjtJQUVEOztPQUVHOzs7Ozs7SUFDSCx5Q0FBYTs7Ozs7SUFBYixVQUFjLEdBQVE7UUFDbEIsRUFBRSxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsT0FBTyxLQUFLLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDckMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDNUI7UUFDRCxFQUFFLENBQUMsQ0FBQyxPQUFPLElBQUksQ0FBQyxPQUFPLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUNuQyxNQUFNLENBQUMsR0FBRyxtQkFBUyxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUM7U0FDcEM7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDO0tBQ2Q7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsc0NBQVU7Ozs7O0lBQVYsVUFBVyxLQUFhO1FBQ3BCLE1BQU0sQ0FBQyxLQUFLLEtBQUssSUFBSSxDQUFDLGFBQWEsQ0FBQztLQUN2QztJQUVEOztPQUVHOzs7Ozs7SUFDSCx1Q0FBVzs7Ozs7SUFBWCxVQUFZLFFBQWdCO1FBRXhCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDO1NBQUU7UUFFOUIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMsSUFBSSxDQUFDLGFBQWEsR0FBRyxRQUFRLENBQUM7U0FDakM7S0FDSjtJQUVEOztPQUVHOzs7OztJQUNILHVDQUFXOzs7O0lBQVg7UUFFSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQztTQUFFO1FBRTlCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUM7S0FDekM7SUFFRDs7T0FFRzs7Ozs7O0lBQ0gsdUNBQVc7Ozs7O0lBQVgsVUFBWSxRQUFnQjtRQUV4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFBQyxNQUFNLENBQUM7U0FBRTs7UUFHaEUsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDakMscUJBQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDaEMscUJBQU0sZ0JBQWdCLEdBQUcsSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUN4QyxFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDOztnQkFFdkMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDOztnQkFFbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDOztnQkFFOUIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO2dCQUNuQixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUM3QyxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7YUFDbkI7U0FDSjtLQUNKO0lBRUQ7O09BRUc7Ozs7OztJQUNILDBDQUFjOzs7OztJQUFkLFVBQWUsUUFBZ0I7UUFDM0IsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7S0FDcEU7SUFFRDs7T0FFRzs7Ozs7SUFDSCwwQ0FBYzs7OztJQUFkO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUM7S0FDcEU7SUFFRDs7T0FFRzs7Ozs7SUFDSCxvQ0FBUTs7OztJQUFSO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7S0FDdEQ7Ozs7O0lBRU8sNENBQWdCOzs7O2NBQUMsU0FBNkI7O1FBQ2xELEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzFDLElBQUksQ0FBQyxzQkFBc0IsR0FBRyxJQUFJLENBQUM7U0FDdEM7UUFFRCxJQUFJLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQztRQUMzQixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzs7WUFFakIsSUFBSSxDQUFDLHNCQUFzQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsOEJBQThCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7OztZQUl0SCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxDQUFDO2dCQUMzQixJQUFJLENBQUMsc0JBQXNCLENBQUMsR0FBRyxDQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLHdCQUF3QixDQUFDLFNBQVMsQ0FBQyxVQUFDLE9BQW9CO29CQUNuRSxLQUFJLENBQUMsa0JBQWtCLEdBQUcsT0FBTyxDQUFDO2lCQUNyQyxDQUFDLENBQ0wsQ0FBQzthQUNMO1NBQ0o7Ozs7Ozs7SUFNRyx1Q0FBVzs7Ozs7Y0FBQyxRQUFnQjtRQUNoQyxxQkFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO1FBQ3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDckQsWUFBWSxHQUFHO2dCQUNYLEtBQUssRUFBRSxRQUFRO2dCQUNmLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVTthQUMzQixDQUFDO1lBQ0YsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUM7U0FDM0I7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLEdBQUcsWUFBWSxDQUFDO1FBQ3JELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDOzs7Ozs7O0lBTW5CLHFDQUFTOzs7OztjQUFDLFFBQWdCO1FBQzlCLHFCQUFJLEdBQUcsR0FBRyxJQUFJLENBQUM7UUFDZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksT0FBTyxJQUFJLENBQUMsZ0JBQWdCLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQztZQUN2RSxHQUFHLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3pDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLE9BQU8sS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQzFDLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDVCxHQUFHLG1CQUFTLElBQUksQ0FBQyxPQUFPLEVBQUMsR0FBRyxRQUFRLENBQUM7U0FDeEM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLEdBQUcsR0FBRyxRQUFRLENBQUM7U0FDbEI7UUFDRCxNQUFNLENBQUMsR0FBRyxDQUFDOzs7Ozs7O0lBTVAsa0NBQU07Ozs7O2NBQUMsR0FBUTtRQUNuQixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDOztZQUVOLHFCQUFNLFlBQVksR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzdDLEVBQUUsQ0FBQyxDQUFDLFlBQVksSUFBSSxPQUFPLFlBQVksS0FBSyxRQUFRLElBQUksWUFBWSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5RSxxQkFBTSxjQUFjLEdBQUcsSUFBSSxhQUFhLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQzlDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO2dCQUNwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDckMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztvQkFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7b0JBQzNDLElBQUksQ0FBQyxRQUFRLEVBQUUsQ0FBQztvQkFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQztpQkFDZjthQUNKO1NBQ0o7UUFFRCxNQUFNLENBQUMsS0FBSyxDQUFDOzs7Ozs7O0lBTVQsMkNBQWU7Ozs7O2NBQUMsUUFBZ0I7UUFDcEMsTUFBTSxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDOzs7Ozs7O0lBTWhELDhDQUFrQjs7Ozs7Y0FBQyxLQUFhO1FBQ3BDLE1BQU0sQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQzs7Ozs7OztJQU0zQyxzQ0FBVTs7Ozs7Y0FBQyxLQUFvQjtRQUNuQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztZQUNoQixLQUFLLFVBQVU7Z0JBQ1gsTUFBTSxDQUFDLEdBQUcsQ0FBQztTQUNsQjtRQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDOzs7Ozs7O0lBTWIseUNBQWE7Ozs7O2NBQUMsS0FBYTtRQUMvQixxQkFBSSxTQUFTLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN4QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxJQUFJLE9BQU8sSUFBSSxDQUFDLGFBQWEsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQy9ELHFCQUFNLGlCQUFpQixHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLHdCQUF3QixFQUFFLE1BQU0sQ0FBQyxDQUFDO1lBQ3ZGLHFCQUFNLGNBQWMsR0FBRyxJQUFJLE1BQU0sQ0FBQyxNQUFJLGlCQUFpQixNQUFHLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDakUsU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQyxJQUFLLE9BQUEsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQVosQ0FBWSxDQUFDLENBQUM7U0FDdkU7UUFDRCxNQUFNLENBQUMsU0FBUyxDQUFDOzs7Z0JBdG1CeEIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxjQUFjO29CQUN4QiwrN0RBQXVDO29CQUN2QyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxrQkFBa0IsQ0FBQztvQkFDeEQsSUFBSSxFQUFFO3dCQUNGLGtCQUFrQixFQUFFLFVBQVU7d0JBQzlCLGVBQWUsRUFBRSxZQUFZO3dCQUM3QixpQkFBaUIsRUFBRSx1QkFBdUI7cUJBQzdDO2lCQUNKOzs7O2dCQTdCc0QsVUFBVTtnREFtSHhELE1BQU0sU0FBQyxRQUFRO2dCQWhISyxtQkFBbUI7OztxQkE2QjNDLEtBQUssWUFBSSxXQUFXLFNBQUMsU0FBUzt1QkFFOUIsS0FBSyxTQUFDLE1BQU07NkJBYVosTUFBTTt3QkFFTixLQUFLLFNBQUMsT0FBTzs4QkFTYixNQUFNOzBCQUVOLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLO21DQUNMLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7OEJBQ0wsS0FBSzt1Q0FDTCxLQUFLO2dDQUNMLEtBQUs7NkJBQ0wsS0FBSzs4QkFDTCxLQUFLOzJCQUNMLEtBQUs7bUNBQ0wsS0FBSzttQ0FDTCxLQUFLLFNBQUMsV0FBVztzQ0FHakIsS0FBSzs0QkFFTCxNQUFNOzJCQUNOLE1BQU07aUNBQ04sTUFBTTs4QkFDTixNQUFNOzZCQUNOLE1BQU07MkJBQ04sTUFBTTtpQ0FFTixlQUFlLFNBQUMsa0JBQWtCOzJCQUVsQyxTQUFTLFNBQUMsVUFBVTtzQ0FFcEIsU0FBUyxTQUFDLG9CQUFvQjs2QkFrRzlCLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7a0NBMEVsQyxZQUFZLFNBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDOzs0QkF2UXhDOztTQStCYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XHJcbmltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIGZvcndhcmRSZWYsIEhvc3RCaW5kaW5nLCBIb3N0TGlzdGVuZXIsIEluamVjdCwgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCwgUXVlcnlMaXN0LCBTaW1wbGVDaGFuZ2VzLCBUZW1wbGF0ZVJlZiwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxJREFUT1JTLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRDb21wb25lbnQsIFR5cGVhaGVhZEtleVNlcnZpY2UgfSBmcm9tICcuLi90eXBlYWhlYWQvaW5kZXgnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRPcHRpb25FdmVudCB9IGZyb20gJy4uL3R5cGVhaGVhZC90eXBlYWhlYWQtZXZlbnQnO1xyXG5pbXBvcnQgeyBUYWdJbnB1dEV2ZW50IH0gZnJvbSAnLi90YWctaW5wdXQtZXZlbnQnO1xyXG5cclxubGV0IHVuaXF1ZUlkID0gMDtcclxuXHJcbmNvbnN0IFRBR0lOUFVUX1ZBTFVFX0FDQ0VTU09SID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUYWdJbnB1dENvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5jb25zdCBUQUdJTlBVVF9WQUxJREFUT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGFnSW5wdXRDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd1eC10YWctaW5wdXQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICd0YWctaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgcHJvdmlkZXJzOiBbVEFHSU5QVVRfVkFMVUVfQUNDRVNTT1IsIFRBR0lOUFVUX1ZBTElEQVRPUl0sXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxyXG4gICAgICAgICdbY2xhc3MuZm9jdXNdJzogJ2hhc0ZvY3VzKCknLFxyXG4gICAgICAgICdbY2xhc3MuaW52YWxpZF0nOiAnIXZhbGlkIHx8ICFpbnB1dFZhbGlkJ1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFnSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJykgaWQ6IHN0cmluZyA9IGB1eC10YWctaW5wdXQtJHsrK3VuaXF1ZUlkfWA7XHJcblxyXG4gICAgQElucHV0KCd0YWdzJylcclxuICAgIGdldCB0YWdzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fdGFncykge1xyXG4gICAgICAgICAgICB0aGlzLl90YWdzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90YWdzO1xyXG4gICAgfVxyXG4gICAgc2V0IHRhZ3ModmFsdWU6IGFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5fdGFncyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlSGFuZGxlcih0aGlzLl90YWdzKTtcclxuICAgICAgICB0aGlzLnRhZ3NDaGFuZ2UuZW1pdCh0aGlzLl90YWdzKTtcclxuICAgIH1cclxuXHJcbiAgICBAT3V0cHV0KCkgdGFnc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XHJcblxyXG4gICAgQElucHV0KCdpbnB1dCcpXHJcbiAgICBnZXQgaW5wdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lucHV0O1xyXG4gICAgfVxyXG4gICAgc2V0IGlucHV0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9pbnB1dCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuaW5wdXRDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgQE91dHB1dCgpIGlucHV0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gICAgQElucHV0KCkgZGlzcGxheTogKG9wdGlvbjogYW55KSA9PiBzdHJpbmcgfCBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBhZGRPblBhc3RlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBlbmZvcmNlVGFnTGltaXRzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBmcmVlSW5wdXQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgbWF4VGFnczogbnVtYmVyID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgIEBJbnB1dCgpIG1pblRhZ3M6IG51bWJlciA9IDA7XHJcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XHJcbiAgICBASW5wdXQoKSBzaG93VHlwZWFoZWFkT25DbGljazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgdGFnRGVsaW1pdGVyczogc3RyaW5nID0gJyc7XHJcbiAgICBASW5wdXQoKSB0YWdQYXR0ZXJuOiBSZWdFeHA7XHJcbiAgICBASW5wdXQoKSB0YWdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBJbnB1dCgpIHRhZ0NsYXNzOiBUYWdDbGFzc0Z1bmN0aW9uID0gKCkgPT4gdW5kZWZpbmVkO1xyXG4gICAgQElucHV0KCkgdmFsaWRhdGlvbkVycm9yczogYW55ID0ge307XHJcbiAgICBASW5wdXQoJ2NyZWF0ZVRhZycpIGNyZWF0ZVRhZ0hhbmRsZXI6ICh2YWx1ZTogc3RyaW5nKSA9PiBhbnk7XHJcblxyXG4gICAgLy8gV29ya2Fyb3VuZCBmb3IgRUwtMzIyNCB1bnRpbCB0aGUgaXNzdWUgY2FuIGJlIGRpYWdub3NlZC5cclxuICAgIEBJbnB1dCgpIHRyYWNrQXJpYURlc2NlbmRhbnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBPdXRwdXQoKSB0YWdBZGRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ0lucHV0RXZlbnQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgdGFnQWRkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ0lucHV0RXZlbnQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgdGFnSW52YWxpZGF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ0lucHV0RXZlbnQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgdGFnUmVtb3ZpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ0lucHV0RXZlbnQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgdGFnUmVtb3ZlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnSW5wdXRFdmVudD4oKTtcclxuICAgIEBPdXRwdXQoKSB0YWdDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnSW5wdXRFdmVudD4oKTtcclxuXHJcbiAgICBAQ29udGVudENoaWxkcmVuKFR5cGVhaGVhZENvbXBvbmVudCkgdHlwZWFoZWFkUXVlcnk6IFF1ZXJ5TGlzdDxUeXBlYWhlYWRDb21wb25lbnQ+O1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3RhZ0lucHV0JykgdGFnSW5wdXQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnZGVmYXVsdFRhZ1RlbXBsYXRlJykgcHJpdmF0ZSBfZGVmYXVsdFRhZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIHNlbGVjdGVkSW5kZXg6IG51bWJlciA9IC0xO1xyXG5cclxuICAgIHRhZ0FwaTogVGFnQXBpID0ge1xyXG4gICAgICAgIGdldFRhZ0Rpc3BsYXk6IHRoaXMuZ2V0VGFnRGlzcGxheS5iaW5kKHRoaXMpLFxyXG4gICAgICAgIHJlbW92ZVRhZ0F0OiB0aGlzLnJlbW92ZVRhZ0F0LmJpbmQodGhpcyksXHJcbiAgICAgICAgY2FuUmVtb3ZlVGFnQXQ6IHRoaXMuY2FuUmVtb3ZlVGFnQXQuYmluZCh0aGlzKVxyXG4gICAgfTtcclxuXHJcbiAgICB2YWxpZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBpbnB1dFZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICB0eXBlYWhlYWQ6IFR5cGVhaGVhZENvbXBvbmVudDtcclxuXHJcbiAgICBoaWdobGlnaHRlZEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG5cclxuICAgIHByaXZhdGUgX2lucHV0OiBzdHJpbmcgPSAnJztcclxuICAgIHByaXZhdGUgX3RhZ3M6IGFueVtdID0gW107XHJcbiAgICBwcml2YXRlIF9vbkNoYW5nZUhhbmRsZXI6IChfOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7IH07XHJcbiAgICBwcml2YXRlIF9vblRvdWNoZWRIYW5kbGVyOiAoKSA9PiB2b2lkID0gKCkgPT4geyB9O1xyXG4gICAgcHJpdmF0ZSBfdHlwZWFoZWFkU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb247XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxyXG4gICAgICAgIHByaXZhdGUgX3R5cGVhaGVhZEtleVNlcnZpY2U6IFR5cGVhaGVhZEtleVNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIGlmICghdGhpcy50YWdUZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ1RlbXBsYXRlID0gdGhpcy5fZGVmYXVsdFRhZ1RlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKSB7XHJcbiAgICAgICAgLy8gV2F0Y2ggZm9yIG9wdGlvbmFsIGNoaWxkIHR5cGVhaGVhZCBjb250cm9sXHJcbiAgICAgICAgdGhpcy5jb25uZWN0VHlwZWFoZWFkKHRoaXMudHlwZWFoZWFkUXVlcnkuZmlyc3QpO1xyXG4gICAgICAgIHRoaXMudHlwZWFoZWFkUXVlcnkuY2hhbmdlcy5zdWJzY3JpYmUoKHF1ZXJ5KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMuY29ubmVjdFR5cGVhaGVhZChxdWVyeS5maXJzdCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcykge1xyXG4gICAgICAgIGlmIChjaGFuZ2VzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLmRpc2FibGVkLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ2xlYXIgc2VsZWN0aW9uIGFuZCBjbG9zZSBkcm9wZG93blxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlYWhlYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cGVhaGVhZC5vcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB2YWxpZGF0aW9uIHN0YXR1c1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnlbXSkge1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ3MgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fb25DaGFuZ2VIYW5kbGVyID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xyXG4gICAgICAgIHRoaXMuX29uVG91Y2hlZEhhbmRsZXIgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fdHlwZWFoZWFkU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3R5cGVhaGVhZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZhbGlkYXRlIHRoZSB2YWx1ZSBvZiB0aGUgY29udHJvbCAodGFncyBwcm9wZXJ0eSkuXHJcbiAgICAgKi9cclxuICAgIHZhbGlkYXRlKCkge1xyXG4gICAgICAgIHRoaXMudmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIGxldCB0YWdSYW5nZUVycm9yID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy50YWdzICYmICh0aGlzLnRhZ3MubGVuZ3RoIDwgdGhpcy5taW5UYWdzIHx8IHRoaXMudGFncy5sZW5ndGggPiB0aGlzLm1heFRhZ3MpKSB7XHJcbiAgICAgICAgICAgIHRhZ1JhbmdlRXJyb3IgPSB7XHJcbiAgICAgICAgICAgICAgICBnaXZlbjogdGhpcy50YWdzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5UYWdzLFxyXG4gICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFRhZ3NcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy52YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnNbJ3RhZ1JhbmdlRXJyb3InXSA9IHRhZ1JhbmdlRXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXHJcbiAgICBrZXlIYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIGlucHV0IGZpZWxkIGN1cnNvciBsb2NhdGlvblxyXG4gICAgICAgIGNvbnN0IGlucHV0Q3Vyc29yUG9zID0gdGhpcy50YWdJbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgaWYgdGhlIGlucHV0IGZpZWxkIGhhcyBhbnkgdGV4dCBzZWxlY3RlZFxyXG4gICAgICAgIGNvbnN0IGhhc1NlbGVjdGlvbiA9IHRoaXMudGFnSW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCAhPT0gdGhpcy50YWdJbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZDtcclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIGEgdGFnIGhhcyBmb2N1c1xyXG4gICAgICAgIGNvbnN0IHRhZ1NlbGVjdGVkID0gdGhpcy5pc1ZhbGlkVGFnSW5kZXgodGhpcy5zZWxlY3RlZEluZGV4KTtcclxuXHJcbiAgICAgICAgY29uc3QgaW5wdXRMZW5ndGggPSB0aGlzLmlucHV0ID8gdGhpcy5pbnB1dC5sZW5ndGggOiAwO1xyXG5cclxuICAgICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBhcnJvdyBrZXlzIGNhbiBtb3ZlIHRoZSBzZWxlY3Rpb24uIE90aGVyd2lzZSB0aGUgaW5wdXQgZmllbGQgdGFrZXMgdGhlIGV2ZW50LlxyXG4gICAgICAgIGNvbnN0IGNhbk5hdmlnYXRlTGVmdCA9IHRhZ1NlbGVjdGVkIHx8IChpbnB1dEN1cnNvclBvcyA8PSAwICYmICFoYXNTZWxlY3Rpb24pO1xyXG4gICAgICAgIGNvbnN0IGNhbk5hdmlnYXRlUmlnaHQgPSB0YWdTZWxlY3RlZCB8fCAoaW5wdXRDdXJzb3JQb3MgPj0gaW5wdXRMZW5ndGggJiYgIWhhc1NlbGVjdGlvbik7XHJcblxyXG4gICAgICAgIC8vIEZvcndhcmQga2V5IGV2ZW50cyB0byB0aGUgdHlwZWFoZWFkIGNvbXBvbmVudC5cclxuICAgICAgICB0aGlzLl90eXBlYWhlYWRLZXlTZXJ2aWNlLmhhbmRsZUtleShldmVudCwgdGhpcy50eXBlYWhlYWQpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xyXG4gICAgICAgICAgICBjYXNlICdFbnRlcic6XHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhIHR5cGVhaGVhZCBvcHRpb24gaXMgaGlnaGxpZ2h0ZWRcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGVhaGVhZCAmJiB0aGlzLnR5cGVhaGVhZC5vcGVuICYmIHRoaXMudHlwZWFoZWFkLmhpZ2hsaWdodGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoZSB0eXBlYWhlYWQgb3B0aW9uIGFzIGEgdGFnLCBjbGVhciB0aGUgaW5wdXQsIGFuZCBjbG9zZSB0aGUgZHJvcGRvd25cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1pdFR5cGVhaGVhZCh0aGlzLnR5cGVhaGVhZC5oaWdobGlnaHRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlYWhlYWQub3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBWYWxpZGF0ZSBhbmQgYWRkIHRoZSBpbnB1dCB0ZXh0IGFzIGEgdGFnLCBpZiBwb3NzaWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbWl0SW5wdXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnQmFja3NwYWNlJzpcclxuICAgICAgICAgICAgICAgIGlmIChjYW5OYXZpZ2F0ZUxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhY2tzcGFjZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnRGVsZXRlJzpcclxuICAgICAgICAgICAgY2FzZSAnRGVsJzpcclxuICAgICAgICAgICAgICAgIGlmICh0YWdTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucmVtb3ZlVGFnQXQodGhpcy5zZWxlY3RlZEluZGV4KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxyXG4gICAgICAgICAgICBjYXNlICdMZWZ0JzpcclxuICAgICAgICAgICAgICAgIGlmIChjYW5OYXZpZ2F0ZUxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVTZWxlY3Rpb24oLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnQXJyb3dSaWdodCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ1JpZ2h0JzpcclxuICAgICAgICAgICAgICAgIGlmIChjYW5OYXZpZ2F0ZVJpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlU2VsZWN0aW9uKDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIGZvciBrZXlzIGluIHRoZSB0YWdEZWxpbWl0ZXJzXHJcbiAgICAgICAgaWYgKHRoaXMudGFnRGVsaW1pdGVycyAmJiB0aGlzLnRhZ0RlbGltaXRlcnMuaW5kZXhPZih0aGlzLmdldEtleUNoYXIoZXZlbnQpKSA+PSAwKSB7XHJcbiAgICAgICAgICAgIC8vIENvbW1pdCBwcmV2aW91cyB0ZXh0XHJcbiAgICAgICAgICAgIHRoaXMuY29tbWl0SW5wdXQoKTtcclxuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2ZvY3Vzb3V0JywgWyckZXZlbnQnXSlcclxuICAgIGZvY3VzT3V0SGFuZGxlcihldmVudDogRm9jdXNFdmVudCkge1xyXG5cclxuICAgICAgICAvLyBJZiBhIGNsaWNrIG9uIHRoZSB0eXBlYWhlYWQgaXMgaW4gcHJvZ3Jlc3MsIGRvbid0IGRvIGFueXRoaW5nLlxyXG4gICAgICAgIC8vIFRoaXMgd29ya3MgYXJvdW5kIGFuIGlzc3VlIGluIElFIHdoZXJlIGNsaWNraW5nIGEgc2Nyb2xsYmFyIGRyb3BzIGZvY3VzLlxyXG4gICAgICAgIGlmICh0aGlzLnR5cGVhaGVhZCAmJiB0aGlzLnR5cGVhaGVhZC5jbGlja2luZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDbG9zZSB0aGUgZHJvcGRvd24gb24gYmx1clxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyh0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlYWhlYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cGVhaGVhZC5vcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRhZ0NsaWNrSGFuZGxlcihldmVudDogTW91c2VFdmVudCwgdGFnOiBhbnksIGluZGV4OiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIC8vIFNlbmQgdGFnQ2xpY2sgZXZlbnRcclxuICAgICAgICBjb25zdCB0YWdDbGlja0V2ZW50ID0gbmV3IFRhZ0lucHV0RXZlbnQodGFnKTtcclxuICAgICAgICB0aGlzLnRhZ0NsaWNrLmVtaXQodGFnQ2xpY2tFdmVudCk7XHJcblxyXG4gICAgICAgIC8vIFByZXZlbnQgZm9jdXMgaWYgcHJldmVudERlZmF1bHQoKSB3YXMgY2FsbGVkXHJcbiAgICAgICAgaWYgKHRhZ0NsaWNrRXZlbnQuZGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNlbGVjdCB0aGUgdGFnIChmb3IgSUUgdGhhdCBkb2Vzbid0IHByb3BhZ2F0ZSBmb2N1cylcclxuICAgICAgICB0aGlzLnNlbGVjdFRhZ0F0KGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dENsaWNrSGFuZGxlcigpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnR5cGVhaGVhZCAmJiB0aGlzLnNob3dUeXBlYWhlYWRPbkNsaWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkLm9wZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnB1dEZvY3VzSGFuZGxlcigpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0SW5wdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dFBhc3RlSGFuZGxlcihldmVudDogQ2xpcGJvYXJkRXZlbnQpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmFkZE9uUGFzdGUpIHtcclxuICAgICAgICAgICAgLy8gR2V0IHRleHQgZnJvbSB0aGUgY2xpcGJvYXJkXHJcbiAgICAgICAgICAgIGxldCBpbnB1dDogc3RyaW5nID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKGV2ZW50LmNsaXBib2FyZERhdGEpIHtcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gZXZlbnQuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCd0ZXh0L3BsYWluJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoKDxhbnk+d2luZG93KS5jbGlwYm9hcmREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBJbnRlcm5ldCBFeHBsb3JlciBvbmx5XHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9ICg8YW55PndpbmRvdykuY2xpcGJvYXJkRGF0YS5nZXREYXRhKCdUZXh0Jyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIENvbW1pdCB0aGUgY2xpcGJvYXJkIHRleHQgZGlyZWN0bHlcclxuICAgICAgICAgICAgaWYgKHRoaXMuY29tbWl0KGlucHV0KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJbnB1dCgpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHR5cGVhaGVhZE9wdGlvblNlbGVjdGVkSGFuZGxlcihldmVudDogVHlwZWFoZWFkT3B0aW9uRXZlbnQpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIC8vIFdoZW4gdGhlIHR5cGVhaGVhZCBzZW5kcyB0aGUgb3B0aW9uU2VsZWN0ZWQgZXZlbnQsIGNvbW1pdCB0aGUgb2JqZWN0IGRpcmVjdGx5XHJcbiAgICAgICAgdGhpcy5jb21taXRUeXBlYWhlYWQoZXZlbnQub3B0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbW1pdCB0aGUgY3VycmVudCBpbnB1dCB2YWx1ZSBhbmQgY2xlYXIgdGhlIGlucHV0IGZpZWxkIGlmIHN1Y2Nlc3NmdWwuXHJcbiAgICAgKi9cclxuICAgIGNvbW1pdElucHV0KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbW1pdCh0aGlzLmlucHV0KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdElucHV0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXQgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21taXQgdGhlIGdpdmVuIHRhZyBvYmplY3QgYW5kIGNsZWFyIHRoZSBpbnB1dCBpZiBzdWNjZXNzZnVsLlxyXG4gICAgICovXHJcbiAgICBjb21taXRUeXBlYWhlYWQodGFnOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5hZGRUYWcodGFnKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdElucHV0KCk7XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXQgPSAnJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21taXQgdGhlIGdpdmVuIHN0cmluZyB2YWx1ZSBhcyBvbmUgb3IgbW9yZSB0YWdzLCBpZiB2YWxpZGF0aW9uIHBhc3Nlcy4gUmV0dXJucyB0cnVlIGlmIHRoZSB0YWcocykgd2VyZSBjcmVhdGVkLlxyXG4gICAgICovXHJcbiAgICBjb21taXQoaW5wdXQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChpbnB1dCAmJiB0aGlzLmZyZWVJbnB1dCkge1xyXG5cclxuICAgICAgICAgICAgLy8gU3BsaXQgdGhlIHRhZ3MgYnkgdGhlIHRhZ0RlbGltaXRlcnMgaWYgY29uZmlndXJlZFxyXG4gICAgICAgICAgICBjb25zdCBuZXdUYWdzID0gdGhpcy5zcGxpdFRhZ0lucHV0KGlucHV0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoZWNrIHRhZyB2YWxpZGF0aW9uIGZvciBhbGwgb2YgdGhlIGluZGl2aWR1YWwgdmFsdWVzXHJcbiAgICAgICAgICAgIGxldCBhbGxWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGZvciAobGV0IG5ld1RhZyBvZiBuZXdUYWdzKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB2YWxpZCA9IHRoaXMudmFsaWRhdGVUYWcobmV3VGFnKTtcclxuICAgICAgICAgICAgICAgIGlmICghdmFsaWQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGxWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBBZGQgdGhlIHRhZ3MgaWYgYWxsIGFyZSB2YWxpZFxyXG4gICAgICAgICAgICBpZiAoYWxsVmFsaWQpIHtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IG5ld1RhZyBvZiBuZXdUYWdzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRUYWcodGhpcy5jcmVhdGVUYWcobmV3VGFnKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIElmIG5vIHRhZyBpcyBzZWxlY3RlZCwgc2VsZWN0IHRoZSByaWdodG1vc3QgdGFnLiBJZiBhIHRhZyBpcyBzZWxlY3RlZCwgcmVtb3ZlIGl0LlxyXG4gICAgICovXHJcbiAgICBiYWNrc3BhY2UoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZFRhZ0luZGV4KHRoaXMuc2VsZWN0ZWRJbmRleCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWdBdCh0aGlzLnRhZ3MubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVUYWdBdCh0aGlzLnNlbGVjdGVkSW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1vdmUgdGhlIGhpZ2hsaWdodGVkIG9wdGlvbiBmb3J3YXJkcyBvciBiYWNrd2FyZHMgaW4gdGhlIGxpc3QuIFdyYXBzIGF0IHRoZSBsaW1pdHMuXHJcbiAgICAgKiBAcGFyYW0gZCBWYWx1ZSB0byBiZSBhZGRlZCB0byB0aGUgc2VsZWN0ZWQgaW5kZXgsIGkuZS4gLTEgdG8gbW92ZSBiYWNrd2FyZHMsICsxIHRvIG1vdmUgZm9yd2FyZHMuXHJcbiAgICAgKi9cclxuICAgIG1vdmVTZWxlY3Rpb24oZDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkU2VsZWN0SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggKz0gZDtcclxuXHJcbiAgICAgICAgICAgIC8vIERvIHdyYXBwaW5nIG9mIHNlbGVjdGlvbiB3aGVuIG91dCBvZiBib3VuZHNcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMudGFncy5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3RlZEluZGV4ID4gdGhpcy50YWdzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSB2YWx1ZSB0byBkaXNwbGF5IGZvciB0aGUgZ2l2ZW4gdGFnLiBVc2VzIGRpc3BsYXkgZnVuY3Rpb24vcHJvcGVydHkgbmFtZSBpZiBzZXQsIG90aGVyd2lzZSBhc3N1bWVzIHRoYXQgdGhlIHRhZyBpcyBhIHNpbXBsZSBzdHJpbmcuXHJcbiAgICAgKi9cclxuICAgIGdldFRhZ0Rpc3BsYXkodGFnOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kaXNwbGF5ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkodGFnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YWdbPHN0cmluZz50aGlzLmRpc3BsYXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBpbmRleCBpcyBzZWxlY3RlZCAodGFnIGluZGV4IG9yIGlucHV0IGZpZWxkKS5cclxuICAgICAqL1xyXG4gICAgaXNTZWxlY3RlZChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGluZGV4ID09PSB0aGlzLnNlbGVjdGVkSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3QgdGhlIHRhZyBhdCB0aGUgZ2l2ZW4gaW5kZXguIERvZXMgbm90aGluZyBpZiBkaXNhYmxlZCBpcyB0cnVlLlxyXG4gICAgICovXHJcbiAgICBzZWxlY3RUYWdBdCh0YWdJbmRleDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkVGFnSW5kZXgodGFnSW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRhZ0luZGV4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdCB0aGUgaW5wdXQgZmllbGQsIGdpdmluZyBpdCBmb2N1cy4gRG9lcyBub3RoaW5nIGlmIGRpc2FibGVkIGlzIHRydWUuXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdElucHV0KCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy50YWdzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSB0aGUgdGFnIGF0IHRoZSBnaXZlbiBpbmRleC4gRG9lcyBub3RoaW5nIGlmIGRpc2FibGVkIGlzIHRydWUgb3IgdGhlIG1pblRhZ3MgcHJvcGVydHkgcHJldmVudHMgcmVtb3ZhbC5cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlVGFnQXQodGFnSW5kZXg6IG51bWJlcikge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAhdGhpcy5jYW5SZW1vdmVUYWdBdCh0YWdJbmRleCkpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHRoYXQgdGhlIHRhZ0luZGV4IGlzIGluIHJhbmdlXHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFRhZ0luZGV4KHRhZ0luZGV4KSkge1xyXG4gICAgICAgICAgICBjb25zdCB0YWcgPSB0aGlzLnRhZ3NbdGFnSW5kZXhdO1xyXG4gICAgICAgICAgICBjb25zdCB0YWdSZW1vdmluZ0V2ZW50ID0gbmV3IFRhZ0lucHV0RXZlbnQodGFnKTtcclxuICAgICAgICAgICAgdGhpcy50YWdSZW1vdmluZy5lbWl0KHRhZ1JlbW92aW5nRXZlbnQpO1xyXG4gICAgICAgICAgICBpZiAoIXRhZ1JlbW92aW5nRXZlbnQuZGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTZWxlY3QgaW5wdXQgZmlyc3QgdG8gYXZvaWQgaXNzdWVzIHdpdGggZHJvcHBpbmcgZm9jdXNcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SW5wdXQoKTtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgdGFnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ3Muc3BsaWNlKHRhZ0luZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIC8vIFNldCBmb2N1cyBhZ2FpbiBzaW5jZSBpbmRpY2VzIGhhdmUgY2hhbmdlZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJbnB1dCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdSZW1vdmVkLmVtaXQobmV3IFRhZ0lucHV0RXZlbnQodGFnKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyBhdCB0aGUgZ2l2ZW4gaW5kZXggY2FuIGJlIHJlbW92ZWQuXHJcbiAgICAgKi9cclxuICAgIGNhblJlbW92ZVRhZ0F0KHRhZ0luZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YWdzLmxlbmd0aCA+IHRoaXMubWluVGFncyB8fCAhdGhpcy5lbmZvcmNlVGFnTGltaXRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbnB1dCBmaWVsZCBzaG91bGQgYmUgYXZhaWxhYmxlLlxyXG4gICAgICovXHJcbiAgICBpc0lucHV0VmlzaWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YWdzLmxlbmd0aCA8IHRoaXMubWF4VGFncyB8fCAhdGhpcy5lbmZvcmNlVGFnTGltaXRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGFueSBwYXJ0IG9mIHRoZSBjb250cm9sIGhhcyBmb2N1cy5cclxuICAgICAqL1xyXG4gICAgaGFzRm9jdXMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZFNlbGVjdEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25uZWN0VHlwZWFoZWFkKHR5cGVhaGVhZDogVHlwZWFoZWFkQ29tcG9uZW50KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3R5cGVhaGVhZFN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLl90eXBlYWhlYWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fdHlwZWFoZWFkU3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudHlwZWFoZWFkID0gdHlwZWFoZWFkO1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGVhaGVhZCkge1xyXG4gICAgICAgICAgICAvLyBTZXQgdXAgZXZlbnQgaGFuZGxlciBmb3Igc2VsZWN0ZWQgb3B0aW9uc1xyXG4gICAgICAgICAgICB0aGlzLl90eXBlYWhlYWRTdWJzY3JpcHRpb24gPSB0aGlzLnR5cGVhaGVhZC5vcHRpb25TZWxlY3RlZC5zdWJzY3JpYmUodGhpcy50eXBlYWhlYWRPcHRpb25TZWxlY3RlZEhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgdXAgZXZlbnQgaGFuZGxlciBmb3IgdGhlIGhpZ2hsaWdodGVkIGVsZW1lbnRcclxuICAgICAgICAgICAgLy8gQWRkZWQgYSBkZWxheSB0byBtb3ZlIGl0IG91dCBvZiB0aGUgY3VycmVudCBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnRyYWNrQXJpYURlc2NlbmRhbnQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3R5cGVhaGVhZFN1YnNjcmlwdGlvbi5hZGQoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlYWhlYWQuaGlnaGxpZ2h0ZWRFbGVtZW50Q2hhbmdlLnN1YnNjcmliZSgoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZEVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmFsaWRhdGUgdGhlIGdpdmVuIHRhZ1ZhbHVlIHdpdGggdGhlIHRhZ1BhdHRlcm4sIGlmIHNldC4gVXBkYXRlIHZhbGlkYXRpb25FcnJvcnMgb24gdmFsaWRhdGlvbiBmYWlsdXJlLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlVGFnKHRhZ1ZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgaW5wdXRQYXR0ZXJuID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlucHV0VmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnRhZ1BhdHRlcm4gJiYgIXRoaXMudGFnUGF0dGVybi50ZXN0KHRhZ1ZhbHVlKSkge1xyXG4gICAgICAgICAgICBpbnB1dFBhdHRlcm4gPSB7XHJcbiAgICAgICAgICAgICAgICBnaXZlbjogdGFnVmFsdWUsXHJcbiAgICAgICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLnRhZ1BhdHRlcm5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dFZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yc1snaW5wdXRQYXR0ZXJuJ10gPSBpbnB1dFBhdHRlcm47XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRWYWxpZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIHRhZyBvYmplY3QgZm9yIHRoZSBnaXZlbiB0YWdWYWx1ZS4gSWYgY3JlYXRlVGFnSGFuZGxlciBpcyBzcGVjaWZpZWQsIHVzZSBpdDsgb3RoZXJ3aXNlIGlmIGRpc3BsYXlQcm9wZXJ0eSBpcyBzcGVjaWZpZWQsIGNyZWF0ZSBhbiBvYmplY3Qgd2l0aCB0aGUgdGFnVmFsdWUgYXMgdGhlIHNpbmdsZSBuYW1lZCBwcm9wZXJ0eTsgb3RoZXJ3aXNlIHJldHVybiB0aGUgdGFnVmFsdWUgaXRzZWxmLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVRhZyh0YWdWYWx1ZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBsZXQgdGFnID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5jcmVhdGVUYWdIYW5kbGVyICYmIHR5cGVvZiB0aGlzLmNyZWF0ZVRhZ0hhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGFnID0gdGhpcy5jcmVhdGVUYWdIYW5kbGVyKHRhZ1ZhbHVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRhZyA9IHt9O1xyXG4gICAgICAgICAgICB0YWdbPHN0cmluZz50aGlzLmRpc3BsYXldID0gdGFnVmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGFnID0gdGFnVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0YWc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYSB0YWcgb2JqZWN0LCBjYWxsaW5nIHRoZSB0YWdBZGRpbmcgYW5kIHRhZ0FkZGVkIGV2ZW50cy4gUmV0dXJucyB0cnVlIGlmIHRoZSB0YWcgd2FzIGFkZGVkIHRvIHRoZSB0YWdzIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFRhZyh0YWc6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0YWcpIHtcclxuICAgICAgICAgICAgLy8gVmVyaWZ5IHRoYXQgdGhlIG5ldyB0YWcgY2FuIGJlIGRpc3BsYXllZFxyXG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5VmFsdWUgPSB0aGlzLmdldFRhZ0Rpc3BsYXkodGFnKTtcclxuICAgICAgICAgICAgaWYgKGRpc3BsYXlWYWx1ZSAmJiB0eXBlb2YgZGlzcGxheVZhbHVlID09PSAnc3RyaW5nJyAmJiBkaXNwbGF5VmFsdWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFnQWRkaW5nRXZlbnQgPSBuZXcgVGFnSW5wdXRFdmVudCh0YWcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdBZGRpbmcuZW1pdCh0YWdBZGRpbmdFdmVudCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRhZ0FkZGluZ0V2ZW50LmRlZmF1bHRQcmV2ZW50ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFncyA9IHRoaXMudGFncyB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ3MucHVzaCh0YWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFnQWRkZWQuZW1pdChuZXcgVGFnSW5wdXRFdmVudCh0YWcpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gdGFnSW5kZXggaXMgYSB2YWxpZCB0YWcgaW5kZXguXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNWYWxpZFRhZ0luZGV4KHRhZ0luZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGFnSW5kZXggPj0gMCAmJiB0YWdJbmRleCA8IHRoaXMudGFncy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIGluZGV4IGlzIGEgdmFsaWQgc2VsZWN0aW9uIGluZGV4ICh0YWdzIG9yIGlucHV0IGZpZWxkKS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc1ZhbGlkU2VsZWN0SW5kZXgoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBpbmRleCA+PSAwICYmIGluZGV4IDw9IHRoaXMudGFncy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjaGFyYWN0ZXIgY29ycmVzcG9uZGluZyB0byB0aGUgZ2l2ZW4ga2V5IGV2ZW50LCBtYWlubHkgZm9yIElFIGNvbXBhdGliaWxpdHkuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0S2V5Q2hhcihldmVudDogS2V5Ym9hcmRFdmVudCk6IHN0cmluZyB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcclxuICAgICAgICAgICAgY2FzZSAnU3BhY2ViYXInOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcgJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LmtleTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2Ygc3RyaW5ncyBjb3JyZXNwb25kaW5nIHRvIHRoZSBpbnB1dCBzdHJpbmcgc3BsaXQgYnkgdGhlIHRhZ0RlbGltaXRlcnMgY2hhcmFjdGVycy5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzcGxpdFRhZ0lucHV0KGlucHV0OiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgbGV0IHRhZ1ZhbHVlcyA9IFtpbnB1dF07XHJcbiAgICAgICAgaWYgKHRoaXMudGFnRGVsaW1pdGVycyAmJiB0eXBlb2YgdGhpcy50YWdEZWxpbWl0ZXJzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBjb25zdCBlc2NhcGVkRGVsaW1pdGVycyA9IHRoaXMudGFnRGVsaW1pdGVycy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcclxuICAgICAgICAgICAgY29uc3QgZGVsaW1pdGVyUmVnZXggPSBuZXcgUmVnRXhwKGBbJHtlc2NhcGVkRGVsaW1pdGVyc31dYCwgJ2cnKTtcclxuICAgICAgICAgICAgdGFnVmFsdWVzID0gaW5wdXQuc3BsaXQoZGVsaW1pdGVyUmVnZXgpLmZpbHRlcigocykgPT4gcy5sZW5ndGggPiAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhZ1ZhbHVlcztcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBBUEkgYXZhaWxhYmxlIHRvIHRhZyB0ZW1wbGF0ZXMuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRhZ0FwaSB7XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIHRhZywgYWNjb3JkaW5nIHRvIHRoZSBkaXNwbGF5UHJvcGVydHkgcHJvcGVydHkuXHJcbiAgICAgKi9cclxuICAgIGdldFRhZ0Rpc3BsYXk6ICh0YWc6IGFueSkgPT4gc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgdGFnIGF0IHRoZSBnaXZlbiBpbmRleCwgaWYgcG9zc2libGUuXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVRhZ0F0OiAoaW5kZXg6IG51bWJlcikgPT4gdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFx0UmV0dXJucyB0cnVlIGlmIHRoZSB0YWcgYXQgdGhlIGdpdmVuIGluZGV4IGNhbiBiZSByZW1vdmVkLlxyXG4gICAgICovXHJcbiAgICBjYW5SZW1vdmVUYWdBdDogKGluZGV4OiBudW1iZXIpID0+IGJvb2xlYW47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgZnVuY3Rpb24gdXNlZCB0byByZXR1cm4gY3VzdG9tIGNsYXNzIGluZm9ybWF0aW9uLCBmb3IgdXNlIGluIGBuZ0NsYXNzYC5cclxuICovXHJcbmV4cG9ydCB0eXBlIFRhZ0NsYXNzRnVuY3Rpb24gPSAodGFnOiBhbnksIGluZGV4OiBudW1iZXIsIHNlbGVjdGVkOiBib29sZWFuKSA9PiAoc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPik7Il19