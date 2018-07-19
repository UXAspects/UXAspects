/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Inject, Input, Output, QueryList, TemplateRef, ViewChild } from '@angular/core';
import { NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DOCUMENT } from '@angular/platform-browser';
import { delay } from 'rxjs/operators/delay';
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
            // Set up event handler for the highlighted element
            // Added a delay to move it out of the current change detection cycle
            this._typeaheadSubscription.add(this.typeahead.highlightedElementChange.pipe(delay(0)).subscribe((element) => {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFnLWlucHV0LmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL3RhZy1pbnB1dC90YWctaW5wdXQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLFlBQVksRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFnQyxNQUFNLEVBQUUsU0FBUyxFQUFpQixXQUFXLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3JQLE9BQU8sRUFBd0IsYUFBYSxFQUFFLGlCQUFpQixFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDeEYsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUU3QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUU3RSxPQUFPLEVBQUUsYUFBYSxFQUFFLE1BQU0sbUJBQW1CLENBQUM7QUFFbEQscUJBQUksUUFBUSxHQUFHLENBQUMsQ0FBQztBQUVqQix1QkFBTSx1QkFBdUIsR0FBRztJQUM1QixPQUFPLEVBQUUsaUJBQWlCO0lBQzFCLFdBQVcsRUFBRSxVQUFVLENBQUMsTUFBTSxpQkFBaUIsQ0FBQztJQUNoRCxLQUFLLEVBQUUsSUFBSTtDQUNkLENBQUM7QUFDRix1QkFBTSxrQkFBa0IsR0FBRztJQUN2QixPQUFPLEVBQUUsYUFBYTtJQUN0QixXQUFXLEVBQUUsVUFBVSxDQUFDLE1BQU0saUJBQWlCLENBQUM7SUFDaEQsS0FBSyxFQUFFLElBQUk7Q0FDZCxDQUFDO0FBdURGLE1BQU07Ozs7OztJQWdGRixZQUNZLFVBQ2tCLFdBQ2xCO1FBRkEsYUFBUSxH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Szt3QkFDTCxLQUFLOzRCQUNMLEtBQUs7cUNBQ0wsS0FBSzs4QkFDTCxLQUFLOzJCQUNMLEtBQUs7NEJBQ0wsS0FBSzt5QkFDTCxLQUFLO2lDQUNMLEtBQUs7aUNBQ0wsS0FBSyxTQUFDLFdBQVc7MEJBRWpCLE1BQU07eUJBQ04sTUFBTTsrQkFDTixNQUFNOzRCQUNOLE1BQU07MkJBQ04sTUFBTTt5QkFDTixNQUFNOytCQUVOLGVBQWUsU0FBQyxrQkFBa0I7eUJBRWxDLFNBQVMsU0FBQyxVQUFVO29DQUVwQixTQUFTLFNBQUMsb0JBQW9COzJCQWtHOUIsWUFBWSxTQUFDLFNBQVMsRUFBRSxDQUFDLFFBQVEsQ0FBQztnQ0EwRWxDLFlBQVksU0FBQyxVQUFVLEVBQUUsQ0FBQyxRQUFRLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlckNvbnRlbnRJbml0LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBmb3J3YXJkUmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbmplY3QsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgU2ltcGxlQ2hhbmdlcywgVGVtcGxhdGVSZWYsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xyXG5pbXBvcnQgeyBDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMSURBVE9SUywgTkdfVkFMVUVfQUNDRVNTT1IgfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XHJcbmltcG9ydCB7IERPQ1VNRU5UIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XHJcbmltcG9ydCB7IGRlbGF5IH0gZnJvbSAncnhqcy9vcGVyYXRvcnMvZGVsYXknO1xyXG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XHJcbmltcG9ydCB7IFR5cGVhaGVhZENvbXBvbmVudCwgVHlwZWFoZWFkS2V5U2VydmljZSB9IGZyb20gJy4uL3R5cGVhaGVhZC9pbmRleCc7XHJcbmltcG9ydCB7IFR5cGVhaGVhZE9wdGlvbkV2ZW50IH0gZnJvbSAnLi4vdHlwZWFoZWFkL3R5cGVhaGVhZC1ldmVudCc7XHJcbmltcG9ydCB7IFRhZ0lucHV0RXZlbnQgfSBmcm9tICcuL3RhZy1pbnB1dC1ldmVudCc7XHJcblxyXG5sZXQgdW5pcXVlSWQgPSAwO1xyXG5cclxuY29uc3QgVEFHSU5QVVRfVkFMVUVfQUNDRVNTT1IgPSB7XHJcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcclxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IFRhZ0lucHV0Q29tcG9uZW50KSxcclxuICAgIG11bHRpOiB0cnVlXHJcbn07XHJcbmNvbnN0IFRBR0lOUFVUX1ZBTElEQVRPUiA9IHtcclxuICAgIHByb3ZpZGU6IE5HX1ZBTElEQVRPUlMsXHJcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBUYWdJbnB1dENvbXBvbmVudCksXHJcbiAgICBtdWx0aTogdHJ1ZVxyXG59O1xyXG5cclxuQENvbXBvbmVudCh7XHJcbiAgICBzZWxlY3RvcjogJ3V4LXRhZy1pbnB1dCcsXHJcbiAgICB0ZW1wbGF0ZTogYDxvbCBbYXR0ci5yb2xlXT1cInR5cGVhaGVhZCA/ICdjb21ib2JveCcgOiAnbm9uZSdcIiBbYXR0ci5hcmlhLWhhc3BvcHVwXT1cInR5cGVhaGVhZCA/ICdsaXN0Ym94JyA6IG51bGxcIj5cbiAgICA8bGkgKm5nRm9yPVwibGV0IHRhZyBvZiB0YWdzOyBsZXQgaSA9IGluZGV4XCIgY2xhc3M9XCJ1eC10YWdcIlxuICAgICAgICBbY2xhc3MuZGlzYWJsZWRdPVwiZGlzYWJsZWRcIlxuICAgICAgICBbbmdDbGFzc109XCJ0YWdDbGFzcyh0YWcsIGksIGlzU2VsZWN0ZWQoaSkpXCJcbiAgICAgICAgW2F0dHIudGFiaW5kZXhdPVwiZGlzYWJsZWQgPyBudWxsIDogMFwiXG4gICAgICAgIFtmb2N1c0lmXT1cImlzU2VsZWN0ZWQoaSlcIlxuICAgICAgICAoY2xpY2spPVwidGFnQ2xpY2tIYW5kbGVyKCRldmVudCwgdGFnLCBpKVwiXG4gICAgICAgIChmb2N1cyk9XCJzZWxlY3RUYWdBdChpKVwiPlxuXG4gICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFnVGVtcGxhdGVcIlxuICAgICAgICAgICAgW25nVGVtcGxhdGVPdXRsZXRDb250ZXh0XT1cInt0YWc6IHRhZywgaW5kZXg6IGksIGRpc2FibGVkOiBkaXNhYmxlZCwgYXBpOiB0YWdBcGl9XCI+XG4gICAgICAgIDwvbmctY29udGFpbmVyPlxuXG4gICAgPC9saT5cbiAgICA8bGkgKm5nSWY9XCJpc0lucHV0VmlzaWJsZSgpXCIgY2xhc3M9XCJ1eC10YWctaW5wdXRcIiByb2xlPVwibm9uZVwiPlxuICAgICAgICA8aW5wdXQgI3RhZ0lucHV0IHR5cGU9XCJ0ZXh0XCIgW2F0dHIuaWRdPVwiaWRcIiBjbGFzcz1cInV4LXRhZy1pbnB1dFwiXG4gICAgICAgICAgICBbKG5nTW9kZWwpXT1cImlucHV0XCJcbiAgICAgICAgICAgIFtjbGFzcy5pbnZhbGlkXT1cIiFpbnB1dFZhbGlkXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtYWN0aXZlZGVzY2VuZGFudF09XCJoaWdobGlnaHRlZEVsZW1lbnQ/LmlkXCJcbiAgICAgICAgICAgIFthdHRyLmFyaWEtYXV0b2NvbXBsZXRlXT1cInR5cGVhaGVhZCA/ICdsaXN0JyA6ICdub25lJ1wiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLWNvbnRyb2xzXT1cInR5cGVhaGVhZD8uaWRcIlxuICAgICAgICAgICAgYXJpYS1tdWx0aWxpbmU9XCJmYWxzZVwiXG4gICAgICAgICAgICBbcGxhY2Vob2xkZXJdPVwiZGlzYWJsZWQgPyAnJyA6IChwbGFjZWhvbGRlciB8fCAnJylcIlxuICAgICAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgICAgIFtmb2N1c0lmXT1cImlzU2VsZWN0ZWQodGFncy5sZW5ndGgpXCJcbiAgICAgICAgICAgIChjbGljayk9XCJpbnB1dENsaWNrSGFuZGxlcigpXCJcbiAgICAgICAgICAgIChmb2N1cyk9XCJpbnB1dEZvY3VzSGFuZGxlcigpXCJcbiAgICAgICAgICAgIChwYXN0ZSk9XCJpbnB1dFBhc3RlSGFuZGxlcigkZXZlbnQpXCI+XG4gICAgPC9saT5cbjwvb2w+XG5cbjxuZy1jb250ZW50ICN0eXBlYWhlYWQ+PC9uZy1jb250ZW50PlxuXG48bmctdGVtcGxhdGUgI2RlZmF1bHRUYWdUZW1wbGF0ZSBsZXQtdGFnPVwidGFnXCIgbGV0LWluZGV4PVwiaW5kZXhcIiBsZXQtZGlzYWJsZWQ9XCJkaXNhYmxlZFwiIGxldC1hcGk9XCJhcGlcIj5cbiAgICA8c3BhbiBjbGFzcz1cInV4LXRhZy10ZXh0XCI+e3thcGkuZ2V0VGFnRGlzcGxheSh0YWcpfX08L3NwYW4+XG4gICAgPGJ1dHRvbiAqbmdJZj1cImFwaS5jYW5SZW1vdmVUYWdBdChpbmRleClcIlxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3M9XCJ1eC10YWctcmVtb3ZlXCJcbiAgICAgICAgYXJpYS1sYWJlbD1cIlJlbW92ZSBJdGVtXCJcbiAgICAgICAgW2Rpc2FibGVkXT1cImRpc2FibGVkXCJcbiAgICAgICAgKGNsaWNrKT1cImFwaS5yZW1vdmVUYWdBdChpbmRleCk7ICRldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcIj5cbiAgICAgICAgPHNwYW4gY2xhc3M9XCJocGUtaWNvbiBocGUtY2xvc2VcIj48L3NwYW4+XG4gICAgPC9idXR0b24+XG48L25nLXRlbXBsYXRlPmAsXHJcbiAgICBwcm92aWRlcnM6IFtUQUdJTlBVVF9WQUxVRV9BQ0NFU1NPUiwgVEFHSU5QVVRfVkFMSURBVE9SXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnW2NsYXNzLmRpc2FibGVkXSc6ICdkaXNhYmxlZCcsXHJcbiAgICAgICAgJ1tjbGFzcy5mb2N1c10nOiAnaGFzRm9jdXMoKScsXHJcbiAgICAgICAgJ1tjbGFzcy5pbnZhbGlkXSc6ICchdmFsaWQgfHwgIWlucHV0VmFsaWQnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBUYWdJbnB1dENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgQWZ0ZXJDb250ZW50SW5pdCwgT25DaGFuZ2VzLCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95IHtcclxuXHJcbiAgICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2F0dHIuaWQnKSBpZDogc3RyaW5nID0gYHV4LXRhZy1pbnB1dC0keysrdW5pcXVlSWR9YDtcclxuXHJcbiAgICBASW5wdXQoJ3RhZ3MnKVxyXG4gICAgZ2V0IHRhZ3MoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLl90YWdzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuX3RhZ3MgPSBbXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX3RhZ3M7XHJcbiAgICB9XHJcbiAgICBzZXQgdGFncyh2YWx1ZTogYW55W10pIHtcclxuICAgICAgICB0aGlzLl90YWdzID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5fb25DaGFuZ2VIYW5kbGVyKHRoaXMuX3RhZ3MpO1xyXG4gICAgICAgIHRoaXMudGFnc0NoYW5nZS5lbWl0KHRoaXMuX3RhZ3MpO1xyXG4gICAgfVxyXG5cclxuICAgIEBPdXRwdXQoKSB0YWdzQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxhbnlbXT4oKTtcclxuXHJcbiAgICBASW5wdXQoJ2lucHV0JylcclxuICAgIGdldCBpbnB1dCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5faW5wdXQ7XHJcbiAgICB9XHJcbiAgICBzZXQgaW5wdXQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuX2lucHV0ID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5pbnB1dENoYW5nZS5lbWl0KHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICBAT3V0cHV0KCkgaW5wdXRDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcclxuXHJcbiAgICBASW5wdXQoKSBkaXNwbGF5OiAob3B0aW9uOiBhbnkpID0+IHN0cmluZyB8IHN0cmluZztcclxuICAgIEBJbnB1dCgpIGFkZE9uUGFzdGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgQElucHV0KCkgZGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGVuZm9yY2VUYWdMaW1pdHM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIEBJbnB1dCgpIGZyZWVJbnB1dDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBASW5wdXQoKSBtYXhUYWdzOiBudW1iZXIgPSBOdW1iZXIuTUFYX1ZBTFVFO1xyXG4gICAgQElucHV0KCkgbWluVGFnczogbnVtYmVyID0gMDtcclxuICAgIEBJbnB1dCgpIHBsYWNlaG9sZGVyOiBzdHJpbmcgPSAnJztcclxuICAgIEBJbnB1dCgpIHNob3dUeXBlYWhlYWRPbkNsaWNrOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBASW5wdXQoKSB0YWdEZWxpbWl0ZXJzOiBzdHJpbmcgPSAnJztcclxuICAgIEBJbnB1dCgpIHRhZ1BhdHRlcm46IFJlZ0V4cDtcclxuICAgIEBJbnB1dCgpIHRhZ1RlbXBsYXRlOiBUZW1wbGF0ZVJlZjxhbnk+O1xyXG4gICAgQElucHV0KCkgdGFnQ2xhc3M6IFRhZ0NsYXNzRnVuY3Rpb24gPSAoKSA9PiB1bmRlZmluZWQ7XHJcbiAgICBASW5wdXQoKSB2YWxpZGF0aW9uRXJyb3JzOiBhbnkgPSB7fTtcclxuICAgIEBJbnB1dCgnY3JlYXRlVGFnJykgY3JlYXRlVGFnSGFuZGxlcjogKHZhbHVlOiBzdHJpbmcpID0+IGFueTtcclxuXHJcbiAgICBAT3V0cHV0KCkgdGFnQWRkaW5nID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ0FkZGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ0ludmFsaWRhdGVkID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ1JlbW92aW5nID0gbmV3IEV2ZW50RW1pdHRlcjxUYWdJbnB1dEV2ZW50PigpO1xyXG4gICAgQE91dHB1dCgpIHRhZ1JlbW92ZWQgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ0lucHV0RXZlbnQ+KCk7XHJcbiAgICBAT3V0cHV0KCkgdGFnQ2xpY2sgPSBuZXcgRXZlbnRFbWl0dGVyPFRhZ0lucHV0RXZlbnQ+KCk7XHJcblxyXG4gICAgQENvbnRlbnRDaGlsZHJlbihUeXBlYWhlYWRDb21wb25lbnQpIHR5cGVhaGVhZFF1ZXJ5OiBRdWVyeUxpc3Q8VHlwZWFoZWFkQ29tcG9uZW50PjtcclxuXHJcbiAgICBAVmlld0NoaWxkKCd0YWdJbnB1dCcpIHRhZ0lucHV0OiBFbGVtZW50UmVmO1xyXG5cclxuICAgIEBWaWV3Q2hpbGQoJ2RlZmF1bHRUYWdUZW1wbGF0ZScpIHByaXZhdGUgX2RlZmF1bHRUYWdUZW1wbGF0ZTogVGVtcGxhdGVSZWY8YW55PjtcclxuXHJcbiAgICBzZWxlY3RlZEluZGV4OiBudW1iZXIgPSAtMTtcclxuXHJcbiAgICB0YWdBcGk6IFRhZ0FwaSA9IHtcclxuICAgICAgICBnZXRUYWdEaXNwbGF5OiB0aGlzLmdldFRhZ0Rpc3BsYXkuYmluZCh0aGlzKSxcclxuICAgICAgICByZW1vdmVUYWdBdDogdGhpcy5yZW1vdmVUYWdBdC5iaW5kKHRoaXMpLFxyXG4gICAgICAgIGNhblJlbW92ZVRhZ0F0OiB0aGlzLmNhblJlbW92ZVRhZ0F0LmJpbmQodGhpcylcclxuICAgIH07XHJcblxyXG4gICAgdmFsaWQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgaW5wdXRWYWxpZDogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgdHlwZWFoZWFkOiBUeXBlYWhlYWRDb21wb25lbnQ7XHJcblxyXG4gICAgaGlnaGxpZ2h0ZWRFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuXHJcbiAgICBwcml2YXRlIF9pbnB1dDogc3RyaW5nID0gJyc7XHJcbiAgICBwcml2YXRlIF90YWdzOiBhbnlbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBfb25DaGFuZ2VIYW5kbGVyOiAoXzogYW55KSA9PiB2b2lkID0gKCkgPT4geyB9O1xyXG4gICAgcHJpdmF0ZSBfb25Ub3VjaGVkSGFuZGxlcjogKCkgPT4gdm9pZCA9ICgpID0+IHsgfTtcclxuICAgIHByaXZhdGUgX3R5cGVhaGVhZFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKFxyXG4gICAgICAgIHByaXZhdGUgX2VsZW1lbnQ6IEVsZW1lbnRSZWYsXHJcbiAgICAgICAgQEluamVjdChET0NVTUVOVCkgcHJpdmF0ZSBfZG9jdW1lbnQ6IGFueSxcclxuICAgICAgICBwcml2YXRlIF90eXBlYWhlYWRLZXlTZXJ2aWNlOiBUeXBlYWhlYWRLZXlTZXJ2aWNlKSB7IH1cclxuXHJcbiAgICBuZ09uSW5pdCgpIHtcclxuICAgICAgICBpZiAoIXRoaXMudGFnVGVtcGxhdGUpIHtcclxuICAgICAgICAgICAgdGhpcy50YWdUZW1wbGF0ZSA9IHRoaXMuX2RlZmF1bHRUYWdUZW1wbGF0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgbmdBZnRlckNvbnRlbnRJbml0KCkge1xyXG4gICAgICAgIC8vIFdhdGNoIGZvciBvcHRpb25hbCBjaGlsZCB0eXBlYWhlYWQgY29udHJvbFxyXG4gICAgICAgIHRoaXMuY29ubmVjdFR5cGVhaGVhZCh0aGlzLnR5cGVhaGVhZFF1ZXJ5LmZpcnN0KTtcclxuICAgICAgICB0aGlzLnR5cGVhaGVhZFF1ZXJ5LmNoYW5nZXMuc3Vic2NyaWJlKChxdWVyeSkgPT4ge1xyXG4gICAgICAgICAgICB0aGlzLmNvbm5lY3RUeXBlYWhlYWQocXVlcnkuZmlyc3QpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpIHtcclxuICAgICAgICBpZiAoY2hhbmdlcy5kaXNhYmxlZCkge1xyXG4gICAgICAgICAgICBpZiAoY2hhbmdlcy5kaXNhYmxlZC5jdXJyZW50VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIC8vIENsZWFyIHNlbGVjdGlvbiBhbmQgY2xvc2UgZHJvcGRvd25cclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlYWhlYWQub3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdmFsaWRhdGlvbiBzdGF0dXNcclxuICAgICAgICB0aGlzLnZhbGlkYXRlKCk7XHJcbiAgICB9XHJcblxyXG4gICAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55W10pIHtcclxuICAgICAgICBpZiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy50YWdzID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSkge1xyXG4gICAgICAgIHRoaXMuX29uQ2hhbmdlSGFuZGxlciA9IGZuO1xyXG4gICAgfVxyXG5cclxuICAgIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcclxuICAgICAgICB0aGlzLl9vblRvdWNoZWRIYW5kbGVyID0gZm47XHJcbiAgICB9XHJcblxyXG4gICAgc2V0RGlzYWJsZWRTdGF0ZShpc0Rpc2FibGVkOiBib29sZWFuKTogdm9pZCB7XHJcbiAgICAgICAgdGhpcy5kaXNhYmxlZCA9IGlzRGlzYWJsZWQ7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XHJcbiAgICAgICAgaWYgKHRoaXMuX3R5cGVhaGVhZFN1YnNjcmlwdGlvbikge1xyXG4gICAgICAgICAgICB0aGlzLl90eXBlYWhlYWRTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBWYWxpZGF0ZSB0aGUgdmFsdWUgb2YgdGhlIGNvbnRyb2wgKHRhZ3MgcHJvcGVydHkpLlxyXG4gICAgICovXHJcbiAgICB2YWxpZGF0ZSgpIHtcclxuICAgICAgICB0aGlzLnZhbGlkID0gdHJ1ZTtcclxuICAgICAgICBsZXQgdGFnUmFuZ2VFcnJvciA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMudGFncyAmJiAodGhpcy50YWdzLmxlbmd0aCA8IHRoaXMubWluVGFncyB8fCB0aGlzLnRhZ3MubGVuZ3RoID4gdGhpcy5tYXhUYWdzKSkge1xyXG4gICAgICAgICAgICB0YWdSYW5nZUVycm9yID0ge1xyXG4gICAgICAgICAgICAgICAgZ2l2ZW46IHRoaXMudGFncy5sZW5ndGgsXHJcbiAgICAgICAgICAgICAgICBtaW46IHRoaXMubWluVGFncyxcclxuICAgICAgICAgICAgICAgIG1heDogdGhpcy5tYXhUYWdzXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMudmFsaWQgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy52YWxpZGF0aW9uRXJyb3JzWyd0YWdSYW5nZUVycm9yJ10gPSB0YWdSYW5nZUVycm9yO1xyXG4gICAgfVxyXG5cclxuICAgIEBIb3N0TGlzdGVuZXIoJ2tleWRvd24nLCBbJyRldmVudCddKVxyXG4gICAga2V5SGFuZGxlcihldmVudDogS2V5Ym9hcmRFdmVudCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgLy8gR2V0IHRoZSBpbnB1dCBmaWVsZCBjdXJzb3IgbG9jYXRpb25cclxuICAgICAgICBjb25zdCBpbnB1dEN1cnNvclBvcyA9IHRoaXMudGFnSW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25TdGFydDtcclxuXHJcbiAgICAgICAgLy8gRGV0ZXJtaW5lIGlmIHRoZSBpbnB1dCBmaWVsZCBoYXMgYW55IHRleHQgc2VsZWN0ZWRcclxuICAgICAgICBjb25zdCBoYXNTZWxlY3Rpb24gPSB0aGlzLnRhZ0lucHV0Lm5hdGl2ZUVsZW1lbnQuc2VsZWN0aW9uU3RhcnQgIT09IHRoaXMudGFnSW5wdXQubmF0aXZlRWxlbWVudC5zZWxlY3Rpb25FbmQ7XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSBpZiBhIHRhZyBoYXMgZm9jdXNcclxuICAgICAgICBjb25zdCB0YWdTZWxlY3RlZCA9IHRoaXMuaXNWYWxpZFRhZ0luZGV4KHRoaXMuc2VsZWN0ZWRJbmRleCk7XHJcblxyXG4gICAgICAgIGNvbnN0IGlucHV0TGVuZ3RoID0gdGhpcy5pbnB1dCA/IHRoaXMuaW5wdXQubGVuZ3RoIDogMDtcclxuXHJcbiAgICAgICAgLy8gQ2hlY2sgd2hldGhlciB0aGUgYXJyb3cga2V5cyBjYW4gbW92ZSB0aGUgc2VsZWN0aW9uLiBPdGhlcndpc2UgdGhlIGlucHV0IGZpZWxkIHRha2VzIHRoZSBldmVudC5cclxuICAgICAgICBjb25zdCBjYW5OYXZpZ2F0ZUxlZnQgPSB0YWdTZWxlY3RlZCB8fCAoaW5wdXRDdXJzb3JQb3MgPD0gMCAmJiAhaGFzU2VsZWN0aW9uKTtcclxuICAgICAgICBjb25zdCBjYW5OYXZpZ2F0ZVJpZ2h0ID0gdGFnU2VsZWN0ZWQgfHwgKGlucHV0Q3Vyc29yUG9zID49IGlucHV0TGVuZ3RoICYmICFoYXNTZWxlY3Rpb24pO1xyXG5cclxuICAgICAgICAvLyBGb3J3YXJkIGtleSBldmVudHMgdG8gdGhlIHR5cGVhaGVhZCBjb21wb25lbnQuXHJcbiAgICAgICAgdGhpcy5fdHlwZWFoZWFkS2V5U2VydmljZS5oYW5kbGVLZXkoZXZlbnQsIHRoaXMudHlwZWFoZWFkKTtcclxuXHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcclxuICAgICAgICAgICAgY2FzZSAnRW50ZXInOlxyXG4gICAgICAgICAgICAgICAgLy8gQ2hlY2sgaWYgYSB0eXBlYWhlYWQgb3B0aW9uIGlzIGhpZ2hsaWdodGVkXHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy50eXBlYWhlYWQgJiYgdGhpcy50eXBlYWhlYWQub3BlbiAmJiB0aGlzLnR5cGVhaGVhZC5oaWdobGlnaHRlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFkZCB0aGUgdHlwZWFoZWFkIG9wdGlvbiBhcyBhIHRhZywgY2xlYXIgdGhlIGlucHV0LCBhbmQgY2xvc2UgdGhlIGRyb3Bkb3duXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21taXRUeXBlYWhlYWQodGhpcy50eXBlYWhlYWQuaGlnaGxpZ2h0ZWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudHlwZWFoZWFkLm9wZW4gPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVmFsaWRhdGUgYW5kIGFkZCB0aGUgaW5wdXQgdGV4dCBhcyBhIHRhZywgaWYgcG9zc2libGVcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbW1pdElucHV0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ0JhY2tzcGFjZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FuTmF2aWdhdGVMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5iYWNrc3BhY2UoKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ0RlbGV0ZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ0RlbCc6XHJcbiAgICAgICAgICAgICAgICBpZiAodGFnU2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZVRhZ0F0KHRoaXMuc2VsZWN0ZWRJbmRleCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnQXJyb3dMZWZ0JzpcclxuICAgICAgICAgICAgY2FzZSAnTGVmdCc6XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FuTmF2aWdhdGVMZWZ0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tb3ZlU2VsZWN0aW9uKC0xKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxyXG4gICAgICAgICAgICBjYXNlICdSaWdodCc6XHJcbiAgICAgICAgICAgICAgICBpZiAoY2FuTmF2aWdhdGVSaWdodCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubW92ZVNlbGVjdGlvbigxKTtcclxuICAgICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayBmb3Iga2V5cyBpbiB0aGUgdGFnRGVsaW1pdGVyc1xyXG4gICAgICAgIGlmICh0aGlzLnRhZ0RlbGltaXRlcnMgJiYgdGhpcy50YWdEZWxpbWl0ZXJzLmluZGV4T2YodGhpcy5nZXRLZXlDaGFyKGV2ZW50KSkgPj0gMCkge1xyXG4gICAgICAgICAgICAvLyBDb21taXQgcHJldmlvdXMgdGV4dFxyXG4gICAgICAgICAgICB0aGlzLmNvbW1pdElucHV0KCk7XHJcbiAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBASG9zdExpc3RlbmVyKCdmb2N1c291dCcsIFsnJGV2ZW50J10pXHJcbiAgICBmb2N1c091dEhhbmRsZXIoZXZlbnQ6IEZvY3VzRXZlbnQpIHtcclxuXHJcbiAgICAgICAgLy8gSWYgYSBjbGljayBvbiB0aGUgdHlwZWFoZWFkIGlzIGluIHByb2dyZXNzLCBkb24ndCBkbyBhbnl0aGluZy5cclxuICAgICAgICAvLyBUaGlzIHdvcmtzIGFyb3VuZCBhbiBpc3N1ZSBpbiBJRSB3aGVyZSBjbGlja2luZyBhIHNjcm9sbGJhciBkcm9wcyBmb2N1cy5cclxuICAgICAgICBpZiAodGhpcy50eXBlYWhlYWQgJiYgdGhpcy50eXBlYWhlYWQuY2xpY2tpbmcpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQ2xvc2UgdGhlIGRyb3Bkb3duIG9uIGJsdXJcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLl9lbGVtZW50Lm5hdGl2ZUVsZW1lbnQuY29udGFpbnModGhpcy5fZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IC0xO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMudHlwZWFoZWFkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50eXBlYWhlYWQub3BlbiA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSwgMjAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0YWdDbGlja0hhbmRsZXIoZXZlbnQ6IE1vdXNlRXZlbnQsIHRhZzogYW55LCBpbmRleDogbnVtYmVyKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAvLyBTZW5kIHRhZ0NsaWNrIGV2ZW50XHJcbiAgICAgICAgY29uc3QgdGFnQ2xpY2tFdmVudCA9IG5ldyBUYWdJbnB1dEV2ZW50KHRhZyk7XHJcbiAgICAgICAgdGhpcy50YWdDbGljay5lbWl0KHRhZ0NsaWNrRXZlbnQpO1xyXG5cclxuICAgICAgICAvLyBQcmV2ZW50IGZvY3VzIGlmIHByZXZlbnREZWZhdWx0KCkgd2FzIGNhbGxlZFxyXG4gICAgICAgIGlmICh0YWdDbGlja0V2ZW50LmRlZmF1bHRQcmV2ZW50ZWQoKSkge1xyXG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTZWxlY3QgdGhlIHRhZyAoZm9yIElFIHRoYXQgZG9lc24ndCBwcm9wYWdhdGUgZm9jdXMpXHJcbiAgICAgICAgdGhpcy5zZWxlY3RUYWdBdChpbmRleCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRDbGlja0hhbmRsZXIoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy50eXBlYWhlYWQgJiYgdGhpcy5zaG93VHlwZWFoZWFkT25DbGljaykge1xyXG4gICAgICAgICAgICB0aGlzLnR5cGVhaGVhZC5vcGVuID0gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRGb2N1c0hhbmRsZXIoKSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICB0aGlzLnNlbGVjdElucHV0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5wdXRQYXN0ZUhhbmRsZXIoZXZlbnQ6IENsaXBib2FyZEV2ZW50KSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5hZGRPblBhc3RlKSB7XHJcbiAgICAgICAgICAgIC8vIEdldCB0ZXh0IGZyb20gdGhlIGNsaXBib2FyZFxyXG4gICAgICAgICAgICBsZXQgaW5wdXQ6IHN0cmluZyA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmIChldmVudC5jbGlwYm9hcmREYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBpbnB1dCA9IGV2ZW50LmNsaXBib2FyZERhdGEuZ2V0RGF0YSgndGV4dC9wbGFpbicpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCg8YW55PndpbmRvdykuY2xpcGJvYXJkRGF0YSkge1xyXG4gICAgICAgICAgICAgICAgLy8gSW50ZXJuZXQgRXhwbG9yZXIgb25seVxyXG4gICAgICAgICAgICAgICAgaW5wdXQgPSAoPGFueT53aW5kb3cpLmNsaXBib2FyZERhdGEuZ2V0RGF0YSgnVGV4dCcpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBDb21taXQgdGhlIGNsaXBib2FyZCB0ZXh0IGRpcmVjdGx5XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNvbW1pdChpbnB1dCkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SW5wdXQoKTtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0eXBlYWhlYWRPcHRpb25TZWxlY3RlZEhhbmRsZXIoZXZlbnQ6IFR5cGVhaGVhZE9wdGlvbkV2ZW50KSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmRpc2FibGVkKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAvLyBXaGVuIHRoZSB0eXBlYWhlYWQgc2VuZHMgdGhlIG9wdGlvblNlbGVjdGVkIGV2ZW50LCBjb21taXQgdGhlIG9iamVjdCBkaXJlY3RseVxyXG4gICAgICAgIHRoaXMuY29tbWl0VHlwZWFoZWFkKGV2ZW50Lm9wdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDb21taXQgdGhlIGN1cnJlbnQgaW5wdXQgdmFsdWUgYW5kIGNsZWFyIHRoZSBpbnB1dCBmaWVsZCBpZiBzdWNjZXNzZnVsLlxyXG4gICAgICovXHJcbiAgICBjb21taXRJbnB1dCgpIHtcclxuICAgICAgICBpZiAodGhpcy5jb21taXQodGhpcy5pbnB1dCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RJbnB1dCgpO1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0ID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tbWl0IHRoZSBnaXZlbiB0YWcgb2JqZWN0IGFuZCBjbGVhciB0aGUgaW5wdXQgaWYgc3VjY2Vzc2Z1bC5cclxuICAgICAqL1xyXG4gICAgY29tbWl0VHlwZWFoZWFkKHRhZzogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuYWRkVGFnKHRhZykpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RJbnB1dCgpO1xyXG4gICAgICAgICAgICB0aGlzLmlucHV0ID0gJyc7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQ29tbWl0IHRoZSBnaXZlbiBzdHJpbmcgdmFsdWUgYXMgb25lIG9yIG1vcmUgdGFncywgaWYgdmFsaWRhdGlvbiBwYXNzZXMuIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFnKHMpIHdlcmUgY3JlYXRlZC5cclxuICAgICAqL1xyXG4gICAgY29tbWl0KGlucHV0OiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoaW5wdXQgJiYgdGhpcy5mcmVlSW5wdXQpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIFNwbGl0IHRoZSB0YWdzIGJ5IHRoZSB0YWdEZWxpbWl0ZXJzIGlmIGNvbmZpZ3VyZWRcclxuICAgICAgICAgICAgY29uc3QgbmV3VGFncyA9IHRoaXMuc3BsaXRUYWdJbnB1dChpbnB1dCk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGVjayB0YWcgdmFsaWRhdGlvbiBmb3IgYWxsIG9mIHRoZSBpbmRpdmlkdWFsIHZhbHVlc1xyXG4gICAgICAgICAgICBsZXQgYWxsVmFsaWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBmb3IgKGxldCBuZXdUYWcgb2YgbmV3VGFncykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdmFsaWQgPSB0aGlzLnZhbGlkYXRlVGFnKG5ld1RhZyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxsVmFsaWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gQWRkIHRoZSB0YWdzIGlmIGFsbCBhcmUgdmFsaWRcclxuICAgICAgICAgICAgaWYgKGFsbFZhbGlkKSB7XHJcbiAgICAgICAgICAgICAgICBmb3IgKGxldCBuZXdUYWcgb2YgbmV3VGFncykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkVGFnKHRoaXMuY3JlYXRlVGFnKG5ld1RhZykpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBJZiBubyB0YWcgaXMgc2VsZWN0ZWQsIHNlbGVjdCB0aGUgcmlnaHRtb3N0IHRhZy4gSWYgYSB0YWcgaXMgc2VsZWN0ZWQsIHJlbW92ZSBpdC5cclxuICAgICAqL1xyXG4gICAgYmFja3NwYWNlKCkge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsaWRUYWdJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXgpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0VGFnQXQodGhpcy50YWdzLmxlbmd0aCAtIDEpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlVGFnQXQodGhpcy5zZWxlY3RlZEluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBNb3ZlIHRoZSBoaWdobGlnaHRlZCBvcHRpb24gZm9yd2FyZHMgb3IgYmFja3dhcmRzIGluIHRoZSBsaXN0LiBXcmFwcyBhdCB0aGUgbGltaXRzLlxyXG4gICAgICogQHBhcmFtIGQgVmFsdWUgdG8gYmUgYWRkZWQgdG8gdGhlIHNlbGVjdGVkIGluZGV4LCBpLmUuIC0xIHRvIG1vdmUgYmFja3dhcmRzLCArMSB0byBtb3ZlIGZvcndhcmRzLlxyXG4gICAgICovXHJcbiAgICBtb3ZlU2VsZWN0aW9uKGQ6IG51bWJlcikge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFNlbGVjdEluZGV4KHRoaXMuc2VsZWN0ZWRJbmRleCkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZEluZGV4ICs9IGQ7XHJcblxyXG4gICAgICAgICAgICAvLyBEbyB3cmFwcGluZyBvZiBzZWxlY3Rpb24gd2hlbiBvdXQgb2YgYm91bmRzXHJcbiAgICAgICAgICAgIGlmICh0aGlzLnNlbGVjdGVkSW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0aGlzLnRhZ3MubGVuZ3RoO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc2VsZWN0ZWRJbmRleCA+IHRoaXMudGFncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGEgdmFsdWUgdG8gZGlzcGxheSBmb3IgdGhlIGdpdmVuIHRhZy4gVXNlcyBkaXNwbGF5IGZ1bmN0aW9uL3Byb3BlcnR5IG5hbWUgaWYgc2V0LCBvdGhlcndpc2UgYXNzdW1lcyB0aGF0IHRoZSB0YWcgaXMgYSBzaW1wbGUgc3RyaW5nLlxyXG4gICAgICovXHJcbiAgICBnZXRUYWdEaXNwbGF5KHRhZzogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodHlwZW9mIHRoaXMuZGlzcGxheSA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5kaXNwbGF5KHRhZyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgdGhpcy5kaXNwbGF5ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICByZXR1cm4gdGFnWzxzdHJpbmc+dGhpcy5kaXNwbGF5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRhZztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgZ2l2ZW4gaW5kZXggaXMgc2VsZWN0ZWQgKHRhZyBpbmRleCBvciBpbnB1dCBmaWVsZCkuXHJcbiAgICAgKi9cclxuICAgIGlzU2VsZWN0ZWQoaW5kZXg6IG51bWJlcik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBpbmRleCA9PT0gdGhpcy5zZWxlY3RlZEluZGV4O1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogU2VsZWN0IHRoZSB0YWcgYXQgdGhlIGdpdmVuIGluZGV4LiBEb2VzIG5vdGhpbmcgaWYgZGlzYWJsZWQgaXMgdHJ1ZS5cclxuICAgICAqL1xyXG4gICAgc2VsZWN0VGFnQXQodGFnSW5kZXg6IG51bWJlcikge1xyXG5cclxuICAgICAgICBpZiAodGhpcy5kaXNhYmxlZCkgeyByZXR1cm47IH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNWYWxpZFRhZ0luZGV4KHRhZ0luZGV4KSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkSW5kZXggPSB0YWdJbmRleDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3QgdGhlIGlucHV0IGZpZWxkLCBnaXZpbmcgaXQgZm9jdXMuIERvZXMgbm90aGluZyBpZiBkaXNhYmxlZCBpcyB0cnVlLlxyXG4gICAgICovXHJcbiAgICBzZWxlY3RJbnB1dCgpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQpIHsgcmV0dXJuOyB9XHJcblxyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRJbmRleCA9IHRoaXMudGFncy5sZW5ndGg7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZW1vdmUgdGhlIHRhZyBhdCB0aGUgZ2l2ZW4gaW5kZXguIERvZXMgbm90aGluZyBpZiBkaXNhYmxlZCBpcyB0cnVlIG9yIHRoZSBtaW5UYWdzIHByb3BlcnR5IHByZXZlbnRzIHJlbW92YWwuXHJcbiAgICAgKi9cclxuICAgIHJlbW92ZVRhZ0F0KHRhZ0luZGV4OiBudW1iZXIpIHtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuZGlzYWJsZWQgfHwgIXRoaXMuY2FuUmVtb3ZlVGFnQXQodGFnSW5kZXgpKSB7IHJldHVybjsgfVxyXG5cclxuICAgICAgICAvLyBDaGVjayB0aGF0IHRoZSB0YWdJbmRleCBpcyBpbiByYW5nZVxyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsaWRUYWdJbmRleCh0YWdJbmRleCkpIHtcclxuICAgICAgICAgICAgY29uc3QgdGFnID0gdGhpcy50YWdzW3RhZ0luZGV4XTtcclxuICAgICAgICAgICAgY29uc3QgdGFnUmVtb3ZpbmdFdmVudCA9IG5ldyBUYWdJbnB1dEV2ZW50KHRhZyk7XHJcbiAgICAgICAgICAgIHRoaXMudGFnUmVtb3ZpbmcuZW1pdCh0YWdSZW1vdmluZ0V2ZW50KTtcclxuICAgICAgICAgICAgaWYgKCF0YWdSZW1vdmluZ0V2ZW50LmRlZmF1bHRQcmV2ZW50ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgLy8gU2VsZWN0IGlucHV0IGZpcnN0IHRvIGF2b2lkIGlzc3VlcyB3aXRoIGRyb3BwaW5nIGZvY3VzXHJcbiAgICAgICAgICAgICAgICB0aGlzLnNlbGVjdElucHV0KCk7XHJcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmUgdGhlIHRhZ1xyXG4gICAgICAgICAgICAgICAgdGhpcy50YWdzLnNwbGljZSh0YWdJbmRleCwgMSk7XHJcbiAgICAgICAgICAgICAgICAvLyBTZXQgZm9jdXMgYWdhaW4gc2luY2UgaW5kaWNlcyBoYXZlIGNoYW5nZWRcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0SW5wdXQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnUmVtb3ZlZC5lbWl0KG5ldyBUYWdJbnB1dEV2ZW50KHRhZykpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSB0YWcgYXQgdGhlIGdpdmVuIGluZGV4IGNhbiBiZSByZW1vdmVkLlxyXG4gICAgICovXHJcbiAgICBjYW5SZW1vdmVUYWdBdCh0YWdJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFncy5sZW5ndGggPiB0aGlzLm1pblRhZ3MgfHwgIXRoaXMuZW5mb3JjZVRhZ0xpbWl0cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgaW5wdXQgZmllbGQgc2hvdWxkIGJlIGF2YWlsYWJsZS5cclxuICAgICAqL1xyXG4gICAgaXNJbnB1dFZpc2libGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGFncy5sZW5ndGggPCB0aGlzLm1heFRhZ3MgfHwgIXRoaXMuZW5mb3JjZVRhZ0xpbWl0cztcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFJldHVybnMgdHJ1ZSBpZiBhbnkgcGFydCBvZiB0aGUgY29udHJvbCBoYXMgZm9jdXMuXHJcbiAgICAgKi9cclxuICAgIGhhc0ZvY3VzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVmFsaWRTZWxlY3RJbmRleCh0aGlzLnNlbGVjdGVkSW5kZXgpO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgY29ubmVjdFR5cGVhaGVhZCh0eXBlYWhlYWQ6IFR5cGVhaGVhZENvbXBvbmVudCkge1xyXG4gICAgICAgIGlmICh0aGlzLl90eXBlYWhlYWRTdWJzY3JpcHRpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5fdHlwZWFoZWFkU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuX3R5cGVhaGVhZFN1YnNjcmlwdGlvbiA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnR5cGVhaGVhZCA9IHR5cGVhaGVhZDtcclxuICAgICAgICBpZiAodGhpcy50eXBlYWhlYWQpIHtcclxuICAgICAgICAgICAgLy8gU2V0IHVwIGV2ZW50IGhhbmRsZXIgZm9yIHNlbGVjdGVkIG9wdGlvbnNcclxuICAgICAgICAgICAgdGhpcy5fdHlwZWFoZWFkU3Vic2NyaXB0aW9uID0gdGhpcy50eXBlYWhlYWQub3B0aW9uU2VsZWN0ZWQuc3Vic2NyaWJlKHRoaXMudHlwZWFoZWFkT3B0aW9uU2VsZWN0ZWRIYW5kbGVyLmJpbmQodGhpcykpO1xyXG5cclxuICAgICAgICAgICAgLy8gU2V0IHVwIGV2ZW50IGhhbmRsZXIgZm9yIHRoZSBoaWdobGlnaHRlZCBlbGVtZW50XHJcbiAgICAgICAgICAgIC8vIEFkZGVkIGEgZGVsYXkgdG8gbW92ZSBpdCBvdXQgb2YgdGhlIGN1cnJlbnQgY2hhbmdlIGRldGVjdGlvbiBjeWNsZVxyXG4gICAgICAgICAgICB0aGlzLl90eXBlYWhlYWRTdWJzY3JpcHRpb24uYWRkKFxyXG4gICAgICAgICAgICAgICAgdGhpcy50eXBlYWhlYWQuaGlnaGxpZ2h0ZWRFbGVtZW50Q2hhbmdlLnBpcGUoZGVsYXkoMCkpLnN1YnNjcmliZSgoZWxlbWVudDogSFRNTEVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmhpZ2hsaWdodGVkRWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFZhbGlkYXRlIHRoZSBnaXZlbiB0YWdWYWx1ZSB3aXRoIHRoZSB0YWdQYXR0ZXJuLCBpZiBzZXQuIFVwZGF0ZSB2YWxpZGF0aW9uRXJyb3JzIG9uIHZhbGlkYXRpb24gZmFpbHVyZS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSB2YWxpZGF0ZVRhZyh0YWdWYWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgbGV0IGlucHV0UGF0dGVybiA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5pbnB1dFZhbGlkID0gdHJ1ZTtcclxuICAgICAgICBpZiAodGhpcy50YWdQYXR0ZXJuICYmICF0aGlzLnRhZ1BhdHRlcm4udGVzdCh0YWdWYWx1ZSkpIHtcclxuICAgICAgICAgICAgaW5wdXRQYXR0ZXJuID0ge1xyXG4gICAgICAgICAgICAgICAgZ2l2ZW46IHRhZ1ZhbHVlLFxyXG4gICAgICAgICAgICAgICAgcGF0dGVybjogdGhpcy50YWdQYXR0ZXJuXHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIHRoaXMuaW5wdXRWYWxpZCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnZhbGlkYXRpb25FcnJvcnNbJ2lucHV0UGF0dGVybiddID0gaW5wdXRQYXR0ZXJuO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlucHV0VmFsaWQ7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBDcmVhdGUgYSB0YWcgb2JqZWN0IGZvciB0aGUgZ2l2ZW4gdGFnVmFsdWUuIElmIGNyZWF0ZVRhZ0hhbmRsZXIgaXMgc3BlY2lmaWVkLCB1c2UgaXQ7IG90aGVyd2lzZSBpZiBkaXNwbGF5UHJvcGVydHkgaXMgc3BlY2lmaWVkLCBjcmVhdGUgYW4gb2JqZWN0IHdpdGggdGhlIHRhZ1ZhbHVlIGFzIHRoZSBzaW5nbGUgbmFtZWQgcHJvcGVydHk7IG90aGVyd2lzZSByZXR1cm4gdGhlIHRhZ1ZhbHVlIGl0c2VsZi5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBjcmVhdGVUYWcodGFnVmFsdWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgbGV0IHRhZyA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMuY3JlYXRlVGFnSGFuZGxlciAmJiB0eXBlb2YgdGhpcy5jcmVhdGVUYWdIYW5kbGVyID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICAgIHRhZyA9IHRoaXMuY3JlYXRlVGFnSGFuZGxlcih0YWdWYWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgdGhpcy5kaXNwbGF5ID09PSAnc3RyaW5nJykge1xyXG4gICAgICAgICAgICB0YWcgPSB7fTtcclxuICAgICAgICAgICAgdGFnWzxzdHJpbmc+dGhpcy5kaXNwbGF5XSA9IHRhZ1ZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRhZyA9IHRhZ1ZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGFnO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogQWRkIGEgdGFnIG9iamVjdCwgY2FsbGluZyB0aGUgdGFnQWRkaW5nIGFuZCB0YWdBZGRlZCBldmVudHMuIFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFnIHdhcyBhZGRlZCB0byB0aGUgdGFncyBhcnJheS5cclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBhZGRUYWcodGFnOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGFnKSB7XHJcbiAgICAgICAgICAgIC8vIFZlcmlmeSB0aGF0IHRoZSBuZXcgdGFnIGNhbiBiZSBkaXNwbGF5ZWRcclxuICAgICAgICAgICAgY29uc3QgZGlzcGxheVZhbHVlID0gdGhpcy5nZXRUYWdEaXNwbGF5KHRhZyk7XHJcbiAgICAgICAgICAgIGlmIChkaXNwbGF5VmFsdWUgJiYgdHlwZW9mIGRpc3BsYXlWYWx1ZSA9PT0gJ3N0cmluZycgJiYgZGlzcGxheVZhbHVlLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRhZ0FkZGluZ0V2ZW50ID0gbmV3IFRhZ0lucHV0RXZlbnQodGFnKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGFnQWRkaW5nLmVtaXQodGFnQWRkaW5nRXZlbnQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCF0YWdBZGRpbmdFdmVudC5kZWZhdWx0UHJldmVudGVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ3MgPSB0aGlzLnRhZ3MgfHwgW107XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy50YWdzLnB1c2godGFnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnRhZ0FkZGVkLmVtaXQobmV3IFRhZ0lucHV0RXZlbnQodGFnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy52YWxpZGF0ZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRydWUgaWYgdGhlIGdpdmVuIHRhZ0luZGV4IGlzIGEgdmFsaWQgdGFnIGluZGV4LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGlzVmFsaWRUYWdJbmRleCh0YWdJbmRleDogbnVtYmVyKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRhZ0luZGV4ID49IDAgJiYgdGFnSW5kZXggPCB0aGlzLnRhZ3MubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0cnVlIGlmIHRoZSBnaXZlbiBpbmRleCBpcyBhIHZhbGlkIHNlbGVjdGlvbiBpbmRleCAodGFncyBvciBpbnB1dCBmaWVsZCkuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgaXNWYWxpZFNlbGVjdEluZGV4KGluZGV4OiBudW1iZXIpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gaW5kZXggPj0gMCAmJiBpbmRleCA8PSB0aGlzLnRhZ3MubGVuZ3RoO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUmV0dXJucyB0aGUgY2hhcmFjdGVyIGNvcnJlc3BvbmRpbmcgdG8gdGhlIGdpdmVuIGtleSBldmVudCwgbWFpbmx5IGZvciBJRSBjb21wYXRpYmlsaXR5LlxyXG4gICAgICovXHJcbiAgICBwcml2YXRlIGdldEtleUNoYXIoZXZlbnQ6IEtleWJvYXJkRXZlbnQpOiBzdHJpbmcge1xyXG4gICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ1NwYWNlYmFyJzpcclxuICAgICAgICAgICAgICAgIHJldHVybiAnICc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBldmVudC5rZXk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIGFuIGFycmF5IG9mIHN0cmluZ3MgY29ycmVzcG9uZGluZyB0byB0aGUgaW5wdXQgc3RyaW5nIHNwbGl0IGJ5IHRoZSB0YWdEZWxpbWl0ZXJzIGNoYXJhY3RlcnMuXHJcbiAgICAgKi9cclxuICAgIHByaXZhdGUgc3BsaXRUYWdJbnB1dChpbnB1dDogc3RyaW5nKTogc3RyaW5nW10ge1xyXG4gICAgICAgIGxldCB0YWdWYWx1ZXMgPSBbaW5wdXRdO1xyXG4gICAgICAgIGlmICh0aGlzLnRhZ0RlbGltaXRlcnMgJiYgdHlwZW9mIHRoaXMudGFnRGVsaW1pdGVycyA9PT0gJ3N0cmluZycpIHtcclxuICAgICAgICAgICAgY29uc3QgZXNjYXBlZERlbGltaXRlcnMgPSB0aGlzLnRhZ0RlbGltaXRlcnMucmVwbGFjZSgvWy1cXC9cXFxcXiQqKz8uKCl8W1xcXXt9XS9nLCAnXFxcXCQmJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRlbGltaXRlclJlZ2V4ID0gbmV3IFJlZ0V4cChgWyR7ZXNjYXBlZERlbGltaXRlcnN9XWAsICdnJyk7XHJcbiAgICAgICAgICAgIHRhZ1ZhbHVlcyA9IGlucHV0LnNwbGl0KGRlbGltaXRlclJlZ2V4KS5maWx0ZXIoKHMpID0+IHMubGVuZ3RoID4gMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0YWdWYWx1ZXM7XHJcbiAgICB9XHJcbn1cclxuXHJcbi8qKlxyXG4gKiBUaGUgQVBJIGF2YWlsYWJsZSB0byB0YWcgdGVtcGxhdGVzLlxyXG4gKi9cclxuZXhwb3J0IGludGVyZmFjZSBUYWdBcGkge1xyXG4gICAgLyoqXHJcbiAgICAgKiBSZXR1cm5zIHRoZSBkaXNwbGF5IHZhbHVlIG9mIHRoZSBnaXZlbiB0YWcsIGFjY29yZGluZyB0byB0aGUgZGlzcGxheVByb3BlcnR5IHByb3BlcnR5LlxyXG4gICAgICovXHJcbiAgICBnZXRUYWdEaXNwbGF5OiAodGFnOiBhbnkpID0+IHN0cmluZztcclxuXHJcbiAgICAvKipcclxuICAgICAqIFJlbW92ZXMgdGhlIHRhZyBhdCB0aGUgZ2l2ZW4gaW5kZXgsIGlmIHBvc3NpYmxlLlxyXG4gICAgICovXHJcbiAgICByZW1vdmVUYWdBdDogKGluZGV4OiBudW1iZXIpID0+IHZvaWQ7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBcdFJldHVybnMgdHJ1ZSBpZiB0aGUgdGFnIGF0IHRoZSBnaXZlbiBpbmRleCBjYW4gYmUgcmVtb3ZlZC5cclxuICAgICAqL1xyXG4gICAgY2FuUmVtb3ZlVGFnQXQ6IChpbmRleDogbnVtYmVyKSA9PiBib29sZWFuO1xyXG59XHJcblxyXG4vKipcclxuICogVGhlIGZ1bmN0aW9uIHVzZWQgdG8gcmV0dXJuIGN1c3RvbSBjbGFzcyBpbmZvcm1hdGlvbiwgZm9yIHVzZSBpbiBgbmdDbGFzc2AuXHJcbiAqL1xyXG5leHBvcnQgdHlwZSBUYWdDbGFzc0Z1bmN0aW9uID0gKHRhZzogYW55LCBpbmRleDogbnVtYmVyLCBzZWxlY3RlZDogYm9vbGVhbikgPT4gKHN0cmluZyB8IHN0cmluZ1tdIHwgU2V0PHN0cmluZz4pOyJdfQ==