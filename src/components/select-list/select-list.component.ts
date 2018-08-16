import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, Output, QueryList } from '@angular/core';
import { SelectionService } from '../../directives/selection/selection.service';
import { SelectListItemComponent } from './select-list-item/select-list-item.component';
import { SelectListStrategy } from './select-list.strategy';

@Component({
    selector: 'ux-select-list',
    templateUrl: './select-list.component.html',
    providers: [SelectionService],
    host: {
        role: 'list'
    }
})
export class SelectListComponent implements AfterContentInit {

    @Input() multiple: boolean;
    @Input() selected: any[] = [];
    @Output() selectedChange = new EventEmitter<any[]>();

    @ContentChildren(SelectListItemComponent) items: QueryList<SelectListItemComponent>;

    constructor(private _selection: SelectionService) {
        // set the selection strategy
        this._selection.setStrategy(new SelectListStrategy());
    }

    ngAfterContentInit(): void {

        // supply the initial item set
        this._selection.dataset = this.items.map(item => item.data);

        // if the item set changes update the list
        this.items.changes.subscribe(() => this._selection.dataset = this.items.map(item => item.data));
    }
}