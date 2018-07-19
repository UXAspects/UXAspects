/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Component, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Inject, Input, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { delay } from 'rxjs/operators/delay';
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
var TagInputComponent = (function () {
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
            this._typeaheadSubscription.add(this.typeahead.highlightedElementChange.pipe(delay(0)).subscribe(function (element) {
                _this.highlightedElement = element;
            }));
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
                },] },
    ];
    /** @nocollapse */
    TagInputComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
        { type: TypeaheadKeyService, },
    ]; };
    TagInputComponent.propDecorators = {
        "id": [{ type: Input }, { type: HostBinding, args: ['attr.id',] },],
        "tags": [{ type: Input, args: ['tags',] },],
        "tagsChange": [{ type: Output },],
        "input": [{ type: Input, args: ['input',] },],
        "inputChange": [{ type: Output },],
        "display": [{ type: Input },],
        "addOnPaste": [{ type: Input },],
        "disabled": [{ type: Input },],
        "enforceTagLimits": [{ type: Input },],
        "freeInput": [{ type: Input },],
        "maxTags": [{ type: Input },],
        "minTags": [{ type: Input },],
        "placeholder": [{ type: Input },],
        "showTypeaheadOnClick": [{ type: Input },],
        "tagDelimiters": [{ type: Input },],
        "tagPattern": [{ type: Input },],
        "tagTemplate": [{ type: Input },],
        "tagClass": [{ type: Input },],
        "validationErrors": [{ type: Input },],
        "createTagHandler": [{ type: Input, args: ['createTag',] },],
        "tagAdding": [{ type: Output },],
        "tagAdded": [{ type: Output },],
        "tagInvalidated": [{ type: Output },],
        "tagRemoving": [{ type: Output },],
        "tagRemoved": [{ type: Output },],
        "tagClick": [{ type: Output },],
        "typeaheadQuery": [{ type: ContentChildren, args: [TypeaheadComponent,] },],
        "tagInput": [{ type: ViewChild, args: ['tagInput',] },],
        "_defaultTagTemplate": [{ type: ViewChild, args: ['defaultTagTemplate',] },],
        "keyHandler": [{ type: HostListener, args: ['keydown', ['$event'],] },],
        "focusOutHandler": [{ type: HostListener, args: ['focusout', ['$event'],] },],
    };
    return TagInputComponent;
}());
export { TagInputComponent };
function TagInputComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TagInputComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TagInputComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    TagInputComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhZy1pbnB1dC90YWctaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFvQixTQUFTLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFFLFNBQVMsRUFBaUIsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyUCxPQUFPLEVBQXdCLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsS0FBSyxFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFFN0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFN0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWxELHFCQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFFakIscUJBQU0sdUJBQXVCLEdBQUc7SUFDNUIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxpQkFBaUIsRUFBakIsQ0FBaUIsQ0FBQztJQUNoRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFDRixxQkFBTSxrQkFBa0IsR0FBRztJQUN2QixPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxpQkFBaUIsRUFBakIsQ0FBaUIsQ0FBQztJQUNoRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7O0lBdUlFLDJCQUNZLFVB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OlsiaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5qZWN0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QsIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTElEQVRPUlMsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyBET0NVTUVOVCB9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xyXG5pbXBvcnQgeyBkZWxheSB9IGZyb20gJ3J4anMvb3BlcmF0b3JzL2RlbGF5JztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRDb21wb25lbnQsIFR5cGVhaGVhZEtleVNlcnZpY2UgfSBmcm9tICcuLi90eXBlYWhlYWQvaW5kZXgnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRPcHRpb25FdmVudCB9IGZyb20gJy4uL3R5cGVhaGVhZC90eXBlYWhlYWQtZXZlbnQnO1xyXG5pbXBvcnQgeyBUYWdJbnB1dEV2ZW50IH0gZnJvbSAnLi90YWctaW5wdXQtZXZlbnQnO1xyXG5cclxubGV0IHVuaXF1ZUlkID0gMDtcclxuXHJcbmNvbnN0IFRBR0lOUFVUX1ZBTFVFX0FDQ0VTU09SID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUYWdJbnB1dENvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5jb25zdCBUQUdJTlBVVF9WQUxJREFUT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGFnSW5wdXRDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd1eC10YWctaW5wdXQnLFxyXG4gICAgdGVtcGxhdGU6IGA8b2wgW2F0dHIucm9sZV09XCJ0eXBlYWhlYWQgPyAnY29tYm9ib3gnIDogJ25vbmUnXCIgW2F0dHIuYXJpYS1oYXNwb3B1cF09XCJ0eXBlYWhlYWQgPyAnbGlzdGJveCcgOiBudWxsXCI+XG4gICAgPGxpICpuZ0Zvcj1cImxldCB0YWcgb2YgdGFnczsgbGV0IGkgPSBpbmRleFwiIGNsYXNzPVwidXgtdGFnXCJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgW25nQ2xhc3NdPVwidGFnQ2xhc3ModGFnLCBpLCBpc1NlbGVjdGVkKGkpKVwiXG4gICAgICAgIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gbnVsbCA6IDBcIlxuICAgICAgICBbZm9jdXNJZl09XCJpc1NlbGVjdGVkKGkpXCJcbiAgICAgICAgKGNsaWNrKT1cInRhZ0NsaWNrSGFuZGxlcigkZXZlbnQsIHRhZywgaSlcIlxuICAgICAgICAoZm9jdXMpPVwic2VsZWN0VGFnQXQoaSlcIj5cblxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhZ1RlbXBsYXRlXCJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7dGFnOiB0YWcsIGluZGV4OiBpLCBkaXNhYmxlZDogZGlzYWJsZWQsIGFwaTogdGFnQXBpfVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDwvbGk+XG4gICAgPGxpICpuZ0lmPVwiaXNJbnB1dFZpc2libGUoKVwiIGNsYXNzPVwidXgtdGFnLWlucHV0XCIgcm9sZT1cIm5vbmVcIj5cbiAgICAgICAgPGlucHV0ICN0YWdJbnB1dCB0eXBlPVwidGV4dFwiIFthdHRyLmlkXT1cImlkXCIgY2xhc3M9XCJ1eC10YWctaW5wdXRcIlxuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJpbnB1dFwiXG4gICAgICAgICAgICBbY2xhc3MuaW52YWxpZF09XCIhaW5wdXRWYWxpZFwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdPVwiaGlnaGxpZ2h0ZWRFbGVtZW50Py5pZFwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWF1dG9jb21wbGV0ZV09XCJ0eXBlYWhlYWQgPyAnbGlzdCcgOiAnbm9uZSdcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJ0eXBlYWhlYWQ/LmlkXCJcbiAgICAgICAgICAgIGFyaWEtbXVsdGlsaW5lPVwiZmFsc2VcIlxuICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImRpc2FibGVkID8gJycgOiAocGxhY2Vob2xkZXIgfHwgJycpXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbZm9jdXNJZl09XCJpc1NlbGVjdGVkKHRhZ3MubGVuZ3RoKVwiXG4gICAgICAgICAgICAoY2xpY2spPVwiaW5wdXRDbGlja0hhbmRsZXIoKVwiXG4gICAgICAgICAgICAoZm9jdXMpPVwiaW5wdXRGb2N1c0hhbmRsZXIoKVwiXG4gICAgICAgICAgICAocGFzdGUpPVwiaW5wdXRQYXN0ZUhhbmRsZXIoJGV2ZW50KVwiPlxuICAgIDwvbGk+XG48L29sPlxuXG48bmctY29udGVudCAjdHlwZWFoZWFkPjwvbmctY29udGVudD5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0VGFnVGVtcGxhdGUgbGV0LXRhZz1cInRhZ1wiIGxldC1pbmRleD1cImluZGV4XCIgbGV0LWRpc2FibGVkPVwiZGlzYWJsZWRcIiBsZXQtYXBpPVwiYXBpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJ1eC10YWctdGV4dFwiPnt7YXBpLmdldFRhZ0Rpc3BsYXkodGFnKX19PC9zcGFuPlxuICAgIDxidXR0b24gKm5nSWY9XCJhcGkuY2FuUmVtb3ZlVGFnQXQoaW5kZXgpXCJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzPVwidXgtdGFnLXJlbW92ZVwiXG4gICAgICAgIGFyaWEtbGFiZWw9XCJSZW1vdmUgSXRlbVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgIChjbGljayk9XCJhcGkucmVtb3ZlVGFnQXQoaW5kZXgpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaHBlLWljb24gaHBlLWNsb3NlXCI+PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuPC9uZy10ZW1wbGF0ZT5gLFxyXG4gICAgcHJvdmlkZXJzOiBbVEFHSU5QVVRfVkFMVUVfQUNDRVNTT1IsIFRBR0lOUFVUX1ZBTElEQVRPUl0sXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxyXG4gICAgICAgICdbY2xhc3MuZm9jdXNdJzogJ2hhc0ZvY3VzKCknLFxyXG4gICAgICAgICdbY2xhc3MuaW52YWxpZF0nOiAnIXZhbGlkIHx8ICFpbnB1dFZhbGlkJ1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFnSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJykgaWQ6IHN0cmluZyA9IGB1eC10YWctaW5wdXQtJHsrK3VuaXF1ZUlkfWA7XHJcblxyXG4gICAgQElucHV0KCd0YWdzJylcclxuICAgIGdldCB0YWdzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fdGFncykge1xyXG4gICAgICAgICAgICB0aGlzLl90YWdzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90YWdzO1xyXG4gICAgfVxyXG4gICAgc2V0IHRhZ3ModmFsdWU6IGFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5fdGFncyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlSGFuZGxlcih0aGlzLl90YWdzKTtcclxuICAgICAgICB0aGlzLnRhZ3NDaGFuZ2UuZW1pdCh0aGlzLl90YWdzKTtcclxuICAgIH1cclxuXHJcbiAgICBAT3V0cHV0KCkgdGFnc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XHJcblxyXG4gICAgQElucHV0KCdpbnB1dCcpXHJcbiAgICBnZXQgaW5wdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lucHV0O1xyXG4gICAgfVxyXG4gICAgc2V0IGlucHV0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9pbnB1dCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuaW5wdXRDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgQE91dHB1dCgpIGlucHV0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gICAgQElucHV0KCkgZGlzcGxheTogKG9wdGlvbjogYW55KSA9PiBzdHJpbmcgfCBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBhZGRPblBhc3RlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBlbmZvcmNlVGFnTGltaXRzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBmcmVlSW5wdXQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgbWF4VGFnczogbnVtYmVyID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgIEBJbnB1dCgpIG1pblRhZ3M6IG51bWJlciA9IDA7XHJcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XHJcbiAgICBASW5wdXQoKSBzaG93VHlwZWFoZWFkT25DbGljazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgdGFnRGVsaW1pdGVyczogc3RyaW5nID0gJyc7XHJcbiAgICBASW5wdXQoKSB0YWdQYXR0ZXJuOiBSZWdFeHA7XHJcbiAgICBASW5wdXQoKSB0YWdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBJbnB1dCgpIHRhZ0NsYXNzOiBUYWdDbGFzc0Z1bmN0aW9uID0gKCkgPT4gdW5kZWZpbmVkO1xyXG4gICAgQElucHV0KCkgdmFsaWRhdGlvbkVycm9yczogYW55ID0ge307XHJcbiAgICBASW5wdXQoJ2NyZWF0ZVRhZycpIGNyZWF0ZVRhZ0hhbmRsZXI6ICh2YWx1ZTogc3RyaW5nKSA9PiBhbnk7XHJcblxyXG4gICAgQE91dHB1dCgpIHRhZ0FkZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnSW5wdXRFdmVudD4oKTtcclxuICAgIEBPdXRwdXQoKSB0YWdBZGRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnSW5wdXRFdmVudD4oKTtcclxuICAgIEBPdXRwdXQoKSB0YWdJbnZhbGlkYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnSW5wdXRFdmVudD4oKTtcclxuICAgIEBPdXRwdXQoKSB0YWdSZW1vdmluZyA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnSW5wdXRFdmVudD4oKTtcclxuICAgIEBPdXRwdXQoKSB0YWdSZW1vdmVkID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ0NsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGRyZW4oVHlwZWFoZWFkQ29tcG9uZW50KSB0eXBlYWhlYWRRdWVyeTogUXVlcnlMaXN0PFR5cGVhaGVhZENvbXBvbmVudD47XHJcblxyXG4gICAgQFZpZXdDaGlsZCgndGFnSW5wdXQnKSB0YWdJbnB1dDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdkZWZhdWx0VGFnVGVtcGxhdGUnKSBwcml2YXRlIF9kZWZhdWx0VGFnVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgc2VsZWN0ZWRJbmRleDogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgdGFnQXBpOiBUYWdBcGkgPSB7XHJcbiAgICAgICAgZ2V0VGFnRGlzcGxheTogdGhpcy5nZXRUYWdEaXNwbGF5LmJpbmQodGhpcyksXHJcbiAgICAgICAgcmVtb3ZlVGFnQXQ6IHRoaXMucmVtb3ZlVGFnQXQuYmluZCh0aGlzKSxcclxuICAgICAgICBjYW5SZW1vdmVUYWdBdDogdGhpcy5jYW5SZW1vdmVUYWdBdC5iaW5kKHRoaXMpXHJcbiAgICB9O1xyXG5cclxuICAgIHZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGlucHV0VmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIHR5cGVhaGVhZDogVHlwZWFoZWFkQ29tcG9uZW50O1xyXG5cclxuICAgIGhpZ2hsaWdodGVkRWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5wdXQ6IHN0cmluZyA9ICcnO1xyXG4gICAgcHJpdmF0ZSBfdGFnczogYW55W10gPSBbXTtcclxuICAgIHByaXZhdGUgX29uQ2hhbmdlSGFuZGxlcjogKF86IGFueSkgPT4gdm9pZCA9ICgpID0+IHsgfTtcclxuICAgIHByaXZhdGUgX29uVG91Y2hlZEhhbmRsZXI6ICgpID0+IHZvaWQgPSAoKSA9PiB7IH07XHJcbiAgICBwcml2YXRlIF90eXBlYWhlYWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBfdHlwZWFoZWFkS2V5U2VydmljZTogVHlwZWFoZWFkS2V5U2VydmljZSkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhZ1RlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFnVGVtcGxhdGUgPSB0aGlzLl9kZWZhdWx0VGFnVGVtcGxhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgICAgICAvLyBXYXRjaCBmb3Igb3B0aW9uYWwgY2hpbGQgdHlwZWFoZWFkIGNvbnRyb2xcclxuICAgICAgICB0aGlzLmNvbm5lY3RUeXBlYWhlYWQodGhpcy50eXBlYWhlYWRRdWVyeS5maXJzdCk7XHJcbiAgICAgICAgdGhpcy50eXBlYWhlYWRRdWVyeS5jaGFuZ2VzLnN1YnNjcmliZSgocXVlcnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0VHlwZWFoZWFkKHF1ZXJ5LmZpcnN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgaWYgKGNoYW5nZXMuZGlzYWJsZWQuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDbGVhciBzZWxlY3Rpb24gYW5kIGNsb3NlIGRyb3Bkb3duXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGVhaGVhZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkLm9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHZhbGlkYXRpb24gc3RhdHVzXHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueVtdKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFncyA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9vbkNoYW5nZUhhbmRsZXIgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fb25Ub3VjaGVkSGFuZGxlciA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl90eXBlYWhlYWRTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5fdHlwZWFoZWFkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmFsaWRhdGUgdGhlIHZhbHVlIG9mIHRoZSBjb250cm9sICh0YWdzIHByb3BlcnR5KS5cclxuICAgICAqL1xyXG4gICAgdmFsaWRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy52YWxpZCA9IHRydWU7XHJcbiAgICAgICAgbGV0IHRhZ1JhbmdlRXJyb3IgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLnRhZ3MgJiYgKHRoaXMudGFncy5sZW5ndGggPCB0aGlzLm1pblRhZ3MgfHwgdGhpcy50YWdzLmxlbmd0aCA+IHRoaXMubWF4VGFncykpIHtcclxuICAgICAgICAgICAgdGFnUmFuZ2VFcnJvciA9IHtcclxuICAgICAgICAgICAgICAgIGdpdmVuOiB0aGlzLnRhZ3MubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pblRhZ3MsXHJcbiAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4VGFnc1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yc1sndGFnUmFuZ2VFcnJvciddID0gdGFnUmFuZ2VFcnJvcjtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcclxuICAgIGtleUhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgaW5wdXQgZmllbGQgY3Vyc29yIGxvY2F0aW9uXHJcbiAgICAgICAgY29uc3QgaW5wdXRDdXJzb3JQb3MgPSB0aGlzLnRhZ0lucHV0Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSBpZiB0aGUgaW5wdXQgZmllbGQgaGFzIGFueSB0ZXh0IHNlbGVjdGVkXHJcbiAgICAgICAgY29uc3QgaGFzU2VsZWN0aW9uID0gdGhpcy50YWdJbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ICE9PSB0aGlzLnRhZ0lucHV0Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kO1xyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgaWYgYSB0YWcgaGFzIGZvY3VzXHJcbiAgICAgICAgY29uc3QgdGFnU2VsZWN0ZWQgPSB0aGlzLmlzVmFsaWRUYWdJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXgpO1xyXG5cclxuICAgICAgICBjb25zdCBpbnB1dExlbmd0aCA9IHRoaXMuaW5wdXQgPyB0aGlzLmlucHV0Lmxlbmd0aCA6IDA7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIGFycm93IGtleXMgY2FuIG1vdmUgdGhlIHNlbGVjdGlvbi4gT3RoZXJ3aXNlIHRoZSBpbnB1dCBmaWVsZCB0YWtlcyB0aGUgZXZlbnQuXHJcbiAgICAgICAgY29uc3QgY2FuTmF2aWdhdGVMZWZ0ID0gdGFnU2VsZWN0ZWQgfHwgKGlucHV0Q3Vyc29yUG9zIDw9IDAgJiYgIWhhc1NlbGVjdGlvbik7XHJcbiAgICAgICAgY29uc3QgY2FuTmF2aWdhdGVSaWdodCA9IHRhZ1NlbGVjdGVkIHx8IChpbnB1dEN1cnNvclBvcyA+PSBpbnB1dExlbmd0aCAmJiAhaGFzU2VsZWN0aW9uKTtcclxuXHJcbiAgICAgICAgLy8gRm9yd2FyZCBrZXkgZXZlbnRzIHRvIHRoZSB0eXBlYWhlYWQgY29tcG9uZW50LlxyXG4gICAgICAgIHRoaXMuX3R5cGVhaGVhZEtleVNlcnZpY2UuaGFuZGxlS2V5KGV2ZW50LCB0aGlzLnR5cGVhaGVhZCk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGEgdHlwZWFoZWFkIG9wdGlvbiBpcyBoaWdobGlnaHRlZFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkICYmIHRoaXMudHlwZWFoZWFkLm9wZW4gJiYgdGhpcy50eXBlYWhlYWQuaGlnaGxpZ2h0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHR5cGVhaGVhZCBvcHRpb24gYXMgYSB0YWcsIGNsZWFyIHRoZSBpbnB1dCwgYW5kIGNsb3NlIHRoZSBkcm9wZG93blxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbWl0VHlwZWFoZWFkKHRoaXMudHlwZWFoZWFkLmhpZ2hsaWdodGVkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cGVhaGVhZC5vcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZhbGlkYXRlIGFuZCBhZGQgdGhlIGlucHV0IHRleHQgYXMgYSB0YWcsIGlmIHBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21taXRJbnB1dCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdCYWNrc3BhY2UnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbk5hdmlnYXRlTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFja3NwYWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdEZWxldGUnOlxyXG4gICAgICAgICAgICBjYXNlICdEZWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRhZ1NlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUYWdBdCh0aGlzLnNlbGVjdGVkSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ0xlZnQnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbk5hdmlnYXRlTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVNlbGVjdGlvbigtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcclxuICAgICAgICAgICAgY2FzZSAnUmlnaHQnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbk5hdmlnYXRlUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVTZWxlY3Rpb24oMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGtleXMgaW4gdGhlIHRhZ0RlbGltaXRlcnNcclxuICAgICAgICBpZiAodGhpcy50YWdEZWxpbWl0ZXJzICYmIHRoaXMudGFnRGVsaW1pdGVycy5pbmRleE9mKHRoaXMuZ2V0S2V5Q2hhcihldmVudCkpID49IDApIHtcclxuICAgICAgICAgICAgLy8gQ29tbWl0IHByZXZpb3VzIHRleHRcclxuICAgICAgICAgICAgdGhpcy5jb21taXRJbnB1dCgpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXNvdXQnLCBbJyRldmVudCddKVxyXG4gICAgZm9jdXNPdXRIYW5kbGVyKGV2ZW50OiBGb2N1c0V2ZW50KSB7XHJcblxyXG4gICAgICAgIC8vIElmIGEgY2xpY2sgb24gdGhlIHR5cGVhaGVhZCBpcyBpbiBwcm9ncmVzcywgZG9uJ3QgZG8gYW55dGhpbmcuXHJcbiAgICAgICAgLy8gVGhpcyB3b3JrcyBhcm91bmQgYW4gaXNzdWUgaW4gSUUgd2hlcmUgY2xpY2tpbmcgYSBzY3JvbGxiYXIgZHJvcHMgZm9jdXMuXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkICYmIHRoaXMudHlwZWFoZWFkLmNsaWNraW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENsb3NlIHRoZSBkcm9wZG93biBvbiBibHVyXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGVhaGVhZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkLm9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDIwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGFnQ2xpY2tIYW5kbGVyKGV2ZW50OiBNb3VzZUV2ZW50LCB0YWc6IGFueSwgaW5kZXg6IG51bWJlcikge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgLy8gU2VuZCB0YWdDbGljayBldmVudFxyXG4gICAgICAgIGNvbnN0IHRhZ0NsaWNrRXZlbnQgPSBuZXcgVGFnSW5wdXRFdmVudCh0YWcpO1xyXG4gICAgICAgIHRoaXMudGFnQ2xpY2suZW1pdCh0YWdDbGlja0V2ZW50KTtcclxuXHJcbiAgICAgICAgLy8gUHJldmVudCBmb2N1cyBpZiBwcmV2ZW50RGVmYXVsdCgpIHdhcyBjYWxsZWRcclxuICAgICAgICBpZiAodGFnQ2xpY2tFdmVudC5kZWZhdWx0UHJldmVudGVkKCkpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2VsZWN0IHRoZSB0YWcgKGZvciBJRSB0aGF0IGRvZXNuJ3QgcHJvcGFnYXRlIGZvY3VzKVxyXG4gICAgICAgIHRoaXMuc2VsZWN0VGFnQXQoaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0Q2xpY2tIYW5kbGVyKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkICYmIHRoaXMuc2hvd1R5cGVhaGVhZE9uQ2xpY2spIHtcclxuICAgICAgICAgICAgdGhpcy50eXBlYWhlYWQub3BlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlucHV0Rm9jdXNIYW5kbGVyKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RJbnB1dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0UGFzdGVIYW5kbGVyKGV2ZW50OiBDbGlwYm9hcmRFdmVudCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYWRkT25QYXN0ZSkge1xyXG4gICAgICAgICAgICAvLyBHZXQgdGV4dCBmcm9tIHRoZSBjbGlwYm9hcmRcclxuICAgICAgICAgICAgbGV0IGlucHV0OiBzdHJpbmcgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuY2xpcGJvYXJkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSBldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQvcGxhaW4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgoPGFueT53aW5kb3cpLmNsaXBib2FyZERhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vIEludGVybmV0IEV4cGxvcmVyIG9ubHlcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gKDxhbnk+d2luZG93KS5jbGlwYm9hcmREYXRhLmdldERhdGEoJ1RleHQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ29tbWl0IHRoZSBjbGlwYm9hcmQgdGV4dCBkaXJlY3RseVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb21taXQoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdElucHV0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdHlwZWFoZWFkT3B0aW9uU2VsZWN0ZWRIYW5kbGVyKGV2ZW50OiBUeXBlYWhlYWRPcHRpb25FdmVudCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgLy8gV2hlbiB0aGUgdHlwZWFoZWFkIHNlbmRzIHRoZSBvcHRpb25TZWxlY3RlZCBldmVudCwgY29tbWl0IHRoZSBvYmplY3QgZGlyZWN0bHlcclxuICAgICAgICB0aGlzLmNvbW1pdFR5cGVhaGVhZChldmVudC5vcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tbWl0IHRoZSBjdXJyZW50IGlucHV0IHZhbHVlIGFuZCBjbGVhciB0aGUgaW5wdXQgZmllbGQgaWYgc3VjY2Vzc2Z1bC5cclxuICAgICAqL1xyXG4gICAgY29tbWl0SW5wdXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tbWl0KHRoaXMuaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SW5wdXQoKTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dCA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbW1pdCB0aGUgZ2l2ZW4gdGFnIG9iamVjdCBhbmQgY2xlYXIgdGhlIGlucHV0IGlmIHN1Y2Nlc3NmdWwuXHJcbiAgICAgKi9cclxuICAgIGNvbW1pdFR5cGVhaGVhZCh0YWc6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLmFkZFRhZyh0YWcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SW5wdXQoKTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dCA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbW1pdCB0aGUgZ2l2ZW4gc3RyaW5nIHZhbHVlIGFzIG9uZSBvciBtb3JlIHRhZ3MsIGlmIHZhbGlkYXRpb24gcGFzc2VzLiBSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyhzKSB3ZXJlIGNyZWF0ZWQuXHJcbiAgICAgKi9cclxuICAgIGNvbW1pdChpbnB1dDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGlucHV0ICYmIHRoaXMuZnJlZUlucHV0KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBTcGxpdCB0aGUgdGFncyBieSB0aGUgdGFnRGVsaW1pdGVycyBpZiBjb25maWd1cmVkXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1RhZ3MgPSB0aGlzLnNwbGl0VGFnSW5wdXQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdGFnIHZhbGlkYXRpb24gZm9yIGFsbCBvZiB0aGUgaW5kaXZpZHVhbCB2YWx1ZXNcclxuICAgICAgICAgICAgbGV0IGFsbFZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbmV3VGFnIG9mIG5ld1RhZ3MpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gdGhpcy52YWxpZGF0ZVRhZyhuZXdUYWcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgdGFncyBpZiBhbGwgYXJlIHZhbGlkXHJcbiAgICAgICAgICAgIGlmIChhbGxWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbmV3VGFnIG9mIG5ld1RhZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFRhZyh0aGlzLmNyZWF0ZVRhZyhuZXdUYWcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgbm8gdGFnIGlzIHNlbGVjdGVkLCBzZWxlY3QgdGhlIHJpZ2h0bW9zdCB0YWcuIElmIGEgdGFnIGlzIHNlbGVjdGVkLCByZW1vdmUgaXQuXHJcbiAgICAgKi9cclxuICAgIGJhY2tzcGFjZSgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkVGFnSW5kZXgodGhpcy5zZWxlY3RlZEluZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRhZ0F0KHRoaXMudGFncy5sZW5ndGggLSAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRhZ0F0KHRoaXMuc2VsZWN0ZWRJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTW92ZSB0aGUgaGlnaGxpZ2h0ZWQgb3B0aW9uIGZvcndhcmRzIG9yIGJhY2t3YXJkcyBpbiB0aGUgbGlzdC4gV3JhcHMgYXQgdGhlIGxpbWl0cy5cclxuICAgICAqIEBwYXJhbSBkIFZhbHVlIHRvIGJlIGFkZGVkIHRvIHRoZSBzZWxlY3RlZCBpbmRleCwgaS5lLiAtMSB0byBtb3ZlIGJhY2t3YXJkcywgKzEgdG8gbW92ZSBmb3J3YXJkcy5cclxuICAgICAqL1xyXG4gICAgbW92ZVNlbGVjdGlvbihkOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWRTZWxlY3RJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCArPSBkO1xyXG5cclxuICAgICAgICAgICAgLy8gRG8gd3JhcHBpbmcgb2Ygc2VsZWN0aW9uIHdoZW4gb3V0IG9mIGJvdW5kc1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy50YWdzLmxlbmd0aDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggPiB0aGlzLnRhZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHZhbHVlIHRvIGRpc3BsYXkgZm9yIHRoZSBnaXZlbiB0YWcuIFVzZXMgZGlzcGxheSBmdW5jdGlvbi9wcm9wZXJ0eSBuYW1lIGlmIHNldCwgb3RoZXJ3aXNlIGFzc3VtZXMgdGhhdCB0aGUgdGFnIGlzIGEgc2ltcGxlIHN0cmluZy5cclxuICAgICAqL1xyXG4gICAgZ2V0VGFnRGlzcGxheSh0YWc6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheSh0YWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRhZ1s8c3RyaW5nPnRoaXMuZGlzcGxheV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0YWc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIGluZGV4IGlzIHNlbGVjdGVkICh0YWcgaW5kZXggb3IgaW5wdXQgZmllbGQpLlxyXG4gICAgICovXHJcbiAgICBpc1NlbGVjdGVkKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gaW5kZXggPT09IHRoaXMuc2VsZWN0ZWRJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdCB0aGUgdGFnIGF0IHRoZSBnaXZlbiBpbmRleC4gRG9lcyBub3RoaW5nIGlmIGRpc2FibGVkIGlzIHRydWUuXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdFRhZ0F0KHRhZ0luZGV4OiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWRUYWdJbmRleCh0YWdJbmRleCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGFnSW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0IHRoZSBpbnB1dCBmaWVsZCwgZ2l2aW5nIGl0IGZvY3VzLiBEb2VzIG5vdGhpbmcgaWYgZGlzYWJsZWQgaXMgdHJ1ZS5cclxuICAgICAqL1xyXG4gICAgc2VsZWN0SW5wdXQoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLnRhZ3MubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIHRoZSB0YWcgYXQgdGhlIGdpdmVuIGluZGV4LiBEb2VzIG5vdGhpbmcgaWYgZGlzYWJsZWQgaXMgdHJ1ZSBvciB0aGUgbWluVGFncyBwcm9wZXJ0eSBwcmV2ZW50cyByZW1vdmFsLlxyXG4gICAgICovXHJcbiAgICByZW1vdmVUYWdBdCh0YWdJbmRleDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICF0aGlzLmNhblJlbW92ZVRhZ0F0KHRhZ0luZGV4KSkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgdGhhdCB0aGUgdGFnSW5kZXggaXMgaW4gcmFuZ2VcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkVGFnSW5kZXgodGFnSW5kZXgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhZyA9IHRoaXMudGFnc1t0YWdJbmRleF07XHJcbiAgICAgICAgICAgIGNvbnN0IHRhZ1JlbW92aW5nRXZlbnQgPSBuZXcgVGFnSW5wdXRFdmVudCh0YWcpO1xyXG4gICAgICAgICAgICB0aGlzLnRhZ1JlbW92aW5nLmVtaXQodGFnUmVtb3ZpbmdFdmVudCk7XHJcbiAgICAgICAgICAgIGlmICghdGFnUmVtb3ZpbmdFdmVudC5kZWZhdWx0UHJldmVudGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIFNlbGVjdCBpbnB1dCBmaXJzdCB0byBhdm9pZCBpc3N1ZXMgd2l0aCBkcm9wcGluZyBmb2N1c1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJbnB1dCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSB0YWdcclxuICAgICAgICAgICAgICAgIHRoaXMudGFncy5zcGxpY2UodGFnSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGZvY3VzIGFnYWluIHNpbmNlIGluZGljZXMgaGF2ZSBjaGFuZ2VkXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdElucHV0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ1JlbW92ZWQuZW1pdChuZXcgVGFnSW5wdXRFdmVudCh0YWcpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFnIGF0IHRoZSBnaXZlbiBpbmRleCBjYW4gYmUgcmVtb3ZlZC5cclxuICAgICAqL1xyXG4gICAgY2FuUmVtb3ZlVGFnQXQodGFnSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhZ3MubGVuZ3RoID4gdGhpcy5taW5UYWdzIHx8ICF0aGlzLmVuZm9yY2VUYWdMaW1pdHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGlucHV0IGZpZWxkIHNob3VsZCBiZSBhdmFpbGFibGUuXHJcbiAgICAgKi9cclxuICAgIGlzSW5wdXRWaXNpYmxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhZ3MubGVuZ3RoIDwgdGhpcy5tYXhUYWdzIHx8ICF0aGlzLmVuZm9yY2VUYWdMaW1pdHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgYW55IHBhcnQgb2YgdGhlIGNvbnRyb2wgaGFzIGZvY3VzLlxyXG4gICAgICovXHJcbiAgICBoYXNGb2N1cygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkU2VsZWN0SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbm5lY3RUeXBlYWhlYWQodHlwZWFoZWFkOiBUeXBlYWhlYWRDb21wb25lbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5fdHlwZWFoZWFkU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3R5cGVhaGVhZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl90eXBlYWhlYWRTdWJzY3JpcHRpb24gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50eXBlYWhlYWQgPSB0eXBlYWhlYWQ7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkKSB7XHJcbiAgICAgICAgICAgIC8vIFNldCB1cCBldmVudCBoYW5kbGVyIGZvciBzZWxlY3RlZCBvcHRpb25zXHJcbiAgICAgICAgICAgIHRoaXMuX3R5cGVhaGVhZFN1YnNjcmlwdGlvbiA9IHRoaXMudHlwZWFoZWFkLm9wdGlvblNlbGVjdGVkLnN1YnNjcmliZSh0aGlzLnR5cGVhaGVhZE9wdGlvblNlbGVjdGVkSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCB1cCBldmVudCBoYW5kbGVyIGZvciB0aGUgaGlnaGxpZ2h0ZWQgZWxlbWVudFxyXG4gICAgICAgICAgICAvLyBBZGRlZCBhIGRlbGF5IHRvIG1vdmUgaXQgb3V0IG9mIHRoZSBjdXJyZW50IGNoYW5nZSBkZXRlY3Rpb24gY3ljbGVcclxuICAgICAgICAgICAgdGhpcy5fdHlwZWFoZWFkU3Vic2NyaXB0aW9uLmFkZChcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkLmhpZ2hsaWdodGVkRWxlbWVudENoYW5nZS5waXBlKGRlbGF5KDApKS5zdWJzY3JpYmUoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5oaWdobGlnaHRlZEVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZSB0aGUgZ2l2ZW4gdGFnVmFsdWUgd2l0aCB0aGUgdGFnUGF0dGVybiwgaWYgc2V0LiBVcGRhdGUgdmFsaWRhdGlvbkVycm9ycyBvbiB2YWxpZGF0aW9uIGZhaWx1cmUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdmFsaWRhdGVUYWcodGFnVmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBpbnB1dFBhdHRlcm4gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaW5wdXRWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMudGFnUGF0dGVybiAmJiAhdGhpcy50YWdQYXR0ZXJuLnRlc3QodGFnVmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGlucHV0UGF0dGVybiA9IHtcclxuICAgICAgICAgICAgICAgIGdpdmVuOiB0YWdWYWx1ZSxcclxuICAgICAgICAgICAgICAgIHBhdHRlcm46IHRoaXMudGFnUGF0dGVyblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0VmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JzWydpbnB1dFBhdHRlcm4nXSA9IGlucHV0UGF0dGVybjtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dFZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgdGFnIG9iamVjdCBmb3IgdGhlIGdpdmVuIHRhZ1ZhbHVlLiBJZiBjcmVhdGVUYWdIYW5kbGVyIGlzIHNwZWNpZmllZCwgdXNlIGl0OyBvdGhlcndpc2UgaWYgZGlzcGxheVByb3BlcnR5IGlzIHNwZWNpZmllZCwgY3JlYXRlIGFuIG9iamVjdCB3aXRoIHRoZSB0YWdWYWx1ZSBhcyB0aGUgc2luZ2xlIG5hbWVkIHByb3BlcnR5OyBvdGhlcndpc2UgcmV0dXJuIHRoZSB0YWdWYWx1ZSBpdHNlbGYuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlVGFnKHRhZ1ZhbHVlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGxldCB0YWcgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLmNyZWF0ZVRhZ0hhbmRsZXIgJiYgdHlwZW9mIHRoaXMuY3JlYXRlVGFnSGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0YWcgPSB0aGlzLmNyZWF0ZVRhZ0hhbmRsZXIodGFnVmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGFnID0ge307XHJcbiAgICAgICAgICAgIHRhZ1s8c3RyaW5nPnRoaXMuZGlzcGxheV0gPSB0YWdWYWx1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0YWcgPSB0YWdWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIHRhZyBvYmplY3QsIGNhbGxpbmcgdGhlIHRhZ0FkZGluZyBhbmQgdGFnQWRkZWQgZXZlbnRzLiBSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyB3YXMgYWRkZWQgdG8gdGhlIHRhZ3MgYXJyYXkuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkVGFnKHRhZzogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRhZykge1xyXG4gICAgICAgICAgICAvLyBWZXJpZnkgdGhhdCB0aGUgbmV3IHRhZyBjYW4gYmUgZGlzcGxheWVkXHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHRoaXMuZ2V0VGFnRGlzcGxheSh0YWcpO1xyXG4gICAgICAgICAgICBpZiAoZGlzcGxheVZhbHVlICYmIHR5cGVvZiBkaXNwbGF5VmFsdWUgPT09ICdzdHJpbmcnICYmIGRpc3BsYXlWYWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWdBZGRpbmdFdmVudCA9IG5ldyBUYWdJbnB1dEV2ZW50KHRhZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ0FkZGluZy5lbWl0KHRhZ0FkZGluZ0V2ZW50KTtcclxuICAgICAgICAgICAgICAgIGlmICghdGFnQWRkaW5nRXZlbnQuZGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdzID0gdGhpcy50YWdzIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFncy5wdXNoKHRhZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdBZGRlZC5lbWl0KG5ldyBUYWdJbnB1dEV2ZW50KHRhZykpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiB0YWdJbmRleCBpcyBhIHZhbGlkIHRhZyBpbmRleC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc1ZhbGlkVGFnSW5kZXgodGFnSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0YWdJbmRleCA+PSAwICYmIHRhZ0luZGV4IDwgdGhpcy50YWdzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gaW5kZXggaXMgYSB2YWxpZCBzZWxlY3Rpb24gaW5kZXggKHRhZ3Mgb3IgaW5wdXQgZmllbGQpLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzVmFsaWRTZWxlY3RJbmRleChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGluZGV4ID49IDAgJiYgaW5kZXggPD0gdGhpcy50YWdzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNoYXJhY3RlciBjb3JyZXNwb25kaW5nIHRvIHRoZSBnaXZlbiBrZXkgZXZlbnQsIG1haW5seSBmb3IgSUUgY29tcGF0aWJpbGl0eS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRLZXlDaGFyKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogc3RyaW5nIHtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xyXG4gICAgICAgICAgICBjYXNlICdTcGFjZWJhcic6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyAnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZXZlbnQua2V5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBvZiBzdHJpbmdzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGlucHV0IHN0cmluZyBzcGxpdCBieSB0aGUgdGFnRGVsaW1pdGVycyBjaGFyYWN0ZXJzLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNwbGl0VGFnSW5wdXQoaW5wdXQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuICAgICAgICBsZXQgdGFnVmFsdWVzID0gW2lucHV0XTtcclxuICAgICAgICBpZiAodGhpcy50YWdEZWxpbWl0ZXJzICYmIHR5cGVvZiB0aGlzLnRhZ0RlbGltaXRlcnMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVzY2FwZWREZWxpbWl0ZXJzID0gdGhpcy50YWdEZWxpbWl0ZXJzLnJlcGxhY2UoL1stXFwvXFxcXF4kKis/LigpfFtcXF17fV0vZywgJ1xcXFwkJicpO1xyXG4gICAgICAgICAgICBjb25zdCBkZWxpbWl0ZXJSZWdleCA9IG5ldyBSZWdFeHAoYFske2VzY2FwZWREZWxpbWl0ZXJzfV1gLCAnZycpO1xyXG4gICAgICAgICAgICB0YWdWYWx1ZXMgPSBpbnB1dC5zcGxpdChkZWxpbWl0ZXJSZWdleCkuZmlsdGVyKChzKSA9PiBzLmxlbmd0aCA+IDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFnVmFsdWVzO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhlIEFQSSBhdmFpbGFibGUgdG8gdGFnIHRlbXBsYXRlcy5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFnQXBpIHtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gdGFnLCBhY2NvcmRpbmcgdG8gdGhlIGRpc3BsYXlQcm9wZXJ0eSBwcm9wZXJ0eS5cclxuICAgICAqL1xyXG4gICAgZ2V0VGFnRGlzcGxheTogKHRhZzogYW55KSA9PiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSB0YWcgYXQgdGhlIGdpdmVuIGluZGV4LCBpZiBwb3NzaWJsZS5cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlVGFnQXQ6IChpbmRleDogbnVtYmVyKSA9PiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHRSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyBhdCB0aGUgZ2l2ZW4gaW5kZXggY2FuIGJlIHJlbW92ZWQuXHJcbiAgICAgKi9cclxuICAgIGNhblJlbW92ZVRhZ0F0OiAoaW5kZXg6IG51bWJlcikgPT4gYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBmdW5jdGlvbiB1c2VkIHRvIHJldHVybiBjdXN0b20gY2xhc3MgaW5mb3JtYXRpb24sIGZvciB1c2UgaW4gYG5nQ2xhc3NgLlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgVGFnQ2xhc3NGdW5jdGlvbiA9ICh0YWc6IGFueSwgaW5kZXg6IG51bWJlciwgc2VsZWN0ZWQ6IGJvb2xlYW4pID0+IChzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+KTsiXX0=