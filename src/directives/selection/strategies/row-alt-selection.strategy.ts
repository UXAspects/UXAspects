import { DOWN_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { RowSelectionStrategy } from './row-selection.strategy';

export class RowAltSelectionStrategy extends RowSelectionStrategy {
    keydown(event: KeyboardEvent, data: any): void {
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
            this.selectionService.activateSibling(event.which === UP_ARROW);
        } else {
            const sibling = this.selectionService.getSibling(event.which === UP_ARROW);
            this.multipleSelect(sibling ? sibling : data);
        }
    }
}
