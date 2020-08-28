import { Injectable, OnDestroy, QueryList } from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { ExpressionRowDirective } from '../directives/expression-row.directive';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class FocusHandlerService implements OnDestroy {
    /** Used to store all ExpressionRows */
    private _queryList: QueryList<ExpressionRowDirective> = new QueryList<ExpressionRowDirective>();

    /** Reference to focus key manager */
    private _focusKeyManager: FocusKeyManager<ExpressionRowDirective> = new FocusKeyManager(this._queryList).withWrap().withVerticalOrientation();

    private _destroy$: Subject<void> = new Subject<void>();
    onTabindexChange$: Subject<void> = new Subject<void>();

    /** Add an ExpressionRow to the focus items and put it in the right position */
    register(item: ExpressionRowDirective): void {
        let items = this._queryList.toArray();
        items.push(item);
        items.sort(this._comparePaths);

        this._queryList.reset([...items]);

        const inEditModeIndex: number = this._queryList.toArray().findIndex((_item: ExpressionRowDirective) => _item.path.join() === this._rowInEditMode.getValue()?.join());
        const activeIndex = this._focusKeyManager.activeItemIndex;

        if (inEditModeIndex >= 0) {
            this._focusKeyManager.setActiveItem(inEditModeIndex);
        } else if (activeIndex >= 0) {
            this._focusKeyManager.setActiveItem(activeIndex);
        }

        this.onTabindexChange$.next();
    }

    /** Remove ExpressionRow from focus items */
    unregister(item: ExpressionRowDirective): void {
        let items = this._queryList.toArray().filter((i: ExpressionRowDirective) => i.path.join('-') !== item.path.join('-'));
        this._queryList.reset([...items]);

        this.onTabindexChange$.next();
    }

    constructor() {}

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    /** Handle arrow key presses, but only if no item is currently being edited */
    onKeydown(event: KeyboardEvent): void {
        if (!this._editBlocked.getValue()) {
            this._focusKeyManager.onKeydown(event);
            this.onTabindexChange$.next();
        }
    }

    /** Check if passed item is currently focused */
    isItemActive(item: ExpressionRowDirective) {
        // if this is called before the items have been set then do nothing
        if (!this._queryList) {
            return false;
        }

        // find the index of the item
        const index = this._queryList.toArray().findIndex((_item: ExpressionRowDirective) => _item.path.join() === item.path.join());

        // check if the item is active (we check against index as it can be updated without setting the activeItem)
        return this._focusKeyManager && this._focusKeyManager.activeItemIndex === index;
    }

    hasRow(): boolean {
        return this._focusKeyManager && this._focusKeyManager.activeItemIndex >= 0;
    }

    /** Compare function to compare paths of two ConditionRows */
    private _comparePaths = (a: ExpressionRowDirective, b: ExpressionRowDirective) => {
        const pathA = a.path.join('-');
        const pathB = b.path.join('-');

        if (pathA > pathB) {
            return 1;
        } else if (pathA === pathB) {
            return 0;
        } else {
            return -1;
        }
    }

    setPathToActivate(path: number[], updateIndexOnly: boolean = false) {
        let index: number = null;

        if (this._queryList) {
            index = this._queryList.toArray().findIndex((_row: ExpressionRowDirective) => _row.path.join() === path.join());
        }

        if (index !== null && index > -1) {
            if (updateIndexOnly) {
                this._focusKeyManager.updateActiveItem(index);
            } else {
                this._focusKeyManager.setActiveItem(index);
            }
        } else {
            this._focusKeyManager.setFirstItemActive();
        }

        this.onTabindexChange$.next();
    }

    private _rowInEditMode: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(null);
    private _editBlocked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // Whether a row is currently being edited and therefore editing should be blocked for other rows
    getEditBlocked(): Observable<boolean> {
        return this._editBlocked.asObservable();
    }

    setEditBlocked(blocked: boolean): void {
        this._editBlocked.next(blocked);
    }

    // Row that is currently being edited. null if none is edited.
    getRowInEditMode(): Observable<number[]> {
        return this._rowInEditMode.asObservable();
    }

    setRowInEditMode(_path: number[]): void {
        this._rowInEditMode.next(_path);
        this._editBlocked.next(!!_path);
        this.onTabindexChange$.next();
    }
}
