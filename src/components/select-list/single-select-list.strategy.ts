import { DOWN_ARROW, ENTER, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from '../../directives/selection/strategies/selection.strategy';

export class SingleSelectListStrategy<T> extends SelectionStrategy<T> {

    click(_event: MouseEvent, data: T): void {

        if (!this.selectionService.isSelected(data)) {
            // deselect all other items
            this.deselectAll();
        }

        // activate the clicked item
        this.selectionService.activate(data);

        // toggle the selected state of the item
        this.toggle(data);
    }

    keydown(event: KeyboardEvent, data: T): void {

        switch (event.which) {

            case UP_ARROW: {
                event.preventDefault();
                this.selectionService.activateSibling(true);
                break;
            }

            case DOWN_ARROW: {
                event.preventDefault();
                this.selectionService.activateSibling(false);
                break;
            }

            case SPACE:
            case ENTER:
                event.preventDefault();
                this.click(null, data);
                break;
        }
    }

}