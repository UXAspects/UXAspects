import { coerceNumberProperty, NumberInput } from '@angular/cdk/coercion';
import { Directive, HostBinding, Input } from '@angular/core';
import { TreeGridRowDirective } from './tree-grid-row.directive';

@Directive({
    selector: '[uxTreeGridIndent]',
})
export class TreeGridIndentDirective {

    /** The amount each level should be indented by */
    @Input() 
    set uxTreeGridIndent(value: number | undefined) {
        this._indent = coerceNumberProperty(value, 25);
    }

    get uxTreeGridIndent(): number | undefined {
        return this._indent;
    }

    /** The padding value applied to each level */
    @HostBinding('style.padding-left.px')
    get indentation(): number {
        return this._row && this._row.item ? 7 + (this._row.item.state.level * this._indent) : 7;
    }

    private _indent: number;

    static ngAcceptInputType_uxTreeGridIndent: NumberInput | undefined;

    constructor(private _row: TreeGridRowDirective) {}
}
