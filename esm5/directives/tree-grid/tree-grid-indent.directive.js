/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, HostBinding, Input } from '@angular/core';
import { TreeGridRowDirective } from './tree-grid-row.directive';
var TreeGridIndentDirective = /** @class */ (function () {
    function TreeGridIndentDirective(_row) {
        this._row = _row;
    }
    Object.defineProperty(TreeGridIndentDirective.prototype, "indentation", {
        /** The padding value applied to each level */
        get: /**
         * The padding value applied to each level
         * @return {?}
         */
        function () {
            return this._row && this._row.item ? 7 + (this._row.item.state.level * (this.uxTreeGridIndent || 25)) : 7;
        },
        enumerable: true,
        configurable: true
    });
    TreeGridIndentDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxTreeGridIndent]',
                },] }
    ];
    /** @nocollapse */
    TreeGridIndentDirective.ctorParameters = function () { return [
        { type: TreeGridRowDirective }
    ]; };
    TreeGridIndentDirective.propDecorators = {
        uxTreeGridIndent: [{ type: Input }],
        indentation: [{ type: HostBinding, args: ['style.padding-left.px',] }]
    };
    return TreeGridIndentDirective;
}());
export { TreeGridIndentDirective };
function TreeGridIndentDirective_tsickle_Closure_declarations() {
    /**
     * The amount each level should be indented by
     * @type {?}
     */
    TreeGridIndentDirective.prototype.uxTreeGridIndent;
    /** @type {?} */
    TreeGridIndentDirective.prototype._row;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJlZS1ncmlkLWluZGVudC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy90cmVlLWdyaWQvdHJlZS1ncmlkLWluZGVudC5kaXJlY3RpdmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM5RCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQzs7SUFnQjdELGlDQUFvQixJQUEwQjtRQUExQixTQUFJLEdBQUosSUFBSSxDQUFzQjtLQUFJO0lBTGxELHNCQUNJLGdEQUFXO1FBRmYsOENBQThDOzs7OztRQUM5QztZQUVJLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxHQUFHLENBQUMsSUFBSSxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUM3Rzs7O09BQUE7O2dCQVpKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsb0JBQW9CO2lCQUNqQzs7OztnQkFKUSxvQkFBb0I7OzttQ0FReEIsS0FBSzs4QkFHTCxXQUFXLFNBQUMsdUJBQXVCOztrQ0FaeEM7O1NBTWEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBIb3N0QmluZGluZywgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRyZWVHcmlkUm93RGlyZWN0aXZlIH0gZnJvbSAnLi90cmVlLWdyaWQtcm93LmRpcmVjdGl2ZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4VHJlZUdyaWRJbmRlbnRdJyxcbn0pXG5leHBvcnQgY2xhc3MgVHJlZUdyaWRJbmRlbnREaXJlY3RpdmUge1xuXG4gICAgLyoqIFRoZSBhbW91bnQgZWFjaCBsZXZlbCBzaG91bGQgYmUgaW5kZW50ZWQgYnkgKi9cbiAgICBASW5wdXQoKSB1eFRyZWVHcmlkSW5kZW50OiBudW1iZXI7XG5cbiAgICAvKiogVGhlIHBhZGRpbmcgdmFsdWUgYXBwbGllZCB0byBlYWNoIGxldmVsICovXG4gICAgQEhvc3RCaW5kaW5nKCdzdHlsZS5wYWRkaW5nLWxlZnQucHgnKVxuICAgIGdldCBpbmRlbnRhdGlvbigpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fcm93ICYmIHRoaXMuX3Jvdy5pdGVtID8gNyArICh0aGlzLl9yb3cuaXRlbS5zdGF0ZS5sZXZlbCAqICh0aGlzLnV4VHJlZUdyaWRJbmRlbnQgfHwgMjUpKSA6IDc7XG4gICAgfVxuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfcm93OiBUcmVlR3JpZFJvd0RpcmVjdGl2ZSkge31cbn0iXX0=