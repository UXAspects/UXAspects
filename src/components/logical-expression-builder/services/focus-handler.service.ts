import { Injectable, OnDestroy, QueryList } from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { ExpressionRow } from '../directives/expression-row.directive';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class FocusHandlerService implements OnDestroy {
    /** Used to store all ExpressionRows */
    private _queryList: QueryList<ExpressionRow> = new QueryList<ExpressionRow>();

    /** Reference to focus key manager */
    private _focusKeyManager: FocusKeyManager<ExpressionRow> = new FocusKeyManager(this._queryList).withWrap().withVerticalOrientation();

    private _destroy$: Subject<void> = new Subject<void>();
    public onTabindexChange$: Subject<void> = new Subject<void>();

    /** Add an ExpressionRow to the focus items and put it in the right position */
    public register(item: ExpressionRow): void {
        let items = this._queryList.toArray();
        items.push(item);
        items.sort(this._comparePaths);

        this._queryList.reset([...items]);

        const inEditModeIndex: number = this._queryList.toArray().findIndex((_item: ExpressionRow) => _item.path.join() === this._rowInEditMode.getValue()?.join());
        const activeIndex = this._focusKeyManager.activeItemIndex;

        if (inEditModeIndex >= 0) {
            this._focusKeyManager.setActiveItem(inEditModeIndex);
        } else if (activeIndex >= 0) {
            this._focusKeyManager.setActiveItem(activeIndex);
        }

        this.onTabindexChange$.next();
    }

    /** Remove ExpressionRow from focus items */
    public unregister(item: ExpressionRow): void {
        let items = this._queryList.toArray().filter((i: ExpressionRow) => i.path.join('-') !== item.path.join('-'));
        this._queryList.reset([...items]);

        this.onTabindexChange$.next();
    }

    constructor() {}

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    /** Handle arrow key presses, but only if no item is currently being edited */
    public onKeydown(event: KeyboardEvent): void {
        if (!this._editBlocked.getValue()) {
            this._focusKeyManager.onKeydown(event);
            this.onTabindexChange$.next();
        }
    }

    /** Check if passed item is currently focused */
    public isItemActive(item: ExpressionRow) {
        // if this is called before the items have been set then do nothing
        if (!this._queryList) {
            return false;
        }

        // find the index of the item
        const index = this._queryList.toArray().findIndex((_item: ExpressionRow) => _item.path.join() === item.path.join());

        // check if the item is active (we check against index as it can be updated without setting the activeItem)
        return this._focusKeyManager && this._focusKeyManager.activeItemIndex === index;
    }

    hasRow(): boolean {
        return this._focusKeyManager && this._focusKeyManager.activeItemIndex >= 0;
    }

    /** Compare function to compare paths of two ConditionRows */
    private _comparePaths = (a: ExpressionRow, b: ExpressionRow) => {
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
            index = this._queryList.toArray().findIndex((_row: ExpressionRow) => _row.path.join() === path.join());
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

    // Focus stuff
    private _rowInEditMode: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(null);
    private _editBlocked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // editBlocked
    public getEditBlocked(): Observable<boolean> {
        return this._editBlocked.asObservable();
    }

    public setEditBlocked(blocked: boolean): void {
        this._editBlocked.next(blocked);
    }

    // Edit stuff
    public getRowInEditMode(): Observable<number[]> {
        return this._rowInEditMode.asObservable();
    }

    public setRowInEditMode(_path: number[]): void {
        this._rowInEditMode.next(_path);
        this._editBlocked.next(!!_path);
        this.onTabindexChange$.next();
    }
}