import { SelectionStrategy } from './selection.strategy';
export declare class RowSelectionStrategy extends SelectionStrategy {
    private _selection;
    /**
     * By default on shift click the browser will highlight
     * text. This looks bad and we don't want this to occur
     */
    mousedown(event: MouseEvent): void;
    /**
     * When a row is clicked we want to handle selection
     */
    click(event: MouseEvent, data: any): void;
    /**
     * To support full keyboard control we need to support the following:
     * 1. Arrow keys to navigate up and down
     * 2. Spacebar to toggle selection
     * 3. Shift + Arrow keys to multiple select
     * 4. Ctrl + Arrow keys to allow retained selection and navigation
     */
    keydown(event: KeyboardEvent, data: any): void;
    /**
     * Override the standard toggle function to store or clear the
     * most recently selected item
     */
    toggle(data: any, activate?: boolean): void;
    /**
     * Clear all other selected items and select only
     * the most recently selected item
     */
    private singleSelect(data);
    /**
     * Handle multiple selection:
     * 1. If no start item selected - select it
     * 2. If a start item has been selected - select all in between
     * 3. If a start and end item have been selected clear the range and then select the new range
     */
    private multipleSelect(data);
    /**
     * Set the selection start point. If there was previously a
     * selection end point then clear it as this is a new selection
     */
    private setSelectionStart(data);
    /**
     * Set the selection end point
     */
    private setSelectionEnd(data);
    /**
     * Clear both start and end selection points
     */
    private clearSelection(deactivate?);
    /**
     * Determine all the items affected by the current selection.
     * Note that the end point may be above the start point so
     * we need to account for this.
     */
    private getSelectedItems();
    /**
     * Activate the sibling item when arrow keys are pressed
     */
    private navigate(event, data);
}
export interface Selection {
    start: any;
    end: any;
}
