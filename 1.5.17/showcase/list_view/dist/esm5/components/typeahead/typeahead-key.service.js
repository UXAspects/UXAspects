/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Injectable } from '@angular/core';
var TypeaheadKeyService = (function () {
    function TypeaheadKeyService() {
    }
    /**
     * @param {?} event
     * @param {?} typeahead
     * @return {?}
     */
    TypeaheadKeyService.prototype.handleKey = /**
     * @param {?} event
     * @param {?} typeahead
     * @return {?}
     */
    function (event, typeahead) {
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
                case 'Enter':
                    if (typeahead.selectOnEnter) {
                        typeahead.selectHighlighted();
                    }
            }
        }
    };
    TypeaheadKeyService.decorators = [
        { type: Injectable },
    ];
    /** @nocollapse */
    TypeaheadKeyService.ctorParameters = function () { return []; };
    return TypeaheadKeyService;
}());
export { TypeaheadKeyService };
function TypeaheadKeyService_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    TypeaheadKeyService.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    TypeaheadKeyService.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHlwZWFoZWFkLWtleS5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvdHlwZWFoZWFkL3R5cGVhaGVhZC1rZXkuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLGVBQWUsQ0FBQzs7Ozs7Ozs7O0lBTXZDLHVDQUFTOzs7OztJQUFULFVBQVUsS0FBb0IsRUFBRSxTQUE2QjtRQUN6RCxFQUFFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO1lBQ1osTUFBTSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLEtBQUssU0FBUyxDQUFDO2dCQUNmLEtBQUssSUFBSTtvQkFDTCxFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNsQixTQUFTLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztxQkFDekI7b0JBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ0osU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUMvQjtvQkFDRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLEtBQUssQ0FBQztnQkFDVixLQUFLLFdBQVcsQ0FBQztnQkFDakIsS0FBSyxNQUFNO29CQUNQLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7d0JBQ2xCLFNBQVMsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO3FCQUN6QjtvQkFBQyxJQUFJLENBQUMsQ0FBQzt3QkFDSixTQUFTLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUM5QjtvQkFDRCxLQUFLLENBQUMsY0FBYyxFQUFFLENBQUM7b0JBQ3ZCLEtBQUssQ0FBQztnQkFDVixLQUFLLFFBQVEsQ0FBQztnQkFDZCxLQUFLLEtBQUs7b0JBQ04sU0FBUyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7b0JBQ3ZCLEtBQUssQ0FBQztnQkFFVixLQUFLLE9BQU87b0JBQ1IsRUFBRSxDQUFDLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7d0JBQzFCLFNBQVMsQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO3FCQUNqQzthQUNSO1NBQ0o7S0FDSjs7Z0JBbkNKLFVBQVU7Ozs7OEJBSFg7O1NBSWEsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVHlwZWFoZWFkQ29tcG9uZW50IH0gZnJvbSAnLi90eXBlYWhlYWQuY29tcG9uZW50JztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFR5cGVhaGVhZEtleVNlcnZpY2Uge1xuXG4gICAgaGFuZGxlS2V5KGV2ZW50OiBLZXlib2FyZEV2ZW50LCB0eXBlYWhlYWQ6IFR5cGVhaGVhZENvbXBvbmVudCkge1xuICAgICAgICBpZiAodHlwZWFoZWFkKSB7XG4gICAgICAgICAgICBzd2l0Y2ggKGV2ZW50LmtleSkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93VXAnOlxuICAgICAgICAgICAgICAgIGNhc2UgJ1VwJzpcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0eXBlYWhlYWQub3Blbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZWFoZWFkLm9wZW4gPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZWFoZWFkLm1vdmVIaWdobGlnaHQoLTEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0Fycm93RG93bic6XG4gICAgICAgICAgICAgICAgY2FzZSAnRG93bic6XG4gICAgICAgICAgICAgICAgICAgIGlmICghdHlwZWFoZWFkLm9wZW4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVhaGVhZC5vcGVuID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGVhaGVhZC5tb3ZlSGlnaGxpZ2h0KDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIGNhc2UgJ0VzY2FwZSc6XG4gICAgICAgICAgICAgICAgY2FzZSAnRXNjJzpcbiAgICAgICAgICAgICAgICAgICAgdHlwZWFoZWFkLm9wZW4gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdFbnRlcic6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlYWhlYWQuc2VsZWN0T25FbnRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZWFoZWFkLnNlbGVjdEhpZ2hsaWdodGVkKCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH1cbn0iXX0=