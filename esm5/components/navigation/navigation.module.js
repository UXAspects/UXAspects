/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { NavigationItemComponent } from './navigation-item/navigation-item.component';
import { NavigationLinkDirective } from './navigation-link/navigation-link.directive';
import { NavigationComponent } from './navigation.component';
var NavigationModule = /** @class */ (function () {
    function NavigationModule() {
    }
    NavigationModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        AccessibilityModule,
                        CommonModule,
                        RouterModule
                    ],
                    exports: [
                        NavigationComponent,
                        NavigationItemComponent
                    ],
                    declarations: [
                        NavigationComponent,
                        NavigationItemComponent,
                        NavigationLinkDirective
                    ]
                },] }
    ];
    return NavigationModule;
}());
export { NavigationModule };

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmF2aWdhdGlvbi5tb2R1bGUuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9uYXZpZ2F0aW9uL25hdmlnYXRpb24ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0saUJBQWlCLENBQUM7QUFDL0MsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sc0NBQXNDLENBQUM7QUFDM0UsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdEYsT0FBTyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sNkNBQTZDLENBQUM7QUFDdEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sd0JBQXdCLENBQUM7Ozs7O2dCQUU1RCxRQUFRLFNBQUM7b0JBQ04sT0FBTyxFQUFFO3dCQUNMLG1CQUFtQjt3QkFDbkIsWUFBWTt3QkFDWixZQUFZO3FCQUNmO29CQUNELE9BQU8sRUFBRTt3QkFDTCxtQkFBbUI7d0JBQ25CLHVCQUF1QjtxQkFDMUI7b0JBQ0QsWUFBWSxFQUFFO3dCQUNWLG1CQUFtQjt3QkFDbkIsdUJBQXVCO3dCQUN2Qix1QkFBdUI7cUJBQzFCO2lCQUNKOzsyQkF2QkQ7O1NBd0JhLGdCQUFnQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbW1vbk1vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbic7XG5pbXBvcnQgeyBOZ01vZHVsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUm91dGVyTW9kdWxlIH0gZnJvbSAnQGFuZ3VsYXIvcm91dGVyJztcbmltcG9ydCB7IEFjY2Vzc2liaWxpdHlNb2R1bGUgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL2FjY2Vzc2liaWxpdHkvaW5kZXgnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkl0ZW1Db21wb25lbnQgfSBmcm9tICcuL25hdmlnYXRpb24taXRlbS9uYXZpZ2F0aW9uLWl0ZW0uY29tcG9uZW50JztcbmltcG9ydCB7IE5hdmlnYXRpb25MaW5rRGlyZWN0aXZlIH0gZnJvbSAnLi9uYXZpZ2F0aW9uLWxpbmsvbmF2aWdhdGlvbi1saW5rLmRpcmVjdGl2ZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ29tcG9uZW50IH0gZnJvbSAnLi9uYXZpZ2F0aW9uLmNvbXBvbmVudCc7XG5cbkBOZ01vZHVsZSh7XG4gICAgaW1wb3J0czogW1xuICAgICAgICBBY2Nlc3NpYmlsaXR5TW9kdWxlLFxuICAgICAgICBDb21tb25Nb2R1bGUsXG4gICAgICAgIFJvdXRlck1vZHVsZVxuICAgIF0sXG4gICAgZXhwb3J0czogW1xuICAgICAgICBOYXZpZ2F0aW9uQ29tcG9uZW50LFxuICAgICAgICBOYXZpZ2F0aW9uSXRlbUNvbXBvbmVudFxuICAgIF0sXG4gICAgZGVjbGFyYXRpb25zOiBbXG4gICAgICAgIE5hdmlnYXRpb25Db21wb25lbnQsXG4gICAgICAgIE5hdmlnYXRpb25JdGVtQ29tcG9uZW50LFxuICAgICAgICBOYXZpZ2F0aW9uTGlua0RpcmVjdGl2ZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTmF2aWdhdGlvbk1vZHVsZSB7IH1cbiJdfQ==