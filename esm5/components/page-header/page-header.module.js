/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
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
import { TabsetModule } from '../tabset/index';
var PageHeaderModule = /** @class */ (function () {
    function PageHeaderModule() {
    }
    PageHeaderModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        BreadcrumbsModule,
                        BsDropdownModule.forRoot(),
                        ColorServiceModule,
                        CommonModule,
                        MenuNavigationModule,
                        ResizeModule,
                        RouterModule,
                        TabsetModule
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
                },] }
    ];
    return PageHeaderModule;
}());
export { PageHeaderModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDOUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSx5Q0FBeUMsRUFBRSxNQUFNLDBFQUEwRSxDQUFDO0FBQ3JJLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQzNHLE9BQU8sRUFBRSwwQ0FBMEMsRUFBRSxNQUFNLDRFQUE0RSxDQUFDO0FBQ3hJLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQzs7Ozs7Z0JBRTlDLFFBQVEsU0FBQztvQkFDTixPQUFPLEVBQUU7d0JBQ0wsaUJBQWlCO3dCQUNqQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7d0JBQzFCLGtCQUFrQjt3QkFDbEIsWUFBWTt3QkFDWixvQkFBb0I7d0JBQ3BCLFlBQVk7d0JBQ1osWUFBWTt3QkFDWixZQUFZO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDTCxtQkFBbUI7d0JBQ25CLDZCQUE2QjtxQkFDaEM7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLG1CQUFtQjt3QkFDbkIsMkJBQTJCO3dCQUMzQiw2QkFBNkI7d0JBQzdCLDZCQUE2Qjt3QkFDN0IsaUNBQWlDO3dCQUNqQyx5Q0FBeUM7d0JBQ3pDLDBDQUEwQztxQkFDN0M7aUJBQ0o7OzJCQXpDRDs7U0EwQ2EsZ0JBQWdCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tbW9uTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSb3V0ZXJNb2R1bGUgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuaW1wb3J0IHsgQnNEcm9wZG93bk1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAvZHJvcGRvd24nO1xuaW1wb3J0IHsgTWVudU5hdmlnYXRpb25Nb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL21lbnUtbmF2aWdhdGlvbi9pbmRleCc7XG5pbXBvcnQgeyBSZXNpemVNb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Jlc2l6ZS9pbmRleCc7XG5pbXBvcnQgeyBDb2xvclNlcnZpY2VNb2R1bGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb2xvci9pbmRleCc7XG5pbXBvcnQgeyBCcmVhZGNydW1ic01vZHVsZSB9IGZyb20gJy4uL2JyZWFkY3J1bWJzL2luZGV4JztcbmltcG9ydCB7IFBhZ2VIZWFkZXJDdXN0b21NZW51RGlyZWN0aXZlIH0gZnJvbSAnLi9jdXN0b20tbWVudS9jdXN0b20tbWVudS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUGFnZUhlYWRlckljb25NZW51Q29tcG9uZW50IH0gZnJvbSAnLi9pY29uLW1lbnUvaWNvbi1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLWRyb3Bkb3duLWl0ZW0vbmF2aWdhdGlvbi1kcm9wZG93bi1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQgfSBmcm9tICcuL25hdmlnYXRpb24vbmF2aWdhdGlvbi1pdGVtL25hdmlnYXRpb24taXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25TZWNvbmRhcnlJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24tc2Vjb25kYXJ5LWl0ZW0vbmF2aWdhdGlvbi1zZWNvbmRhcnktaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25Db21wb25lbnQgfSBmcm9tICcuL25hdmlnYXRpb24vbmF2aWdhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFnZUhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vcGFnZS1oZWFkZXIuY29tcG9uZW50JztcbmltcG9ydCB7IFRhYnNldE1vZHVsZSB9IGZyb20gJy4uL3RhYnNldC9pbmRleCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBCcmVhZGNydW1ic01vZHVsZSxcbiAgICAgICAgQnNEcm9wZG93bk1vZHVsZS5mb3JSb290KCksXG4gICAgICAgIENvbG9yU2VydmljZU1vZHVsZSxcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBNZW51TmF2aWdhdGlvbk1vZHVsZSxcbiAgICAgICAgUmVzaXplTW9kdWxlLFxuICAgICAgICBSb3V0ZXJNb2R1bGUsXG4gICAgICAgIFRhYnNldE1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBQYWdlSGVhZGVyQ29tcG9uZW50LFxuICAgICAgICBQYWdlSGVhZGVyQ3VzdG9tTWVudURpcmVjdGl2ZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFBhZ2VIZWFkZXJDb21wb25lbnQsXG4gICAgICAgIFBhZ2VIZWFkZXJJY29uTWVudUNvbXBvbmVudCxcbiAgICAgICAgUGFnZUhlYWRlckN1c3RvbU1lbnVEaXJlY3RpdmUsXG4gICAgICAgIFBhZ2VIZWFkZXJOYXZpZ2F0aW9uQ29tcG9uZW50LFxuICAgICAgICBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQsXG4gICAgICAgIFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtQ29tcG9uZW50LFxuICAgICAgICBQYWdlSGVhZGVyTmF2aWdhdGlvblNlY29uZGFyeUl0ZW1EaXJlY3RpdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VIZWFkZXJNb2R1bGUgeyB9XG4iXX0=