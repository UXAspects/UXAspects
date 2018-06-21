/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, ElementRef, EventEmitter, HostListener, Inject, Input, Output, QueryList, TemplateRef, ViewChild, forwardRef, HostBinding } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
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
            this._typeaheadSubscription.add(this.typeahead.highlightedElementChange.subscribe((element) => {
                this.highlightedElement = element;
            }));
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
                template: `<ol [attr.role]="typeahead ? 'combobox' : 'none'" [attr.aria-haspopup]="typeahead ? 'listbox' : null">
    <li *ngFor="let tag of tags; let i = index" class="ux-tag"
        [class.disabled]="disabled"
        [ngClass]="tagClass(tag, i, isSelected(i))"
        [attr.tabindex]="disabled ? null : 0"
        [focusIf]="isSelected(i)"
        (click)="tagClickHandler($event, tag, i)"
        (focus)="selectTagAt(i)">

        <ng-container [ngTemplateOutlet]="tagTemplate"
            [ngTemplateOutletContext]="{tag: tag, index: i, disabled: disabled, api: tagApi}">
        </ng-container>

    </li>
    <li *ngIf="isInputVisible()" class="ux-tag-input" role="none">
        <input #tagInput type="text" [attr.id]="id" class="ux-tag-input"
            [(ngModel)]="input"
            [class.invalid]="!inputValid"
            [attr.aria-activedescendant]="highlightedElement?.id"
            [attr.aria-autocomplete]="typeahead ? 'list' : 'none'"
            [attr.aria-controls]="typeahead?.id"
            aria-multiline="false"
            [placeholder]="disabled ? '' : (placeholder || '')"
            [disabled]="disabled"
            [focusIf]="isSelected(tags.length)"
            (click)="inputClickHandler()"
            (focus)="inputFocusHandler()"
            (paste)="inputPasteHandler($event)">
    </li>
</ol>

<ng-content #typeahead></ng-content>

<ng-template #defaultTagTemplate let-tag="tag" let-index="index" let-disabled="disabled" let-api="api">
    <span class="ux-tag-text">{{api.getTagDisplay(tag)}}</span>
    <button *ngIf="api.canRemoveTagAt(index)"
        type="button"
        class="ux-tag-remove"
        aria-label="Remove Item"
        [disabled]="disabled"
        (click)="api.removeTagAt(index); $event.stopPropagation();">
        <span class="hpe-icon hpe-close"></span>
    </button>
</ng-template>`,
                providers: [TAGINPUT_VALUE_ACCESSOR, TAGINPUT_VALIDATOR],
                host: {
                    '[class.disabled]': 'disabled',
                    '[class.focus]': 'hasFocus()',
                    '[class.invalid]': '!valid || !inputValid'
                }
            },] },
];
/** @nocollapse */
TagInputComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: undefined, decorators: [{ type: Inject, args: [DOCUMENT,] },] },
    { type: TypeaheadKeyService, },
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhZy1pbnB1dC90YWctaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsTUFBTSxFQUFFLEtBQUssRUFBZ0MsTUFBTSxFQUFFLFNBQVMsRUFBaUIsV0FBVyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JQLE9BQU8sRUFBd0IsYUFBYSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRTdFLE9BQU8sRUFBRSxhQUFhLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUVsRCxxQkFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFDO0FBRWpCLHVCQUFNLHVCQUF1QixHQUFHO0lBQzVCLE9BQU8sRUFBRSxpQkFBaUI7SUFDMUIsV0FBVyxFQUFFLFVBQVUsQ0FBQyxNQUFNLGlCQUFpQixDQUFDO0lBQ2hELEtBQUssRUFBRSxJQUFJO0NBQ2QsQ0FBQztBQUNGLHVCQUFNLGtCQUFrQixHQUFHO0lBQ3ZCLE9BQU8sRUFBRSxhQUFhO0lBQ3RCLFdBQVcsRUFBRSxVQUFVLENBQUMsTUFBTSxpQkFBaUIsQ0FBQztJQUNoRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUF1REYsTUFBTTs7Ozs7O0lBZ0ZGLFlBQ1ksVUFDa0IsV0FDbEI7UUFGQSxhQUFRLEdBQVIsUUFBUTtRQUNVLGNBQVMsR0FBVCxTQUFTO1FBQzNCLHlCQUFvQixH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S0FBSztpQ0FDTCxLQUFLLFNBQUMsV0FBVzswQkFFakIsTUFBTTt5QkFDTixNQUFNOytCQUNOLE1BQU07NEJBQ04sTUFBTTsyQkFDTixNQUFNO3lCQUNOLE1BQU07K0JBRU4sZUFBZSxTQUFDLGtCQUFrQjt5QkFFbEMsU0FBUyxTQUFDLFVBQVU7b0NBRXBCLFNBQVMsU0FBQyxvQkFBb0I7MkJBa0c5QixZQUFZLFNBQUMsU0FBUyxFQUFFLENBQUMsUUFBUSxDQUFDO2dDQTBFbEMsWUFBWSxTQUFDLFVBQVUsRUFBRSxDQUFDLFFBQVEsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFmdGVyQ29udGVudEluaXQsIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3RMaXN0ZW5lciwgSW5qZWN0LCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBRdWVyeUxpc3QsIFNpbXBsZUNoYW5nZXMsIFRlbXBsYXRlUmVmLCBWaWV3Q2hpbGQsIGZvcndhcmRSZWYsIEhvc3RCaW5kaW5nIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7IENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxJREFUT1JTLCBOR19WQUxVRV9BQ0NFU1NPUiB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcclxuaW1wb3J0IHsgRE9DVU1FTlQgfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRDb21wb25lbnQsIFR5cGVhaGVhZEtleVNlcnZpY2UgfSBmcm9tICcuLi90eXBlYWhlYWQvaW5kZXgnO1xyXG5pbXBvcnQgeyBUeXBlYWhlYWRPcHRpb25FdmVudCB9IGZyb20gJy4uL3R5cGVhaGVhZC90eXBlYWhlYWQtZXZlbnQnO1xyXG5pbXBvcnQgeyBUYWdJbnB1dEV2ZW50IH0gZnJvbSAnLi90YWctaW5wdXQtZXZlbnQnO1xyXG5cclxubGV0IHVuaXF1ZUlkID0gMDtcclxuXHJcbmNvbnN0IFRBR0lOUFVUX1ZBTFVFX0FDQ0VTU09SID0ge1xyXG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUYWdJbnB1dENvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5jb25zdCBUQUdJTlBVVF9WQUxJREFUT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxJREFUT1JTLFxyXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gVGFnSW5wdXRDb21wb25lbnQpLFxyXG4gICAgbXVsdGk6IHRydWVcclxufTtcclxuXHJcbkBDb21wb25lbnQoe1xyXG4gICAgc2VsZWN0b3I6ICd1eC10YWctaW5wdXQnLFxyXG4gICAgdGVtcGxhdGU6IGA8b2wgW2F0dHIucm9sZV09XCJ0eXBlYWhlYWQgPyAnY29tYm9ib3gnIDogJ25vbmUnXCIgW2F0dHIuYXJpYS1oYXNwb3B1cF09XCJ0eXBlYWhlYWQgPyAnbGlzdGJveCcgOiBudWxsXCI+XG4gICAgPGxpICpuZ0Zvcj1cImxldCB0YWcgb2YgdGFnczsgbGV0IGkgPSBpbmRleFwiIGNsYXNzPVwidXgtdGFnXCJcbiAgICAgICAgW2NsYXNzLmRpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgW25nQ2xhc3NdPVwidGFnQ2xhc3ModGFnLCBpLCBpc1NlbGVjdGVkKGkpKVwiXG4gICAgICAgIFthdHRyLnRhYmluZGV4XT1cImRpc2FibGVkID8gbnVsbCA6IDBcIlxuICAgICAgICBbZm9jdXNJZl09XCJpc1NlbGVjdGVkKGkpXCJcbiAgICAgICAgKGNsaWNrKT1cInRhZ0NsaWNrSGFuZGxlcigkZXZlbnQsIHRhZywgaSlcIlxuICAgICAgICAoZm9jdXMpPVwic2VsZWN0VGFnQXQoaSlcIj5cblxuICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhZ1RlbXBsYXRlXCJcbiAgICAgICAgICAgIFtuZ1RlbXBsYXRlT3V0bGV0Q29udGV4dF09XCJ7dGFnOiB0YWcsIGluZGV4OiBpLCBkaXNhYmxlZDogZGlzYWJsZWQsIGFwaTogdGFnQXBpfVwiPlxuICAgICAgICA8L25nLWNvbnRhaW5lcj5cblxuICAgIDwvbGk+XG4gICAgPGxpICpuZ0lmPVwiaXNJbnB1dFZpc2libGUoKVwiIGNsYXNzPVwidXgtdGFnLWlucHV0XCIgcm9sZT1cIm5vbmVcIj5cbiAgICAgICAgPGlucHV0ICN0YWdJbnB1dCB0eXBlPVwidGV4dFwiIFthdHRyLmlkXT1cImlkXCIgY2xhc3M9XCJ1eC10YWctaW5wdXRcIlxuICAgICAgICAgICAgWyhuZ01vZGVsKV09XCJpbnB1dFwiXG4gICAgICAgICAgICBbY2xhc3MuaW52YWxpZF09XCIhaW5wdXRWYWxpZFwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWFjdGl2ZWRlc2NlbmRhbnRdPVwiaGlnaGxpZ2h0ZWRFbGVtZW50Py5pZFwiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWF1dG9jb21wbGV0ZV09XCJ0eXBlYWhlYWQgPyAnbGlzdCcgOiAnbm9uZSdcIlxuICAgICAgICAgICAgW2F0dHIuYXJpYS1jb250cm9sc109XCJ0eXBlYWhlYWQ/LmlkXCJcbiAgICAgICAgICAgIGFyaWEtbXVsdGlsaW5lPVwiZmFsc2VcIlxuICAgICAgICAgICAgW3BsYWNlaG9sZGVyXT1cImRpc2FibGVkID8gJycgOiAocGxhY2Vob2xkZXIgfHwgJycpXCJcbiAgICAgICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgICAgICBbZm9jdXNJZl09XCJpc1NlbGVjdGVkKHRhZ3MubGVuZ3RoKVwiXG4gICAgICAgICAgICAoY2xpY2spPVwiaW5wdXRDbGlja0hhbmRsZXIoKVwiXG4gICAgICAgICAgICAoZm9jdXMpPVwiaW5wdXRGb2N1c0hhbmRsZXIoKVwiXG4gICAgICAgICAgICAocGFzdGUpPVwiaW5wdXRQYXN0ZUhhbmRsZXIoJGV2ZW50KVwiPlxuICAgIDwvbGk+XG48L29sPlxuXG48bmctY29udGVudCAjdHlwZWFoZWFkPjwvbmctY29udGVudD5cblxuPG5nLXRlbXBsYXRlICNkZWZhdWx0VGFnVGVtcGxhdGUgbGV0LXRhZz1cInRhZ1wiIGxldC1pbmRleD1cImluZGV4XCIgbGV0LWRpc2FibGVkPVwiZGlzYWJsZWRcIiBsZXQtYXBpPVwiYXBpXCI+XG4gICAgPHNwYW4gY2xhc3M9XCJ1eC10YWctdGV4dFwiPnt7YXBpLmdldFRhZ0Rpc3BsYXkodGFnKX19PC9zcGFuPlxuICAgIDxidXR0b24gKm5nSWY9XCJhcGkuY2FuUmVtb3ZlVGFnQXQoaW5kZXgpXCJcbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzPVwidXgtdGFnLXJlbW92ZVwiXG4gICAgICAgIGFyaWEtbGFiZWw9XCJSZW1vdmUgSXRlbVwiXG4gICAgICAgIFtkaXNhYmxlZF09XCJkaXNhYmxlZFwiXG4gICAgICAgIChjbGljayk9XCJhcGkucmVtb3ZlVGFnQXQoaW5kZXgpOyAkZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XCI+XG4gICAgICAgIDxzcGFuIGNsYXNzPVwiaHBlLWljb24gaHBlLWNsb3NlXCI+PC9zcGFuPlxuICAgIDwvYnV0dG9uPlxuPC9uZy10ZW1wbGF0ZT5gLFxyXG4gICAgcHJvdmlkZXJzOiBbVEFHSU5QVVRfVkFMVUVfQUNDRVNTT1IsIFRBR0lOUFVUX1ZBTElEQVRPUl0sXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ1tjbGFzcy5kaXNhYmxlZF0nOiAnZGlzYWJsZWQnLFxyXG4gICAgICAgICdbY2xhc3MuZm9jdXNdJzogJ2hhc0ZvY3VzKCknLFxyXG4gICAgICAgICdbY2xhc3MuaW52YWxpZF0nOiAnIXZhbGlkIHx8ICFpbnB1dFZhbGlkJ1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgVGFnSW5wdXRDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIEFmdGVyQ29udGVudEluaXQsIE9uQ2hhbmdlcywgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSB7XHJcblxyXG4gICAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdhdHRyLmlkJykgaWQ6IHN0cmluZyA9IGB1eC10YWctaW5wdXQtJHsrK3VuaXF1ZUlkfWA7XHJcblxyXG4gICAgQElucHV0KCd0YWdzJylcclxuICAgIGdldCB0YWdzKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5fdGFncykge1xyXG4gICAgICAgICAgICB0aGlzLl90YWdzID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLl90YWdzO1xyXG4gICAgfVxyXG4gICAgc2V0IHRhZ3ModmFsdWU6IGFueVtdKSB7XHJcbiAgICAgICAgdGhpcy5fdGFncyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlSGFuZGxlcih0aGlzLl90YWdzKTtcclxuICAgICAgICB0aGlzLnRhZ3NDaGFuZ2UuZW1pdCh0aGlzLl90YWdzKTtcclxuICAgIH1cclxuXHJcbiAgICBAT3V0cHV0KCkgdGFnc0NoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8YW55W10+KCk7XHJcblxyXG4gICAgQElucHV0KCdpbnB1dCcpXHJcbiAgICBnZXQgaW5wdXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2lucHV0O1xyXG4gICAgfVxyXG4gICAgc2V0IGlucHV0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLl9pbnB1dCA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuaW5wdXRDaGFuZ2UuZW1pdCh2YWx1ZSk7XHJcbiAgICB9XHJcblxyXG4gICAgQE91dHB1dCgpIGlucHV0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XHJcblxyXG4gICAgQElucHV0KCkgZGlzcGxheTogKG9wdGlvbjogYW55KSA9PiBzdHJpbmcgfCBzdHJpbmc7XHJcbiAgICBASW5wdXQoKSBhZGRPblBhc3RlOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIEBJbnB1dCgpIGRpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBlbmZvcmNlVGFnTGltaXRzOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSBmcmVlSW5wdXQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgbWF4VGFnczogbnVtYmVyID0gTnVtYmVyLk1BWF9WQUxVRTtcclxuICAgIEBJbnB1dCgpIG1pblRhZ3M6IG51bWJlciA9IDA7XHJcbiAgICBASW5wdXQoKSBwbGFjZWhvbGRlcjogc3RyaW5nID0gJyc7XHJcbiAgICBASW5wdXQoKSBzaG93VHlwZWFoZWFkT25DbGljazogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgQElucHV0KCkgdGFnRGVsaW1pdGVyczogc3RyaW5nID0gJyc7XHJcbiAgICBASW5wdXQoKSB0YWdQYXR0ZXJuOiBSZWdFeHA7XHJcbiAgICBASW5wdXQoKSB0YWdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuICAgIEBJbnB1dCgpIHRhZ0NsYXNzOiBUYWdDbGFzc0Z1bmN0aW9uID0gKCkgPT4gdW5kZWZpbmVkO1xyXG4gICAgQElucHV0KCkgdmFsaWRhdGlvbkVycm9yczogYW55ID0ge307XHJcbiAgICBASW5wdXQoJ2NyZWF0ZVRhZycpIGNyZWF0ZVRhZ0hhbmRsZXI6ICh2YWx1ZTogc3RyaW5nKSA9PiBhbnk7XHJcblxyXG4gICAgQE91dHB1dCgpIHRhZ0FkZGluZyA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnSW5wdXRFdmVudD4oKTtcclxuICAgIEBPdXRwdXQoKSB0YWdBZGRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnSW5wdXRFdmVudD4oKTtcclxuICAgIEBPdXRwdXQoKSB0YWdJbnZhbGlkYXRlZCA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnSW5wdXRFdmVudD4oKTtcclxuICAgIEBPdXRwdXQoKSB0YWdSZW1vdmluZyA9IG5ldyBFdmVudEVtaXR0ZXI8VGFnSW5wdXRFdmVudD4oKTtcclxuICAgIEBPdXRwdXQoKSB0YWdSZW1vdmVkID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ0NsaWNrID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGRyZW4oVHlwZWFoZWFkQ29tcG9uZW50KSB0eXBlYWhlYWRRdWVyeTogUXVlcnlMaXN0PFR5cGVhaGVhZENvbXBvbmVudD47XHJcblxyXG4gICAgQFZpZXdDaGlsZCgndGFnSW5wdXQnKSB0YWdJbnB1dDogRWxlbWVudFJlZjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCdkZWZhdWx0VGFnVGVtcGxhdGUnKSBwcml2YXRlIF9kZWZhdWx0VGFnVGVtcGxhdGU6IFRlbXBsYXRlUmVmPGFueT47XHJcblxyXG4gICAgc2VsZWN0ZWRJbmRleDogbnVtYmVyID0gLTE7XHJcblxyXG4gICAgdGFnQXBpOiBUYWdBcGkgPSB7XHJcbiAgICAgICAgZ2V0VGFnRGlzcGxheTogdGhpcy5nZXRUYWdEaXNwbGF5LmJpbmQodGhpcyksXHJcbiAgICAgICAgcmVtb3ZlVGFnQXQ6IHRoaXMucmVtb3ZlVGFnQXQuYmluZCh0aGlzKSxcclxuICAgICAgICBjYW5SZW1vdmVUYWdBdDogdGhpcy5jYW5SZW1vdmVUYWdBdC5iaW5kKHRoaXMpXHJcbiAgICB9O1xyXG5cclxuICAgIHZhbGlkOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGlucHV0VmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIHR5cGVhaGVhZDogVHlwZWFoZWFkQ29tcG9uZW50O1xyXG5cclxuICAgIGhpZ2hsaWdodGVkRWxlbWVudDogSFRNTEVsZW1lbnQ7XHJcblxyXG4gICAgcHJpdmF0ZSBfaW5wdXQ6IHN0cmluZyA9ICcnO1xyXG4gICAgcHJpdmF0ZSBfdGFnczogYW55W10gPSBbXTtcclxuICAgIHByaXZhdGUgX29uQ2hhbmdlSGFuZGxlcjogKF86IGFueSkgPT4gdm9pZCA9ICgpID0+IHsgfTtcclxuICAgIHByaXZhdGUgX29uVG91Y2hlZEhhbmRsZXI6ICgpID0+IHZvaWQgPSAoKSA9PiB7IH07XHJcbiAgICBwcml2YXRlIF90eXBlYWhlYWRTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihcclxuICAgICAgICBwcml2YXRlIF9lbGVtZW50OiBFbGVtZW50UmVmLFxyXG4gICAgICAgIEBJbmplY3QoRE9DVU1FTlQpIHByaXZhdGUgX2RvY3VtZW50OiBhbnksXHJcbiAgICAgICAgcHJpdmF0ZSBfdHlwZWFoZWFkS2V5U2VydmljZTogVHlwZWFoZWFkS2V5U2VydmljZSkgeyB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRhZ1RlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFnVGVtcGxhdGUgPSB0aGlzLl9kZWZhdWx0VGFnVGVtcGxhdGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIG5nQWZ0ZXJDb250ZW50SW5pdCgpIHtcclxuICAgICAgICAvLyBXYXRjaCBmb3Igb3B0aW9uYWwgY2hpbGQgdHlwZWFoZWFkIGNvbnRyb2xcclxuICAgICAgICB0aGlzLmNvbm5lY3RUeXBlYWhlYWQodGhpcy50eXBlYWhlYWRRdWVyeS5maXJzdCk7XHJcbiAgICAgICAgdGhpcy50eXBlYWhlYWRRdWVyeS5jaGFuZ2VzLnN1YnNjcmliZSgocXVlcnkpID0+IHtcclxuICAgICAgICAgICAgdGhpcy5jb25uZWN0VHlwZWFoZWFkKHF1ZXJ5LmZpcnN0KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XHJcbiAgICAgICAgaWYgKGNoYW5nZXMuZGlzYWJsZWQpIHtcclxuICAgICAgICAgICAgaWYgKGNoYW5nZXMuZGlzYWJsZWQuY3VycmVudFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBDbGVhciBzZWxlY3Rpb24gYW5kIGNsb3NlIGRyb3Bkb3duXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGVhaGVhZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkLm9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHZhbGlkYXRpb24gc3RhdHVzXHJcbiAgICAgICAgdGhpcy52YWxpZGF0ZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIHdyaXRlVmFsdWUodmFsdWU6IGFueVtdKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMudGFncyA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9vbkNoYW5nZUhhbmRsZXIgPSBmbjtcclxuICAgIH1cclxuXHJcbiAgICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XHJcbiAgICAgICAgdGhpcy5fb25Ub3VjaGVkSGFuZGxlciA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHNldERpc2FibGVkU3RhdGUoaXNEaXNhYmxlZDogYm9vbGVhbik6IHZvaWQge1xyXG4gICAgICAgIHRoaXMuZGlzYWJsZWQgPSBpc0Rpc2FibGVkO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xyXG4gICAgICAgIGlmICh0aGlzLl90eXBlYWhlYWRTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5fdHlwZWFoZWFkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmFsaWRhdGUgdGhlIHZhbHVlIG9mIHRoZSBjb250cm9sICh0YWdzIHByb3BlcnR5KS5cclxuICAgICAqL1xyXG4gICAgdmFsaWRhdGUoKSB7XHJcbiAgICAgICAgdGhpcy52YWxpZCA9IHRydWU7XHJcbiAgICAgICAgbGV0IHRhZ1JhbmdlRXJyb3IgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLnRhZ3MgJiYgKHRoaXMudGFncy5sZW5ndGggPCB0aGlzLm1pblRhZ3MgfHwgdGhpcy50YWdzLmxlbmd0aCA+IHRoaXMubWF4VGFncykpIHtcclxuICAgICAgICAgICAgdGFnUmFuZ2VFcnJvciA9IHtcclxuICAgICAgICAgICAgICAgIGdpdmVuOiB0aGlzLnRhZ3MubGVuZ3RoLFxyXG4gICAgICAgICAgICAgICAgbWluOiB0aGlzLm1pblRhZ3MsXHJcbiAgICAgICAgICAgICAgICBtYXg6IHRoaXMubWF4VGFnc1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB0aGlzLnZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yc1sndGFnUmFuZ2VFcnJvciddID0gdGFnUmFuZ2VFcnJvcjtcclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdrZXlkb3duJywgWyckZXZlbnQnXSlcclxuICAgIGtleUhhbmRsZXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIC8vIEdldCB0aGUgaW5wdXQgZmllbGQgY3Vyc29yIGxvY2F0aW9uXHJcbiAgICAgICAgY29uc3QgaW5wdXRDdXJzb3JQb3MgPSB0aGlzLnRhZ0lucHV0Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQ7XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSBpZiB0aGUgaW5wdXQgZmllbGQgaGFzIGFueSB0ZXh0IHNlbGVjdGVkXHJcbiAgICAgICAgY29uc3QgaGFzU2VsZWN0aW9uID0gdGhpcy50YWdJbnB1dC5uYXRpdmVFbGVtZW50LnNlbGVjdGlvblN0YXJ0ICE9PSB0aGlzLnRhZ0lucHV0Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uRW5kO1xyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgaWYgYSB0YWcgaGFzIGZvY3VzXHJcbiAgICAgICAgY29uc3QgdGFnU2VsZWN0ZWQgPSB0aGlzLmlzVmFsaWRUYWdJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXgpO1xyXG5cclxuICAgICAgICBjb25zdCBpbnB1dExlbmd0aCA9IHRoaXMuaW5wdXQgPyB0aGlzLmlucHV0Lmxlbmd0aCA6IDA7XHJcblxyXG4gICAgICAgIC8vIENoZWNrIHdoZXRoZXIgdGhlIGFycm93IGtleXMgY2FuIG1vdmUgdGhlIHNlbGVjdGlvbi4gT3RoZXJ3aXNlIHRoZSBpbnB1dCBmaWVsZCB0YWtlcyB0aGUgZXZlbnQuXHJcbiAgICAgICAgY29uc3QgY2FuTmF2aWdhdGVMZWZ0ID0gdGFnU2VsZWN0ZWQgfHwgKGlucHV0Q3Vyc29yUG9zIDw9IDAgJiYgIWhhc1NlbGVjdGlvbik7XHJcbiAgICAgICAgY29uc3QgY2FuTmF2aWdhdGVSaWdodCA9IHRhZ1NlbGVjdGVkIHx8IChpbnB1dEN1cnNvclBvcyA+PSBpbnB1dExlbmd0aCAmJiAhaGFzU2VsZWN0aW9uKTtcclxuXHJcbiAgICAgICAgLy8gRm9yd2FyZCBrZXkgZXZlbnRzIHRvIHRoZSB0eXBlYWhlYWQgY29tcG9uZW50LlxyXG4gICAgICAgIHRoaXMuX3R5cGVhaGVhZEtleVNlcnZpY2UuaGFuZGxlS2V5KGV2ZW50LCB0aGlzLnR5cGVhaGVhZCk7XHJcblxyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ0VudGVyJzpcclxuICAgICAgICAgICAgICAgIC8vIENoZWNrIGlmIGEgdHlwZWFoZWFkIG9wdGlvbiBpcyBoaWdobGlnaHRlZFxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkICYmIHRoaXMudHlwZWFoZWFkLm9wZW4gJiYgdGhpcy50eXBlYWhlYWQuaGlnaGxpZ2h0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBZGQgdGhlIHR5cGVhaGVhZCBvcHRpb24gYXMgYSB0YWcsIGNsZWFyIHRoZSBpbnB1dCwgYW5kIGNsb3NlIHRoZSBkcm9wZG93blxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tbWl0VHlwZWFoZWFkKHRoaXMudHlwZWFoZWFkLmhpZ2hsaWdodGVkKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnR5cGVhaGVhZC5vcGVuID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFZhbGlkYXRlIGFuZCBhZGQgdGhlIGlucHV0IHRleHQgYXMgYSB0YWcsIGlmIHBvc3NpYmxlXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21taXRJbnB1dCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdCYWNrc3BhY2UnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbk5hdmlnYXRlTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYmFja3NwYWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdEZWxldGUnOlxyXG4gICAgICAgICAgICBjYXNlICdEZWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKHRhZ1NlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5yZW1vdmVUYWdBdCh0aGlzLnNlbGVjdGVkSW5kZXgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93TGVmdCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ0xlZnQnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbk5hdmlnYXRlTGVmdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVNlbGVjdGlvbigtMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdBcnJvd1JpZ2h0JzpcclxuICAgICAgICAgICAgY2FzZSAnUmlnaHQnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGNhbk5hdmlnYXRlUmlnaHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1vdmVTZWxlY3Rpb24oMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgZm9yIGtleXMgaW4gdGhlIHRhZ0RlbGltaXRlcnNcclxuICAgICAgICBpZiAodGhpcy50YWdEZWxpbWl0ZXJzICYmIHRoaXMudGFnRGVsaW1pdGVycy5pbmRleE9mKHRoaXMuZ2V0S2V5Q2hhcihldmVudCkpID49IDApIHtcclxuICAgICAgICAgICAgLy8gQ29tbWl0IHByZXZpb3VzIHRleHRcclxuICAgICAgICAgICAgdGhpcy5jb21taXRJbnB1dCgpO1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgQEhvc3RMaXN0ZW5lcignZm9jdXNvdXQnLCBbJyRldmVudCddKVxyXG4gICAgZm9jdXNPdXRIYW5kbGVyKGV2ZW50OiBGb2N1c0V2ZW50KSB7XHJcblxyXG4gICAgICAgIC8vIElmIGEgY2xpY2sgb24gdGhlIHR5cGVhaGVhZCBpcyBpbiBwcm9ncmVzcywgZG9uJ3QgZG8gYW55dGhpbmcuXHJcbiAgICAgICAgLy8gVGhpcyB3b3JrcyBhcm91bmQgYW4gaXNzdWUgaW4gSUUgd2hlcmUgY2xpY2tpbmcgYSBzY3JvbGxiYXIgZHJvcHMgZm9jdXMuXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkICYmIHRoaXMudHlwZWFoZWFkLmNsaWNraW5nKSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIENsb3NlIHRoZSBkcm9wZG93biBvbiBibHVyXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5fZWxlbWVudC5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRoaXMuX2RvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAtMTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnR5cGVhaGVhZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkLm9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sIDIwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGFnQ2xpY2tIYW5kbGVyKGV2ZW50OiBNb3VzZUV2ZW50LCB0YWc6IGFueSwgaW5kZXg6IG51bWJlcikge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgLy8gU2VuZCB0YWdDbGljayBldmVudFxyXG4gICAgICAgIGNvbnN0IHRhZ0NsaWNrRXZlbnQgPSBuZXcgVGFnSW5wdXRFdmVudCh0YWcpO1xyXG4gICAgICAgIHRoaXMudGFnQ2xpY2suZW1pdCh0YWdDbGlja0V2ZW50KTtcclxuXHJcbiAgICAgICAgLy8gUHJldmVudCBmb2N1cyBpZiBwcmV2ZW50RGVmYXVsdCgpIHdhcyBjYWxsZWRcclxuICAgICAgICBpZiAodGFnQ2xpY2tFdmVudC5kZWZhdWx0UHJldmVudGVkKCkpIHtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2VsZWN0IHRoZSB0YWcgKGZvciBJRSB0aGF0IGRvZXNuJ3QgcHJvcGFnYXRlIGZvY3VzKVxyXG4gICAgICAgIHRoaXMuc2VsZWN0VGFnQXQoaW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0Q2xpY2tIYW5kbGVyKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkICYmIHRoaXMuc2hvd1R5cGVhaGVhZE9uQ2xpY2spIHtcclxuICAgICAgICAgICAgdGhpcy50eXBlYWhlYWQub3BlbiA9IHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlucHV0Rm9jdXNIYW5kbGVyKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgdGhpcy5zZWxlY3RJbnB1dCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGlucHV0UGFzdGVIYW5kbGVyKGV2ZW50OiBDbGlwYm9hcmRFdmVudCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuYWRkT25QYXN0ZSkge1xyXG4gICAgICAgICAgICAvLyBHZXQgdGV4dCBmcm9tIHRoZSBjbGlwYm9hcmRcclxuICAgICAgICAgICAgbGV0IGlucHV0OiBzdHJpbmcgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoZXZlbnQuY2xpcGJvYXJkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSBldmVudC5jbGlwYm9hcmREYXRhLmdldERhdGEoJ3RleHQvcGxhaW4nKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICgoPGFueT53aW5kb3cpLmNsaXBib2FyZERhdGEpIHtcclxuICAgICAgICAgICAgICAgIC8vIEludGVybmV0IEV4cGxvcmVyIG9ubHlcclxuICAgICAgICAgICAgICAgIGlucHV0ID0gKDxhbnk+d2luZG93KS5jbGlwYm9hcmREYXRhLmdldERhdGEoJ1RleHQnKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQ29tbWl0IHRoZSBjbGlwYm9hcmQgdGV4dCBkaXJlY3RseVxyXG4gICAgICAgICAgICBpZiAodGhpcy5jb21taXQoaW5wdXQpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdElucHV0KCk7XHJcbiAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdHlwZWFoZWFkT3B0aW9uU2VsZWN0ZWRIYW5kbGVyKGV2ZW50OiBUeXBlYWhlYWRPcHRpb25FdmVudCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgLy8gV2hlbiB0aGUgdHlwZWFoZWFkIHNlbmRzIHRoZSBvcHRpb25TZWxlY3RlZCBldmVudCwgY29tbWl0IHRoZSBvYmplY3QgZGlyZWN0bHlcclxuICAgICAgICB0aGlzLmNvbW1pdFR5cGVhaGVhZChldmVudC5vcHRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tbWl0IHRoZSBjdXJyZW50IGlucHV0IHZhbHVlIGFuZCBjbGVhciB0aGUgaW5wdXQgZmllbGQgaWYgc3VjY2Vzc2Z1bC5cclxuICAgICAqL1xyXG4gICAgY29tbWl0SW5wdXQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tbWl0KHRoaXMuaW5wdXQpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SW5wdXQoKTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dCA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbW1pdCB0aGUgZ2l2ZW4gdGFnIG9iamVjdCBhbmQgY2xlYXIgdGhlIGlucHV0IGlmIHN1Y2Nlc3NmdWwuXHJcbiAgICAgKi9cclxuICAgIGNvbW1pdFR5cGVhaGVhZCh0YWc6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLmFkZFRhZyh0YWcpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0SW5wdXQoKTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dCA9ICcnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENvbW1pdCB0aGUgZ2l2ZW4gc3RyaW5nIHZhbHVlIGFzIG9uZSBvciBtb3JlIHRhZ3MsIGlmIHZhbGlkYXRpb24gcGFzc2VzLiBSZXR1cm5zIHRydWUgaWYgdGhlIHRhZyhzKSB3ZXJlIGNyZWF0ZWQuXHJcbiAgICAgKi9cclxuICAgIGNvbW1pdChpbnB1dDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKGlucHV0ICYmIHRoaXMuZnJlZUlucHV0KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBTcGxpdCB0aGUgdGFncyBieSB0aGUgdGFnRGVsaW1pdGVycyBpZiBjb25maWd1cmVkXHJcbiAgICAgICAgICAgIGNvbnN0IG5ld1RhZ3MgPSB0aGlzLnNwbGl0VGFnSW5wdXQoaW5wdXQpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hlY2sgdGFnIHZhbGlkYXRpb24gZm9yIGFsbCBvZiB0aGUgaW5kaXZpZHVhbCB2YWx1ZXNcclxuICAgICAgICAgICAgbGV0IGFsbFZhbGlkID0gdHJ1ZTtcclxuICAgICAgICAgICAgZm9yIChsZXQgbmV3VGFnIG9mIG5ld1RhZ3MpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHZhbGlkID0gdGhpcy52YWxpZGF0ZVRhZyhuZXdUYWcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF2YWxpZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsbFZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEFkZCB0aGUgdGFncyBpZiBhbGwgYXJlIHZhbGlkXHJcbiAgICAgICAgICAgIGlmIChhbGxWYWxpZCkge1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgbmV3VGFnIG9mIG5ld1RhZ3MpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZFRhZyh0aGlzLmNyZWF0ZVRhZyhuZXdUYWcpKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogSWYgbm8gdGFnIGlzIHNlbGVjdGVkLCBzZWxlY3QgdGhlIHJpZ2h0bW9zdCB0YWcuIElmIGEgdGFnIGlzIHNlbGVjdGVkLCByZW1vdmUgaXQuXHJcbiAgICAgKi9cclxuICAgIGJhY2tzcGFjZSgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbGlkVGFnSW5kZXgodGhpcy5zZWxlY3RlZEluZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdFRhZ0F0KHRoaXMudGFncy5sZW5ndGggLSAxKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZVRhZ0F0KHRoaXMuc2VsZWN0ZWRJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogTW92ZSB0aGUgaGlnaGxpZ2h0ZWQgb3B0aW9uIGZvcndhcmRzIG9yIGJhY2t3YXJkcyBpbiB0aGUgbGlzdC4gV3JhcHMgYXQgdGhlIGxpbWl0cy5cclxuICAgICAqIEBwYXJhbSBkIFZhbHVlIHRvIGJlIGFkZGVkIHRvIHRoZSBzZWxlY3RlZCBpbmRleCwgaS5lLiAtMSB0byBtb3ZlIGJhY2t3YXJkcywgKzEgdG8gbW92ZSBmb3J3YXJkcy5cclxuICAgICAqL1xyXG4gICAgbW92ZVNlbGVjdGlvbihkOiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWRTZWxlY3RJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCArPSBkO1xyXG5cclxuICAgICAgICAgICAgLy8gRG8gd3JhcHBpbmcgb2Ygc2VsZWN0aW9uIHdoZW4gb3V0IG9mIGJvdW5kc1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zZWxlY3RlZEluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGhpcy50YWdzLmxlbmd0aDtcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggPiB0aGlzLnRhZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyBhIHZhbHVlIHRvIGRpc3BsYXkgZm9yIHRoZSBnaXZlbiB0YWcuIFVzZXMgZGlzcGxheSBmdW5jdGlvbi9wcm9wZXJ0eSBuYW1lIGlmIHNldCwgb3RoZXJ3aXNlIGFzc3VtZXMgdGhhdCB0aGUgdGFnIGlzIGEgc2ltcGxlIHN0cmluZy5cclxuICAgICAqL1xyXG4gICAgZ2V0VGFnRGlzcGxheSh0YWc6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXkgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZGlzcGxheSh0YWcpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRhZ1s8c3RyaW5nPnRoaXMuZGlzcGxheV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0YWc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIGluZGV4IGlzIHNlbGVjdGVkICh0YWcgaW5kZXggb3IgaW5wdXQgZmllbGQpLlxyXG4gICAgICovXHJcbiAgICBpc1NlbGVjdGVkKGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gaW5kZXggPT09IHRoaXMuc2VsZWN0ZWRJbmRleDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFNlbGVjdCB0aGUgdGFnIGF0IHRoZSBnaXZlbiBpbmRleC4gRG9lcyBub3RoaW5nIGlmIGRpc2FibGVkIGlzIHRydWUuXHJcbiAgICAgKi9cclxuICAgIHNlbGVjdFRhZ0F0KHRhZ0luZGV4OiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWRUYWdJbmRleCh0YWdJbmRleCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ID0gdGFnSW5kZXg7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0IHRoZSBpbnB1dCBmaWVsZCwgZ2l2aW5nIGl0IGZvY3VzLiBEb2VzIG5vdGhpbmcgaWYgZGlzYWJsZWQgaXMgdHJ1ZS5cclxuICAgICAqL1xyXG4gICAgc2VsZWN0SW5wdXQoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLnRhZ3MubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlIHRoZSB0YWcgYXQgdGhlIGdpdmVuIGluZGV4LiBEb2VzIG5vdGhpbmcgaWYgZGlzYWJsZWQgaXMgdHJ1ZSBvciB0aGUgbWluVGFncyBwcm9wZXJ0eSBwcmV2ZW50cyByZW1vdmFsLlxyXG4gICAgICovXHJcbiAgICByZW1vdmVUYWdBdCh0YWdJbmRleDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkIHx8ICF0aGlzLmNhblJlbW92ZVRhZ0F0KHRhZ0luZGV4KSkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgdGhhdCB0aGUgdGFnSW5kZXggaXMgaW4gcmFuZ2VcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbGlkVGFnSW5kZXgodGFnSW5kZXgpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhZyA9IHRoaXMudGFnc1t0YWdJbmRleF07XHJcbiAgICAgICAgICAgIGNvbnN0IHRhZ1JlbW92aW5nRXZlbnQgPSBuZXcgVGFnSW5wdXRFdmVudCh0YWcpO1xyXG4gICAgICAgICAgICB0aGlzLnRhZ1JlbW92aW5nLmVtaXQodGFnUmVtb3ZpbmdFdmVudCk7XHJcbiAgICAgICAgICAgIGlmICghdGFnUmVtb3ZpbmdFdmVudC5kZWZhdWx0UHJldmVudGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIFNlbGVjdCBpbnB1dCBmaXJzdCB0byBhdm9pZCBpc3N1ZXMgd2l0aCBkcm9wcGluZyBmb2N1c1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZWxlY3RJbnB1dCgpO1xyXG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIHRoZSB0YWdcclxuICAgICAgICAgICAgICAgIHRoaXMudGFncy5zcGxpY2UodGFnSW5kZXgsIDEpO1xyXG4gICAgICAgICAgICAgICAgLy8gU2V0IGZvY3VzIGFnYWluIHNpbmNlIGluZGljZXMgaGF2ZSBjaGFuZ2VkXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdElucHV0KCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRhZ1JlbW92ZWQuZW1pdChuZXcgVGFnSW5wdXRFdmVudCh0YWcpKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsaWRhdGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFnIGF0IHRoZSBnaXZlbiBpbmRleCBjYW4gYmUgcmVtb3ZlZC5cclxuICAgICAqL1xyXG4gICAgY2FuUmVtb3ZlVGFnQXQodGFnSW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhZ3MubGVuZ3RoID4gdGhpcy5taW5UYWdzIHx8ICF0aGlzLmVuZm9yY2VUYWdMaW1pdHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGlucHV0IGZpZWxkIHNob3VsZCBiZSBhdmFpbGFibGUuXHJcbiAgICAgKi9cclxuICAgIGlzSW5wdXRWaXNpYmxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRhZ3MubGVuZ3RoIDwgdGhpcy5tYXhUYWdzIHx8ICF0aGlzLmVuZm9yY2VUYWdMaW1pdHM7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgYW55IHBhcnQgb2YgdGhlIGNvbnRyb2wgaGFzIGZvY3VzLlxyXG4gICAgICovXHJcbiAgICBoYXNGb2N1cygpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1ZhbGlkU2VsZWN0SW5kZXgodGhpcy5zZWxlY3RlZEluZGV4KTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGNvbm5lY3RUeXBlYWhlYWQodHlwZWFoZWFkOiBUeXBlYWhlYWRDb21wb25lbnQpIHtcclxuICAgICAgICBpZiAodGhpcy5fdHlwZWFoZWFkU3Vic2NyaXB0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3R5cGVhaGVhZFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgICAgICAgICB0aGlzLl90eXBlYWhlYWRTdWJzY3JpcHRpb24gPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy50eXBlYWhlYWQgPSB0eXBlYWhlYWQ7XHJcbiAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkKSB7XHJcbiAgICAgICAgICAgIC8vIFNldCB1cCBldmVudCBoYW5kbGVyIGZvciBzZWxlY3RlZCBvcHRpb25zXHJcbiAgICAgICAgICAgIHRoaXMuX3R5cGVhaGVhZFN1YnNjcmlwdGlvbiA9IHRoaXMudHlwZWFoZWFkLm9wdGlvblNlbGVjdGVkLnN1YnNjcmliZSh0aGlzLnR5cGVhaGVhZE9wdGlvblNlbGVjdGVkSGFuZGxlci5iaW5kKHRoaXMpKTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuX3R5cGVhaGVhZFN1YnNjcmlwdGlvbi5hZGQoXHJcbiAgICAgICAgICAgICAgICB0aGlzLnR5cGVhaGVhZC5oaWdobGlnaHRlZEVsZW1lbnRDaGFuZ2Uuc3Vic2NyaWJlKChlbGVtZW50OiBIVE1MRWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuaGlnaGxpZ2h0ZWRFbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogVmFsaWRhdGUgdGhlIGdpdmVuIHRhZ1ZhbHVlIHdpdGggdGhlIHRhZ1BhdHRlcm4sIGlmIHNldC4gVXBkYXRlIHZhbGlkYXRpb25FcnJvcnMgb24gdmFsaWRhdGlvbiBmYWlsdXJlLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIHZhbGlkYXRlVGFnKHRhZ1ZhbHVlOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBsZXQgaW5wdXRQYXR0ZXJuID0gbnVsbDtcclxuICAgICAgICB0aGlzLmlucHV0VmFsaWQgPSB0cnVlO1xyXG4gICAgICAgIGlmICh0aGlzLnRhZ1BhdHRlcm4gJiYgIXRoaXMudGFnUGF0dGVybi50ZXN0KHRhZ1ZhbHVlKSkge1xyXG4gICAgICAgICAgICBpbnB1dFBhdHRlcm4gPSB7XHJcbiAgICAgICAgICAgICAgICBnaXZlbjogdGFnVmFsdWUsXHJcbiAgICAgICAgICAgICAgICBwYXR0ZXJuOiB0aGlzLnRhZ1BhdHRlcm5cclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgdGhpcy5pbnB1dFZhbGlkID0gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudmFsaWRhdGlvbkVycm9yc1snaW5wdXRQYXR0ZXJuJ10gPSBpbnB1dFBhdHRlcm47XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRWYWxpZDtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIENyZWF0ZSBhIHRhZyBvYmplY3QgZm9yIHRoZSBnaXZlbiB0YWdWYWx1ZS4gSWYgY3JlYXRlVGFnSGFuZGxlciBpcyBzcGVjaWZpZWQsIHVzZSBpdDsgb3RoZXJ3aXNlIGlmIGRpc3BsYXlQcm9wZXJ0eSBpcyBzcGVjaWZpZWQsIGNyZWF0ZSBhbiBvYmplY3Qgd2l0aCB0aGUgdGFnVmFsdWUgYXMgdGhlIHNpbmdsZSBuYW1lZCBwcm9wZXJ0eTsgb3RoZXJ3aXNlIHJldHVybiB0aGUgdGFnVmFsdWUgaXRzZWxmLlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGNyZWF0ZVRhZyh0YWdWYWx1ZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBsZXQgdGFnID0gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5jcmVhdGVUYWdIYW5kbGVyICYmIHR5cGVvZiB0aGlzLmNyZWF0ZVRhZ0hhbmRsZXIgPT09ICdmdW5jdGlvbicpIHtcclxuICAgICAgICAgICAgdGFnID0gdGhpcy5jcmVhdGVUYWdIYW5kbGVyKHRhZ1ZhbHVlKTtcclxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiB0aGlzLmRpc3BsYXkgPT09ICdzdHJpbmcnKSB7XHJcbiAgICAgICAgICAgIHRhZyA9IHt9O1xyXG4gICAgICAgICAgICB0YWdbPHN0cmluZz50aGlzLmRpc3BsYXldID0gdGFnVmFsdWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGFnID0gdGFnVmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0YWc7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBBZGQgYSB0YWcgb2JqZWN0LCBjYWxsaW5nIHRoZSB0YWdBZGRpbmcgYW5kIHRhZ0FkZGVkIGV2ZW50cy4gUmV0dXJucyB0cnVlIGlmIHRoZSB0YWcgd2FzIGFkZGVkIHRvIHRoZSB0YWdzIGFycmF5LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGFkZFRhZyh0YWc6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0YWcpIHtcclxuICAgICAgICAgICAgLy8gVmVyaWZ5IHRoYXQgdGhlIG5ldyB0YWcgY2FuIGJlIGRpc3BsYXllZFxyXG4gICAgICAgICAgICBjb25zdCBkaXNwbGF5VmFsdWUgPSB0aGlzLmdldFRhZ0Rpc3BsYXkodGFnKTtcclxuICAgICAgICAgICAgaWYgKGRpc3BsYXlWYWx1ZSAmJiB0eXBlb2YgZGlzcGxheVZhbHVlID09PSAnc3RyaW5nJyAmJiBkaXNwbGF5VmFsdWUubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGFnQWRkaW5nRXZlbnQgPSBuZXcgVGFnSW5wdXRFdmVudCh0YWcpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdBZGRpbmcuZW1pdCh0YWdBZGRpbmdFdmVudCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXRhZ0FkZGluZ0V2ZW50LmRlZmF1bHRQcmV2ZW50ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFncyA9IHRoaXMudGFncyB8fCBbXTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ3MucHVzaCh0YWcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudGFnQWRkZWQuZW1pdChuZXcgVGFnSW5wdXRFdmVudCh0YWcpKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbGlkYXRlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gdGFnSW5kZXggaXMgYSB2YWxpZCB0YWcgaW5kZXguXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNWYWxpZFRhZ0luZGV4KHRhZ0luZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGFnSW5kZXggPj0gMCAmJiB0YWdJbmRleCA8IHRoaXMudGFncy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIGluZGV4IGlzIGEgdmFsaWQgc2VsZWN0aW9uIGluZGV4ICh0YWdzIG9yIGlucHV0IGZpZWxkKS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBpc1ZhbGlkU2VsZWN0SW5kZXgoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBpbmRleCA+PSAwICYmIGluZGV4IDw9IHRoaXMudGFncy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBjaGFyYWN0ZXIgY29ycmVzcG9uZGluZyB0byB0aGUgZ2l2ZW4ga2V5IGV2ZW50LCBtYWlubHkgZm9yIElFIGNvbXBhdGliaWxpdHkuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgZ2V0S2V5Q2hhcihldmVudDogS2V5Ym9hcmRFdmVudCk6IHN0cmluZyB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcclxuICAgICAgICAgICAgY2FzZSAnU3BhY2ViYXInOlxyXG4gICAgICAgICAgICAgICAgcmV0dXJuICcgJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGV2ZW50LmtleTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgYW4gYXJyYXkgb2Ygc3RyaW5ncyBjb3JyZXNwb25kaW5nIHRvIHRoZSBpbnB1dCBzdHJpbmcgc3BsaXQgYnkgdGhlIHRhZ0RlbGltaXRlcnMgY2hhcmFjdGVycy5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBzcGxpdFRhZ0lucHV0KGlucHV0OiBzdHJpbmcpOiBzdHJpbmdbXSB7XHJcbiAgICAgICAgbGV0IHRhZ1ZhbHVlcyA9IFtpbnB1dF07XHJcbiAgICAgICAgaWYgKHRoaXMudGFnRGVsaW1pdGVycyAmJiB0eXBlb2YgdGhpcy50YWdEZWxpbWl0ZXJzID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICBjb25zdCBlc2NhcGVkRGVsaW1pdGVycyA9IHRoaXMudGFnRGVsaW1pdGVycy5yZXBsYWNlKC9bLVxcL1xcXFxeJCorPy4oKXxbXFxde31dL2csICdcXFxcJCYnKTtcclxuICAgICAgICAgICAgY29uc3QgZGVsaW1pdGVyUmVnZXggPSBuZXcgUmVnRXhwKGBbJHtlc2NhcGVkRGVsaW1pdGVyc31dYCwgJ2cnKTtcclxuICAgICAgICAgICAgdGFnVmFsdWVzID0gaW5wdXQuc3BsaXQoZGVsaW1pdGVyUmVnZXgpLmZpbHRlcigocykgPT4gcy5sZW5ndGggPiAwKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhZ1ZhbHVlcztcclxuICAgIH1cclxufVxyXG5cclxuLyoqXHJcbiAqIFRoZSBBUEkgYXZhaWxhYmxlIHRvIHRhZyB0ZW1wbGF0ZXMuXHJcbiAqL1xyXG5leHBvcnQgaW50ZXJmYWNlIFRhZ0FwaSB7XHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdGhlIGRpc3BsYXkgdmFsdWUgb2YgdGhlIGdpdmVuIHRhZywgYWNjb3JkaW5nIHRvIHRoZSBkaXNwbGF5UHJvcGVydHkgcHJvcGVydHkuXHJcbiAgICAgKi9cclxuICAgIGdldFRhZ0Rpc3BsYXk6ICh0YWc6IGFueSkgPT4gc3RyaW5nO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmVtb3ZlcyB0aGUgdGFnIGF0IHRoZSBnaXZlbiBpbmRleCwgaWYgcG9zc2libGUuXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVRhZ0F0OiAoaW5kZXg6IG51bWJlcikgPT4gdm9pZDtcclxuXHJcbiAgICAvKipcclxuICAgICAqIFx0UmV0dXJucyB0cnVlIGlmIHRoZSB0YWcgYXQgdGhlIGdpdmVuIGluZGV4IGNhbiBiZSByZW1vdmVkLlxyXG4gICAgICovXHJcbiAgICBjYW5SZW1vdmVUYWdBdDogKGluZGV4OiBudW1iZXIpID0+IGJvb2xlYW47XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgZnVuY3Rpb24gdXNlZCB0byByZXR1cm4gY3VzdG9tIGNsYXNzIGluZm9ybWF0aW9uLCBmb3IgdXNlIGluIGBuZ0NsYXNzYC5cclxuICovXHJcbmV4cG9ydCB0eXBlIFRhZ0NsYXNzRnVuY3Rpb24gPSAodGFnOiBhbnksIGluZGV4OiBudW1iZXIsIHNlbGVjdGVkOiBib29sZWFuKSA9PiAoc3RyaW5nIHwgc3RyaW5nW10gfCBTZXQ8c3RyaW5nPik7Il19