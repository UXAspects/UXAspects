/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
export class TypeaheadKeyService {
    constructor() { }
    /**
     * @param {?} event
     * @param {?} typeahead
     * @return {?}
     */
    handleKey(event, typeahead) {
        if (typeahead) {
            switch (event.key) {
                case 'ArrowUp':
                case 'Up':
                    if (!typeahead.open) {
                        typeahead.open = true;
                    }
                    else {
                        typeahead.moveHighlight(-1);
                    }
                    event.preventDefault();
                    break;
                case 'ArrowDown':
                case 'Down':
                    if (!typeahead.open) {
                        typeahead.open = true;
                    }
                    else {
                        typeahead.moveHighlight(1);
                    }
                    event.preventDefault();
                    break;
                case 'Escape':
                case 'Esc':
                    typeahead.open = false;
                    break;
            }
        }
    }
}
TypeaheadKeyService.decorators = [
    { type: Injectable },
];
/** @nocollapse */
TypeaheadKeyService.ctorParameters = () => [];
function TypeaheadKeyService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TypeaheadKeyService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TypeaheadKeyService.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLWtleS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdHlwZWFoZWFkL3R5cGVhaGVhZC1rZXkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQ0EsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUczQyxNQUFNO0lBRUYsaUJBQWlCOzs7Ozs7SUFFakIsU0FBUyxDQUFDLEtBQW9CLEVBQUUsU0FBNkI7UUFDekQsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNaLE1BQU0sQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixLQUFLLFNBQVMsQ0FBQztnQkFDZixLQUFLLElBQUk7b0JBQ0wsRUFBRSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQzt3QkFDbEIsU0FBUyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7cUJBQ3pCO29CQUFDLElBQUksQ0FBQyxDQUFDO3dCQUNKLFNBQVMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDL0I7b0JBQ0QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN2QixLQUFLLENBQUM7Z0JBQ1YsS0FBSyxXQUFXLENBQUM7Z0JBQ2pCLEtBQUssTUFBTTtvQkFDUCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNsQixTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztxQkFDekI7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDOUI7b0JBQ0QsS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO29CQUN2QixLQUFLLENBQUM7Z0JBQ1YsS0FBSyxRQUFRLENBQUM7Z0JBQ2QsS0FBSyxLQUFLO29CQUNOLFNBQVMsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO29CQUN2QixLQUFLLENBQUM7YUFDYjtTQUNKO0tBQ0o7OztZQWhDSixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgVHlwZWFoZWFkQ29tcG9uZW50IH0gZnJvbSAnLi9pbmRleCc7XG5pbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBUeXBlYWhlYWRLZXlTZXJ2aWNlIHtcblxuICAgIGNvbnN0cnVjdG9yKCkgeyB9XG5cbiAgICBoYW5kbGVLZXkoZXZlbnQ6IEtleWJvYXJkRXZlbnQsIHR5cGVhaGVhZDogVHlwZWFoZWFkQ29tcG9uZW50KSB7XG4gICAgICAgIGlmICh0eXBlYWhlYWQpIHtcbiAgICAgICAgICAgIHN3aXRjaCAoZXZlbnQua2V5KSB7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dVcCc6XG4gICAgICAgICAgICAgICAgY2FzZSAnVXAnOlxuICAgICAgICAgICAgICAgICAgICBpZiAoIXR5cGVhaGVhZC5vcGVuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlYWhlYWQub3BlbiA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0eXBlYWhlYWQubW92ZUhpZ2hsaWdodCgtMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnQXJyb3dEb3duJzpcbiAgICAgICAgICAgICAgICBjYXNlICdEb3duJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0eXBlYWhlYWQub3Blbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZWFoZWFkLm9wZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZWFoZWFkLm1vdmVIaWdobGlnaHQoMSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgY2FzZSAnRXNjYXBlJzpcbiAgICAgICAgICAgICAgICBjYXNlICdFc2MnOlxuICAgICAgICAgICAgICAgICAgICB0eXBlYWhlYWQub3BlbiA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iXX0=