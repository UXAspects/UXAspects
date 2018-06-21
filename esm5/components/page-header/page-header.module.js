/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { PageHeaderComponent } from './page-header.component';
import { BreadcrumbsModule } from '../breadcrumbs/index';
import { PageHeaderIconMenuComponent } from './icon-menu/icon-menu.component';
import { PageHeaderNavigationComponent } from './navigation/navigation.component';
import { PageHeaderNavigationItemComponent } from './navigation/navigation-item/navigation-item.component';
import { PageHeaderNavigationDropdownItemComponent } from './navigation/navigation-dropdown-item/navigation-dropdown-item.component';
import { PageHeaderCustomMenuDirective } from './custom-menu/custom-menu.directive';
import { ResizeModule } from '../../directives/resize/index';
import { ColorServiceModule } from '../../services/color/index';
import { MenuNavigationModule } from '../../directives/menu-navigation/index';
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
                        PageHeaderNavigationDropdownItemComponent
                    ]
                },] },
    ];
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1oZWFkZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvcGFnZS1oZWFkZXIvcGFnZS1oZWFkZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3pDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxpQkFBaUIsQ0FBQztBQUMvQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUUxRCxPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM5RCxPQUFPLEVBQUUsaUJBQWlCLEVBQUUsTUFBTSxzQkFBc0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsMkJBQTJCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUM5RSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUNsRixPQUFPLEVBQUUsaUNBQWlDLEVBQUUsTUFBTSx3REFBd0QsQ0FBQztBQUMzRyxPQUFPLEVBQUUseUNBQXlDLEVBQUUsTUFBTSwwRUFBMEUsQ0FBQztBQUNySSxPQUFPLEVBQUUsNkJBQTZCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNwRixPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDN0QsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDaEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sd0NBQXdDLENBQUM7Ozs7O2dCQUU3RSxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLFlBQVk7d0JBQ1osaUJBQWlCO3dCQUNqQixrQkFBa0I7d0JBQ2xCLFlBQVk7d0JBQ1osb0JBQW9CO3dCQUNwQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7cUJBQzdCO29CQUNELE9BQU8sRUFBRTt3QkFDTCxtQkFBbUI7d0JBQ25CLDZCQUE2QjtxQkFDaEM7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLG1CQUFtQjt3QkFDbkIsMkJBQTJCO3dCQUMzQiw2QkFBNkI7d0JBQzdCLDZCQUE2Qjt3QkFDN0IsaUNBQWlDO3dCQUNqQyx5Q0FBeUM7cUJBQzVDO2lCQUNKOzsyQkFwQ0Q7O1NBcUNhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBDb21tb25Nb2R1bGUgfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHsgQnNEcm9wZG93bk1vZHVsZSB9IGZyb20gJ25neC1ib290c3RyYXAvZHJvcGRvd24nO1xuXG5pbXBvcnQgeyBQYWdlSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9wYWdlLWhlYWRlci5jb21wb25lbnQnO1xuaW1wb3J0IHsgQnJlYWRjcnVtYnNNb2R1bGUgfSBmcm9tICcuLi9icmVhZGNydW1icy9pbmRleCc7XG5pbXBvcnQgeyBQYWdlSGVhZGVySWNvbk1lbnVDb21wb25lbnQgfSBmcm9tICcuL2ljb24tbWVudS9pY29uLW1lbnUuY29tcG9uZW50JztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9uYXZpZ2F0aW9uL25hdmlnYXRpb24uY29tcG9uZW50JztcbmltcG9ydCB7IFBhZ2VIZWFkZXJOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLWl0ZW0vbmF2aWdhdGlvbi1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyTmF2aWdhdGlvbkRyb3Bkb3duSXRlbUNvbXBvbmVudCB9IGZyb20gJy4vbmF2aWdhdGlvbi9uYXZpZ2F0aW9uLWRyb3Bkb3duLWl0ZW0vbmF2aWdhdGlvbi1kcm9wZG93bi1pdGVtLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBQYWdlSGVhZGVyQ3VzdG9tTWVudURpcmVjdGl2ZSB9IGZyb20gJy4vY3VzdG9tLW1lbnUvY3VzdG9tLW1lbnUuZGlyZWN0aXZlJztcbmltcG9ydCB7IFJlc2l6ZU1vZHVsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcmVzaXplL2luZGV4JztcbmltcG9ydCB7IENvbG9yU2VydmljZU1vZHVsZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NvbG9yL2luZGV4JztcbmltcG9ydCB7IE1lbnVOYXZpZ2F0aW9uTW9kdWxlIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9tZW51LW5hdmlnYXRpb24vaW5kZXgnO1xuXG5ATmdNb2R1bGUoe1xuICAgIGltcG9ydHM6IFtcbiAgICAgICAgQ29tbW9uTW9kdWxlLFxuICAgICAgICBCcmVhZGNydW1ic01vZHVsZSxcbiAgICAgICAgQ29sb3JTZXJ2aWNlTW9kdWxlLFxuICAgICAgICBSZXNpemVNb2R1bGUsXG4gICAgICAgIE1lbnVOYXZpZ2F0aW9uTW9kdWxlLFxuICAgICAgICBCc0Ryb3Bkb3duTW9kdWxlLmZvclJvb3QoKVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBQYWdlSGVhZGVyQ29tcG9uZW50LFxuICAgICAgICBQYWdlSGVhZGVyQ3VzdG9tTWVudURpcmVjdGl2ZVxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIFBhZ2VIZWFkZXJDb21wb25lbnQsXG4gICAgICAgIFBhZ2VIZWFkZXJJY29uTWVudUNvbXBvbmVudCxcbiAgICAgICAgUGFnZUhlYWRlckN1c3RvbU1lbnVEaXJlY3RpdmUsXG4gICAgICAgIFBhZ2VIZWFkZXJOYXZpZ2F0aW9uQ29tcG9uZW50LFxuICAgICAgICBQYWdlSGVhZGVyTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQsXG4gICAgICAgIFBhZ2VIZWFkZXJOYXZpZ2F0aW9uRHJvcGRvd25JdGVtQ29tcG9uZW50XG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBQYWdlSGVhZGVyTW9kdWxlIHsgfVxuIl19