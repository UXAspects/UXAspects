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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXItYWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9ob3Zlci1hY3Rpb24vaG92ZXItYWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7c0JBT2hCLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzt3QkFHMUMsS0FBSzt3QkFDTCxLQUFLO3dCQUNVLEVBQUU7Ozs7OztJQUU3QyxxQ0FBUTs7OztJQUFSLFVBQVMsTUFBNEI7UUFDakMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7S0FDOUI7Ozs7O0lBRUQsdUNBQVU7Ozs7SUFBVixVQUFXLE1BQTRCO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsVUFBQSxJQUFJLElBQUksT0FBQSxJQUFJLEtBQUssTUFBTSxFQUFmLENBQWUsQ0FBQyxDQUFDO0tBQ2pFOzs7OztJQUVELHlDQUFZOzs7O0lBQVosVUFBYSxTQUF3QztRQUNqRCxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQztLQUMvQjs7Ozs7SUFFRCwwQ0FBYTs7OztJQUFiLFVBQWMsS0FBYztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztLQUMzQjs7Ozs7SUFFRCwwQ0FBYTs7OztJQUFiLFVBQWMsS0FBYztRQUN4QixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztRQUN0QixJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztLQUMzQjs7OztJQUVELGlDQUFJOzs7SUFBSjs7UUFHSSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUNsQzs7UUFHRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLHFCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQzNCO0tBQ0o7Ozs7SUFFRCxxQ0FBUTs7O0lBQVI7O1FBRUksRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUMsQ0FBQztZQUN4QixxQkFBSSxLQUFLLEdBQUcsSUFBSSxDQUFDLHFCQUFxQixFQUFFLEdBQUcsQ0FBQyxDQUFDO1lBRTdDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNiLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUNsQztZQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNKLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7YUFDM0I7U0FDSjtRQUVELElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0tBQzNCOzs7O0lBRUQsNkNBQWdCOzs7SUFBaEI7UUFDSSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDLENBQUM7S0FDN0U7Ozs7O0lBRU8sK0NBQWtCOzs7O2NBQUMsS0FBYTtRQUNwQyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxJQUFJLEtBQUssR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNoQzs7Ozs7SUFHRyxrREFBcUI7Ozs7O1FBQ3pCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU0sSUFBSSxPQUFBLE1BQU0sS0FBSyxLQUFJLENBQUMsZ0JBQWdCLEVBQUUsRUFBbEMsQ0FBa0MsQ0FBQyxDQUFDOzs7OztJQUd6RSw4Q0FBaUI7Ozs7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7O0lBR2pCLDJDQUFjOzs7O1FBQ2xCLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7Ozs7O0lBRzdCLDZDQUFnQjs7OztRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxNQUFNLENBQUMsT0FBTyxFQUFkLENBQWMsQ0FBQyxDQUFDOzs7Z0JBdEYzRCxVQUFVOzs2QkFMWDs7U0FNYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCZWhhdmlvclN1YmplY3QgfSBmcm9tICdyeGpzL0JlaGF2aW9yU3ViamVjdCc7XG5pbXBvcnQgeyBIb3ZlckFjdGlvbkNvbnRhaW5lckRpcmVjdGl2ZSB9IGZyb20gJy4vaG92ZXItYWN0aW9uLWNvbnRhaW5lci5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgSG92ZXJBY3Rpb25EaXJlY3RpdmUgfSBmcm9tICcuL2hvdmVyLWFjdGlvbi5kaXJlY3RpdmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSG92ZXJBY3Rpb25TZXJ2aWNlIHtcblxuICAgIGFjdGl2ZTogQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG5cbiAgICBwcml2YXRlIF9jb250YWluZXI6IEhvdmVyQWN0aW9uQ29udGFpbmVyRGlyZWN0aXZlO1xuICAgIHByaXZhdGUgX2ZvY3VzZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgICBwcml2YXRlIF9ob3ZlcmVkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfYWN0aW9uczogSG92ZXJBY3Rpb25EaXJlY3RpdmVbXSA9IFtdO1xuXG4gICAgcmVnaXN0ZXIoYWN0aW9uOiBIb3ZlckFjdGlvbkRpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9hY3Rpb25zLnB1c2goYWN0aW9uKTtcbiAgICB9XG5cbiAgICB1bnJlZ2lzdGVyKGFjdGlvbjogSG92ZXJBY3Rpb25EaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fYWN0aW9ucyA9IHRoaXMuX2FjdGlvbnMuZmlsdGVyKGFjdG4gPT4gYWN0biAhPT0gYWN0aW9uKTtcbiAgICB9XG5cbiAgICBzZXRDb250YWluZXIoY29udGFpbmVyOiBIb3ZlckFjdGlvbkNvbnRhaW5lckRpcmVjdGl2ZSk6IHZvaWQge1xuICAgICAgICB0aGlzLl9jb250YWluZXIgPSBjb250YWluZXI7XG4gICAgfVxuXG4gICAgc2V0Rm9jdXNTdGF0ZShmb2N1czogYm9vbGVhbik6IHZvaWQge1xuICAgICAgICB0aGlzLl9mb2N1c2VkID0gZm9jdXM7XG4gICAgICAgIHRoaXMudXBkYXRlVmlzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIHNldEhvdmVyU3RhdGUoaG92ZXI6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5faG92ZXJlZCA9IGhvdmVyO1xuICAgICAgICB0aGlzLnVwZGF0ZVZpc2liaWxpdHkoKTtcbiAgICB9XG5cbiAgICBuZXh0KCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGlmIGNvbnRhaW5lciBoYXMgZm9jdXMgdGhlbiBmb2N1cyB0aGUgZmlyc3QgaG92ZXIgYWN0aW9uXG4gICAgICAgIGlmICh0aGlzLmNvbnRhaW5lckhhc0ZvY3VzKCkpIHtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNBY3Rpb25BdEluZGV4KDApO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudXBkYXRlVmlzaWJpbGl0eSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaWYgYSBob3ZlciBhY3Rpb24gaGFzIGZvY3VzIHRoZW4gZm9jdXMgdGhlIG5leHQgYWN0aW9uXG4gICAgICAgIGlmICh0aGlzLmFjdGlvbkhhc0ZvY3VzKCkpIHtcbiAgICAgICAgICAgIGxldCBpbmRleCA9IHRoaXMuZ2V0Rm9jdXNlZEFjdGlvbkluZGV4KCkgKyAxO1xuICAgICAgICAgICAgdGhpcy5mb2N1c0FjdGlvbkF0SW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgdGhpcy51cGRhdGVWaXNpYmlsaXR5KCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcmV2aW91cygpOiB2b2lkIHtcbiAgICAgICAgLy8gaWYgYSBob3ZlciBhY3Rpb24gaGFzIGZvY3VzIHRoZW4gZm9jdXMgdGhlIHByZXZpb3VzIGFjdGlvblxuICAgICAgICBpZiAodGhpcy5hY3Rpb25IYXNGb2N1cygpKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldEZvY3VzZWRBY3Rpb25JbmRleCgpIC0gMTtcblxuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZvY3VzQWN0aW9uQXRJbmRleChpbmRleCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRoaXMuX2NvbnRhaW5lci5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy51cGRhdGVWaXNpYmlsaXR5KCk7XG4gICAgfVxuXG4gICAgdXBkYXRlVmlzaWJpbGl0eSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5hY3RpdmUubmV4dCh0aGlzLl9mb2N1c2VkIHx8IHRoaXMuX2hvdmVyZWQgfHwgdGhpcy5hY3Rpb25IYXNGb2N1cygpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGZvY3VzQWN0aW9uQXRJbmRleChpbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgICAgIGlmIChpbmRleCA+PSAwICYmIGluZGV4IDwgdGhpcy5fYWN0aW9ucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHRoaXMuX2FjdGlvbnNbaW5kZXhdLmZvY3VzKCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEZvY3VzZWRBY3Rpb25JbmRleCgpOiBudW1iZXIge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aW9ucy5maW5kSW5kZXgoYWN0aW9uID0+IGFjdGlvbiA9PT0gdGhpcy5nZXRGb2N1c2VkQWN0aW9uKCkpO1xuICAgIH1cblxuICAgIHByaXZhdGUgY29udGFpbmVySGFzRm9jdXMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9mb2N1c2VkO1xuICAgIH1cblxuICAgIHByaXZhdGUgYWN0aW9uSGFzRm9jdXMoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiAhIXRoaXMuZ2V0Rm9jdXNlZEFjdGlvbigpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Rm9jdXNlZEFjdGlvbigpOiBIb3ZlckFjdGlvbkRpcmVjdGl2ZSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9hY3Rpb25zLmZpbmQoYWN0aW9uID0+IGFjdGlvbi5mb2N1c2VkKTtcbiAgICB9XG59Il19