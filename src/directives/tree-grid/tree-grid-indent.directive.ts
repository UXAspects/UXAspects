import { Directive, HostBinding, Input } from '@angular/core';
import { TreeGridRowDirective } from './tree-grid-row.directive';

@Directive({
    selector: '[uxTreeGridIndent]',
})
export class TreeGridIndentDirective {

    /** The amount each level should be indented by */
    @Input() uxTreeGridIndent: number;

    /** The padding value applied to each level */
    @HostBinding('style.padding-left.px')
    get indentation(): number {
        return this._row && this._row.item ? 7 + (this._row.item.state.level * (this.uxTreeGridIndent || 25)) : 7;
    }

    constructor(private _row: TreeGridRowDirective) {}
}