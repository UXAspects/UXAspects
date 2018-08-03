/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
var FixedHeaderTableDirective = /** @class */ (function () {
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
                },] }
    ];
    /** @nocollapse */
    FixedHeaderTableDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    FixedHeaderTableDirective.propDecorators = {
        tableHeight: [{ type: Input }],
        tablePaging: [{ type: Output }]
    };
    return FixedHeaderTableDirective;
}());
export { FixedHeaderTableDirective };
function FixedHeaderTableDirective_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZml4ZWQtaGVhZGVyLXRhYmxlLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2ZpeGVkLWhlYWRlci10YWJsZS9maXhlZC1oZWFkZXItdGFibGUuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFVLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7O0lBYXBHLG1DQUFvQixXQUF1QixFQUFVLFNBQW9CO1FBQXJELGdCQUFXLEdBQVgsV0FBVyxDQUFZO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVzsyQkFMM0IsSUFBSSxZQUFZLEVBQVU7S0FLTTs7OztJQUU5RSw0Q0FBUTs7O0lBQVI7O1FBR0UsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLEVBQUUsdUJBQXVCLENBQUMsQ0FBQzs7UUFHakYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDeEUsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7O1FBR3hFLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7O1FBRzNFLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQzs7UUFHakIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUN6QjtJQUVEOzs7T0FHRzs7Ozs7O0lBQ0gsNENBQVE7Ozs7O0lBQVI7UUFDRSxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUM7S0FDdkM7Ozs7O0lBS08sNENBQVE7Ozs7OztRQUdkLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDaEcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUN6Qjs7Ozs7OztJQU9LLDZDQUFTOzs7Ozs7O1FBR2YscUJBQU0sU0FBUyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDOztRQUc1RSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFLGVBQWUsRUFBRSxTQUFTLEdBQUcsSUFBSSxDQUFDLENBQUM7O1FBRzVFLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLEVBQUUsUUFBUSxFQUFFLE9BQU8sSUFBSSxDQUFDLFdBQVcsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFJLElBQUksQ0FBQyxXQUFXLE9BQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDOzs7Z0JBaEV6SSxTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtpQkFDakM7Ozs7Z0JBSm1CLFVBQVU7Z0JBQXVDLFNBQVM7Ozs4QkFPM0UsS0FBSzs4QkFDTCxNQUFNOztvQ0FSVDs7U0FLYSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBSZW5kZXJlcjIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW3V4Rml4ZWRIZWFkZXJUYWJsZV0nXG59KVxuZXhwb3J0IGNsYXNzIEZpeGVkSGVhZGVyVGFibGVEaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQge1xuXG4gIEBJbnB1dCgpIHRhYmxlSGVpZ2h0OiBudW1iZXIgfCBzdHJpbmc7XG4gIEBPdXRwdXQoKSB0YWJsZVBhZ2luZzogRXZlbnRFbWl0dGVyPG51bWJlcj4gPSBuZXcgRXZlbnRFbWl0dGVyPG51bWJlcj4oKTtcblxuICBwcml2YXRlIF90YWJsZUhlYWQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF90YWJsZUJvZHk6IEhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuXG4gICAgLy8gYWRkIGNsYXNzIHRvIHRoZSB0YWJsZVxuICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudCwgJ3V4LWZpeGVkLWhlYWRlci10YWJsZScpO1xuXG4gICAgLy8gbG9jYXRlIHRoZSBpbXBvcnRhbnQgZWxlbWVudHNcbiAgICB0aGlzLl90YWJsZUhlYWQgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcigndGhlYWQnKTtcbiAgICB0aGlzLl90YWJsZUJvZHkgPSB0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQucXVlcnlTZWxlY3RvcigndGJvZHknKTtcblxuICAgIC8vIGJpbmQgdG8gc2Nyb2xsIGV2ZW50cyBvbiB0aGUgdGFibGUgYm9keVxuICAgIHRoaXMuX3JlbmRlcmVyLmxpc3Rlbih0aGlzLl90YWJsZUJvZHksICdzY3JvbGwnLCB0aGlzLm9uU2Nyb2xsLmJpbmQodGhpcykpO1xuXG4gICAgLy8gcmVzaXplIHRoZSB0YWJsZSBoZWFkZXIgdG8gYWNjb3VudCBmb3Igc2Nyb2xsYmFyXG4gICAgdGhpcy5zZXRMYXlvdXQoKTtcblxuICAgIC8vIHRyaWdnZXIgdGhlIGxvYWRpbmcgb2YgdGhlIGZpcnN0IHBhZ2VcbiAgICB0aGlzLnRhYmxlUGFnaW5nLmVtaXQoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgdGhlIHRhYmxlIGVsZW1lbnRcbiAgICogUHJpbWFyaWx5IHVzZWQgYnkgY29sdW1uIHdpZHRoIGRpcmVjdGl2ZVxuICAgKi9cbiAgZ2V0VGFibGUoKTogSFRNTFRhYmxlRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudDtcbiAgfVxuXG4gIC8qKlxuICAgKiBIYW5kbGUgc2Nyb2xsIGV2ZW50c1xuICAgKi9cbiAgcHJpdmF0ZSBvblNjcm9sbCgpOiB2b2lkIHtcblxuICAgIC8vIGRldGVybWluZSBpZiB3ZSBhcmUgc2Nyb2xsZWQgdG8gdGhlIGJvdHRvbSBhbmQgaWYgc28gbG9hZCB0aGUgbmV4dCBwYWdlXG4gICAgaWYgKHRoaXMuX3RhYmxlQm9keS5zY3JvbGxUb3AgPT09ICh0aGlzLl90YWJsZUJvZHkuc2Nyb2xsSGVpZ2h0IC0gdGhpcy5fdGFibGVCb2R5Lm9mZnNldEhlaWdodCkpIHtcbiAgICAgIHRoaXMudGFibGVQYWdpbmcuZW1pdCgpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBVcGRhdGUgdGhlIHNpemUgb2YgdGhlIHRhYmxlIGhlYWRlciB0byBhY2NvdW50IGZvciB0aGUgc2Nyb2xsYmFyLlxuICAgKiBUaGlzIGlzIGltcG9ydGFudCB0byBrZWVwIHRoZSBjb2x1bW5zIGFsaWduZWRcbiAgICovXG4gIHByaXZhdGUgc2V0TGF5b3V0KCk6IHZvaWQge1xuXG4gICAgLy8gY2FsY3VsYXRlIHRoZSBzaXplIG9mIHRoZSBzY3JvbGxiYXJcbiAgICBjb25zdCBzY3JvbGxiYXIgPSB0aGlzLl90YWJsZUJvZHkub2Zmc2V0V2lkdGggLSB0aGlzLl90YWJsZUJvZHkuY2xpZW50V2lkdGg7XG5cbiAgICAvLyBhZGQgcGFkZGluZyB0byB0aGUgaGVhZGVyIHRvIGFjY291bnQgZm9yIHRoaXNcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLl90YWJsZUhlYWQsICdwYWRkaW5nLXJpZ2h0Jywgc2Nyb2xsYmFyICsgJ3B4Jyk7XG5cbiAgICAvLyBzZXQgdGhlIGRlc2lyZWQgaGVpZ2h0IG9mIHRoZSB0YWJsZSBib2R5XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5fdGFibGVCb2R5LCAnaGVpZ2h0JywgdHlwZW9mIHRoaXMudGFibGVIZWlnaHQgPT09ICdudW1iZXInID8gYCR7dGhpcy50YWJsZUhlaWdodH1weGAgOiB0aGlzLnRhYmxlSGVpZ2h0KTtcbiAgfVxuXG59XG4iXX0=