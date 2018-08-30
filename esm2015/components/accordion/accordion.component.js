/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { AccordionService } from './accordion.service';
export class AccordionComponent {
    /**
     * @param {?} _accordion
     */
    constructor(_accordion) {
        this._accordion = _accordion;
    }
    /**
     * @param {?} collapseOthers
     * @return {?}
     */
    set collapseOthers(collapseOthers) {
        this._accordion.collapseOthers = collapseOthers;
    }
}
AccordionComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-accordion',
                template: "<ng-content></ng-content>",
                providers: [AccordionService],
                host: {
                    'class': 'panel-group',
                    'role': 'tablist',
                    'aria-multiselectable': 'true'
                }
            }] }
];
/** @nocollapse */
AccordionComponent.ctorParameters = () => [
    { type: AccordionService }
];
AccordionComponent.propDecorators = {
    collapseOthers: [{ type: Input }]
};
function AccordionComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AccordionComponent.prototype._accordion;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2FjY29yZGlvbi9hY2NvcmRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQVl2RCxNQUFNOzs7O0lBTUYsWUFBb0IsVUFBNEI7UUFBNUIsZUFBVSxHQUFWLFVBQVUsQ0FBa0I7S0FBSzs7Ozs7SUFKckQsSUFBYSxjQUFjLENBQUMsY0FBdUI7UUFDL0MsSUFBSSxDQUFDLFVBQVUsQ0FBQyxjQUFjLEdBQUcsY0FBYyxDQUFDO0tBQ25EOzs7WUFkSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGNBQWM7Z0JBQ3hCLHFDQUF5QztnQkFDekMsU0FBUyxFQUFFLENBQUUsZ0JBQWdCLENBQUU7Z0JBQy9CLElBQUksRUFBRTtvQkFDRixPQUFPLEVBQUUsYUFBYTtvQkFDdEIsTUFBTSxFQUFFLFNBQVM7b0JBQ2pCLHNCQUFzQixFQUFFLE1BQU07aUJBQ2pDO2FBQ0o7Ozs7WUFYUSxnQkFBZ0I7Ozs2QkFjcEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSW5wdXQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFjY29yZGlvblNlcnZpY2UgfSBmcm9tICcuL2FjY29yZGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1hY2NvcmRpb24nLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9hY2NvcmRpb24uY29tcG9uZW50Lmh0bWwnLFxuICAgIHByb3ZpZGVyczogWyBBY2NvcmRpb25TZXJ2aWNlIF0sXG4gICAgaG9zdDoge1xuICAgICAgICAnY2xhc3MnOiAncGFuZWwtZ3JvdXAnLFxuICAgICAgICAncm9sZSc6ICd0YWJsaXN0JyxcbiAgICAgICAgJ2FyaWEtbXVsdGlzZWxlY3RhYmxlJzogJ3RydWUnXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBBY2NvcmRpb25Db21wb25lbnQge1xuXG4gICAgQElucHV0KCkgc2V0IGNvbGxhcHNlT3RoZXJzKGNvbGxhcHNlT3RoZXJzOiBib29sZWFuKSB7XG4gICAgICAgIHRoaXMuX2FjY29yZGlvbi5jb2xsYXBzZU90aGVycyA9IGNvbGxhcHNlT3RoZXJzO1xuICAgIH1cblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2FjY29yZGlvbjogQWNjb3JkaW9uU2VydmljZSkgeyB9XG59Il19