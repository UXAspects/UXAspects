import { FocusableOption } from '@angular/cdk/a11y';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Facet } from '../../models/facet';

@Component({
    selector: 'ux-facet-check-list-item',
    templateUrl: './facet-check-list-item.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FacetCheckListItemComponent implements FocusableOption {

    @Input() facet: Facet = null;
    @Input() selected: boolean = false;
    @Input() tabbable: boolean = false;
    @Input() simplified: boolean = false;
    @Output() selectedChange = new EventEmitter<Facet>();
    @Output() itemFocus = new EventEmitter<void>();
    @Output() itemBlur = new EventEmitter<void>();
    @ViewChild('option') option: ElementRef;

    get disabled(): boolean {
        return this.facet && this.facet.disabled;
    }

    getLabel(): string {
        return this.facet ? this.facet.title : '';
    }

    focus(): void {
        this.option.nativeElement.focus();
    }
}
