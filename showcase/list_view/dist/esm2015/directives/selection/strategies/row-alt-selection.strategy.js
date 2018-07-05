/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { KeyCode } from './keycode.enum';
import { RowSelectionStrategy } from './row-selection.strategy';
export class RowAltSelectionStrategy extends RowSelectionStrategy {
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    keydown(event, data) {
        switch (event.keyCode) {
            case KeyCode.UpArrow:
            case KeyCode.DownArrow:
                event.preventDefault();
                this.handleCursorKey(event, data);
                break;
            case KeyCode.Spacebar:
                event.preventDefault();
                this.selectionService.strategy.toggle(data);
                break;
        }
    }
    /**
     * Select the sibling item when arrow keys are pressed
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    handleCursorKey(event, data) {
        // determine which modifier keys are pressed
        const { ctrlKey, shiftKey } = event;
        // if no modifier keys are pressed then deselect all and clear the selection
        if (!ctrlKey && !shiftKey) {
            this.deselectAll();
            this.clearSelection(false);
        }
        if (ctrlKey) {
            this.selectionService.activateSibling(event.keyCode === KeyCode.UpArrow);
        }
        else {
            const /** @type {?} */ sibling = this.selectionService.getSibling(event.keyCode === KeyCode.UpArrow);
            this.multipleSelect(sibling ? sibling : data);
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWFsdC1zZWxlY3Rpb24uc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9zZWxlY3Rpb24vc3RyYXRlZ2llcy9yb3ctYWx0LXNlbGVjdGlvbi5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3pDLE9BQU8sRUFBRSxvQkFBb0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBRWhFLE1BQU0sOEJBQStCLFNBQVEsb0JBQW9COzs7Ozs7SUFDN0QsT0FBTyxDQUFDLEtBQW9CLEVBQUUsSUFBUztRQUNuQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztZQUNwQixLQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUM7WUFDckIsS0FBSyxPQUFPLENBQUMsU0FBUztnQkFDbEIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbEMsS0FBSyxDQUFDO1lBRVYsS0FBSyxPQUFPLENBQUMsUUFBUTtnQkFDakIsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO2dCQUN2QixJQUFJLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDNUMsS0FBSyxDQUFDO1NBQ2I7S0FDSjs7Ozs7OztJQUtPLGVBQWUsQ0FBQyxLQUFvQixFQUFFLElBQVM7O1FBRW5ELE1BQU0sRUFBRSxPQUFPLEVBQUUsUUFBUSxFQUFFLEdBQUcsS0FBSyxDQUFDOztRQUdwQyxFQUFFLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDeEIsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQ25CLElBQUksQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUI7UUFFRCxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO1lBQ1YsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsT0FBTyxLQUFLLE9BQU8sQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1RTtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osdUJBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLE9BQU8sS0FBSyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDcEYsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLEdBQUcsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDO1NBQ2pEOztDQUVSIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgS2V5Q29kZSB9IGZyb20gJy4va2V5Y29kZS5lbnVtJztcclxuaW1wb3J0IHsgUm93U2VsZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICcuL3Jvdy1zZWxlY3Rpb24uc3RyYXRlZ3knO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJvd0FsdFNlbGVjdGlvblN0cmF0ZWd5IGV4dGVuZHMgUm93U2VsZWN0aW9uU3RyYXRlZ3kge1xyXG4gICAga2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCwgZGF0YTogYW55KTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC5rZXlDb2RlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgS2V5Q29kZS5VcEFycm93OlxyXG4gICAgICAgICAgICBjYXNlIEtleUNvZGUuRG93bkFycm93OlxyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQ3Vyc29yS2V5KGV2ZW50LCBkYXRhKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSBLZXlDb2RlLlNwYWNlYmFyOlxyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5zdHJhdGVneS50b2dnbGUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3QgdGhlIHNpYmxpbmcgaXRlbSB3aGVuIGFycm93IGtleXMgYXJlIHByZXNzZWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVDdXJzb3JLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGRhdGE6IGFueSk6IHZvaWQge1xyXG4gICAgICAgIC8vIGRldGVybWluZSB3aGljaCBtb2RpZmllciBrZXlzIGFyZSBwcmVzc2VkXHJcbiAgICAgICAgY29uc3QgeyBjdHJsS2V5LCBzaGlmdEtleSB9ID0gZXZlbnQ7XHJcblxyXG4gICAgICAgIC8vIGlmIG5vIG1vZGlmaWVyIGtleXMgYXJlIHByZXNzZWQgdGhlbiBkZXNlbGVjdCBhbGwgYW5kIGNsZWFyIHRoZSBzZWxlY3Rpb25cclxuICAgICAgICBpZiAoIWN0cmxLZXkgJiYgIXNoaWZ0S2V5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RBbGwoKTtcclxuICAgICAgICAgICAgdGhpcy5jbGVhclNlbGVjdGlvbihmYWxzZSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoY3RybEtleSkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGlvblNlcnZpY2UuYWN0aXZhdGVTaWJsaW5nKGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGUuVXBBcnJvdyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY29uc3Qgc2libGluZyA9IHRoaXMuc2VsZWN0aW9uU2VydmljZS5nZXRTaWJsaW5nKGV2ZW50LmtleUNvZGUgPT09IEtleUNvZGUuVXBBcnJvdyk7XHJcbiAgICAgICAgICAgIHRoaXMubXVsdGlwbGVTZWxlY3Qoc2libGluZyA/IHNpYmxpbmcgOiBkYXRhKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIl19