import { AfterContentInit, ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, QueryList, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { TypeaheadComponent, TypeaheadKeyService } from '../typeahead/index';
import { TypeaheadOptionEvent } from '../typeahead/typeahead-event';
import { TagInputEvent } from './tag-input-event';
export declare class TagInputComponent implements OnInit, AfterContentInit, OnChanges, ControlValueAccessor, OnDestroy {
    private _element;
    private _document;
    private _typeaheadKeyService;
    id: string;
    tags: any[];
    tagsChange: EventEmitter<any[]>;
    input: string;
    inputChange: EventEmitter<string>;
    display: (option: any) => string | string;
    addOnPaste: boolean;
    disabled: boolean;
    enforceTagLimits: boolean;
    freeInput: boolean;
    maxTags: number;
    minTags: number;
    placeholder: string;
    showTypeaheadOnClick: boolean;
    tagDelimiters: string;
    tagPattern: RegExp;
    tagTemplate: TemplateRef<any>;
    tagClass: TagClassFunction;
    validationErrors: any;
    createTagHandler: (value: string) => any;
    /**
     * @deprecated
     * Workaround for EL-3224 - No longer needed
     */
    trackAriaDescendant: boolean;
    tagAdding: EventEmitter<TagInputEvent>;
    tagAdded: EventEmitter<TagInputEvent>;
    tagInvalidated: EventEmitter<TagInputEvent>;
    tagRemoving: EventEmitter<TagInputEvent>;
    tagRemoved: EventEmitter<TagInputEvent>;
    tagClick: EventEmitter<TagInputEvent>;
    typeaheadQuery: QueryList<TypeaheadComponent>;
    tagInput: ElementRef;
    private _defaultTagTemplate;
    selectedIndex: number;
    tagApi: TagApi;
    valid: boolean;
    inputValid: boolean;
    typeahead: TypeaheadComponent;
    highlightedElement: HTMLElement;
    private _input;
    private _tags;
    private _onChangeHandler;
    private _onTouchedHandler;
    private _subscription;
    private _onDestroy;
    constructor(_element: ElementRef, _document: any, _typeaheadKeyService: TypeaheadKeyService);
    ngOnInit(): void;
    ngAfterContentInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    writeValue(value: any[]): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    /**
     * Set focus on the input field.
     */
    focus(): void;
    /**
     * Validate the value of the control (tags property).
     */
    validate(): void;
    keyHandler(event: KeyboardEvent): void;
    focusOutHandler(): void;
    tagClickHandler(event: MouseEvent, tag: any, index: number): void;
    inputClickHandler(): void;
    inputFocusHandler(): void;
    inputPasteHandler(event: ClipboardEvent): void;
    typeaheadOptionSelectedHandler(event: TypeaheadOptionEvent): void;
    /**
     * Commit the current input value and clear the input field if successful.
     */
    commitInput(): void;
    /**
     * Commit the given tag object and clear the input if successful.
     */
    commitTypeahead(tag: any): void;
    /**
     * Commit the given string value as one or more tags, if validation passes. Returns true if the tag(s) were created.
     */
    commit(input: string): boolean;
    /**
     * If no tag is selected, select the rightmost tag. If a tag is selected, remove it.
     */
    backspace(): void;
    /**
     * Move the highlighted option forwards or backwards in the list. Wraps at the limits.
     * @param delta Value to be added to the selected index, i.e. -1 to move backwards, +1 to move forwards.
     */
    moveSelection(delta: number): void;
    /**
     * Returns a value to display for the given tag. Uses display function/property name if set, otherwise assumes that the tag is a simple string.
     */
    getTagDisplay(tag: any): string;
    /**
     * Returns true if the given index is selected (tag index or input field).
     */
    isSelected(index: number): boolean;
    /**
     * Select the tag at the given index. Does nothing if disabled is true.
     */
    selectTagAt(tagIndex: number): void;
    /**
     * Select the input field, giving it focus. Does nothing if disabled is true.
     */
    selectInput(): void;
    /**
     * Remove the tag at the given index. Does nothing if disabled is true or the minTags property prevents removal.
     */
    removeTagAt(tagIndex: number): void;
    /**
     * Returns true if the tag at the given index can be removed.
     */
    canRemoveTagAt(tagIndex: number): boolean;
    /**
     * Returns true if the input field should be available.
     */
    isInputVisible(): boolean;
    /**
     * Returns true if any part of the control has focus.
     */
    hasFocus(): boolean;
    private connectTypeahead(typeahead);
    /**
     * Validate the given tagValue with the tagPattern, if set. Update validationErrors on validation failure.
     */
    private validateTag(tagValue);
    /**
     * Create a tag object for the given tagValue. If createTagHandler is specified, use it; otherwise if displayProperty is specified, create an object with the tagValue as the single named property; otherwise return the tagValue itself.
     */
    private createTag(tagValue);
    /**
     * Add a tag object, calling the tagAdding and tagAdded events. Returns true if the tag was added to the tags array.
     */
    private addTag(tag);
    /**
     * Returns true if the given tagIndex is a valid tag index.
     */
    private isValidTagIndex(tagIndex);
    /**
     * Returns true if the given index is a valid selection index (tags or input field).
     */
    private isValidSelectIndex(index);
    /**
     * Returns the character corresponding to the given key event, mainly for IE compatibility.
     */
    private getKeyChar(event);
    /**
     * Returns an array of strings corresponding to the input string split by the tagDelimiters characters.
     */
    private splitTagInput(input);
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
export declare type TagClassFunction = (tag: any, index: number, selected: boolean) => (string | string[] | Set<string>);
