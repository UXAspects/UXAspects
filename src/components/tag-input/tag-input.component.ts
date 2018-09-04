import { DOCUMENT } from '@angular/common';
import { AfterContentInit, Component, ContentChildren, ElementRef, EventEmitter, forwardRef, HostBinding, HostListener, Inject, Input, OnChanges, OnDestroy, OnInit, Output, QueryList, SimpleChanges, TemplateRef, ViewChild } from '@angular/core';
import { ControlValueAccessor, NG_VALIDATORS, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
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
export class TagInputComponent implements OnInit, AfterContentInit, OnChanges, ControlValueAccessor, OnDestroy {

    @Input() @HostBinding('attr.id') id: string = `ux-tag-input-${++uniqueId}`;

    @Input('tags')
    get tags() {
        if (!this._tags) {
            this._tags = [];
        }
        return this._tags;
    }
    set tags(value: any[]) {
        this._tags = value;
        this._onChangeHandler(this._tags);
        this.tagsChange.emit(this._tags);
    }

    @Output() tagsChange = new EventEmitter<any[]>();

    @Input('input')
    get input() {
        return this._input;
    }
    set input(value: string) {
        this._input = value;
        this.inputChange.emit(value);
    }

    @Output() inputChange = new EventEmitter<string>();

    @Input() display: (option: any) => string | string;
    @Input() addOnPaste: boolean = true;
    @Input() disabled: boolean = false;
    @Input() enforceTagLimits: boolean = false;
    @Input() freeInput: boolean = true;
    @Input() maxTags: number = Number.MAX_VALUE;
    @Input() minTags: number = 0;
    @Input() placeholder: string = '';
    @Input() showTypeaheadOnClick: boolean = false;
    @Input() tagDelimiters: string = '';
    @Input() tagPattern: RegExp;
    @Input() tagTemplate: TemplateRef<any>;
    @Input() tagClass: TagClassFunction = () => undefined;
    @Input() validationErrors: any = {};
    @Input('createTag') createTagHandler: (value: string) => any;

    // Workaround for EL-3224 until the issue can be diagnosed.
    @Input() trackAriaDescendant: boolean = true;

    @Output() tagAdding = new EventEmitter<TagInputEvent>();
    @Output() tagAdded = new EventEmitter<TagInputEvent>();
    @Output() tagInvalidated = new EventEmitter<TagInputEvent>();
    @Output() tagRemoving = new EventEmitter<TagInputEvent>();
    @Output() tagRemoved = new EventEmitter<TagInputEvent>();
    @Output() tagClick = new EventEmitter<TagInputEvent>();

    @ContentChildren(TypeaheadComponent) typeaheadQuery: QueryList<TypeaheadComponent>;

    @ViewChild('tagInput') tagInput: ElementRef;

    @ViewChild('defaultTagTemplate') private _defaultTagTemplate: TemplateRef<any>;

    selectedIndex: number = -1;

    tagApi: TagApi = {
        getTagDisplay: this.getTagDisplay.bind(this),
        removeTagAt: this.removeTagAt.bind(this),
        canRemoveTagAt: this.canRemoveTagAt.bind(this)
    };

    valid: boolean = true;
    inputValid: boolean = true;

    typeahead: TypeaheadComponent;

    highlightedElement: HTMLElement;

    private _input: string = '';
    private _tags: any[] = [];
    private _onChangeHandler: (_: any) => void = () => { };
    private _onTouchedHandler: () => void = () => { };
    private _typeaheadSubscription: Subscription;

    constructor(
        private _element: ElementRef,
        @Inject(DOCUMENT) private _document: any,
        private _typeaheadKeyService: TypeaheadKeyService) { }

    ngOnInit() {
        if (!this.tagTemplate) {
            this.tagTemplate = this._defaultTagTemplate;
        }
    }

    ngAfterContentInit() {
        // Watch for optional child typeahead control
        this.connectTypeahead(this.typeaheadQuery.first);
        this.typeaheadQuery.changes.subscribe((query) => {
            this.connectTypeahead(query.first);
        });
    }

    ngOnChanges(changes: SimpleChanges) {
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

    writeValue(value: any[]) {
        if (value) {
            this.tags = value;
        }
    }

    registerOnChange(fn: any) {
        this._onChangeHandler = fn;
    }

    registerOnTouched(fn: any) {
        this._onTouchedHandler = fn;
    }

    setDisabledState(isDisabled: boolean): void {
        this.disabled = isDisabled;
    }

    ngOnDestroy(): void {
        if (this._typeaheadSubscription) {
            this._typeaheadSubscription.unsubscribe();
        }
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
    validate() {
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
    }

    @HostListener('keydown', ['$event'])
    keyHandler(event: KeyboardEvent) {

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

        switch (event.key) {
            case 'Enter':
                // Check if a typeahead option is highlighted
                if (this.typeahead && this.typeahead.open && this.typeahead.highlighted) {
                    // Add the typeahead option as a tag, clear the input, and close the dropdown
                    this.commitTypeahead(this.typeahead.highlighted);
                    this.typeahead.open = false;
                } else {
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

    @HostListener('focusout', ['$event'])
    focusOutHandler(event: FocusEvent) {

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

    tagClickHandler(event: MouseEvent, tag: any, index: number) {

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

    inputClickHandler() {

        if (this.disabled) { return; }

        if (this.typeahead && this.showTypeaheadOnClick) {
            this.typeahead.open = true;
        }
    }

    inputFocusHandler() {

        if (this.disabled) { return; }

        this.selectInput();
    }

    inputPasteHandler(event: ClipboardEvent) {

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

    typeaheadOptionSelectedHandler(event: TypeaheadOptionEvent) {

        if (this.disabled) { return; }

        // When the typeahead sends the optionSelected event, commit the object directly
        this.commitTypeahead(event.option);
    }

    /**
     * Commit the current input value and clear the input field if successful.
     */
    commitInput() {
        if (this.commit(this.input)) {
            this.selectInput();
            this.input = '';
        }
    }

    /**
     * Commit the given tag object and clear the input if successful.
     */
    commitTypeahead(tag: any) {
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
    backspace() {

        if (this.disabled) { return; }

        if (!this.isValidTagIndex(this.selectedIndex)) {
            this.selectTagAt(this.tags.length - 1);
        } else {
            this.removeTagAt(this.selectedIndex);
        }
    }

    /**
     * Move the highlighted option forwards or backwards in the list. Wraps at the limits.
     * @param d Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     */
    moveSelection(d: number) {

        if (this.disabled) { return; }

        if (this.isValidSelectIndex(this.selectedIndex)) {
            this.selectedIndex += d;

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
    selectTagAt(tagIndex: number) {

        if (this.disabled) { return; }

        if (this.isValidTagIndex(tagIndex)) {
            this.selectedIndex = tagIndex;
        }
    }

    /**
     * Select the input field, giving it focus. Does nothing if disabled is true.
     */
    selectInput() {

        if (this.disabled) { return; }

        this.selectedIndex = this.tags.length;
    }

    /**
     * Remove the tag at the given index. Does nothing if disabled is true or the minTags property prevents removal.
     */
    removeTagAt(tagIndex: number) {

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
     */
    canRemoveTagAt(tagIndex: number): boolean {
        return this.tags.length > this.minTags || !this.enforceTagLimits;
    }

    /**
     * Returns true if the input field should be available.
     */
    isInputVisible() {
        return this.tags.length < this.maxTags || !this.enforceTagLimits;
    }

    /**
     * Returns true if any part of the control has focus.
     */
    hasFocus(): boolean {
        return this.isValidSelectIndex(this.selectedIndex);
    }

    private connectTypeahead(typeahead: TypeaheadComponent) {
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
                this._typeaheadSubscription.add(
                    this.typeahead.highlightedElementChange.subscribe((element: HTMLElement) => {
                        this.highlightedElement = element;
                    })
                );
            }
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
    private createTag(tagValue: string): any {
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
    private addTag(tag: any): boolean {
        if (tag) {
            // Verify that the new tag can be displayed
            const displayValue = this.getTagDisplay(tag);
            if (displayValue && typeof displayValue === 'string' && displayValue.length > 0) {
                const tagAddingEvent = new TagInputEvent(tag);
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
        switch (event.key) {
            case 'Spacebar':
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
export interface TagApi {
    /**
     * Returns the display value of the given tag, according to the displayProperty property.
     */
    getTagDisplay: (tag: any) => string;

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
export type TagClassFunction = (tag: any, index: number, selected: boolean) => (string | string[] | Set<string>);