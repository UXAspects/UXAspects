import { SelectionService } from '../selection.service';

export class SelectionStrategy {

  constructor(protected selectionService: SelectionService) { }

  mousedown(event: MouseEvent, data: any): void { }

  click(event: MouseEvent, data: any): void { }

  keydown(event: KeyboardEvent, data: any): void { }

  /**
   * Select the item - default behavior
   */
  select(...data: any[]): void {
    this.selectionService.select(...data);
  }

  /**
   * Toggle the item's selected state - default behavior
   */
  toggle(...data: any[]): void {
    this.selectionService.toggle(...data);
  }

  /**
   * Deselect the item - default behavior
   */
  deselect(...data: any[]): void {
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
    this.deselect(...this.selectionService.dataset);
  }

  destroy(): void { }
}
