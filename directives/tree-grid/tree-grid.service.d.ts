import { ChangeDetectorRef, OnDestroy } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { TreeGridItem } from './tree-grid-item.interface';
import { TreeGridLoadFunction } from './tree-grid-load-function.type';
export declare class TreeGridService implements OnDestroy {
    private _changeDetector;
    /** The raw table data */
    data$: BehaviorSubject<TreeGridItem[]>;
    /** The flattened table data */
    rows$: BehaviorSubject<TreeGridItem[]>;
    /** The function to load child items */
    loadChildren: TreeGridLoadFunction;
    /** Ensure we destroy all observables correctly */
    private _onDestroy;
    constructor(_changeDetector: ChangeDetectorRef);
    /** Unsubscribe from all observables */
    ngOnDestroy(): void;
    /** Set the expanded state of a row */
    setExpanded(item: TreeGridItem, expanded: boolean): Promise<void>;
    /** A function to flatten tree data */
    private getFlattenedTree(data, parent?);
    /** Load any children dynamically */
    private getChildren(item);
    /** We want to support an array, a promise and an observable. This will return all types as a promise */
    private getNormalizedChildren(response);
    /** Insert the children into the flattened tree at the correct location */
    private insertChildren(parent);
    /** Remove all rows from the flattened tree */
    private removeChildren(parent);
}
