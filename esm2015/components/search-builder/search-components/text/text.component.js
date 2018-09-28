/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component } from '@angular/core';
import { BaseSearchComponent } from '../base-search.component';
export class SearchTextComponent extends BaseSearchComponent {
    constructor() {
        super(...arguments);
        this.type = 'text';
    }
    /**
     * @return {?}
     */
    get label() {
        return this.config.label;
    }
    /**
     * @return {?}
     */
    get placeholder() {
        return this.config.placeholder || 'Enter text';
    }
}
SearchTextComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-search-text',
                template: "<label *ngIf=\"label\" class=\"form-label\" [attr.for]=\"id\">{{ label }}</label>\n<input [attr.id]=\"id\" class=\"form-control\" [placeholder]=\"placeholder\" [(ngModel)]=\"value\" [focusIf]=\"focus\">"
            }] }
];
function SearchTextComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SearchTextComponent.prototype.type;
}
/**
 * @record
 */
export function SearchTextConfig() { }
function SearchTextConfig_tsickle_Closure_declarations() {
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWFyY2gtYnVpbGRlci9zZWFyY2gtY29tcG9uZW50cy90ZXh0L3RleHQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBNkIsTUFBTSwwQkFBMEIsQ0FBQztBQU0xRixNQUFNLDBCQUEyQixTQUFRLG1CQUFtQjs7O29CQUUzQyxNQUFNOzs7OztJQUVyQixJQUFJLEtBQUs7UUFDUCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUM7S0FDMUI7Ozs7SUFFRCxJQUFJLFdBQVc7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLElBQUksWUFBWSxDQUFDO0tBQ2hEOzs7WUFkRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtnQkFDMUIsc05BQW9DO2FBQ3JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBCYXNlU2VhcmNoQ29tcG9uZW50LCBCYXNlU2VhcmNoQ29tcG9uZW50Q29uZmlnIH0gZnJvbSAnLi4vYmFzZS1zZWFyY2guY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAndXgtc2VhcmNoLXRleHQnLFxuICB0ZW1wbGF0ZVVybDogJy4vdGV4dC5jb21wb25lbnQuaHRtbCdcbn0pXG5leHBvcnQgY2xhc3MgU2VhcmNoVGV4dENvbXBvbmVudCBleHRlbmRzIEJhc2VTZWFyY2hDb21wb25lbnQge1xuXG4gIHR5cGU6IHN0cmluZyA9ICd0ZXh0JztcblxuICBnZXQgbGFiZWwoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcubGFiZWw7XG4gIH1cblxuICBnZXQgcGxhY2Vob2xkZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5jb25maWcucGxhY2Vob2xkZXIgfHwgJ0VudGVyIHRleHQnO1xuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgU2VhcmNoVGV4dENvbmZpZyBleHRlbmRzIEJhc2VTZWFyY2hDb21wb25lbnRDb25maWcgeyB9Il19