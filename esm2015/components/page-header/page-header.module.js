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
export class PageHeaderModule {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7QUFDOUUsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBQzdELE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ2hFLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBQ3pELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3BGLE9BQU8sRUFBRSwyQkFBMkIsRUFBRSxNQUFNLGlDQUFpQyxDQUFDO0FBQzlFLE9BQU8sRUFBRSx5Q0FBeUMsRUFBRSxNQUFNLDBFQUEwRSxDQUFDO0FBQ3JJLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHdEQUF3RCxDQUFDO0FBQzNHLE9BQU8sRUFBRSwwQ0FBMEMsRUFBRSxNQUFNLDRFQUE0RSxDQUFDO0FBQ3hJLE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQzlELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQTJCL0MsTUFBTTs7O1lBekJMLFFBQVEsU0FBQztnQkFDTixPQUFPLEVBQUU7b0JBQ0wsaUJBQWlCO29CQUNqQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7b0JBQzFCLGtCQUFrQjtvQkFDbEIsWUFBWTtvQkFDWixvQkFBb0I7b0JBQ3BCLFlBQVk7b0JBQ1osWUFBWTtvQkFDWixZQUFZO2lCQUNmO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxtQkFBbUI7b0JBQ25CLDZCQUE2QjtpQkFDaEM7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLG1CQUFtQjtvQkFDbkIsMkJBQTJCO29CQUMzQiw2QkFBNkI7b0JBQzdCLDZCQUE2QjtvQkFDN0IsaUNBQWlDO29CQUNqQyx5Q0FBeUM7b0JBQ3pDLDBDQUEwQztpQkFDN0M7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEJzRHJvcGRvd25Nb2R1bGUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL2Ryb3Bkb3duJztcbmltcG9ydCB7IE1lbnVOYXZpZ2F0aW9uTW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9tZW51LW5hdmlnYXRpb24vaW5kZXgnO1xuaW1wb3J0IHsgUmVzaXplTW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9yZXNpemUvaW5kZXgnO1xuaW1wb3J0IHsgQ29sb3JTZXJ2aWNlTW9kdWxlIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY29sb3IvaW5kZXgnO1xuaW1wb3J0IHsgQnJlYWRjcnVtYnNNb2R1bGUgfSBmcm9tICcuLi9icmVhZGNydW1icy9pbmRleCc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyQ3VzdG9tTWVudURpcmVjdGl2ZSB9IGZyb20gJy4vY3VzdG9tLW1lbnUvY3VzdG9tLW1lbnUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJJY29uTWVudUNvbXBvbmVudCB9IGZyb20gJy4vaWNvbi1tZW51L2ljb24tbWVudS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25Ecm9wZG93bkl0ZW1Db21wb25lbnQgfSBmcm9tICcuL25hdmlnYXRpb24vbmF2aWdhdGlvbi1kcm9wZG93bi1pdGVtL25hdmlnYXRpb24tZHJvcGRvd24taXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtQ29tcG9uZW50IH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24taXRlbS9uYXZpZ2F0aW9uLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uU2Vjb25kYXJ5SXRlbURpcmVjdGl2ZSB9IGZyb20gJy4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLXNlY29uZGFyeS1pdGVtL25hdmlnYXRpb24tc2Vjb25kYXJ5LWl0ZW0uZGlyZWN0aXZlJztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFBhZ2VIZWFkZXJDb21wb25lbnQgfSBmcm9tICcuL3BhZ2UtaGVhZGVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBUYWJzZXRNb2R1bGUgfSBmcm9tICcuLi90YWJzZXQvaW5kZXgnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQnJlYWRjcnVtYnNNb2R1bGUsXG4gICAgICAgIEJzRHJvcGRvd25Nb2R1bGUuZm9yUm9vdCgpLFxuICAgICAgICBDb2xvclNlcnZpY2VNb2R1bGUsXG4gICAgICAgIENvbW1vbk1vZHVsZSxcbiAgICAgICAgTWVudU5hdmlnYXRpb25Nb2R1bGUsXG4gICAgICAgIFJlc2l6ZU1vZHVsZSxcbiAgICAgICAgUm91dGVyTW9kdWxlLFxuICAgICAgICBUYWJzZXRNb2R1bGVcbiAgICBdLFxuICAgIGV4cG9ydHM6IFtcbiAgICAgICAgUGFnZUhlYWRlckNvbXBvbmVudCxcbiAgICAgICAgUGFnZUhlYWRlckN1c3RvbU1lbnVEaXJlY3RpdmVcbiAgICBdLFxuICAgIGRlY2xhcmF0aW9uczogW1xuICAgICAgICBQYWdlSGVhZGVyQ29tcG9uZW50LFxuICAgICAgICBQYWdlSGVhZGVySWNvbk1lbnVDb21wb25lbnQsXG4gICAgICAgIFBhZ2VIZWFkZXJDdXN0b21NZW51RGlyZWN0aXZlLFxuICAgICAgICBQYWdlSGVhZGVyTmF2aWdhdGlvbkNvbXBvbmVudCxcbiAgICAgICAgUGFnZUhlYWRlck5hdmlnYXRpb25JdGVtQ29tcG9uZW50LFxuICAgICAgICBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbUNvbXBvbmVudCxcbiAgICAgICAgUGFnZUhlYWRlck5hdmlnYXRpb25TZWNvbmRhcnlJdGVtRGlyZWN0aXZlXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYWdlSGVhZGVyTW9kdWxlIHsgfVxuIl19