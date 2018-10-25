import { DOWN_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from './selection.strategy';

export class SimpleSelectionStrategy<T> extends SelectionStrategy<T> {

  /**
   * When the item is clicked simply toggle the current selected state
   */
  click(_event: MouseEvent, data: T): void {
    this.toggle(data);
  }

  /**
   * Add basic keyboard support for navigating
   * and selecting/deselecting items
   */
  keydown(event: KeyboardEvent, data: T): void {

    switch (event.which) {

      case UP_ARROW:
        event.preventDefault();
        this.selectionService.activateSibling(true);
        return;

      case DOWN_ARROW:
        event.preventDefault();
        this.selectionService.activateSibling(false);
        return;

      case SPACE:
        event.preventDefault();
        return this.toggle(data);
    }
  }

  /**
   * Override the standard toggle function to always activate the item
   */
  toggle(data: T): void {
    super.toggle(data);
    this.selectionService.activate(data);
  }
}
