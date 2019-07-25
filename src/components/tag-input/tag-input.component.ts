import { BACKSPACE, DELETE, ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE } from '@angular/cdk/keycodes';
import { DOCUMENT } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Inject, Input, OnChanges, OnDestroy, Output, QueryList, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator } from '@angular/forms';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { tick } from '../../common/index';
import { TypeaheadComponent, TypeaheadKeyService } from '../typeahead/index';
import { TypeaheadOptionEvent } from '../typeahead/typeahead-event';
import { TagInputEvent } from './tag-input-event';

let uniqueId = 0;

const TAGINPUT_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => TagInputComponent),
    multi: true
};
const TAGINPUT_VALIDATOR = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => TagInputComponent),
    multi: true
};

@Component({
    selector: 'ux-tag-input',
    exportAs: 'ux-tag-input',
    templateUrl: 'tag-input.component.html',
    providers: [TAGINPUT_VALUE_ACCESSOR, TAGINPUT_VALIDATOR],
    host: {
        '[class.disabled]': 'disabled',
        '[class.focus]': 'hasFocus()',
        '[class.invalid]': '!valid || !inputValid'
    }
})
export class TagInputComponent<T = any> implements AfterContentInit, OnChanges, ControlValueAccessor, Validator, OnDestroy {

    /** Specify a unique Id for the component */
    @Input() @HostBinding('attr.id') id: string = `ux-tag-input-${++uniqueId}`;

    /**
     * The list of tags appearing in the tag input. This can be an array of strings or custom objects.
     * See the `displayProperty` property for details of using a custom object.
     */
    @Input()
    get tags() {
        if (!this._tags) {
            this._tags = [];
        }
        return this._tags;
    }
    set tags(value: ReadonlyArray<T>) {
        this._tags = value;
        this._onChangeHandler(this._tags);
        this.tagsChange.emit(this._tags);
    }

    /** The editable text appearing in the tag input. */
    @Input()
    get input() {
        return this._input;
    }
    set input(value: string) {
        this._input = value;
        this.inputChange.emit(value);
    }

    /**
     * Determines the display value of the `options`, if they are custom objects.
     * This may be a function or a string. If a function is provided, it receives
     * the option object as an argument, and should return the appropriate display value.
     * If the name of a property is provided as a string, that property is used as the display value.
     */
    @Input() display: (option: T) => string | string;

    /** Controls whether pasting text into the text input area automatically converts that text into one or more tags. */
    @Input() addOnPaste: boolean = true;

    /** The aria-label to apply to the child `input` element. */
    @Input() ariaLabel: string;

    /** Controls the disabled state of the tag input. */
    @Input() disabled: boolean = false;

    /**
     * If set to `true`, the tag input will prevent addition and removal of tags to enforce the minTags and maxTags settings.
     * Otherwise, a validation error will be raised.
     */
    @Input() enforceTagLimits: boolean = false;

    /**
     * If `true`, input entered into the text input area can be converted into a tag by pressing enter.
     * Otherwise, tags can only be added from the typeahead list or other external means.
     * (Note that the `maxTags` and `tagPattern` will prevent invalid inputs regardless of this setting.)
     */
    @Input() freeInput: boolean = true;

    /** If `true` the input field will be readonly and selection can only occur by using the dropdown. */
    @Input() readonlyInput: boolean = false;

    /**
     * The maximum number of tags permitted in the tag input. If the number of tags is equal to `maxTags` and
     * `enforceTagLimits` is `true`, addition of tags will be prevented until a tag is removed
     */
    @Input() maxTags: number = Number.MAX_VALUE;

    /**
     * The minimum number of tags permitted in the tag input. If the number of tags is equal to `minTags` and `enforceTagLimits` is
     * `true`, removal of tags will be prevented until a new tag is added.
     */
    @Input() minTags: number = 0;

    /** The placeholder text which appears in the text input area when it is empty. */
    @Input() placeholder: string = '';

    /** Controls whether the typeahead appears when the text input area is clicked. This has no effect if the ux-typeahead component is not configured. */
    @Input() showTypeaheadOnClick: boolean = false;

    /**
     * A string containing the characters which delimit tags.
     * Typing one of the characters in `tagDelimiters` will cause the preceding text to be added as a tag,
     * and the text input area will be cleared. Pasting a string containing one or more of characters in
     * `tagDelimiters` will cause the string to be split into multiple tags.
     * Note that the delimiter character will not be part of the tag text.
     */
    @Input() tagDelimiters: string = '';

