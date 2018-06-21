/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
export class FixedHeaderTableDirective {
    /**
     * @param {?} _elementRef
     * @param {?} _renderer
     */
    constructor(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.tablePaging = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // add class to the table
        this._renderer.addClass(this._elementRef.nativeElement, 'ux-fixed-header-table');
        // locate the important elements
        this._tableHead = this._elementRef.nativeElement.querySelector('thead');
        this._tableBody = this._elementRef.nativeElement.querySelector('tbody');
        // bind to scroll events on the table body
        this._renderer.listen(this._tableBody, 'scroll', this.onScroll.bind(this));
        // resize the table header to account for scrollbar
        this.setLayout();
        // trigger the loading of the first page
        this.tablePaging.emit();
    }
    /**
     * Get the table element
     * Primarily used by column width directive
     * @return {?}
     */
    getTable() {
        return this._elementRef.nativeElement;
    }
    /**
     * Handle scroll events
     * @return {?}
     */
    onScroll() {
        // determine if we are scrolled to the bottom and if so load the next page
        if (this._tableBody.scrollTop === (this._tableBody.scrollHeight - this._tableBody.offsetHeight)) {
            this.tablePaging.emit();
        }
    }
    /**
     * Update the size of the table header to account for the scrollbar.
     * This is important to keep the columns aligned
     * @return {?}
     */
    setLayout() {
        // calculate the size of the scrollbar
        const /** @type {?} */ scrollbar = this._tableBody.offsetWidth - this._tableBody.clientWidth;
        // add padding to the header to account for this
        this._renderer.setStyle(this._tableHead, 'padding-right', scrollbar + 'px');
        // set the desired height of the table body
        this._renderer.setStyle(this._tableBody, 'height', typeof this.tableHeight === 'number' ? `${this.tableHeight}px` : this.tableHeight);
    }
}
FixedHeaderTableDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxFixedHeaderTable]'
            },] },
];
/** @nocollapse */
FixedHeaderTableDirective.ctorParameters = () => [
    { type: ElementRef, },
    { type: Renderer2, },
];
FixedHeaderTableDirective.propDecorators = {
    "tableHeight": [{ type: Input },],
    "tablePaging": [{ type: Output },],
};
function FixedHeaderTableDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FixedHeaderTableDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FixedHeaderTableDirective.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FixedHeaderTableDirective.propDecorators;
    /** @type {?} */
    FixedHeaderTableDirective.prototype.tableHeight;
    /** @type {?} */
    FixedHeaderTableDirective.prototype.tablePaging;
    /** @type {?} */
    FixedHeaderTableDirective.prototype._tableHead;
    /** @type {?} */
    FixedHeaderTableDirective.prototype._tableBody;
    /** @type {?} */
    FixedHeaderTableDirective.prototype._elementRef;
    /** @type {?} */
    FixedHeaderTableDirective.prototype._renderer;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml4ZWQtaGVhZGVyLXRhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2ZpeGVkLWhlYWRlci10YWJsZS9maXhlZC1oZWFkZXItdGFibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFLdEcsTUFBTTs7Ozs7SUFRSixZQUFvQixXQUF1QixFQUFVLFNBQW9CO1FBQXJELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVzsyQkFMM0IsSUFBSSxZQUFZLEVBQVU7S0FLTTs7OztJQUU5RSxRQUFROztRQUdOLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxFQUFFLHVCQUF1QixDQUFDLENBQUM7O1FBR2pGLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ3hFLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDOztRQUd4RSxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOztRQUczRSxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7O1FBR2pCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDekI7Ozs7OztJQU1ELFFBQVE7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7S0FDdkM7Ozs7O0lBS08sUUFBUTs7UUFHZCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ2hHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDekI7Ozs7Ozs7SUFPSyxTQUFTOztRQUdmLHVCQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQzs7UUFHNUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRSxlQUFlLEVBQUUsU0FBUyxHQUFHLElBQUksQ0FBQyxDQUFDOztRQUc1RSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLFFBQVEsRUFBRSxPQUFPLElBQUksQ0FBQyxXQUFXLEtBQUssUUFBUSxHQUFHLEdBQUcsSUFBSSxDQUFDLFdBQVcsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7OztZQWhFekksU0FBUyxTQUFDO2dCQUNULFFBQVEsRUFBRSxzQkFBc0I7YUFDakM7Ozs7WUFKbUIsVUFBVTtZQUF1QyxTQUFTOzs7NEJBTzNFLEtBQUs7NEJBQ0wsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25Jbml0LCBPdXRwdXQsIFJlbmRlcmVyMiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbdXhGaXhlZEhlYWRlclRhYmxlXSdcbn0pXG5leHBvcnQgY2xhc3MgRml4ZWRIZWFkZXJUYWJsZURpcmVjdGl2ZSBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgQElucHV0KCkgdGFibGVIZWlnaHQ6IG51bWJlciB8IHN0cmluZztcbiAgQE91dHB1dCgpIHRhYmxlUGFnaW5nOiBFdmVudEVtaXR0ZXI8bnVtYmVyPiA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xuXG4gIHByaXZhdGUgX3RhYmxlSGVhZDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgX3RhYmxlQm9keTogSFRNTEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG5cbiAgICAvLyBhZGQgY2xhc3MgdG8gdGhlIHRhYmxlXG4gICAgdGhpcy5fcmVuZGVyZXIuYWRkQ2xhc3ModGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAndXgtZml4ZWQtaGVhZGVyLXRhYmxlJyk7XG5cbiAgICAvLyBsb2NhdGUgdGhlIGltcG9ydGFudCBlbGVtZW50c1xuICAgIHRoaXMuX3RhYmxlSGVhZCA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCd0aGVhZCcpO1xuICAgIHRoaXMuX3RhYmxlQm9keSA9IHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCd0Ym9keScpO1xuXG4gICAgLy8gYmluZCB0byBzY3JvbGwgZXZlbnRzIG9uIHRoZSB0YWJsZSBib2R5XG4gICAgdGhpcy5fcmVuZGVyZXIubGlzdGVuKHRoaXMuX3RhYmxlQm9keSwgJ3Njcm9sbCcsIHRoaXMub25TY3JvbGwuYmluZCh0aGlzKSk7XG5cbiAgICAvLyByZXNpemUgdGhlIHRhYmxlIGhlYWRlciB0byBhY2NvdW50IGZvciBzY3JvbGxiYXJcbiAgICB0aGlzLnNldExheW91dCgpO1xuXG4gICAgLy8gdHJpZ2dlciB0aGUgbG9hZGluZyBvZiB0aGUgZmlyc3QgcGFnZVxuICAgIHRoaXMudGFibGVQYWdpbmcuZW1pdCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCB0aGUgdGFibGUgZWxlbWVudFxuICAgKiBQcmltYXJpbHkgdXNlZCBieSBjb2x1bW4gd2lkdGggZGlyZWN0aXZlXG4gICAqL1xuICBnZXRUYWJsZSgpOiBIVE1MVGFibGVFbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50O1xuICB9XG5cbiAgLyoqXG4gICAqIEhhbmRsZSBzY3JvbGwgZXZlbnRzXG4gICAqL1xuICBwcml2YXRlIG9uU2Nyb2xsKCk6IHZvaWQge1xuXG4gICAgLy8gZGV0ZXJtaW5lIGlmIHdlIGFyZSBzY3JvbGxlZCB0byB0aGUgYm90dG9tIGFuZCBpZiBzbyBsb2FkIHRoZSBuZXh0IHBhZ2VcbiAgICBpZiAodGhpcy5fdGFibGVCb2R5LnNjcm9sbFRvcCA9PT0gKHRoaXMuX3RhYmxlQm9keS5zY3JvbGxIZWlnaHQgLSB0aGlzLl90YWJsZUJvZHkub2Zmc2V0SGVpZ2h0KSkge1xuICAgICAgdGhpcy50YWJsZVBhZ2luZy5lbWl0KCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFVwZGF0ZSB0aGUgc2l6ZSBvZiB0aGUgdGFibGUgaGVhZGVyIHRvIGFjY291bnQgZm9yIHRoZSBzY3JvbGxiYXIuXG4gICAqIFRoaXMgaXMgaW1wb3J0YW50IHRvIGtlZXAgdGhlIGNvbHVtbnMgYWxpZ25lZFxuICAgKi9cbiAgcHJpdmF0ZSBzZXRMYXlvdXQoKTogdm9pZCB7XG5cbiAgICAvLyBjYWxjdWxhdGUgdGhlIHNpemUgb2YgdGhlIHNjcm9sbGJhclxuICAgIGNvbnN0IHNjcm9sbGJhciA9IHRoaXMuX3RhYmxlQm9keS5vZmZzZXRXaWR0aCAtIHRoaXMuX3RhYmxlQm9keS5jbGllbnRXaWR0aDtcblxuICAgIC8vIGFkZCBwYWRkaW5nIHRvIHRoZSBoZWFkZXIgdG8gYWNjb3VudCBmb3IgdGhpc1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX3RhYmxlSGVhZCwgJ3BhZGRpbmctcmlnaHQnLCBzY3JvbGxiYXIgKyAncHgnKTtcblxuICAgIC8vIHNldCB0aGUgZGVzaXJlZCBoZWlnaHQgb2YgdGhlIHRhYmxlIGJvZHlcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl90YWJsZUJvZHksICdoZWlnaHQnLCB0eXBlb2YgdGhpcy50YWJsZUhlaWdodCA9PT0gJ251bWJlcicgPyBgJHt0aGlzLnRhYmxlSGVpZ2h0fXB4YCA6IHRoaXMudGFibGVIZWlnaHQpO1xuICB9XG5cbn1cbiJdfQ==