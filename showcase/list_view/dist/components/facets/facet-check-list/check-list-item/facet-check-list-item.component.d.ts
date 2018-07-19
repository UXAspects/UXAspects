import { FocusableOption } from '@angular/cdk/a11y';
import { ElementRef, EventEmitter } from '@angular/core';
import { Facet } from '../../models/facet';
export declare class FacetCheckListItemComponent implements FocusableOption {
    facet: Facet;
    selected: boolean;
    tabbable: boolean;
    selectedChange: EventEmitter<Facet>;
    itemFocus: EventEmitter<void>;
    itemBlur: EventEmitter<void>;
    option: ElementRef;
    readonly disabled: boolean;
    getLabel(): string;
    focus(): void;
}
