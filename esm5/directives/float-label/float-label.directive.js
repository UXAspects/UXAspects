/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, HostBinding, Input, Renderer2 } from '@angular/core';
var FloatLabelDirective = /** @class */ (function () {
    function FloatLabelDirective(_elementRef, _renderer) {
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
    FloatLabelDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._eventHandles.push(this._renderer.listen(this.input, 'focus', this.inputFocus.bind(this)), this._renderer.listen(this.input, 'blur', this.inputBlur.bind(this)), this._renderer.listen(this.input, 'input', this.inputChange.bind(this)));
        // Check initial input value
        this.raised = this.hasText();
        // Ensure that the `for` attribute is set
        if (!this._elementRef.nativeElement.getAttribute('for') && this.input.getAttribute('id')) {
            this._renderer.setAttribute(this._elementRef.nativeElement, 'for', this.input.getAttribute('id'));
        }
    };
    /**
     * @return {?}
     */
    FloatLabelDirective.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        if (!(this.mode === 'focus' && this._focused)) {
            this.raised = this.hasText();
        }
    };
    /**
     * @return {?}
     */
    FloatLabelDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        // Unsubscribe event handles
        this._eventHandles.forEach(function (eventHandle) { return eventHandle(); });
    };
    /**
     * @return {?}
     */
    FloatLabelDirective.prototype.hasText = /**
     * @return {?}
     */
    function () {
        if (this.value === undefined) {
            return !!this.input.value;
        }
        return !!this.value;
    };
    /**
     * @return {?}
     */
    FloatLabelDirective.prototype.inputFocus = /**
     * @return {?}
     */
    function () {
        if (this.mode === 'focus') {
            this._focused = true;
            this.raised = true;
        }
    };
    /**
     * @return {?}
     */
    FloatLabelDirective.prototype.inputBlur = /**
     * @return {?}
     */
    function () {
        if (this.mode === 'focus') {
            this._focused = false;
            this.raised = this.hasText();
        }
    };
    /**
     * @return {?}
     */
    FloatLabelDirective.prototype.inputChange = /**
     * @return {?}
     */
    function () {
        if (this.mode === 'input') {
            this.raised = this.hasText();
        }
    };
    FloatLabelDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxFloatLabel]',
                    host: {
                        'class': 'ux-float-label'
                    }
                },] }
    ];
    /** @nocollapse */
    FloatLabelDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    FloatLabelDirective.propDecorators = {
        input: [{ type: Input, args: ['uxFloatLabel',] }],
        value: [{ type: Input }],
        mode: [{ type: Input }],
        raised: [{ type: HostBinding, args: ['class.ux-float-label-raised',] }]
    };
    return FloatLabelDirective;
}());
export { FloatLabelDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXQtbGFiZWwuZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImRpcmVjdGl2ZXMvZmxvYXQtbGFiZWwvZmxvYXQtbGFiZWwuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFnQyxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBMEIvRyw2QkFBb0IsV0FBdUIsRUFBVSxTQUFvQjtRQUFyRCxnQkFBVyxHQUFYLFdBQVcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7b0JBVC9DLE9BQU87c0JBR2YsS0FBSzt3QkFHSixLQUFLOzZCQUNPLEVBQUU7S0FFNkM7Ozs7SUFFOUUsc0NBQVE7OztJQUFSO1FBQ0ksSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ3RFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQ3BFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQzFFLENBQUM7O1FBR0YsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7O1FBRzdCLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RixJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztTQUNyRztLQUNKOzs7O0lBRUQseUNBQVc7OztJQUFYO1FBQ0ksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLEtBQUssT0FBTyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEM7S0FDSjs7OztJQUVELHlDQUFXOzs7SUFBWDs7UUFFSSxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxVQUFDLFdBQVcsSUFBSyxPQUFBLFdBQVcsRUFBRSxFQUFiLENBQWEsQ0FBQyxDQUFDO0tBQzlEOzs7O0lBRU8scUNBQU87Ozs7UUFDWCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQztTQUM3QjtRQUNELE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQzs7Ozs7SUFHaEIsd0NBQVU7Ozs7UUFDZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUM7WUFDckIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUM7U0FDdEI7Ozs7O0lBR0csdUNBQVM7Ozs7UUFDYixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxLQUFLLENBQUM7WUFDdEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEM7Ozs7O0lBR0cseUNBQVc7Ozs7UUFDZixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDaEM7OztnQkE3RVIsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxnQkFBZ0I7b0JBQzFCLElBQUksRUFBRTt3QkFDRixPQUFPLEVBQUUsZ0JBQWdCO3FCQUM1QjtpQkFDSjs7OztnQkFQbUIsVUFBVTtnQkFBb0QsU0FBUzs7O3dCQVV0RixLQUFLLFNBQUMsY0FBYzt3QkFHcEIsS0FBSzt1QkFHTCxLQUFLO3lCQUdMLFdBQVcsU0FBQyw2QkFBNkI7OzhCQW5COUM7O1NBUWEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIE9uQ2hhbmdlcywgT25EZXN0cm95LCBPbkluaXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgICBzZWxlY3RvcjogJ1t1eEZsb2F0TGFiZWxdJyxcbiAgICBob3N0OiB7XG4gICAgICAgICdjbGFzcyc6ICd1eC1mbG9hdC1sYWJlbCdcbiAgICB9XG59KVxuZXhwb3J0IGNsYXNzIEZsb2F0TGFiZWxEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgndXhGbG9hdExhYmVsJylcbiAgICBpbnB1dDogSFRNTElucHV0RWxlbWVudDtcblxuICAgIEBJbnB1dCgpXG4gICAgdmFsdWU6IGFueTtcblxuICAgIEBJbnB1dCgpXG4gICAgbW9kZTogJ2ZvY3VzJyB8ICdpbnB1dCcgPSAnZm9jdXMnO1xuXG4gICAgQEhvc3RCaW5kaW5nKCdjbGFzcy51eC1mbG9hdC1sYWJlbC1yYWlzZWQnKVxuICAgIHJhaXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuXG5cbiAgICBwcml2YXRlIF9mb2N1c2VkID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfZXZlbnRIYW5kbGVzOiBhbnlbXSA9IFtdO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZXZlbnRIYW5kbGVzLnB1c2goXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5saXN0ZW4odGhpcy5pbnB1dCwgJ2ZvY3VzJywgdGhpcy5pbnB1dEZvY3VzLmJpbmQodGhpcykpLFxuICAgICAgICAgICAgdGhpcy5fcmVuZGVyZXIubGlzdGVuKHRoaXMuaW5wdXQsICdibHVyJywgdGhpcy5pbnB1dEJsdXIuYmluZCh0aGlzKSksXG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5saXN0ZW4odGhpcy5pbnB1dCwgJ2lucHV0JywgdGhpcy5pbnB1dENoYW5nZS5iaW5kKHRoaXMpKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIENoZWNrIGluaXRpYWwgaW5wdXQgdmFsdWVcbiAgICAgICAgdGhpcy5yYWlzZWQgPSB0aGlzLmhhc1RleHQoKTtcblxuICAgICAgICAvLyBFbnN1cmUgdGhhdCB0aGUgYGZvcmAgYXR0cmlidXRlIGlzIHNldFxuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2ZvcicpICYmIHRoaXMuaW5wdXQuZ2V0QXR0cmlidXRlKCdpZCcpKSB7XG4gICAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRBdHRyaWJ1dGUodGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZm9yJywgdGhpcy5pbnB1dC5nZXRBdHRyaWJ1dGUoJ2lkJykpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkNoYW5nZXMoKTogdm9pZCB7XG4gICAgICAgIGlmICghKHRoaXMubW9kZSA9PT0gJ2ZvY3VzJyAmJiB0aGlzLl9mb2N1c2VkKSkge1xuICAgICAgICAgICAgdGhpcy5yYWlzZWQgPSB0aGlzLmhhc1RleHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICAvLyBVbnN1YnNjcmliZSBldmVudCBoYW5kbGVzXG4gICAgICAgIHRoaXMuX2V2ZW50SGFuZGxlcy5mb3JFYWNoKChldmVudEhhbmRsZSkgPT4gZXZlbnRIYW5kbGUoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBoYXNUZXh0KCk6IGJvb2xlYW4ge1xuICAgICAgICBpZiAodGhpcy52YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm4gISF0aGlzLmlucHV0LnZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiAhIXRoaXMudmFsdWU7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbnB1dEZvY3VzKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnZm9jdXMnKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c2VkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMucmFpc2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgaW5wdXRCbHVyKCk6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5tb2RlID09PSAnZm9jdXMnKSB7XG4gICAgICAgICAgICB0aGlzLl9mb2N1c2VkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLnJhaXNlZCA9IHRoaXMuaGFzVGV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBpbnB1dENoYW5nZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKHRoaXMubW9kZSA9PT0gJ2lucHV0Jykge1xuICAgICAgICAgICAgdGhpcy5yYWlzZWQgPSB0aGlzLmhhc1RleHQoKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=