import {Directive, HostBinding, Input} from '@angular/core';
import {TreeGridRowDirective} from './tree-grid-row.directive';
import {Directionality} from '@angular/cdk/bidi';

@Directive({
    selector: '[uxTreeGridIndent]',
})
export class TreeGridIndentDirective {

    /** The amount each level should be indented by */
    @Input() uxTreeGridIndent: number;

    constructor(private _row: TreeGridRowDirective,
                private _directionality: Directionality) {
    }

    /** The padding value applied to each level */
    @HostBinding('style.padding-left.px')
    get leftIndentation(): number {
        if (this._directionality.value === 'ltr') {
            return this.getIndentation();
        }
        return 0;
    }

    @HostBinding('style.padding-right.px')
    get rightIndentation(): number {
        if (this._directionality.value === 'rtl') {
            return this.getIndentation();
        }
        return 0;
    }

    private getIndentation() {
        return this._row && this._row.item ? 7 + (this._row.item.state.level * (this.uxTreeGridIndent || 25)) : 7;
    }
}
