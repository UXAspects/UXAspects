/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOCUMENT } from '@angular/common';
import { Component, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Inject, Input, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { TypeaheadComponent, TypeaheadKeyService } from '../typeahead/index';
import { TagInputEvent } from './tag-input-event';
let /** @type {?} */ uniqueId = 0;
const /** @type {?} */ TAGINPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagInputComponent),
    multi: true
};
const /** @type {?} */ TAGINPUT_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => TagInputComponent),
    multi: true
};
export class TagInputComponent {
    /**
     * @param {?} _element
     * @param {?} _document
     * @param {?} _typeaheadKeyService
     */
    constructor(_element, _document, _typeaheadKeyService) {
        this._element = _element;
        this._document = _document;
        this._typeaheadKeyService = _typeaheadKeyService;
        this.id = `ux-tag-input-${++uniqueId}`;
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
        this.tagClass = () => undefined;
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
        this._onChangeHandler = () => { };
        this._onTouchedHandler = () => { };
    }
    /**
     * @return {?}
     */
    get tags() {
        if (!this._tags) {
            this._tags = [];
        }
        return this._tags;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set tags(value) {
        this._tags = value;
        this._onChangeHandler(this._tags);
        this.tagsChange.emit(this._tags);
    }
    /**
     * @return {?}
     */
    get input() {
        return this._input;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set input(value) {
        this._input = value;
        this.inputChange.emit(value);
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        if (!this.tagTemplate) {
            this.tagTemplate = this._defaultTagTemplate;
        }
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        // Watch for optional child typeahead control
        this.connectTypeahead(this.typeaheadQuery.first);
        this.typeaheadQuery.changes.subscribe((query) => {
            this.connectTypeahead(query.first);
        });
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    ngOnChanges(changes) {
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
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (value) {
            this.tags = value;
        }
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChangeHandler = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouchedHandler = fn;
    }
    /**
     * @param {?} isDisabled
     * @return {?}
     */
    setDisabledState(isDisabled) {
        this.disabled = isDisabled;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._typeaheadSubscription) {
            this._typeaheadSubscription.unsubscribe();
        }
    }
    /**
     * Validate the value of the control (tags property).
     * @return {?}
     */
    validate() {
        this.valid = true;
        let /** @type {?} */ tagRangeError = null;
        if (this.tags && (this.tags.length < this.minTags || this.tags.length > this.maxTags)) {
            tagRangeError = {
                given: this.tags.length,
                min: this.minTags,
                max: this.maxTags
            };
            this.valid = false;
        }
        this.validationErrors['tagRangeError'] = tagRangeError;
    }
    /**
     * @param {?} event
     * @return {?}
     */
    keyHandler(event) {
        if (this.disabled) {
            return;
        }
        // Get the input field cursor location
        const /** @type {?} */ inputCursorPos = this.tagInput.nativeElement.selectionStart;
        // Determine if the input field has any text selected
        const /** @type {?} */ hasSelection = this.tagInput.nativeElement.selectionStart !== this.tagInput.nativeElement.selectionEnd;
        // Determine if a tag has focus
        const /** @type {?} */ tagSelected = this.isValidTagIndex(this.selectedIndex);
        const /** @type {?} */ inputLength = this.input ? this.input.length : 0;
        // Check whether the arrow keys can move the selection. Otherwise the input field takes the event.
        const /** @type {?} */ canNavigateLeft = tagSelected || (inputCursorPos <= 0 && !hasSelection);
        const /** @type {?} */ canNavigateRight = tagSelected || (inputCursorPos >= inputLength && !hasSelection);
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    focusOutHandler(event) {
        // If a click on the typeahead is in progress, don't do anything.
        // This works around an issue in IE where clicking a scrollbar drops focus.
        if (this.typeahead && this.typeahead.clicking) {
            return;
        }
        // Close the dropdown on blur
        setTimeout(() => {
            if (!this._element.nativeElement.contains(this._document.activeElement)) {
                this.selectedIndex = -1;
                if (this.typeahead) {
                    this.typeahead.open = false;
                }
            }
        }, 200);
    }
    /**
     * @param {?} event
     * @param {?} tag
     * @param {?} index
     * @return {?}
     */
    tagClickHandler(event, tag, index) {
        if (this.disabled) {
            return;
        }
        // Send tagClick event
        const /** @type {?} */ tagClickEvent = new TagInputEvent(tag);
        this.tagClick.emit(tagClickEvent);
        // Prevent focus if preventDefault() was called
        if (tagClickEvent.defaultPrevented()) {
            event.preventDefault();
            return;
        }
        // Select the tag (for IE that doesn't propagate focus)
        this.selectTagAt(index);
    }
    /**
     * @return {?}
     */
    inputClickHandler() {
        if (this.disabled) {
            return;
        }
        if (this.typeahead && this.showTypeaheadOnClick) {
            this.typeahead.open = true;
        }
    }
    /**
     * @return {?}
     */
    inputFocusHandler() {
        if (this.disabled) {
            return;
        }
        this.selectInput();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    inputPasteHandler(event) {
        if (this.disabled) {
            return;
        }
        if (this.addOnPaste) {
            // Get text from the clipboard
            let /** @type {?} */ input = null;
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    typeaheadOptionSelectedHandler(event) {
        if (this.disabled) {
            return;
        }
        // When the typeahead sends the optionSelected event, commit the object directly
        this.commitTypeahead(event.option);
    }
    /**
     * Commit the current input value and clear the input field if successful.
     * @return {?}
     */
    commitInput() {
        if (this.commit(this.input)) {
            this.selectInput();
            this.input = '';
        }
    }
    /**
     * Commit the given tag object and clear the input if successful.
     * @param {?} tag
     * @return {?}
     */
    commitTypeahead(tag) {
        if (this.addTag(tag)) {
            this.selectInput();
            this.input = '';
        }
    }
    /**
     * Commit the given string value as one or more tags, if validation passes. Returns true if the tag(s) were created.
     * @param {?} input
     * @return {?}
     */
    commit(input) {
        if (input && this.freeInput) {
            // Split the tags by the tagDelimiters if configured
            const /** @type {?} */ newTags = this.splitTagInput(input);
            // Check tag validation for all of the individual values
            let /** @type {?} */ allValid = true;
            for (let /** @type {?} */ newTag of newTags) {
                const /** @type {?} */ valid = this.validateTag(newTag);
                if (!valid) {
                    allValid = false;
                }
            }
            // Add the tags if all are valid
            if (allValid) {
                for (let /** @type {?} */ newTag of newTags) {
                    this.addTag(this.createTag(newTag));
                }
                return true;
            }
        }
        return false;
    }
    /**
     * If no tag is selected, select the rightmost tag. If a tag is selected, remove it.
     * @return {?}
     */
    backspace() {
        if (this.disabled) {
            return;
        }
        if (!this.isValidTagIndex(this.selectedIndex)) {
            this.selectTagAt(this.tags.length - 1);
        }
        else {
            this.removeTagAt(this.selectedIndex);
        }
    }
    /**
     * Move the highlighted option forwards or backwards in the list. Wraps at the limits.
     * @param {?} d Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    moveSelection(d) {
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
    }
    /**
     * Returns a value to display for the given tag. Uses display function/property name if set, otherwise assumes that the tag is a simple string.
     * @param {?} tag
     * @return {?}
     */
    getTagDisplay(tag) {
        if (typeof this.display === 'function') {
            return this.display(tag);
        }
        if (typeof this.display === 'string') {
            return tag[/** @type {?} */ (this.display)];
        }
        return tag;
    }
    /**
     * Returns true if the given index is selected (tag index or input field).
     * @param {?} index
     * @return {?}
     */
    isSelected(index) {
        return index === this.selectedIndex;
    }
    /**
     * Select the tag at the given index. Does nothing if disabled is true.
     * @param {?} tagIndex
     * @return {?}
     */
    selectTagAt(tagIndex) {
        if (this.disabled) {
            return;
        }
        if (this.isValidTagIndex(tagIndex)) {
            this.selectedIndex = tagIndex;
        }
    }
    /**
     * Select the input field, giving it focus. Does nothing if disabled is true.
     * @return {?}
     */
    selectInput() {
        if (this.disabled) {
            return;
        }
        this.selectedIndex = this.tags.length;
    }
    /**
     * Remove the tag at the given index. Does nothing if disabled is true or the minTags property prevents removal.
     * @param {?} tagIndex
     * @return {?}
     */
    removeTagAt(tagIndex) {
        if (this.disabled || !this.canRemoveTagAt(tagIndex)) {
            return;
        }
        // Check that the tagIndex is in range
        if (this.isValidTagIndex(tagIndex)) {
            const /** @type {?} */ tag = this.tags[tagIndex];
            const /** @type {?} */ tagRemovingEvent = new TagInputEvent(tag);
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
    }
    /**
     * Returns true if the tag at the given index can be removed.
     * @param {?} tagIndex
     * @return {?}
     */
    canRemoveTagAt(tagIndex) {
        return this.tags.length > this.minTags || !this.enforceTagLimits;
    }
    /**
     * Returns true if the input field should be available.
     * @return {?}
     */
    isInputVisible() {
        return this.tags.length < this.maxTags || !this.enforceTagLimits;
    }
    /**
     * Returns true if any part of the control has focus.
     * @return {?}
     */
    hasFocus() {
        return this.isValidSelectIndex(this.selectedIndex);
    }
    /**
     * @param {?} typeahead
     * @return {?}
     */
    connectTypeahead(typeahead) {
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
                this._typeaheadSubscription.add(this.typeahead.highlightedElementChange.subscribe((element) => {
                    this.highlightedElement = element;
                }));
            }
        }
    }
    /**
     * Validate the given tagValue with the tagPattern, if set. Update validationErrors on validation failure.
     * @param {?} tagValue
     * @return {?}
     */
    validateTag(tagValue) {
        let /** @type {?} */ inputPattern = null;
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
    }
    /**
     * Create a tag object for the given tagValue. If createTagHandler is specified, use it; otherwise if displayProperty is specified, create an object with the tagValue as the single named property; otherwise return the tagValue itself.
     * @param {?} tagValue
     * @return {?}
     */
    createTag(tagValue) {
        let /** @type {?} */ tag = null;
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
    }
    /**
     * Add a tag object, calling the tagAdding and tagAdded events. Returns true if the tag was added to the tags array.
     * @param {?} tag
     * @return {?}
     */
    addTag(tag) {
        if (tag) {
            // Verify that the new tag can be displayed
            const /** @type {?} */ displayValue = this.getTagDisplay(tag);
            if (displayValue && typeof displayValue === 'string' && displayValue.length > 0) {
                const /** @type {?} */ tagAddingEvent = new TagInputEvent(tag);
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
    }
    /**
     * Returns true if the given tagIndex is a valid tag index.
     * @param {?} tagIndex
     * @return {?}
     */
    isValidTagIndex(tagIndex) {
        return tagIndex >= 0 && tagIndex < this.tags.length;
    }
    /**
     * Returns true if the given index is a valid selection index (tags or input field).
     * @param {?} index
     * @return {?}
     */
    isValidSelectIndex(index) {
        return index >= 0 && index <= this.tags.length;
    }
    /**
     * Returns the character corresponding to the given key event, mainly for IE compatibility.
     * @param {?} event
     * @return {?}
     */
    getKeyChar(event) {
        switch (event.key) {
            case 'Spacebar':
                return ' ';
        }
        return event.key;
    }
    /**
     * Returns an array of strings corresponding to the input string split by the tagDelimiters characters.
     * @param {?} input
     * @return {?}
     */
    splitTagInput(input) {
        let /** @type {?} */ tagValues = [input];
        if (this.tagDelimiters && typeof this.tagDelimiters === 'string') {
            const /** @type {?} */ escapedDelimiters = this.tagDelimiters.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const /** @type {?} */ delimiterRegex = new RegExp(`[${escapedDelimiters}]`, 'g');
            tagValues = input.split(delimiterRegex).filter((s) => s.length > 0);
        }
        return tagValues;
    }
}
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
TagInputComponent.ctorParameters = () => [
    { type: ElementRef },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] }] },
    { type: TypeaheadKeyService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhZy1pbnB1dC90YWctaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFvQixTQUFTLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFFLFNBQVMsRUFBaUIsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyUCxPQUFPLEVBQXdCLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBRXhGLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTdFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVsRCxxQkFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBRWpCLHVCQUFNLHVCQUF1QixHQUFHO0lBQzVCLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxpQkFBaUIsQ0FBQztJQUNoRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFDRix1QkFBTSxrQkFBa0IsR0FBRztJQUN2QixPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLGlCQUFpQixDQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQVlGLE1BQU07Ozs7OztJQW1GRixZQUNZLFVBQ2tCLFNBQWMsRUFDaEM7UUFGQSxhQUFRLEdBQVIsUUFBUTtRQUNVLGNBQVMs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LFNBQUMsT0FBTzswQkFTYixNQUFNO3NCQUVOLEtBQUs7eUJBQ0wsS0FBSzt1QkFDTCxLQUFLOytCQUNMLEtBQUs7d0JBQ0wsS0FBSztzQkFDTCxLQUFLO3NCQUNMLEtBQUs7MEJBQ0wsS0FBSzttQ0FDTCxLQUFLOzRCQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7K0JBQ0wsS0FBSzsrQkFDTCxLQUFLLFNBQUMsV0FBVztrQ0FHakIsS0FBSzt3QkFFTCxNQUFNO3VCQUNOLE1BQU07NkJBQ04sTUFBTTswQkFDTixNQUFNO3lCQUNOLE1BQU07dUJBQ04sTUFBTTs2QkFFTixlQUFlLFNBQUMsa0JBQWtCO3VCQUVsQyxTQUFTLFNBQUMsVUFBVTtrQ0FFcEIsU0FBUyxTQUFDLG9CQUFvQjt5QkFrRzlCLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7OEJBMEVsQyxZQUFZLFNBQUMsVUFBVSxFQUFFLENBQUMsUUFBUSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcclxuaW1wb3J0IHsgVHlwZWFoZWFkQ29tcG9uZW50LCBUeXBlYWhlYWRLZXlTZXJ2aWNlIH0gZnJvbSAnLi4vdHlwZWFoZWFkL2luZGV4JztcclxuaW1wb3J0IHsgVHlwZWFoZWFkT3B0aW9uRXZlbnQgfSBmcm9tICcuLi90eXBlYWhlYWQvdHlwZWFoZWFkLWV2ZW50JztcclxuaW1wb3J0IHsgVGFnSW5wdXRFdmVudCB9IGZyb20gJy4vdGFnLWlucHV0LWV2ZW50JztcclxuXHJcbmxldCB1bmlxdWVJZCA9IDA7XHJcblxyXG5jb25zdCBUQUdJTlBVVF9WQUxVRV9BQ0NFU1NPUiA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGFnSW5wdXRDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuY29uc3QgVEFHSU5QVVRfVkFMSURBVE9SID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMSURBVE9SUyxcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRhZ0lucHV0Q29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndXgtdGFnLWlucHV0JyxcclxuICAgIHRlbXBsYXRlVXJsOiAndGFnLWlucHV0LmNvbXBvbmVudC5odG1sJyxcclxuICAgIHByb3ZpZGVyczogW1RBR0lOUFVUX1ZBTFVFX0FDQ0VTU09SLCBUQUdJTlBVVF9WQUxJREFUT1JdLFxyXG4gICAgaG9zdDoge1xyXG4gICAgICAgICdbY2xhc3MuZGlzYWJsZWRdJzogJ2Rpc2FibGVkJyxcclxuICAgICAgICAnW2NsYXNzLmZvY3VzXSc6ICdoYXNGb2N1cygpJyxcclxuICAgICAgICAnW2NsYXNzLmludmFsaWRdJzogJyF2YWxpZCB8fCAhaW5wdXRWYWxpZCdcclxuICAgIH1cclxufSlcclxuZXhwb3J0IGNsYXNzIFRhZ0lucHV0Q29tcG9uZW50IGltcGxlbWVudHMgT25Jbml0LCBBZnRlckNvbnRlbnRJbml0LCBPbkNoYW5nZXMsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkRlc3Ryb3kge1xyXG5cclxuICAgIEBJbnB1dCgpIEBIb3N0QmluZGluZygnYXR0ci5pZCcpIGlkOiBzdHJpbmcgPSBgdXgtdGFnLWlucHV0LSR7Kyt1bmlxdWVJZH1gO1xyXG5cclxuICAgIEBJbnB1dCgndGFncycpXHJcbiAgICBnZXQgdGFncygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuX3RhZ3MpIHtcclxuICAgICAgICAgICAgdGhpcy5fdGFncyA9IFtdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5fdGFncztcclxuICAgIH1cclxuICAgIHNldCB0YWdzKHZhbHVlOiBhbnlbXSkge1xyXG4gICAgICAgIHRoaXMuX3RhZ3MgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLl9vbkNoYW5nZUhhbmRsZXIodGhpcy5fdGFncyk7XHJcbiAgICAgICAgdGhpcy50YWdzQ2hhbmdlLmVtaXQodGhpcy5fdGFncyk7XHJcbiAgICB9XHJcblxyXG4gICAgQE91dHB1dCgpIHRhZ3NDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGFueVtdPigpO1xyXG5cclxuICAgIEBJbnB1dCgnaW5wdXQnKVxyXG4gICAgZ2V0IGlucHV0KCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9pbnB1dDtcclxuICAgIH1cclxuICAgIHNldCBpbnB1dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5faW5wdXQgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmlucHV0Q2hhbmdlLmVtaXQodmFsdWUpO1xyXG4gICAgfVxyXG5cclxuICAgIEBPdXRwdXQoKSBpbnB1dENoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xyXG5cclxuICAgIEBJbnB1dCgpIGRpc3BsYXk6IChvcHRpb246IGFueSkgPT4gc3RyaW5nIHwgc3RyaW5nO1xyXG4gICAgQElucHV0KCkgYWRkT25QYXN0ZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBASW5wdXQoKSBkaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgZW5mb3JjZVRhZ0xpbWl0czogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgZnJlZUlucHV0OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIG1heFRhZ3M6IG51bWJlciA9IE51bWJlci5NQVhfVkFMVUU7XHJcbiAgICBASW5wdXQoKSBtaW5UYWdzOiBudW1iZXIgPSAwO1xyXG4gICAgQElucHV0KCkgcGxhY2Vob2xkZXI6IHN0cmluZyA9ICcnO1xyXG4gICAgQElucHV0KCkgc2hvd1R5cGVhaGVhZE9uQ2xpY2s6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIHRhZ0RlbGltaXRlcnM6IHN0cmluZyA9ICcnO1xyXG4gICAgQElucHV0KCkgdGFnUGF0dGVybjogUmVnRXhwO1xyXG4gICAgQElucHV0KCkgdGFnVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcbiAgICBASW5wdXQoKSB0YWdDbGFzczogVGFnQ2xhc3NGdW5jdGlvbiA9ICgpID0+IHVuZGVmaW5lZDtcclxuICAgIEBJbnB1dCgpIHZhbGlkYXRpb25FcnJvcnM6IGFueSA9IHt9O1xyXG4gICAgQElucHV0KCdjcmVhdGVUYWcnKSBjcmVhdGVUYWdIYW5kbGVyOiAodmFsdWU6IHN0cmluZykgPT4gYW55O1xyXG5cclxuICAgIC8vIFdvcmthcm91bmQgZm9yIEVMLTMyMjQgdW50aWwgdGhlIGlzc3VlIGNhbiBiZSBkaWFnbm9zZWQuXHJcbiAgICBASW5wdXQoKSB0cmFja0FyaWFEZXNjZW5kYW50OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBAT3V0cHV0KCkgdGFnQWRkaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ0FkZGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ0ludmFsaWRhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ1JlbW92aW5nID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ1JlbW92ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ0lucHV0RXZlbnQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgdGFnQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ0lucHV0RXZlbnQ+KCk7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZHJlbihUeXBlYWhlYWRDb21wb25lbnQpIHR5cGVhaGVhZFF1ZXJ5OiBRdWVyeUxpc3Q8VHlwZWFoZWFkQ29tcG9uZW50PjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCd0YWdJbnB1dCcpIHRhZ0lucHV0OiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2RlZmF1bHRUYWdUZW1wbGF0ZScpIHByaXZhdGUgX2RlZmF1bHRUYWdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAtMTtcclxuXHJcbiAgICB0YWdBcGk6IFRhZ0FwaSA9IHtcclxuICAgICAgICBnZXRUYWdEaXNwbGF5OiB0aGlzLmdldFRhZ0Rpc3BsYXkuYmluZCh0aGlzKSxcclxuICAgICAgICByZW1vdmVUYWdBdDogdGhpcy5yZW1vdmVUYWdBdC5iaW5kKHRoaXMpLFxyXG4gICAgICAgIGNhblJlbW92ZVRhZ0F0OiB0aGlzLmNhblJlbW92ZVRhZ0F0LmJpbmQodGhpcylcclxuICAgIH07XHJcblxyXG4gICAgdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgaW5wdXRWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgdHlwZWFoZWFkOiBUeXBlYWhlYWRDb21wb25lbnQ7XHJcblxyXG4gICAgaGlnaGxpZ2h0ZWRFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBwcml2YXRlIF9pbnB1dDogc3RyaW5nID0gJyc7XHJcbiAgICBwcml2YXRlIF90YWdzOiBhbnlbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfb25DaGFuZ2VIYW5kbGVyOiAoXzogYW55KSA9PiB2b2lkID0gKCkgPT4geyB9O1xyXG4gICAgcHJpdmF0ZSBfb25Ub3VjaGVkSGFuZGxlcjogKCkgPT4gdm9pZCA9ICgpID0+IHsgfTtcclxuICAgIHByaXZhdGUgX3R5cGVhaGVhZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcclxuICAgICAgICBwcml2YXRlIF90eXBlYWhlYWRLZXlTZXJ2aWNlOiBUeXBlYWhlYWRLZXlTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMudGFnVGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy50YWdUZW1wbGF0ZSA9IHRoaXMuX2RlZmF1bHRUYWdUZW1wbGF0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgICAgIC8vIFdhdGNoIGZvciBvcHRpb25hbCBjaGlsZCB0eXBlYWhlYWQgY29udHJvbFxyXG4gICAgICAgIHRoaXMuY29ubmVjdFR5cGVhaGVhZCh0aGlzLnR5cGVhaGVhZFF1ZXJ5LmZpcnN0KTtcclxuICAgICAgICB0aGlzLnR5cGVhaGVhZFF1ZXJ5LmNoYW5nZXMuc3Vic2NyaWJlKChxdWVyeSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RUeXBlYWhlYWQocXVlcnkuZmlyc3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgICAgICBpZiAoY2hhbmdlcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBpZiAoY2hhbmdlcy5kaXNhYmxlZC5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vIENsZWFyIHNlbGVjdGlvbiBhbmQgY2xvc2UgZHJvcGRvd25cclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlYWhlYWQub3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdmFsaWRhdGlvbiBzdGF0dXNcclxuICAgICAgICB0aGlzLnZhbGlkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55W10pIHtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy50YWdzID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlSGFuZGxlciA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9vblRvdWNoZWRIYW5kbGVyID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3R5cGVhaGVhZFN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLl90eXBlYWhlYWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZSB0aGUgdmFsdWUgb2YgdGhlIGNvbnRyb2wgKHRhZ3MgcHJvcGVydHkpLlxyXG4gICAgICovXHJcbiAgICB2YWxpZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLnZhbGlkID0gdHJ1ZTtcclxuICAgICAgICBsZXQgdGFnUmFuZ2VFcnJvciA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMudGFncyAmJiAodGhpcy50YWdzLmxlbmd0aCA8IHRoaXMubWluVGFncyB8fCB0aGlzLnRhZ3MubGVuZ3RoID4gdGhpcy5tYXhUYWdzKSkge1xyXG4gICAgICAgICAgICB0YWdSYW5nZUVycm9yID0ge1xyXG4gICAgICAgICAgICAgICAgZ2l2ZW46IHRoaXMudGFncy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGFncyxcclxuICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUYWdzXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JzWyd0YWdSYW5nZUVycm9yJ10gPSB0YWdSYW5nZUVycm9yO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxyXG4gICAga2V5SGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBpbnB1dCBmaWVsZCBjdXJzb3IgbG9jYXRpb25cclxuICAgICAgICBjb25zdCBpbnB1dEN1cnNvclBvcyA9IHRoaXMudGFnSW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBpbnB1dCBmaWVsZCBoYXMgYW55IHRleHQgc2VsZWN0ZWRcclxuICAgICAgICBjb25zdCBoYXNTZWxlY3Rpb24gPSB0aGlzLnRhZ0lucHV0Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgIT09IHRoaXMudGFnSW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQ7XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSBpZiBhIHRhZyBoYXMgZm9jdXNcclxuICAgICAgICBjb25zdCB0YWdTZWxlY3RlZCA9IHRoaXMuaXNWYWxpZFRhZ0luZGV4KHRoaXMuc2VsZWN0ZWRJbmRleCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGlucHV0TGVuZ3RoID0gdGhpcy5pbnB1dCA/IHRoaXMuaW5wdXQubGVuZ3RoIDogMDtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgYXJyb3cga2V5cyBjYW4gbW92ZSB0aGUgc2VsZWN0aW9uLiBPdGhlcndpc2UgdGhlIGlucHV0IGZpZWxkIHRha2VzIHRoZSBldmVudC5cclxuICAgICAgICBjb25zdCBjYW5OYXZpZ2F0ZUxlZnQgPSB0YWdTZWxlY3RlZCB8fCAoaW5wdXRDdXJzb3JQb3MgPD0gMCAmJiAhaGFzU2VsZWN0aW9uKTtcclxuICAgICAgICBjb25zdCBjYW5OYXZpZ2F0ZVJpZ2h0ID0gdGFnU2VsZWN0ZWQgfHwgKGlucHV0Q3Vyc29yUG9zID49IGlucHV0TGVuZ3RoICYmICFoYXNTZWxlY3Rpb24pO1xyXG5cclxuICAgICAgICAvLyBGb3J3YXJkIGtleSBldmVudHMgdG8gdGhlIHR5cGVhaGVhZCBjb21wb25lbnQuXHJcbiAgICAgICAgdGhpcy5fdHlwZWFoZWFkS2V5U2VydmljZS5oYW5kbGVLZXkoZXZlbnQsIHRoaXMudHlwZWFoZWFkKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcclxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYSB0eXBlYWhlYWQgb3B0aW9uIGlzIGhpZ2hsaWdodGVkXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlYWhlYWQgJiYgdGhpcy50eXBlYWhlYWQub3BlbiAmJiB0aGlzLnR5cGVhaGVhZC5oaWdobGlnaHRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgdHlwZWFoZWFkIG9wdGlvbiBhcyBhIHRhZywgY2xlYXIgdGhlIGlucHV0LCBhbmQgY2xvc2UgdGhlIGRyb3Bkb3duXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21taXRUeXBlYWhlYWQodGhpcy50eXBlYWhlYWQuaGlnaGxpZ2h0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkLm9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVmFsaWRhdGUgYW5kIGFkZCB0aGUgaW5wdXQgdGV4dCBhcyBhIHRhZywgaWYgcG9zc2libGVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1pdElucHV0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ0JhY2tzcGFjZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FuTmF2aWdhdGVMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWNrc3BhY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ0RlbGV0ZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ0RlbCc6XHJcbiAgICAgICAgICAgICAgICBpZiAodGFnU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVRhZ0F0KHRoaXMuc2VsZWN0ZWRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcclxuICAgICAgICAgICAgY2FzZSAnTGVmdCc6XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FuTmF2aWdhdGVMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlU2VsZWN0aW9uKC0xKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxyXG4gICAgICAgICAgICBjYXNlICdSaWdodCc6XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FuTmF2aWdhdGVSaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVNlbGVjdGlvbigxKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3Iga2V5cyBpbiB0aGUgdGFnRGVsaW1pdGVyc1xyXG4gICAgICAgIGlmICh0aGlzLnRhZ0RlbGltaXRlcnMgJiYgdGhpcy50YWdEZWxpbWl0ZXJzLmluZGV4T2YodGhpcy5nZXRLZXlDaGFyKGV2ZW50KSkgPj0gMCkge1xyXG4gICAgICAgICAgICAvLyBDb21taXQgcHJldmlvdXMgdGV4dFxyXG4gICAgICAgICAgICB0aGlzLmNvbW1pdElucHV0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdmb2N1c291dCcsIFsnJGV2ZW50J10pXHJcbiAgICBmb2N1c091dEhhbmRsZXIoZXZlbnQ6IEZvY3VzRXZlbnQpIHtcclxuXHJcbiAgICAgICAgLy8gSWYgYSBjbGljayBvbiB0aGUgdHlwZWFoZWFkIGlzIGluIHByb2dyZXNzLCBkb24ndCBkbyBhbnl0aGluZy5cclxuICAgICAgICAvLyBUaGlzIHdvcmtzIGFyb3VuZCBhbiBpc3N1ZSBpbiBJRSB3aGVyZSBjbGlja2luZyBhIHNjcm9sbGJhciBkcm9wcyBmb2N1cy5cclxuICAgICAgICBpZiAodGhpcy50eXBlYWhlYWQgJiYgdGhpcy50eXBlYWhlYWQuY2xpY2tpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2xvc2UgdGhlIGRyb3Bkb3duIG9uIGJsdXJcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnModGhpcy5fZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlYWhlYWQub3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMjAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0YWdDbGlja0hhbmRsZXIoZXZlbnQ6IE1vdXNlRXZlbnQsIHRhZzogYW55LCBpbmRleDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAvLyBTZW5kIHRhZ0NsaWNrIGV2ZW50XHJcbiAgICAgICAgY29uc3QgdGFnQ2xpY2tFdmVudCA9IG5ldyBUYWdJbnB1dEV2ZW50KHRhZyk7XHJcbiAgICAgICAgdGhpcy50YWdDbGljay5lbWl0KHRhZ0NsaWNrRXZlbnQpO1xyXG5cclxuICAgICAgICAvLyBQcmV2ZW50IGZvY3VzIGlmIHByZXZlbnREZWZhdWx0KCkgd2FzIGNhbGxlZFxyXG4gICAgICAgIGlmICh0YWdDbGlja0V2ZW50LmRlZmF1bHRQcmV2ZW50ZWQoKSkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZWxlY3QgdGhlIHRhZyAoZm9yIElFIHRoYXQgZG9lc24ndCBwcm9wYWdhdGUgZm9jdXMpXHJcbiAgICAgICAgdGhpcy5zZWxlY3RUYWdBdChpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRDbGlja0hhbmRsZXIoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50eXBlYWhlYWQgJiYgdGhpcy5zaG93VHlwZWFoZWFkT25DbGljaykge1xyXG4gICAgICAgICAgICB0aGlzLnR5cGVhaGVhZC5vcGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRGb2N1c0hhbmRsZXIoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdElucHV0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRQYXN0ZUhhbmRsZXIoZXZlbnQ6IENsaXBib2FyZEV2ZW50KSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5hZGRPblBhc3RlKSB7XHJcbiAgICAgICAgICAgIC8vIEdldCB0ZXh0IGZyb20gdGhlIGNsaXBib2FyZFxyXG4gICAgICAgICAgICBsZXQgaW5wdXQ6IHN0cmluZyA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5jbGlwYm9hcmREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCg8YW55PndpbmRvdykuY2xpcGJvYXJkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgb25seVxyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSAoPGFueT53aW5kb3cpLmNsaXBib2FyZERhdGEuZ2V0RGF0YSgnVGV4dCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDb21taXQgdGhlIGNsaXBib2FyZCB0ZXh0IGRpcmVjdGx5XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbW1pdChpbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SW5wdXQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0eXBlYWhlYWRPcHRpb25TZWxlY3RlZEhhbmRsZXIoZXZlbnQ6IFR5cGVhaGVhZE9wdGlvbkV2ZW50KSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAvLyBXaGVuIHRoZSB0eXBlYWhlYWQgc2VuZHMgdGhlIG9wdGlvblNlbGVjdGVkIGV2ZW50LCBjb21taXQgdGhlIG9iamVjdCBkaXJlY3RseVxyXG4gICAgICAgIHRoaXMuY29tbWl0VHlwZWFoZWFkKGV2ZW50Lm9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21taXQgdGhlIGN1cnJlbnQgaW5wdXQgdmFsdWUgYW5kIGNsZWFyIHRoZSBpbnB1dCBmaWVsZCBpZiBzdWNjZXNzZnVsLlxyXG4gICAgICovXHJcbiAgICBjb21taXRJbnB1dCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jb21taXQodGhpcy5pbnB1dCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RJbnB1dCgpO1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0ID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tbWl0IHRoZSBnaXZlbiB0YWcgb2JqZWN0IGFuZCBjbGVhciB0aGUgaW5wdXQgaWYgc3VjY2Vzc2Z1bC5cclxuICAgICAqL1xyXG4gICAgY29tbWl0VHlwZWFoZWFkKHRhZzogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRkVGFnKHRhZykpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RJbnB1dCgpO1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0ID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tbWl0IHRoZSBnaXZlbiBzdHJpbmcgdmFsdWUgYXMgb25lIG9yIG1vcmUgdGFncywgaWYgdmFsaWRhdGlvbiBwYXNzZXMuIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFnKHMpIHdlcmUgY3JlYXRlZC5cclxuICAgICAqL1xyXG4gICAgY29tbWl0KGlucHV0OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoaW5wdXQgJiYgdGhpcy5mcmVlSW5wdXQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFNwbGl0IHRoZSB0YWdzIGJ5IHRoZSB0YWdEZWxpbWl0ZXJzIGlmIGNvbmZpZ3VyZWRcclxuICAgICAgICAgICAgY29uc3QgbmV3VGFncyA9IHRoaXMuc3BsaXRUYWdJbnB1dChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayB0YWcgdmFsaWRhdGlvbiBmb3IgYWxsIG9mIHRoZSBpbmRpdmlkdWFsIHZhbHVlc1xyXG4gICAgICAgICAgICBsZXQgYWxsVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBuZXdUYWcgb2YgbmV3VGFncykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWQgPSB0aGlzLnZhbGlkYXRlVGFnKG5ld1RhZyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHRoZSB0YWdzIGlmIGFsbCBhcmUgdmFsaWRcclxuICAgICAgICAgICAgaWYgKGFsbFZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBuZXdUYWcgb2YgbmV3VGFncykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVGFnKHRoaXMuY3JlYXRlVGFnKG5ld1RhZykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBubyB0YWcgaXMgc2VsZWN0ZWQsIHNlbGVjdCB0aGUgcmlnaHRtb3N0IHRhZy4gSWYgYSB0YWcgaXMgc2VsZWN0ZWQsIHJlbW92ZSBpdC5cclxuICAgICAqL1xyXG4gICAgYmFja3NwYWNlKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWRUYWdJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFnQXQodGhpcy50YWdzLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVGFnQXQodGhpcy5zZWxlY3RlZEluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlIHRoZSBoaWdobGlnaHRlZCBvcHRpb24gZm9yd2FyZHMgb3IgYmFja3dhcmRzIGluIHRoZSBsaXN0LiBXcmFwcyBhdCB0aGUgbGltaXRzLlxyXG4gICAgICogQHBhcmFtIGQgVmFsdWUgdG8gYmUgYWRkZWQgdG8gdGhlIHNlbGVjdGVkIGluZGV4LCBpLmUuIC0xIHRvIG1vdmUgYmFja3dhcmRzLCArMSB0byBtb3ZlIGZvcndhcmRzLlxyXG4gICAgICovXHJcbiAgICBtb3ZlU2VsZWN0aW9uKGQ6IG51bWJlcikge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFNlbGVjdEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ICs9IGQ7XHJcblxyXG4gICAgICAgICAgICAvLyBEbyB3cmFwcGluZyBvZiBzZWxlY3Rpb24gd2hlbiBvdXQgb2YgYm91bmRzXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLnRhZ3MubGVuZ3RoO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCA+IHRoaXMudGFncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgdmFsdWUgdG8gZGlzcGxheSBmb3IgdGhlIGdpdmVuIHRhZy4gVXNlcyBkaXNwbGF5IGZ1bmN0aW9uL3Byb3BlcnR5IG5hbWUgaWYgc2V0LCBvdGhlcndpc2UgYXNzdW1lcyB0aGF0IHRoZSB0YWcgaXMgYSBzaW1wbGUgc3RyaW5nLlxyXG4gICAgICovXHJcbiAgICBnZXRUYWdEaXNwbGF5KHRhZzogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5KHRhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kaXNwbGF5ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFnWzxzdHJpbmc+dGhpcy5kaXNwbGF5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gaW5kZXggaXMgc2VsZWN0ZWQgKHRhZyBpbmRleCBvciBpbnB1dCBmaWVsZCkuXHJcbiAgICAgKi9cclxuICAgIGlzU2VsZWN0ZWQoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBpbmRleCA9PT0gdGhpcy5zZWxlY3RlZEluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0IHRoZSB0YWcgYXQgdGhlIGdpdmVuIGluZGV4LiBEb2VzIG5vdGhpbmcgaWYgZGlzYWJsZWQgaXMgdHJ1ZS5cclxuICAgICAqL1xyXG4gICAgc2VsZWN0VGFnQXQodGFnSW5kZXg6IG51bWJlcikge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFRhZ0luZGV4KHRhZ0luZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0YWdJbmRleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3QgdGhlIGlucHV0IGZpZWxkLCBnaXZpbmcgaXQgZm9jdXMuIERvZXMgbm90aGluZyBpZiBkaXNhYmxlZCBpcyB0cnVlLlxyXG4gICAgICovXHJcbiAgICBzZWxlY3RJbnB1dCgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMudGFncy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgdGhlIHRhZyBhdCB0aGUgZ2l2ZW4gaW5kZXguIERvZXMgbm90aGluZyBpZiBkaXNhYmxlZCBpcyB0cnVlIG9yIHRoZSBtaW5UYWdzIHByb3BlcnR5IHByZXZlbnRzIHJlbW92YWwuXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVRhZ0F0KHRhZ0luZGV4OiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgIXRoaXMuY2FuUmVtb3ZlVGFnQXQodGFnSW5kZXgpKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayB0aGF0IHRoZSB0YWdJbmRleCBpcyBpbiByYW5nZVxyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWRUYWdJbmRleCh0YWdJbmRleCkpIHtcclxuICAgICAgICAgICAgY29uc3QgdGFnID0gdGhpcy50YWdzW3RhZ0luZGV4XTtcclxuICAgICAgICAgICAgY29uc3QgdGFnUmVtb3ZpbmdFdmVudCA9IG5ldyBUYWdJbnB1dEV2ZW50KHRhZyk7XHJcbiAgICAgICAgICAgIHRoaXMudGFnUmVtb3ZpbmcuZW1pdCh0YWdSZW1vdmluZ0V2ZW50KTtcclxuICAgICAgICAgICAgaWYgKCF0YWdSZW1vdmluZ0V2ZW50LmRlZmF1bHRQcmV2ZW50ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gU2VsZWN0IGlucHV0IGZpcnN0IHRvIGF2b2lkIGlzc3VlcyB3aXRoIGRyb3BwaW5nIGZvY3VzXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdElucHV0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHRhZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdzLnNwbGljZSh0YWdJbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgZm9jdXMgYWdhaW4gc2luY2UgaW5kaWNlcyBoYXZlIGNoYW5nZWRcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SW5wdXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnUmVtb3ZlZC5lbWl0KG5ldyBUYWdJbnB1dEV2ZW50KHRhZykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB0YWcgYXQgdGhlIGdpdmVuIGluZGV4IGNhbiBiZSByZW1vdmVkLlxyXG4gICAgICovXHJcbiAgICBjYW5SZW1vdmVUYWdBdCh0YWdJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFncy5sZW5ndGggPiB0aGlzLm1pblRhZ3MgfHwgIXRoaXMuZW5mb3JjZVRhZ0xpbWl0cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaW5wdXQgZmllbGQgc2hvdWxkIGJlIGF2YWlsYWJsZS5cclxuICAgICAqL1xyXG4gICAgaXNJbnB1dFZpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFncy5sZW5ndGggPCB0aGlzLm1heFRhZ3MgfHwgIXRoaXMuZW5mb3JjZVRhZ0xpbWl0cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBhbnkgcGFydCBvZiB0aGUgY29udHJvbCBoYXMgZm9jdXMuXHJcbiAgICAgKi9cclxuICAgIGhhc0ZvY3VzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWRTZWxlY3RJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29ubmVjdFR5cGVhaGVhZCh0eXBlYWhlYWQ6IFR5cGVhaGVhZENvbXBvbmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLl90eXBlYWhlYWRTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5fdHlwZWFoZWFkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3R5cGVhaGVhZFN1YnNjcmlwdGlvbiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnR5cGVhaGVhZCA9IHR5cGVhaGVhZDtcclxuICAgICAgICBpZiAodGhpcy50eXBlYWhlYWQpIHtcclxuICAgICAgICAgICAgLy8gU2V0IHVwIGV2ZW50IGhhbmRsZXIgZm9yIHNlbGVjdGVkIG9wdGlvbnNcclxuICAgICAgICAgICAgdGhpcy5fdHlwZWFoZWFkU3Vic2NyaXB0aW9uID0gdGhpcy50eXBlYWhlYWQub3B0aW9uU2VsZWN0ZWQuc3Vic2NyaWJlKHRoaXMudHlwZWFoZWFkT3B0aW9uU2VsZWN0ZWRIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHVwIGV2ZW50IGhhbmRsZXIgZm9yIHRoZSBoaWdobGlnaHRlZCBlbGVtZW50XHJcbiAgICAgICAgICAgIC8vIEFkZGVkIGEgZGVsYXkgdG8gbW92ZSBpdCBvdXQgb2YgdGhlIGN1cnJlbnQgY2hhbmdlIGRldGVjdGlvbiBjeWNsZVxyXG4gICAgICAgICAgICBpZiAodGhpcy50cmFja0FyaWFEZXNjZW5kYW50KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl90eXBlYWhlYWRTdWJzY3JpcHRpb24uYWRkKFxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkLmhpZ2hsaWdodGVkRWxlbWVudENoYW5nZS5zdWJzY3JpYmUoKGVsZW1lbnQ6IEhUTUxFbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRFbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZhbGlkYXRlIHRoZSBnaXZlbiB0YWdWYWx1ZSB3aXRoIHRoZSB0YWdQYXR0ZXJuLCBpZiBzZXQuIFVwZGF0ZSB2YWxpZGF0aW9uRXJyb3JzIG9uIHZhbGlkYXRpb24gZmFpbHVyZS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZVRhZyh0YWdWYWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGlucHV0UGF0dGVybiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pbnB1dFZhbGlkID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy50YWdQYXR0ZXJuICYmICF0aGlzLnRhZ1BhdHRlcm4udGVzdCh0YWdWYWx1ZSkpIHtcclxuICAgICAgICAgICAgaW5wdXRQYXR0ZXJuID0ge1xyXG4gICAgICAgICAgICAgICAgZ2l2ZW46IHRhZ1ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgcGF0dGVybjogdGhpcy50YWdQYXR0ZXJuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnNbJ2lucHV0UGF0dGVybiddID0gaW5wdXRQYXR0ZXJuO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0VmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSB0YWcgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gdGFnVmFsdWUuIElmIGNyZWF0ZVRhZ0hhbmRsZXIgaXMgc3BlY2lmaWVkLCB1c2UgaXQ7IG90aGVyd2lzZSBpZiBkaXNwbGF5UHJvcGVydHkgaXMgc3BlY2lmaWVkLCBjcmVhdGUgYW4gb2JqZWN0IHdpdGggdGhlIHRhZ1ZhbHVlIGFzIHRoZSBzaW5nbGUgbmFtZWQgcHJvcGVydHk7IG90aGVyd2lzZSByZXR1cm4gdGhlIHRhZ1ZhbHVlIGl0c2VsZi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVUYWcodGFnVmFsdWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgbGV0IHRhZyA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuY3JlYXRlVGFnSGFuZGxlciAmJiB0eXBlb2YgdGhpcy5jcmVhdGVUYWdIYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRhZyA9IHRoaXMuY3JlYXRlVGFnSGFuZGxlcih0YWdWYWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5kaXNwbGF5ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0YWcgPSB7fTtcclxuICAgICAgICAgICAgdGFnWzxzdHJpbmc+dGhpcy5kaXNwbGF5XSA9IHRhZ1ZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRhZyA9IHRhZ1ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgdGFnIG9iamVjdCwgY2FsbGluZyB0aGUgdGFnQWRkaW5nIGFuZCB0YWdBZGRlZCBldmVudHMuIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFnIHdhcyBhZGRlZCB0byB0aGUgdGFncyBhcnJheS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUYWcodGFnOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGFnKSB7XHJcbiAgICAgICAgICAgIC8vIFZlcmlmeSB0aGF0IHRoZSBuZXcgdGFnIGNhbiBiZSBkaXNwbGF5ZWRcclxuICAgICAgICAgICAgY29uc3QgZGlzcGxheVZhbHVlID0gdGhpcy5nZXRUYWdEaXNwbGF5KHRhZyk7XHJcbiAgICAgICAgICAgIGlmIChkaXNwbGF5VmFsdWUgJiYgdHlwZW9mIGRpc3BsYXlWYWx1ZSA9PT0gJ3N0cmluZycgJiYgZGlzcGxheVZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhZ0FkZGluZ0V2ZW50ID0gbmV3IFRhZ0lucHV0RXZlbnQodGFnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnQWRkaW5nLmVtaXQodGFnQWRkaW5nRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0YWdBZGRpbmdFdmVudC5kZWZhdWx0UHJldmVudGVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ3MgPSB0aGlzLnRhZ3MgfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdzLnB1c2godGFnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ0FkZGVkLmVtaXQobmV3IFRhZ0lucHV0RXZlbnQodGFnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHRhZ0luZGV4IGlzIGEgdmFsaWQgdGFnIGluZGV4LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzVmFsaWRUYWdJbmRleCh0YWdJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRhZ0luZGV4ID49IDAgJiYgdGFnSW5kZXggPCB0aGlzLnRhZ3MubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBpbmRleCBpcyBhIHZhbGlkIHNlbGVjdGlvbiBpbmRleCAodGFncyBvciBpbnB1dCBmaWVsZCkuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNWYWxpZFNlbGVjdEluZGV4KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gaW5kZXggPj0gMCAmJiBpbmRleCA8PSB0aGlzLnRhZ3MubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY2hhcmFjdGVyIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGdpdmVuIGtleSBldmVudCwgbWFpbmx5IGZvciBJRSBjb21wYXRpYmlsaXR5LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEtleUNoYXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBzdHJpbmcge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlYmFyJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnICc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBldmVudC5rZXk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHN0cmluZ3MgY29ycmVzcG9uZGluZyB0byB0aGUgaW5wdXQgc3RyaW5nIHNwbGl0IGJ5IHRoZSB0YWdEZWxpbWl0ZXJzIGNoYXJhY3RlcnMuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3BsaXRUYWdJbnB1dChpbnB1dDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGxldCB0YWdWYWx1ZXMgPSBbaW5wdXRdO1xyXG4gICAgICAgIGlmICh0aGlzLnRhZ0RlbGltaXRlcnMgJiYgdHlwZW9mIHRoaXMudGFnRGVsaW1pdGVycyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY29uc3QgZXNjYXBlZERlbGltaXRlcnMgPSB0aGlzLnRhZ0RlbGltaXRlcnMucmVwbGFjZSgvWy1cXC9cXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGltaXRlclJlZ2V4ID0gbmV3IFJlZ0V4cChgWyR7ZXNjYXBlZERlbGltaXRlcnN9XWAsICdnJyk7XHJcbiAgICAgICAgICAgIHRhZ1ZhbHVlcyA9IGlucHV0LnNwbGl0KGRlbGltaXRlclJlZ2V4KS5maWx0ZXIoKHMpID0+IHMubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0YWdWYWx1ZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgQVBJIGF2YWlsYWJsZSB0byB0YWcgdGVtcGxhdGVzLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUYWdBcGkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBnaXZlbiB0YWcsIGFjY29yZGluZyB0byB0aGUgZGlzcGxheVByb3BlcnR5IHByb3BlcnR5LlxyXG4gICAgICovXHJcbiAgICBnZXRUYWdEaXNwbGF5OiAodGFnOiBhbnkpID0+IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHRhZyBhdCB0aGUgZ2l2ZW4gaW5kZXgsIGlmIHBvc3NpYmxlLlxyXG4gICAgICovXHJcbiAgICByZW1vdmVUYWdBdDogKGluZGV4OiBudW1iZXIpID0+IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFnIGF0IHRoZSBnaXZlbiBpbmRleCBjYW4gYmUgcmVtb3ZlZC5cclxuICAgICAqL1xyXG4gICAgY2FuUmVtb3ZlVGFnQXQ6IChpbmRleDogbnVtYmVyKSA9PiBib29sZWFuO1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIGZ1bmN0aW9uIHVzZWQgdG8gcmV0dXJuIGN1c3RvbSBjbGFzcyBpbmZvcm1hdGlvbiwgZm9yIHVzZSBpbiBgbmdDbGFzc2AuXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBUYWdDbGFzc0Z1bmN0aW9uID0gKHRhZzogYW55LCBpbmRleDogbnVtYmVyLCBzZWxlY3RlZDogYm9vbGVhbikgPT4gKHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4pOyJdfQ==