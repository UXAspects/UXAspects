/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
var HoverActionService = (function () {
    function HoverActionService() {
        this.active = new BehaviorSubject(false);
        this._focused = false;
        this._hovered = false;
        this._actions = [];
    }
    /**
     * @param {?} action
     * @return {?}
     */
    HoverActionService.prototype.register = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this._actions.push(action);
    };
    /**
     * @param {?} action
     * @return {?}
     */
    HoverActionService.prototype.unregister = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        this._actions = this._actions.filter(function (actn) { return actn !== action; });
    };
    /**
     * @param {?} container
     * @return {?}
     */
    HoverActionService.prototype.setContainer = /**
     * @param {?} container
     * @return {?}
     */
    function (container) {
        this._container = container;
    };
    /**
     * @param {?} focus
     * @return {?}
     */
    HoverActionService.prototype.setFocusState = /**
     * @param {?} focus
     * @return {?}
     */
    function (focus) {
        this._focused = focus;
        this.updateVisibility();
    };
    /**
     * @param {?} hover
     * @return {?}
     */
    HoverActionService.prototype.setHoverState = /**
     * @param {?} hover
     * @return {?}
     */
    function (hover) {
        this._hovered = hover;
        this.updateVisibility();
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.next = /**
     * @return {?}
     */
    function () {
        // if container has focus then focus the first hover action
        if (this.containerHasFocus()) {
            this.focusActionAtIndex(0);
            return this.updateVisibility();
        }
        // if a hover action has focus then focus the next action
        if (this.actionHasFocus()) {
            var /** @type {?} */ index = this.getFocusedActionIndex() + 1;
            this.focusActionAtIndex(index);
            this.updateVisibility();
        }
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.previous = /**
     * @return {?}
     */
    function () {
        // if a hover action has focus then focus the previous action
        if (this.actionHasFocus()) {
            var /** @type {?} */ index = this.getFocusedActionIndex() - 1;
            if (index >= 0) {
                this.focusActionAtIndex(index);
            }
            else {
                this._container.focus();
            }
        }
        this.updateVisibility();
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.updateVisibility = /**
     * @return {?}
     */
    function () {
        this.active.next(this._focused || this._hovered || this.actionHasFocus());
    };
    /**
     * @param {?} index
     * @return {?}
     */
    HoverActionService.prototype.focusActionAtIndex = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (index >= 0 && index < this._actions.length) {
            this._actions[index].focus();
        }
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.getFocusedActionIndex = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this._actions.findIndex(function (action) { return action === _this.getFocusedAction(); });
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.containerHasFocus = /**
     * @return {?}
     */
    function () {
        return this._focused;
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.actionHasFocus = /**
     * @return {?}
     */
    function () {
        return !!this.getFocusedAction();
    };
    /**
     * @return {?}
     */
    HoverActionService.prototype.getFocusedAction = /**
     * @return {?}
     */
    function () {
        return this._actions.find(function (action) { return action.focused; });
    };
    HoverActionService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    HoverActionService.ctorParameters = function () { return []; };
    return HoverActionService;
}());
export { HoverActionService };
function HoverActionService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    HoverActionService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    HoverActionService.ctorParameters;
    /** @type {?} */
    HoverActionService.prototype.active;
    /** @type {?} */
    HoverActionService.prototype._container;
    /** @type {?} */
    HoverActionService.prototype._focused;
    /** @type {?} */
    HoverActionService.prototype._hovered;
    /** @type {?} */
    HoverActionService.prototype._actions;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXItYWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9ob3Zlci1hY3Rpb24vaG92ZXItYWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7c0JBT2hCLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzt3QkFHMUMsS0FBSzt3QkFDTCxLQUFLO3dCQUNVLEVBQUU7Ozs7OztJQUU3QyxxQ0FBUTs7OztJQUFSLFVBQVMsTUFBNEI7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDOUI7Ozs7O0lBRUQsdUNBQVU7Ozs7SUFBVixVQUFXLE1BQTRCO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLEtBQUssTUFBTSxFQUFmLENBQWUsQ0FBQyxDQUFDO0tBQ2pFOzs7OztJQUVELHlDQUFZOzs7O0lBQVosVUFBYSxTQUF3QztRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztLQUMvQjs7Ozs7SUFFRCwwQ0FBYTs7OztJQUFiLFVBQWMsS0FBYztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztLQUMzQjs7Ozs7SUFFRCwwQ0FBYTs7OztJQUFiLFVBQWMsS0FBYztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztLQUMzQjs7OztJQUVELGlDQUFJOzs7SUFBSjs7UUFHSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUNsQzs7UUFHRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLHFCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQzNCO0tBQ0o7Ozs7SUFFRCxxQ0FBUTs7O0lBQVI7O1FBRUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QixxQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTdDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDM0I7U0FDSjtRQUVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0tBQzNCOzs7O0lBRUQsNkNBQWdCOzs7SUFBaEI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7S0FDN0U7Ozs7O0lBRU8sK0NBQWtCOzs7O2NBQUMsS0FBYTtRQUNwQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQzs7Ozs7SUFHRyxrREFBcUI7Ozs7O1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sS0FBSyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDOzs7OztJQUd6RSw4Q0FBaUI7Ozs7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7O0lBR2pCLDJDQUFjOzs7O1FBQ2xCLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Ozs7O0lBRzdCLDZDQUFnQjs7OztRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsT0FBTyxFQUFkLENBQWMsQ0FBQyxDQUFDOzs7Z0JBdEYzRCxVQUFVOzs7OzZCQUxYOztTQU1hLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IEhvdmVyQWN0aW9uQ29udGFpbmVyRGlyZWN0aXZlIH0gZnJvbSAnLi9ob3Zlci1hY3Rpb24tY29udGFpbmVyLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBIb3ZlckFjdGlvbkRpcmVjdGl2ZSB9IGZyb20gJy4vaG92ZXItYWN0aW9uLmRpcmVjdGl2ZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBIb3ZlckFjdGlvblNlcnZpY2Uge1xuXG4gICAgYWN0aXZlOiBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcblxuICAgIHByaXZhdGUgX2NvbnRhaW5lcjogSG92ZXJBY3Rpb25Db250YWluZXJEaXJlY3RpdmU7XG4gICAgcHJpdmF0ZSBfZm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2hvdmVyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9hY3Rpb25zOiBIb3ZlckFjdGlvbkRpcmVjdGl2ZVtdID0gW107XG5cbiAgICByZWdpc3RlcihhY3Rpb246IEhvdmVyQWN0aW9uRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2FjdGlvbnMucHVzaChhY3Rpb24pO1xuICAgIH1cblxuICAgIHVucmVnaXN0ZXIoYWN0aW9uOiBIb3ZlckFjdGlvbkRpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9hY3Rpb25zID0gdGhpcy5fYWN0aW9ucy5maWx0ZXIoYWN0biA9PiBhY3RuICE9PSBhY3Rpb24pO1xuICAgIH1cblxuICAgIHNldENvbnRhaW5lcihjb250YWluZXI6IEhvdmVyQWN0aW9uQ29udGFpbmVyRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2NvbnRhaW5lciA9IGNvbnRhaW5lcjtcbiAgICB9XG5cbiAgICBzZXRGb2N1c1N0YXRlKGZvY3VzOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2ZvY3VzZWQgPSBmb2N1cztcbiAgICAgICAgdGhpcy51cGRhdGVWaXNpYmlsaXR5KCk7XG4gICAgfVxuXG4gICAgc2V0SG92ZXJTdGF0ZShob3ZlcjogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLl9ob3ZlcmVkID0gaG92ZXI7XG4gICAgICAgIHRoaXMudXBkYXRlVmlzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIG5leHQoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgY29udGFpbmVyIGhhcyBmb2N1cyB0aGVuIGZvY3VzIHRoZSBmaXJzdCBob3ZlciBhY3Rpb25cbiAgICAgICAgaWYgKHRoaXMuY29udGFpbmVySGFzRm9jdXMoKSkge1xuICAgICAgICAgICAgdGhpcy5mb2N1c0FjdGlvbkF0SW5kZXgoMCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy51cGRhdGVWaXNpYmlsaXR5KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpZiBhIGhvdmVyIGFjdGlvbiBoYXMgZm9jdXMgdGhlbiBmb2N1cyB0aGUgbmV4dCBhY3Rpb25cbiAgICAgICAgaWYgKHRoaXMuYWN0aW9uSGFzRm9jdXMoKSkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nZXRGb2N1c2VkQWN0aW9uSW5kZXgoKSArIDE7XG4gICAgICAgICAgICB0aGlzLmZvY3VzQWN0aW9uQXRJbmRleChpbmRleCk7XG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVZpc2liaWxpdHkoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByZXZpb3VzKCk6IHZvaWQge1xuICAgICAgICAvLyBpZiBhIGhvdmVyIGFjdGlvbiBoYXMgZm9jdXMgdGhlbiBmb2N1cyB0aGUgcHJldmlvdXMgYWN0aW9uXG4gICAgICAgIGlmICh0aGlzLmFjdGlvbkhhc0ZvY3VzKCkpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0Rm9jdXNlZEFjdGlvbkluZGV4KCkgLSAxO1xuXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gMCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZm9jdXNBY3Rpb25BdEluZGV4KGluZGV4KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fY29udGFpbmVyLmZvY3VzKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnVwZGF0ZVZpc2liaWxpdHkoKTtcbiAgICB9XG5cbiAgICB1cGRhdGVWaXNpYmlsaXR5KCk6IHZvaWQge1xuICAgICAgICB0aGlzLmFjdGl2ZS5uZXh0KHRoaXMuX2ZvY3VzZWQgfHwgdGhpcy5faG92ZXJlZCB8fCB0aGlzLmFjdGlvbkhhc0ZvY3VzKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZm9jdXNBY3Rpb25BdEluZGV4KGluZGV4OiBudW1iZXIpOiB2b2lkIHtcbiAgICAgICAgaWYgKGluZGV4ID49IDAgJiYgaW5kZXggPCB0aGlzLl9hY3Rpb25zLmxlbmd0aCkge1xuICAgICAgICAgICAgdGhpcy5fYWN0aW9uc1tpbmRleF0uZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Rm9jdXNlZEFjdGlvbkluZGV4KCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3Rpb25zLmZpbmRJbmRleChhY3Rpb24gPT4gYWN0aW9uID09PSB0aGlzLmdldEZvY3VzZWRBY3Rpb24oKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBjb250YWluZXJIYXNGb2N1cygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2ZvY3VzZWQ7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBhY3Rpb25IYXNGb2N1cygpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICEhdGhpcy5nZXRGb2N1c2VkQWN0aW9uKCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRGb2N1c2VkQWN0aW9uKCk6IEhvdmVyQWN0aW9uRGlyZWN0aXZlIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGlvbnMuZmluZChhY3Rpb24gPT4gYWN0aW9uLmZvY3VzZWQpO1xuICAgIH1cbn0iXX0=