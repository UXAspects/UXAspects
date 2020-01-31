import { DOWN_ARROW, ENTER, ESCAPE, UP_ARROW } from '@angular/cdk/keycodes';
import { Injectable } from '@angular/core';
import { TypeaheadComponent } from './typeahead.component';

@Injectable()
export class TypeaheadKeyService<T = any> {

    handleKey(event: KeyboardEvent, typeahead: TypeaheadComponent<T>): void {

        if (!typeahead) {
            return;
        }

        switch (event.keyCode) {

            case UP_ARROW:
                if (!typeahead.open) {
                    typeahead.open = true;
                } else {
                    typeahead.moveHighlight(-1);
                }
                event.preventDefault();
                break;

            case DOWN_ARROW:
                if (!typeahead.open) {
                    typeahead.open = true;
                } else {
                    typeahead.moveHighlight(1);
                }
                event.preventDefault();
                break;

            case ESCAPE:
                typeahead.open = false;
                break;

            case ENTER:
                if (typeahead.selectOnEnter) {
                    typeahead.selectHighlighted();
                }
        }
    }
}