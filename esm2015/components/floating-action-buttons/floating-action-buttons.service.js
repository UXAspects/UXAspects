/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
export class FloatingActionButtonsService {
    constructor() {
        this.open$ = new BehaviorSubject(false);
        this.direction$ = new BehaviorSubject('top');
    }
    /**
     * @return {?}
     */
    open() {
        this.open$.next(true);
    }
    /**
     * @return {?}
     */
    toggle() {
        this.open$.next(!this.open$.getValue());
    }
    /**
     * @return {?}
     */
    close() {
        this.open$.next(false);
        // make the first button tabbable again
        this.setPrimaryButtonFocusable();
    }
    /**
     * @return {?}
     */
    isHorizontal() {
        return this.direction$.value === 'left' || this.direction$.value === 'right';
    }
    /**
     * @return {?}
     */
    isVertical() {
        return this.direction$.value === 'top' || this.direction$.value === 'bottom';
    }
    /**
     * @param {?} buttons
     * @return {?}
     */
    setButtons(buttons) {
        this._buttons = buttons;
        // make the first button tabbable
        this.setPrimaryButtonFocusable();
    }
    /**
     * Make only the first button tabbable
     * @return {?}
     */
    setPrimaryButtonFocusable() {
        this._buttons.forEach(btn => btn.tabindex$.next(btn.primary ? 0 : -1));
    }
    /**
     * @return {?}
     */
    focusPrimaryButton() {
        this.focus(this._buttons.find(btn => btn.primary));
    }
    /**
     * @param {?} button
     * @return {?}
     */
    focus(button) {
        // if the button is not defined then do nothing
        if (!button) {
            return;
        }
        // set the button tab index
        this._buttons.forEach(btn => btn.tabindex$.next(button === btn ? 0 : -1));
        // apply the focus
        button.focus();
    }
    /**
     * @param {?} next
     * @return {?}
     */
    focusSibling(next) {
        // if the buttons are not visible then do nothing
        if (this.open$.value === false) {
            return;
        }
        // get the current focused item
        const /** @type {?} */ button = this.getFocusedButton();
        if (next && button === this._buttons.last) {
            return this.focus(this._buttons.first);
        }
        else if (!next && button === this._buttons.first) {
            return this.focus(this._buttons.last);
        }
        // find the sibling button
        const /** @type {?} */ sibling = this._buttons.toArray()[this.getButtonIndex(button) + (next ? 1 : -1)];
        // focus the next button
        this.focus(sibling);
    }
    /**
     * @return {?}
     */
    getFocusedButton() {
        return this._buttons.find(btn => btn.tabindex$.value === 0);
    }
    /**
     * @param {?} button
     * @return {?}
     */
    getButtonIndex(button) {
        return this._buttons.toArray().findIndex(btn => btn === button);
    }
}
FloatingActionButtonsService.decorators = [
    { type: Injectable }
];
function FloatingActionButtonsService_tsickle_Closure_declarations() {
    /** @type {?} */
    FloatingActionButtonsService.prototype.open$;
    /** @type {?} */
    FloatingActionButtonsService.prototype.direction$;
    /** @type {?} */
    FloatingActionButtonsService.prototype._buttons;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2Zsb2F0aW5nLWFjdGlvbi1idXR0b25zL2Zsb2F0aW5nLWFjdGlvbi1idXR0b25zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBSXZELE1BQU07O3FCQUVNLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzswQkFDOUIsSUFBSSxlQUFlLENBQWdDLEtBQUssQ0FBQzs7Ozs7SUFJdEUsSUFBSTtRQUNBLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3pCOzs7O0lBRUQsTUFBTTtRQUNGLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO0tBQzNDOzs7O0lBRUQsS0FBSztRQUNELElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUd2QixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztLQUNwQzs7OztJQUVELFlBQVk7UUFDUixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssTUFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLE9BQU8sQ0FBQztLQUNoRjs7OztJQUVELFVBQVU7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssS0FBSyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLFFBQVEsQ0FBQztLQUNoRjs7Ozs7SUFFRCxVQUFVLENBQUMsT0FBaUQ7UUFDeEQsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7O1FBR3hCLElBQUksQ0FBQyx5QkFBeUIsRUFBRSxDQUFDO0tBQ3BDOzs7OztJQUdELHlCQUF5QjtRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzFFOzs7O0lBRUQsa0JBQWtCO1FBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO0tBQ3REOzs7OztJQUVELEtBQUssQ0FBQyxNQUFxQzs7UUFHdkMsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ1YsTUFBTSxDQUFDO1NBQ1Y7O1FBR0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFHMUUsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO0tBQ2xCOzs7OztJQUVELFlBQVksQ0FBQyxJQUFhOztRQUd0QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQzdCLE1BQU0sQ0FBQztTQUNWOztRQUdELHVCQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztRQUV2QyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksTUFBTSxLQUFLLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUN4QyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzFDO1FBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUN6Qzs7UUFHRCx1QkFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzs7UUFHdkYsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUN2Qjs7OztJQUVPLGdCQUFnQjtRQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQzs7Ozs7O0lBR3hELGNBQWMsQ0FBQyxNQUFxQztRQUN4RCxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssTUFBTSxDQUFDLENBQUM7Ozs7WUF6RnZFLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBRdWVyeUxpc3QgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCB9IGZyb20gJ3J4anMvQmVoYXZpb3JTdWJqZWN0JztcbmltcG9ydCB7IEZsb2F0aW5nQWN0aW9uQnV0dG9uQ29tcG9uZW50IH0gZnJvbSAnLi9mbG9hdGluZy1hY3Rpb24tYnV0dG9uLmNvbXBvbmVudCc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBGbG9hdGluZ0FjdGlvbkJ1dHRvbnNTZXJ2aWNlIHtcblxuICAgIG9wZW4kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxib29sZWFuPihmYWxzZSk7XG4gICAgZGlyZWN0aW9uJCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8RmxvYXRpbmdBY3Rpb25CdXR0b25EaXJlY3Rpb24+KCd0b3AnKTtcblxuICAgIHByaXZhdGUgX2J1dHRvbnM6IFF1ZXJ5TGlzdDxGbG9hdGluZ0FjdGlvbkJ1dHRvbkNvbXBvbmVudD47XG5cbiAgICBvcGVuKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9wZW4kLm5leHQodHJ1ZSk7XG4gICAgfVxuXG4gICAgdG9nZ2xlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLm9wZW4kLm5leHQoIXRoaXMub3BlbiQuZ2V0VmFsdWUoKSk7XG4gICAgfVxuXG4gICAgY2xvc2UoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3BlbiQubmV4dChmYWxzZSk7XG5cbiAgICAgICAgLy8gbWFrZSB0aGUgZmlyc3QgYnV0dG9uIHRhYmJhYmxlIGFnYWluXG4gICAgICAgIHRoaXMuc2V0UHJpbWFyeUJ1dHRvbkZvY3VzYWJsZSgpO1xuICAgIH1cblxuICAgIGlzSG9yaXpvbnRhbCgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuZGlyZWN0aW9uJC52YWx1ZSA9PT0gJ2xlZnQnIHx8IHRoaXMuZGlyZWN0aW9uJC52YWx1ZSA9PT0gJ3JpZ2h0JztcbiAgICB9XG5cbiAgICBpc1ZlcnRpY2FsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb24kLnZhbHVlID09PSAndG9wJyB8fCB0aGlzLmRpcmVjdGlvbiQudmFsdWUgPT09ICdib3R0b20nO1xuICAgIH1cblxuICAgIHNldEJ1dHRvbnMoYnV0dG9uczogUXVlcnlMaXN0PEZsb2F0aW5nQWN0aW9uQnV0dG9uQ29tcG9uZW50Pik6IHZvaWQge1xuICAgICAgICB0aGlzLl9idXR0b25zID0gYnV0dG9ucztcblxuICAgICAgICAvLyBtYWtlIHRoZSBmaXJzdCBidXR0b24gdGFiYmFibGVcbiAgICAgICAgdGhpcy5zZXRQcmltYXJ5QnV0dG9uRm9jdXNhYmxlKCk7XG4gICAgfVxuXG4gICAgLyoqIE1ha2Ugb25seSB0aGUgZmlyc3QgYnV0dG9uIHRhYmJhYmxlICovXG4gICAgc2V0UHJpbWFyeUJ1dHRvbkZvY3VzYWJsZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fYnV0dG9ucy5mb3JFYWNoKGJ0biA9PiBidG4udGFiaW5kZXgkLm5leHQoYnRuLnByaW1hcnkgPyAwIDogLTEpKTtcbiAgICB9XG5cbiAgICBmb2N1c1ByaW1hcnlCdXR0b24oKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZm9jdXModGhpcy5fYnV0dG9ucy5maW5kKGJ0biA9PiBidG4ucHJpbWFyeSkpO1xuICAgIH1cblxuICAgIGZvY3VzKGJ1dHRvbjogRmxvYXRpbmdBY3Rpb25CdXR0b25Db21wb25lbnQpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiB0aGUgYnV0dG9uIGlzIG5vdCBkZWZpbmVkIHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAoIWJ1dHRvbikge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gc2V0IHRoZSBidXR0b24gdGFiIGluZGV4XG4gICAgICAgIHRoaXMuX2J1dHRvbnMuZm9yRWFjaChidG4gPT4gYnRuLnRhYmluZGV4JC5uZXh0KGJ1dHRvbiA9PT0gYnRuID8gMCA6IC0xKSk7XG5cbiAgICAgICAgLy8gYXBwbHkgdGhlIGZvY3VzXG4gICAgICAgIGJ1dHRvbi5mb2N1cygpO1xuICAgIH1cblxuICAgIGZvY3VzU2libGluZyhuZXh0OiBib29sZWFuKTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgdGhlIGJ1dHRvbnMgYXJlIG5vdCB2aXNpYmxlIHRoZW4gZG8gbm90aGluZ1xuICAgICAgICBpZiAodGhpcy5vcGVuJC52YWx1ZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGdldCB0aGUgY3VycmVudCBmb2N1c2VkIGl0ZW1cbiAgICAgICAgY29uc3QgYnV0dG9uID0gdGhpcy5nZXRGb2N1c2VkQnV0dG9uKCk7XG5cbiAgICAgICAgaWYgKG5leHQgJiYgYnV0dG9uID09PSB0aGlzLl9idXR0b25zLmxhc3QpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvY3VzKHRoaXMuX2J1dHRvbnMuZmlyc3QpO1xuICAgICAgICB9IGVsc2UgaWYgKCFuZXh0ICYmIGJ1dHRvbiA9PT0gdGhpcy5fYnV0dG9ucy5maXJzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXModGhpcy5fYnV0dG9ucy5sYXN0KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGZpbmQgdGhlIHNpYmxpbmcgYnV0dG9uXG4gICAgICAgIGNvbnN0IHNpYmxpbmcgPSB0aGlzLl9idXR0b25zLnRvQXJyYXkoKVt0aGlzLmdldEJ1dHRvbkluZGV4KGJ1dHRvbikgKyAobmV4dCA/IDEgOiAtMSldO1xuXG4gICAgICAgIC8vIGZvY3VzIHRoZSBuZXh0IGJ1dHRvblxuICAgICAgICB0aGlzLmZvY3VzKHNpYmxpbmcpO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0Rm9jdXNlZEJ1dHRvbigpOiBGbG9hdGluZ0FjdGlvbkJ1dHRvbkNvbXBvbmVudCB7XG4gICAgICAgIHJldHVybiB0aGlzLl9idXR0b25zLmZpbmQoYnRuID0+IGJ0bi50YWJpbmRleCQudmFsdWUgPT09IDApO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0QnV0dG9uSW5kZXgoYnV0dG9uOiBGbG9hdGluZ0FjdGlvbkJ1dHRvbkNvbXBvbmVudCk6IG51bWJlciB7XG4gICAgICAgIHJldHVybiB0aGlzLl9idXR0b25zLnRvQXJyYXkoKS5maW5kSW5kZXgoYnRuID0+IGJ0biA9PT0gYnV0dG9uKTtcbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIEZsb2F0aW5nQWN0aW9uQnV0dG9uRGlyZWN0aW9uID0gJ3RvcCcgfCAncmlnaHQnIHwgJ2JvdHRvbScgfCAnbGVmdCc7XG4iXX0=