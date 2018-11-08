/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { DOWN_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { RowSelectionStrategy } from './row-selection.strategy';
/**
 * @template T
 */
export class RowAltSelectionStrategy extends RowSelectionStrategy {
    /**
     * @param {?} event
     * @param {?} data
     * @return {?}
     */
    keydown(event, data) {
        switch (event.which) {
            case UP_ARROW:
            case DOWN_ARROW:
                event.preventDefault();
                this.handleCursorKey(event, data);
                break;
            case SPACE:
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
            this.selectionService.activateSibling(event.which === UP_ARROW);
        }
        else {
            const /** @type {?} */ sibling = this.selectionService.getSibling(event.which === UP_ARROW);
            this.multipleSelect(sibling ? sibling : data);
        }
    }
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm93LWFsdC1zZWxlY3Rpb24uc3RyYXRlZ3kuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiZGlyZWN0aXZlcy9zZWxlY3Rpb24vc3RyYXRlZ2llcy9yb3ctYWx0LXNlbGVjdGlvbi5zdHJhdGVneS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDcEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7Ozs7QUFFaEUsTUFBTSw4QkFBa0MsU0FBUSxvQkFBdUI7Ozs7OztJQUNuRSxPQUFPLENBQUMsS0FBb0IsRUFBRSxJQUFPO1FBQ2pDLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDO1lBQ2xCLEtBQUssUUFBUSxDQUFDO1lBQ2QsS0FBSyxVQUFVO2dCQUNYLEtBQUssQ0FBQyxjQUFjLEVBQUUsQ0FBQztnQkFDdkIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ2xDLEtBQUssQ0FBQztZQUVWLEtBQUssS0FBSztnQkFDTixLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7Z0JBQ3ZCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM1QyxLQUFLLENBQUM7U0FDYjtLQUNKOzs7Ozs7O0lBS08sZUFBZSxDQUFDLEtBQW9CLEVBQUUsSUFBTzs7UUFFakQsTUFBTSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsR0FBRyxLQUFLLENBQUM7O1FBR3BDLEVBQUUsQ0FBQyxDQUFDLENBQUMsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztZQUN4QixJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDbkIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM5QjtRQUVELEVBQUUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUM7WUFDVixJQUFJLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUM7U0FDbkU7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNKLHVCQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUM7WUFDM0UsSUFBSSxDQUFDLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDakQ7O0NBRVIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBET1dOX0FSUk9XLCBTUEFDRSwgVVBfQVJST1cgfSBmcm9tICdAYW5ndWxhci9jZGsva2V5Y29kZXMnO1xyXG5pbXBvcnQgeyBSb3dTZWxlY3Rpb25TdHJhdGVneSB9IGZyb20gJy4vcm93LXNlbGVjdGlvbi5zdHJhdGVneSc7XHJcblxyXG5leHBvcnQgY2xhc3MgUm93QWx0U2VsZWN0aW9uU3RyYXRlZ3k8VD4gZXh0ZW5kcyBSb3dTZWxlY3Rpb25TdHJhdGVneTxUPiB7XHJcbiAgICBrZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50LCBkYXRhOiBUKTogdm9pZCB7XHJcbiAgICAgICAgc3dpdGNoIChldmVudC53aGljaCkge1xyXG4gICAgICAgICAgICBjYXNlIFVQX0FSUk9XOlxyXG4gICAgICAgICAgICBjYXNlIERPV05fQVJST1c6XHJcbiAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVDdXJzb3JLZXkoZXZlbnQsIGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlIFNQQUNFOlxyXG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2VsZWN0aW9uU2VydmljZS5zdHJhdGVneS50b2dnbGUoZGF0YSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBTZWxlY3QgdGhlIHNpYmxpbmcgaXRlbSB3aGVuIGFycm93IGtleXMgYXJlIHByZXNzZWRcclxuICAgICAqL1xyXG4gICAgcHJpdmF0ZSBoYW5kbGVDdXJzb3JLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIGRhdGE6IFQpOiB2b2lkIHtcclxuICAgICAgICAvLyBkZXRlcm1pbmUgd2hpY2ggbW9kaWZpZXIga2V5cyBhcmUgcHJlc3NlZFxyXG4gICAgICAgIGNvbnN0IHsgY3RybEtleSwgc2hpZnRLZXkgfSA9IGV2ZW50O1xyXG5cclxuICAgICAgICAvLyBpZiBubyBtb2RpZmllciBrZXlzIGFyZSBwcmVzc2VkIHRoZW4gZGVzZWxlY3QgYWxsIGFuZCBjbGVhciB0aGUgc2VsZWN0aW9uXHJcbiAgICAgICAgaWYgKCFjdHJsS2V5ICYmICFzaGlmdEtleSkge1xyXG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0QWxsKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJTZWxlY3Rpb24oZmFsc2UpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGN0cmxLZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3Rpb25TZXJ2aWNlLmFjdGl2YXRlU2libGluZyhldmVudC53aGljaCA9PT0gVVBfQVJST1cpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHNpYmxpbmcgPSB0aGlzLnNlbGVjdGlvblNlcnZpY2UuZ2V0U2libGluZyhldmVudC53aGljaCA9PT0gVVBfQVJST1cpO1xyXG4gICAgICAgICAgICB0aGlzLm11bHRpcGxlU2VsZWN0KHNpYmxpbmcgPyBzaWJsaW5nIDogZGF0YSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==