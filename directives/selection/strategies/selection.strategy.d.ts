import { SelectionService } from '../selection.service';
export declare class SelectionStrategy<T = any> {
    protected selectionService: SelectionService<T>;
    constructor(selectionService?: SelectionService<T>);
    setSelectionService(selectionService: SelectionService<T>): void;
    mousedown(event: MouseEvent, data: T): void;
    click(event: MouseEvent, data: T): void;
    keydown(event: KeyboardEvent, data: T): void;
    /**
     * Select the item - default behavior
     */
    select(...data: T[]): void;
    /**
     * Toggle the item's selected state - default behavior
     */
    toggle(...data: T[]): void;
    /**
     * Deselect the item - default behavior
     */
    deselect(...data: T[]): void;
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
