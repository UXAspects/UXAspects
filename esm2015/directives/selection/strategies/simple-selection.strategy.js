/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
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
/** @enum {number} */
const KeyCode = {
    UpArrow: 38,
    DownArrow: 40,
    Spacebar: 32,
};
KeyCode[KeyCode.UpArrow] = "UpArrow";
KeyCode[KeyCode.DownArrow] = "DownArrow";
KeyCode[KeyCode.Spacebar] = "Spacebar";

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ltcGxlLXNlbGVjdGlvbi5zdHJhdGVneS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL3NlbGVjdGlvbi9zdHJhdGVnaWVzL3NpbXBsZS1zZWxlY3Rpb24uc3RyYXRlZ3kudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE1BQU0sOEJBQStCLFNBQVEsaUJBQWlCOzs7Ozs7O0lBSzVELEtBQUssQ0FBQyxLQUFpQixFQUFFLElBQVM7UUFDaEMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNuQjs7Ozs7Ozs7SUFNRCxPQUFPLENBQUMsS0FBb0IsRUFBRSxJQUFTO1FBRXJDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBRXRCLEtBQUssT0FBTyxDQUFDLE9BQU87Z0JBQ2xCLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7WUFFckQsS0FBSyxPQUFPLENBQUMsU0FBUztnQkFDcEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUV0RCxLQUFLLE9BQU8sQ0FBQyxRQUFRO2dCQUNuQixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzVCO0tBQ0Y7Ozs7OztJQUtELE1BQU0sQ0FBQyxJQUFTO1FBQ2QsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNuQixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3RDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4vc2VsZWN0aW9uLnN0cmF0ZWd5JztcblxuZXhwb3J0IGNsYXNzIFNpbXBsZVNlbGVjdGlvblN0cmF0ZWd5IGV4dGVuZHMgU2VsZWN0aW9uU3RyYXRlZ3kge1xuXG4gIC8qKlxuICAgKiBXaGVuIHRoZSBpdGVtIGlzIGNsaWNrZWQgc2ltcGx5IHRvZ2dsZSB0aGUgY3VycmVudCBzZWxlY3RlZCBzdGF0ZVxuICAgKi9cbiAgY2xpY2soZXZlbnQ6IE1vdXNlRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQge1xuICAgIHRoaXMudG9nZ2xlKGRhdGEpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZCBiYXNpYyBrZXlib2FyZCBzdXBwb3J0IGZvciBuYXZpZ2F0aW5nXG4gICAqIGFuZCBzZWxlY3RpbmcvZGVzZWxlY3RpbmcgaXRlbXNcbiAgICovXG4gIGtleWRvd24oZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQge1xuXG4gICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XG4gICAgICBcbiAgICAgIGNhc2UgS2V5Q29kZS5VcEFycm93OlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlU2libGluZyh0cnVlKTtcbiAgICAgICAgXG4gICAgICBjYXNlIEtleUNvZGUuRG93bkFycm93OlxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICByZXR1cm4gdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlU2libGluZyhmYWxzZSk7XG4gICAgICBcbiAgICAgIGNhc2UgS2V5Q29kZS5TcGFjZWJhcjpcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTsgICAgICBcbiAgICAgICAgcmV0dXJuIHRoaXMudG9nZ2xlKGRhdGEpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBPdmVycmlkZSB0aGUgc3RhbmRhcmQgdG9nZ2xlIGZ1bmN0aW9uIHRvIGFsd2F5cyBhY3RpdmF0ZSB0aGUgaXRlbVxuICAgKi9cbiAgdG9nZ2xlKGRhdGE6IGFueSk6IHZvaWQge1xuICAgIHN1cGVyLnRvZ2dsZShkYXRhKTtcbiAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGUoZGF0YSk7XG4gIH1cbn1cblxuZW51bSBLZXlDb2RlIHtcbiAgVXBBcnJvdyA9IDM4LFxuICBEb3duQXJyb3cgPSA0MCxcbiAgU3BhY2ViYXIgPSAzMlxufVxuIl19