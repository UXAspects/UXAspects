import { Directive, ElementRef, Injector, Input, Output, EventEmitter } from '@angular/core';
import { UpgradeComponent } from '@angular/upgrade/static';

@Directive({
    selector: 'treegrid'
})
export class TreeGridNg1Component extends UpgradeComponent {

    @Input() data: TreeGridData[] | Function;
    @Input() columns: TreeGridColumn[];
    @Input() treeData: TreeGridData[];
    @Input() selected: any[];
    @Input() currentRow: any;
    @Input() options: TreeGridOptions;

    @Output() optionsChange: EventEmitter<TreeGridOptions> = new EventEmitter<TreeGridOptions>();
    @Output() selectedChange: EventEmitter<any[]> = new EventEmitter<any[]>();
    @Output() currentRowChange: EventEmitter<any> = new EventEmitter<any>();
    @Output() treeDataChange: EventEmitter<TreeGridData[]> = new EventEmitter<TreeGridData[]>();    

    constructor(elementRef: ElementRef, injector: Injector) {
        super('treegrid', elementRef, injector);
    }
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