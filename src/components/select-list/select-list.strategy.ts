import { DOWN_ARROW, ENTER, SPACE, UP_ARROW } from '@angular/cdk/keycodes';
import { SelectionStrategy } from '../../directives/selection/strategies/selection.strategy';

export class SelectListStrategy extends SelectionStrategy {

    private _lastSelection: any;

    /** Prevent the browser from highlighting text on shift click */
    mousedown(event: MouseEvent): void {
        event.preventDefault();
    }

    click(event: MouseEvent, data: any): void {

        // activate the clicked item
        this.selectionService.activate(data);

        // if the shift key is pressed we want to perform a multiple selection
        if (event.shiftKey) {
            return this.multipleSelect(data);
        }

        // otherwise perform a single toggle selection
        if (this.selectionService.isSelected(data)) {
            this.deselect(data);
            this._lastSelection = null;
        } else {
            this.select(data);
            this._lastSelection = data;
        }
    }

    keydown(event: KeyboardEvent, data: any): void {

        switch (event.which) {

            case UP_ARROW: {
                event.preventDefault();
                const sibling = this.selectionService.activateSibling(true);

                if (event.shiftKey) {
                    this.select(data, sibling);
                    this._lastSelection = sibling;
                }
                break;
            }

            case DOWN_ARROW: {
                event.preventDefault();
                const sibling = this.selectionService.activateSibling(false);

                if (event.shiftKey) {
                    this.select(data, sibling);
                    this._lastSelection = sibling;
                }
                break;
            }

            case SPACE:
            case ENTER:
                event.preventDefault();
                this.toggle(data);
                this._lastSelection = this.selectionService.isSelected(data) ? data : null;
                break;
        }
    }

    multipleSelect(data: any): void {

        // if there is no start item selected
        if (!this._lastSelection) {
            this.select(data);
            return this._lastSelection = data;
        }

        // if there already is a start item then find the items in the range
        this.select(...this.getSelectedItems(this._lastSelection, data));

        // store the selection end point
        this._lastSelection = data;
    }

    private getSelectedItems(start: any, end: any): any[] {

        // get the latest dataset
        const { dataset } = this.selectionService;

        // get the indexes of the start and end point
        const startIdx = dataset.indexOf(start);
        const endIdx = dataset.indexOf(end);

        // get the region of the array that is selected - note the endIdx may be before the startIdx so account for this
        return dataset.slice(Math.min(startIdx, endIdx), Math.max(startIdx, endIdx) + 1);
    }

}