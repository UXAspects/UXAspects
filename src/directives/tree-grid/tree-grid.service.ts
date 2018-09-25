import { ChangeDetectorRef, Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
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
        return data.reduce((previous, item) => {

            item.state = new TreeGridState(parent ? parent.state.level + 1 : 0);

            // Convert any child nodes
            const children = (item.children && item.expanded) ? this.getFlattenedTree(item.children, item) : [];

            // return the nodes in a flattened array
            return [...previous, item, ...children];
        }, []);
    }

    /** Load any children dynamically */
    private async getChildren(item: TreeGridItem) {
        if (!item.children && this.loadChildren) {
            item.state.loading$.next(true);

            try {
                item.children = await this.loadChildren(item);
            }
            finally {
                item.state.loading$.next(false);
            }
        }
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
