/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ResizeModule } from '../../directives/resize/index';
import { CardTabContentDirective } from './card-tab/card-tab-content.directive';
import { CardTabComponent } from './card-tab/card-tab.component';
import { CardTabsetComponent } from './card-tabset/card-tabset.component';
var CardTabsModule = (function () {
    function CardTabsModule() {
    }
    CardTabsModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        ResizeModule
                    ],
                    declarations: [CardTabsetComponent, CardTabComponent, CardTabContentDirective],
                    exports: [CardTabsetComponent, CardTabComponent, CardTabContentDirective]
                },] },
    ];
    /** @nocollapse */
    CardTabsModule.ctorParameters = function () { return []; };
    return CardTabsModule;
}());
export { CardTabsModule };
function CardTabsModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CardTabsModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CardTabsModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC10YWJzLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2NhcmQtdGFicy9jYXJkLXRhYnMubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sdUNBQXVDLENBQUM7QUFDaEYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDakUsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0scUNBQXFDLENBQUM7Ozs7O2dCQUV6RSxRQUFRLFNBQUM7b0JBQ1IsT0FBTyxFQUFFO3dCQUNQLFlBQVk7d0JBQ1osWUFBWTtxQkFDYjtvQkFDRCxZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsRUFBRSxnQkFBZ0IsRUFBRSx1QkFBdUIsQ0FBQztvQkFDOUUsT0FBTyxFQUFFLENBQUMsbUJBQW1CLEVBQUUsZ0JBQWdCLEVBQUUsdUJBQXVCLENBQUM7aUJBQzFFOzs7O3lCQWREOztTQWVhLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFJlc2l6ZU1vZHVsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmVzaXplL2luZGV4JztcbmltcG9ydCB7IENhcmRUYWJDb250ZW50RGlyZWN0aXZlIH0gZnJvbSAnLi9jYXJkLXRhYi9jYXJkLXRhYi1jb250ZW50LmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBDYXJkVGFiQ29tcG9uZW50IH0gZnJvbSAnLi9jYXJkLXRhYi9jYXJkLXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FyZFRhYnNldENvbXBvbmVudCB9IGZyb20gJy4vY2FyZC10YWJzZXQvY2FyZC10YWJzZXQuY29tcG9uZW50JztcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1xuICAgIENvbW1vbk1vZHVsZSxcbiAgICBSZXNpemVNb2R1bGVcbiAgXSxcbiAgZGVjbGFyYXRpb25zOiBbQ2FyZFRhYnNldENvbXBvbmVudCwgQ2FyZFRhYkNvbXBvbmVudCwgQ2FyZFRhYkNvbnRlbnREaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbQ2FyZFRhYnNldENvbXBvbmVudCwgQ2FyZFRhYkNvbXBvbmVudCwgQ2FyZFRhYkNvbnRlbnREaXJlY3RpdmVdXG59KVxuZXhwb3J0IGNsYXNzIENhcmRUYWJzTW9kdWxlIHsgfVxuIl19