import { DOWN_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from './selection.strategy';

export class RowSelectionStrategy extends SelectionStrategy {

  // store the most recently selected row
  private _selection: Selection = { start: null, end: null };

  /**
   * By default on shift click the browser will highlight
   * text. This looks bad and we don't want this to occur
   */
  mousedown(event: MouseEvent): void {
    event.preventDefault();
  }

  /**
   * When a row is clicked we want to handle selection
   */
  click(event: MouseEvent, data: any): void {

    // determine which modifier keys are pressed
    const { ctrlKey, shiftKey } = event;

    // if the shift key is pressed we want to perform a multiple selection
    if (shiftKey) {
      return this.multipleSelect(data);
    }

    // if the control key is pressed we want to perform an additive toggle selection
    if (ctrlKey) {
      return this.toggle(data);
    }

    // perform a single selection where all other rows are deselected
    this.singleSelect(data);
  }

  /**
   * To support full keyboard control we need to support the following:
   * 1. Arrow keys to navigate up and down
   * 2. Spacebar to toggle selection
   * 3. Shift + Arrow keys to multiple select
   * 4. Ctrl + Arrow keys to allow retained selection and navigation
   */
  keydown(event: KeyboardEvent, data: any): void {

    switch (event.which) {

      case UP_ARROW:
      case DOWN_ARROW:
        event.preventDefault();
        this.navigate(event, data);
        break;

      case SPACE:
        event.preventDefault();
        this.selectionService.strategy.toggle(data, true);
        break;

    }
  }

  /**
   * Override the standard toggle function to store or clear the
   * most recently selected item
   */
  toggle(data: any, activate: boolean = false): void {
    super.toggle(data);

    // store or clear the selection
    this.selectionService.isSelected(data) ? this.setSelectionStart(data) : this.clearSelection();

    // if we want to keep the item activated then activate
    if (activate) {
      this.selectionService.activate(data);
    }
  }

  /**
   * Clear all other selected items and select only
   * the most recently selected item
   */
  private singleSelect(data: any): void {

    // deselect all other rows if neither modifier key is pressed
    this.deselectAll();

    // select the current row
    this.select(data);

    // store the current item as the selection start
    this.setSelectionStart(data);
  }

  /**
   * Handle multiple selection:
   * 1. If no start item selected - select it
   * 2. If a start item has been selected - select all in between
   * 3. If a start and end item have been selected clear the range and then select the new range
   */
  protected multipleSelect(data: any): void {

    // if no selection currently exists then perform initial selection
    if (!this._selection.start) {

      // select the row
      this.select(data);

      // store the starting point
      return this.setSelectionStart(data);
    }

    // if a multiple selection already took place - clear the previous selection
    if (this._selection.start && this._selection.end) {
      this.deselect(...this.getSelectedItems());
    }

    // set the new selection end point
    this.setSelectionEnd(data);

    // select all the items in the range
    this.select(...this.getSelectedItems());
  }

  /**
   * Set the selection start point. If there was previously a
   * selection end point then clear it as this is a new selection
   */
  private setSelectionStart(data: any): void {
    this._selection.start = data;
    this._selection.end = null;

    // activate the item
    this.selectionService.activate(data);
  }

  /**
   * Set the selection end point
   */
  private setSelectionEnd(data: any): void {
    this._selection.end = data;

    // activate the item
    this.selectionService.activate(data);
  }

  /**
   * Clear both start and end selection points
   */
  protected clearSelection(deactivate: boolean = true): void {

    // reset the selected item
    this._selection = { start: null, end: null };

    // remove the current active item
    if (deactivate) {
      this.selectionService.deactivate();
    }
  }

  /**
   * Determine all the items affected by the current selection.
   * Note that the end point may be above the start point so
   * we need to account for this.
   */
  private getSelectedItems(): any[] {

    // get the latest dataset
    const { dataset } = this.selectionService;

    // get the indexes of the start and end point
    const startIdx = dataset.indexOf(this._selection.start);
    const endIdx = dataset.indexOf(this._selection.end);

    // get the region of the array that is selected - note the endIdx may be before the startIdx so account for this
    return dataset.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);
  }

  /**
   * Activate the sibling item when arrow keys are pressed
   */
  private navigate(event: KeyboardEvent, data: any): void {

    // determine which modifier keys are pressed
    const { ctrlKey, shiftKey } = event;

    // if no modifier keys are pressed then deselect all and clear the selection
    if (!ctrlKey && !shiftKey) {
      this.deselectAll();
      this.clearSelection(false);
    }

    // activate the sibling - if the up arrow is pressed then navigate to the previous sibling
    const sibling = this.selectionService.activateSibling(event.which === UP_ARROW);

    // if the shift key is pressed then we also want to toggle the state if the item
    if (shiftKey && sibling) {

      // if there is no current selection start then select the current row
      if (!this._selection.start) {
        this.multipleSelect(data);
      }

      this.multipleSelect(sibling);
    }
  }
}

export interface Selection {
  start: any;
  end: any;
}
