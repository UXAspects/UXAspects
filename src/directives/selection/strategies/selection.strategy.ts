import { SelectionService } from '../selection.service';

export class SelectionStrategy<T = any> {

    constructor(protected selectionService?: SelectionService<T>) { }

    setSelectionService(selectionService: SelectionService<T>): void {
        this.selectionService = selectionService;
    }

    mousedown(event: MouseEvent, data: T): void { }

    click(event: MouseEvent, data: T): void { }

    keydown(event: KeyboardEvent, data: T): void { }

    /**
     * Select the item - default behavior
     */
    select(...data: T[]): void {
        this.selectionService.select(...data);
    }

    /**
     * Replace the current selection with the list of items specified
     */
    selectOnly(...data: T[]): void {
        this.selectionService.selectOnly(...data);
    }

    /**
     * Toggle the item's selected state - default behavior
     */
    toggle(...data: T[]): void {
        this.selectionService.toggle(...data);
    }

    /**
     * Deselect the item - default behavior
     */
    deselect(...data: T[]): void {
        this.selectionService.deselect(...data);
    }

    /**
     * Select all items - default behavior
     */
    selectAll(): void {
        this.select(...this.selectionService.dataset);
    }

    /**
     * Deselect all items - default behavior
     */
    deselectAll(): void {

        // call deselect on all items in the dataset
        this.selectionService.deselectAll();
    }

    destroy(): void { }
}
