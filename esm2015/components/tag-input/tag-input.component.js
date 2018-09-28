/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { BACKSPACE, DELETE, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import { DOCUMENT } from '@angular/common';
import { Component, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Inject, Input, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { tick } from '../../common/index';
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
        this._onChangeHandler = () => { };
        this._onTouchedHandler = () => { };
        this._onDestroy = new Subject();
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
        this.typeaheadQuery.changes.pipe(takeUntil(this._onDestroy))
            .subscribe((query) => this.connectTypeahead(query.first));
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
     * @return {?}
     */
    ngOnDestroy() {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
        this._onDestroy.next();
        this._onDestroy.complete();
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
     * Set focus on the input field.
     * @return {?}
     */
    focus() {
        if (this.tagInput) {
            this.tagInput.nativeElement.focus();
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
    }
    /**
     * @return {?}
     */
    focusOutHandler() {
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
     * @param {?} delta Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     * @return {?}
     */
    moveSelection(delta) {
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
                .subscribe((element) => this.highlightedElement = element));
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
        switch (event.which) {
            case SPACE:
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
    focusOutHandler: [{ type: HostListener, args: ['focusout',] }]
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhZy1pbnB1dC90YWctaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBRSxLQUFLLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSx1QkFBdUIsQ0FBQztBQUNqRyxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDM0MsT0FBTyxFQUFvQixTQUFTLEVBQUUsZUFBZSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLFdBQVcsRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFFLFNBQVMsRUFBaUIsV0FBVyxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNyUCxPQUFPLEVBQXdCLGFBQWEsRUFBRSxpQkFBaUIsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hGLE9BQU8sRUFBRSxTQUFTLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUMzQyxPQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sY0FBYyxDQUFDO0FBRXZDLE9BQU8sRUFBRSxJQUFJLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUMxQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU3RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbEQscUJBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQUVqQix1QkFBTSx1QkFBdUIsR0FBRztJQUM1QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsR0FBRyxFQUFFLENBQUMsaUJBQWlCLENBQUM7SUFDaEQsS0FBSyxF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QztTQUN2RTtRQUNELE1BQU0sQ0FBQyxTQUFTLENBQUM7Ozs7WUF6bkJ4QixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLFFBQVEsRUFBRSxjQUFjO2dCQUN4QiwrN0RBQXVDO2dCQUN2QyxTQUFTLEVBQUUsQ0FBQyx1QkFBdUIsRUFBRSxrQkFBa0IsQ0FBQztnQkFDeEQsSUFBSSxFQUFFO29CQUNGLGtCQUFrQixFQUFFLFVBQVU7b0JBQzlCLGVBQWUsRUFBRSxZQUFZO29CQUM3QixpQkFBaUIsRUFBRSx1QkFBdUI7aUJBQzdDO2FBQ0o7Ozs7WUFqQ3NELFVBQVU7NENBeUh4RCxNQUFNLFNBQUMsUUFBUTtZQW5ISyxtQkFBbUI7OztpQkE4QjNDLEtBQUssWUFBSSxXQUFXLFNBQUMsU0FBUzttQkFFOUIsS0FBSyxTQUFDLE1BQU07eUJBYVosTUFBTTtvQkFFTixLQUFLLFNBQUMsT0FBTzswQkFTYixNQUFNO3NCQUVOLEtBQUs7eUJBQ0wsS0FBSzt1QkFDTCxLQUFLOytCQUNMLEtBQUs7d0JBQ0wsS0FBSztzQkFDTCxLQUFLO3NCQUNMLEtBQUs7MEJBQ0wsS0FBSzttQ0FDTCxLQUFLOzRCQUNMLEtBQUs7eUJBQ0wsS0FBSzswQkFDTCxLQUFLO3VCQUNMLEtBQUs7K0JBQ0wsS0FBSzsrQkFDTCxLQUFLLFNBQUMsV0FBVztrQ0FNakIsS0FBSzt3QkFFTCxNQUFNO3VCQUNOLE1BQU07NkJBQ04sTUFBTTswQkFDTixNQUFNO3lCQUNOLE1BQU07dUJBQ04sTUFBTTs2QkFFTixlQUFlLFNBQUMsa0JBQWtCO3VCQUVsQyxTQUFTLFNBQUMsVUFBVTtrQ0FFcEIsU0FBUyxTQUFDLG9CQUFvQjt5QkE2RzlCLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7OEJBMkVsQyxZQUFZLFNBQUMsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEJBQ0tTUEFDRSwgREVMRVRFLCBFTlRFUiwgTEVGVF9BUlJPVywgUklHSFRfQVJST1csIFNQQUNFIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2tleWNvZGVzJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xyXG5pbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcclxuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XHJcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcclxuaW1wb3J0IHsgdGljayB9IGZyb20gJy4uLy4uL2NvbW1vbi9pbmRleCc7XHJcbmltcG9ydCB7IFR5cGVhaGVhZENvbXBvbmVudCwgVHlwZWFoZWFkS2V5U2VydmljZSB9IGZyb20gJy4uL3R5cGVhaGVhZC9pbmRleCc7XHJcbmltcG9ydCB7IFR5cGVhaGVhZE9wdGlvbkV2ZW50IH0gZnJvbSAnLi4vdHlwZWFoZWFkL3R5cGVhaGVhZC1ldmVudCc7XHJcbmltcG9ydCB7IFRhZ0lucHV0RXZlbnQgfSBmcm9tICcuL3RhZy1pbnB1dC1ldmVudCc7XHJcblxyXG5sZXQgdW5pcXVlSWQgPSAwO1xyXG5cclxuY29uc3QgVEFHSU5QVVRfVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRhZ0lucHV0Q29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcbmNvbnN0IFRBR0lOUFVUX1ZBTElEQVRPUiA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUYWdJbnB1dENvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3V4LXRhZy1pbnB1dCcsXHJcbiAgICBleHBvcnRBczogJ3V4LXRhZy1pbnB1dCcsXHJcbiAgICB0ZW1wbGF0ZVVybDogJ3RhZy1pbnB1dC5jb21wb25lbnQuaHRtbCcsXHJcbiAgICBwcm92aWRlcnM6IFtUQUdJTlBVVF9WQUxVRV9BQ0NFU1NPUiwgVEFHSU5QVVRfVkFMSURBVE9SXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnW2NsYXNzLmRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXHJcbiAgICAgICAgJ1tjbGFzcy5mb2N1c10nOiAnaGFzRm9jdXMoKScsXHJcbiAgICAgICAgJ1tjbGFzcy5pbnZhbGlkXSc6ICchdmFsaWQgfHwgIWlucHV0VmFsaWQnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2F0dHIuaWQnKSBpZDogc3RyaW5nID0gYHV4LXRhZy1pbnB1dC0keysrdW5pcXVlSWR9YDtcclxuXHJcbiAgICBASW5wdXQoJ3RhZ3MnKVxyXG4gICAgZ2V0IHRhZ3MoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl90YWdzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhZ3MgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhZ3M7XHJcbiAgICB9XHJcbiAgICBzZXQgdGFncyh2YWx1ZTogYW55W10pIHtcclxuICAgICAgICB0aGlzLl90YWdzID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fb25DaGFuZ2VIYW5kbGVyKHRoaXMuX3RhZ3MpO1xyXG4gICAgICAgIHRoaXMudGFnc0NoYW5nZS5lbWl0KHRoaXMuX3RhZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIEBPdXRwdXQoKSB0YWdzQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcclxuXHJcbiAgICBASW5wdXQoJ2lucHV0JylcclxuICAgIGdldCBpbnB1dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXQ7XHJcbiAgICB9XHJcbiAgICBzZXQgaW5wdXQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2lucHV0ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5pbnB1dENoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBAT3V0cHV0KCkgaW5wdXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgICBASW5wdXQoKSBkaXNwbGF5OiAob3B0aW9uOiBhbnkpID0+IHN0cmluZyB8IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGFkZE9uUGFzdGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGVuZm9yY2VUYWdMaW1pdHM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGZyZWVJbnB1dDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBASW5wdXQoKSBtYXhUYWdzOiBudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gICAgQElucHV0KCkgbWluVGFnczogbnVtYmVyID0gMDtcclxuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcclxuICAgIEBJbnB1dCgpIHNob3dUeXBlYWhlYWRPbkNsaWNrOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSB0YWdEZWxpbWl0ZXJzOiBzdHJpbmcgPSAnJztcclxuICAgIEBJbnB1dCgpIHRhZ1BhdHRlcm46IFJlZ0V4cDtcclxuICAgIEBJbnB1dCgpIHRhZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQElucHV0KCkgdGFnQ2xhc3M6IFRhZ0NsYXNzRnVuY3Rpb24gPSAoKSA9PiB1bmRlZmluZWQ7XHJcbiAgICBASW5wdXQoKSB2YWxpZGF0aW9uRXJyb3JzOiBhbnkgPSB7fTtcclxuICAgIEBJbnB1dCgnY3JlYXRlVGFnJykgY3JlYXRlVGFnSGFuZGxlcjogKHZhbHVlOiBzdHJpbmcpID0+IGFueTtcclxuXHJcbiAgICAvKipcclxuICAgICAqIEBkZXByZWNhdGVkXHJcbiAgICAgKiBXb3JrYXJvdW5kIGZvciBFTC0zMjI0IC0gTm8gbG9uZ2VyIG5lZWRlZFxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKSB0cmFja0FyaWFEZXNjZW5kYW50OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBAT3V0cHV0KCkgdGFnQWRkaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ0FkZGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ0ludmFsaWRhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ1JlbW92aW5nID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ1JlbW92ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ0lucHV0RXZlbnQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgdGFnQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ0lucHV0RXZlbnQ+KCk7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZHJlbihUeXBlYWhlYWRDb21wb25lbnQpIHR5cGVhaGVhZFF1ZXJ5OiBRdWVyeUxpc3Q8VHlwZWFoZWFkQ29tcG9uZW50PjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCd0YWdJbnB1dCcpIHRhZ0lucHV0OiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2RlZmF1bHRUYWdUZW1wbGF0ZScpIHByaXZhdGUgX2RlZmF1bHRUYWdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAtMTtcclxuXHJcbiAgICB0YWdBcGk6IFRhZ0FwaSA9IHtcclxuICAgICAgICBnZXRUYWdEaXNwbGF5OiB0aGlzLmdldFRhZ0Rpc3BsYXkuYmluZCh0aGlzKSxcclxuICAgICAgICByZW1vdmVUYWdBdDogdGhpcy5yZW1vdmVUYWdBdC5iaW5kKHRoaXMpLFxyXG4gICAgICAgIGNhblJlbW92ZVRhZ0F0OiB0aGlzLmNhblJlbW92ZVRhZ0F0LmJpbmQodGhpcylcclxuICAgIH07XHJcblxyXG4gICAgdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgaW5wdXRWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICB0eXBlYWhlYWQ6IFR5cGVhaGVhZENvbXBvbmVudDtcclxuICAgIGhpZ2hsaWdodGVkRWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5wdXQ6IHN0cmluZyA9ICcnO1xyXG4gICAgcHJpdmF0ZSBfdGFnczogYW55W10gPSBbXTtcclxuICAgIHByaXZhdGUgX29uQ2hhbmdlSGFuZGxlcjogKF86IGFueSkgPT4gdm9pZCA9ICgpID0+IHsgfTtcclxuICAgIHByaXZhdGUgX29uVG91Y2hlZEhhbmRsZXI6ICgpID0+IHZvaWQgPSAoKSA9PiB7IH07XHJcbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuICAgIHByaXZhdGUgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IoXHJcbiAgICAgICAgcHJpdmF0ZSBfZWxlbWVudDogRWxlbWVudFJlZixcclxuICAgICAgICBASW5qZWN0KERPQ1VNRU5UKSBwcml2YXRlIF9kb2N1bWVudDogYW55LFxyXG4gICAgICAgIHByaXZhdGUgX3R5cGVhaGVhZEtleVNlcnZpY2U6IFR5cGVhaGVhZEtleVNlcnZpY2UpIHsgfVxyXG5cclxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICghdGhpcy50YWdUZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ1RlbXBsYXRlID0gdGhpcy5fZGVmYXVsdFRhZ1RlbXBsYXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XHJcbiAgICAgICAgLy8gV2F0Y2ggZm9yIG9wdGlvbmFsIGNoaWxkIHR5cGVhaGVhZCBjb250cm9sXHJcbiAgICAgICAgdGhpcy5jb25uZWN0VHlwZWFoZWFkKHRoaXMudHlwZWFoZWFkUXVlcnkuZmlyc3QpO1xyXG5cclxuICAgICAgICB0aGlzLnR5cGVhaGVhZFF1ZXJ5LmNoYW5nZXMucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSlcclxuICAgICAgICAgICAgLnN1YnNjcmliZSgocXVlcnkpID0+IHRoaXMuY29ubmVjdFR5cGVhaGVhZChxdWVyeS5maXJzdCkpO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcclxuICAgICAgICBpZiAoY2hhbmdlcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBpZiAoY2hhbmdlcy5kaXNhYmxlZC5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vIENsZWFyIHNlbGVjdGlvbiBhbmQgY2xvc2UgZHJvcGRvd25cclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlYWhlYWQub3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdmFsaWRhdGlvbiBzdGF0dXNcclxuICAgICAgICB0aGlzLnZhbGlkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XHJcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55W10pOiB2b2lkIHtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy50YWdzID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlSGFuZGxlciA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLl9vblRvdWNoZWRIYW5kbGVyID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZXQgZm9jdXMgb24gdGhlIGlucHV0IGZpZWxkLlxyXG4gICAgICovXHJcbiAgICBmb2N1cygpOiB2b2lkIHtcclxuICAgICAgICBpZiAodGhpcy50YWdJbnB1dCkge1xyXG4gICAgICAgICAgICB0aGlzLnRhZ0lucHV0Lm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZSB0aGUgdmFsdWUgb2YgdGhlIGNvbnRyb2wgKHRhZ3MgcHJvcGVydHkpLlxyXG4gICAgICovXHJcbiAgICB2YWxpZGF0ZSgpOiB2b2lkIHtcclxuICAgICAgICB0aGlzLnZhbGlkID0gdHJ1ZTtcclxuICAgICAgICBsZXQgdGFnUmFuZ2VFcnJvciA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMudGFncyAmJiAodGhpcy50YWdzLmxlbmd0aCA8IHRoaXMubWluVGFncyB8fCB0aGlzLnRhZ3MubGVuZ3RoID4gdGhpcy5tYXhUYWdzKSkge1xyXG4gICAgICAgICAgICB0YWdSYW5nZUVycm9yID0ge1xyXG4gICAgICAgICAgICAgICAgZ2l2ZW46IHRoaXMudGFncy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGFncyxcclxuICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUYWdzXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JzWyd0YWdSYW5nZUVycm9yJ10gPSB0YWdSYW5nZUVycm9yO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxyXG4gICAga2V5SGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBpbnB1dCBmaWVsZCBjdXJzb3IgbG9jYXRpb25cclxuICAgICAgICBjb25zdCBpbnB1dEN1cnNvclBvcyA9IHRoaXMudGFnSW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBpbnB1dCBmaWVsZCBoYXMgYW55IHRleHQgc2VsZWN0ZWRcclxuICAgICAgICBjb25zdCBoYXNTZWxlY3Rpb24gPSB0aGlzLnRhZ0lucHV0Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgIT09IHRoaXMudGFnSW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQ7XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSBpZiBhIHRhZyBoYXMgZm9jdXNcclxuICAgICAgICBjb25zdCB0YWdTZWxlY3RlZCA9IHRoaXMuaXNWYWxpZFRhZ0luZGV4KHRoaXMuc2VsZWN0ZWRJbmRleCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGlucHV0TGVuZ3RoID0gdGhpcy5pbnB1dCA/IHRoaXMuaW5wdXQubGVuZ3RoIDogMDtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgYXJyb3cga2V5cyBjYW4gbW92ZSB0aGUgc2VsZWN0aW9uLiBPdGhlcndpc2UgdGhlIGlucHV0IGZpZWxkIHRha2VzIHRoZSBldmVudC5cclxuICAgICAgICBjb25zdCBjYW5OYXZpZ2F0ZUxlZnQgPSB0YWdTZWxlY3RlZCB8fCAoaW5wdXRDdXJzb3JQb3MgPD0gMCAmJiAhaGFzU2VsZWN0aW9uKTtcclxuICAgICAgICBjb25zdCBjYW5OYXZpZ2F0ZVJpZ2h0ID0gdGFnU2VsZWN0ZWQgfHwgKGlucHV0Q3Vyc29yUG9zID49IGlucHV0TGVuZ3RoICYmICFoYXNTZWxlY3Rpb24pO1xyXG5cclxuICAgICAgICAvLyBGb3J3YXJkIGtleSBldmVudHMgdG8gdGhlIHR5cGVhaGVhZCBjb21wb25lbnQuXHJcbiAgICAgICAgdGhpcy5fdHlwZWFoZWFkS2V5U2VydmljZS5oYW5kbGVLZXkoZXZlbnQsIHRoaXMudHlwZWFoZWFkKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xyXG4gICAgICAgICAgICBjYXNlIEVOVEVSOlxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYSB0eXBlYWhlYWQgb3B0aW9uIGlzIGhpZ2hsaWdodGVkXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlYWhlYWQgJiYgdGhpcy50eXBlYWhlYWQub3BlbiAmJiB0aGlzLnR5cGVhaGVhZC5oaWdobGlnaHRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgdHlwZWFoZWFkIG9wdGlvbiBhcyBhIHRhZywgY2xlYXIgdGhlIGlucHV0LCBhbmQgY2xvc2UgdGhlIGRyb3Bkb3duXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21taXRUeXBlYWhlYWQodGhpcy50eXBlYWhlYWQuaGlnaGxpZ2h0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkLm9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVmFsaWRhdGUgYW5kIGFkZCB0aGUgaW5wdXQgdGV4dCBhcyBhIHRhZywgaWYgcG9zc2libGVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1pdElucHV0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIEJBQ0tTUEFDRTpcclxuICAgICAgICAgICAgICAgIGlmIChjYW5OYXZpZ2F0ZUxlZnQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmJhY2tzcGFjZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgREVMRVRFOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRhZ1NlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUYWdBdCh0aGlzLnNlbGVjdGVkSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIExFRlRfQVJST1c6XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FuTmF2aWdhdGVMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlU2VsZWN0aW9uKC0xKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFJJR0hUX0FSUk9XOlxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbk5hdmlnYXRlUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVTZWxlY3Rpb24oMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGtleXMgaW4gdGhlIHRhZ0RlbGltaXRlcnNcclxuICAgICAgICBpZiAodGhpcy50YWdEZWxpbWl0ZXJzICYmIHRoaXMudGFnRGVsaW1pdGVycy5pbmRleE9mKHRoaXMuZ2V0S2V5Q2hhcihldmVudCkpID49IDApIHtcclxuICAgICAgICAgICAgLy8gQ29tbWl0IHByZXZpb3VzIHRleHRcclxuICAgICAgICAgICAgdGhpcy5jb21taXRJbnB1dCgpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXNvdXQnKVxyXG4gICAgZm9jdXNPdXRIYW5kbGVyKCk6IHZvaWQge1xyXG5cclxuICAgICAgICAvLyBJZiBhIGNsaWNrIG9uIHRoZSB0eXBlYWhlYWQgaXMgaW4gcHJvZ3Jlc3MsIGRvbid0IGRvIGFueXRoaW5nLlxyXG4gICAgICAgIC8vIFRoaXMgd29ya3MgYXJvdW5kIGFuIGlzc3VlIGluIElFIHdoZXJlIGNsaWNraW5nIGEgc2Nyb2xsYmFyIGRyb3BzIGZvY3VzLlxyXG4gICAgICAgIGlmICh0aGlzLnR5cGVhaGVhZCAmJiB0aGlzLnR5cGVhaGVhZC5jbGlja2luZykge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDbG9zZSB0aGUgZHJvcGRvd24gb24gYmx1clxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnQubmF0aXZlRWxlbWVudC5jb250YWlucyh0aGlzLl9kb2N1bWVudC5hY3RpdmVFbGVtZW50KSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlYWhlYWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cGVhaGVhZC5vcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LCAyMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRhZ0NsaWNrSGFuZGxlcihldmVudDogTW91c2VFdmVudCwgdGFnOiBhbnksIGluZGV4OiBudW1iZXIpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIC8vIFNlbmQgdGFnQ2xpY2sgZXZlbnRcclxuICAgICAgICBjb25zdCB0YWdDbGlja0V2ZW50ID0gbmV3IFRhZ0lucHV0RXZlbnQodGFnKTtcclxuICAgICAgICB0aGlzLnRhZ0NsaWNrLmVtaXQodGFnQ2xpY2tFdmVudCk7XHJcblxyXG4gICAgICAgIC8vIFByZXZlbnQgZm9jdXMgaWYgcHJldmVudERlZmF1bHQoKSB3YXMgY2FsbGVkXHJcbiAgICAgICAgaWYgKHRhZ0NsaWNrRXZlbnQuZGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNlbGVjdCB0aGUgdGFnIChmb3IgSUUgdGhhdCBkb2Vzbid0IHByb3BhZ2F0ZSBmb2N1cylcclxuICAgICAgICB0aGlzLnNlbGVjdFRhZ0F0KGluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBpbnB1dENsaWNrSGFuZGxlcigpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnR5cGVhaGVhZCAmJiB0aGlzLnNob3dUeXBlYWhlYWRPbkNsaWNrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkLm9wZW4gPSB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBpbnB1dEZvY3VzSGFuZGxlcigpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RJbnB1dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0UGFzdGVIYW5kbGVyKGV2ZW50OiBDbGlwYm9hcmRFdmVudCk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYWRkT25QYXN0ZSkge1xyXG4gICAgICAgICAgICAvLyBHZXQgdGV4dCBmcm9tIHRoZSBjbGlwYm9hcmRcclxuICAgICAgICAgICAgbGV0IGlucHV0OiBzdHJpbmcgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuY2xpcGJvYXJkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSBldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQvcGxhaW4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgoPGFueT53aW5kb3cpLmNsaXBib2FyZERhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vIEludGVybmV0IEV4cGxvcmVyIG9ubHlcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gKDxhbnk+d2luZG93KS5jbGlwYm9hcmREYXRhLmdldERhdGEoJ1RleHQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ29tbWl0IHRoZSBjbGlwYm9hcmQgdGV4dCBkaXJlY3RseVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb21taXQoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdElucHV0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdHlwZWFoZWFkT3B0aW9uU2VsZWN0ZWRIYW5kbGVyKGV2ZW50OiBUeXBlYWhlYWRPcHRpb25FdmVudCk6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgLy8gV2hlbiB0aGUgdHlwZWFoZWFkIHNlbmRzIHRoZSBvcHRpb25TZWxlY3RlZCBldmVudCwgY29tbWl0IHRoZSBvYmplY3QgZGlyZWN0bHlcclxuICAgICAgICB0aGlzLmNvbW1pdFR5cGVhaGVhZChldmVudC5vcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tbWl0IHRoZSBjdXJyZW50IGlucHV0IHZhbHVlIGFuZCBjbGVhciB0aGUgaW5wdXQgZmllbGQgaWYgc3VjY2Vzc2Z1bC5cclxuICAgICAqL1xyXG4gICAgY29tbWl0SW5wdXQoKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tbWl0KHRoaXMuaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SW5wdXQoKTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dCA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbW1pdCB0aGUgZ2l2ZW4gdGFnIG9iamVjdCBhbmQgY2xlYXIgdGhlIGlucHV0IGlmIHN1Y2Nlc3NmdWwuXHJcbiAgICAgKi9cclxuICAgIGNvbW1pdFR5cGVhaGVhZCh0YWc6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLmFkZFRhZyh0YWcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SW5wdXQoKTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dCA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbW1pdCB0aGUgZ2l2ZW4gc3RyaW5nIHZhbHVlIGFzIG9uZSBvciBtb3JlIHRhZ3MsIGlmIHZhbGlkYXRpb24gcGFzc2VzLiBSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyhzKSB3ZXJlIGNyZWF0ZWQuXHJcbiAgICAgKi9cclxuICAgIGNvbW1pdChpbnB1dDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGlucHV0ICYmIHRoaXMuZnJlZUlucHV0KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBTcGxpdCB0aGUgdGFncyBieSB0aGUgdGFnRGVsaW1pdGVycyBpZiBjb25maWd1cmVkXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1RhZ3MgPSB0aGlzLnNwbGl0VGFnSW5wdXQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdGFnIHZhbGlkYXRpb24gZm9yIGFsbCBvZiB0aGUgaW5kaXZpZHVhbCB2YWx1ZXNcclxuICAgICAgICAgICAgbGV0IGFsbFZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbmV3VGFnIG9mIG5ld1RhZ3MpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gdGhpcy52YWxpZGF0ZVRhZyhuZXdUYWcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgdGFncyBpZiBhbGwgYXJlIHZhbGlkXHJcbiAgICAgICAgICAgIGlmIChhbGxWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbmV3VGFnIG9mIG5ld1RhZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFRhZyh0aGlzLmNyZWF0ZVRhZyhuZXdUYWcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgbm8gdGFnIGlzIHNlbGVjdGVkLCBzZWxlY3QgdGhlIHJpZ2h0bW9zdCB0YWcuIElmIGEgdGFnIGlzIHNlbGVjdGVkLCByZW1vdmUgaXQuXHJcbiAgICAgKi9cclxuICAgIGJhY2tzcGFjZSgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWRUYWdJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFnQXQodGhpcy50YWdzLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVGFnQXQodGhpcy5zZWxlY3RlZEluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlIHRoZSBoaWdobGlnaHRlZCBvcHRpb24gZm9yd2FyZHMgb3IgYmFja3dhcmRzIGluIHRoZSBsaXN0LiBXcmFwcyBhdCB0aGUgbGltaXRzLlxyXG4gICAgICogQHBhcmFtIGRlbHRhIFZhbHVlIHRvIGJlIGFkZGVkIHRvIHRoZSBzZWxlY3RlZCBpbmRleCwgaS5lLiAtMSB0byBtb3ZlIGJhY2t3YXJkcywgKzEgdG8gbW92ZSBmb3J3YXJkcy5cclxuICAgICAqL1xyXG4gICAgbW92ZVNlbGVjdGlvbihkZWx0YTogbnVtYmVyKTogdm9pZCB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkU2VsZWN0SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggKz0gZGVsdGE7XHJcblxyXG4gICAgICAgICAgICAvLyBEbyB3cmFwcGluZyBvZiBzZWxlY3Rpb24gd2hlbiBvdXQgb2YgYm91bmRzXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLnRhZ3MubGVuZ3RoO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCA+IHRoaXMudGFncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgdmFsdWUgdG8gZGlzcGxheSBmb3IgdGhlIGdpdmVuIHRhZy4gVXNlcyBkaXNwbGF5IGZ1bmN0aW9uL3Byb3BlcnR5IG5hbWUgaWYgc2V0LCBvdGhlcndpc2UgYXNzdW1lcyB0aGF0IHRoZSB0YWcgaXMgYSBzaW1wbGUgc3RyaW5nLlxyXG4gICAgICovXHJcbiAgICBnZXRUYWdEaXNwbGF5KHRhZzogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5KHRhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kaXNwbGF5ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFnWzxzdHJpbmc+dGhpcy5kaXNwbGF5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gaW5kZXggaXMgc2VsZWN0ZWQgKHRhZyBpbmRleCBvciBpbnB1dCBmaWVsZCkuXHJcbiAgICAgKi9cclxuICAgIGlzU2VsZWN0ZWQoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBpbmRleCA9PT0gdGhpcy5zZWxlY3RlZEluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0IHRoZSB0YWcgYXQgdGhlIGdpdmVuIGluZGV4LiBEb2VzIG5vdGhpbmcgaWYgZGlzYWJsZWQgaXMgdHJ1ZS5cclxuICAgICAqL1xyXG4gICAgc2VsZWN0VGFnQXQodGFnSW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFRhZ0luZGV4KHRhZ0luZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0YWdJbmRleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3QgdGhlIGlucHV0IGZpZWxkLCBnaXZpbmcgaXQgZm9jdXMuIERvZXMgbm90aGluZyBpZiBkaXNhYmxlZCBpcyB0cnVlLlxyXG4gICAgICovXHJcbiAgICBzZWxlY3RJbnB1dCgpOiB2b2lkIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy50YWdzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZSB0aGUgdGFnIGF0IHRoZSBnaXZlbiBpbmRleC4gRG9lcyBub3RoaW5nIGlmIGRpc2FibGVkIGlzIHRydWUgb3IgdGhlIG1pblRhZ3MgcHJvcGVydHkgcHJldmVudHMgcmVtb3ZhbC5cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlVGFnQXQodGFnSW5kZXg6IG51bWJlcik6IHZvaWQge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCB8fCAhdGhpcy5jYW5SZW1vdmVUYWdBdCh0YWdJbmRleCkpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHRoYXQgdGhlIHRhZ0luZGV4IGlzIGluIHJhbmdlXHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFRhZ0luZGV4KHRhZ0luZGV4KSkge1xyXG4gICAgICAgICAgICBjb25zdCB0YWcgPSB0aGlzLnRhZ3NbdGFnSW5kZXhdO1xyXG4gICAgICAgICAgICBjb25zdCB0YWdSZW1vdmluZ0V2ZW50ID0gbmV3IFRhZ0lucHV0RXZlbnQodGFnKTtcclxuICAgICAgICAgICAgdGhpcy50YWdSZW1vdmluZy5lbWl0KHRhZ1JlbW92aW5nRXZlbnQpO1xyXG4gICAgICAgICAgICBpZiAoIXRhZ1JlbW92aW5nRXZlbnQuZGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBTZWxlY3QgaW5wdXQgZmlyc3QgdG8gYXZvaWQgaXNzdWVzIHdpdGggZHJvcHBpbmcgZm9jdXNcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SW5wdXQoKTtcclxuICAgICAgICAgICAgICAgIC8vIFJlbW92ZSB0aGUgdGFnXHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ3Muc3BsaWNlKHRhZ0luZGV4LCAxKTtcclxuICAgICAgICAgICAgICAgIC8vIFNldCBmb2N1cyBhZ2FpbiBzaW5jZSBpbmRpY2VzIGhhdmUgY2hhbmdlZFxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJbnB1dCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdSZW1vdmVkLmVtaXQobmV3IFRhZ0lucHV0RXZlbnQodGFnKSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyBhdCB0aGUgZ2l2ZW4gaW5kZXggY2FuIGJlIHJlbW92ZWQuXHJcbiAgICAgKi9cclxuICAgIGNhblJlbW92ZVRhZ0F0KHRhZ0luZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YWdzLmxlbmd0aCA+IHRoaXMubWluVGFncyB8fCAhdGhpcy5lbmZvcmNlVGFnTGltaXRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBpbnB1dCBmaWVsZCBzaG91bGQgYmUgYXZhaWxhYmxlLlxyXG4gICAgICovXHJcbiAgICBpc0lucHV0VmlzaWJsZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50YWdzLmxlbmd0aCA8IHRoaXMubWF4VGFncyB8fCAhdGhpcy5lbmZvcmNlVGFnTGltaXRzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIGFueSBwYXJ0IG9mIHRoZSBjb250cm9sIGhhcyBmb2N1cy5cclxuICAgICAqL1xyXG4gICAgaGFzRm9jdXMoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNWYWxpZFNlbGVjdEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBjb25uZWN0VHlwZWFoZWFkKHR5cGVhaGVhZDogVHlwZWFoZWFkQ29tcG9uZW50KTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3N1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMudHlwZWFoZWFkID0gdHlwZWFoZWFkO1xyXG4gICAgICAgIGlmICh0aGlzLnR5cGVhaGVhZCkge1xyXG4gICAgICAgICAgICAvLyBTZXQgdXAgZXZlbnQgaGFuZGxlciBmb3Igc2VsZWN0ZWQgb3B0aW9uc1xyXG4gICAgICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24gPSB0aGlzLnR5cGVhaGVhZC5vcHRpb25TZWxlY3RlZC5zdWJzY3JpYmUodGhpcy50eXBlYWhlYWRPcHRpb25TZWxlY3RlZEhhbmRsZXIuYmluZCh0aGlzKSk7XHJcblxyXG4gICAgICAgICAgICAvLyBTZXQgdXAgZXZlbnQgaGFuZGxlciBmb3IgdGhlIGhpZ2hsaWdodGVkIGVsZW1lbnRcclxuICAgICAgICAgICAgLy8gQWRkZWQgYSBkZWxheSB0byBtb3ZlIGl0IG91dCBvZiB0aGUgY3VycmVudCBjaGFuZ2UgZGV0ZWN0aW9uIGN5Y2xlXHJcbiAgICAgICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGVhaGVhZC5oaWdobGlnaHRlZEVsZW1lbnRDaGFuZ2UucGlwZSh0aWNrKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHRoaXMuaGlnaGxpZ2h0ZWRFbGVtZW50ID0gZWxlbWVudClcclxuICAgICAgICAgICAgKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZSB0aGUgZ2l2ZW4gdGFnVmFsdWUgd2l0aCB0aGUgdGFnUGF0dGVybiwgaWYgc2V0LiBVcGRhdGUgdmFsaWRhdGlvbkVycm9ycyBvbiB2YWxpZGF0aW9uIGZhaWx1cmUuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgdmFsaWRhdGVUYWcodGFnVmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGxldCBpbnB1dFBhdHRlcm4gPSBudWxsO1xyXG4gICAgICAgIHRoaXMuaW5wdXRWYWxpZCA9IHRydWU7XHJcbiAgICAgICAgaWYgKHRoaXMudGFnUGF0dGVybiAmJiAhdGhpcy50YWdQYXR0ZXJuLnRlc3QodGFnVmFsdWUpKSB7XHJcbiAgICAgICAgICAgIGlucHV0UGF0dGVybiA9IHtcclxuICAgICAgICAgICAgICAgIGdpdmVuOiB0YWdWYWx1ZSxcclxuICAgICAgICAgICAgICAgIHBhdHRlcm46IHRoaXMudGFnUGF0dGVyblxyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0VmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JzWydpbnB1dFBhdHRlcm4nXSA9IGlucHV0UGF0dGVybjtcclxuICAgICAgICByZXR1cm4gdGhpcy5pbnB1dFZhbGlkO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ3JlYXRlIGEgdGFnIG9iamVjdCBmb3IgdGhlIGdpdmVuIHRhZ1ZhbHVlLiBJZiBjcmVhdGVUYWdIYW5kbGVyIGlzIHNwZWNpZmllZCwgdXNlIGl0OyBvdGhlcndpc2UgaWYgZGlzcGxheVByb3BlcnR5IGlzIHNwZWNpZmllZCwgY3JlYXRlIGFuIG9iamVjdCB3aXRoIHRoZSB0YWdWYWx1ZSBhcyB0aGUgc2luZ2xlIG5hbWVkIHByb3BlcnR5OyBvdGhlcndpc2UgcmV0dXJuIHRoZSB0YWdWYWx1ZSBpdHNlbGYuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgY3JlYXRlVGFnKHRhZ1ZhbHVlOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGxldCB0YWcgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLmNyZWF0ZVRhZ0hhbmRsZXIgJiYgdHlwZW9mIHRoaXMuY3JlYXRlVGFnSGFuZGxlciA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICB0YWcgPSB0aGlzLmNyZWF0ZVRhZ0hhbmRsZXIodGFnVmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgdGFnID0ge307XHJcbiAgICAgICAgICAgIHRhZ1s8c3RyaW5nPnRoaXMuZGlzcGxheV0gPSB0YWdWYWx1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0YWcgPSB0YWdWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIEFkZCBhIHRhZyBvYmplY3QsIGNhbGxpbmcgdGhlIHRhZ0FkZGluZyBhbmQgdGFnQWRkZWQgZXZlbnRzLiBSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyB3YXMgYWRkZWQgdG8gdGhlIHRhZ3MgYXJyYXkuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgYWRkVGFnKHRhZzogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRhZykge1xyXG4gICAgICAgICAgICAvLyBWZXJpZnkgdGhhdCB0aGUgbmV3IHRhZyBjYW4gYmUgZGlzcGxheWVkXHJcbiAgICAgICAgICAgIGNvbnN0IGRpc3BsYXlWYWx1ZSA9IHRoaXMuZ2V0VGFnRGlzcGxheSh0YWcpO1xyXG4gICAgICAgICAgICBpZiAoZGlzcGxheVZhbHVlICYmIHR5cGVvZiBkaXNwbGF5VmFsdWUgPT09ICdzdHJpbmcnICYmIGRpc3BsYXlWYWx1ZS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0YWdBZGRpbmdFdmVudCA9IG5ldyBUYWdJbnB1dEV2ZW50KHRhZyk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ0FkZGluZy5lbWl0KHRhZ0FkZGluZ0V2ZW50KTtcclxuICAgICAgICAgICAgICAgIGlmICghdGFnQWRkaW5nRXZlbnQuZGVmYXVsdFByZXZlbnRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdzID0gdGhpcy50YWdzIHx8IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFncy5wdXNoKHRhZyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdBZGRlZC5lbWl0KG5ldyBUYWdJbnB1dEV2ZW50KHRhZykpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiB0YWdJbmRleCBpcyBhIHZhbGlkIHRhZyBpbmRleC5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc1ZhbGlkVGFnSW5kZXgodGFnSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0YWdJbmRleCA+PSAwICYmIHRhZ0luZGV4IDwgdGhpcy50YWdzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gaW5kZXggaXMgYSB2YWxpZCBzZWxlY3Rpb24gaW5kZXggKHRhZ3Mgb3IgaW5wdXQgZmllbGQpLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzVmFsaWRTZWxlY3RJbmRleChpbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGluZGV4ID49IDAgJiYgaW5kZXggPD0gdGhpcy50YWdzLmxlbmd0aDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGNoYXJhY3RlciBjb3JyZXNwb25kaW5nIHRvIHRoZSBnaXZlbiBrZXkgZXZlbnQsIG1haW5seSBmb3IgSUUgY29tcGF0aWJpbGl0eS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBnZXRLZXlDaGFyKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogc3RyaW5nIHtcclxuICAgICAgICBzd2l0Y2ggKGV2ZW50LndoaWNoKSB7XHJcbiAgICAgICAgICAgIGNhc2UgU1BBQ0U6XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJyAnO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZXZlbnQua2V5O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhbiBhcnJheSBvZiBzdHJpbmdzIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGlucHV0IHN0cmluZyBzcGxpdCBieSB0aGUgdGFnRGVsaW1pdGVycyBjaGFyYWN0ZXJzLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHNwbGl0VGFnSW5wdXQoaW5wdXQ6IHN0cmluZyk6IHN0cmluZ1tdIHtcclxuICAgICAgICBsZXQgdGFnVmFsdWVzID0gW2lucHV0XTtcclxuICAgICAgICBpZiAodGhpcy50YWdEZWxpbWl0ZXJzICYmIHR5cGVvZiB0aGlzLnRhZ0RlbGltaXRlcnMgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGVzY2FwZWREZWxpbWl0ZXJzID0gdGhpcy50YWdEZWxpbWl0ZXJzLnJlcGxhY2UoL1stXFwvXFxcXF4kKis/LigpfFtcXF17fV0vZywgJ1xcXFwkJicpO1xyXG4gICAgICAgICAgICBjb25zdCBkZWxpbWl0ZXJSZWdleCA9IG5ldyBSZWdFeHAoYFske2VzY2FwZWREZWxpbWl0ZXJzfV1gLCAnZycpO1xyXG4gICAgICAgICAgICB0YWdWYWx1ZXMgPSBpbnB1dC5zcGxpdChkZWxpbWl0ZXJSZWdleCkuZmlsdGVyKChzKSA9PiBzLmxlbmd0aCA+IDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFnVmFsdWVzO1xyXG4gICAgfVxyXG59XHJcblxyXG4vKipcclxuICogVGhlIEFQSSBhdmFpbGFibGUgdG8gdGFnIHRlbXBsYXRlcy5cclxuICovXHJcbmV4cG9ydCBpbnRlcmZhY2UgVGFnQXBpIHtcclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgZGlzcGxheSB2YWx1ZSBvZiB0aGUgZ2l2ZW4gdGFnLCBhY2NvcmRpbmcgdG8gdGhlIGRpc3BsYXlQcm9wZXJ0eSBwcm9wZXJ0eS5cclxuICAgICAqL1xyXG4gICAgZ2V0VGFnRGlzcGxheTogKHRhZzogYW55KSA9PiBzdHJpbmc7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmVzIHRoZSB0YWcgYXQgdGhlIGdpdmVuIGluZGV4LCBpZiBwb3NzaWJsZS5cclxuICAgICAqL1xyXG4gICAgcmVtb3ZlVGFnQXQ6IChpbmRleDogbnVtYmVyKSA9PiB2b2lkO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogXHRSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyBhdCB0aGUgZ2l2ZW4gaW5kZXggY2FuIGJlIHJlbW92ZWQuXHJcbiAgICAgKi9cclxuICAgIGNhblJlbW92ZVRhZ0F0OiAoaW5kZXg6IG51bWJlcikgPT4gYm9vbGVhbjtcclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBmdW5jdGlvbiB1c2VkIHRvIHJldHVybiBjdXN0b20gY2xhc3MgaW5mb3JtYXRpb24sIGZvciB1c2UgaW4gYG5nQ2xhc3NgLlxyXG4gKi9cclxuZXhwb3J0IHR5cGUgVGFnQ2xhc3NGdW5jdGlvbiA9ICh0YWc6IGFueSwgaW5kZXg6IG51bWJlciwgc2VsZWN0ZWQ6IGJvb2xlYW4pID0+IChzdHJpbmcgfCBzdHJpbmdbXSB8IFNldDxzdHJpbmc+KTsiXX0=