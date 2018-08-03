/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { animate, query, stagger, style, transition, trigger } from '@angular/animations';
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, HostListener, Input, QueryList, Output, EventEmitter } from '@angular/core';
import { TooltipDirective } from 'ngx-bootstrap/tooltip';
import { filter } from 'rxjs/operators';
import { Subscription } from 'rxjs/Subscription';
import { FloatingActionButtonsService } from './floating-action-buttons.service';
export class FloatingActionButtonsComponent {
    /**
     * @param {?} fab
     * @param {?} _elementRef
     */
    constructor(fab, _elementRef) {
        this.fab = fab;
        this._elementRef = _elementRef;
        this.direction = 'top';
        this.openChange = new EventEmitter();
        this._subscription = new Subscription();
        this._subscription.add(this.fab.open$.subscribe(value => this.openChange.emit(value)));
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._subscription.add(this.fab.open$.pipe(filter(open => open === false))
            .subscribe(() => this.tooltips.forEach(tooltip => tooltip.hide())));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._subscription.unsubscribe();
    }
    /**
     * @param {?} target
     * @return {?}
     */
    close(target) {
        if (!this._elementRef.nativeElement.contains(target)) {
            this.fab.close();
        }
    }
}
FloatingActionButtonsComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-floating-action-buttons',
                template: "<ng-content select=\"[fab-primary]\"></ng-content>\n\n<div class=\"floating-action-button-list\" [@fabAnimation]=\"fab.open$ | async\" [ngClass]=\"direction\" *ngIf=\"fab.open$ | async\">\n    <ng-content></ng-content>\n</div>",
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
FloatingActionButtonsComponent.ctorParameters = () => [
    { type: FloatingActionButtonsService },
    { type: ElementRef }
];
FloatingActionButtonsComponent.propDecorators = {
    direction: [{ type: Input }],
    tooltips: [{ type: ContentChildren, args: [TooltipDirective,] }],
    openChange: [{ type: Output }],
    close: [{ type: HostListener, args: ['document:click', ['$event.target'],] }]
};
function FloatingActionButtonsComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    FloatingActionButtonsComponent.prototype.direction;
    /** @type {?} */
    FloatingActionButtonsComponent.prototype.tooltips;
    /** @type {?} */
    FloatingActionButtonsComponent.prototype.openChange;
    /** @type {?} */
    FloatingActionButtonsComponent.prototype._subscription;
    /** @type {?} */
    FloatingActionButtonsComponent.prototype.fab;
    /** @type {?} */
    FloatingActionButtonsComponent.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMvZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRixPQUFPLEVBQWlCLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEwsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQW9CakYsTUFBTTs7Ozs7SUFRRixZQUFtQixHQUFpQyxFQUFVLFdBQXVCO1FBQWxFLFFBQUcsR0FBSCxHQUFHLENBQThCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7eUJBTmpDLEtBQUs7MEJBRWxDLElBQUksWUFBWSxFQUFXOzZCQUVaLElBQUksWUFBWSxFQUFFO1FBR3BELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxRjs7OztJQUVELGVBQWU7UUFDWCxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDO2FBQ3JFLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMzRTs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7OztJQUtrRCxLQUFLLENBQUMsTUFBbUI7UUFDeEUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ25ELElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxFQUFFLENBQUM7U0FDcEI7S0FDSjs7O1lBOUNKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNEJBQTRCO2dCQUN0Qyw4T0FBdUQ7Z0JBQ3ZELFNBQVMsRUFBRSxDQUFDLDRCQUE0QixDQUFDO2dCQUN6QyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsbUJBQW1CLEVBQUUsS0FBSztnQkFDMUIsVUFBVSxFQUFFO29CQUNSLE9BQU8sQ0FBQyxjQUFjLEVBQUU7d0JBQ3BCLFVBQVUsQ0FBQyxjQUFjLEVBQUU7NEJBQ3ZCLEtBQUssQ0FBQywyQkFBMkIsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQzs0QkFDekQsS0FBSyxDQUFDLDJCQUEyQixFQUFFLE9BQU8sQ0FBQyxFQUFFLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsRUFBRSxPQUFPLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7eUJBQ3ZGLENBQUM7d0JBQ0YsVUFBVSxDQUFDLGNBQWMsRUFBRTs0QkFDdkIsS0FBSyxDQUFDLDJCQUEyQixFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDeEYsQ0FBQztxQkFDTCxDQUFDO2lCQUNMO2FBQ0o7Ozs7WUFuQlEsNEJBQTRCO1lBSndDLFVBQVU7Ozt3QkEwQmxGLEtBQUs7dUJBQ0wsZUFBZSxTQUFDLGdCQUFnQjt5QkFDaEMsTUFBTTtvQkFvQk4sWUFBWSxTQUFDLGdCQUFnQixFQUFFLENBQUMsZUFBZSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYW5pbWF0ZSwgcXVlcnksIHN0YWdnZXIsIHN0eWxlLCB0cmFuc2l0aW9uLCB0cmlnZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIEhvc3RMaXN0ZW5lciwgSW5wdXQsIE9uRGVzdHJveSwgUXVlcnlMaXN0LCBPdXRwdXQsIEV2ZW50RW1pdHRlciB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgVG9vbHRpcERpcmVjdGl2ZSB9IGZyb20gJ25neC1ib290c3RyYXAvdG9vbHRpcCc7XG5pbXBvcnQgeyBmaWx0ZXIgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzL1N1YnNjcmlwdGlvbic7XG5pbXBvcnQgeyBGbG9hdGluZ0FjdGlvbkJ1dHRvbnNTZXJ2aWNlIH0gZnJvbSAnLi9mbG9hdGluZy1hY3Rpb24tYnV0dG9ucy5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1mbG9hdGluZy1hY3Rpb24tYnV0dG9ucycsXG4gICAgdGVtcGxhdGVVcmw6ICcuL2Zsb2F0aW5nLWFjdGlvbi1idXR0b25zLmNvbXBvbmVudC5odG1sJyxcbiAgICBwcm92aWRlcnM6IFtGbG9hdGluZ0FjdGlvbkJ1dHRvbnNTZXJ2aWNlXSxcbiAgICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgICBwcmVzZXJ2ZVdoaXRlc3BhY2VzOiBmYWxzZSxcbiAgICBhbmltYXRpb25zOiBbXG4gICAgICAgIHRyaWdnZXIoJ2ZhYkFuaW1hdGlvbicsIFtcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3ZvaWQgPT4gdHJ1ZScsIFtcbiAgICAgICAgICAgICAgICBxdWVyeSgndXgtZmxvYXRpbmctYWN0aW9uLWJ1dHRvbicsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSksXG4gICAgICAgICAgICAgICAgcXVlcnkoJ3V4LWZsb2F0aW5nLWFjdGlvbi1idXR0b24nLCBzdGFnZ2VyKDUwLCBhbmltYXRlKDI1MCwgc3R5bGUoeyBvcGFjaXR5OiAxIH0pKSkpXG4gICAgICAgICAgICBdKSxcbiAgICAgICAgICAgIHRyYW5zaXRpb24oJ3RydWUgPT4gdm9pZCcsIFtcbiAgICAgICAgICAgICAgICBxdWVyeSgndXgtZmxvYXRpbmctYWN0aW9uLWJ1dHRvbicsIHN0YWdnZXIoLTUwLCBhbmltYXRlKDI1MCwgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKSkpXG4gICAgICAgICAgICBdKVxuICAgICAgICBdKVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRmxvYXRpbmdBY3Rpb25CdXR0b25zQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIGRpcmVjdGlvbjogRmxvYXRpbmdBY3Rpb25CdXR0b25EaXJlY3Rpb24gPSAndG9wJztcbiAgICBAQ29udGVudENoaWxkcmVuKFRvb2x0aXBEaXJlY3RpdmUpIHRvb2x0aXBzOiBRdWVyeUxpc3Q8VG9vbHRpcERpcmVjdGl2ZT47XG4gICAgQE91dHB1dCgpIG9wZW5DaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgICBwcml2YXRlIF9zdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IG5ldyBTdWJzY3JpcHRpb24oKTtcblxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBmYWI6IEZsb2F0aW5nQWN0aW9uQnV0dG9uc1NlcnZpY2UsIHByaXZhdGUgX2VsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZCh0aGlzLmZhYi5vcGVuJC5zdWJzY3JpYmUodmFsdWUgPT4gdGhpcy5vcGVuQ2hhbmdlLmVtaXQodmFsdWUpKSk7XG4gICAgfVxuXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uYWRkKHRoaXMuZmFiLm9wZW4kLnBpcGUoZmlsdGVyKG9wZW4gPT4gb3BlbiA9PT0gZmFsc2UpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLnRvb2x0aXBzLmZvckVhY2godG9vbHRpcCA9PiB0b29sdGlwLmhpZGUoKSkpKTtcbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuXG4gICAgLypcbiAgICAgKiBEZXRlY3QgYW55IGNsaWNrcyB0byB0cmlnZ2VyIGNsb3NlIG9mIHRoZSBtZW51XG4gICAgICovXG4gICAgQEhvc3RMaXN0ZW5lcignZG9jdW1lbnQ6Y2xpY2snLCBbJyRldmVudC50YXJnZXQnXSkgY2xvc2UodGFyZ2V0OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgICAgICBpZiAoIXRoaXMuX2VsZW1lbnRSZWYubmF0aXZlRWxlbWVudC5jb250YWlucyh0YXJnZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmZhYi5jbG9zZSgpO1xuICAgICAgICB9XG4gICAgfVxufVxuXG5leHBvcnQgdHlwZSBGbG9hdGluZ0FjdGlvbkJ1dHRvbkRpcmVjdGlvbiA9ICd0b3AnIHwgJ3JpZ2h0JyB8ICdib3R0b20nIHwgJ2xlZnQnOyJdfQ==