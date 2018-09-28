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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhZy1pbnB1dC90YWctaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDakcsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGlCQUFpQixDQUFDO0FBQzNDLE9BQU8sRUFBb0IsU0FBUyxFQUFFLGVBQWUsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQWdDLE1BQU0sRUFBRSxTQUFTLEVBQWlCLFdBQVcsRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDclAsT0FBTyxFQUF3QixhQUFhLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN4RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUV2QyxPQUFPLEVBQUUsSUFBSSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDMUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFN0UsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBRWxELHFCQUFJLFFBQVEsR0FBRyxDQUFDLENBQUM7QUFFakIscUJBQU0sdUJBQXVCLEdBQUc7SUFDNUIsT0FBTyxFQUFFLGlCQUFpQjtJQUMxQixXQUFXLEVBQUUsVUFBVSxDQUFDLGNBQU0sT0FBQSxpQkFBaUIsRUFBakIsQ0FBaUIsQ0FBQztJQUNo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VyxTQUFDLFNBQVM7dUJBRTlCLEtBQUssU0FBQyxNQUFNOzZCQWFaLE1BQU07d0JBRU4sS0FBSyxTQUFDLE9BQU87OEJBU2IsTUFBTTswQkFFTixLQUFLOzZCQUNMLEtBQUs7MkJBQ0wsS0FBSzttQ0FDTCxLQUFLOzRCQUNMLEtBQUs7MEJBQ0wsS0FBSzswQkFDTCxLQUFLOzhCQUNMLEtBQUs7dUNBQ0wsS0FBSztnQ0FDTCxLQUFLOzZCQUNMLEtBQUs7OEJBQ0wsS0FBSzsyQkFDTCxLQUFLO21DQUNMLEtBQUs7bUNBQ0wsS0FBSyxTQUFDLFdBQVc7c0NBTWpCLEtBQUs7NEJBRUwsTUFBTTsyQkFDTixNQUFNO2lDQUNOLE1BQU07OEJBQ04sTUFBTTs2QkFDTixNQUFNOzJCQUNOLE1BQU07aUNBRU4sZUFBZSxTQUFDLGtCQUFrQjsyQkFFbEMsU0FBUyxTQUFDLFVBQVU7c0NBRXBCLFNBQVMsU0FBQyxvQkFBb0I7NkJBNkc5QixZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO2tDQTJFbEMsWUFBWSxTQUFDLFVBQVU7OzRCQTNSNUI7O1NBb0NhLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJBQ0tTUEFDRSwgREVMRVRFLCBFTlRFUiwgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFNQQUNFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcclxuaW1wb3J0IHsgdGljayB9IGZyb20gJy4uLy4uL2NvbW1vbi9pbmRleCc7XHJcbmltcG9ydCB7IFR5cGVhaGVhZENvbXBvbmVudCwgVHlwZWFoZWFkS2V5U2VydmljZSB9IGZyb20gJy4uL3R5cGVhaGVhZC9pbmRleCc7XHJcbmltcG9ydCB7IFR5cGVhaGVhZE9wdGlvbkV2ZW50IH0gZnJvbSAnLi4vdHlwZWFoZWFkL3R5cGVhaGVhZC1ldmVudCc7XHJcbmltcG9ydCB7IFRhZ0lucHV0RXZlbnQgfSBmcm9tICcuL3RhZy1pbnB1dC1ldmVudCc7XHJcblxyXG5sZXQgdW5pcXVlSWQgPSAwO1xyXG5cclxuY29uc3QgVEFHSU5QVVRfVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRhZ0lucHV0Q29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcbmNvbnN0IFRBR0lOUFVUX1ZBTElEQVRPUiA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUYWdJbnB1dENvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3V4LXRhZy1pbnB1dCcsXHJcbiAgICBleHBvcnRBczogJ3V4LXRhZy1pbnB1dCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3RhZy1pbnB1dC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBwcm92aWRlcnM6IFtUQUdJTlBVVF9WQUxVRV9BQ0NFU1NPUiwgVEFHSU5QVVRfVkFMSURBVE9SXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnW2NsYXNzLmRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXHJcbiAgICAgICAgJ1tjbGFzcy5mb2N1c10nOiAnaGFzRm9jdXMoKScsXHJcbiAgICAgICAgJ1tjbGFzcy5pbnZhbGlkXSc6ICchdmFsaWQgfHwgIWlucHV0VmFsaWQnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2F0dHIuaWQnKSBpZDogc3RyaW5nID0gYHV4LXRhZy1pbnB1dC0keysrdW5pcXVlSWR9YDtcclxuXHJcbiAgICBASW5wdXQoJ3RhZ3MnKVxyXG4gICAgZ2V0IHRhZ3MoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl90YWdzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhZ3MgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhZ3M7XHJcbiAgICB9XHJcbiAgICBzZXQgdGFncyh2YWx1ZTogYW55W10pIHtcclxuICAgICAgICB0aGlzLl90YWdzID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fb25DaGFuZ2VIYW5kbGVyKHRoaXMuX3RhZ3MpO1xyXG4gICAgICAgIHRoaXMudGFnc0NoYW5nZS5lbWl0KHRoaXMuX3RhZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIEBPdXRwdXQoKSB0YWdzQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcclxuXHJcbiAgICBASW5wdXQoJ2lucHV0JylcclxuICAgIGdldCBpbnB1dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXQ7XHJcbiAgICB9XHJcbiAgICBzZXQgaW5wdXQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2lucHV0ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5pbnB1dENoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBAT3V0cHV0KCkgaW5wdXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgICBASW5wdXQoKSBkaXNwbGF5OiAob3B0aW9uOiBhbnkpID0+IHN0cmluZyB8IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGFkZE9uUGFzdGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGVuZm9yY2VUYWdMaW1pdHM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGZyZWVJbnB1dDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBASW5wdXQoKSBtYXhUYWdzOiBudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gICAgQElucHV0KCkgbWluVGFnczogbnVtYmVyID0gMDtcclxuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcclxuICAgIEBJbnB1dCgpIHNob3dUeXBlYWhlYWRPbkNsaWNrOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSB0YWdEZWxpbWl0ZXJzOiBzdHJpbmcgPSAnJztcclxuICAgIEBJbnB1dCgpIHRhZ1BhdHRlcm46IFJlZ0V4cDtcclxuICAgIEBJbnB1dCgpIHRhZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQElucHV0KCkgdGFnQ2xhc3M6IFRhZ0NsYXNzRnVuY3Rpb24gPSAoKSA9PiB1bmRlZmluZWQ7XHJcbiAgICBASW5wdXQoKSB2YWxpZGF0aW9uRXJyb3JzOiBhbnkgPSB7fTtcclxuICAgIEBJbnB1dCgnY3JlYXRlVGFnJykgY3JlYXRlVGFnSGFuZGxlcjogKHZhbHVlOiBzdHJpbmcpID0+IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXByZWNhdGVkXHJcbiAgICAgKiBXb3JrYXJvdW5kIGZvciBFTC0zMjI0IC0gTm8gbG9uZ2VyIG5lZWRlZFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSB0cmFja0FyaWFEZXNjZW5kYW50OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBAT3V0cHV0KCkgdGFnQWRkaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ0FkZGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ0ludmFsaWRhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ1JlbW92aW5nID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ1JlbW92ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ0lucHV0RXZlbnQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgdGFnQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ0lucHV0RXZlbnQ+KCk7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZHJlbihUeXBlYWhlYWRDb21wb25lbnQpIHR5cGVhaGVhZFF1ZXJ5OiBRdWVyeUxpc3Q8VHlwZWFoZWFkQ29tcG9uZW50PjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCd0YWdJbnB1dCcpIHRhZ0lucHV0OiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2RlZmF1bHRUYWdUZW1wbGF0ZScpIHByaXZhdGUgX2RlZmF1bHRUYWdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAtMTtcclxuXHJcbiAgICB0YWdBcGk6IFRhZ0FwaSA9IHtcclxuICAgICAgICBnZXRUYWdEaXNwbGF5OiB0aGlzLmdldFRhZ0Rpc3BsYXkuYmluZCh0aGlzKSxcclxuICAgICAgICByZW1vdmVUYWdBdDogdGhpcy5yZW1vdmVUYWdBdC5iaW5kKHRoaXMpLFxyXG4gICAgICAgIGNhblJlbW92ZVRhZ0F0OiB0aGlzLmNhblJlbW92ZVRhZ0F0LmJpbmQodGhpcylcclxuICAgIH07XHJcblxyXG4gICAgdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgaW5wdXRWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICB0eXBlYWhlYWQ6IFR5cGVhaGVhZENvbXBvbmVudDtcclxuICAgIGhpZ2hsaWdodGVkRWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5wdXQ6IHN0cmluZyA9ICcnO1xyXG4gICAgcHJpdmF0ZSBfdGFnczogYW55W10gPSBbXTtcclxuICAgIHByaXZhdGUgX29uQ2hhbmdlSGFuZGxlcjogKF86IGFueSkgPT4gdm9pZCA9ICgpID0+IHsgfTtcclxuICAgIHByaXZhdGUgX29uVG91Y2hlZEhhbmRsZXI6ICgpID0+IHZvaWQgPSAoKSA9PiB7IH07XHJcbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxyXG4gICAgICAgIHByaXZhdGUgX3R5cGVhaGVhZEtleVNlcnZpY2U6IFR5cGVhaGVhZEtleVNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy50YWdUZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ1RlbXBsYXRlID0gdGhpcy5fZGVmYXVsdFRhZ1RlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gV2F0Y2ggZm9yIG9wdGlvbmFsIGNoaWxkIHR5cGVhaGVhZCBjb250cm9sXHJcbiAgICAgICAgdGhpcy5jb25uZWN0VHlwZWFoZWFkKHRoaXMudHlwZWFoZWFkUXVlcnkuZmlyc3QpO1xyXG5cclxuICAgICAgICB0aGlzLnR5cGVhaGVhZFF1ZXJ5LmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgocXVlcnkpID0+IHRoaXMuY29ubmVjdFR5cGVhaGVhZChxdWVyeS5maXJzdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgICAgICBpZiAoY2hhbmdlcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBpZiAoY2hhbmdlcy5kaXNhYmxlZC5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vIENsZWFyIHNlbGVjdGlvbiBhbmQgY2xvc2UgZHJvcGRvd25cclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlYWhlYWQub3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdmFsaWRhdGlvbiBzdGF0dXNcclxuICAgICAgICB0aGlzLnZhbGlkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XHJcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy50YWdzID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlSGFuZGxlciA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9vblRvdWNoZWRIYW5kbGVyID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgZm9jdXMgb24gdGhlIGlucHV0IGZpZWxkLlxyXG4gICAgICovXHJcbiAgICBmb2N1cygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy50YWdJbnB1dCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ0lucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZSB0aGUgdmFsdWUgb2YgdGhlIGNvbnRyb2wgKHRhZ3MgcHJvcGVydHkpLlxyXG4gICAgICovXHJcbiAgICB2YWxpZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbGlkID0gdHJ1ZTtcclxuICAgICAgICBsZXQgdGFnUmFuZ2VFcnJvciA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMudGFncyAmJiAodGhpcy50YWdzLmxlbmd0aCA8IHRoaXMubWluVGFncyB8fCB0aGlzLnRhZ3MubGVuZ3RoID4gdGhpcy5tYXhUYWdzKSkge1xyXG4gICAgICAgICAgICB0YWdSYW5nZUVycm9yID0ge1xyXG4gICAgICAgICAgICAgICAgZ2l2ZW46IHRoaXMudGFncy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGFncyxcclxuICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUYWdzXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JzWyd0YWdSYW5nZUVycm9yJ10gPSB0YWdSYW5nZUVycm9yO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxyXG4gICAga2V5SGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBpbnB1dCBmaWVsZCBjdXJzb3IgbG9jYXRpb25cclxuICAgICAgICBjb25zdCBpbnB1dEN1cnNvclBvcyA9IHRoaXMudGFnSW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBpbnB1dCBmaWVsZCBoYXMgYW55IHRleHQgc2VsZWN0ZWRcclxuICAgICAgICBjb25zdCBoYXNTZWxlY3Rpb24gPSB0aGlzLnRhZ0lucHV0Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgIT09IHRoaXMudGFnSW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQ7XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSBpZiBhIHRhZyBoYXMgZm9jdXNcclxuICAgICAgICBjb25zdCB0YWdTZWxlY3RlZCA9IHRoaXMuaXNWYWxpZFRhZ0luZGV4KHRoaXMuc2VsZWN0ZWRJbmRleCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGlucHV0TGVuZ3RoID0gdGhpcy5pbnB1dCA/IHRoaXMuaW5wdXQubGVuZ3RoIDogMDtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgYXJyb3cga2V5cyBjYW4gbW92ZSB0aGUgc2VsZWN0aW9uLiBPdGhlcndpc2UgdGhlIGlucHV0IGZpZWxkIHRha2VzIHRoZSBldmVudC5cclxuICAgICAgICBjb25zdCBjYW5OYXZpZ2F0ZUxlZnQgPSB0YWdTZWxlY3RlZCB8fCAoaW5wdXRDdXJzb3JQb3MgPD0gMCAmJiAhaGFzU2VsZWN0aW9uKTtcclxuICAgICAgICBjb25zdCBjYW5OYXZpZ2F0ZVJpZ2h0ID0gdGFnU2VsZWN0ZWQgfHwgKGlucHV0Q3Vyc29yUG9zID49IGlucHV0TGVuZ3RoICYmICFoYXNTZWxlY3Rpb24pO1xyXG5cclxuICAgICAgICAvLyBGb3J3YXJkIGtleSBldmVudHMgdG8gdGhlIHR5cGVhaGVhZCBjb21wb25lbnQuXHJcbiAgICAgICAgdGhpcy5fdHlwZWFoZWFkS2V5U2VydmljZS5oYW5kbGVLZXkoZXZlbnQsIHRoaXMudHlwZWFoZWFkKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xyXG4gICAgICAgICAgICBjYXNlIEVOVEVSOlxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYSB0eXBlYWhlYWQgb3B0aW9uIGlzIGhpZ2hsaWdodGVkXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlYWhlYWQgJiYgdGhpcy50eXBlYWhlYWQub3BlbiAmJiB0aGlzLnR5cGVhaGVhZC5oaWdobGlnaHRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgdHlwZWFoZWFkIG9wdGlvbiBhcyBhIHRhZywgY2xlYXIgdGhlIGlucHV0LCBhbmQgY2xvc2UgdGhlIGRyb3Bkb3duXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21taXRUeXBlYWhlYWQodGhpcy50eXBlYWhlYWQuaGlnaGxpZ2h0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkLm9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVmFsaWRhdGUgYW5kIGFkZCB0aGUgaW5wdXQgdGV4dCBhcyBhIHRhZywgaWYgcG9zc2libGVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1pdElucHV0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIEJBQ0tTUEFDRTpcclxuICAgICAgICAgICAgICAgIGlmIChjYW5OYXZpZ2F0ZUxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhY2tzcGFjZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgREVMRVRFOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRhZ1NlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUYWdBdCh0aGlzLnNlbGVjdGVkSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FuTmF2aWdhdGVMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlU2VsZWN0aW9uKC0xKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbk5hdmlnYXRlUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVTZWxlY3Rpb24oMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGtleXMgaW4gdGhlIHRhZ0RlbGltaXRlcnNcclxuICAgICAgICBpZiAodGhpcy50YWdEZWxpbWl0ZXJzICYmIHRoaXMudGFnRGVsaW1pdGVycy5pbmRleE9mKHRoaXMuZ2V0S2V5Q2hhcihldmVudCkpID49IDApIHtcclxuICAgICAgICAgICAgLy8gQ29tbWl0IHByZXZpb3VzIHRleHRcclxuICAgICAgICAgICAgdGhpcy5jb21taXRJbnB1dCgpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXNvdXQnKVxyXG4gICAgZm9jdXNPdXRIYW5kbGVyKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAvLyBJZiBhIGNsaWNrIG9uIHRoZSB0eXBlYWhlYWQgaXMgaW4gcHJvZ3Jlc3MsIGRvbid0IGRvIGFueXRoaW5nLlxyXG4gICAgICAgIC8vIFRoaXMgd29ya3MgYXJvdW5kIGFuIGlzc3VlIGluIElFIHdoZXJlIGNsaWNraW5nIGEgc2Nyb2xsYmFyIGRyb3BzIGZvY3VzLlxyXG4gICAgICAgIGlmICh0aGlzLnR5cGVhaGVhZCAmJiB0aGlzLnR5cGVhaGVhZC5jbGlja2luZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDbG9zZSB0aGUgZHJvcGRvd24gb24gYmx1clxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyh0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlYWhlYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cGVhaGVhZC5vcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRhZ0NsaWNrSGFuZGxlcihldmVudDogTW91c2VFdmVudCwgdGFnOiBhbnksIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIC8vIFNlbmQgdGFnQ2xpY2sgZXZlbnRcclxuICAgICAgICBjb25zdCB0YWdDbGlja0V2ZW50ID0gbmV3IFRhZ0lucHV0RXZlbnQodGFnKTtcclxuICAgICAgICB0aGlzLnRhZ0NsaWNrLmVtaXQodGFnQ2xpY2tFdmVudCk7XHJcblxyXG4gICAgICAgIC8vIFByZXZlbnQgZm9jdXMgaWYgcHJldmVudERlZmF1bHQoKSB3YXMgY2FsbGVkXHJcbiAgICAgICAgaWYgKHRhZ0NsaWNrRXZlbnQuZGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNlbGVjdCB0aGUgdGFnIChmb3IgSUUgdGhhdCBkb2Vzbid0IHByb3BhZ2F0ZSBmb2N1cylcclxuICAgICAgICB0aGlzLnNlbGVjdFRhZ0F0KGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dENsaWNrSGFuZGxlcigpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnR5cGVhaGVhZCAmJiB0aGlzLnNob3dUeXBlYWhlYWRPbkNsaWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkLm9wZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnB1dEZvY3VzSGFuZGxlcigpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RJbnB1dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0UGFzdGVIYW5kbGVyKGV2ZW50OiBDbGlwYm9hcmRFdmVudCk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYWRkT25QYXN0ZSkge1xyXG4gICAgICAgICAgICAvLyBHZXQgdGV4dCBmcm9tIHRoZSBjbGlwYm9hcmRcclxuICAgICAgICAgICAgbGV0IGlucHV0OiBzdHJpbmcgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuY2xpcGJvYXJkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSBldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQvcGxhaW4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgoPGFueT53aW5kb3cpLmNsaXBib2FyZERhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vIEludGVybmV0IEV4cGxvcmVyIG9ubHlcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gKDxhbnk+d2luZG93KS5jbGlwYm9hcmREYXRhLmdldERhdGEoJ1RleHQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ29tbWl0IHRoZSBjbGlwYm9hcmQgdGV4dCBkaXJlY3RseVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb21taXQoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdElucHV0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdHlwZWFoZWFkT3B0aW9uU2VsZWN0ZWRIYW5kbGVyKGV2ZW50OiBUeXBlYWhlYWRPcHRpb25FdmVudCk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgLy8gV2hlbiB0aGUgdHlwZWFoZWFkIHNlbmRzIHRoZSBvcHRpb25TZWxlY3RlZCBldmVudCwgY29tbWl0IHRoZSBvYmplY3QgZGlyZWN0bHlcclxuICAgICAgICB0aGlzLmNvbW1pdFR5cGVhaGVhZChldmVudC5vcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tbWl0IHRoZSBjdXJyZW50IGlucHV0IHZhbHVlIGFuZCBjbGVhciB0aGUgaW5wdXQgZmllbGQgaWYgc3VjY2Vzc2Z1bC5cclxuICAgICAqL1xyXG4gICAgY29tbWl0SW5wdXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tbWl0KHRoaXMuaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SW5wdXQoKTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dCA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbW1pdCB0aGUgZ2l2ZW4gdGFnIG9iamVjdCBhbmQgY2xlYXIgdGhlIGlucHV0IGlmIHN1Y2Nlc3NmdWwuXHJcbiAgICAgKi9cclxuICAgIGNvbW1pdFR5cGVhaGVhZCh0YWc6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmFkZFRhZyh0YWcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SW5wdXQoKTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dCA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbW1pdCB0aGUgZ2l2ZW4gc3RyaW5nIHZhbHVlIGFzIG9uZSBvciBtb3JlIHRhZ3MsIGlmIHZhbGlkYXRpb24gcGFzc2VzLiBSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyhzKSB3ZXJlIGNyZWF0ZWQuXHJcbiAgICAgKi9cclxuICAgIGNvbW1pdChpbnB1dDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGlucHV0ICYmIHRoaXMuZnJlZUlucHV0KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBTcGxpdCB0aGUgdGFncyBieSB0aGUgdGFnRGVsaW1pdGVycyBpZiBjb25maWd1cmVkXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1RhZ3MgPSB0aGlzLnNwbGl0VGFnSW5wdXQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdGFnIHZhbGlkYXRpb24gZm9yIGFsbCBvZiB0aGUgaW5kaXZpZHVhbCB2YWx1ZXNcclxuICAgICAgICAgICAgbGV0IGFsbFZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbmV3VGFnIG9mIG5ld1RhZ3MpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gdGhpcy52YWxpZGF0ZVRhZyhuZXdUYWcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgdGFncyBpZiBhbGwgYXJlIHZhbGlkXHJcbiAgICAgICAgICAgIGlmIChhbGxWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbmV3VGFnIG9mIG5ld1RhZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFRhZyh0aGlzLmNyZWF0ZVRhZyhuZXdUYWcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgbm8gdGFnIGlzIHNlbGVjdGVkLCBzZWxlY3QgdGhlIHJpZ2h0bW9zdCB0YWcuIElmIGEgdGFnIGlzIHNlbGVjdGVkLCByZW1vdmUgaXQuXHJcbiAgICAgKi9cclxuICAgIGJhY2tzcGFjZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWRUYWdJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFnQXQodGhpcy50YWdzLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVGFnQXQodGhpcy5zZWxlY3RlZEluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlIHRoZSBoaWdobGlnaHRlZCBvcHRpb24gZm9yd2FyZHMgb3IgYmFja3dhcmRzIGluIHRoZSBsaXN0LiBXcmFwcyBhdCB0aGUgbGltaXRzLlxyXG4gICAgICogQHBhcmFtIGRlbHRhIFZhbHVlIHRvIGJlIGFkZGVkIHRvIHRoZSBzZWxlY3RlZCBpbmRleCwgaS5lLiAtMSB0byBtb3ZlIGJhY2t3YXJkcywgKzEgdG8gbW92ZSBmb3J3YXJkcy5cclxuICAgICAqL1xyXG4gICAgbW92ZVNlbGVjdGlvbihkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkU2VsZWN0SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggKz0gZGVsdGE7XHJcblxyXG4gICAgICAgICAgICAvLyBEbyB3cmFwcGluZyBvZiBzZWxlY3Rpb24gd2hlbiBvdXQgb2YgYm91bmRzXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLnRhZ3MubGVuZ3RoO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCA+IHRoaXMudGFncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgdmFsdWUgdG8gZGlzcGxheSBmb3IgdGhlIGdpdmVuIHRhZy4gVXNlcyBkaXNwbGF5IGZ1bmN0aW9uL3Byb3BlcnR5IG5hbWUgaWYgc2V0LCBvdGhlcndpc2UgYXNzdW1lcyB0aGF0IHRoZSB0YWcgaXMgYSBzaW1wbGUgc3RyaW5nLlxyXG4gICAgICovXHJcbiAgICBnZXRUYWdEaXNwbGF5KHRhZzogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5KHRhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kaXNwbGF5ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFnWzxzdHJpbmc+dGhpcy5kaXNwbGF5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gaW5kZXggaXMgc2VsZWN0ZWQgKHRhZyBpbmRleCBvciBpbnB1dCBmaWVsZCkuXHJcbiAgICAgKi9cclxuICAgIGlzU2VsZWN0ZWQoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBpbmRleCA9PT0gdGhpcy5zZWxlY3RlZEluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0IHRoZSB0YWcgYXQgdGhlIGdpdmVuIGluZGV4LiBEb2VzIG5vdGhpbmcgaWYgZGlzYWJsZWQgaXMgdHJ1ZS5cclxuICAgICAqL1xyXG4gICAgc2VsZWN0VGFnQXQodGFnSW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFRhZ0luZGV4KHRhZ0luZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0YWdJbmRleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3QgdGhlIGlucHV0IGZpZWxkLCBnaXZpbmcgaXQgZm9jdXMuIERvZXMgbm90aGluZyBpZiBkaXNhYmxlZCBpcyB0cnVlLlxyXG4gICAgICovXHJcbiAgICBzZWxlY3RJbnB1dCgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy50YWdzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSB0aGUgdGFnIGF0IHRoZSBnaXZlbiBpbmRleC4gRG9lcyBub3RoaW5nIGlmIGRpc2FibGVkIGlzIHRydWUgb3IgdGhlIG1pblRhZ3MgcHJvcGVydHkgcHJldmVudHMgcmVtb3ZhbC5cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlVGFnQXQodGFnSW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAhdGhpcy5jYW5SZW1vdmVUYWdBdCh0YWdJbmRleCkpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHRoYXQgdGhlIHRhZ0luZGV4IGlzIGluIHJhbmdlXHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFRhZ0luZGV4KHRhZ0luZGV4KSkge1xyXG4gICAgICAgICAgICBjb25zdCB0YWcgPSB0aGlzLnRhZ3NbdGFnSW5kZXhdO1xyXG4gICAgICAgICAgICBjb25zdCB0YWdSZW1vdmluZ0V2ZW50ID0gbmV3IFRhZ0lucHV0RXZlbnQodGFnKTtcclxuICAgICAgICAgICAgdGhpcy50YWdSZW1vdmluZy5lbWl0KHRhZ1JlbW92aW5nRXZlbnQpO1xyXG4gICAgICAgICAgICBpZiAoIXRhZ1JlbW92aW5nRXZlbnQuZGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTZWxlY3QgaW5wdXQgZmlyc3QgdG8gYXZvaWQgaXNzdWVzIHdpdGggZHJvcHBpbmcgZm9jdXNcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SW5wdXQoKTtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgdGFnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ3Muc3BsaWNlKHRhZ0luZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIC8vIFNldCBmb2N1cyBhZ2FpbiBzaW5jZSBpbmRpY2VzIGhhdmUgY2hhbmdlZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJbnB1dCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdSZW1vdmVkLmVtaXQobmV3IFRhZ0lucHV0RXZlbnQodGFnKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyBhdCB0aGUgZ2l2ZW4gaW5kZXggY2FuIGJlIHJlbW92ZWQuXHJcbiAgICAgKi9cclxuICAgIGNhblJlbW92ZVRhZ0F0KHRhZ0luZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YWdzLmxlbmd0aCA+IHRoaXMubWluVGFncyB8fCAhdGhpcy5lbmZvcmNlVGFnTGltaXRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbnB1dCBmaWVsZCBzaG91bGQgYmUgYXZhaWxhYmxlLlxyXG4gICAgICovXHJcbiAgICBpc0lucHV0VmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YWdzLmxlbmd0aCA8IHRoaXMubWF4VGFncyB8fCAhdGhpcy5lbmZvcmNlVGFnTGltaXRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGFueSBwYXJ0IG9mIHRoZSBjb250cm9sIGhhcyBmb2N1cy5cclxuICAgICAqL1xyXG4gICAgaGFzRm9jdXMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZFNlbGVjdEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25uZWN0VHlwZWFoZWFkKHR5cGVhaGVhZDogVHlwZWFoZWFkQ29tcG9uZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudHlwZWFoZWFkID0gdHlwZWFoZWFkO1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGVhaGVhZCkge1xyXG4gICAgICAgICAgICAvLyBTZXQgdXAgZXZlbnQgaGFuZGxlciBmb3Igc2VsZWN0ZWQgb3B0aW9uc1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLnR5cGVhaGVhZC5vcHRpb25TZWxlY3RlZC5zdWJzY3JpYmUodGhpcy50eXBlYWhlYWRPcHRpb25TZWxlY3RlZEhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgdXAgZXZlbnQgaGFuZGxlciBmb3IgdGhlIGhpZ2hsaWdodGVkIGVsZW1lbnRcclxuICAgICAgICAgICAgLy8gQWRkZWQgYSBkZWxheSB0byBtb3ZlIGl0IG91dCBvZiB0aGUgY3VycmVudCBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlXHJcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGVhaGVhZC5oaWdobGlnaHRlZEVsZW1lbnRDaGFuZ2UucGlwZSh0aWNrKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHRoaXMuaGlnaGxpZ2h0ZWRFbGVtZW50ID0gZWxlbWVudClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZSB0aGUgZ2l2ZW4gdGFnVmFsdWUgd2l0aCB0aGUgdGFnUGF0dGVybiwgaWYgc2V0LiBVcGRhdGUgdmFsaWRhdGlvbkVycm9ycyBvbiB2YWxpZGF0aW9uIGZhaWx1cmUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdmFsaWRhdGVUYWcodGFnVmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBpbnB1dFBhdHRlcm4gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaW5wdXRWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMudGFnUGF0dGVybiAmJiAhdGhpcy50YWdQYXR0ZXJuLnRlc3QodGFnVmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGlucHV0UGF0dGVybiA9IHtcclxuICAgICAgICAgICAgICAgIGdpdmVuOiB0YWdWYWx1ZSxcclxuICAgICAgICAgICAgICAgIHBhdHRlcm46IHRoaXMudGFnUGF0dGVyblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0VmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JzWydpbnB1dFBhdHRlcm4nXSA9IGlucHV0UGF0dGVybjtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dFZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgdGFnIG9iamVjdCBmb3IgdGhlIGdpdmVuIHRhZ1ZhbHVlLiBJZiBjcmVhdGVUYWdIYW5kbGVyIGlzIHNwZWNpZmllZCwgdXNlIGl0OyBvdGhlcndpc2UgaWYgZGlzcGxheVByb3BlcnR5IGlzIHNwZWNpZmllZCwgY3JlYXRlIGFuIG9iamVjdCB3aXRoIHRoZSB0YWdWYWx1ZSBhcyB0aGUgc2luZ2xlIG5hbWVkIHByb3BlcnR5OyBvdGhlcndpc2UgcmV0dXJuIHRoZSB0YWdWYWx1ZSBpdHNlbGYuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlVGFnKHRhZ1ZhbHVlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGxldCB0YWcgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLmNyZWF0ZVRhZ0hhbmRsZXIgJiYgdHlwZW9mIHRoaXMuY3JlYXRlVGFnSGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0YWcgPSB0aGlzLmNyZWF0ZVRhZ0hhbmRsZXIodGFnVmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGFnID0ge307XHJcbiAgICAgICAgICAgIHRhZ1s8c3RyaW5nPnRoaXMuZGlzcGxheV0gPSB0YWdWYWx1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0YWcgPSB0YWdWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIHRhZyBvYmplY3QsIGNhbGxpbmcgdGhlIHRhZ0FkZGluZyBhbmQgdGFnQWRkZWQgZXZlbnRzLiBSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyB3YXMgYWRkZWQgdG8gdGhlIHRhZ3MgYXJyYXkuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkVGFnKHRhZzogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRhZykge1xyXG4gICAgICAgICAgICAvLyBWZXJpZnkgdGhhdCB0aGUgbmV3IHRhZyBjYW4gYmUgZGlzcGxheWVkXHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHRoaXMuZ2V0VGFnRGlzcGxheSh0YWcpO1xyXG4gICAgICAgICAgICBpZiAoZGlzcGxheVZhbHVlICYmIHR5cGVvZiBkaXNwbGF5VmFsdWUgPT09ICdzdHJpbmcnICYmIGRpc3BsYXlWYWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWdBZGRpbmdFdmVudCA9IG5ldyBUYWdJbnB1dEV2ZW50KHRhZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ0FkZGluZy5lbWl0KHRhZ0FkZGluZ0V2ZW50KTtcclxuICAgICAgICAgICAgICAgIGlmICghdGFnQWRkaW5nRXZlbnQuZGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdzID0gdGhpcy50YWdzIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFncy5wdXNoKHRhZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdBZGRlZC5lbWl0KG5ldyBUYWdJbnB1dEV2ZW50KHRhZykpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiB0YWdJbmRleCBpcyBhIHZhbGlkIHRhZyBpbmRleC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc1ZhbGlkVGFnSW5kZXgodGFnSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0YWdJbmRleCA+PSAwICYmIHRhZ0luZGV4IDwgdGhpcy50YWdzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gaW5kZXggaXMgYSB2YWxpZCBzZWxlY3Rpb24gaW5kZXggKHRhZ3Mgb3IgaW5wdXQgZmllbGQpLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzVmFsaWRTZWxlY3RJbmRleChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGluZGV4ID49IDAgJiYgaW5kZXggPD0gdGhpcy50YWdzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNoYXJhY3RlciBjb3JyZXNwb25kaW5nIHRvIHRoZSBnaXZlbiBrZXkgZXZlbnQsIG1haW5seSBmb3IgSUUgY29tcGF0aWJpbGl0eS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRLZXlDaGFyKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogc3RyaW5nIHtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU1BBQ0U6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyAnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZXZlbnQua2V5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBvZiBzdHJpbmdzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGlucHV0IHN0cmluZyBzcGxpdCBieSB0aGUgdGFnRGVsaW1pdGVycyBjaGFyYWN0ZXJzLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNwbGl0VGFnSW5wdXQoaW5wdXQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuICAgICAgICBsZXQgdGFnVmFsdWVzID0gW2lucHV0XTtcclxuICAgICAgICBpZiAodGhpcy50YWdEZWxpbWl0ZXJzICYmIHR5cGVvZiB0aGlzLnRhZ0RlbGltaXRlcnMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVzY2FwZWREZWxpbWl0ZXJzID0gdGhpcy50YWdEZWxpbWl0ZXJzLnJlcGxhY2UoL1stXFwvXFxcXF4kKis/LigpfFtcXF17fV0vZywgJ1xcXFwkJicpO1xyXG4gICAgICAgICAgICBjb25zdCBkZWxpbWl0ZXJSZWdleCA9IG5ldyBSZWdFeHAoYFske2VzY2FwZWREZWxpbWl0ZXJzfV1gLCAnZycpO1xyXG4gICAgICAgICAgICB0YWdWYWx1ZXMgPSBpbnB1dC5zcGxpdChkZWxpbWl0ZXJSZWdleCkuZmlsdGVyKChzKSA9PiBzLmxlbmd0aCA+IDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFnVmFsdWVzO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhlIEFQSSBhdmFpbGFibGUgdG8gdGFnIHRlbXBsYXRlcy5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFnQXBpIHtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gdGFnLCBhY2NvcmRpbmcgdG8gdGhlIGRpc3BsYXlQcm9wZXJ0eSBwcm9wZXJ0eS5cclxuICAgICAqL1xyXG4gICAgZ2V0VGFnRGlzcGxheTogKHRhZzogYW55KSA9PiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSB0YWcgYXQgdGhlIGdpdmVuIGluZGV4LCBpZiBwb3NzaWJsZS5cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlVGFnQXQ6IChpbmRleDogbnVtYmVyKSA9PiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHRSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyBhdCB0aGUgZ2l2ZW4gaW5kZXggY2FuIGJlIHJlbW92ZWQuXHJcbiAgICAgKi9cclxuICAgIGNhblJlbW92ZVRhZ0F0OiAoaW5kZXg6IG51bWJlcikgPT4gYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBmdW5jdGlvbiB1c2VkIHRvIHJldHVybiBjdXN0b20gY2xhc3MgaW5mb3JtYXRpb24sIGZvciB1c2UgaW4gYG5nQ2xhc3NgLlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgVGFnQ2xhc3NGdW5jdGlvbiA9ICh0YWc6IGFueSwgaW5kZXg6IG51bWJlciwgc2VsZWN0ZWQ6IGJvb2xlYW4pID0+IChzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+KTsiXX0=