/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, HostBinding, Input, ChangeDetectionStrategy } from '@angular/core';
import { NotificationService } from './notification.service';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { map } from 'rxjs/operators';
var NotificationListComponent = /** @class */ (function () {
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
    NotificationListComponent.ctorParameters = function () { return [
        { type: NotificationService }
    ]; };
    NotificationListComponent.propDecorators = {
        direction: [{ type: Input }],
        position: [{ type: Input }, { type: HostBinding, args: ['class',] }]
    };
    return NotificationListComponent;
}());
export { NotificationListComponent };
function NotificationListComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    NotificationListComponent.prototype.position;
    /** @type {?} */
    NotificationListComponent.prototype.notifications$;
    /** @type {?} */
    NotificationListComponent.prototype._notificationService;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm90aWZpY2F0aW9uLWxpc3QuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvbm90aWZpY2F0aW9uL25vdGlmaWNhdGlvbi1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFFLHVCQUF1QixFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ3ZGLE9BQU8sRUFBRSxtQkFBbUIsRUFBOEMsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RyxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLHFCQUFxQixDQUFDO0FBQ2pGLE9BQU8sRUFBRSxHQUFHLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQzs7SUFpQ2pDLG1DQUFvQixvQkFBeUM7UUFBekMseUJBQW9CLEdBQXBCLG9CQUFvQixDQUFxQjt3QkFOTSxXQUFXOzhCQUU5QixJQUFJLENBQUMsb0JBQW9CLENBQUMsY0FBYyxDQUFDLElBQUksQ0FDekYsR0FBRyxDQUFDLFVBQUMsZ0JBQW1DLElBQUssT0FBQSxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsVUFBQSxlQUFlLElBQUksT0FBQSxlQUFlLENBQUMsT0FBTyxFQUF2QixDQUF1QixDQUFDLEVBQW5FLENBQW1FLENBQ25ILENBQUM7S0FJRDtJQWJELHNCQUNJLGdEQUFTOzs7OztRQURiLFVBQ2MsU0FBb0M7WUFDOUMsSUFBSSxDQUFDLG9CQUFvQixDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7U0FDbkQ7OztPQUFBOztnQkF0QkosU0FBUyxTQUFDO29CQUNQLFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLG1nQkFBaUQ7b0JBQ2pELGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxVQUFVLEVBQUU7d0JBQ1IsT0FBTyxDQUFDLG1CQUFtQixFQUFFOzRCQUN6QixLQUFLLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsT0FBTyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUM7NEJBQ2hFLFVBQVUsQ0FBQyxRQUFRLEVBQUU7Z0NBQ2pCLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxtQkFBbUIsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUM7Z0NBQ3JELE9BQU8sQ0FBQyxHQUFHLENBQUM7NkJBQ2YsQ0FBQzs0QkFDRixVQUFVLENBQUMsUUFBUSxFQUFFO2dDQUNqQixPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLFNBQVMsRUFBRSxrQkFBa0IsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs2QkFDckUsQ0FBQzt5QkFDTCxDQUFDO3FCQUNMO2lCQUNKOzs7O2dCQXJCUSxtQkFBbUI7Ozs0QkF3QnZCLEtBQUs7MkJBS0wsS0FBSyxZQUFJLFdBQVcsU0FBQyxPQUFPOztvQ0E5QmpDOztTQXVCYSx5QkFBeUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEhvc3RCaW5kaW5nLCBJbnB1dCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IE5vdGlmaWNhdGlvblNlcnZpY2UsIE5vdGlmaWNhdGlvblJlZiwgTm90aWZpY2F0aW9uTGlzdERpcmVjdGlvbiB9IGZyb20gJy4vbm90aWZpY2F0aW9uLnNlcnZpY2UnO1xuaW1wb3J0IHsgdHJpZ2dlciwgc3RhdGUsIHN0eWxlLCBhbmltYXRlLCB0cmFuc2l0aW9uIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBtYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcy9PYnNlcnZhYmxlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1ub3RpZmljYXRpb24tbGlzdCcsXG4gICAgdGVtcGxhdGVVcmw6ICcuL25vdGlmaWNhdGlvbi1saXN0LmNvbXBvbmVudC5odG1sJyxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ25vdGlmaWNhdGlvblN0YXRlJywgW1xuICAgICAgICAgICAgc3RhdGUoJ2luJywgc3R5bGUoeyB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDApJywgb3BhY2l0eTogMC45IH0pKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJzplbnRlcicsIFtcbiAgICAgICAgICAgICAgICBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoLTUwcHgpJywgb3BhY2l0eTogMCB9KSxcbiAgICAgICAgICAgICAgICBhbmltYXRlKDUwMClcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbignOmxlYXZlJywgW1xuICAgICAgICAgICAgICAgIGFuaW1hdGUoNTAwLCBzdHlsZSh7IHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoNTBweCknLCBvcGFjaXR5OiAwIH0pKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIE5vdGlmaWNhdGlvbkxpc3RDb21wb25lbnQge1xuICAgIFxuICAgIEBJbnB1dCgpIFxuICAgIHNldCBkaXJlY3Rpb24oZGlyZWN0aW9uOiBOb3RpZmljYXRpb25MaXN0RGlyZWN0aW9uKSB7XG4gICAgICAgIHRoaXMuX25vdGlmaWNhdGlvblNlcnZpY2UuZGlyZWN0aW9uID0gZGlyZWN0aW9uO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIEBIb3N0QmluZGluZygnY2xhc3MnKSBwb3NpdGlvbjogTm90aWZpY2F0aW9uTGlzdFBvc3Rpb24gPSAndG9wLXJpZ2h0JztcblxuICAgIG5vdGlmaWNhdGlvbnMkOiBPYnNlcnZhYmxlPE5vdGlmaWNhdGlvblJlZltdPiA9IHRoaXMuX25vdGlmaWNhdGlvblNlcnZpY2Uubm90aWZpY2F0aW9ucyQucGlwZShcbiAgICAgICAgbWFwKChub3RpZmljYXRpb25SZWZzOiBOb3RpZmljYXRpb25SZWZbXSkgPT4gbm90aWZpY2F0aW9uUmVmcy5maWx0ZXIobm90aWZpY2F0aW9uUmVmID0+IG5vdGlmaWNhdGlvblJlZi52aXNpYmxlKSxcbiAgICApKTtcblxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX25vdGlmaWNhdGlvblNlcnZpY2U6IE5vdGlmaWNhdGlvblNlcnZpY2UpIHtcblxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgTm90aWZpY2F0aW9uTGlzdFBvc3Rpb24gPSAndG9wLWxlZnQnIHwgJ3RvcC1yaWdodCcgfCAnYm90dG9tLWxlZnQnIHwgJ2JvdHRvbS1yaWdodCc7Il19