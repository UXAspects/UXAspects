/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DragService } from './drag.service';
var DropDirective = /** @class */ (function () {
    function DropDirective(_dragService) {
        var _this = this;
        this._dragService = _dragService;
        /**
         * Emit the model of the item dropped
         */
        this.onDrop = new EventEmitter();
        /**
         * Determine whether or not the mouse is within the drop region
         */
        this.isMouseOver = false;
        /**
         * Determine whether or not we are currently dragging an item
         */
        this.isDragging = false;
        /**
         * Ensure we destroy all subscriptions
         */
        this._onDestroy = new Subject();
        // subscribe to drag events
        _dragService.onDragStart.pipe(takeUntil(this._onDestroy), filter(function (event) { return _this.isGroupAllowed(event.group); })).subscribe(this.onDragStart.bind(this));
        _dragService.onDragEnd.pipe(takeUntil(this._onDestroy), filter(function (event) { return _this.isGroupAllowed(event.group); })).subscribe(this.onDragEnd.bind(this));
    }
    /**
     * @return {?}
     */
    DropDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /** Update the mouse over state */
    /**
     * Update the mouse over state
     * @return {?}
     */
    DropDirective.prototype.onMouseOver = /**
     * Update the mouse over state
     * @return {?}
     */
    function () {
        if (this.isGroupAllowed(this._group)) {
            this.isMouseOver = true;
            // emit that we are over a drop area
            this._dragService.onDropEnter.next();
        }
    };
    /** Update the mouse over state */
    /**
     * Update the mouse over state
     * @return {?}
     */
    DropDirective.prototype.onMouseLeave = /**
     * Update the mouse over state
     * @return {?}
     */
    function () {
        // always ensure this value is reset
        this.isMouseOver = false;
        // only emit the dropd leave event when appropriate
        if (this.isGroupAllowed(this._group)) {
            this._dragService.onDropLeave.next();
        }
    };
    /** Update the dragging state */
    /**
     * Update the dragging state
     * @param {?} event
     * @return {?}
     */
    DropDirective.prototype.onDragStart = /**
     * Update the dragging state
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.isDragging = true;
        this._group = event.group;
    };
    /** Update the dragging state */
    /**
     * Update the dragging state
     * @param {?} event
     * @return {?}
     */
    DropDirective.prototype.onDragEnd = /**
     * Update the dragging state
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // update the dragging state
        this.isDragging = false;
        // clear the cached group
        this._group = null;
        // if the mouse is over and it is in an allowed group emit the dop event
        if (this.isMouseOver && this.isGroupAllowed(event.group)) {
            this.onDrop.emit(event.data);
            this._dragService.onDrop.next(event.data);
        }
    };
    /**
     * Determine whether or not the event is part of the specified groups
     * @param {?} group
     * @return {?}
     */
    DropDirective.prototype.isGroupAllowed = /**
     * Determine whether or not the event is part of the specified groups
     * @param {?} group
     * @return {?}
     */
    function (group) {
        // if no group specified allow all groups
        if (!this.group) {
            return true;
        }
        // if it is an array then ensure it is allowed
        if (Array.isArray(this.group)) {
            return !!this.group.find(function (_group) { return _group === group; });
        }
        return this.group === group;
    };
    DropDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[uxDrop]',
                    host: {
                        '[class.ux-drop-hover]': 'isMouseOver && isDragging'
                    }
                },] }
    ];
    /** @nocollapse */
    DropDirective.ctorParameters = function () { return [
        { type: DragService }
    ]; };
    DropDirective.propDecorators = {
        group: [{ type: Input }],
        onDrop: [{ type: Output }],
        onMouseOver: [{ type: HostListener, args: ['mouseenter',] }],
        onMouseLeave: [{ type: HostListener, args: ['mouseleave',] }]
    };
    return DropDirective;
}());
export { DropDirective };
function DropDirective_tsickle_Closure_declarations() {
    /**
     * Define a specific group of dragged items to listen to
     * @type {?}
     */
    DropDirective.prototype.group;
    /**
     * Emit the model of the item dropped
     * @type {?}
     */
    DropDirective.prototype.onDrop;
    /**
     * Determine whether or not the mouse is within the drop region
     * @type {?}
     */
    DropDirective.prototype.isMouseOver;
    /**
     * Determine whether or not we are currently dragging an item
     * @type {?}
     */
    DropDirective.prototype.isDragging;
    /**
     * Store the group of the dragged item
     * @type {?}
     */
    DropDirective.prototype._group;
    /**
     * Ensure we destroy all subscriptions
     * @type {?}
     */
    DropDirective.prototype._onDestroy;
    /** @type {?} */
    DropDirective.prototype._dragService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZHJvcC5kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9kcmFnL2Ryb3AuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNoRyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLFdBQVcsRUFBZSxNQUFNLGdCQUFnQixDQUFDOztJQTRCdEQsdUJBQW9CLFlBQXlCO1FBQTdDLGlCQUlDO1FBSm1CLGlCQUFZLEdBQVosWUFBWSxDQUFhOzs7O3NCQWQxQixJQUFJLFlBQVksRUFBTzs7OzsyQkFHbkIsS0FBSzs7OzswQkFHTixLQUFLOzs7OzBCQU1OLElBQUksT0FBTyxFQUFROztRQUlwQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNwSixZQUFZLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFLE1BQU0sQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztLQUNuSjs7OztJQUVELG1DQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDdkIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztLQUM5QjtJQUVELGtDQUFrQzs7Ozs7SUFFbEMsbUNBQVc7Ozs7SUFEWDtRQUVJLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQzs7WUFHeEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLENBQUM7U0FDeEM7S0FDSjtJQUVELGtDQUFrQzs7Ozs7SUFFbEMsb0NBQVk7Ozs7SUFEWjs7UUFJSSxJQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssQ0FBQzs7UUFHekIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25DLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDO1NBQ3hDO0tBQ0o7SUFFRCxnQ0FBZ0M7Ozs7OztJQUNoQyxtQ0FBVzs7Ozs7SUFBWCxVQUFZLEtBQWtCO1FBQzFCLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQztLQUM3QjtJQUVELGdDQUFnQzs7Ozs7O0lBQ2hDLGlDQUFTOzs7OztJQUFULFVBQVUsS0FBa0I7O1FBR3hCLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDOztRQUd4QixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQzs7UUFHbkIsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsSUFBSSxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDdkQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzdCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDN0M7S0FDSjs7Ozs7O0lBR08sc0NBQWM7Ozs7O2NBQUMsS0FBYTs7UUFHaEMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztZQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUM7U0FDZjs7UUFHRCxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDNUIsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sS0FBSyxLQUFLLEVBQWhCLENBQWdCLENBQUMsQ0FBQztTQUN4RDtRQUVELE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQzs7O2dCQWhHbkMsU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxVQUFVO29CQUNwQixJQUFJLEVBQUU7d0JBQ0YsdUJBQXVCLEVBQUUsMkJBQTJCO3FCQUN2RDtpQkFDSjs7OztnQkFQUSxXQUFXOzs7d0JBV2YsS0FBSzt5QkFHTCxNQUFNOzhCQTBCTixZQUFZLFNBQUMsWUFBWTsrQkFXekIsWUFBWSxTQUFDLFlBQVk7O3dCQXREOUI7O1NBV2EsYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IERyYWdTZXJ2aWNlLCBVeERyYWdFdmVudCB9IGZyb20gJy4vZHJhZy5zZXJ2aWNlJztcblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhEcm9wXScsXG4gICAgaG9zdDoge1xuICAgICAgICAnW2NsYXNzLnV4LWRyb3AtaG92ZXJdJzogJ2lzTW91c2VPdmVyICYmIGlzRHJhZ2dpbmcnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBEcm9wRGlyZWN0aXZlIGltcGxlbWVudHMgT25EZXN0cm95IHtcblxuICAgIC8qKiBEZWZpbmUgYSBzcGVjaWZpYyBncm91cCBvZiBkcmFnZ2VkIGl0ZW1zIHRvIGxpc3RlbiB0byAqL1xuICAgIEBJbnB1dCgpIGdyb3VwOiBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAgIC8qKiBFbWl0IHRoZSBtb2RlbCBvZiB0aGUgaXRlbSBkcm9wcGVkICovXG4gICAgQE91dHB1dCgpIG9uRHJvcCA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gICAgLyoqIERldGVybWluZSB3aGV0aGVyIG9yIG5vdCB0aGUgbW91c2UgaXMgd2l0aGluIHRoZSBkcm9wIHJlZ2lvbiAqL1xuICAgIGlzTW91c2VPdmVyOiBib29sZWFuID0gZmFsc2U7XG5cbiAgICAvKiogRGV0ZXJtaW5lIHdoZXRoZXIgb3Igbm90IHdlIGFyZSBjdXJyZW50bHkgZHJhZ2dpbmcgYW4gaXRlbSAqL1xuICAgIGlzRHJhZ2dpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIC8qKiBTdG9yZSB0aGUgZ3JvdXAgb2YgdGhlIGRyYWdnZWQgaXRlbSAqL1xuICAgIHByaXZhdGUgX2dyb3VwOiBzdHJpbmc7XG5cbiAgICAvKiogRW5zdXJlIHdlIGRlc3Ryb3kgYWxsIHN1YnNjcmlwdGlvbnMgKi9cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfZHJhZ1NlcnZpY2U6IERyYWdTZXJ2aWNlKSB7XG4gICAgICAgIC8vIHN1YnNjcmliZSB0byBkcmFnIGV2ZW50c1xuICAgICAgICBfZHJhZ1NlcnZpY2Uub25EcmFnU3RhcnQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgZmlsdGVyKGV2ZW50ID0+IHRoaXMuaXNHcm91cEFsbG93ZWQoZXZlbnQuZ3JvdXApKSkuc3Vic2NyaWJlKHRoaXMub25EcmFnU3RhcnQuYmluZCh0aGlzKSk7XG4gICAgICAgIF9kcmFnU2VydmljZS5vbkRyYWdFbmQucGlwZSh0YWtlVW50aWwodGhpcy5fb25EZXN0cm95KSwgZmlsdGVyKGV2ZW50ID0+IHRoaXMuaXNHcm91cEFsbG93ZWQoZXZlbnQuZ3JvdXApKSkuc3Vic2NyaWJlKHRoaXMub25EcmFnRW5kLmJpbmQodGhpcykpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICAvKiogVXBkYXRlIHRoZSBtb3VzZSBvdmVyIHN0YXRlICovXG4gICAgQEhvc3RMaXN0ZW5lcignbW91c2VlbnRlcicpXG4gICAgb25Nb3VzZU92ZXIoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLmlzR3JvdXBBbGxvd2VkKHRoaXMuX2dyb3VwKSkge1xuICAgICAgICAgICAgdGhpcy5pc01vdXNlT3ZlciA9IHRydWU7XG5cbiAgICAgICAgICAgIC8vIGVtaXQgdGhhdCB3ZSBhcmUgb3ZlciBhIGRyb3AgYXJlYVxuICAgICAgICAgICAgdGhpcy5fZHJhZ1NlcnZpY2Uub25Ecm9wRW50ZXIubmV4dCgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgLyoqIFVwZGF0ZSB0aGUgbW91c2Ugb3ZlciBzdGF0ZSAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlbGVhdmUnKVxuICAgIG9uTW91c2VMZWF2ZSgpOiB2b2lkIHtcblxuICAgICAgICAvLyBhbHdheXMgZW5zdXJlIHRoaXMgdmFsdWUgaXMgcmVzZXRcbiAgICAgICAgdGhpcy5pc01vdXNlT3ZlciA9IGZhbHNlO1xuXG4gICAgICAgIC8vIG9ubHkgZW1pdCB0aGUgZHJvcGQgbGVhdmUgZXZlbnQgd2hlbiBhcHByb3ByaWF0ZVxuICAgICAgICBpZiAodGhpcy5pc0dyb3VwQWxsb3dlZCh0aGlzLl9ncm91cCkpIHtcbiAgICAgICAgICAgIHRoaXMuX2RyYWdTZXJ2aWNlLm9uRHJvcExlYXZlLm5leHQoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBVcGRhdGUgdGhlIGRyYWdnaW5nIHN0YXRlICovXG4gICAgb25EcmFnU3RhcnQoZXZlbnQ6IFV4RHJhZ0V2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuaXNEcmFnZ2luZyA9IHRydWU7XG4gICAgICAgIHRoaXMuX2dyb3VwID0gZXZlbnQuZ3JvdXA7XG4gICAgfVxuXG4gICAgLyoqIFVwZGF0ZSB0aGUgZHJhZ2dpbmcgc3RhdGUgKi9cbiAgICBvbkRyYWdFbmQoZXZlbnQ6IFV4RHJhZ0V2ZW50KTogdm9pZCB7XG5cbiAgICAgICAgLy8gdXBkYXRlIHRoZSBkcmFnZ2luZyBzdGF0ZVxuICAgICAgICB0aGlzLmlzRHJhZ2dpbmcgPSBmYWxzZTtcblxuICAgICAgICAvLyBjbGVhciB0aGUgY2FjaGVkIGdyb3VwXG4gICAgICAgIHRoaXMuX2dyb3VwID0gbnVsbDtcblxuICAgICAgICAvLyBpZiB0aGUgbW91c2UgaXMgb3ZlciBhbmQgaXQgaXMgaW4gYW4gYWxsb3dlZCBncm91cCBlbWl0IHRoZSBkb3AgZXZlbnRcbiAgICAgICAgaWYgKHRoaXMuaXNNb3VzZU92ZXIgJiYgdGhpcy5pc0dyb3VwQWxsb3dlZChldmVudC5ncm91cCkpIHtcbiAgICAgICAgICAgIHRoaXMub25Ecm9wLmVtaXQoZXZlbnQuZGF0YSk7XG4gICAgICAgICAgICB0aGlzLl9kcmFnU2VydmljZS5vbkRyb3AubmV4dChldmVudC5kYXRhKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIC8qKiBEZXRlcm1pbmUgd2hldGhlciBvciBub3QgdGhlIGV2ZW50IGlzIHBhcnQgb2YgdGhlIHNwZWNpZmllZCBncm91cHMgKi9cbiAgICBwcml2YXRlIGlzR3JvdXBBbGxvd2VkKGdyb3VwOiBzdHJpbmcpOiBib29sZWFuIHtcblxuICAgICAgICAvLyBpZiBubyBncm91cCBzcGVjaWZpZWQgYWxsb3cgYWxsIGdyb3Vwc1xuICAgICAgICBpZiAoIXRoaXMuZ3JvdXApIHtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgaXQgaXMgYW4gYXJyYXkgdGhlbiBlbnN1cmUgaXQgaXMgYWxsb3dlZFxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheSh0aGlzLmdyb3VwKSkge1xuICAgICAgICAgICAgcmV0dXJuICEhdGhpcy5ncm91cC5maW5kKF9ncm91cCA9PiBfZ3JvdXAgPT09IGdyb3VwKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmdyb3VwID09PSBncm91cDtcbiAgICB9XG59Il19