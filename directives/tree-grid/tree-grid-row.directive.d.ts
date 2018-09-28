import { EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { TreeGridItem } from './tree-grid-item.interface';
import { TreeGridService } from './tree-grid.service';
export declare class TreeGridRowDirective implements OnInit, OnDestroy {
    private _treeGridService;
    item: TreeGridItem;
    canExpand: boolean;
    expanded: boolean;
    expandedChange: EventEmitter<boolean>;
    loading: boolean;
    isExpanded: boolean;
    private _expanded$;
    private _onDestroy;
    constructor(_treeGridService: TreeGridService);
    ngOnInit(): void;
    ngOnDestroy(): void;
    collapse(event?: Event): void;
    expand(event?: Event): void;
    toggle(): void;
}