    /** The validation expression for tags added via the input text area. Strings which do not match this expression will not be added as tags. */
    @Input() tagPattern: RegExp;

    /**
     * A template which will be rendered as the content of each tag. The following context properties are available in the template:
     * - `tag: any` - the string or custom object representing the tag.
     * - `index: number` - the zero-based index of the tag as it appears in the tag input.
     * - `api: TagApi` - provides the functions getTagDisplay, removeTagAt and canRemoveTagAt.
     */
    @Input() tagTemplate: TemplateRef<any>;

    /**
     * A function which returns either a string, string[], or Set<string>, compatible with the NgClass directive. The function receives the following parameters:
     * - `tag: any` - the string or custom object representing the tag.
     * - `index: number` - the zero-based index of the tag as it appears in the tag input.
     * - `selected: boolean` - true if the tag is currently selected.
     */
    @Input() tagClass: TagClassFunction<T> = () => undefined;

    /**
     * An object which contains details of validation errors. The following properties will be present if there is a related validation error:
     * - `tagRangeError` - present if the number of tags is outside the range specified by minTags and maxTags.
     * - `inputPattern` - present if an input has been submitted which does not match the tagPattern.
     */
    @Input() validationErrors: any = {};

    /** Defines the autocomplete property on the input field which can be used to prevent the browser from displaying autocomplete suggestions. */
    @Input() autocomplete: string = 'off';

    /**
     * A custom function which is called to create a new tag object.
     * This can be used to populate other properties in the tag object.
     * If `createTag` is not provided, then an object is created with the `displayProperty` set to the input.
     * If `displayProperty` is also not set, then the tag is created as a simple string.
     */
    @Input('createTag') createTagHandler: (value: string) => any;

    /**
     * @deprecated
     * Workaround for EL-3224 - No longer needed
     */
    @Input() trackAriaDescendant: boolean = true;

    /** Define a custom icon to be used instead of the chevron */
    @Input() icon: TemplateRef<any>;

    /** Determine if we should show the clear all button */
    @Input() clearButton: boolean = false;

    /** Determine an aria label for the clear button */
    @Input() clearButtonAriaLabel: string = 'Reset selection';

    /** Emits when tags is changed. */
    @Output() tagsChange = new EventEmitter<ReadonlyArray<T>>();

    /** Emits when input is changed. */
    @Output() inputChange = new EventEmitter<string>();

    /** Raised when a tag is about to be added. The `tag` property of the event contains the tag to be added. Call `preventDefault()` on the event to prevent addition. */
    @Output() tagAdding = new EventEmitter<TagInputEvent>();

    /** Raised when a tag has been added. The tag property of the event contains the tag. */
    @Output() tagAdded = new EventEmitter<TagInputEvent>();

    /** Raised when a tag has failed validation according to the `tagPattern`. The tag property of the event contains the string which failed validation. */
    @Output() tagInvalidated = new EventEmitter<TagInputEvent>();

    /** Raised when a tag is about to be removed. The `tag` property of the event contains the tag to be removed. Call `preventDefault()` on the event to prevent removal. */
    @Output() tagRemoving = new EventEmitter<TagInputEvent>();

    /** Raised when a tag has been removed. The tag property of the event contains the tag. */
    @Output() tagRemoved = new EventEmitter<TagInputEvent>();

    /** Raised when a tag has been clicked. The `tag` property of the event contains the clicked tag. Call `preventDefault()` on the event to prevent the default behaviour of selecting the tag. */
    @Output() tagClick = new EventEmitter<TagInputEvent>();

    @ContentChildren(TypeaheadComponent) typeaheadQuery: QueryList<TypeaheadComponent>;

    @ViewChild('tagInput') tagInput: ElementRef;

    selectedIndex: number = -1;

    tagApi: TagApi<T> = {
        getTagDisplay: this.getTagDisplay.bind(this),
        removeTagAt: this.removeTagAt.bind(this),
        canRemoveTagAt: this.canRemoveTagAt.bind(this)
    };

    valid: boolean = true;
    inputValid: boolean = true;
    typeahead: TypeaheadComponent;
    highlightedElement: HTMLElement;

