import { InfiniteScrollLoadFunction } from '../../directives/infinite-scroll/index';
import { TypeaheadComponent, TypeaheadKeyService, TypeaheadOptionEvent } from '../typeahead/index';
import { ElementRef, EventEmitter, OnChanges, OnInit, SimpleChanges, TemplateRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
export declare const SELECT_VALUE_ACCESSOR: any;
export declare class SelectComponent implements OnInit, OnChanges, ControlValueAccessor {
    private _element;
    private _document;
    private _typeaheadKeyService;
    private _value;
    value: any;
    valueChange: EventEmitter<any>;
    private _input;
    input: string;
    inputChange: EventEmitter<string>;
    private _dropdownOpen;
    dropdownOpen: boolean;
    dropdownOpenChange: EventEmitter<boolean>;
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
    loadingTemplate: TemplateRef<any>;
    noOptionsTemplate: TemplateRef<any>;
    optionTemplate: TemplateRef<any>;
    singleInput: ElementRef;
    multipleTypeahead: TypeaheadComponent;
    singleTypeahead: TypeaheadComponent;
    filter: Observable<string>;
    propagateChange: (_: any) => void;
    constructor(_element: ElementRef, _document: HTMLDocument, _typeaheadKeyService: TypeaheadKeyService);
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
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
