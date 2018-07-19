import { FocusableOption } from '@angular/cdk/a11y';
import { ElementRef, EventEmitter } from '@angular/core';
import { Facet } from '../../models/facet';
export declare class FacetTypeaheadListItemComponent implements FocusableOption {
    facet: Facet;
    selected: boolean;
    simplified: boolean;
    tabbable: boolean;
    itemFocus: EventEmitter<void>;
    selectedChange: EventEmitter<Facet>;
    option: ElementRef;
    readonly disabled: boolean;
    getLabel(): string;
    focus(): void;
}