    get _showClearButton(): boolean {
        return this.clearButton && this.tags && this.tags.length > 0;
    }

    private _input: string = '';
    private _tags: ReadonlyArray<T> = [];
    private _onChangeHandler: (_: any) => void = () => { };
    private _onTouchedHandler: () => void = () => { };
    private _subscription: Subscription;
    private _onDestroy = new Subject<void>();

    constructor(
        private _element: ElementRef,
        @Inject(DOCUMENT) private _document: any,
        private _typeaheadKeyService: TypeaheadKeyService) { }

    ngAfterContentInit(): void {
        // Watch for optional child typeahead control
        this.connectTypeahead(this.typeaheadQuery.first);

        this.typeaheadQuery.changes.pipe(takeUntil(this._onDestroy))
            .subscribe((query) => this.connectTypeahead(query.first));
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.disabled) {
            if (changes.disabled.currentValue) {
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

    ngOnDestroy(): void {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }

        this._onDestroy.next();
        this._onDestroy.complete();
    }

    writeValue(value: T[]): void {
        if (value) {
            this.tags = value;
        }
    }

    registerOnChange(fn: any): void {
        this._onChangeHandler = fn;
    }

    registerOnTouched(fn: any): void {
        this._onTouchedHandler = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    /**
     * Set focus on the input field.
     */
    focus(): void {
        if (this.tagInput) {
            this.tagInput.nativeElement.focus();
        }
    }

    /**
     * Validate the value of the control (tags property).
     */
    validate(): ValidationErrors | null {
        this.valid = true;

        let tagRangeError = null;
        if (this.tags && (this.tags.length < this.minTags || this.tags.length > this.maxTags)) {
            tagRangeError = {
                given: this.tags.length,
                min: this.minTags,
                max: this.maxTags
            };
            this.valid = false;
        }
        this.validationErrors['tagRangeError'] = tagRangeError;

        // forward any error to the form control
        return tagRangeError;
    }

    @HostListener('keydown', ['$event'])
    keyHandler(event: KeyboardEvent): void {

        if (this.disabled) { return; }

        // Get the input field cursor location
        const inputCursorPos = this.tagInput.nativeElement.selectionStart;

        // Determine if the input field has any text selected
        const hasSelection = this.tagInput.nativeElement.selectionStart !== this.tagInput.nativeElement.selectionEnd;

        // Determine if a tag has focus
        const tagSelected = this.isValidTagIndex(this.selectedIndex);

        const inputLength = this.input ? this.input.length : 0;

        // Check whether the arrow keys can move the selection. Otherwise the input field takes the event.
        const canNavigateLeft = tagSelected || (inputCursorPos <= 0 && !hasSelection);
        const canNavigateRight = tagSelected || (inputCursorPos >= inputLength && !hasSelection);

        // Forward key events to the typeahead component.
        this._typeaheadKeyService.handleKey(event, this.typeahead);

        switch (event.which) {
            case ENTER:

                // Check if a typeahead option is highlighted
                if (this.typeahead && this.typeahead.open && this.typeahead.highlighted) {
                    // Add the typeahead option as a tag, clear the input, and close the dropdown
                    this.commitTypeahead(this.typeahead.highlighted);
                    this.typeahead.open = false;
                } else if (this.typeahead && !this.typeahead.open && !this.freeInput) {
                    this.typeahead.open = true;
                } else {
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

    @HostListener('focusout')
    focusOutHandler(): void {

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

    @HostListener('click')
    onClick(): void {

        // focus the input element
        this.tagInput.nativeElement.focus();

        // show the typeahead if we need to
        this.inputClickHandler();
    }

    tagClickHandler(event: MouseEvent, tag: T, index: number): void {

        if (this.disabled) { return; }

        // Send tagClick event
        const tagClickEvent = new TagInputEvent(tag);
        this.tagClick.emit(tagClickEvent);

        // Prevent focus if preventDefault() was called
        if (tagClickEvent.defaultPrevented()) {
            event.preventDefault();
            return;
        }

        // Select the tag (for IE that doesn't propagate focus)
        this.selectTagAt(index);
    }

    inputClickHandler(): void {

        if (this.disabled) { return; }

        if (this.typeahead && this.showTypeaheadOnClick) {
            this.typeahead.open = true;
        }
    }

    inputFocusHandler(): void {

        if (this.disabled) {
            return;
        }

        this.selectInput();

        // mark form control as touched
        this._onTouchedHandler();
    }

    inputPasteHandler(event: ClipboardEvent): void {

        if (this.disabled) { return; }

        if (this.addOnPaste) {
            // Get text from the clipboard
            let input: string = null;
            if (event.clipboardData) {
                input = event.clipboardData.getData('text/plain');
            } else if ((<any>window).clipboardData) {
                // Internet Explorer only
                input = (<any>window).clipboardData.getData('Text');
            }

            // Commit the clipboard text directly
            if (this.commit(input)) {
                this.selectInput();
                event.stopPropagation();
                event.preventDefault();
            }
        }
    }

    typeaheadOptionSelectedHandler(event: TypeaheadOptionEvent): void {

        if (this.disabled) { return; }

        // When the typeahead sends the optionSelected event, commit the object directly
        this.commitTypeahead(event.option);
    }

    /**
     * Commit the current input value and clear the input field if successful.
     */
    commitInput(): void {
        if (this.commit(this.input)) {
            this.selectInput();
            this.input = '';
        }
    }

    /**
     * Commit the given tag object and clear the input if successful.
     */
    commitTypeahead(tag: T): void {
        if (this.addTag(tag)) {
            this.selectInput();
            this.input = '';
        }
    }

    /**
     * Commit the given string value as one or more tags, if validation passes. Returns true if the tag(s) were created.
     */
    commit(input: string): boolean {
        if (input && this.freeInput) {

            // Split the tags by the tagDelimiters if configured
            const newTags = this.splitTagInput(input);

            // Check tag validation for all of the individual values
            let allValid = true;
            for (let newTag of newTags) {
                const valid = this.validateTag(newTag);
                if (!valid) {
                    allValid = false;
                }
            }

            // Add the tags if all are valid
            if (allValid) {
                for (let newTag of newTags) {
                    this.addTag(this.createTag(newTag));
                }

                return true;
            }
        }

        return false;
    }

    /**
     * If no tag is selected, select the rightmost tag. If a tag is selected, remove it.
     */
    backspace(): void {

        if (this.disabled) {
            return;
        }

        if (!this.isValidTagIndex(this.selectedIndex)) {
            this.selectTagAt(this.tags.length - 1);
        } else {
            this.removeTagAt(this.selectedIndex);
        }
    }

    /**
     * Move the highlighted option forwards or backwards in the list. Wraps at the limits.
     * @param delta Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     */
    moveSelection(delta: number): void {

        if (this.disabled) { return; }

        if (this.isValidSelectIndex(this.selectedIndex)) {
            this.selectedIndex += delta;

            // Do wrapping of selection when out of bounds
            if (this.selectedIndex < 0) {
                this.selectedIndex = this.tags.length;
            } else if (this.selectedIndex > this.tags.length) {
                this.selectedIndex = 0;
            }
        }
    }

    /**
     * Returns a value to display for the given tag. Uses display function/property name if set, otherwise assumes that the tag is a simple string.
     */
    getTagDisplay(tag: any): string {
        if (typeof this.display === 'function') {
            return this.display(tag);
        }
        if (typeof this.display === 'string') {
            return tag[<string>this.display];
        }
        return tag;
    }

    /**
     * Returns true if the given index is selected (tag index or input field).
     */
    isSelected(index: number): boolean {
        return index === this.selectedIndex;
    }

    /**
     * Select the tag at the given index. Does nothing if disabled is true.
     */
    selectTagAt(tagIndex: number): void {

        if (this.disabled) { return; }

        if (this.isValidTagIndex(tagIndex)) {
            this.selectedIndex = tagIndex;
        }
    }

    /**
     * Select the input field, giving it focus. Does nothing if disabled is true.
     */
    selectInput(): void {

        if (this.disabled) {
            return;
        }

        this.selectedIndex = this.tags.length;
    }

    /**
     * Remove the tag at the given index. Does nothing if disabled is true or the minTags property prevents removal.
     */
    removeTagAt(tagIndex: number): void {

        if (this.disabled || !this.canRemoveTagAt(tagIndex)) { return; }

        // Check that the tagIndex is in range
        if (this.isValidTagIndex(tagIndex)) {
            const tag = this.tags[tagIndex];
            const tagRemovingEvent = new TagInputEvent(tag);
            this.tagRemoving.emit(tagRemovingEvent);
            if (!tagRemovingEvent.defaultPrevented()) {
                // Select input first to avoid issues with dropping focus
                this.selectInput();

                // Remove the tag
                this.tags = this.tags.filter((_tag, index) => index !== tagIndex);
                // Set focus again since indices have changed
                this.selectInput();
                this.tagRemoved.emit(new TagInputEvent(tag));
                this.validate();
            }
        }
    }

    /**
     * Returns true if the tag at the given index can be removed.
     */
    canRemoveTagAt(tagIndex: number): boolean {
        return this.tags.length > this.minTags || !this.enforceTagLimits;
    }

    /**
     * Returns true if the input field should be available.
     */
    isInputVisible(): boolean {
        return this.tags.length < this.maxTags || !this.enforceTagLimits;
    }

    /**
     * Returns true if any part of the control has focus.
     */
    hasFocus(): boolean {
        return this.isValidSelectIndex(this.selectedIndex);
    }

    toggle(): void {
        this.typeahead && this.typeahead.open ? this.typeahead.open = false : this.inputClickHandler();
    }

    clear(): void {
        if (this.disabled) {
            return;
        }

        this.tags = [];
        this.input = '';
    }

    private connectTypeahead(typeahead: TypeaheadComponent): void {
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
            this._subscription.add(
                this.typeahead.highlightedElementChange.pipe(tick())
                    .subscribe((element: HTMLElement) => this.highlightedElement = element)
            );
        }
    }

    /**
     * Validate the given tagValue with the tagPattern, if set. Update validationErrors on validation failure.
     */
    private validateTag(tagValue: string): boolean {
        let inputPattern = null;
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
     */
    private createTag(tagValue: string): T {
        let tag = null;
        if (this.createTagHandler && typeof this.createTagHandler === 'function') {
            tag = this.createTagHandler(tagValue);
        } else if (typeof this.display === 'string') {
            tag = {};
            tag[<string>this.display] = tagValue;
        } else {
            tag = tagValue;
        }
        return tag;
    }

    /**
     * Add a tag object, calling the tagAdding and tagAdded events. Returns true if the tag was added to the tags array.
     */
    private addTag(tag: T): boolean {
        if (tag) {
            // Verify that the new tag can be displayed
            const displayValue = this.getTagDisplay(tag);
            if (displayValue && typeof displayValue === 'string' && displayValue.length > 0) {
                const tagAddingEvent = new TagInputEvent(tag);
                this.tagAdding.emit(tagAddingEvent);
                if (!tagAddingEvent.defaultPrevented()) {
                    this.tags = [...this.tags, tag];
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
     */
    private isValidTagIndex(tagIndex: number): boolean {
        return tagIndex >= 0 && tagIndex < this.tags.length;
    }

    /**
     * Returns true if the given index is a valid selection index (tags or input field).
     */
    private isValidSelectIndex(index: number): boolean {
        return index >= 0 && index <= this.tags.length;
    }

    /**
     * Returns the character corresponding to the given key event, mainly for IE compatibility.
     */
    private getKeyChar(event: KeyboardEvent): string {
        switch (event.which) {
            case SPACE:
                return ' ';
        }
        return event.key;
    }

    /**
     * Returns an array of strings corresponding to the input string split by the tagDelimiters characters.
     */
    private splitTagInput(input: string): string[] {
        let tagValues = [input];
        if (this.tagDelimiters && typeof this.tagDelimiters === 'string') {
            const escapedDelimiters = this.tagDelimiters.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
            const delimiterRegex = new RegExp(`[${escapedDelimiters}]`, 'g');
            tagValues = input.split(delimiterRegex).filter((s) => s.length > 0);
        }
        return tagValues;
    }
}

/**
 * The API available to tag templates.
 */
export interface TagApi<T = any> {
    /**
     * Returns the display value of the given tag, according to the displayProperty property.
     */
    getTagDisplay: (tag: T) => string;

    /**
     * Removes the tag at the given index, if possible.
     */
    removeTagAt: (index: number) => void;

    /**
     * 	Returns true if the tag at the given index can be removed.
     */
    canRemoveTagAt: (index: number) => boolean;
}

/**
 * The function used to return custom class information, for use in `ngClass`.
 */
export type TagClassFunction<T = any> = (tag: T, index: number, selected: boolean) => (string | string[] | Set<string>);