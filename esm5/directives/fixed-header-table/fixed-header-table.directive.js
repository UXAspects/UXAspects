/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
var FixedHeaderTableDirective = (function () {
    function FixedHeaderTableDirective(_elementRef, _renderer) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.tablePaging = new EventEmitter();
    }
    /**
     * @return {?}
     */
    FixedHeaderTableDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * Get the table element
     * Primarily used by column width directive
     */
    /**
     * Get the table element
     * Primarily used by column width directive
     * @return {?}
     */
    FixedHeaderTableDirective.prototype.getTable = /**
     * Get the table element
     * Primarily used by column width directive
     * @return {?}
     */
    function () {
        return this._elementRef.nativeElement;
    };
    /**
     * Handle scroll events
     * @return {?}
     */
    FixedHeaderTableDirective.prototype.onScroll = /**
     * Handle scroll events
     * @return {?}
     */
    function () {
        // determine if we are scrolled to the bottom and if so load the next page
        if (this._tableBody.scrollTop === (this._tableBody.scrollHeight - this._tableBody.offsetHeight)) {
            this.tablePaging.emit();
        }
    };
    /**
     * Update the size of the table header to account for the scrollbar.
     * This is important to keep the columns aligned
     * @return {?}
     */
    FixedHeaderTableDirective.prototype.setLayout = /**
     * Update the size of the table header to account for the scrollbar.
     * This is important to keep the columns aligned
     * @return {?}
     */
    function () {
        // calculate the size of the scrollbar
        var /** @type {?} */ scrollbar = this._tableBody.offsetWidth - this._tableBody.clientWidth;
        // add padding to the header to account for this
        this._renderer.setStyle(this._tableHead, 'padding-right', scrollbar + 'px');
        // set the desired height of the table body
        this._renderer.setStyle(this._tableBody, 'height', typeof this.tableHeight === 'number' ? this.tableHeight + "px" : this.tableHeight);
    };
    FixedHeaderTableDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxFixedHeaderTable]'
                },] },
    ];
    /** @nocollapse */
    FixedHeaderTableDirective.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: Renderer2, },
    ]; };
    FixedHeaderTableDirective.propDecorators = {
        "tableHeight": [{ type: Input },],
        "tablePaging": [{ type: Output },],
    };
    return FixedHeaderTableDirective;
}());
export { FixedHeaderTableDirective };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml4ZWQtaGVhZGVyLXRhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2ZpeGVkLWhlYWRlci10YWJsZS9maXhlZC1oZWFkZXItdGFibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBYXBHLG1DQUFvQixXQUF1QixFQUFVLFNBQW9CO1FBQXJELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVzsyQkFMM0IsSUFBSSxZQUFZLEVBQVU7S0FLTTs7OztJQUU5RSw0Q0FBUTs7O0lBQVI7O1FBR0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsdUJBQXVCLENBQUMsQ0FBQzs7UUFHakYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7O1FBR3hFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1FBRzNFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7UUFHakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN6QjtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsNENBQVE7Ozs7O0lBQVI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7S0FDdkM7Ozs7O0lBS08sNENBQVE7Ozs7OztRQUdkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6Qjs7Ozs7OztJQU9LLDZDQUFTOzs7Ozs7O1FBR2YscUJBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDOztRQUc1RSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUM7O1FBRzVFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLE9BQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxRQUFRLEdBQU0sSUFBSSxDQUFDLFdBQVcsT0FBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQzs7O2dCQWhFekksU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7aUJBQ2pDOzs7O2dCQUptQixVQUFVO2dCQUF1QyxTQUFTOzs7Z0NBTzNFLEtBQUs7Z0NBQ0wsTUFBTTs7b0NBUlQ7O1NBS2EseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIElucHV0LCBPbkluaXQsIE91dHB1dCwgUmVuZGVyZXIyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1t1eEZpeGVkSGVhZGVyVGFibGVdJ1xufSlcbmV4cG9ydCBjbGFzcyBGaXhlZEhlYWRlclRhYmxlRGlyZWN0aXZlIGltcGxlbWVudHMgT25Jbml0IHtcblxuICBASW5wdXQoKSB0YWJsZUhlaWdodDogbnVtYmVyIHwgc3RyaW5nO1xuICBAT3V0cHV0KCkgdGFibGVQYWdpbmc6IEV2ZW50RW1pdHRlcjxudW1iZXI+ID0gbmV3IEV2ZW50RW1pdHRlcjxudW1iZXI+KCk7XG5cbiAgcHJpdmF0ZSBfdGFibGVIZWFkOiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSBfdGFibGVCb2R5OiBIVE1MRWxlbWVudDtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7IH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcblxuICAgIC8vIGFkZCBjbGFzcyB0byB0aGUgdGFibGVcbiAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyh0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICd1eC1maXhlZC1oZWFkZXItdGFibGUnKTtcblxuICAgIC8vIGxvY2F0ZSB0aGUgaW1wb3J0YW50IGVsZW1lbnRzXG4gICAgdGhpcy5fdGFibGVIZWFkID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3RoZWFkJyk7XG4gICAgdGhpcy5fdGFibGVCb2R5ID0gdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LnF1ZXJ5U2VsZWN0b3IoJ3Rib2R5Jyk7XG5cbiAgICAvLyBiaW5kIHRvIHNjcm9sbCBldmVudHMgb24gdGhlIHRhYmxlIGJvZHlcbiAgICB0aGlzLl9yZW5kZXJlci5saXN0ZW4odGhpcy5fdGFibGVCb2R5LCAnc2Nyb2xsJywgdGhpcy5vblNjcm9sbC5iaW5kKHRoaXMpKTtcblxuICAgIC8vIHJlc2l6ZSB0aGUgdGFibGUgaGVhZGVyIHRvIGFjY291bnQgZm9yIHNjcm9sbGJhclxuICAgIHRoaXMuc2V0TGF5b3V0KCk7XG5cbiAgICAvLyB0cmlnZ2VyIHRoZSBsb2FkaW5nIG9mIHRoZSBmaXJzdCBwYWdlXG4gICAgdGhpcy50YWJsZVBhZ2luZy5lbWl0KCk7XG4gIH1cblxuICAvKipcbiAgICogR2V0IHRoZSB0YWJsZSBlbGVtZW50XG4gICAqIFByaW1hcmlseSB1c2VkIGJ5IGNvbHVtbiB3aWR0aCBkaXJlY3RpdmVcbiAgICovXG4gIGdldFRhYmxlKCk6IEhUTUxUYWJsZUVsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQ7XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIHNjcm9sbCBldmVudHNcbiAgICovXG4gIHByaXZhdGUgb25TY3JvbGwoKTogdm9pZCB7XG5cbiAgICAvLyBkZXRlcm1pbmUgaWYgd2UgYXJlIHNjcm9sbGVkIHRvIHRoZSBib3R0b20gYW5kIGlmIHNvIGxvYWQgdGhlIG5leHQgcGFnZVxuICAgIGlmICh0aGlzLl90YWJsZUJvZHkuc2Nyb2xsVG9wID09PSAodGhpcy5fdGFibGVCb2R5LnNjcm9sbEhlaWdodCAtIHRoaXMuX3RhYmxlQm9keS5vZmZzZXRIZWlnaHQpKSB7XG4gICAgICB0aGlzLnRhYmxlUGFnaW5nLmVtaXQoKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlIHRoZSBzaXplIG9mIHRoZSB0YWJsZSBoZWFkZXIgdG8gYWNjb3VudCBmb3IgdGhlIHNjcm9sbGJhci5cbiAgICogVGhpcyBpcyBpbXBvcnRhbnQgdG8ga2VlcCB0aGUgY29sdW1ucyBhbGlnbmVkXG4gICAqL1xuICBwcml2YXRlIHNldExheW91dCgpOiB2b2lkIHtcblxuICAgIC8vIGNhbGN1bGF0ZSB0aGUgc2l6ZSBvZiB0aGUgc2Nyb2xsYmFyXG4gICAgY29uc3Qgc2Nyb2xsYmFyID0gdGhpcy5fdGFibGVCb2R5Lm9mZnNldFdpZHRoIC0gdGhpcy5fdGFibGVCb2R5LmNsaWVudFdpZHRoO1xuXG4gICAgLy8gYWRkIHBhZGRpbmcgdG8gdGhlIGhlYWRlciB0byBhY2NvdW50IGZvciB0aGlzXG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fdGFibGVIZWFkLCAncGFkZGluZy1yaWdodCcsIHNjcm9sbGJhciArICdweCcpO1xuXG4gICAgLy8gc2V0IHRoZSBkZXNpcmVkIGhlaWdodCBvZiB0aGUgdGFibGUgYm9keVxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuX3RhYmxlQm9keSwgJ2hlaWdodCcsIHR5cGVvZiB0aGlzLnRhYmxlSGVpZ2h0ID09PSAnbnVtYmVyJyA/IGAke3RoaXMudGFibGVIZWlnaHR9cHhgIDogdGhpcy50YWJsZUhlaWdodCk7XG4gIH1cblxufVxuIl19