import { Injectable, OnDestroy, QueryList } from '@angular/core';
import { FocusKeyManager } from '@angular/cdk/a11y';
import { ExpressionRowDirective } from '../directives/expression-row.directive';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable()
export class FocusHandlerService implements OnDestroy {
    /** Used to store all ExpressionRows */
    private queryList: QueryList<ExpressionRowDirective> = new QueryList<ExpressionRowDirective>();

    /** Reference to focus key manager */
    private focusKeyManager: FocusKeyManager<ExpressionRowDirective> = new FocusKeyManager(this.queryList).withWrap().withVerticalOrientation();

    private destroy$: Subject<void> = new Subject<void>();
    onTabindexChange$: Subject<void> = new Subject<void>();

    /** Add an ExpressionRow to the focus items and put it in the right position */
    register(item: ExpressionRowDirective): void {
        let items = this.queryList.toArray();
        items.push(item);
        items.sort(this.comparePaths);

        this.queryList.reset([...items]);

        const inEditModeIndex: number = this.queryList.toArray().findIndex((_item: ExpressionRowDirective) => _item.path.join() === this.rowInEditMode.getValue()?.join());
        const activeIndex = this.focusKeyManager.activeItemIndex;

        if (inEditModeIndex >= 0) {
            this.focusKeyManager.setActiveItem(inEditModeIndex);
        } else if (activeIndex >= 0) {
            this.focusKeyManager.setActiveItem(activeIndex);
        }

        this.onTabindexChange$.next();
    }

    /** Remove ExpressionRow from focus items */
    unregister(item: ExpressionRowDirective): void {
        let items = this.queryList.toArray().filter((i: ExpressionRowDirective) => i.path.join('-') !== item.path.join('-'));
        this.queryList.reset([...items]);

        this.onTabindexChange$.next();
    }

    constructor() {}

    ngOnDestroy(): void {
        this.destroy$.next();
        this.destroy$.complete();
    }

    /** Handle arrow key presses, but only if no item is currently being edited */
    onKeydown(event: KeyboardEvent): void {
        if (!this.editBlocked.getValue()) {
            this.focusKeyManager.onKeydown(event);
            this.onTabindexChange$.next();
        }
    }

    /** Check if passed item is currently focused */
    isItemActive(item: ExpressionRowDirective) {
        // if this is called before the items have been set then do nothing
        if (!this.queryList) {
            return false;
        }

        // find the index of the item
        const index = this.queryList.toArray().findIndex((_item: ExpressionRowDirective) => _item.path.join() === item.path.join());

        // check if the item is active (we check against index as it can be updated without setting the activeItem)
        return this.focusKeyManager && this.focusKeyManager.activeItemIndex === index;
    }

    hasRow(): boolean {
        return this.focusKeyManager && this.focusKeyManager.activeItemIndex >= 0;
    }

    /** Compare function to compare paths of two ConditionRows */
    private comparePaths = (a: ExpressionRowDirective, b: ExpressionRowDirective) => {
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

        if (this.queryList) {
            index = this.queryList.toArray().findIndex((_row: ExpressionRowDirective) => _row.path.join() === path.join());
        }

        if (index !== null && index > -1) {
            if (updateIndexOnly) {
                this.focusKeyManager.updateActiveItem(index);
            } else {
                this.focusKeyManager.setActiveItem(index);
            }
        } else {
            this.focusKeyManager.setFirstItemActive();
        }

        this.onTabindexChange$.next();
    }

    private rowInEditMode: BehaviorSubject<number[]> = new BehaviorSubject<number[]>(null);
    private editBlocked: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    // Whether a row is currently being edited and therefore editing should be blocked for other rows
    getEditBlocked(): Observable<boolean> {
        return this.editBlocked.asObservable();
    }

    setEditBlocked(blocked: boolean): void {
        this.editBlocked.next(blocked);
    }

    // Row that is currently being edited. null if none is edited.
    getRowInEditMode(): Observable<number[]> {
        return this.rowInEditMode.asObservable();
    }

    setRowInEditMode(_path: number[]): void {
        this.rowInEditMode.next(_path);
        this.editBlocked.next(!!_path);
        this.onTabindexChange$.next();
    }
}
