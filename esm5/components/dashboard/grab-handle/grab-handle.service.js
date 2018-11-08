/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DashboardService } from '../dashboard.service';
var DashboardGrabHandleService = /** @class */ (function () {
    function DashboardGrabHandleService(_dashboard) {
        this._dashboard = _dashboard;
        /**
         * Automatically unsubscribe from all observables when destroyed
         */
        this._onDestroy = new Subject();
    }
    /** Perform unsubscriptions */
    /**
     * Perform unsubscriptions
     * @return {?}
     */
    DashboardGrabHandleService.prototype.ngOnDestroy = /**
     * Perform unsubscriptions
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /** Provide the service with the list of grab handles */
    /**
     * Provide the service with the list of grab handles
     * @param {?} handles
     * @return {?}
     */
    DashboardGrabHandleService.prototype.setHandles = /**
     * Provide the service with the list of grab handles
     * @param {?} handles
     * @return {?}
     */
    function (handles) {
        var _this = this;
        // store the grab handles
        this._handles = handles;
        // we want to make the first item focusable (raf to avoid expression changed error)
        requestAnimationFrame(function () { return _this.setFirstItemFocusable(); });
        // watch for any future changes to the list of handles
        this._handles.changes.pipe(takeUntil(this._onDestroy)).subscribe(function () { return _this.ensureFocusable(); });
        // if a drag is performed by the mouse we should update the focusable item to be the first again
        this._dashboard.layout$.pipe(takeUntil(this._onDestroy), filter(function () { return !_this._dashboard.isGrabbing$.value; }))
            .subscribe(function () { return _this.setFirstItemFocusable(); });
    };
    /** Make the first visual item in the list focusable */
    /**
     * Make the first visual item in the list focusable
     * @return {?}
     */
    DashboardGrabHandleService.prototype.setFirstItemFocusable = /**
     * Make the first visual item in the list focusable
     * @return {?}
     */
    function () {
        this.setItemFocus(0, false);
    };
    /** Set an item at a given index focused */
    /**
     * Set an item at a given index focused
     * @param {?} index
     * @param {?=} focusElement
     * @return {?}
     */
    DashboardGrabHandleService.prototype.setItemFocus = /**
     * Set an item at a given index focused
     * @param {?} index
     * @param {?=} focusElement
     * @return {?}
     */
    function (index, focusElement) {
        if (focusElement === void 0) { focusElement = true; }
        // if the list is empty then do nothing
        if (!this._handles || this._handles.length === 0) {
            return;
        }
        // check if the index is out of bounds
        if (index < 0) {
            return this.setItemFocus(0);
        }
        if (index > this._handles.length - 1) {
            return this.setItemFocus(this._handles.length - 1);
        }
        // try focusing a specific index
        this.getHandlesInOrder().forEach(function (handle, idx) { return idx === index ? handle.focus(focusElement) : handle.blur(); });
        // for safety we want to ensure one of the items is definitely still focusabled
        this.ensureFocusable();
    };
    /** Focus the previous grab handle */
    /**
     * Focus the previous grab handle
     * @param {?} handle
     * @return {?}
     */
    DashboardGrabHandleService.prototype.setPreviousItemFocus = /**
     * Focus the previous grab handle
     * @param {?} handle
     * @return {?}
     */
    function (handle) {
        this.setItemFocus(this.getHandleIndex(handle) - 1);
    };
    /** Focus the next grab handle */
    /**
     * Focus the next grab handle
     * @param {?} handle
     * @return {?}
     */
    DashboardGrabHandleService.prototype.setNextItemFocus = /**
     * Focus the next grab handle
     * @param {?} handle
     * @return {?}
     */
    function (handle) {
        this.setItemFocus(this.getHandleIndex(handle) + 1);
    };
    /** Focus the grab handle on the widget above */
    /**
     * Focus the grab handle on the widget above
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    DashboardGrabHandleService.prototype.setSiblingItemFocus = /**
     * Focus the grab handle on the widget above
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    function (widget, direction) {
        var _this = this;
        // find all widgets that are directly above and have grab handles
        var /** @type {?} */ target = this._dashboard.getSurroundingWidgets(widget, direction)
            .map(function (_widget) { return _this._handles.find(function (handle) { return handle.widget === _widget; }); })
            .filter(function (handle) { return !!handle; })
            .reduce(function (handle, current) { return !handle || current.widget.getColumn() > handle.widget.getColumn() ? current : handle; }, null);
        // ensure we have a target before focusing
        if (!target) {
            return;
        }
        // get the index of the target handle
        var /** @type {?} */ index = this.getHandleIndex(target);
        // focus the item
        this.setItemFocus(index);
    };
    /** Get handles in the order they appear rather than the order they are in the DOM */
    /**
     * Get handles in the order they appear rather than the order they are in the DOM
     * @return {?}
     */
    DashboardGrabHandleService.prototype.getHandlesInOrder = /**
     * Get handles in the order they appear rather than the order they are in the DOM
     * @return {?}
     */
    function () {
        var /** @type {?} */ widgets = this._dashboard.getWidgetsByOrder();
        var /** @type {?} */ handles = this._handles.toArray();
        // sort the handles according to the position of the widget it belongs to
        return handles.sort(function (handleOne, handleTwo) { return widgets.indexOf(handleOne.widget) - widgets.indexOf(handleTwo.widget); });
    };
    /**
     * @param {?} handle
     * @return {?}
     */
    DashboardGrabHandleService.prototype.getHandleIndex = /**
     * @param {?} handle
     * @return {?}
     */
    function (handle) {
        return this.getHandlesInOrder().findIndex(function (_handle) { return _handle === handle; });
    };
    /**
     * If the current focusable handle is removed we need to make another one focusable
     * @return {?}
     */
    DashboardGrabHandleService.prototype.ensureFocusable = /**
     * If the current focusable handle is removed we need to make another one focusable
     * @return {?}
     */
    function () {
        if (!this._handles.find(function (handle) { return handle.tabIndex === 0; })) {
            this.setFirstItemFocusable();
        }
    };
    DashboardGrabHandleService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    DashboardGrabHandleService.ctorParameters = function () { return [
        { type: DashboardService }
    ]; };
    return DashboardGrabHandleService;
}());
export { DashboardGrabHandleService };
function DashboardGrabHandleService_tsickle_Closure_declarations() {
    /**
     * Store the querylist of all the grab handles
     * @type {?}
     */
    DashboardGrabHandleService.prototype._handles;
    /**
     * Automatically unsubscribe from all observables when destroyed
     * @type {?}
     */
    DashboardGrabHandleService.prototype._onDestroy;
    /** @type {?} */
    DashboardGrabHandleService.prototype._dashboard;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhYi1oYW5kbGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2Rhc2hib2FyZC9ncmFiLWhhbmRsZS9ncmFiLWhhbmRsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUF3QixNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFtQixnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztJQWFyRSxvQ0FBb0IsVUFBNEI7UUFBNUIsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7Ozs7MEJBRjNCLElBQUksT0FBTyxFQUFRO0tBRWE7SUFFckQsOEJBQThCOzs7OztJQUM5QixnREFBVzs7OztJQUFYO1FBQ0ksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFBRSxDQUFDO0tBQzlCO0lBRUQsd0RBQXdEOzs7Ozs7SUFDeEQsK0NBQVU7Ozs7O0lBQVYsVUFBVyxPQUFnRDtRQUEzRCxpQkFjQzs7UUFYRyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzs7UUFHeEIscUJBQXFCLENBQUMsY0FBTSxPQUFBLEtBQUksQ0FBQyxxQkFBcUIsRUFBRSxFQUE1QixDQUE0QixDQUFDLENBQUM7O1FBRzFELElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsZUFBZSxFQUFFLEVBQXRCLENBQXNCLENBQUMsQ0FBQzs7UUFHL0YsSUFBSSxD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LFVBQVU7Ozs7Z0JBSmUsZ0JBQWdCOztxQ0FIMUM7O1NBUWEsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBBY3Rpb25EaXJlY3Rpb24sIERhc2hib2FyZFNlcnZpY2UgfSBmcm9tICcuLi9kYXNoYm9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuLi93aWRnZXQvZGFzaGJvYXJkLXdpZGdldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGFzaGJvYXJkR3JhYkhhbmRsZURpcmVjdGl2ZSB9IGZyb20gJy4vZ3JhYi1oYW5kbGUuZGlyZWN0aXZlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhc2hib2FyZEdyYWJIYW5kbGVTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIC8qKiBTdG9yZSB0aGUgcXVlcnlsaXN0IG9mIGFsbCB0aGUgZ3JhYiBoYW5kbGVzICovXG4gICAgcHJpdmF0ZSBfaGFuZGxlczogUXVlcnlMaXN0PERhc2hib2FyZEdyYWJIYW5kbGVEaXJlY3RpdmU+O1xuXG4gICAgLyoqIEF1dG9tYXRpY2FsbHkgdW5zdWJzY3JpYmUgZnJvbSBhbGwgb2JzZXJ2YWJsZXMgd2hlbiBkZXN0cm95ZWQgKi9cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGFzaGJvYXJkOiBEYXNoYm9hcmRTZXJ2aWNlKSB7IH1cblxuICAgIC8qKiBQZXJmb3JtIHVuc3Vic2NyaXB0aW9ucyAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogUHJvdmlkZSB0aGUgc2VydmljZSB3aXRoIHRoZSBsaXN0IG9mIGdyYWIgaGFuZGxlcyAqL1xuICAgIHNldEhhbmRsZXMoaGFuZGxlczogUXVlcnlMaXN0PERhc2hib2FyZEdyYWJIYW5kbGVEaXJlY3RpdmU+KTogdm9pZCB7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIGdyYWIgaGFuZGxlc1xuICAgICAgICB0aGlzLl9oYW5kbGVzID0gaGFuZGxlcztcblxuICAgICAgICAvLyB3ZSB3YW50IHRvIG1ha2UgdGhlIGZpcnN0IGl0ZW0gZm9jdXNhYmxlIChyYWYgdG8gYXZvaWQgZXhwcmVzc2lvbiBjaGFuZ2VkIGVycm9yKVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5zZXRGaXJzdEl0ZW1Gb2N1c2FibGUoKSk7XG5cbiAgICAgICAgLy8gd2F0Y2ggZm9yIGFueSBmdXR1cmUgY2hhbmdlcyB0byB0aGUgbGlzdCBvZiBoYW5kbGVzXG4gICAgICAgIHRoaXMuX2hhbmRsZXMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5lbnN1cmVGb2N1c2FibGUoKSk7XG5cbiAgICAgICAgLy8gaWYgYSBkcmFnIGlzIHBlcmZvcm1lZCBieSB0aGUgbW91c2Ugd2Ugc2hvdWxkIHVwZGF0ZSB0aGUgZm9jdXNhYmxlIGl0ZW0gdG8gYmUgdGhlIGZpcnN0IGFnYWluXG4gICAgICAgIHRoaXMuX2Rhc2hib2FyZC5sYXlvdXQkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIGZpbHRlcigoKSA9PiAhdGhpcy5fZGFzaGJvYXJkLmlzR3JhYmJpbmckLnZhbHVlKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRGaXJzdEl0ZW1Gb2N1c2FibGUoKSk7XG4gICAgfVxuXG4gICAgLyoqIE1ha2UgdGhlIGZpcnN0IHZpc3VhbCBpdGVtIGluIHRoZSBsaXN0IGZvY3VzYWJsZSAqL1xuICAgIHNldEZpcnN0SXRlbUZvY3VzYWJsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRJdGVtRm9jdXMoMCwgZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKiBTZXQgYW4gaXRlbSBhdCBhIGdpdmVuIGluZGV4IGZvY3VzZWQgKi9cbiAgICBzZXRJdGVtRm9jdXMoaW5kZXg6IG51bWJlciwgZm9jdXNFbGVtZW50OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuXG4gICAgICAgIC8vIGlmIHRoZSBsaXN0IGlzIGVtcHR5IHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAoIXRoaXMuX2hhbmRsZXMgfHwgdGhpcy5faGFuZGxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBpbmRleCBpcyBvdXQgb2YgYm91bmRzXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldEl0ZW1Gb2N1cygwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbmRleCA+IHRoaXMuX2hhbmRsZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0SXRlbUZvY3VzKHRoaXMuX2hhbmRsZXMubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0cnkgZm9jdXNpbmcgYSBzcGVjaWZpYyBpbmRleFxuICAgICAgICB0aGlzLmdldEhhbmRsZXNJbk9yZGVyKCkuZm9yRWFjaCgoaGFuZGxlLCBpZHgpID0+IGlkeCA9PT0gaW5kZXggPyBoYW5kbGUuZm9jdXMoZm9jdXNFbGVtZW50KSA6IGhhbmRsZS5ibHVyKCkpO1xuXG4gICAgICAgIC8vIGZvciBzYWZldHkgd2Ugd2FudCB0byBlbnN1cmUgb25lIG9mIHRoZSBpdGVtcyBpcyBkZWZpbml0ZWx5IHN0aWxsIGZvY3VzYWJsZWRcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1c2FibGUoKTtcbiAgICB9XG5cbiAgICAvKiogRm9jdXMgdGhlIHByZXZpb3VzIGdyYWIgaGFuZGxlICovXG4gICAgc2V0UHJldmlvdXNJdGVtRm9jdXMoaGFuZGxlOiBEYXNoYm9hcmRHcmFiSGFuZGxlRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0SXRlbUZvY3VzKHRoaXMuZ2V0SGFuZGxlSW5kZXgoaGFuZGxlKSAtIDEpO1xuICAgIH1cblxuICAgIC8qKiBGb2N1cyB0aGUgbmV4dCBncmFiIGhhbmRsZSAqL1xuICAgIHNldE5leHRJdGVtRm9jdXMoaGFuZGxlOiBEYXNoYm9hcmRHcmFiSGFuZGxlRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0SXRlbUZvY3VzKHRoaXMuZ2V0SGFuZGxlSW5kZXgoaGFuZGxlKSArIDEpO1xuICAgIH1cblxuICAgIC8qKiBGb2N1cyB0aGUgZ3JhYiBoYW5kbGUgb24gdGhlIHdpZGdldCBhYm92ZSAqL1xuICAgIHNldFNpYmxpbmdJdGVtRm9jdXMod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIGRpcmVjdGlvbjogQWN0aW9uRGlyZWN0aW9uKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZmluZCBhbGwgd2lkZ2V0cyB0aGF0IGFyZSBkaXJlY3RseSBhYm92ZSBhbmQgaGF2ZSBncmFiIGhhbmRsZXNcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5fZGFzaGJvYXJkLmdldFN1cnJvdW5kaW5nV2lkZ2V0cyh3aWRnZXQsIGRpcmVjdGlvbilcbiAgICAgICAgICAgIC5tYXAoX3dpZGdldCA9PiB0aGlzLl9oYW5kbGVzLmZpbmQoaGFuZGxlID0+IGhhbmRsZS53aWRnZXQgPT09IF93aWRnZXQpKVxuICAgICAgICAgICAgLmZpbHRlcihoYW5kbGUgPT4gISFoYW5kbGUpXG4gICAgICAgICAgICAucmVkdWNlKChoYW5kbGUsIGN1cnJlbnQpID0+ICFoYW5kbGUgfHwgY3VycmVudC53aWRnZXQuZ2V0Q29sdW1uKCkgPiBoYW5kbGUud2lkZ2V0LmdldENvbHVtbigpID8gY3VycmVudCA6IGhhbmRsZSwgbnVsbCk7XG5cbiAgICAgICAgLy8gZW5zdXJlIHdlIGhhdmUgYSB0YXJnZXQgYmVmb3JlIGZvY3VzaW5nXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgdGhlIGluZGV4IG9mIHRoZSB0YXJnZXQgaGFuZGxlXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRIYW5kbGVJbmRleCh0YXJnZXQpO1xuXG4gICAgICAgIC8vIGZvY3VzIHRoZSBpdGVtXG4gICAgICAgIHRoaXMuc2V0SXRlbUZvY3VzKGluZGV4KTtcbiAgICB9XG5cbiAgICAvKiogR2V0IGhhbmRsZXMgaW4gdGhlIG9yZGVyIHRoZXkgYXBwZWFyIHJhdGhlciB0aGFuIHRoZSBvcmRlciB0aGV5IGFyZSBpbiB0aGUgRE9NICovXG4gICAgZ2V0SGFuZGxlc0luT3JkZXIoKTogRGFzaGJvYXJkR3JhYkhhbmRsZURpcmVjdGl2ZVtdIHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0cyA9IHRoaXMuX2Rhc2hib2FyZC5nZXRXaWRnZXRzQnlPcmRlcigpO1xuICAgICAgICBjb25zdCBoYW5kbGVzID0gdGhpcy5faGFuZGxlcy50b0FycmF5KCk7XG5cbiAgICAgICAgLy8gc29ydCB0aGUgaGFuZGxlcyBhY2NvcmRpbmcgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSB3aWRnZXQgaXQgYmVsb25ncyB0b1xuICAgICAgICByZXR1cm4gaGFuZGxlcy5zb3J0KChoYW5kbGVPbmUsIGhhbmRsZVR3bykgPT4gd2lkZ2V0cy5pbmRleE9mKGhhbmRsZU9uZS53aWRnZXQpIC0gd2lkZ2V0cy5pbmRleE9mKGhhbmRsZVR3by53aWRnZXQpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEhhbmRsZUluZGV4KGhhbmRsZTogRGFzaGJvYXJkR3JhYkhhbmRsZURpcmVjdGl2ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEhhbmRsZXNJbk9yZGVyKCkuZmluZEluZGV4KF9oYW5kbGUgPT4gX2hhbmRsZSA9PT0gaGFuZGxlKTtcbiAgICB9XG5cbiAgICAvKiogSWYgdGhlIGN1cnJlbnQgZm9jdXNhYmxlIGhhbmRsZSBpcyByZW1vdmVkIHdlIG5lZWQgdG8gbWFrZSBhbm90aGVyIG9uZSBmb2N1c2FibGUgKi9cbiAgICBwcml2YXRlIGVuc3VyZUZvY3VzYWJsZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9oYW5kbGVzLmZpbmQoaGFuZGxlID0+IGhhbmRsZS50YWJJbmRleCA9PT0gMCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rmlyc3RJdGVtRm9jdXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=