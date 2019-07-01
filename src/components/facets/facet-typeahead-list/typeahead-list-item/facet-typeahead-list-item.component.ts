import { FocusableOption } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Facet } from '../../models/facet';

@Component({
    selector: 'ux-facet-typeahead-list-item',
    templateUrl: './facet-typeahead-list-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacetTypeaheadListItemComponent implements FocusableOption {

    @Input() facet: Facet;
    @Input() selected: boolean = false;
    @Input() simplified: boolean = false;
    @Input() tabbable: boolean = false;

    @Output() itemFocus = new EventEmitter<void>();
    @Output() selectedChange = new EventEmitter<Facet>();

    @ViewChild('option') option: ElementRef;

    get disabled(): boolean {
        return this.facet && this.facet.disabled;
    }

    getLabel(): string {
        return this.facet ? this.facet.title : null;
    }

    focus(): void {
        this.option.nativeElement.focus();
    }
}
