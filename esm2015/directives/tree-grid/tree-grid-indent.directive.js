/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, HostBinding, Input } from '@angular/core';
import { TreeGridRowDirective } from './tree-grid-row.directive';
export class TreeGridIndentDirective {
    /**
     * @param {?} _row
     */
    constructor(_row) {
        this._row = _row;
    }
    /**
     * The padding value applied to each level
     * @return {?}
     */
    get indentation() {
        return this._row && this._row.item ? 7 + (this._row.item.state.level * (this.uxTreeGridIndent || 25)) : 7;
    }
}
TreeGridIndentDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxTreeGridIndent]',
            },] }
];
/** @nocollapse */
TreeGridIndentDirective.ctorParameters = () => [
    { type: TreeGridRowDirective }
];
TreeGridIndentDirective.propDecorators = {
    uxTreeGridIndent: [{ type: Input }],
    indentation: [{ type: HostBinding, args: ['style.padding-left.px',] }]
};
function TreeGridIndentDirective_tsickle_Closure_declarations() {
    /**
     * The amount each level should be indented by
     * @type {?}
     */
    TreeGridIndentDirective.prototype.uxTreeGridIndent;
    /** @type {?} */
    TreeGridIndentDirective.prototype._row;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLWluZGVudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy90cmVlLWdyaWQvdHJlZS1ncmlkLWluZGVudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUtqRSxNQUFNOzs7O0lBV0YsWUFBb0IsSUFBMEI7UUFBMUIsU0FBSSxHQUFKLElBQUksQ0FBc0I7S0FBSTs7Ozs7SUFMbEQsSUFDSSxXQUFXO1FBQ1gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzdHOzs7WUFaSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLG9CQUFvQjthQUNqQzs7OztZQUpRLG9CQUFvQjs7OytCQVF4QixLQUFLOzBCQUdMLFdBQVcsU0FBQyx1QkFBdUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEhvc3RCaW5kaW5nLCBJbnB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHJlZUdyaWRSb3dEaXJlY3RpdmUgfSBmcm9tICcuL3RyZWUtZ3JpZC1yb3cuZGlyZWN0aXZlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhUcmVlR3JpZEluZGVudF0nLFxufSlcbmV4cG9ydCBjbGFzcyBUcmVlR3JpZEluZGVudERpcmVjdGl2ZSB7XG5cbiAgICAvKiogVGhlIGFtb3VudCBlYWNoIGxldmVsIHNob3VsZCBiZSBpbmRlbnRlZCBieSAqL1xuICAgIEBJbnB1dCgpIHV4VHJlZUdyaWRJbmRlbnQ6IG51bWJlcjtcblxuICAgIC8qKiBUaGUgcGFkZGluZyB2YWx1ZSBhcHBsaWVkIHRvIGVhY2ggbGV2ZWwgKi9cbiAgICBASG9zdEJpbmRpbmcoJ3N0eWxlLnBhZGRpbmctbGVmdC5weCcpXG4gICAgZ2V0IGluZGVudGF0aW9uKCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9yb3cgJiYgdGhpcy5fcm93Lml0ZW0gPyA3ICsgKHRoaXMuX3Jvdy5pdGVtLnN0YXRlLmxldmVsICogKHRoaXMudXhUcmVlR3JpZEluZGVudCB8fCAyNSkpIDogNztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9yb3c6IFRyZWVHcmlkUm93RGlyZWN0aXZlKSB7fVxufSJdfQ==