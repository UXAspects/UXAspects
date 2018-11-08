import { RowSelectionStrategy } from './row-selection.strategy';
export declare class RowAltSelectionStrategy<T> extends RowSelectionStrategy<T> {
    keydown(event: KeyboardEvent, data: T): void;
    /**
     * Select the sibling item when arrow keys are pressed
     */
    private handleCursorKey(event, data);
}
