import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, TemplateRef } from '@angular/core';
import { TypeaheadOptionApi } from './typeahead-option-api';
import { TypeaheadOptionContext } from './typeahead-option-context';
import { TypeaheadVisibleOption } from './typeahead-visible-option';

@Component({
    selector: 'ux-typeahead-options-list',
    templateUrl: 'typeahead-options-list.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TypeaheadOptionsListComponent<T> {

    @Input()
    id: string;

    @Input()
    startIndex: number = 0;

    @Input()
    options: TypeaheadVisibleOption<T>[];

    @Input()
    highlighted: TypeaheadVisibleOption<T>;

    @Input()
    activeKey: string;

    @Input()
    disabledOptions: T[];

    @Input()
    isMultiselectable: boolean = false;

    @Input()
    optionTemplate: TemplateRef<TypeaheadOptionContext<T>>;

    @Input()
    optionApi: TypeaheadOptionApi;

    @Input()
    typeaheadElement: ElementRef<any>;

    @Output()
    optionMouseover = new EventEmitter<TypeaheadOptionDomEvent<T>>();

    @Output()
    optionMousedown = new EventEmitter<TypeaheadOptionDomEvent<T>>();

    @Output()
    optionClick = new EventEmitter<TypeaheadOptionDomEvent<T>>();

}

export interface TypeaheadOptionDomEvent<T> {
    option: TypeaheadVisibleOption<T>;
    event: Event;
}
