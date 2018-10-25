/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
var FloatingActionButtonsService = /** @class */ (function () {
    function FloatingActionButtonsService() {
        this.open$ = new BehaviorSubject(false);
        this.direction$ = new BehaviorSubject('top');
    }
    /**
     * @return {?}
     */
    FloatingActionButtonsService.prototype.open = /**
     * @return {?}
     */
    function () {
        this.open$.next(true);
    };
    /**
     * @return {?}
     */
    FloatingActionButtonsService.prototype.toggle = /**
     * @return {?}
     */
    function () {
        this.open$.next(!this.open$.getValue());
    };
    /**
     * @return {?}
     */
    FloatingActionButtonsService.prototype.close = /**
     * @return {?}
     */
    function () {
        this.open$.next(false);
        // make the first button tabbable again
        this.setPrimaryButtonFocusable();
    };
    /**
     * @return {?}
     */
    FloatingActionButtonsService.prototype.isHorizontal = /**
     * @return {?}
     */
    function () {
        return this.direction$.value === 'left' || this.direction$.value === 'right';
    };
    /**
     * @return {?}
     */
    FloatingActionButtonsService.prototype.isVertical = /**
     * @return {?}
     */
    function () {
        return this.direction$.value === 'top' || this.direction$.value === 'bottom';
    };
    /**
     * @param {?} buttons
     * @return {?}
     */
    FloatingActionButtonsService.prototype.setButtons = /**
     * @param {?} buttons
     * @return {?}
     */
    function (buttons) {
        this._buttons = buttons;
        // make the first button tabbable
        this.setPrimaryButtonFocusable();
    };
    /** Make only the first button tabbable */
    /**
     * Make only the first button tabbable
     * @return {?}
     */
    FloatingActionButtonsService.prototype.setPrimaryButtonFocusable = /**
     * Make only the first button tabbable
     * @return {?}
     */
    function () {
        this._buttons.forEach(function (btn) { return btn.tabindex$.next(btn.primary ? 0 : -1); });
    };
    /**
     * @return {?}
     */
    FloatingActionButtonsService.prototype.focusPrimaryButton = /**
     * @return {?}
     */
    function () {
        this.focus(this._buttons.find(function (btn) { return btn.primary; }));
    };
    /**
     * @param {?} button
     * @return {?}
     */
    FloatingActionButtonsService.prototype.focus = /**
     * @param {?} button
     * @return {?}
     */
    function (button) {
        // if the button is not defined then do nothing
        if (!button) {
            return;
        }
        // set the button tab index
        this._buttons.forEach(function (btn) { return btn.tabindex$.next(button === btn ? 0 : -1); });
        // apply the focus
        button.focus();
    };
    /**
     * @param {?} next
     * @return {?}
     */
    FloatingActionButtonsService.prototype.focusSibling = /**
     * @param {?} next
     * @return {?}
     */
    function (next) {
        // if the buttons are not visible then do nothing
        if (this.open$.value === false) {
            return;
        }
        // get the current focused item
        var /** @type {?} */ button = this.getFocusedButton();
        if (next && button === this._buttons.last) {
            return this.focus(this._buttons.first);
        }
        else if (!next && button === this._buttons.first) {
            return this.focus(this._buttons.last);
        }
        // find the sibling button
        var /** @type {?} */ sibling = this._buttons.toArray()[this.getButtonIndex(button) + (next ? 1 : -1)];
        // focus the next button
        this.focus(sibling);
    };
    /**
     * @return {?}
     */
    FloatingActionButtonsService.prototype.getFocusedButton = /**
     * @return {?}
     */
    function () {
        return this._buttons.find(function (btn) { return btn.tabindex$.value === 0; });
    };
    /**
     * @param {?} button
     * @return {?}
     */
    FloatingActionButtonsService.prototype.getButtonIndex = /**
     * @param {?} button
     * @return {?}
     */
    function (button) {
        return this._buttons.toArray().findIndex(function (btn) { return btn === button; });
    };
    FloatingActionButtonsService.decorators = [
        { type: Injectable }
    ];
    return FloatingActionButtonsService;
}());
export { FloatingActionButtonsService };
function FloatingActionButtonsService_tsickle_Closure_declarations() {
    /** @type {?} */
    FloatingActionButtonsService.prototype.open$;
    /** @type {?} */
    FloatingActionButtonsService.prototype.direction$;
    /** @type {?} */
    FloatingActionButtonsService.prototype._buttons;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMuc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2Zsb2F0aW5nLWFjdGlvbi1idXR0b25zL2Zsb2F0aW5nLWFjdGlvbi1idXR0b25zLnNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQWEsTUFBTSxlQUFlLENBQUM7QUFDdEQsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOzs7cUJBTTNDLElBQUksZUFBZSxDQUFVLEtBQUssQ0FBQzswQkFDOUIsSUFBSSxlQUFlLENBQWdDLEtBQUssQ0FBQzs7Ozs7SUFJdEUsMkNBQUk7OztJQUFKO1FBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDekI7Ozs7SUFFRCw2Q0FBTTs7O0lBQU47UUFDSSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztLQUMzQzs7OztJQUVELDRDQUFLOzs7SUFBTDtRQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOztRQUd2QixJQUFJLENBQUMseUJBQXlCLEVBQUUsQ0FBQztLQUNwQzs7OztJQUVELG1EQUFZOzs7SUFBWjtRQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLEtBQUssT0FBTyxDQUFDO0tBQ2hGOzs7O0lBRUQsaURBQVU7OztJQUFWO1FBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssS0FBSyxRQUFRLENBQUM7S0FD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QVU7O3VDQUpYOztTQUthLDRCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIFF1ZXJ5TGlzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0IH0gZnJvbSAncnhqcy9CZWhhdmlvclN1YmplY3QnO1xuaW1wb3J0IHsgRmxvYXRpbmdBY3Rpb25CdXR0b25Db21wb25lbnQgfSBmcm9tICcuL2Zsb2F0aW5nLWFjdGlvbi1idXR0b24uY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEZsb2F0aW5nQWN0aW9uQnV0dG9uc1NlcnZpY2Uge1xuXG4gICAgb3BlbiQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PGJvb2xlYW4+KGZhbHNlKTtcbiAgICBkaXJlY3Rpb24kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxGbG9hdGluZ0FjdGlvbkJ1dHRvbkRpcmVjdGlvbj4oJ3RvcCcpO1xuXG4gICAgcHJpdmF0ZSBfYnV0dG9uczogUXVlcnlMaXN0PEZsb2F0aW5nQWN0aW9uQnV0dG9uQ29tcG9uZW50PjtcblxuICAgIG9wZW4oKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3BlbiQubmV4dCh0cnVlKTtcbiAgICB9XG5cbiAgICB0b2dnbGUoKTogdm9pZCB7XG4gICAgICAgIHRoaXMub3BlbiQubmV4dCghdGhpcy5vcGVuJC5nZXRWYWx1ZSgpKTtcbiAgICB9XG5cbiAgICBjbG9zZSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5vcGVuJC5uZXh0KGZhbHNlKTtcblxuICAgICAgICAvLyBtYWtlIHRoZSBmaXJzdCBidXR0b24gdGFiYmFibGUgYWdhaW5cbiAgICAgICAgdGhpcy5zZXRQcmltYXJ5QnV0dG9uRm9jdXNhYmxlKCk7XG4gICAgfVxuXG4gICAgaXNIb3Jpem9udGFsKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5kaXJlY3Rpb24kLnZhbHVlID09PSAnbGVmdCcgfHwgdGhpcy5kaXJlY3Rpb24kLnZhbHVlID09PSAncmlnaHQnO1xuICAgIH1cblxuICAgIGlzVmVydGljYWwoKTogYm9vbGVhbiB7XG4gICAgICAgIHJldHVybiB0aGlzLmRpcmVjdGlvbiQudmFsdWUgPT09ICd0b3AnIHx8IHRoaXMuZGlyZWN0aW9uJC52YWx1ZSA9PT0gJ2JvdHRvbSc7XG4gICAgfVxuXG4gICAgc2V0QnV0dG9ucyhidXR0b25zOiBRdWVyeUxpc3Q8RmxvYXRpbmdBY3Rpb25CdXR0b25Db21wb25lbnQ+KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX2J1dHRvbnMgPSBidXR0b25zO1xuXG4gICAgICAgIC8vIG1ha2UgdGhlIGZpcnN0IGJ1dHRvbiB0YWJiYWJsZVxuICAgICAgICB0aGlzLnNldFByaW1hcnlCdXR0b25Gb2N1c2FibGUoKTtcbiAgICB9XG5cbiAgICAvKiogTWFrZSBvbmx5IHRoZSBmaXJzdCBidXR0b24gdGFiYmFibGUgKi9cbiAgICBzZXRQcmltYXJ5QnV0dG9uRm9jdXNhYmxlKCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9idXR0b25zLmZvckVhY2goYnRuID0+IGJ0bi50YWJpbmRleCQubmV4dChidG4ucHJpbWFyeSA/IDAgOiAtMSkpO1xuICAgIH1cblxuICAgIGZvY3VzUHJpbWFyeUJ1dHRvbigpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5mb2N1cyh0aGlzLl9idXR0b25zLmZpbmQoYnRuID0+IGJ0bi5wcmltYXJ5KSk7XG4gICAgfVxuXG4gICAgZm9jdXMoYnV0dG9uOiBGbG9hdGluZ0FjdGlvbkJ1dHRvbkNvbXBvbmVudCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGlmIHRoZSBidXR0b24gaXMgbm90IGRlZmluZWQgdGhlbiBkbyBub3RoaW5nXG4gICAgICAgIGlmICghYnV0dG9uKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXQgdGhlIGJ1dHRvbiB0YWIgaW5kZXhcbiAgICAgICAgdGhpcy5fYnV0dG9ucy5mb3JFYWNoKGJ0biA9PiBidG4udGFiaW5kZXgkLm5leHQoYnV0dG9uID09PSBidG4gPyAwIDogLTEpKTtcblxuICAgICAgICAvLyBhcHBseSB0aGUgZm9jdXNcbiAgICAgICAgYnV0dG9uLmZvY3VzKCk7XG4gICAgfVxuXG4gICAgZm9jdXNTaWJsaW5nKG5leHQ6IGJvb2xlYW4pOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiB0aGUgYnV0dG9ucyBhcmUgbm90IHZpc2libGUgdGhlbiBkbyBub3RoaW5nXG4gICAgICAgIGlmICh0aGlzLm9wZW4kLnZhbHVlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZ2V0IHRoZSBjdXJyZW50IGZvY3VzZWQgaXRlbVxuICAgICAgICBjb25zdCBidXR0b24gPSB0aGlzLmdldEZvY3VzZWRCdXR0b24oKTtcblxuICAgICAgICBpZiAobmV4dCAmJiBidXR0b24gPT09IHRoaXMuX2J1dHRvbnMubGFzdCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9jdXModGhpcy5fYnV0dG9ucy5maXJzdCk7XG4gICAgICAgIH0gZWxzZSBpZiAoIW5leHQgJiYgYnV0dG9uID09PSB0aGlzLl9idXR0b25zLmZpcnN0KSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb2N1cyh0aGlzLl9idXR0b25zLmxhc3QpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZmluZCB0aGUgc2libGluZyBidXR0b25cbiAgICAgICAgY29uc3Qgc2libGluZyA9IHRoaXMuX2J1dHRvbnMudG9BcnJheSgpW3RoaXMuZ2V0QnV0dG9uSW5kZXgoYnV0dG9uKSArIChuZXh0ID8gMSA6IC0xKV07XG5cbiAgICAgICAgLy8gZm9jdXMgdGhlIG5leHQgYnV0dG9uXG4gICAgICAgIHRoaXMuZm9jdXMoc2libGluZyk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRGb2N1c2VkQnV0dG9uKCk6IEZsb2F0aW5nQWN0aW9uQnV0dG9uQ29tcG9uZW50IHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1dHRvbnMuZmluZChidG4gPT4gYnRuLnRhYmluZGV4JC52YWx1ZSA9PT0gMCk7XG4gICAgfVxuXG4gICAgcHJpdmF0ZSBnZXRCdXR0b25JbmRleChidXR0b246IEZsb2F0aW5nQWN0aW9uQnV0dG9uQ29tcG9uZW50KTogbnVtYmVyIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2J1dHRvbnMudG9BcnJheSgpLmZpbmRJbmRleChidG4gPT4gYnRuID09PSBidXR0b24pO1xuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25EaXJlY3Rpb24gPSAndG9wJyB8ICdyaWdodCcgfCAnYm90dG9tJyB8ICdsZWZ0JztcbiJdfQ==