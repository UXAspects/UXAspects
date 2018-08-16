import { DOWN_ARROW, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from './selection.strategy';

export class SimpleSelectionStrategy extends SelectionStrategy {

  /**
   * When the item is clicked simply toggle the current selected state
   */
  click(_event: MouseEvent, data: any): void {
    this.toggle(data);
  }

  /**
   * Add basic keyboard support for navigating
   * and selecting/deselecting items
   */
  keydown(event: KeyboardEvent, data: any): void {

    switch (event.which) {

      case UP_ARROW:
        event.preventDefault();
        return this.selectionService.activateSibling(true);

      case DOWN_ARROW:
        event.preventDefault();
        return this.selectionService.activateSibling(false);

      case SPACE:
        event.preventDefault();
        return this.toggle(data);
    }
  }

  /**
   * Override the standard toggle function to always activate the item
   */
  toggle(data: any): void {
    super.toggle(data);
    this.selectionService.activate(data);
  }
}
