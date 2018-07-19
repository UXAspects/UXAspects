/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export class HoverActionService {
    constructor() {
        this.active = new BehaviorSubject(false);
        this._focused = false;
        this._hovered = false;
        this._actions = [];
    }
    /**
     * @param {?} action
     * @return {?}
     */
    register(action) {
        this._actions.push(action);
    }
    /**
     * @param {?} action
     * @return {?}
     */
    unregister(action) {
        this._actions = this._actions.filter(actn => actn !== action);
    }
    /**
     * @param {?} container
     * @return {?}
     */
    setContainer(container) {
        this._container = container;
    }
    /**
     * @param {?} focus
     * @return {?}
     */
    setFocusState(focus) {
        this._focused = focus;
        this.updateVisibility();
    }
    /**
     * @param {?} hover
     * @return {?}
     */
    setHoverState(hover) {
        this._hovered = hover;
        this.updateVisibility();
    }
    /**
     * @return {?}
     */
    next() {
        // if container has focus then focus the first hover action
        if (this.containerHasFocus()) {
            this.focusActionAtIndex(0);
            return this.updateVisibility();
        }
        // if a hover action has focus then focus the next action
        if (this.actionHasFocus()) {
            let /** @type {?} */ index = this.getFocusedActionIndex() + 1;
            this.focusActionAtIndex(index);
            this.updateVisibility();
        }
    }
    /**
     * @return {?}
     */
    previous() {
        // if a hover action has focus then focus the previous action
        if (this.actionHasFocus()) {
            let /** @type {?} */ index = this.getFocusedActionIndex() - 1;
            if (index >= 0) {
                this.focusActionAtIndex(index);
            }
            else {
                this._container.focus();
            }
        }
        this.updateVisibility();
    }
    /**
     * @return {?}
     */
    updateVisibility() {
        this.active.next(this._focused || this._hovered || this.actionHasFocus());
    }
    /**
     * @param {?} index
     * @return {?}
     */
    focusActionAtIndex(index) {
        if (index >= 0 && index < this._actions.length) {
            this._actions[index].focus();
        }
    }
    /**
     * @return {?}
     */
    getFocusedActionIndex() {
        return this._actions.findIndex(action => action === this.getFocusedAction());
    }
    /**
     * @return {?}
     */
    containerHasFocus() {
        return this._focused;
    }
    /**
     * @return {?}
     */
    actionHasFocus() {
        return !!this.getFocusedAction();
    }
    /**
     * @return {?}
     */
    getFocusedAction() {
        return this._actions.find(action => action.focused);
    }
}
HoverActionService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
HoverActionService.ctorParameters = () => [];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaG92ZXItYWN0aW9uLnNlcnZpY2UuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9ob3Zlci1hY3Rpb24vaG92ZXItYWN0aW9uLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBS3ZELE1BQU07O3NCQUVpQyxJQUFJLGVBQWUsQ0FBVSxLQUFLLENBQUM7d0JBRzFDLEtBQUs7d0JBQ0wsS0FBSzt3QkFDVSxFQUFFOzs7Ozs7SUFFN0MsUUFBUSxDQUFDLE1BQTRCO1FBQ2pDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQzlCOzs7OztJQUVELFVBQVUsQ0FBQyxNQUE0QjtRQUNuQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssTUFBTSxDQUFDLENBQUM7S0FDakU7Ozs7O0lBRUQsWUFBWSxDQUFDLFNBQXdDO1FBQ2pELElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDO0tBQy9COzs7OztJQUVELGFBQWEsQ0FBQyxLQUFjO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0tBQzNCOzs7OztJQUVELGFBQWEsQ0FBQyxLQUFjO1FBQ3hCLElBQUksQ0FBQyxRQUFRLEdBQUcsS0FBSyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0tBQzNCOzs7O0lBRUQsSUFBSTs7UUFHQSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzNCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztTQUNsQzs7UUFHRCxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLHFCQUFJLEtBQUssR0FBRyxJQUFJLENBQUMscUJBQXFCLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFDN0MsSUFBSSxDQUFDLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQy9CLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1NBQzNCO0tBQ0o7Ozs7SUFFRCxRQUFROztRQUVKLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQyxDQUFDLENBQUM7WUFDeEIscUJBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLENBQUMsQ0FBQztZQUU3QyxFQUFFLENBQUMsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDYixJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUM7YUFDbEM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDSixJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO2FBQzNCO1NBQ0o7UUFFRCxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztLQUMzQjs7OztJQUVELGdCQUFnQjtRQUNaLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUMsQ0FBQztLQUM3RTs7Ozs7SUFFTyxrQkFBa0IsQ0FBQyxLQUFhO1FBQ3BDLEVBQUUsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLElBQUksS0FBSyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztZQUM3QyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ2hDOzs7OztJQUdHLHFCQUFxQjtRQUN6QixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsTUFBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDOzs7OztJQUd6RSxpQkFBaUI7UUFDckIsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUM7Ozs7O0lBR2pCLGNBQWM7UUFDbEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQzs7Ozs7SUFHN0IsZ0JBQWdCO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDOzs7O1lBdEYzRCxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgSG92ZXJBY3Rpb25Db250YWluZXJEaXJlY3RpdmUgfSBmcm9tICcuL2hvdmVyLWFjdGlvbi1jb250YWluZXIuZGlyZWN0aXZlJztcbmltcG9ydCB7IEhvdmVyQWN0aW9uRGlyZWN0aXZlIH0gZnJvbSAnLi9ob3Zlci1hY3Rpb24uZGlyZWN0aXZlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEhvdmVyQWN0aW9uU2VydmljZSB7XG5cbiAgICBhY3RpdmU6IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Ym9vbGVhbj4oZmFsc2UpO1xuXG4gICAgcHJpdmF0ZSBfY29udGFpbmVyOiBIb3ZlckFjdGlvbkNvbnRhaW5lckRpcmVjdGl2ZTtcbiAgICBwcml2YXRlIF9mb2N1c2VkOiBib29sZWFuID0gZmFsc2U7XG4gICAgcHJpdmF0ZSBfaG92ZXJlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIHByaXZhdGUgX2FjdGlvbnM6IEhvdmVyQWN0aW9uRGlyZWN0aXZlW10gPSBbXTtcblxuICAgIHJlZ2lzdGVyKGFjdGlvbjogSG92ZXJBY3Rpb25EaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fYWN0aW9ucy5wdXNoKGFjdGlvbik7XG4gICAgfVxuXG4gICAgdW5yZWdpc3RlcihhY3Rpb246IEhvdmVyQWN0aW9uRGlyZWN0aXZlKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2FjdGlvbnMgPSB0aGlzLl9hY3Rpb25zLmZpbHRlcihhY3RuID0+IGFjdG4gIT09IGFjdGlvbik7XG4gICAgfVxuXG4gICAgc2V0Q29udGFpbmVyKGNvbnRhaW5lcjogSG92ZXJBY3Rpb25Db250YWluZXJEaXJlY3RpdmUpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fY29udGFpbmVyID0gY29udGFpbmVyO1xuICAgIH1cblxuICAgIHNldEZvY3VzU3RhdGUoZm9jdXM6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZm9jdXNlZCA9IGZvY3VzO1xuICAgICAgICB0aGlzLnVwZGF0ZVZpc2liaWxpdHkoKTtcbiAgICB9XG5cbiAgICBzZXRIb3ZlclN0YXRlKGhvdmVyOiBib29sZWFuKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2hvdmVyZWQgPSBob3ZlcjtcbiAgICAgICAgdGhpcy51cGRhdGVWaXNpYmlsaXR5KCk7XG4gICAgfVxuXG4gICAgbmV4dCgpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiBjb250YWluZXIgaGFzIGZvY3VzIHRoZW4gZm9jdXMgdGhlIGZpcnN0IGhvdmVyIGFjdGlvblxuICAgICAgICBpZiAodGhpcy5jb250YWluZXJIYXNGb2N1cygpKSB7XG4gICAgICAgICAgICB0aGlzLmZvY3VzQWN0aW9uQXRJbmRleCgwKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVwZGF0ZVZpc2liaWxpdHkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGlmIGEgaG92ZXIgYWN0aW9uIGhhcyBmb2N1cyB0aGVuIGZvY3VzIHRoZSBuZXh0IGFjdGlvblxuICAgICAgICBpZiAodGhpcy5hY3Rpb25IYXNGb2N1cygpKSB7XG4gICAgICAgICAgICBsZXQgaW5kZXggPSB0aGlzLmdldEZvY3VzZWRBY3Rpb25JbmRleCgpICsgMTtcbiAgICAgICAgICAgIHRoaXMuZm9jdXNBY3Rpb25BdEluZGV4KGluZGV4KTtcbiAgICAgICAgICAgIHRoaXMudXBkYXRlVmlzaWJpbGl0eSgpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJldmlvdXMoKTogdm9pZCB7XG4gICAgICAgIC8vIGlmIGEgaG92ZXIgYWN0aW9uIGhhcyBmb2N1cyB0aGVuIGZvY3VzIHRoZSBwcmV2aW91cyBhY3Rpb25cbiAgICAgICAgaWYgKHRoaXMuYWN0aW9uSGFzRm9jdXMoKSkge1xuICAgICAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5nZXRGb2N1c2VkQWN0aW9uSW5kZXgoKSAtIDE7XG5cbiAgICAgICAgICAgIGlmIChpbmRleCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mb2N1c0FjdGlvbkF0SW5kZXgoaW5kZXgpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9jb250YWluZXIuZm9jdXMoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMudXBkYXRlVmlzaWJpbGl0eSgpO1xuICAgIH1cblxuICAgIHVwZGF0ZVZpc2liaWxpdHkoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuYWN0aXZlLm5leHQodGhpcy5fZm9jdXNlZCB8fCB0aGlzLl9ob3ZlcmVkIHx8IHRoaXMuYWN0aW9uSGFzRm9jdXMoKSk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBmb2N1c0FjdGlvbkF0SW5kZXgoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAoaW5kZXggPj0gMCAmJiBpbmRleCA8IHRoaXMuX2FjdGlvbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICB0aGlzLl9hY3Rpb25zW2luZGV4XS5mb2N1cygpO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRGb2N1c2VkQWN0aW9uSW5kZXgoKTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2FjdGlvbnMuZmluZEluZGV4KGFjdGlvbiA9PiBhY3Rpb24gPT09IHRoaXMuZ2V0Rm9jdXNlZEFjdGlvbigpKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGNvbnRhaW5lckhhc0ZvY3VzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fZm9jdXNlZDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGFjdGlvbkhhc0ZvY3VzKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gISF0aGlzLmdldEZvY3VzZWRBY3Rpb24oKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldEZvY3VzZWRBY3Rpb24oKTogSG92ZXJBY3Rpb25EaXJlY3RpdmUge1xuICAgICAgICByZXR1cm4gdGhpcy5fYWN0aW9ucy5maW5kKGFjdGlvbiA9PiBhY3Rpb24uZm9jdXNlZCk7XG4gICAgfVxufSJdfQ==