/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { NotificationService } from './notification.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { map } from 'rxjs/operators/map';
var NotificationListComponent = (function () {
    function NotificationListComponent(_notificationService) {
        this._notificationService = _notificationService;
        this.position = 'top-right';
        this.notifications$ = this._notificationService.notifications$.pipe(map(function (notificationRefs) { return notificationRefs.filter(function (notificationRef) { return notificationRef.visible; }); }));
    }
    Object.defineProperty(NotificationListComponent.prototype, "direction", {
        set: /**
         * @param {?} direction
         * @return {?}
         */
        function (direction) {
            this._notificationService.direction = direction;
        },
        enumerable: true,
        configurable: true
    });
    NotificationListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-notification-list',
                    template: "<div class=\"notification\" *ngFor=\"let notificationRef of notifications$ | async; let idx = index\"\n    [style.top.px]=\"(notificationRef.height + notificationRef.spacing) * idx\"\n    [style.height.px]=\"notificationRef.height\"\n    [style.background-color]=\"notificationRef.backgroundColor\"\n    [@notificationState]>\n    <ng-container *ngTemplateOutlet=\"notificationRef.templateRef; context: { $implicit: notificationRef, data: notificationRef.data }\"></ng-container>\n</div>\n",
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
    NotificationListComponent.ctorParameters = function () { return [
        { type: NotificationService, },
    ]; };
    NotificationListComponent.propDecorators = {
        "direction": [{ type: Input },],
        "position": [{ type: Input }, { type: HostBinding, args: ['class',] },],
    };
    return NotificationListComponent;
}());
export { NotificationListComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxtQkFBbUIsRUFBOEMsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQzs7SUF3Q3JDLG1DQUFvQixvQkFBeUM7UUFBekMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjt3QkFOTSxXQUFXOzhCQUU5QixJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDekYsR0FBRyxDQUFDLFVBQUMsZ0JBQW1DLElBQUssT0FBQSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsVUFBQSxlQUFlLElBQUksT0FBQSxlQUFlLENBQUMsT0FBTyxFQUF2QixDQUF1QixDQUFDLEVBQW5FLENBQW1FLENBQ25ILENBQUM7S0FJRDswQkFaRyxnREFBUzs7Ozs7a0JBQUMsU0FBb0M7WUFDOUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7Ozs7OztnQkE1QnZELFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsc0JBQXNCO29CQUNoQyxRQUFRLEVBQUUsMmVBT2I7b0JBQ0csZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLFVBQVUsRUFBRTt3QkFDUixPQUFPLENBQUMsbUJBQW1CLEVBQUU7NEJBQ3pCLEtBQUssQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGVBQWUsRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLENBQUMsQ0FBQzs0QkFDaEUsVUFBVSxDQUFDLFFBQVEsRUFBRTtnQ0FDakIsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLG1CQUFtQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQztnQ0FDckQsT0FBTyxDQUFDLEdBQUcsQ0FBQzs2QkFDZixDQUFDOzRCQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0NBQ2pCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsU0FBUyxFQUFFLGtCQUFrQixFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzZCQUNyRSxDQUFDO3lCQUNMLENBQUM7cUJBQ0w7aUJBQ0o7Ozs7Z0JBNUJRLG1CQUFtQjs7OzhCQStCdkIsS0FBSzs2QkFLTCxLQUFLLFlBQUksV0FBVyxTQUFDLE9BQU87O29DQXJDakM7O1NBOEJhLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgSG9zdEJpbmRpbmcsIElucHV0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTm90aWZpY2F0aW9uU2VydmljZSwgTm90aWZpY2F0aW9uUmVmLCBOb3RpZmljYXRpb25MaXN0RGlyZWN0aW9uIH0gZnJvbSAnLi9ub3RpZmljYXRpb24uc2VydmljZSc7XG5pbXBvcnQgeyB0cmlnZ2VyLCBzdGF0ZSwgc3R5bGUsIGFuaW1hdGUsIHRyYW5zaXRpb24gfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzL21hcCc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1ub3RpZmljYXRpb24tbGlzdCcsXG4gICAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPVwibm90aWZpY2F0aW9uXCIgKm5nRm9yPVwibGV0IG5vdGlmaWNhdGlvblJlZiBvZiBub3RpZmljYXRpb25zJCB8IGFzeW5jOyBsZXQgaWR4ID0gaW5kZXhcIlxuICAgIFtzdHlsZS50b3AucHhdPVwiKG5vdGlmaWNhdGlvblJlZi5oZWlnaHQgKyBub3RpZmljYXRpb25SZWYuc3BhY2luZykgKiBpZHhcIlxuICAgIFtzdHlsZS5oZWlnaHQucHhdPVwibm90aWZpY2F0aW9uUmVmLmhlaWdodFwiXG4gICAgW3N0eWxlLmJhY2tncm91bmQtY29sb3JdPVwibm90aWZpY2F0aW9uUmVmLmJhY2tncm91bmRDb2xvclwiXG4gICAgW0Bub3RpZmljYXRpb25TdGF0ZV0+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdUZW1wbGF0ZU91dGxldD1cIm5vdGlmaWNhdGlvblJlZi50ZW1wbGF0ZVJlZjsgY29udGV4dDogeyAkaW1wbGljaXQ6IG5vdGlmaWNhdGlvblJlZiwgZGF0YTogbm90aWZpY2F0aW9uUmVmLmRhdGEgfVwiPjwvbmctY29udGFpbmVyPlxuPC9kaXY+XG5gLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignbm90aWZpY2F0aW9uU3RhdGUnLCBbXG4gICAgICAgICAgICBzdGF0ZSgnaW4nLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMCknLCBvcGFjaXR5OiAwLjkgfSkpLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignOmVudGVyJywgW1xuICAgICAgICAgICAgICAgIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgtNTBweCknLCBvcGFjaXR5OiAwIH0pLFxuICAgICAgICAgICAgICAgIGFuaW1hdGUoNTAwKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCc6bGVhdmUnLCBbXG4gICAgICAgICAgICAgICAgYW5pbWF0ZSg1MDAsIHN0eWxlKHsgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSg1MHB4KScsIG9wYWNpdHk6IDAgfSkpXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgTm90aWZpY2F0aW9uTGlzdENvbXBvbmVudCB7XG4gICAgXG4gICAgQElucHV0KCkgXG4gICAgc2V0IGRpcmVjdGlvbihkaXJlY3Rpb246IE5vdGlmaWNhdGlvbkxpc3REaXJlY3Rpb24pIHtcbiAgICAgICAgdGhpcy5fbm90aWZpY2F0aW9uU2VydmljZS5kaXJlY3Rpb24gPSBkaXJlY3Rpb247XG4gICAgfVxuXG4gICAgQElucHV0KCkgQEhvc3RCaW5kaW5nKCdjbGFzcycpIHBvc2l0aW9uOiBOb3RpZmljYXRpb25MaXN0UG9zdGlvbiA9ICd0b3AtcmlnaHQnO1xuXG4gICAgbm90aWZpY2F0aW9ucyQ6IE9ic2VydmFibGU8Tm90aWZpY2F0aW9uUmVmW10+ID0gdGhpcy5fbm90aWZpY2F0aW9uU2VydmljZS5ub3RpZmljYXRpb25zJC5waXBlKFxuICAgICAgICBtYXAoKG5vdGlmaWNhdGlvblJlZnM6IE5vdGlmaWNhdGlvblJlZltdKSA9PiBub3RpZmljYXRpb25SZWZzLmZpbHRlcihub3RpZmljYXRpb25SZWYgPT4gbm90aWZpY2F0aW9uUmVmLnZpc2libGUpLFxuICAgICkpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfbm90aWZpY2F0aW9uU2VydmljZTogTm90aWZpY2F0aW9uU2VydmljZSkge1xuXG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBOb3RpZmljYXRpb25MaXN0UG9zdGlvbiA9ICd0b3AtbGVmdCcgfCAndG9wLXJpZ2h0JyB8ICdib3R0b20tbGVmdCcgfCAnYm90dG9tLXJpZ2h0JzsiXX0=