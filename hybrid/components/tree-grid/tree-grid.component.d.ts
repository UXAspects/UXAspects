import { ElementRef, EventEmitter, Injector } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';
export declare class TreeGridNg1Component extends UpgradeComponent {
    data: any[] | Function;
    columns: TreeGridColumn[];
    treeData: TreeGridData[];
    selected: any[];
    currentRow: any;
    options: TreeGridOptions;
    optionsChange: EventEmitter<TreeGridOptions>;
    selectedChange: EventEmitter<any[]>;
    currentRowChange: EventEmitter<any>;
    treeDataChange: EventEmitter<TreeGridData[]>;
    selectionManager: EventEmitter<any>;
    constructor(elementRef: ElementRef, injector: Injector);
}
export interface TreeGridColumn {
    name: string;
    value?: string | Function;
    template?: string;
    headerClass?: string;
    cellClass?: string;
    width?: string;
    tooltip?: string;
    tooltipPlacement?: 'top' | 'bottom' | 'left' | 'right';
}
export interface TreeGridData {
    dataItem: any;
    children: any[];
    expanded: boolean;
    expanding: boolean;
    level: number;
    api: any;
}
export interface TreeGridOptions {
    childrenProperty?: string;
    hasChildren?: Function;
    maxDepth?: number;
    expandTopLevel?: boolean;
    select?: any;
    expander?: any;
    icons?: any;
    rowClass?: string | Function;
    sort?: Function;
}
