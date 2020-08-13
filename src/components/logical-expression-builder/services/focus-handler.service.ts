import { Injectable, OnDestroy, QueryList } from '@angular/core';
import { FocusableOption, FocusKeyManager } from '@angular/cdk/a11y';
import { ExpressionRow } from '../directives/expression-row.directive';
import { Subject } from 'rxjs';
import { LogicalExpressionBuilderService } from './logical-expression-builder.service';
import { takeUntil } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class FocusHandlerService implements OnDestroy {
    /** Used to store all ExpressionRows */
    private _queryList: QueryList<ExpressionRow> = new QueryList<ExpressionRow>();

    /** Reference to focus key manager */
    private _focusKeyManager: FocusKeyManager<ExpressionRow> = new FocusKeyManager(this._queryList).withWrap().withVerticalOrientation();

    /** Used to determine whether arrow keys should shift focus */
    private _editBlocked: boolean;
    private _conditionInEditMode: number[];

    private _destroy$: Subject<void> = new Subject<void>();
    public onTabindexChange$: Subject<void> = new Subject<void>();

    /** Add an ExpressionRow to the focus items and put it in the right position */
    public register(item: ExpressionRow): void {
        let items = this._queryList.toArray();
        items.push(item);
        items.sort(this._comparePaths);

        this._queryList.reset([...items]);

        const inEditModeIndex: number = this._queryList.toArray().findIndex((_item: ExpressionRow) => _item.path.join() === this._conditionInEditMode?.join());
        const activeIndex = this._focusKeyManager.activeItemIndex;

        if (inEditModeIndex >= 0) {
            this._focusKeyManager.setActiveItem(inEditModeIndex);
        } else if (activeIndex >= 0) {
            this._focusKeyManager.setActiveItem(activeIndex);
        } else {
            this._focusKeyManager.setFirstItemActive();
        }

        console.log('register', this._queryList.toArray().map(_i => _i.path.join('-')).join(', '));

        this.onTabindexChange$.next();
    }

    /** Remove ExpressionRow from focus items */
    public unregister(item: ExpressionRow): void {
        let items = this._queryList.toArray().filter((i: ExpressionRow) => i.path.join('-') !== item.path.join('-'));
        this._queryList.reset([...items]);
    }

    constructor(private _lebService: LogicalExpressionBuilderService) {
        this._lebService.getEditBlocked().pipe(takeUntil(this._destroy$)).subscribe((blocked: boolean) => {
            this._editBlocked = blocked;
        });

        this._lebService.getConditionInEditMode().pipe(takeUntil(this._destroy$)).subscribe((_path: number[]) => {
            const previousPath = this._conditionInEditMode;

            let index: number;

            if (!_path && previousPath?.length > 0) {
                index = this._queryList.toArray().findIndex((_item: ExpressionRow) => _item.path.join() === previousPath.join());
                this._focusKeyManager.setActiveItem(index);
            } else if (_path?.length) {
                index = this._queryList.toArray().findIndex((_item: ExpressionRow) => _item.path.join() === _path.join());
                console.log('second branch. index:', index);
                this._focusKeyManager.setActiveItem(index);
            }

            console.log('Condition in edit mode. Active item has path:', this._focusKeyManager.activeItem?.path?.join('-'));
            console.log('Paths in queryList: ', this._queryList.toArray().map((_item) => _item.path.join('-')).join(', '));

            this.onTabindexChange$.next();
            this._conditionInEditMode = _path;
        });
    }

    ngOnDestroy(): void {
        this._destroy$.next();
        this._destroy$.complete();
    }

    /** Handle arrow key presses, but only if no item is currently being edited */
    public onKeydown(event: KeyboardEvent): void {
        if (!this._editBlocked) {
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

    setActiveItem(expressionRow: ExpressionRow) {
        const index = this._queryList.toArray().findIndex((_row: ExpressionRow) => _row.path.join() === expressionRow.path.join());

        if (index > -1) {
            this._focusKeyManager.setActiveItem(index);
        } else {
            this._focusKeyManager.setFirstItemActive();
        }
    }
}
