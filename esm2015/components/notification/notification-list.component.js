/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { NotificationService } from './notification.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { map } from 'rxjs/operators/map';
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
                template: `<div class="notification" *ngFor="let notificationRef of notifications$ | async; let idx = index"
    [style.top.px]="(notificationRef.height + notificationRef.spacing) * idx"
    [style.height.px]="notificationRef.height"
    [style.background-color]="notificationRef.backgroundColor"
    [@notificationState]>
    <ng-container *ngTemplateOutlet="notificationRef.templateRef; context: { $implicit: notificationRef, data: notificationRef.data }"></ng-container>
</div>
`,
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
            },] },
];
/** @nocollapse */
NotificationListComponent.ctorParameters = () => [
    { type: NotificationService, },
];
NotificationListComponent.propDecorators = {
    "direction": [{ type: Input },],
    "position": [{ type: Input }, { type: HostBinding, args: ['class',] },],
};
function NotificationListComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    NotificationListComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    NotificationListComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    NotificationListComponent.propDecorators;
    /** @type {?} */
    NotificationListComponent.prototype.position;
    /** @type {?} */
    NotificationListComponent.prototype.notifications$;
    /** @type {?} */
    NotificationListComponent.prototype._notificationService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxtQkFBbUIsRUFBOEMsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQTJCekMsTUFBTTs7OztJQWFGLFlBQW9CLG9CQUF5QztRQUF6Qyx5QkFBb0IsR0FBcEIsb0JBQW9CLENBQXFCO3dCQU5NLFdBQVc7OEJBRTlCLElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUN6RixHQUFHLENBQUMsQ0FBQyxnQkFBbUMsS0FBSyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsZUFBZSxJQUFJLGVBQWUsQ0FBQyxPQUFPLENBQUMsQ0FDbkgsQ0FBQztLQUlEOzs7OztRQVpHLFNBQVMsQ0FBQyxTQUFvQztRQUM5QyxJQUFJLENBQUMsb0JBQW9CLENBQUMsU0FBUyxHQUFHLFNBQVMsQ0FBQzs7OztZQTVCdkQsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSxzQkFBc0I7Z0JBQ2hDLFFBQVEsRUFBRTs7Ozs7OztDQU9iO2dCQUNHLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxVQUFVLEVBQUU7b0JBQ1IsT0FBTyxDQUFDLG1CQUFtQixFQUFFO3dCQUN6QixLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7d0JBQ2hFLFVBQVUsQ0FBQyxRQUFRLEVBQUU7NEJBQ2pCLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7NEJBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUM7eUJBQ2YsQ0FBQzt3QkFDRixVQUFVLENBQUMsUUFBUSxFQUFFOzRCQUNqQixPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzt5QkFDckUsQ0FBQztxQkFDTCxDQUFDO2lCQUNMO2FBQ0o7Ozs7WUE1QlEsbUJBQW1COzs7MEJBK0J2QixLQUFLO3lCQUtMLEtBQUssWUFBSSxXQUFXLFNBQUMsT0FBTyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSwgTm90aWZpY2F0aW9uUmVmLCBOb3RpZmljYXRpb25MaXN0RGlyZWN0aW9uIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzL21hcCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1ub3RpZmljYXRpb24tbGlzdCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibm90aWZpY2F0aW9uXCIgKm5nRm9yPVwibGV0IG5vdGlmaWNhdGlvblJlZiBvZiBub3RpZmljYXRpb25zJCB8IGFzeW5jOyBsZXQgaWR4ID0gaW5kZXhcIlxyXG4gICAgW3N0eWxlLnRvcC5weF09XCIobm90aWZpY2F0aW9uUmVmLmhlaWdodCArIG5vdGlmaWNhdGlvblJlZi5zcGFjaW5nKSAqIGlkeFwiXHJcbiAgICBbc3R5bGUuaGVpZ2h0LnB4XT1cIm5vdGlmaWNhdGlvblJlZi5oZWlnaHRcIlxyXG4gICAgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwibm90aWZpY2F0aW9uUmVmLmJhY2tncm91bmRDb2xvclwiXHJcbiAgICBbQG5vdGlmaWNhdGlvblN0YXRlXT5cclxuICAgIDxuZy1jb250YWluZXIgKm5nVGVtcGxhdGVPdXRsZXQ9XCJub3RpZmljYXRpb25SZWYudGVtcGxhdGVSZWY7IGNvbnRleHQ6IHsgJGltcGxpY2l0OiBub3RpZmljYXRpb25SZWYsIGRhdGE6IG5vdGlmaWNhdGlvblJlZi5kYXRhIH1cIj48L25nLWNvbnRhaW5lcj5cclxuPC9kaXY+XHJcbmAsXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdub3RpZmljYXRpb25TdGF0ZScsIFtcbiAgICAgICAgICAgIHN0YXRlKCdpbicsIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwKScsIG9wYWNpdHk6IDAuOSB9KSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCc6ZW50ZXInLCBbXG4gICAgICAgICAgICAgICAgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKC01MHB4KScsIG9wYWNpdHk6IDAgfSksXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSg1MDApXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJzpsZWF2ZScsIFtcbiAgICAgICAgICAgICAgICBhbmltYXRlKDUwMCwgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDUwcHgpJywgb3BhY2l0eTogMCB9KSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBOb3RpZmljYXRpb25MaXN0Q29tcG9uZW50IHtcbiAgICBcbiAgICBASW5wdXQoKSBcbiAgICBzZXQgZGlyZWN0aW9uKGRpcmVjdGlvbjogTm90aWZpY2F0aW9uTGlzdERpcmVjdGlvbikge1xuICAgICAgICB0aGlzLl9ub3RpZmljYXRpb25TZXJ2aWNlLmRpcmVjdGlvbiA9IGRpcmVjdGlvbjtcbiAgICB9XG5cbiAgICBASW5wdXQoKSBASG9zdEJpbmRpbmcoJ2NsYXNzJykgcG9zaXRpb246IE5vdGlmaWNhdGlvbkxpc3RQb3N0aW9uID0gJ3RvcC1yaWdodCc7XG5cbiAgICBub3RpZmljYXRpb25zJDogT2JzZXJ2YWJsZTxOb3RpZmljYXRpb25SZWZbXT4gPSB0aGlzLl9ub3RpZmljYXRpb25TZXJ2aWNlLm5vdGlmaWNhdGlvbnMkLnBpcGUoXG4gICAgICAgIG1hcCgobm90aWZpY2F0aW9uUmVmczogTm90aWZpY2F0aW9uUmVmW10pID0+IG5vdGlmaWNhdGlvblJlZnMuZmlsdGVyKG5vdGlmaWNhdGlvblJlZiA9PiBub3RpZmljYXRpb25SZWYudmlzaWJsZSksXG4gICAgKSk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9ub3RpZmljYXRpb25TZXJ2aWNlOiBOb3RpZmljYXRpb25TZXJ2aWNlKSB7XG5cbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIE5vdGlmaWNhdGlvbkxpc3RQb3N0aW9uID0gJ3RvcC1sZWZ0JyB8ICd0b3AtcmlnaHQnIHwgJ2JvdHRvbS1sZWZ0JyB8ICdib3R0b20tcmlnaHQnOyJdfQ==