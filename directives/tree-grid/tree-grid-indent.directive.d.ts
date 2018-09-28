import { TreeGridRowDirective } from './tree-grid-row.directive';
export declare class TreeGridIndentDirective {
    private _row;
    /** The amount each level should be indented by */
    uxTreeGridIndent: number;
    /** The padding value applied to each level */
    readonly indentation: number;
    constructor(_row: TreeGridRowDirective);
}
