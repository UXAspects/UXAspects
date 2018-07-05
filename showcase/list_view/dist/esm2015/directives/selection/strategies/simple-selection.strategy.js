/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { KeyCode } from './keycode.enum';
import { SelectionStrategy } from './selection.strategy';
export class SimpleSelectionStrategy extends SelectionStrategy {
    /**
     * When the item is clicked simply toggle the current selected state
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    click(event, data) {
        this.toggle(data);
    }
    /**
     * Add basic keyboard support for navigating
     * and selecting/deselecting items
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    keydown(event, data) {
        switch (event.keyCode) {
            case KeyCode.UpArrow:
                event.preventDefault();
                return this.selectionService.activateSibling(true);
            case KeyCode.DownArrow:
                event.preventDefault();
                return this.selectionService.activateSibling(false);
            case KeyCode.Spacebar:
                event.preventDefault();
                return this.toggle(data);
        }
    }
    /**
     * Override the standard toggle function to always activate the item
     * @param {?} data
     * @return {?}
     */
    toggle(data) {
        super.toggle(data);
        this.selectionService.activate(data);
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNlbGVjdGlvbi5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3NpbXBsZS1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUN6QyxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUV6RCxNQUFNLDhCQUErQixTQUFRLGlCQUFpQjs7Ozs7OztJQUs1RCxLQUFLLENBQUMsS0FBaUIsRUFBRSxJQUFTO1FBQ2hDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbkI7Ozs7Ozs7O0lBTUQsT0FBTyxDQUFDLEtBQW9CLEVBQUUsSUFBUztRQUVyQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUV0QixLQUFLLE9BQU8sQ0FBQyxPQUFPO2dCQUNsQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRXJELEtBQUssT0FBTyxDQUFDLFNBQVM7Z0JBQ3BCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdEQsS0FBSyxPQUFPLENBQUMsUUFBUTtnQkFDbkIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM1QjtLQUNGOzs7Ozs7SUFLRCxNQUFNLENBQUMsSUFBUztRQUNkLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDbkIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN0QztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgS2V5Q29kZSB9IGZyb20gJy4va2V5Y29kZS5lbnVtJztcbmltcG9ydCB7IFNlbGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnLi9zZWxlY3Rpb24uc3RyYXRlZ3knO1xuXG5leHBvcnQgY2xhc3MgU2ltcGxlU2VsZWN0aW9uU3RyYXRlZ3kgZXh0ZW5kcyBTZWxlY3Rpb25TdHJhdGVneSB7XG5cbiAgLyoqXG4gICAqIFdoZW4gdGhlIGl0ZW0gaXMgY2xpY2tlZCBzaW1wbHkgdG9nZ2xlIHRoZSBjdXJyZW50IHNlbGVjdGVkIHN0YXRlXG4gICAqL1xuICBjbGljayhldmVudDogTW91c2VFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XG4gICAgdGhpcy50b2dnbGUoZGF0YSk7XG4gIH1cblxuICAvKipcbiAgICogQWRkIGJhc2ljIGtleWJvYXJkIHN1cHBvcnQgZm9yIG5hdmlnYXRpbmdcbiAgICogYW5kIHNlbGVjdGluZy9kZXNlbGVjdGluZyBpdGVtc1xuICAgKi9cbiAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XG5cbiAgICBzd2l0Y2ggKGV2ZW50LmtleUNvZGUpIHtcblxuICAgICAgY2FzZSBLZXlDb2RlLlVwQXJyb3c6XG4gICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHJldHVybiB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGVTaWJsaW5nKHRydWUpO1xuXG4gICAgICBjYXNlIEtleUNvZGUuRG93bkFycm93OlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlU2libGluZyhmYWxzZSk7XG5cbiAgICAgIGNhc2UgS2V5Q29kZS5TcGFjZWJhcjpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZSB0aGUgc3RhbmRhcmQgdG9nZ2xlIGZ1bmN0aW9uIHRvIGFsd2F5cyBhY3RpdmF0ZSB0aGUgaXRlbVxuICAgKi9cbiAgdG9nZ2xlKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIHN1cGVyLnRvZ2dsZShkYXRhKTtcbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGUoZGF0YSk7XG4gIH1cbn1cbiJdfQ==