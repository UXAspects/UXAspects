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
export class PageHeaderModule {
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
            },] }
];

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUMxRCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSx3Q0FBd0MsQ0FBQztBQUM5RSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDaEUsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sc0JBQXNCLENBQUM7QUFDekQsT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDcEYsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0saUNBQWlDLENBQUM7QUFDOUUsT0FBTyxFQUFFLHlDQUF5QyxFQUFFLE1BQU0sMEVBQTBFLENBQUM7QUFDckksT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0sd0RBQXdELENBQUM7QUFDM0csT0FBTyxFQUFFLDBDQUEwQyxFQUFFLE1BQU0sNEVBQTRFLENBQUM7QUFDeEksT0FBTyxFQUFFLDZCQUE2QixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFDbEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUEwQjlELE1BQU07OztZQXZCTCxRQUFRLFNBQUM7Z0JBQ04sT0FBTyxFQUFFO29CQUNMLFlBQVk7b0JBQ1osaUJBQWlCO29CQUNqQixrQkFBa0I7b0JBQ2xCLFlBQVk7b0JBQ1osb0JBQW9CO29CQUNwQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7aUJBQzdCO2dCQUNELE9BQU8sRUFBRTtvQkFDTCxtQkFBbUI7b0JBQ25CLDZCQUE2QjtpQkFDaEM7Z0JBQ0QsWUFBWSxFQUFFO29CQUNWLG1CQUFtQjtvQkFDbkIsMkJBQTJCO29CQUMzQiw2QkFBNkI7b0JBQzdCLDZCQUE2QjtvQkFDN0IsaUNBQWlDO29CQUNqQyx5Q0FBeUM7b0JBQ3pDLDBDQUEwQztpQkFDN0M7YUFDSiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQnNEcm9wZG93bk1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAvZHJvcGRvd24nO1xuaW1wb3J0IHsgTWVudU5hdmlnYXRpb25Nb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL21lbnUtbmF2aWdhdGlvbi9pbmRleCc7XG5pbXBvcnQgeyBSZXNpemVNb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Jlc2l6ZS9pbmRleCc7XG5pbXBvcnQgeyBDb2xvclNlcnZpY2VNb2R1bGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jb2xvci9pbmRleCc7XG5pbXBvcnQgeyBCcmVhZGNydW1ic01vZHVsZSB9IGZyb20gJy4uL2JyZWFkY3J1bWJzL2luZGV4JztcbmltcG9ydCB7IFBhZ2VIZWFkZXJDdXN0b21NZW51RGlyZWN0aXZlIH0gZnJvbSAnLi9jdXN0b20tbWVudS9jdXN0b20tbWVudS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUGFnZUhlYWRlckljb25NZW51Q29tcG9uZW50IH0gZnJvbSAnLi9pY29uLW1lbnUvaWNvbi1tZW51LmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLWRyb3Bkb3duLWl0ZW0vbmF2aWdhdGlvbi1kcm9wZG93bi1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQgfSBmcm9tICcuL25hdmlnYXRpb24vbmF2aWdhdGlvbi1pdGVtL25hdmlnYXRpb24taXRlbS5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25TZWNvbmRhcnlJdGVtRGlyZWN0aXZlIH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24tc2Vjb25kYXJ5LWl0ZW0vbmF2aWdhdGlvbi1zZWNvbmRhcnktaXRlbS5kaXJlY3RpdmUnO1xuaW1wb3J0IHsgUGFnZUhlYWRlck5hdmlnYXRpb25Db21wb25lbnQgfSBmcm9tICcuL25hdmlnYXRpb24vbmF2aWdhdGlvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgUGFnZUhlYWRlckNvbXBvbmVudCB9IGZyb20gJy4vcGFnZS1oZWFkZXIuY29tcG9uZW50JztcblxuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBCcmVhZGNydW1ic01vZHVsZSxcbiAgICAgICAgQ29sb3JTZXJ2aWNlTW9kdWxlLFxuICAgICAgICBSZXNpemVNb2R1bGUsXG4gICAgICAgIE1lbnVOYXZpZ2F0aW9uTW9kdWxlLFxuICAgICAgICBCc0Ryb3Bkb3duTW9kdWxlLmZvclJvb3QoKVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBQYWdlSGVhZGVyQ29tcG9uZW50LFxuICAgICAgICBQYWdlSGVhZGVyQ3VzdG9tTWVudURpcmVjdGl2ZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFBhZ2VIZWFkZXJDb21wb25lbnQsXG4gICAgICAgIFBhZ2VIZWFkZXJJY29uTWVudUNvbXBvbmVudCxcbiAgICAgICAgUGFnZUhlYWRlckN1c3RvbU1lbnVEaXJlY3RpdmUsXG4gICAgICAgIFBhZ2VIZWFkZXJOYXZpZ2F0aW9uQ29tcG9uZW50LFxuICAgICAgICBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQsXG4gICAgICAgIFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtQ29tcG9uZW50LFxuICAgICAgICBQYWdlSGVhZGVyTmF2aWdhdGlvblNlY29uZGFyeUl0ZW1EaXJlY3RpdmVcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIFBhZ2VIZWFkZXJNb2R1bGUgeyB9XG4iXX0=