/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DashboardService } from '../dashboard.service';
export class DashboardGrabHandleService {
    /**
     * @param {?} _dashboard
     */
    constructor(_dashboard) {
        this._dashboard = _dashboard;
        /**
         * Automatically unsubscribe from all observables when destroyed
         */
        this._onDestroy = new Subject();
    }
    /**
     * Perform unsubscriptions
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * Provide the service with the list of grab handles
     * @param {?} handles
     * @return {?}
     */
    setHandles(handles) {
        // store the grab handles
        this._handles = handles;
        // we want to make the first item focusable (raf to avoid expression changed error)
        requestAnimationFrame(() => this.setFirstItemFocusable());
        // watch for any future changes to the list of handles
        this._handles.changes.pipe(takeUntil(this._onDestroy)).subscribe(() => this.ensureFocusable());
        // if a drag is performed by the mouse we should update the focusable item to be the first again
        this._dashboard.layout$.pipe(takeUntil(this._onDestroy), filter(() => !this._dashboard.isGrabbing$.value))
            .subscribe(() => this.setFirstItemFocusable());
    }
    /**
     * Make the first visual item in the list focusable
     * @return {?}
     */
    setFirstItemFocusable() {
        this.setItemFocus(0, false);
    }
    /**
     * Set an item at a given index focused
     * @param {?} index
     * @param {?=} focusElement
     * @return {?}
     */
    setItemFocus(index, focusElement = true) {
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
        this.getHandlesInOrder().forEach((handle, idx) => idx === index ? handle.focus(focusElement) : handle.blur());
        // for safety we want to ensure one of the items is definitely still focusabled
        this.ensureFocusable();
    }
    /**
     * Focus the previous grab handle
     * @param {?} handle
     * @return {?}
     */
    setPreviousItemFocus(handle) {
        this.setItemFocus(this.getHandleIndex(handle) - 1);
    }
    /**
     * Focus the next grab handle
     * @param {?} handle
     * @return {?}
     */
    setNextItemFocus(handle) {
        this.setItemFocus(this.getHandleIndex(handle) + 1);
    }
    /**
     * Focus the grab handle on the widget above
     * @param {?} widget
     * @param {?} direction
     * @return {?}
     */
    setSiblingItemFocus(widget, direction) {
        // find all widgets that are directly above and have grab handles
        const /** @type {?} */ target = this._dashboard.getSurroundingWidgets(widget, direction)
            .map(_widget => this._handles.find(handle => handle.widget === _widget))
            .filter(handle => !!handle)
            .reduce((handle, current) => !handle || current.widget.getColumn() > handle.widget.getColumn() ? current : handle, null);
        // ensure we have a target before focusing
        if (!target) {
            return;
        }
        // get the index of the target handle
        const /** @type {?} */ index = this.getHandleIndex(target);
        // focus the item
        this.setItemFocus(index);
    }
    /**
     * Get handles in the order they appear rather than the order they are in the DOM
     * @return {?}
     */
    getHandlesInOrder() {
        const /** @type {?} */ widgets = this._dashboard.getWidgetsByOrder();
        const /** @type {?} */ handles = this._handles.toArray();
        // sort the handles according to the position of the widget it belongs to
        return handles.sort((handleOne, handleTwo) => widgets.indexOf(handleOne.widget) - widgets.indexOf(handleTwo.widget));
    }
    /**
     * @param {?} handle
     * @return {?}
     */
    getHandleIndex(handle) {
        return this.getHandlesInOrder().findIndex(_handle => _handle === handle);
    }
    /**
     * If the current focusable handle is removed we need to make another one focusable
     * @return {?}
     */
    ensureFocusable() {
        if (!this._handles.find(handle => handle.tabIndex === 0)) {
            this.setFirstItemFocusable();
        }
    }
}
DashboardGrabHandleService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
DashboardGrabHandleService.ctorParameters = () => [
    { type: DashboardService }
];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ3JhYi1oYW5kbGUuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2Rhc2hib2FyZC9ncmFiLWhhbmRsZS9ncmFiLWhhbmRsZS5zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUF3QixNQUFNLGVBQWUsQ0FBQztBQUNqRSxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFtQixnQkFBZ0IsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBS3pFLE1BQU07Ozs7SUFRRixZQUFvQixVQUE0QjtRQUE1QixlQUFVLEdBQVYsVUFBVSxDQUFrQjs7OzswQkFGM0IsSUFBSSxPQUFPLEVBQVE7S0FFYTs7Ozs7SUFHckQsV0FBVztRQUNQLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5Qjs7Ozs7O0lBR0QsVUFBVSxDQUFDLE9BQWdEOztRQUd2RCxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sQ0FBQzs7UUFHeEIscUJBQXFCLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLHFCQUFxQixFQUFFLENBQUMsQ0FBQzs7UUFHMUQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7O1FBRy9GLElBQUksQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUs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QUFDLFVBQVUsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO1FBQ3BELHVCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxDQUFDOztRQUd4QyxNQUFNLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUUsRUFBRSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7S0FDeEg7Ozs7O0lBRU8sY0FBYyxDQUFDLE1BQW9DO1FBQ3ZELE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLEtBQUssTUFBTSxDQUFDLENBQUM7Ozs7OztJQUlyRSxlQUFlO1FBQ25CLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsUUFBUSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUN2RCxJQUFJLENBQUMscUJBQXFCLEVBQUUsQ0FBQztTQUNoQzs7OztZQS9HUixVQUFVOzs7O1lBSmUsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgT25EZXN0cm95LCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGZpbHRlciwgdGFrZVVudGlsIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3ViamVjdCB9IGZyb20gJ3J4anMvU3ViamVjdCc7XG5pbXBvcnQgeyBBY3Rpb25EaXJlY3Rpb24sIERhc2hib2FyZFNlcnZpY2UgfSBmcm9tICcuLi9kYXNoYm9hcmQuc2VydmljZSc7XG5pbXBvcnQgeyBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQgfSBmcm9tICcuLi93aWRnZXQvZGFzaGJvYXJkLXdpZGdldC5jb21wb25lbnQnO1xuaW1wb3J0IHsgRGFzaGJvYXJkR3JhYkhhbmRsZURpcmVjdGl2ZSB9IGZyb20gJy4vZ3JhYi1oYW5kbGUuZGlyZWN0aXZlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIERhc2hib2FyZEdyYWJIYW5kbGVTZXJ2aWNlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIC8qKiBTdG9yZSB0aGUgcXVlcnlsaXN0IG9mIGFsbCB0aGUgZ3JhYiBoYW5kbGVzICovXG4gICAgcHJpdmF0ZSBfaGFuZGxlczogUXVlcnlMaXN0PERhc2hib2FyZEdyYWJIYW5kbGVEaXJlY3RpdmU+O1xuXG4gICAgLyoqIEF1dG9tYXRpY2FsbHkgdW5zdWJzY3JpYmUgZnJvbSBhbGwgb2JzZXJ2YWJsZXMgd2hlbiBkZXN0cm95ZWQgKi9cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZGFzaGJvYXJkOiBEYXNoYm9hcmRTZXJ2aWNlKSB7IH1cblxuICAgIC8qKiBQZXJmb3JtIHVuc3Vic2NyaXB0aW9ucyAqL1xuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogUHJvdmlkZSB0aGUgc2VydmljZSB3aXRoIHRoZSBsaXN0IG9mIGdyYWIgaGFuZGxlcyAqL1xuICAgIHNldEhhbmRsZXMoaGFuZGxlczogUXVlcnlMaXN0PERhc2hib2FyZEdyYWJIYW5kbGVEaXJlY3RpdmU+KTogdm9pZCB7XG5cbiAgICAgICAgLy8gc3RvcmUgdGhlIGdyYWIgaGFuZGxlc1xuICAgICAgICB0aGlzLl9oYW5kbGVzID0gaGFuZGxlcztcblxuICAgICAgICAvLyB3ZSB3YW50IHRvIG1ha2UgdGhlIGZpcnN0IGl0ZW0gZm9jdXNhYmxlIChyYWYgdG8gYXZvaWQgZXhwcmVzc2lvbiBjaGFuZ2VkIGVycm9yKVxuICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoKCkgPT4gdGhpcy5zZXRGaXJzdEl0ZW1Gb2N1c2FibGUoKSk7XG5cbiAgICAgICAgLy8gd2F0Y2ggZm9yIGFueSBmdXR1cmUgY2hhbmdlcyB0byB0aGUgbGlzdCBvZiBoYW5kbGVzXG4gICAgICAgIHRoaXMuX2hhbmRsZXMuY2hhbmdlcy5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5lbnN1cmVGb2N1c2FibGUoKSk7XG5cbiAgICAgICAgLy8gaWYgYSBkcmFnIGlzIHBlcmZvcm1lZCBieSB0aGUgbW91c2Ugd2Ugc2hvdWxkIHVwZGF0ZSB0aGUgZm9jdXNhYmxlIGl0ZW0gdG8gYmUgdGhlIGZpcnN0IGFnYWluXG4gICAgICAgIHRoaXMuX2Rhc2hib2FyZC5sYXlvdXQkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIGZpbHRlcigoKSA9PiAhdGhpcy5fZGFzaGJvYXJkLmlzR3JhYmJpbmckLnZhbHVlKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5zZXRGaXJzdEl0ZW1Gb2N1c2FibGUoKSk7XG4gICAgfVxuXG4gICAgLyoqIE1ha2UgdGhlIGZpcnN0IHZpc3VhbCBpdGVtIGluIHRoZSBsaXN0IGZvY3VzYWJsZSAqL1xuICAgIHNldEZpcnN0SXRlbUZvY3VzYWJsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5zZXRJdGVtRm9jdXMoMCwgZmFsc2UpO1xuICAgIH1cblxuICAgIC8qKiBTZXQgYW4gaXRlbSBhdCBhIGdpdmVuIGluZGV4IGZvY3VzZWQgKi9cbiAgICBzZXRJdGVtRm9jdXMoaW5kZXg6IG51bWJlciwgZm9jdXNFbGVtZW50OiBib29sZWFuID0gdHJ1ZSk6IHZvaWQge1xuXG4gICAgICAgIC8vIGlmIHRoZSBsaXN0IGlzIGVtcHR5IHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAoIXRoaXMuX2hhbmRsZXMgfHwgdGhpcy5faGFuZGxlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZSBpbmRleCBpcyBvdXQgb2YgYm91bmRzXG4gICAgICAgIGlmIChpbmRleCA8IDApIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNldEl0ZW1Gb2N1cygwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbmRleCA+IHRoaXMuX2hhbmRsZXMubGVuZ3RoIC0gMSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuc2V0SXRlbUZvY3VzKHRoaXMuX2hhbmRsZXMubGVuZ3RoIC0gMSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyB0cnkgZm9jdXNpbmcgYSBzcGVjaWZpYyBpbmRleFxuICAgICAgICB0aGlzLmdldEhhbmRsZXNJbk9yZGVyKCkuZm9yRWFjaCgoaGFuZGxlLCBpZHgpID0+IGlkeCA9PT0gaW5kZXggPyBoYW5kbGUuZm9jdXMoZm9jdXNFbGVtZW50KSA6IGhhbmRsZS5ibHVyKCkpO1xuXG4gICAgICAgIC8vIGZvciBzYWZldHkgd2Ugd2FudCB0byBlbnN1cmUgb25lIG9mIHRoZSBpdGVtcyBpcyBkZWZpbml0ZWx5IHN0aWxsIGZvY3VzYWJsZWRcbiAgICAgICAgdGhpcy5lbnN1cmVGb2N1c2FibGUoKTtcbiAgICB9XG5cbiAgICAvKiogRm9jdXMgdGhlIHByZXZpb3VzIGdyYWIgaGFuZGxlICovXG4gICAgc2V0UHJldmlvdXNJdGVtRm9jdXMoaGFuZGxlOiBEYXNoYm9hcmRHcmFiSGFuZGxlRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0SXRlbUZvY3VzKHRoaXMuZ2V0SGFuZGxlSW5kZXgoaGFuZGxlKSAtIDEpO1xuICAgIH1cblxuICAgIC8qKiBGb2N1cyB0aGUgbmV4dCBncmFiIGhhbmRsZSAqL1xuICAgIHNldE5leHRJdGVtRm9jdXMoaGFuZGxlOiBEYXNoYm9hcmRHcmFiSGFuZGxlRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuc2V0SXRlbUZvY3VzKHRoaXMuZ2V0SGFuZGxlSW5kZXgoaGFuZGxlKSArIDEpO1xuICAgIH1cblxuICAgIC8qKiBGb2N1cyB0aGUgZ3JhYiBoYW5kbGUgb24gdGhlIHdpZGdldCBhYm92ZSAqL1xuICAgIHNldFNpYmxpbmdJdGVtRm9jdXMod2lkZ2V0OiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnQsIGRpcmVjdGlvbjogQWN0aW9uRGlyZWN0aW9uKTogdm9pZCB7XG5cbiAgICAgICAgLy8gZmluZCBhbGwgd2lkZ2V0cyB0aGF0IGFyZSBkaXJlY3RseSBhYm92ZSBhbmQgaGF2ZSBncmFiIGhhbmRsZXNcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5fZGFzaGJvYXJkLmdldFN1cnJvdW5kaW5nV2lkZ2V0cyh3aWRnZXQsIGRpcmVjdGlvbilcbiAgICAgICAgICAgIC5tYXAoX3dpZGdldCA9PiB0aGlzLl9oYW5kbGVzLmZpbmQoaGFuZGxlID0+IGhhbmRsZS53aWRnZXQgPT09IF93aWRnZXQpKVxuICAgICAgICAgICAgLmZpbHRlcihoYW5kbGUgPT4gISFoYW5kbGUpXG4gICAgICAgICAgICAucmVkdWNlKChoYW5kbGUsIGN1cnJlbnQpID0+ICFoYW5kbGUgfHwgY3VycmVudC53aWRnZXQuZ2V0Q29sdW1uKCkgPiBoYW5kbGUud2lkZ2V0LmdldENvbHVtbigpID8gY3VycmVudCA6IGhhbmRsZSwgbnVsbCk7XG5cbiAgICAgICAgLy8gZW5zdXJlIHdlIGhhdmUgYSB0YXJnZXQgYmVmb3JlIGZvY3VzaW5nXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBnZXQgdGhlIGluZGV4IG9mIHRoZSB0YXJnZXQgaGFuZGxlXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXRIYW5kbGVJbmRleCh0YXJnZXQpO1xuXG4gICAgICAgIC8vIGZvY3VzIHRoZSBpdGVtXG4gICAgICAgIHRoaXMuc2V0SXRlbUZvY3VzKGluZGV4KTtcbiAgICB9XG5cbiAgICAvKiogR2V0IGhhbmRsZXMgaW4gdGhlIG9yZGVyIHRoZXkgYXBwZWFyIHJhdGhlciB0aGFuIHRoZSBvcmRlciB0aGV5IGFyZSBpbiB0aGUgRE9NICovXG4gICAgZ2V0SGFuZGxlc0luT3JkZXIoKTogRGFzaGJvYXJkR3JhYkhhbmRsZURpcmVjdGl2ZVtdIHtcbiAgICAgICAgY29uc3Qgd2lkZ2V0cyA9IHRoaXMuX2Rhc2hib2FyZC5nZXRXaWRnZXRzQnlPcmRlcigpO1xuICAgICAgICBjb25zdCBoYW5kbGVzID0gdGhpcy5faGFuZGxlcy50b0FycmF5KCk7XG5cbiAgICAgICAgLy8gc29ydCB0aGUgaGFuZGxlcyBhY2NvcmRpbmcgdG8gdGhlIHBvc2l0aW9uIG9mIHRoZSB3aWRnZXQgaXQgYmVsb25ncyB0b1xuICAgICAgICByZXR1cm4gaGFuZGxlcy5zb3J0KChoYW5kbGVPbmUsIGhhbmRsZVR3bykgPT4gd2lkZ2V0cy5pbmRleE9mKGhhbmRsZU9uZS53aWRnZXQpIC0gd2lkZ2V0cy5pbmRleE9mKGhhbmRsZVR3by53aWRnZXQpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEhhbmRsZUluZGV4KGhhbmRsZTogRGFzaGJvYXJkR3JhYkhhbmRsZURpcmVjdGl2ZSk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLmdldEhhbmRsZXNJbk9yZGVyKCkuZmluZEluZGV4KF9oYW5kbGUgPT4gX2hhbmRsZSA9PT0gaGFuZGxlKTtcbiAgICB9XG5cbiAgICAvKiogSWYgdGhlIGN1cnJlbnQgZm9jdXNhYmxlIGhhbmRsZSBpcyByZW1vdmVkIHdlIG5lZWQgdG8gbWFrZSBhbm90aGVyIG9uZSBmb2N1c2FibGUgKi9cbiAgICBwcml2YXRlIGVuc3VyZUZvY3VzYWJsZSgpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9oYW5kbGVzLmZpbmQoaGFuZGxlID0+IGhhbmRsZS50YWJJbmRleCA9PT0gMCkpIHtcbiAgICAgICAgICAgIHRoaXMuc2V0Rmlyc3RJdGVtRm9jdXNhYmxlKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbn0iXX0=