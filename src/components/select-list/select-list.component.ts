import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
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
export class SelectListComponent<T> implements AfterContentInit, OnDestroy {

    /** Determine if we allow multiple items to be selected */
    @Input() set multiple(multiple: boolean) {
        this._selection.strategy.deselectAll();
        this._selection.setStrategy(multiple ? new MultipleSelectListStrategy<T>() : new SingleSelectListStrategy<T>());
    }

    /** Set the selected items */
    @Input() set selected(selected: T | T[]) {

        // deselect all currently selected items
        this._selection.deselectAll();

        // select only the specified items
        if (Array.isArray(selected)) {
            this._selection.select(...selected);
        } else {
            this._selection.select(selected);
        }
    }

    /** Emit when the selection changes */
    @Output() selectedChange = new EventEmitter<T[]>();

    /** Find all select list items */
    @ContentChildren(SelectListItemComponent, { descendants: true }) items: QueryList<SelectListItemComponent<T>>;

    /** Automatically unsubscribe all observables */
    private _onDestroy = new Subject<void>();

    constructor(private _selection: SelectionService<T>) {
        // set the selection strategy to single by default
        this._selection.setStrategy(new SingleSelectListStrategy<T>());

        // emit the selection changes when they occur
        this._selection.selection$.pipe(takeUntil(this._onDestroy))
            .subscribe(selection => this.selectedChange.emit(selection));
    }

    ngAfterContentInit(): void {

        // supply the initial item set
        this._selection.dataset = this.items.map(item => item.data);

        // if the item set changes update the list
        this.items.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => this._selection.dataset = this.items.map(item => item.data));
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
}