import { Injectable, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { TreeGridItem } from './tree-grid-item.interface';
import { TreeGridLoadFunction } from './tree-grid-load-function.type';
import { TreeGridState } from './tree-grid-state.class';

@Injectable()
export class TreeGridService implements OnDestroy {

    data$ = new BehaviorSubject<TreeGridItem[]>([]);

    rows$ = new BehaviorSubject<TreeGridItem[]>([]);

    loadChildren: TreeGridLoadFunction;

    private _onDestroy = new Subject<void>();

    constructor(private _changeDetector: ChangeDetectorRef) {
        this.data$.pipe(takeUntil(this._onDestroy)).subscribe(this.updateRows.bind(this));
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    async setExpanded(item: TreeGridItem, expanded: boolean) {
        if (expanded) {
            await this.ensureChildren(item);
            this.insertChildren(item);
        } else {
            this.removeChildren(item);
        }

        this._changeDetector.detectChanges();
    }

    private updateRows(data: TreeGridItem[]): void {
        const rows = this.getFlattenedTree(data);
        this.rows$.next(rows);
    }

    private getFlattenedTree(data: TreeGridItem[], parent?: TreeGridItem): TreeGridItem[] {
        // flatten the nodes at this level
        return data.reduce((previous, item) => {

            item.treeGridState = new TreeGridState(parent ? parent.treeGridState.level + 1 : 0);

            // Convert any child nodes
            const children = (item.children && item.expanded) ? this.getFlattenedTree(item.children, item) : [];

            // return the nodes in a flattened array
            return [...previous, item, ...children];
        }, []);
    }

    private async ensureChildren(item: TreeGridItem) {
        if (!item.children && this.loadChildren) {
            item.treeGridState.loading$.next(true);
            try {
                item.children = await this.loadChildren(item);
            }
            finally {
                item.treeGridState.loading$.next(false);
            }
        }
    }

    private insertChildren(parent: TreeGridItem): void {
        if (!parent.children) {
            return;
        }

        const allRows = this.rows$.getValue();

        const index = allRows.indexOf(parent);
        if (index < 0) {
            return;
        }

        // Skip duplicates - this could happen if an already expanded child has been inserted
        const uniqueChildren = parent.children.filter(child => allRows.indexOf(child) === -1);

        const childRows = this.getFlattenedTree(uniqueChildren, parent);
        allRows.splice(index + 1, 0, ...childRows);
    }

    private removeChildren(parent: TreeGridItem): void {
        const allRows = this.rows$.getValue();
        const index = allRows.indexOf(parent);
        if (index < 0) {
            return;
        }

        while (index + 1 < allRows.length && allRows[index + 1].treeGridState.level > parent.treeGridState.level) {
            allRows.splice(index + 1, 1);
        }
    }
}
