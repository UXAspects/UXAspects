import { SelectionService } from '../selection.service';
export declare class SelectionStrategy {
    protected selectionService: SelectionService;
    constructor(selectionService: SelectionService);
    mousedown(event: MouseEvent, data: any): void;
    click(event: MouseEvent, data: any): void;
    keydown(event: KeyboardEvent, data: any): void;
    /**
     * Select the item - default behavior
     */
    select(...data: any[]): void;
    /**
     * Toggle the item's selected state - default behavior
     */
    toggle(...data: any[]): void;
    /**
     * Deselect the item - default behavior
     */
    deselect(...data: any[]): void;
    /**
     * Select all items - default behavior
     */
    selectAll(): void;
    /**
     * Deselect all items - default behavior
     */
    deselectAll(): void;
    destroy(): void;
}
