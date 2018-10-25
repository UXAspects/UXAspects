/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { BACKSPACE, DELETE, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import { DOCUMENT } from '@angular/common';
import { Component, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Inject, Input, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../common/index';
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
        this.autocomplete = 'off';
        /**
         * @deprecated
         * Workaround for EL-3224 - No longer needed
         */
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
        this._onDestroy = new Subject();
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
        this.typeaheadQuery.changes.pipe(takeUntil(this._onDestroy))
            .subscribe(function (query) { return _this.connectTypeahead(query.first); });
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
     * @return {?}
     */
    TagInputComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._onDestroy.next();
        this._onDestroy.complete();
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
     * Set focus on the input field.
     */
    /**
     * Set focus on the input field.
     * @return {?}
     */
    TagInputComponent.prototype.focus = /**
     * Set focus on the input field.
     * @return {?}
     */
    function () {
        if (this.tagInput) {
            this.tagInput.nativeElement.focus();
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
        switch (event.which) {
            case ENTER:
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
            case BACKSPACE:
                if (canNavigateLeft) {
                    this.backspace();
                    event.stopPropagation();
                    event.preventDefault();
                }
                break;
            case DELETE:
                if (tagSelected) {
                    this.removeTagAt(this.selectedIndex);
                }
                break;
            case LEFT_ARROW:
                if (canNavigateLeft) {
                    this.moveSelection(-1);
                    event.preventDefault();
                }
                break;
            case RIGHT_ARROW:
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
     * @return {?}
     */
    TagInputComponent.prototype.focusOutHandler = /**
     * @return {?}
     */
    function () {
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
     * @param delta Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     */
    /**
     * Move the highlighted option forwards or backwards in the list. Wraps at the limits.
     * @param {?} delta Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    TagInputComponent.prototype.moveSelection = /**
     * Move the highlighted option forwards or backwards in the list. Wraps at the limits.
     * @param {?} delta Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    function (delta) {
        if (this.disabled) {
            return;
        }
        if (this.isValidSelectIndex(this.selectedIndex)) {
            this.selectedIndex += delta;
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
        if (this._subscription) {
            this._subscription.unsubscribe();
            this._subscription = null;
        }
        this.typeahead = typeahead;
        if (this.typeahead) {
            // Set up event handler for selected options
            this._subscription = this.typeahead.optionSelected.subscribe(this.typeaheadOptionSelectedHandler.bind(this));
            // Set up event handler for the highlighted element
            // Added a delay to move it out of the current change detection cycle
            this._subscription.add(this.typeahead.highlightedElementChange.pipe(tick())
                .subscribe(function (element) { return _this.highlightedElement = element; }));
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
        switch (event.which) {
            case SPACE:
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
                    exportAs: 'ux-tag-input',
                    template: "<ol [attr.role]=\"typeahead ? 'combobox' : 'none'\" [attr.aria-haspopup]=\"typeahead ? 'listbox' : null\">\n    <li *ngFor=\"let tag of tags; let i = index\" class=\"ux-tag\"\n        [class.disabled]=\"disabled\"\n        [ngClass]=\"tagClass(tag, i, isSelected(i))\"\n        [attr.tabindex]=\"disabled ? null : 0\"\n        [focusIf]=\"isSelected(i)\"\n        (click)=\"tagClickHandler($event, tag, i)\"\n        (focus)=\"selectTagAt(i)\">\n\n        <ng-container [ngTemplateOutlet]=\"tagTemplate\"\n            [ngTemplateOutletContext]=\"{tag: tag, index: i, disabled: disabled, api: tagApi}\">\n        </ng-container>\n\n    </li>\n    <li *ngIf=\"isInputVisible()\" class=\"ux-tag-input\" role=\"none\">\n        <input #tagInput type=\"text\" [attr.id]=\"id\" class=\"ux-tag-input\"\n            [(ngModel)]=\"input\"\n            [autocomplete]=\"autocomplete\"\n            [class.invalid]=\"!inputValid\"\n            [attr.aria-activedescendant]=\"highlightedElement?.id\"\n            [attr.aria-autocomplete]=\"typeahead ? 'list' : 'none'\"\n            [attr.aria-controls]=\"typeahead?.id\"\n            aria-multiline=\"false\"\n            [placeholder]=\"disabled ? '' : (placeholder || '')\"\n            [disabled]=\"disabled\"\n            [focusIf]=\"isSelected(tags.length)\"\n            (click)=\"inputClickHandler()\"\n            (focus)=\"inputFocusHandler()\"\n            (paste)=\"inputPasteHandler($event)\">\n    </li>\n</ol>\n\n<ng-content #typeahead></ng-content>\n\n<ng-template #defaultTagTemplate let-tag=\"tag\" let-index=\"index\" let-disabled=\"disabled\" let-api=\"api\">\n    <span class=\"ux-tag-text\">{{api.getTagDisplay(tag)}}</span>\n    <button *ngIf=\"api.canRemoveTagAt(index)\"\n        type=\"button\"\n        class=\"ux-tag-remove\"\n        aria-label=\"Remove Item\"\n        [disabled]=\"disabled\"\n        (click)=\"api.removeTagAt(index); $event.stopPropagation();\">\n        <span class=\"hpe-icon hpe-close\"></span>\n    </button>\n</ng-template>",
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
        autocomplete: [{ type: Input }],
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
        focusOutHandler: [{ type: HostListener, args: ['focusout',] }]
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
    TagInputComponent.prototype.autocomplete;
    /** @type {?} */
    TagInputComponent.prototype.createTagHandler;
    /**
     * @deprecated
     * Workaround for EL-3224 - No longer needed
     * @type {?}
     */
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
    TagInputComponent.prototype._subscription;
    /** @type {?} */
    TagInputComponent.prototype._onDestroy;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhZy1pbnB1dC90YWctaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBb0IsU0FBUyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBRSxTQUFTLEVBQWlCLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDclAsT0FBTyxFQUF3QixhQUFhLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV2QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDMUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFN0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWxELHFCQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFFakIscUJBQU0sdUJBQXVCLEdBQUc7SUFDNUIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxpQkFBaUIsRUFBakIsQ0FBaUIsQ0FBQztJQUNo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QUssWUFBSSxXQUFXLFNBQUMsU0FBUzt1QkFFOUIsS0FBSyxTQUFDLE1BQU07NkJBYVosTUFBTTt3QkFFTixLQUFLLFNBQUMsT0FBTzs4QkFTYixNQUFNOzBCQUVOLEtBQUs7NkJBQ0wsS0FBSzsyQkFDTCxLQUFLO21DQUNMLEtBQUs7NEJBQ0wsS0FBSzswQkFDTCxLQUFLOzBCQUNMLEtBQUs7OEJBQ0wsS0FBSzt1Q0FDTCxLQUFLO2dDQUNMLEtBQUs7NkJBQ0wsS0FBSzs4QkFDTCxLQUFLOzJCQUNMLEtBQUs7bUNBQ0wsS0FBSzsrQkFDTCxLQUFLO21DQUNMLEtBQUssU0FBQyxXQUFXO3NDQU1qQixLQUFLOzRCQUVMLE1BQU07MkJBQ04sTUFBTTtpQ0FDTixNQUFNOzhCQUNOLE1BQU07NkJBQ04sTUFBTTsyQkFDTixNQUFNO2lDQUVOLGVBQWUsU0FBQyxrQkFBa0I7MkJBRWxDLFNBQVMsU0FBQyxVQUFVO3NDQUVwQixTQUFTLFNBQUMsb0JBQW9COzZCQTZHOUIsWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztrQ0EyRWxDLFlBQVksU0FBQyxVQUFVOzs0QkE1UjVCOztTQW9DYSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBCQUNLU1BBQ0UsIERFTEVURSwgRU5URVIsIExFRlRfQVJST1csIFJJR0hUX0FSUk9XLCBTUEFDRSB9IGZyb20gJ0Bhbmd1bGFyL2Nkay9rZXljb2Rlcyc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcclxuaW1wb3J0IHsgQWZ0ZXJDb250ZW50SW5pdCwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgZm9yd2FyZFJlZiwgSG9zdEJpbmRpbmcsIEhvc3RMaXN0ZW5lciwgSW5qZWN0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QsIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTElEQVRPUlMsIE5HX1ZBTFVFX0FDQ0VTU09SIH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xyXG5pbXBvcnQgeyB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XHJcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XHJcbmltcG9ydCB7IHRpY2sgfSBmcm9tICcuLi8uLi9jb21tb24vaW5kZXgnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRDb21wb25lbnQsIFR5cGVhaGVhZEtleVNlcnZpY2UgfSBmcm9tICcuLi90eXBlYWhlYWQvaW5kZXgnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRPcHRpb25FdmVudCB9IGZyb20gJy4uL3R5cGVhaGVhZC90eXBlYWhlYWQtZXZlbnQnO1xyXG5pbXBvcnQgeyBUYWdJbnB1dEV2ZW50IH0gZnJvbSAnLi90YWctaW5wdXQtZXZlbnQnO1xyXG5cclxubGV0IHVuaXF1ZUlkID0gMDtcclxuXHJcbmNvbnN0IFRBR0lOUFVUX1ZBTFVFX0FDQ0VTU09SID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUYWdJbnB1dENvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5jb25zdCBUQUdJTlBVVF9WQUxJREFUT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGFnSW5wdXRDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd1eC10YWctaW5wdXQnLFxyXG4gICAgZXhwb3J0QXM6ICd1eC10YWctaW5wdXQnLFxyXG4gICAgdGVtcGxhdGVVcmw6ICd0YWctaW5wdXQuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgcHJvdmlkZXJzOiBbVEFHSU5QVVRfVkFMVUVfQUNDRVNTT1IsIFRBR0lOUFVUX1ZBTElEQVRPUl0sXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxyXG4gICAgICAgICdbY2xhc3MuZm9jdXNdJzogJ2hhc0ZvY3VzKCknLFxyXG4gICAgICAgICdbY2xhc3MuaW52YWxpZF0nOiAnIXZhbGlkIHx8ICFpbnB1dFZhbGlkJ1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFnSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJykgaWQ6IHN0cmluZyA9IGB1eC10YWctaW5wdXQtJHsrK3VuaXF1ZUlkfWA7XHJcblxyXG4gICAgQElucHV0KCd0YWdzJylcclxuICAgIGdldCB0YWdzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fdGFncykge1xyXG4gICAgICAgICAgICB0aGlzLl90YWdzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90YWdzO1xyXG4gICAgfVxyXG4gICAgc2V0IHRhZ3ModmFsdWU6IGFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5fdGFncyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlSGFuZGxlcih0aGlzLl90YWdzKTtcclxuICAgICAgICB0aGlzLnRhZ3NDaGFuZ2UuZW1pdCh0aGlzLl90YWdzKTtcclxuICAgIH1cclxuXHJcbiAgICBAT3V0cHV0KCkgdGFnc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XHJcblxyXG4gICAgQElucHV0KCdpbnB1dCcpXHJcbiAgICBnZXQgaW5wdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lucHV0O1xyXG4gICAgfVxyXG4gICAgc2V0IGlucHV0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9pbnB1dCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuaW5wdXRDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgQE91dHB1dCgpIGlucHV0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gICAgQElucHV0KCkgZGlzcGxheTogKG9wdGlvbjogYW55KSA9PiBzdHJpbmcgfCBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBhZGRPblBhc3RlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBlbmZvcmNlVGFnTGltaXRzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBmcmVlSW5wdXQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgbWF4VGFnczogbnVtYmVyID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgIEBJbnB1dCgpIG1pblRhZ3M6IG51bWJlciA9IDA7XHJcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XHJcbiAgICBASW5wdXQoKSBzaG93VHlwZWFoZWFkT25DbGljazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgdGFnRGVsaW1pdGVyczogc3RyaW5nID0gJyc7XHJcbiAgICBASW5wdXQoKSB0YWdQYXR0ZXJuOiBSZWdFeHA7XHJcbiAgICBASW5wdXQoKSB0YWdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBJbnB1dCgpIHRhZ0NsYXNzOiBUYWdDbGFzc0Z1bmN0aW9uID0gKCkgPT4gdW5kZWZpbmVkO1xyXG4gICAgQElucHV0KCkgdmFsaWRhdGlvbkVycm9yczogYW55ID0ge307XHJcbiAgICBASW5wdXQoKSBhdXRvY29tcGxldGU6IHN0cmluZyA9ICdvZmYnO1xyXG4gICAgQElucHV0KCdjcmVhdGVUYWcnKSBjcmVhdGVUYWdIYW5kbGVyOiAodmFsdWU6IHN0cmluZykgPT4gYW55O1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlcHJlY2F0ZWRcclxuICAgICAqIFdvcmthcm91bmQgZm9yIEVMLTMyMjQgLSBObyBsb25nZXIgbmVlZGVkXHJcbiAgICAgKi9cclxuICAgIEBJbnB1dCgpIHRyYWNrQXJpYURlc2NlbmRhbnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBPdXRwdXQoKSB0YWdBZGRpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ0lucHV0RXZlbnQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgdGFnQWRkZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ0lucHV0RXZlbnQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgdGFnSW52YWxpZGF0ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ0lucHV0RXZlbnQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgdGFnUmVtb3ZpbmcgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ0lucHV0RXZlbnQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgdGFnUmVtb3ZlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnSW5wdXRFdmVudD4oKTtcclxuICAgIEBPdXRwdXQoKSB0YWdDbGljayA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnSW5wdXRFdmVudD4oKTtcclxuXHJcbiAgICBAQ29udGVudENoaWxkcmVuKFR5cGVhaGVhZENvbXBvbmVudCkgdHlwZWFoZWFkUXVlcnk6IFF1ZXJ5TGlzdDxUeXBlYWhlYWRDb21wb25lbnQ+O1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ3RhZ0lucHV0JykgdGFnSW5wdXQ6IEVsZW1lbnRSZWY7XHJcblxyXG4gICAgQFZpZXdDaGlsZCgnZGVmYXVsdFRhZ1RlbXBsYXRlJykgcHJpdmF0ZSBfZGVmYXVsdFRhZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG5cclxuICAgIHNlbGVjdGVkSW5kZXg6IG51bWJlciA9IC0xO1xyXG5cclxuICAgIHRhZ0FwaTogVGFnQXBpID0ge1xyXG4gICAgICAgIGdldFRhZ0Rpc3BsYXk6IHRoaXMuZ2V0VGFnRGlzcGxheS5iaW5kKHRoaXMpLFxyXG4gICAgICAgIHJlbW92ZVRhZ0F0OiB0aGlzLnJlbW92ZVRhZ0F0LmJpbmQodGhpcyksXHJcbiAgICAgICAgY2FuUmVtb3ZlVGFnQXQ6IHRoaXMuY2FuUmVtb3ZlVGFnQXQuYmluZCh0aGlzKVxyXG4gICAgfTtcclxuXHJcbiAgICB2YWxpZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBpbnB1dFZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHR5cGVhaGVhZDogVHlwZWFoZWFkQ29tcG9uZW50O1xyXG4gICAgaGlnaGxpZ2h0ZWRFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBwcml2YXRlIF9pbnB1dDogc3RyaW5nID0gJyc7XHJcbiAgICBwcml2YXRlIF90YWdzOiBhbnlbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfb25DaGFuZ2VIYW5kbGVyOiAoXzogYW55KSA9PiB2b2lkID0gKCkgPT4geyB9O1xyXG4gICAgcHJpdmF0ZSBfb25Ub3VjaGVkSGFuZGxlcjogKCkgPT4gdm9pZCA9ICgpID0+IHsgfTtcclxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG4gICAgcHJpdmF0ZSBfb25EZXN0cm95ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBfdHlwZWFoZWFkS2V5U2VydmljZTogVHlwZWFoZWFkS2V5U2VydmljZSkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhZ1RlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFnVGVtcGxhdGUgPSB0aGlzLl9kZWZhdWx0VGFnVGVtcGxhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcclxuICAgICAgICAvLyBXYXRjaCBmb3Igb3B0aW9uYWwgY2hpbGQgdHlwZWFoZWFkIGNvbnRyb2xcclxuICAgICAgICB0aGlzLmNvbm5lY3RUeXBlYWhlYWQodGhpcy50eXBlYWhlYWRRdWVyeS5maXJzdCk7XHJcblxyXG4gICAgICAgIHRoaXMudHlwZWFoZWFkUXVlcnkuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKVxyXG4gICAgICAgICAgICAuc3Vic2NyaWJlKChxdWVyeSkgPT4gdGhpcy5jb25uZWN0VHlwZWFoZWFkKHF1ZXJ5LmZpcnN0KSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkNoYW5nZXMoY2hhbmdlczogU2ltcGxlQ2hhbmdlcyk6IHZvaWQge1xyXG4gICAgICAgIGlmIChjaGFuZ2VzLmRpc2FibGVkKSB7XHJcbiAgICAgICAgICAgIGlmIChjaGFuZ2VzLmRpc2FibGVkLmN1cnJlbnRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgLy8gQ2xlYXIgc2VsZWN0aW9uIGFuZCBjbG9zZSBkcm9wZG93blxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlYWhlYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cGVhaGVhZC5vcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB2YWxpZGF0aW9uIHN0YXR1c1xyXG4gICAgICAgIHRoaXMudmFsaWRhdGUoKTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcclxuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcclxuICAgIH1cclxuXHJcbiAgICB3cml0ZVZhbHVlKHZhbHVlOiBhbnlbXSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ3MgPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5fb25DaGFuZ2VIYW5kbGVyID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX29uVG91Y2hlZEhhbmRsZXIgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICBzZXREaXNhYmxlZFN0YXRlKGlzRGlzYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcclxuICAgICAgICB0aGlzLmRpc2FibGVkID0gaXNEaXNhYmxlZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNldCBmb2N1cyBvbiB0aGUgaW5wdXQgZmllbGQuXHJcbiAgICAgKi9cclxuICAgIGZvY3VzKCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLnRhZ0lucHV0KSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFnSW5wdXQubmF0aXZlRWxlbWVudC5mb2N1cygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZhbGlkYXRlIHRoZSB2YWx1ZSBvZiB0aGUgY29udHJvbCAodGFncyBwcm9wZXJ0eSkuXHJcbiAgICAgKi9cclxuICAgIHZhbGlkYXRlKCk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMudmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIGxldCB0YWdSYW5nZUVycm9yID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy50YWdzICYmICh0aGlzLnRhZ3MubGVuZ3RoIDwgdGhpcy5taW5UYWdzIHx8IHRoaXMudGFncy5sZW5ndGggPiB0aGlzLm1heFRhZ3MpKSB7XHJcbiAgICAgICAgICAgIHRhZ1JhbmdlRXJyb3IgPSB7XHJcbiAgICAgICAgICAgICAgICBnaXZlbjogdGhpcy50YWdzLmxlbmd0aCxcclxuICAgICAgICAgICAgICAgIG1pbjogdGhpcy5taW5UYWdzLFxyXG4gICAgICAgICAgICAgICAgbWF4OiB0aGlzLm1heFRhZ3NcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy52YWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnNbJ3RhZ1JhbmdlRXJyb3InXSA9IHRhZ1JhbmdlRXJyb3I7XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXHJcbiAgICBrZXlIYW5kbGVyKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAvLyBHZXQgdGhlIGlucHV0IGZpZWxkIGN1cnNvciBsb2NhdGlvblxyXG4gICAgICAgIGNvbnN0IGlucHV0Q3Vyc29yUG9zID0gdGhpcy50YWdJbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0O1xyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgaWYgdGhlIGlucHV0IGZpZWxkIGhhcyBhbnkgdGV4dCBzZWxlY3RlZFxyXG4gICAgICAgIGNvbnN0IGhhc1NlbGVjdGlvbiA9IHRoaXMudGFnSW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydCAhPT0gdGhpcy50YWdJbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvbkVuZDtcclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIGEgdGFnIGhhcyBmb2N1c1xyXG4gICAgICAgIGNvbnN0IHRhZ1NlbGVjdGVkID0gdGhpcy5pc1ZhbGlkVGFnSW5kZXgodGhpcy5zZWxlY3RlZEluZGV4KTtcclxuXHJcbiAgICAgICAgY29uc3QgaW5wdXRMZW5ndGggPSB0aGlzLmlucHV0ID8gdGhpcy5pbnB1dC5sZW5ndGggOiAwO1xyXG5cclxuICAgICAgICAvLyBDaGVjayB3aGV0aGVyIHRoZSBhcnJvdyBrZXlzIGNhbiBtb3ZlIHRoZSBzZWxlY3Rpb24uIE90aGVyd2lzZSB0aGUgaW5wdXQgZmllbGQgdGFrZXMgdGhlIGV2ZW50LlxyXG4gICAgICAgIGNvbnN0IGNhbk5hdmlnYXRlTGVmdCA9IHRhZ1NlbGVjdGVkIHx8IChpbnB1dEN1cnNvclBvcyA8PSAwICYmICFoYXNTZWxlY3Rpb24pO1xyXG4gICAgICAgIGNvbnN0IGNhbk5hdmlnYXRlUmlnaHQgPSB0YWdTZWxlY3RlZCB8fCAoaW5wdXRDdXJzb3JQb3MgPj0gaW5wdXRMZW5ndGggJiYgIWhhc1NlbGVjdGlvbik7XHJcblxyXG4gICAgICAgIC8vIEZvcndhcmQga2V5IGV2ZW50cyB0byB0aGUgdHlwZWFoZWFkIGNvbXBvbmVudC5cclxuICAgICAgICB0aGlzLl90eXBlYWhlYWRLZXlTZXJ2aWNlLmhhbmRsZUtleShldmVudCwgdGhpcy50eXBlYWhlYWQpO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XHJcbiAgICAgICAgICAgIGNhc2UgRU5URVI6XHJcbiAgICAgICAgICAgICAgICAvLyBDaGVjayBpZiBhIHR5cGVhaGVhZCBvcHRpb24gaXMgaGlnaGxpZ2h0ZWRcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGVhaGVhZCAmJiB0aGlzLnR5cGVhaGVhZC5vcGVuICYmIHRoaXMudHlwZWFoZWFkLmhpZ2hsaWdodGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWRkIHRoZSB0eXBlYWhlYWQgb3B0aW9uIGFzIGEgdGFnLCBjbGVhciB0aGUgaW5wdXQsIGFuZCBjbG9zZSB0aGUgZHJvcGRvd25cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1pdFR5cGVhaGVhZCh0aGlzLnR5cGVhaGVhZC5oaWdobGlnaHRlZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlYWhlYWQub3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBWYWxpZGF0ZSBhbmQgYWRkIHRoZSBpbnB1dCB0ZXh0IGFzIGEgdGFnLCBpZiBwb3NzaWJsZVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbWl0SW5wdXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgQkFDS1NQQUNFOlxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbk5hdmlnYXRlTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFja3NwYWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBERUxFVEU6XHJcbiAgICAgICAgICAgICAgICBpZiAodGFnU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVRhZ0F0KHRoaXMuc2VsZWN0ZWRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgTEVGVF9BUlJPVzpcclxuICAgICAgICAgICAgICAgIGlmIChjYW5OYXZpZ2F0ZUxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVTZWxlY3Rpb24oLTEpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgUklHSFRfQVJST1c6XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FuTmF2aWdhdGVSaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVNlbGVjdGlvbigxKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3Iga2V5cyBpbiB0aGUgdGFnRGVsaW1pdGVyc1xyXG4gICAgICAgIGlmICh0aGlzLnRhZ0RlbGltaXRlcnMgJiYgdGhpcy50YWdEZWxpbWl0ZXJzLmluZGV4T2YodGhpcy5nZXRLZXlDaGFyKGV2ZW50KSkgPj0gMCkge1xyXG4gICAgICAgICAgICAvLyBDb21taXQgcHJldmlvdXMgdGV4dFxyXG4gICAgICAgICAgICB0aGlzLmNvbW1pdElucHV0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdmb2N1c291dCcpXHJcbiAgICBmb2N1c091dEhhbmRsZXIoKTogdm9pZCB7XHJcblxyXG4gICAgICAgIC8vIElmIGEgY2xpY2sgb24gdGhlIHR5cGVhaGVhZCBpcyBpbiBwcm9ncmVzcywgZG9uJ3QgZG8gYW55dGhpbmcuXHJcbiAgICAgICAgLy8gVGhpcyB3b3JrcyBhcm91bmQgYW4gaXNzdWUgaW4gSUUgd2hlcmUgY2xpY2tpbmcgYSBzY3JvbGxiYXIgZHJvcHMgZm9jdXMuXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkICYmIHRoaXMudHlwZWFoZWFkLmNsaWNraW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENsb3NlIHRoZSBkcm9wZG93biBvbiBibHVyXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGVhaGVhZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkLm9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDIwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGFnQ2xpY2tIYW5kbGVyKGV2ZW50OiBNb3VzZUV2ZW50LCB0YWc6IGFueSwgaW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgLy8gU2VuZCB0YWdDbGljayBldmVudFxyXG4gICAgICAgIGNvbnN0IHRhZ0NsaWNrRXZlbnQgPSBuZXcgVGFnSW5wdXRFdmVudCh0YWcpO1xyXG4gICAgICAgIHRoaXMudGFnQ2xpY2suZW1pdCh0YWdDbGlja0V2ZW50KTtcclxuXHJcbiAgICAgICAgLy8gUHJldmVudCBmb2N1cyBpZiBwcmV2ZW50RGVmYXVsdCgpIHdhcyBjYWxsZWRcclxuICAgICAgICBpZiAodGFnQ2xpY2tFdmVudC5kZWZhdWx0UHJldmVudGVkKCkpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2VsZWN0IHRoZSB0YWcgKGZvciBJRSB0aGF0IGRvZXNuJ3QgcHJvcGFnYXRlIGZvY3VzKVxyXG4gICAgICAgIHRoaXMuc2VsZWN0VGFnQXQoaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0Q2xpY2tIYW5kbGVyKCk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkICYmIHRoaXMuc2hvd1R5cGVhaGVhZE9uQ2xpY2spIHtcclxuICAgICAgICAgICAgdGhpcy50eXBlYWhlYWQub3BlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlucHV0Rm9jdXNIYW5kbGVyKCk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdElucHV0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRQYXN0ZUhhbmRsZXIoZXZlbnQ6IENsaXBib2FyZEV2ZW50KTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5hZGRPblBhc3RlKSB7XHJcbiAgICAgICAgICAgIC8vIEdldCB0ZXh0IGZyb20gdGhlIGNsaXBib2FyZFxyXG4gICAgICAgICAgICBsZXQgaW5wdXQ6IHN0cmluZyA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5jbGlwYm9hcmREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCg8YW55PndpbmRvdykuY2xpcGJvYXJkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgb25seVxyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSAoPGFueT53aW5kb3cpLmNsaXBib2FyZERhdGEuZ2V0RGF0YSgnVGV4dCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDb21taXQgdGhlIGNsaXBib2FyZCB0ZXh0IGRpcmVjdGx5XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbW1pdChpbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SW5wdXQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0eXBlYWhlYWRPcHRpb25TZWxlY3RlZEhhbmRsZXIoZXZlbnQ6IFR5cGVhaGVhZE9wdGlvbkV2ZW50KTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAvLyBXaGVuIHRoZSB0eXBlYWhlYWQgc2VuZHMgdGhlIG9wdGlvblNlbGVjdGVkIGV2ZW50LCBjb21taXQgdGhlIG9iamVjdCBkaXJlY3RseVxyXG4gICAgICAgIHRoaXMuY29tbWl0VHlwZWFoZWFkKGV2ZW50Lm9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21taXQgdGhlIGN1cnJlbnQgaW5wdXQgdmFsdWUgYW5kIGNsZWFyIHRoZSBpbnB1dCBmaWVsZCBpZiBzdWNjZXNzZnVsLlxyXG4gICAgICovXHJcbiAgICBjb21taXRJbnB1dCgpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5jb21taXQodGhpcy5pbnB1dCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RJbnB1dCgpO1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0ID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tbWl0IHRoZSBnaXZlbiB0YWcgb2JqZWN0IGFuZCBjbGVhciB0aGUgaW5wdXQgaWYgc3VjY2Vzc2Z1bC5cclxuICAgICAqL1xyXG4gICAgY29tbWl0VHlwZWFoZWFkKHRhZzogYW55KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRkVGFnKHRhZykpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RJbnB1dCgpO1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0ID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tbWl0IHRoZSBnaXZlbiBzdHJpbmcgdmFsdWUgYXMgb25lIG9yIG1vcmUgdGFncywgaWYgdmFsaWRhdGlvbiBwYXNzZXMuIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFnKHMpIHdlcmUgY3JlYXRlZC5cclxuICAgICAqL1xyXG4gICAgY29tbWl0KGlucHV0OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoaW5wdXQgJiYgdGhpcy5mcmVlSW5wdXQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFNwbGl0IHRoZSB0YWdzIGJ5IHRoZSB0YWdEZWxpbWl0ZXJzIGlmIGNvbmZpZ3VyZWRcclxuICAgICAgICAgICAgY29uc3QgbmV3VGFncyA9IHRoaXMuc3BsaXRUYWdJbnB1dChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayB0YWcgdmFsaWRhdGlvbiBmb3IgYWxsIG9mIHRoZSBpbmRpdmlkdWFsIHZhbHVlc1xyXG4gICAgICAgICAgICBsZXQgYWxsVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBuZXdUYWcgb2YgbmV3VGFncykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWQgPSB0aGlzLnZhbGlkYXRlVGFnKG5ld1RhZyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHRoZSB0YWdzIGlmIGFsbCBhcmUgdmFsaWRcclxuICAgICAgICAgICAgaWYgKGFsbFZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBuZXdUYWcgb2YgbmV3VGFncykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVGFnKHRoaXMuY3JlYXRlVGFnKG5ld1RhZykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBubyB0YWcgaXMgc2VsZWN0ZWQsIHNlbGVjdCB0aGUgcmlnaHRtb3N0IHRhZy4gSWYgYSB0YWcgaXMgc2VsZWN0ZWQsIHJlbW92ZSBpdC5cclxuICAgICAqL1xyXG4gICAgYmFja3NwYWNlKCk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWxpZFRhZ0luZGV4KHRoaXMuc2VsZWN0ZWRJbmRleCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RUYWdBdCh0aGlzLnRhZ3MubGVuZ3RoIC0gMSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVUYWdBdCh0aGlzLnNlbGVjdGVkSW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIE1vdmUgdGhlIGhpZ2hsaWdodGVkIG9wdGlvbiBmb3J3YXJkcyBvciBiYWNrd2FyZHMgaW4gdGhlIGxpc3QuIFdyYXBzIGF0IHRoZSBsaW1pdHMuXHJcbiAgICAgKiBAcGFyYW0gZGVsdGEgVmFsdWUgdG8gYmUgYWRkZWQgdG8gdGhlIHNlbGVjdGVkIGluZGV4LCBpLmUuIC0xIHRvIG1vdmUgYmFja3dhcmRzLCArMSB0byBtb3ZlIGZvcndhcmRzLlxyXG4gICAgICovXHJcbiAgICBtb3ZlU2VsZWN0aW9uKGRlbHRhOiBudW1iZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWRTZWxlY3RJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCArPSBkZWx0YTtcclxuXHJcbiAgICAgICAgICAgIC8vIERvIHdyYXBwaW5nIG9mIHNlbGVjdGlvbiB3aGVuIG91dCBvZiBib3VuZHNcclxuICAgICAgICAgICAgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMudGFncy5sZW5ndGg7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5zZWxlY3RlZEluZGV4ID4gdGhpcy50YWdzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYSB2YWx1ZSB0byBkaXNwbGF5IGZvciB0aGUgZ2l2ZW4gdGFnLiBVc2VzIGRpc3BsYXkgZnVuY3Rpb24vcHJvcGVydHkgbmFtZSBpZiBzZXQsIG90aGVyd2lzZSBhc3N1bWVzIHRoYXQgdGhlIHRhZyBpcyBhIHNpbXBsZSBzdHJpbmcuXHJcbiAgICAgKi9cclxuICAgIGdldFRhZ0Rpc3BsYXkodGFnOiBhbnkpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kaXNwbGF5ID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmRpc3BsYXkodGFnKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0YWdbPHN0cmluZz50aGlzLmRpc3BsYXldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBpbmRleCBpcyBzZWxlY3RlZCAodGFnIGluZGV4IG9yIGlucHV0IGZpZWxkKS5cclxuICAgICAqL1xyXG4gICAgaXNTZWxlY3RlZChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGluZGV4ID09PSB0aGlzLnNlbGVjdGVkSW5kZXg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3QgdGhlIHRhZyBhdCB0aGUgZ2l2ZW4gaW5kZXguIERvZXMgbm90aGluZyBpZiBkaXNhYmxlZCBpcyB0cnVlLlxyXG4gICAgICovXHJcbiAgICBzZWxlY3RUYWdBdCh0YWdJbmRleDogbnVtYmVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkVGFnSW5kZXgodGFnSW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRhZ0luZGV4O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdCB0aGUgaW5wdXQgZmllbGQsIGdpdmluZyBpdCBmb2N1cy4gRG9lcyBub3RoaW5nIGlmIGRpc2FibGVkIGlzIHRydWUuXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdElucHV0KCk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLnRhZ3MubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIHRoZSB0YWcgYXQgdGhlIGdpdmVuIGluZGV4LiBEb2VzIG5vdGhpbmcgaWYgZGlzYWJsZWQgaXMgdHJ1ZSBvciB0aGUgbWluVGFncyBwcm9wZXJ0eSBwcmV2ZW50cyByZW1vdmFsLlxyXG4gICAgICovXHJcbiAgICByZW1vdmVUYWdBdCh0YWdJbmRleDogbnVtYmVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICF0aGlzLmNhblJlbW92ZVRhZ0F0KHRhZ0luZGV4KSkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgdGhhdCB0aGUgdGFnSW5kZXggaXMgaW4gcmFuZ2VcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkVGFnSW5kZXgodGFnSW5kZXgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhZyA9IHRoaXMudGFnc1t0YWdJbmRleF07XHJcbiAgICAgICAgICAgIGNvbnN0IHRhZ1JlbW92aW5nRXZlbnQgPSBuZXcgVGFnSW5wdXRFdmVudCh0YWcpO1xyXG4gICAgICAgICAgICB0aGlzLnRhZ1JlbW92aW5nLmVtaXQodGFnUmVtb3ZpbmdFdmVudCk7XHJcbiAgICAgICAgICAgIGlmICghdGFnUmVtb3ZpbmdFdmVudC5kZWZhdWx0UHJldmVudGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIFNlbGVjdCBpbnB1dCBmaXJzdCB0byBhdm9pZCBpc3N1ZXMgd2l0aCBkcm9wcGluZyBmb2N1c1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJbnB1dCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSB0YWdcclxuICAgICAgICAgICAgICAgIHRoaXMudGFncy5zcGxpY2UodGFnSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGZvY3VzIGFnYWluIHNpbmNlIGluZGljZXMgaGF2ZSBjaGFuZ2VkXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdElucHV0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ1JlbW92ZWQuZW1pdChuZXcgVGFnSW5wdXRFdmVudCh0YWcpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFnIGF0IHRoZSBnaXZlbiBpbmRleCBjYW4gYmUgcmVtb3ZlZC5cclxuICAgICAqL1xyXG4gICAgY2FuUmVtb3ZlVGFnQXQodGFnSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhZ3MubGVuZ3RoID4gdGhpcy5taW5UYWdzIHx8ICF0aGlzLmVuZm9yY2VUYWdMaW1pdHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGlucHV0IGZpZWxkIHNob3VsZCBiZSBhdmFpbGFibGUuXHJcbiAgICAgKi9cclxuICAgIGlzSW5wdXRWaXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhZ3MubGVuZ3RoIDwgdGhpcy5tYXhUYWdzIHx8ICF0aGlzLmVuZm9yY2VUYWdMaW1pdHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgYW55IHBhcnQgb2YgdGhlIGNvbnRyb2wgaGFzIGZvY3VzLlxyXG4gICAgICovXHJcbiAgICBoYXNGb2N1cygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkU2VsZWN0SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbm5lY3RUeXBlYWhlYWQodHlwZWFoZWFkOiBUeXBlYWhlYWRDb21wb25lbnQpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy5fc3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50eXBlYWhlYWQgPSB0eXBlYWhlYWQ7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkKSB7XHJcbiAgICAgICAgICAgIC8vIFNldCB1cCBldmVudCBoYW5kbGVyIGZvciBzZWxlY3RlZCBvcHRpb25zXHJcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbiA9IHRoaXMudHlwZWFoZWFkLm9wdGlvblNlbGVjdGVkLnN1YnNjcmliZSh0aGlzLnR5cGVhaGVhZE9wdGlvblNlbGVjdGVkSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgIC8vIFNldCB1cCBldmVudCBoYW5kbGVyIGZvciB0aGUgaGlnaGxpZ2h0ZWQgZWxlbWVudFxyXG4gICAgICAgICAgICAvLyBBZGRlZCBhIGRlbGF5IHRvIG1vdmUgaXQgb3V0IG9mIHRoZSBjdXJyZW50IGNoYW5nZSBkZXRlY3Rpb24gY3ljbGVcclxuICAgICAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZChcclxuICAgICAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkLmhpZ2hsaWdodGVkRWxlbWVudENoYW5nZS5waXBlKHRpY2soKSlcclxuICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4gdGhpcy5oaWdobGlnaHRlZEVsZW1lbnQgPSBlbGVtZW50KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZhbGlkYXRlIHRoZSBnaXZlbiB0YWdWYWx1ZSB3aXRoIHRoZSB0YWdQYXR0ZXJuLCBpZiBzZXQuIFVwZGF0ZSB2YWxpZGF0aW9uRXJyb3JzIG9uIHZhbGlkYXRpb24gZmFpbHVyZS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZVRhZyh0YWdWYWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGlucHV0UGF0dGVybiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pbnB1dFZhbGlkID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy50YWdQYXR0ZXJuICYmICF0aGlzLnRhZ1BhdHRlcm4udGVzdCh0YWdWYWx1ZSkpIHtcclxuICAgICAgICAgICAgaW5wdXRQYXR0ZXJuID0ge1xyXG4gICAgICAgICAgICAgICAgZ2l2ZW46IHRhZ1ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgcGF0dGVybjogdGhpcy50YWdQYXR0ZXJuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnNbJ2lucHV0UGF0dGVybiddID0gaW5wdXRQYXR0ZXJuO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0VmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSB0YWcgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gdGFnVmFsdWUuIElmIGNyZWF0ZVRhZ0hhbmRsZXIgaXMgc3BlY2lmaWVkLCB1c2UgaXQ7IG90aGVyd2lzZSBpZiBkaXNwbGF5UHJvcGVydHkgaXMgc3BlY2lmaWVkLCBjcmVhdGUgYW4gb2JqZWN0IHdpdGggdGhlIHRhZ1ZhbHVlIGFzIHRoZSBzaW5nbGUgbmFtZWQgcHJvcGVydHk7IG90aGVyd2lzZSByZXR1cm4gdGhlIHRhZ1ZhbHVlIGl0c2VsZi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVUYWcodGFnVmFsdWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgbGV0IHRhZyA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuY3JlYXRlVGFnSGFuZGxlciAmJiB0eXBlb2YgdGhpcy5jcmVhdGVUYWdIYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRhZyA9IHRoaXMuY3JlYXRlVGFnSGFuZGxlcih0YWdWYWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5kaXNwbGF5ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0YWcgPSB7fTtcclxuICAgICAgICAgICAgdGFnWzxzdHJpbmc+dGhpcy5kaXNwbGF5XSA9IHRhZ1ZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRhZyA9IHRhZ1ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgdGFnIG9iamVjdCwgY2FsbGluZyB0aGUgdGFnQWRkaW5nIGFuZCB0YWdBZGRlZCBldmVudHMuIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFnIHdhcyBhZGRlZCB0byB0aGUgdGFncyBhcnJheS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUYWcodGFnOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGFnKSB7XHJcbiAgICAgICAgICAgIC8vIFZlcmlmeSB0aGF0IHRoZSBuZXcgdGFnIGNhbiBiZSBkaXNwbGF5ZWRcclxuICAgICAgICAgICAgY29uc3QgZGlzcGxheVZhbHVlID0gdGhpcy5nZXRUYWdEaXNwbGF5KHRhZyk7XHJcbiAgICAgICAgICAgIGlmIChkaXNwbGF5VmFsdWUgJiYgdHlwZW9mIGRpc3BsYXlWYWx1ZSA9PT0gJ3N0cmluZycgJiYgZGlzcGxheVZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhZ0FkZGluZ0V2ZW50ID0gbmV3IFRhZ0lucHV0RXZlbnQodGFnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnQWRkaW5nLmVtaXQodGFnQWRkaW5nRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0YWdBZGRpbmdFdmVudC5kZWZhdWx0UHJldmVudGVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ3MgPSB0aGlzLnRhZ3MgfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdzLnB1c2godGFnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ0FkZGVkLmVtaXQobmV3IFRhZ0lucHV0RXZlbnQodGFnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHRhZ0luZGV4IGlzIGEgdmFsaWQgdGFnIGluZGV4LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzVmFsaWRUYWdJbmRleCh0YWdJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRhZ0luZGV4ID49IDAgJiYgdGFnSW5kZXggPCB0aGlzLnRhZ3MubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBpbmRleCBpcyBhIHZhbGlkIHNlbGVjdGlvbiBpbmRleCAodGFncyBvciBpbnB1dCBmaWVsZCkuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNWYWxpZFNlbGVjdEluZGV4KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gaW5kZXggPj0gMCAmJiBpbmRleCA8PSB0aGlzLnRhZ3MubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY2hhcmFjdGVyIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGdpdmVuIGtleSBldmVudCwgbWFpbmx5IGZvciBJRSBjb21wYXRpYmlsaXR5LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEtleUNoYXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBzdHJpbmcge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQud2hpY2gpIHtcclxuICAgICAgICAgICAgY2FzZSBTUEFDRTpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnICc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBldmVudC5rZXk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHN0cmluZ3MgY29ycmVzcG9uZGluZyB0byB0aGUgaW5wdXQgc3RyaW5nIHNwbGl0IGJ5IHRoZSB0YWdEZWxpbWl0ZXJzIGNoYXJhY3RlcnMuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3BsaXRUYWdJbnB1dChpbnB1dDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGxldCB0YWdWYWx1ZXMgPSBbaW5wdXRdO1xyXG4gICAgICAgIGlmICh0aGlzLnRhZ0RlbGltaXRlcnMgJiYgdHlwZW9mIHRoaXMudGFnRGVsaW1pdGVycyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY29uc3QgZXNjYXBlZERlbGltaXRlcnMgPSB0aGlzLnRhZ0RlbGltaXRlcnMucmVwbGFjZSgvWy1cXC9cXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGltaXRlclJlZ2V4ID0gbmV3IFJlZ0V4cChgWyR7ZXNjYXBlZERlbGltaXRlcnN9XWAsICdnJyk7XHJcbiAgICAgICAgICAgIHRhZ1ZhbHVlcyA9IGlucHV0LnNwbGl0KGRlbGltaXRlclJlZ2V4KS5maWx0ZXIoKHMpID0+IHMubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0YWdWYWx1ZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgQVBJIGF2YWlsYWJsZSB0byB0YWcgdGVtcGxhdGVzLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUYWdBcGkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBnaXZlbiB0YWcsIGFjY29yZGluZyB0byB0aGUgZGlzcGxheVByb3BlcnR5IHByb3BlcnR5LlxyXG4gICAgICovXHJcbiAgICBnZXRUYWdEaXNwbGF5OiAodGFnOiBhbnkpID0+IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHRhZyBhdCB0aGUgZ2l2ZW4gaW5kZXgsIGlmIHBvc3NpYmxlLlxyXG4gICAgICovXHJcbiAgICByZW1vdmVUYWdBdDogKGluZGV4OiBudW1iZXIpID0+IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFnIGF0IHRoZSBnaXZlbiBpbmRleCBjYW4gYmUgcmVtb3ZlZC5cclxuICAgICAqL1xyXG4gICAgY2FuUmVtb3ZlVGFnQXQ6IChpbmRleDogbnVtYmVyKSA9PiBib29sZWFuO1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIGZ1bmN0aW9uIHVzZWQgdG8gcmV0dXJuIGN1c3RvbSBjbGFzcyBpbmZvcm1hdGlvbiwgZm9yIHVzZSBpbiBgbmdDbGFzc2AuXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBUYWdDbGFzc0Z1bmN0aW9uID0gKHRhZzogYW55LCBpbmRleDogbnVtYmVyLCBzZWxlY3RlZDogYm9vbGVhbikgPT4gKHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4pOyJdfQ==