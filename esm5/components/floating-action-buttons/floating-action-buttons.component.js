/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, HostListener, Input, Output, QueryList } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FloatingActionButtonComponent } from './floating-action-button.component';
import { FloatingActionButtonsService } from './floating-action-buttons.service';
var FloatingActionButtonsComponent = /** @class */ (function () {
    function FloatingActionButtonsComponent(fab, _elementRef) {
        var _this = this;
        this.fab = fab;
        this._elementRef = _elementRef;
        /**
         * Emit whenever the open state changes
         */
        this.openChange = new EventEmitter();
        this._subscription = new Subscription();
        this._subscription.add(this.fab.open$.subscribe(function (value) { return _this.openChange.emit(value); }));
    }
    Object.defineProperty(FloatingActionButtonsComponent.prototype, "direction", {
        /** Specify the direction that the FAB should display */
        set: /**
         * Specify the direction that the FAB should display
         * @param {?} direction
         * @return {?}
         */
        function (direction) { this.fab.direction$.next(direction); },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    FloatingActionButtonsComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.fab.setButtons(this.buttons);
    };
    /**
     * @return {?}
     */
    FloatingActionButtonsComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._subscription.unsubscribe();
    };
    /*
     * Detect any clicks to trigger close of the menu
     */
    /**
     * @param {?} target
     * @return {?}
     */
    FloatingActionButtonsComponent.prototype.close = /**
     * @param {?} target
     * @return {?}
     */
    function (target) {
        if (!this._elementRef.nativeElement.contains(target)) {
            this.fab.close();
        }
    };
    FloatingActionButtonsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-floating-action-buttons',
                    template: "<ng-content select=\"[fab-primary]\"></ng-content>\n\n<div class=\"floating-action-button-list\" [@fabAnimation]=\"fab.open$ | async\" [ngClass]=\"fab.direction$ | async\" *ngIf=\"fab.open$ | async\">\n    <ng-content></ng-content>\n</div>",
                    providers: [FloatingActionButtonsService],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    preserveWhitespaces: false,
                    animations: [
                        trigger('fabAnimation', [
                            transition('void => true', [
                                query('ux-floating-action-button', style({ opacity: 0 })),
                                query('ux-floating-action-button', stagger(50, animate(250, style({ opacity: 1 }))))
                            ]),
                            transition('true => void', [
                                query('ux-floating-action-button', stagger(-50, animate(250, style({ opacity: 0 }))))
                            ])
                        ])
                    ]
                }] }
    ];
    /** @nocollapse */
    FloatingActionButtonsComponent.ctorParameters = function () { return [
        { type: FloatingActionButtonsService },
        { type: ElementRef }
    ]; };
    FloatingActionButtonsComponent.propDecorators = {
        direction: [{ type: Input }],
        openChange: [{ type: Output }],
        buttons: [{ type: ContentChildren, args: [FloatingActionButtonComponent,] }],
        close: [{ type: HostListener, args: ['document:click', ['$event.target'],] }]
    };
    return FloatingActionButtonsComponent;
}());
export { FloatingActionButtonsComponent };
function FloatingActionButtonsComponent_tsickle_Closure_declarations() {
    /**
     * Emit whenever the open state changes
     * @type {?}
     */
    FloatingActionButtonsComponent.prototype.openChange;
    /**
     * Get all child FAB buttons
     * @type {?}
     */
    FloatingActionButtonsComponent.prototype.buttons;
    /** @type {?} */
    FloatingActionButtonsComponent.prototype._subscription;
    /** @type {?} */
    FloatingActionButtonsComponent.prototype.fab;
    /** @type {?} */
    FloatingActionButtonsComponent.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMvZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRixPQUFPLEVBQWlCLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEwsT0FBTyxFQUFFLFlBQVksRUFBRSxNQUFNLG1CQUFtQixDQUFDO0FBQ2pELE9BQU8sRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ25GLE9BQU8sRUFBaUMsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7SUFpQzVHLHdDQUFtQixHQUFpQyxFQUFVLFdBQXVCO1FBQXJGLGlCQUVDO1FBRmtCLFFBQUcsR0FBSCxHQUFHLENBQThCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7Ozs7MEJBUDlELElBQUksWUFBWSxFQUFXOzZCQUtaLElBQUksWUFBWSxFQUFFO1FBR3BELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUMsQ0FBQztLQUMxRjtJQVpELHNCQUFhLHFEQUFTO1FBRHRCLHdEQUF3RDs7Ozs7O1FBQ3hELFVBQXVCLFNBQXdDLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUU7OztPQUFBOzs7O0lBY3pHLHdEQUFlOzs7SUFBZjtRQUNJLElBQUksQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztLQUNyQzs7OztJQUVELG9EQUFXOzs7SUFBWDtRQUNJLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7SUFFRDs7T0FFRzs7Ozs7SUFDZ0QsOENBQUs7Ozs7SUFBeEQsVUFBeUQsTUFBbUI7UUFDeEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDcEI7S0FDSjs7Z0JBbERKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QywyUEFBdUQ7b0JBQ3ZELFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO29CQUN6QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsVUFBVSxFQUFFO3dCQUNSLE9BQU8sQ0FBQyxjQUFjLEVBQUU7NEJBQ3BCLFVBQVUsQ0FBQyxjQUFjLEVBQUU7Z0NBQ3ZCLEtBQUssQ0FBQywyQkFBMkIsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQ0FDekQsS0FBSyxDQUFDLDJCQUEyQixFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7NkJBQ3ZGLENBQUM7NEJBQ0YsVUFBVSxDQUFDLGNBQWMsRUFBRTtnQ0FDdkIsS0FBSyxDQUFDLDJCQUEyQixFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs2QkFDeEYsQ0FBQzt5QkFDTCxDQUFDO3FCQUNMO2lCQUNKOzs7O2dCQW5CdUMsNEJBQTRCO2dCQUhTLFVBQVU7Ozs0QkEwQmxGLEtBQUs7NkJBR0wsTUFBTTswQkFHTixlQUFlLFNBQUMsNkJBQTZCO3dCQW1CN0MsWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsZUFBZSxDQUFDOzt5Q0FwRHJEOztTQXdCYSw4QkFBOEIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBxdWVyeSwgc3RhZ2dlciwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUXVlcnlMaXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBGbG9hdGluZ0FjdGlvbkJ1dHRvbkNvbXBvbmVudCB9IGZyb20gJy4vZmxvYXRpbmctYWN0aW9uLWJ1dHRvbi5jb21wb25lbnQnO1xuaW1wb3J0IHsgRmxvYXRpbmdBY3Rpb25CdXR0b25EaXJlY3Rpb24sIEZsb2F0aW5nQWN0aW9uQnV0dG9uc1NlcnZpY2UgfSBmcm9tICcuL2Zsb2F0aW5nLWFjdGlvbi1idXR0b25zLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZsb2F0aW5nLWFjdGlvbi1idXR0b25zJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMuY29tcG9uZW50Lmh0bWwnLFxuICAgIHByb3ZpZGVyczogW0Zsb2F0aW5nQWN0aW9uQnV0dG9uc1NlcnZpY2VdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignZmFiQW5pbWF0aW9uJywgW1xuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB0cnVlJywgW1xuICAgICAgICAgICAgICAgIHF1ZXJ5KCd1eC1mbG9hdGluZy1hY3Rpb24tYnV0dG9uJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKSxcbiAgICAgICAgICAgICAgICBxdWVyeSgndXgtZmxvYXRpbmctYWN0aW9uLWJ1dHRvbicsIHN0YWdnZXIoNTAsIGFuaW1hdGUoMjUwLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpKSlcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndHJ1ZSA9PiB2b2lkJywgW1xuICAgICAgICAgICAgICAgIHF1ZXJ5KCd1eC1mbG9hdGluZy1hY3Rpb24tYnV0dG9uJywgc3RhZ2dlcigtNTAsIGFuaW1hdGUoMjUwLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpKSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBGbG9hdGluZ0FjdGlvbkJ1dHRvbnNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgLyoqIFNwZWNpZnkgdGhlIGRpcmVjdGlvbiB0aGF0IHRoZSBGQUIgc2hvdWxkIGRpc3BsYXkgKi9cbiAgICBASW5wdXQoKSBzZXQgZGlyZWN0aW9uKGRpcmVjdGlvbjogRmxvYXRpbmdBY3Rpb25CdXR0b25EaXJlY3Rpb24pIHsgdGhpcy5mYWIuZGlyZWN0aW9uJC5uZXh0KGRpcmVjdGlvbik7IH1cblxuICAgIC8qKiBFbWl0IHdoZW5ldmVyIHRoZSBvcGVuIHN0YXRlIGNoYW5nZXMgKi9cbiAgICBAT3V0cHV0KCkgb3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIC8qKiBHZXQgYWxsIGNoaWxkIEZBQiBidXR0b25zICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihGbG9hdGluZ0FjdGlvbkJ1dHRvbkNvbXBvbmVudCkgYnV0dG9uczogUXVlcnlMaXN0PEZsb2F0aW5nQWN0aW9uQnV0dG9uQ29tcG9uZW50PjtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGZhYjogRmxvYXRpbmdBY3Rpb25CdXR0b25zU2VydmljZSwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uYWRkKHRoaXMuZmFiLm9wZW4kLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLm9wZW5DaGFuZ2UuZW1pdCh2YWx1ZSkpKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuZmFiLnNldEJ1dHRvbnModGhpcy5idXR0b25zKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBEZXRlY3QgYW55IGNsaWNrcyB0byB0cmlnZ2VyIGNsb3NlIG9mIHRoZSBtZW51XG4gICAgICovXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudC50YXJnZXQnXSkgY2xvc2UodGFyZ2V0OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmZhYi5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxufSJdfQ==