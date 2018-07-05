/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { MenuNavigationModule } from '../../directives/menu-navigation/index';
import { ResizeModule } from '../../directives/resize/index';
import { ColorServiceModule } from '../../services/color/index';
import { BreadcrumbsModule } from '../breadcrumbs/index';
import { PageHeaderCustomMenuDirective } from './custom-menu/custom-menu.directive';
import { PageHeaderIconMenuComponent } from './icon-menu/icon-menu.component';
import { PageHeaderNavigationDropdownItemComponent } from './navigation/navigation-dropdown-item/navigation-dropdown-item.component';
import { PageHeaderNavigationItemComponent } from './navigation/navigation-item/navigation-item.component';
import { PageHeaderNavigationSecondaryItemDirective } from './navigation/navigation-secondary-item/navigation-secondary-item.directive';
import { PageHeaderNavigationComponent } from './navigation/navigation.component';
import { PageHeaderComponent } from './page-header.component';
var PageHeaderModule = (function () {
    function PageHeaderModule() {
    }
    PageHeaderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        CommonModule,
                        BreadcrumbsModule,
                        ColorServiceModule,
                        ResizeModule,
                        MenuNavigationModule,
                        BsDropdownModule.forRoot()
                    ],
                    exports: [
                        PageHeaderComponent,
                        PageHeaderCustomMenuDirective
                    ],
                    declarations: [
                        PageHeaderComponent,
                        PageHeaderIconMenuComponent,
                        PageHeaderCustomMenuDirective,
                        PageHeaderNavigationComponent,
                        PageHeaderNavigationItemComponent,
                        PageHeaderNavigationDropdownItemComponent,
                        PageHeaderNavigationSecondaryItemDirective
                    ]
                },] },
    ];
    /** @nocollapse */
    PageHeaderModule.ctorParameters = function () { return []; };
    return PageHeaderModule;
}());
export { PageHeaderModule };
function PageHeaderModule_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    PageHeaderModule.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    PageHeaderModule.ctorParameters;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDcEYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHlDQUF5QyxFQUFFLE1BQU0sMEVBQTBFLENBQUM7QUFDckksT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDM0csT0FBTyxFQUFFLDBDQUEwQyxFQUFFLE1BQU0sNEVBQTRFLENBQUM7QUFDeEksT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDbEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7Ozs7O2dCQUc3RCxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osaUJBQWlCO3dCQUNqQixrQkFBa0I7d0JBQ2xCLFlBQVk7d0JBQ1osb0JBQW9CO3dCQUNwQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7cUJBQzdCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxtQkFBbUI7d0JBQ25CLDZCQUE2QjtxQkFDaEM7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLG1CQUFtQjt3QkFDbkIsMkJBQTJCO3dCQUMzQiw2QkFBNkI7d0JBQzdCLDZCQUE2Qjt3QkFDN0IsaUNBQWlDO3dCQUNqQyx5Q0FBeUM7d0JBQ3pDLDBDQUEwQztxQkFDN0M7aUJBQ0o7Ozs7MkJBdENEOztTQXVDYSxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgTmdNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJzRHJvcGRvd25Nb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2Ryb3Bkb3duJztcbmltcG9ydCB7IE1lbnVOYXZpZ2F0aW9uTW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9tZW51LW5hdmlnYXRpb24vaW5kZXgnO1xuaW1wb3J0IHsgUmVzaXplTW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yZXNpemUvaW5kZXgnO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29sb3IvaW5kZXgnO1xuaW1wb3J0IHsgQnJlYWRjcnVtYnNNb2R1bGUgfSBmcm9tICcuLi9icmVhZGNydW1icy9pbmRleCc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyQ3VzdG9tTWVudURpcmVjdGl2ZSB9IGZyb20gJy4vY3VzdG9tLW1lbnUvY3VzdG9tLW1lbnUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJJY29uTWVudUNvbXBvbmVudCB9IGZyb20gJy4vaWNvbi1tZW51L2ljb24tbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW1Db21wb25lbnQgfSBmcm9tICcuL25hdmlnYXRpb24vbmF2aWdhdGlvbi1kcm9wZG93bi1pdGVtL25hdmlnYXRpb24tZHJvcGRvd24taXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24taXRlbS9uYXZpZ2F0aW9uLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uU2Vjb25kYXJ5SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLXNlY29uZGFyeS1pdGVtL25hdmlnYXRpb24tc2Vjb25kYXJ5LWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFBhZ2VIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL3BhZ2UtaGVhZGVyLmNvbXBvbmVudCc7XG5cblxuQE5nTW9kdWxlKHtcbiAgICBpbXBvcnRzOiBbXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgQnJlYWRjcnVtYnNNb2R1bGUsXG4gICAgICAgIENvbG9yU2VydmljZU1vZHVsZSxcbiAgICAgICAgUmVzaXplTW9kdWxlLFxuICAgICAgICBNZW51TmF2aWdhdGlvbk1vZHVsZSxcbiAgICAgICAgQnNEcm9wZG93bk1vZHVsZS5mb3JSb290KClcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUGFnZUhlYWRlckNvbXBvbmVudCxcbiAgICAgICAgUGFnZUhlYWRlckN1c3RvbU1lbnVEaXJlY3RpdmVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBQYWdlSGVhZGVyQ29tcG9uZW50LFxuICAgICAgICBQYWdlSGVhZGVySWNvbk1lbnVDb21wb25lbnQsXG4gICAgICAgIFBhZ2VIZWFkZXJDdXN0b21NZW51RGlyZWN0aXZlLFxuICAgICAgICBQYWdlSGVhZGVyTmF2aWdhdGlvbkNvbXBvbmVudCxcbiAgICAgICAgUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtQ29tcG9uZW50LFxuICAgICAgICBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbUNvbXBvbmVudCxcbiAgICAgICAgUGFnZUhlYWRlck5hdmlnYXRpb25TZWNvbmRhcnlJdGVtRGlyZWN0aXZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYWdlSGVhZGVyTW9kdWxlIHsgfVxuIl19