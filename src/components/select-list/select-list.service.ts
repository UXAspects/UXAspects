import { FocusKeyManager } from '@angular/cdk/a11y';
import { Injectable, OnDestroy, QueryList } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { takeUntil } from 'rxjs/operators';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { Subject } from 'rxjs/Subject';
import { SelectListItemComponent } from './select-list-item/select-list-item.component';

@Injectable()
export class SelectListService implements OnDestroy {

    multiple: boolean = false;
    selected$ = new BehaviorSubject<any[]>([]);
    focused$ = new ReplaySubject<SelectListItemComponent>();

    private _items: QueryList<SelectListItemComponent>;
    private _focusKeyManager: FocusKeyManager<SelectListItemComponent>;
    private _onDestroy = new Subject<void>();

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    initialise(items: QueryList<SelectListItemComponent>): void {

        // store the items
        this._items = items;

        // create the focus key manager
        this._focusKeyManager = new FocusKeyManager(items)
            .withVerticalOrientation()
            .withWrap();

        // make the first item tabbable by default
        if (items.first) {
            this.focused$.next(items.first);
        }

        // emit the focused item any time it changes
        this._focusKeyManager.change.pipe(takeUntil(this._onDestroy))
            .subscribe(() => this.focused$.next(this._focusKeyManager.activeItem));
    }

    select(item: any): void {
        this.multiple ? this.selected$.next([...this.selected$.value, item]) : this.selected$.next([item]);
    }

    deselect(item: any): void {
        this.selected$.next(this.selected$.value.filter(_item => _item !== item));
    }

    focus(item: SelectListItemComponent): void {
        if (this._focusKeyManager.activeItem !== item) {
            this._focusKeyManager.setActiveItem(this.getIndexOfItem(item));
        }
    }

    onKeydown(event: KeyboardEvent): void {
        this._focusKeyManager.onKeydown(event);
    }

    private getIndexOfItem(item: SelectListItemComponent): number {
        return this._items.toArray().indexOf(item);
    }

}