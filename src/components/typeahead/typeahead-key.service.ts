import { Injectable } from '@angular/core';
import { TypeaheadComponent } from './typeahead.component';

@Injectable()
export class TypeaheadKeyService {

    handleKey(event: KeyboardEvent, typeahead: TypeaheadComponent) {
        if (typeahead) {
            switch (event.key) {
                case 'ArrowUp':
                case 'Up':
                    if (!typeahead.open) {
                        typeahead.open = true;
                    } else {
                        typeahead.moveHighlight(-1);
                    }
                    event.preventDefault();
                    break;
                case 'ArrowDown':
                case 'Down':
                    if (!typeahead.open) {
                        typeahead.open = true;
                    } else {
                        typeahead.moveHighlight(1);
                    }
                    event.preventDefault();
                    break;
                case 'Escape':
                case 'Esc':
                    typeahead.open = false;
                    break;

                case 'Enter':
                    if (typeahead.selectOnEnter) {
                        typeahead.selectHighlighted();
                    }
            }
        }
    }
}