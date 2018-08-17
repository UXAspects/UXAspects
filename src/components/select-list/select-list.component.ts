import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { SelectionService } from '../../directives/selection/selection.service';
import { MultipleSelectListStrategy } from './multiple-select-list.strategy';
import { SelectListItemComponent } from './select-list-item/select-list-item.component';
import { SingleSelectListStrategy } from './single-select-list.strategy';

@Component({
    selector: 'ux-select-list',
    templateUrl: './select-list.component.html',
    providers: [SelectionService],
    host: {
        role: 'list'
    }
})
export class SelectListComponent implements AfterContentInit, OnDestroy {

    @Input() set multiple(multiple: boolean) {
        this._selection.strategy.deselectAll();
        this._selection.setStrategy(multiple ? new MultipleSelectListStrategy() : new SingleSelectListStrategy())
    }

    @Input() selected: any[] = [];
    @Output() selectedChange = new EventEmitter<any[]>();

    @ContentChildren(SelectListItemComponent) items: QueryList<SelectListItemComponent>;

    private _subscription: Subscription;

    constructor(private _selection: SelectionService) {
        // set the selection strategy to single by default
        this._selection.setStrategy(new SingleSelectListStrategy());

        // emit the selection changes when they occur
        this._subscription = this._selection.selection$.subscribe(selection => this.selectedChange.emit(selection));
    }

    ngAfterContentInit(): void {

        // supply the initial item set
        this._selection.dataset = this.items.map(item => item.data);

        // if the item set changes update the list
        this.items.changes.subscribe(() => this._selection.dataset = this.items.map(item => item.data));
    }

    ngOnDestroy(): void {
        this._subscription.unsubscribe();
    }
}