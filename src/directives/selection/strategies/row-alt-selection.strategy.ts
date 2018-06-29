import { KeyCode } from './keycode.enum';
import { RowSelectionStrategy } from './row-selection.strategy';

export class RowAltSelectionStrategy extends RowSelectionStrategy {
    keydown(event: KeyboardEvent, data: any): void {
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
     */
    private handleCursorKey(event: KeyboardEvent, data: any): void {
        // determine which modifier keys are pressed
        const { ctrlKey, shiftKey } = event;

        // if no modifier keys are pressed then deselect all and clear the selection
        if (!ctrlKey && !shiftKey) {
            this.deselectAll();
            this.clearSelection(false);
        }

        if (ctrlKey) {
            this.selectionService.activateSibling(event.keyCode === KeyCode.UpArrow);
        } else {
            const sibling = this.selectionService.getSibling(event.keyCode === KeyCode.UpArrow);
            this.multipleSelect(sibling ? sibling : data);
        }
    }
}
