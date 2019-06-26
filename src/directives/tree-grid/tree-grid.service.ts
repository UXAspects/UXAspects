import { ChangeDetectorRef, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject ,  Observable ,  Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { TreeGridItem } from './tree-grid-item.interface';
import { TreeGridLoadFunction } from './tree-grid-load-function.type';
import { TreeGridState } from './tree-grid-state.class';

@Injectable()
export class TreeGridService implements OnDestroy {

    /** The raw table data */
    data$ = new BehaviorSubject<TreeGridItem[]>([]);

    /** The flattened table data */
    rows$ = new BehaviorSubject<TreeGridItem[]>([]);

    /** The function to load child items */
    loadChildren: TreeGridLoadFunction;

    /** Ensure we destroy all observables correctly */
    private _onDestroy = new Subject<void>();

    constructor(private _changeDetector: ChangeDetectorRef) {
        this.data$.pipe(takeUntil(this._onDestroy)).subscribe(data => this.rows$.next(this.getFlattenedTree(data)));
    }

    /** Unsubscribe from all observables */
    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    /** Set the expanded state of a row */
    async setExpanded(item: TreeGridItem, expanded: boolean) {
        if (expanded) {
            await this.getChildren(item);
            this.insertChildren(item);
        } else {
            this.removeChildren(item);
        }

        this._changeDetector.detectChanges();
    }

    /** A function to flatten tree data */
    private getFlattenedTree(data: TreeGridItem[], parent?: TreeGridItem): TreeGridItem[] {
        // flatten the nodes at this level
        return data.reduce((previous, item, index) => {

            item.state = new TreeGridState(parent ? parent.state.level + 1 : 0, data.length, index + 1);

            // Convert any child nodes
            const children = (item.children && item.expanded) ? this.getFlattenedTree(item.children, item) : [];

            // return the nodes in a flattened array
            return [...previous, item, ...children];
        }, []);
    }

    /** Load any children dynamically */
    private async getChildren(item: TreeGridItem): Promise<void> {
        if (!item.children && this.loadChildren) {
            item.state.loading$.next(true);

            try {
                item.children = await this.getNormalizedChildren(this.loadChildren(item));
            }
            finally {
                item.state.loading$.next(false);
            }
        }
    }

    /** We want to support an array, a promise and an observable. This will return all types as a promise */
    private async getNormalizedChildren(response: TreeGridItem[] | Promise<TreeGridItem[]> | Observable<TreeGridItem[]>): Promise<TreeGridItem[]> {

        // if it is already an observable do nothing
        if (response instanceof Observable) {
            return await response.toPromise();
        }

        // if it is a promise wrap it as an observable
        if (response instanceof Promise) {
            return await response;
        }

        // if it is an array then make it an observable
        return response;
    }

    /** Insert the children into the flattened tree at the correct location */
    private insertChildren(parent: TreeGridItem): void {
        if (!parent.children) {
            return;
        }

        const row = this.rows$.getValue();

        const index = row.indexOf(parent);

        if (index < 0) {
            return;
        }

        // Skip duplicates - this could happen if an already expanded child has been inserted
        const uniqueChildren = parent.children.filter(child => row.indexOf(child) === -1);

        const childRows = this.getFlattenedTree(uniqueChildren, parent);

        row.splice(index + 1, 0, ...childRows);
    }

    /** Remove all rows from the flattened tree */
    private removeChildren(parent: TreeGridItem): void {

        const rows = this.rows$.getValue();
        const index = rows.indexOf(parent);

        if (index < 0) {
            return;
        }

        while (index + 1 < rows.length && rows[index + 1].state.level > parent.state.level) {
            rows.splice(index + 1, 1);
        }
    }
}
