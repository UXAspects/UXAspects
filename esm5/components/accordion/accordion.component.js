/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Input } from '@angular/core';
import { AccordionService } from './accordion.service';
var AccordionComponent = /** @class */ (function () {
    function AccordionComponent(_accordion) {
        this._accordion = _accordion;
    }
    Object.defineProperty(AccordionComponent.prototype, "collapseOthers", {
        set: /**
         * @param {?} collapseOthers
         * @return {?}
         */
        function (collapseOthers) {
            this._accordion.collapseOthers = collapseOthers;
        },
        enumerable: true,
        configurable: true
    });
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
    AccordionComponent.ctorParameters = function () { return [
        { type: AccordionService }
    ]; };
    AccordionComponent.propDecorators = {
        collapseOthers: [{ type: Input }]
    };
    return AccordionComponent;
}());
export { AccordionComponent };
function AccordionComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    AccordionComponent.prototype._accordion;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWNjb3JkaW9uLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2FjY29yZGlvbi9hY2NvcmRpb24uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLEtBQUssRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNqRCxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQzs7SUFrQm5ELDRCQUFvQixVQUE0QjtRQUE1QixlQUFVLEdBQVYsVUFBVSxDQUFrQjtLQUFLO0lBSnJELHNCQUFhLDhDQUFjOzs7OztRQUEzQixVQUE0QixjQUF1QjtZQUMvQyxJQUFJLENBQUMsVUFBVSxDQUFDLGNBQWMsR0FBRyxjQUFjLENBQUM7U0FDbkQ7OztPQUFBOztnQkFkSixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGNBQWM7b0JBQ3hCLHFDQUF5QztvQkFDekMsU0FBUyxFQUFFLENBQUUsZ0JBQWdCLENBQUU7b0JBQy9CLElBQUksRUFBRTt3QkFDRixPQUFPLEVBQUUsYUFBYTt3QkFDdEIsTUFBTSxFQUFFLFNBQVM7d0JBQ2pCLHNCQUFzQixFQUFFLE1BQU07cUJBQ2pDO2lCQUNKOzs7O2dCQVhRLGdCQUFnQjs7O2lDQWNwQixLQUFLOzs2QkFmVjs7U0FhYSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIElucHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBY2NvcmRpb25TZXJ2aWNlIH0gZnJvbSAnLi9hY2NvcmRpb24uc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtYWNjb3JkaW9uJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vYWNjb3JkaW9uLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcm92aWRlcnM6IFsgQWNjb3JkaW9uU2VydmljZSBdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ3BhbmVsLWdyb3VwJyxcbiAgICAgICAgJ3JvbGUnOiAndGFibGlzdCcsXG4gICAgICAgICdhcmlhLW11bHRpc2VsZWN0YWJsZSc6ICd0cnVlJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgQWNjb3JkaW9uQ29tcG9uZW50IHtcblxuICAgIEBJbnB1dCgpIHNldCBjb2xsYXBzZU90aGVycyhjb2xsYXBzZU90aGVyczogYm9vbGVhbikge1xuICAgICAgICB0aGlzLl9hY2NvcmRpb24uY29sbGFwc2VPdGhlcnMgPSBjb2xsYXBzZU90aGVycztcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9hY2NvcmRpb246IEFjY29yZGlvblNlcnZpY2UpIHsgfVxufSJdfQ==