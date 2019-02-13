import { AfterContentInit, Component, ContentChildren, EventEmitter, Input, OnDestroy, Output, QueryList } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectionService } from '../../directives/selection/selection.service';
import { MultipleSelectListStrategy } from './strategies/multiple-select-list.strategy';
import { SelectListItemComponent } from './select-list-item/select-list-item.component';
import { SingleSelectListStrategy } from './strategies/single-select-list.strategy';

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
    @Input() set selected(selected: T | ReadonlyArray<T>) {

        // if the selection entered is the same as the current selection then do nothing
        if (this._selection.selection$.value === selected) {
            return;
        }

        // if selected is an array and has not items and there are no items currently selected also do nothing
        if (Array.isArray(selected) && selected.length === 0 && this._selection.selection$.value.length === 0) {
            return;
        }

        // select only the specified items
        if (Array.isArray(selected)) {
            this._selection.selectOnly(...selected);
        } else {
            this._selection.selectOnly(<T>selected);
        }
    }

    /** Emit when the selection changes */
    @Output() selectedChange = new EventEmitter<ReadonlyArray<T>>();

    /** Find all select list items */
    @ContentChildren(SelectListItemComponent) items: QueryList<SelectListItemComponent<T>>;

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