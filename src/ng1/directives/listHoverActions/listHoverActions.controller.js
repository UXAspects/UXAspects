import { ListHoverActionsService } from './listHoverActions.service';
import { LEFT_ARROW, RIGHT_ARROW } from '@angular/cdk/keycodes';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';

export class ListHoverActionsCtrl {

    constructor($element, $scope) {
        // create a new instance of the service for all children
        this.hoverActions = new ListHoverActionsService();

        // automatically unsubscribe from all observables
        this._onDestroy = new Subject();

        // get the table row element
        this.row = $element.parents('tr').first();

        // add the class to the row
        this.row.addClass('hover-actions');

        // subscribe to changes to the focused state
        this.hoverActions.isFocused$
            .pipe(takeUntil(this._onDestroy))
            .subscribe(isFocused => isFocused ? this.row.addClass('row-selected') : this.row.removeClass('row-selected'));


        // after the initial render attach the event listeners
        $scope.$evalAsync(() => {
            // add an event listener to the row
            this.row.on('keydown', this.onKeydown.bind(this));

            // teardown the component when it is destroyed
            $scope.$on('$destroy', () => this.onDestroy.bind(this));
        });
    }

    onDestroy() {
        this.row.removeClass('hover-actions');
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    onKeydown(event) {
        if (event.keyCode === RIGHT_ARROW) {
            this.hoverActions.focusAtIndex(0);
            event.stopPropagation();
            event.preventDefault();
        }
    }

    onActionKeydown(event) {

        event.stopPropagation();
        event.preventDefault();

        if (event.keyCode === LEFT_ARROW && this.hoverActions.isFocused()) {

            // if we are the first hover action then focus the row
            if (this.hoverActions.getFocusIndex() === 0) {
                this.row.focus();
            } else {
                this.hoverActions.focusAtIndex(this.hoverActions.getFocusIndex() - 1);
            }
        }

        if (event.keyCode === RIGHT_ARROW && this.hoverActions.isFocused()) {
            this.hoverActions.focusAtIndex(this.hoverActions.getFocusIndex() + 1);
        }
    }
}

ListHoverActionsCtrl.$inject = ['$element', '$scope'];
