import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { TreeGridItem } from './tree-grid-item.interface';
import { TreeGridLoadFunction } from './tree-grid-load-function.type';
import { TreeGridService } from './tree-grid.service';
export declare class TreeGridDirective implements OnInit, OnDestroy {
    private _treeGridService;
    data: TreeGridItem[];
    loadChildren: TreeGridLoadFunction;
    rows: TreeGridItem[];
    rowsChange: EventEmitter<TreeGridItem[]>;
    private _onDestroy;
    constructor(_treeGridService: TreeGridService);
    ngOnInit(): void;
    ngOnDestroy(): void;
}
