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
            },] }
];
/** @nocollapse */
FloatLabelDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
FloatLabelDirective.propDecorators = {
    input: [{ type: Input, args: ['uxFloatLabel',] }],
    value: [{ type: Input }],
    mode: [{ type: Input }],
    raised: [{ type: HostBinding, args: ['class.ux-float-label-raised',] }]
};
function FloatLabelDirective_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXQtbGFiZWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZmxvYXQtbGFiZWwvZmxvYXQtbGFiZWwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFnQyxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFRbkgsTUFBTTs7Ozs7SUFrQkYsWUFBb0IsV0FBdUIsRUFBVSxTQUFvQjtRQUFyRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7b0JBVC9DLE9BQU87c0JBR2YsS0FBSzt3QkFHSixLQUFLOzZCQUNPLEVBQUU7S0FFNkM7Ozs7SUFFOUUsUUFBUTtRQUNKLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUNuQixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUN0RSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUNwRSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUMxRSxDQUFDOztRQUdGLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDOztRQUc3QixFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkYsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7U0FDckc7S0FDSjs7OztJQUVELFdBQVc7UUFDUCxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQztTQUNoQztLQUNKOzs7O0lBRUQsV0FBVzs7UUFFUCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztLQUM5RDs7OztJQUVPLE9BQU87UUFDWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztTQUM3QjtRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzs7Ozs7SUFHaEIsVUFBVTtRQUNkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQztZQUNyQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQztTQUN0Qjs7Ozs7SUFHRyxTQUFTO1FBQ2IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1lBQ3RCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDO1NBQ2hDOzs7OztJQUdHLFdBQVc7UUFDZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEM7Ozs7WUE3RVIsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxnQkFBZ0I7Z0JBQzFCLElBQUksRUFBRTtvQkFDRixPQUFPLEVBQUUsZ0JBQWdCO2lCQUM1QjthQUNKOzs7O1lBUG1CLFVBQVU7WUFBb0QsU0FBUzs7O29CQVV0RixLQUFLLFNBQUMsY0FBYztvQkFHcEIsS0FBSzttQkFHTCxLQUFLO3FCQUdMLFdBQVcsU0FBQyw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4RmxvYXRMYWJlbF0nLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ3V4LWZsb2F0LWxhYmVsJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgRmxvYXRMYWJlbERpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCd1eEZsb2F0TGFiZWwnKVxuICAgIGlucHV0OiBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgQElucHV0KClcbiAgICB2YWx1ZTogYW55O1xuXG4gICAgQElucHV0KClcbiAgICBtb2RlOiAnZm9jdXMnIHwgJ2lucHV0JyA9ICdmb2N1cyc7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2NsYXNzLnV4LWZsb2F0LWxhYmVsLXJhaXNlZCcpXG4gICAgcmFpc2VkOiBib29sZWFuID0gZmFsc2U7XG5cblxuICAgIHByaXZhdGUgX2ZvY3VzZWQgPSBmYWxzZTtcbiAgICBwcml2YXRlIF9ldmVudEhhbmRsZXM6IGFueVtdID0gW107XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7IH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9ldmVudEhhbmRsZXMucHVzaChcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmxpc3Rlbih0aGlzLmlucHV0LCAnZm9jdXMnLCB0aGlzLmlucHV0Rm9jdXMuYmluZCh0aGlzKSksXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5saXN0ZW4odGhpcy5pbnB1dCwgJ2JsdXInLCB0aGlzLmlucHV0Qmx1ci5iaW5kKHRoaXMpKSxcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLmxpc3Rlbih0aGlzLmlucHV0LCAnaW5wdXQnLCB0aGlzLmlucHV0Q2hhbmdlLmJpbmQodGhpcykpXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gQ2hlY2sgaW5pdGlhbCBpbnB1dCB2YWx1ZVxuICAgICAgICB0aGlzLnJhaXNlZCA9IHRoaXMuaGFzVGV4dCgpO1xuXG4gICAgICAgIC8vIEVuc3VyZSB0aGF0IHRoZSBgZm9yYCBhdHRyaWJ1dGUgaXMgc2V0XG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmdldEF0dHJpYnV0ZSgnZm9yJykgJiYgdGhpcy5pbnB1dC5nZXRBdHRyaWJ1dGUoJ2lkJykpIHtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldEF0dHJpYnV0ZSh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICdmb3InLCB0aGlzLmlucHV0LmdldEF0dHJpYnV0ZSgnaWQnKSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uQ2hhbmdlcygpOiB2b2lkIHtcbiAgICAgICAgaWYgKCEodGhpcy5tb2RlID09PSAnZm9jdXMnICYmIHRoaXMuX2ZvY3VzZWQpKSB7XG4gICAgICAgICAgICB0aGlzLnJhaXNlZCA9IHRoaXMuaGFzVGV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIC8vIFVuc3Vic2NyaWJlIGV2ZW50IGhhbmRsZXNcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVzLmZvckVhY2goKGV2ZW50SGFuZGxlKSA9PiBldmVudEhhbmRsZSgpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGhhc1RleHQoKTogYm9vbGVhbiB7XG4gICAgICAgIGlmICh0aGlzLnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgIHJldHVybiAhIXRoaXMuaW5wdXQudmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICEhdGhpcy52YWx1ZTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGlucHV0Rm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdmb2N1cycpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5yYWlzZWQgPSB0cnVlO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbnB1dEJsdXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLm1vZGUgPT09ICdmb2N1cycpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMucmFpc2VkID0gdGhpcy5oYXNUZXh0KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGlucHV0Q2hhbmdlKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnaW5wdXQnKSB7XG4gICAgICAgICAgICB0aGlzLnJhaXNlZCA9IHRoaXMuaGFzVGV4dCgpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==