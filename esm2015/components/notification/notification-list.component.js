/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { NotificationService } from './notification.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { map } from 'rxjs/operators';
export class NotificationListComponent {
    /**
     * @param {?} _notificationService
     */
    constructor(_notificationService) {
        this._notificationService = _notificationService;
        this.position = 'top-right';
        this.notifications$ = this._notificationService.notifications$.pipe(map((notificationRefs) => notificationRefs.filter(notificationRef => notificationRef.visible)));
    }
    /**
     * @param {?} direction
     * @return {?}
     */
    set direction(direction) {
        this._notificationService.direction = direction;
    }
}
NotificationListComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-notification-list',
                template: "<div class=\"notification\" *ngFor=\"let notificationRef of notifications$ | async; let idx = index\"\r\n    [style.top.px]=\"(notificationRef.height + notificationRef.spacing) * idx\"\r\n    [style.height.px]=\"notificationRef.height\"\r\n    [style.background-color]=\"notificationRef.backgroundColor\"\r\n    [@notificationState]>\r\n    <ng-container *ngTemplateOutlet=\"notificationRef.templateRef; context: { $implicit: notificationRef, data: notificationRef.data }\"></ng-container>\r\n</div>\r\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('notificationState', [
                        state('in', style({ transform: 'translateY(0)', opacity: 0.9 })),
                        transition(':enter', [
                            style({ transform: 'translateY(-50px)', opacity: 0 }),
                            animate(500)
                        ]),
                        transition(':leave', [
                            animate(500, style({ transform: 'translateY(50px)', opacity: 0 }))
                        ])
                    ])
                ]
            }] }
];
/** @nocollapse */
NotificationListComponent.ctorParameters = () => [
    { type: NotificationService }
];
NotificationListComponent.propDecorators = {
    direction: [{ type: Input }],
    position: [{ type: Input }, { type: HostBinding, args: ['class',] }]
};
function NotificationListComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NotificationListComponent.prototype.position;
    /** @type {?} */
    NotificationListComponent.prototype.notifications$;
    /** @type {?} */
    NotificationListComponent.prototype._notificationService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxtQkFBbUIsRUFBOEMsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQW9CckMsTUFBTTs7OztJQWFGLFlBQW9CLG9CQUF5QztRQUF6Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO3dCQU5NLFdBQVc7OEJBRTlCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUN6RixHQUFHLENBQUMsQ0FBQyxnQkFBbUMsRUFBRSxFQUFFLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLGVBQWUsQ0FBQyxFQUFFLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUNuSCxDQUFDO0tBSUQ7Ozs7O0lBYkQsSUFDSSxTQUFTLENBQUMsU0FBb0M7UUFDOUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7S0FDbkQ7OztZQXRCSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMsbWdCQUFpRDtnQkFDakQsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07Z0JBQy9DLFVBQVUsRUFBRTtvQkFDUixPQUFPLENBQUMsbUJBQW1CLEVBQUU7d0JBQ3pCLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzt3QkFDaEUsVUFBVSxDQUFDLFFBQVEsRUFBRTs0QkFDakIsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQzs0QkFDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQzt5QkFDZixDQUFDO3dCQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUU7NEJBQ2pCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO3lCQUNyRSxDQUFDO3FCQUNMLENBQUM7aUJBQ0w7YUFDSjs7OztZQXJCUSxtQkFBbUI7Ozt3QkF3QnZCLEtBQUs7dUJBS0wsS0FBSyxZQUFJLFdBQVcsU0FBQyxPQUFPIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBIb3N0QmluZGluZywgSW5wdXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOb3RpZmljYXRpb25TZXJ2aWNlLCBOb3RpZmljYXRpb25SZWYsIE5vdGlmaWNhdGlvbkxpc3REaXJlY3Rpb24gfSBmcm9tICcuL25vdGlmaWNhdGlvbi5zZXJ2aWNlJztcbmltcG9ydCB7IHRyaWdnZXIsIHN0YXRlLCBzdHlsZSwgYW5pbWF0ZSwgdHJhbnNpdGlvbiB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgbWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMvT2JzZXJ2YWJsZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtbm90aWZpY2F0aW9uLWxpc3QnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9ub3RpZmljYXRpb24tbGlzdC5jb21wb25lbnQuaHRtbCcsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdub3RpZmljYXRpb25TdGF0ZScsIFtcbiAgICAgICAgICAgIHN0YXRlKCdpbicsIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsIG9wYWNpdHk6IDAuOSB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MHB4KScsIG9wYWNpdHk6IDAgfSksXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSg1MDApXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKDUwMCwgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDUwcHgpJywgb3BhY2l0eTogMCB9KSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25MaXN0Q29tcG9uZW50IHtcbiAgICBcbiAgICBASW5wdXQoKSBcbiAgICBzZXQgZGlyZWN0aW9uKGRpcmVjdGlvbjogTm90aWZpY2F0aW9uTGlzdERpcmVjdGlvbikge1xuICAgICAgICB0aGlzLl9ub3RpZmljYXRpb25TZXJ2aWNlLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzJykgcG9zaXRpb246IE5vdGlmaWNhdGlvbkxpc3RQb3N0aW9uID0gJ3RvcC1yaWdodCc7XG5cbiAgICBub3RpZmljYXRpb25zJDogT2JzZXJ2YWJsZTxOb3RpZmljYXRpb25SZWZbXT4gPSB0aGlzLl9ub3RpZmljYXRpb25TZXJ2aWNlLm5vdGlmaWNhdGlvbnMkLnBpcGUoXG4gICAgICAgIG1hcCgobm90aWZpY2F0aW9uUmVmczogTm90aWZpY2F0aW9uUmVmW10pID0+IG5vdGlmaWNhdGlvblJlZnMuZmlsdGVyKG5vdGlmaWNhdGlvblJlZiA9PiBub3RpZmljYXRpb25SZWYudmlzaWJsZSksXG4gICAgKSk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9ub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XG5cbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIE5vdGlmaWNhdGlvbkxpc3RQb3N0aW9uID0gJ3RvcC1sZWZ0JyB8ICd0b3AtcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JyB8ICdib3R0b20tcmlnaHQnOyJdfQ==