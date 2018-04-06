import { SelectionStrategy } from './selection.strategy';

export class SimpleSelectionStrategy extends SelectionStrategy {

  /**
   * When the item is clicked simply toggle the current selected state
   */
  click(event: MouseEvent, data: any): void {
    this.toggle(data);
  }

  /**
   * Add basic keyboard support for navigating
   * and selecting/deselecting items
   */
  keydown(event: KeyboardEvent, data: any): void {

    switch (event.keyCode) {
      
      case KeyCode.UpArrow:
        event.preventDefault();
        return this.selectionService.activateSibling(true);
        
      case KeyCode.DownArrow:
        event.preventDefault();
        return this.selectionService.activateSibling(false);
      
      case KeyCode.Spacebar:
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

enum KeyCode {
  UpArrow = 38,
  DownArrow = 40,
  Spacebar = 32
}
