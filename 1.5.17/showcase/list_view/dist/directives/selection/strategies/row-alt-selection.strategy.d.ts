import { RowSelectionStrategy } from './row-selection.strategy';
export declare class RowAltSelectionStrategy extends RowSelectionStrategy {
    keydown(event: KeyboardEvent, data: any): void;
    /**
     * Select the sibling item when arrow keys are pressed
     */
    private handleCursorKey(event, data);
}
