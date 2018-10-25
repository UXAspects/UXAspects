import { ElementRef, EventEmitter, OnChanges, OnDestroy, OnInit, SimpleChanges, StaticProvider, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { InfiniteScrollLoadFunction } from '../../directives/infinite-scroll/index';
import { TagInputComponent } from '../tag-input/index';
import { TypeaheadComponent, TypeaheadKeyService, TypeaheadOptionEvent } from '../typeahead/index';
export declare const SELECT_VALUE_ACCESSOR: StaticProvider;
export declare class SelectComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
    private _element;
    private _document;
    private _typeaheadKeyService;
    id: string;
    value: any;
    input: string;
    dropdownOpen: boolean;
    options: any[] | InfiniteScrollLoadFunction;
    display: (option: any) => string | string;
    key: (option: any) => string | string;
    allowNull: boolean;
    disabled: boolean;
    dropDirection: 'up' | 'down';
    maxHeight: string;
    multiple: boolean;
    pageSize: number;
    placeholder: string;
    autocomplete: string;
    loadingTemplate: TemplateRef<any>;
    noOptionsTemplate: TemplateRef<any>;
    optionTemplate: TemplateRef<any>;
    valueChange: EventEmitter<any>;
    inputChange: EventEmitter<string>;
    dropdownOpenChange: EventEmitter<boolean>;
    singleInput: ElementRef;
    tagInput: TagInputComponent;
    multipleTypeahead: TypeaheadComponent;
    singleTypeahead: TypeaheadComponent;
    highlightedElement: HTMLElement;
    filter$: Observable<string>;
    propagateChange: (_: any) => void;
    private _value$;
    private _input$;
    private _dropdownOpen;
    private _onDestroy;
    constructor(_element: ElementRef, _document: any, _typeaheadKeyService: TypeaheadKeyService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnDestroy(): void;
    onfocus(): void;
    writeValue(obj: any): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    setDisabledState(isDisabled: boolean): void;
    inputClickHandler(event: MouseEvent): void;
    inputBlurHandler(event: Event): void;
    /**
     * Key handler for single select only. Multiple select key handling is in TagInputComponent.
     */
    inputKeyHandler(event: KeyboardEvent): void;
    singleOptionSelected(event: TypeaheadOptionEvent): void;
    /**
     * Returns the display value of the given option.
     */
    getDisplay(option: any): string;
    private selectInputText();
}
