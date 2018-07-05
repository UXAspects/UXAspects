/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
export class FloatLabelDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.mode = 'focus';
        this.raised = false;
        this._focused = false;
        this._eventHandles = [];
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._eventHandles.push(this._renderer.listen(this.input, 'focus', this.inputFocus.bind(this)), this._renderer.listen(this.input, 'blur', this.inputBlur.bind(this)), this._renderer.listen(this.input, 'input', this.inputChange.bind(this)));
        // Check initial input value
        this.raised = this.hasText();
        // Ensure that the `for` attribute is set
        if (!this._elementRef.nativeElement.getAttribute('for') && this.input.getAttribute('id')) {
            this._renderer.setAttribute(this._elementRef.nativeElement, 'for', this.input.getAttribute('id'));
        }
    }
    /**
     * @return {?}
     */
    ngOnChanges() {
        if (!(this.mode === 'focus' && this._focused)) {
            this.raised = this.hasText();
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        // Unsubscribe event handles
        this._eventHandles.forEach((eventHandle) => eventHandle());
    }
    /**
     * @return {?}
     */
    hasText() {
        if (this.value === undefined) {
            return !!this.input.value;
        }
        return !!this.value;
    }
    /**
     * @return {?}
     */
    inputFocus() {
        if (this.mode === 'focus') {
            this._focused = true;
            this.raised = true;
        }
    }
    /**
     * @return {?}
     */
    inputBlur() {
        if (this.mode === 'focus') {
            this._focused = false;
            this.raised = this.hasText();
        }
    }
    /**
     * @return {?}
     */
    inputChange() {
        if (this.mode === 'input') {
            this.raised = this.hasText();
        }
    }
}
FloatLabelDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxFloatLabel]',
                host: {
                    'class': 'ux-float-label'
                }
            },] },
];
/** @nocollapse */
FloatLabelDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
];
FloatLabelDirective.propDecorators = {
    "input": [{ type: Input, args: ['uxFloatLabel',] },],
    "value": [{ type: Input },],
    "mode": [{ type: Input },],
    "raised": [{ type: HostBinding, args: ['class.ux-float-label-raised',] },],
};
function FloatLabelDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FloatLabelDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FloatLabelDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FloatLabelDirective.propDecorators;
    /** @type {?} */
    FloatLabelDirective.prototype.input;
    /** @type {?} */
    FloatLabelDirective.prototype.value;
    /** @type {?} */
    FloatLabelDirective.prototype.mode;
    /** @type {?} */
    FloatLabelDirective.prototype.raised;
    /** @type {?} */
    FloatLabelDirective.prototype._focused;
    /** @type {?} */
    FloatLabelDirective.prototype._eventHandles;
    /** @type {?} */
    FloatLabelDirective.prototype._elementRef;
    /** @type {?} */
    FloatLabelDirective.prototype._renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXQtbGFiZWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZmxvYXQtbGFiZWwvZmxvYXQtbGFiZWwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFnQyxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRbkgsTUFBTTs7Ozs7SUFrQkYsWUFBb0IsV0FBdUIsRUFBVSxTQUFvQjtRQUFyRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7b0JBVC9DLE9BQU87c0JBR2YsS0FBSzt3QkFHSixLQUFLOzZCQUNPLEVBQUU7S0FFNkM7Ozs7SUFFOUUsUUFBUTtRQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUN0RSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNwRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUMxRSxDQUFDOztRQUdGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOztRQUc3QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDckc7S0FDSjs7OztJQUVELFdBQVc7UUFDUCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoQztLQUNKOzs7O0lBRUQsV0FBVzs7UUFFUCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsS0FBSyxXQUFXLEVBQUUsQ0FBQyxDQUFDO0tBQzlEOzs7O0lBRU8sT0FBTztRQUNYLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUMzQixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDO1NBQzdCO1FBQ0QsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDOzs7OztJQUdoQixVQUFVO1FBQ2QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDO1NBQ3RCOzs7OztJQUdHLFNBQVM7UUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEM7Ozs7O0lBR0csV0FBVztRQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoQzs7OztZQTdFUixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsSUFBSSxFQUFFO29CQUNGLE9BQU8sRUFBRSxnQkFBZ0I7aUJBQzVCO2FBQ0o7Ozs7WUFQbUIsVUFBVTtZQUFvRCxTQUFTOzs7c0JBVXRGLEtBQUssU0FBQyxjQUFjO3NCQUdwQixLQUFLO3FCQUdMLEtBQUs7dUJBR0wsV0FBVyxTQUFDLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSwgT25Jbml0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhGbG9hdExhYmVsXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAndXgtZmxvYXQtbGFiZWwnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBGbG9hdExhYmVsRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0LCBPbkNoYW5nZXMsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoJ3V4RmxvYXRMYWJlbCcpXG4gICAgaW5wdXQ6IEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICBASW5wdXQoKVxuICAgIHZhbHVlOiBhbnk7XG5cbiAgICBASW5wdXQoKVxuICAgIG1vZGU6ICdmb2N1cycgfCAnaW5wdXQnID0gJ2ZvY3VzJztcblxuICAgIEBIb3N0QmluZGluZygnY2xhc3MudXgtZmxvYXQtbGFiZWwtcmFpc2VkJylcbiAgICByYWlzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcblxuXG4gICAgcHJpdmF0ZSBfZm9jdXNlZCA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2V2ZW50SGFuZGxlczogYW55W10gPSBbXTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlcy5wdXNoKFxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIubGlzdGVuKHRoaXMuaW5wdXQsICdmb2N1cycsIHRoaXMuaW5wdXRGb2N1cy5iaW5kKHRoaXMpKSxcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmxpc3Rlbih0aGlzLmlucHV0LCAnYmx1cicsIHRoaXMuaW5wdXRCbHVyLmJpbmQodGhpcykpLFxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIubGlzdGVuKHRoaXMuaW5wdXQsICdpbnB1dCcsIHRoaXMuaW5wdXRDaGFuZ2UuYmluZCh0aGlzKSlcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBDaGVjayBpbml0aWFsIGlucHV0IHZhbHVlXG4gICAgICAgIHRoaXMucmFpc2VkID0gdGhpcy5oYXNUZXh0KCk7XG5cbiAgICAgICAgLy8gRW5zdXJlIHRoYXQgdGhlIGBmb3JgIGF0dHJpYnV0ZSBpcyBzZXRcbiAgICAgICAgaWYgKCF0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuZ2V0QXR0cmlidXRlKCdmb3InKSAmJiB0aGlzLmlucHV0LmdldEF0dHJpYnV0ZSgnaWQnKSkge1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0QXR0cmlidXRlKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ2ZvcicsIHRoaXMuaW5wdXQuZ2V0QXR0cmlidXRlKCdpZCcpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25DaGFuZ2VzKCk6IHZvaWQge1xuICAgICAgICBpZiAoISh0aGlzLm1vZGUgPT09ICdmb2N1cycgJiYgdGhpcy5fZm9jdXNlZCkpIHtcbiAgICAgICAgICAgIHRoaXMucmFpc2VkID0gdGhpcy5oYXNUZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgLy8gVW5zdWJzY3JpYmUgZXZlbnQgaGFuZGxlc1xuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXMuZm9yRWFjaCgoZXZlbnRIYW5kbGUpID0+IGV2ZW50SGFuZGxlKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgaGFzVGV4dCgpOiBib29sZWFuIHtcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5pbnB1dC52YWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gISF0aGlzLnZhbHVlO1xuICAgIH1cblxuICAgIHByaXZhdGUgaW5wdXRGb2N1cygpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ2ZvY3VzJykge1xuICAgICAgICAgICAgdGhpcy5fZm9jdXNlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLnJhaXNlZCA9IHRydWU7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGlucHV0Qmx1cigpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ2ZvY3VzJykge1xuICAgICAgICAgICAgdGhpcy5fZm9jdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5yYWlzZWQgPSB0aGlzLmhhc1RleHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5wdXRDaGFuZ2UoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdpbnB1dCcpIHtcbiAgICAgICAgICAgIHRoaXMucmFpc2VkID0gdGhpcy5oYXNUZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG59Il19