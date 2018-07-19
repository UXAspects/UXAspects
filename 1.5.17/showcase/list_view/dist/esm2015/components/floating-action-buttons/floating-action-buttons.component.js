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
                template: `<ng-content select="[fab-primary]"></ng-content>

<div class="floating-action-button-list" [@fabAnimation]="fab.open$ | async" [ngClass]="direction" *ngIf="fab.open$ | async">
    <ng-content></ng-content>
</div>`,
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
            },] },
];
/** @nocollapse */
FloatingActionButtonsComponent.ctorParameters = () => [
    { type: FloatingActionButtonsService, },
    { type: ElementRef, },
];
FloatingActionButtonsComponent.propDecorators = {
    "direction": [{ type: Input },],
    "tooltips": [{ type: ContentChildren, args: [TooltipDirective,] },],
    "openChange": [{ type: Output },],
    "close": [{ type: HostListener, args: ['document:click', ['$event.target'],] },],
};
function FloatingActionButtonsComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FloatingActionButtonsComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FloatingActionButtonsComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FloatingActionButtonsComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMvZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRixPQUFPLEVBQWlCLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEwsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQXdCakYsTUFBTTs7Ozs7SUFRRixZQUFtQixHQUFpQyxFQUFVLFdBQXVCO1FBQWxFLFFBQUcsR0FBSCxHQUFHLENBQThCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7eUJBTmpDLEtBQUs7MEJBRWxDLElBQUksWUFBWSxFQUFXOzZCQUVaLElBQUksWUFBWSxFQUFFO1FBR3BELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzFGOzs7O0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLElBQUksS0FBSyxLQUFLLENBQUMsQ0FBQzthQUNyRSxTQUFTLENBQUMsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzNFOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyxhQUFhLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEM7Ozs7O0lBS2tELEtBQUssQ0FBQyxNQUFtQjtRQUN4RSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbkQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNwQjs7OztZQWpEUixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLDRCQUE0QjtnQkFDdEMsUUFBUSxFQUFFOzs7O09BSVA7Z0JBQ0gsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7Z0JBQ3pDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO2dCQUMvQyxtQkFBbUIsRUFBRSxLQUFLO2dCQUMxQixVQUFVLEVBQUU7b0JBQ1IsT0FBTyxDQUFDLGNBQWMsRUFBRTt3QkFDcEIsVUFBVSxDQUFDLGNBQWMsRUFBRTs0QkFDdkIsS0FBSyxDQUFDLDJCQUEyQixFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDOzRCQUN6RCxLQUFLLENBQUMsMkJBQTJCLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzt5QkFDdkYsQ0FBQzt3QkFDRixVQUFVLENBQUMsY0FBYyxFQUFFOzRCQUN2QixLQUFLLENBQUMsMkJBQTJCLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDO3lCQUN4RixDQUFDO3FCQUNMLENBQUM7aUJBQ0w7YUFDSjs7OztZQXZCUSw0QkFBNEI7WUFKd0MsVUFBVTs7OzBCQThCbEYsS0FBSzt5QkFDTCxlQUFlLFNBQUMsZ0JBQWdCOzJCQUNoQyxNQUFNO3NCQW9CTixZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxlQUFlLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhbmltYXRlLCBxdWVyeSwgc3RhZ2dlciwgc3R5bGUsIHRyYW5zaXRpb24sIHRyaWdnZXIgfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7IEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIENvbnRlbnRDaGlsZHJlbiwgRWxlbWVudFJlZiwgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95LCBRdWVyeUxpc3QsIE91dHB1dCwgRXZlbnRFbWl0dGVyIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBUb29sdGlwRGlyZWN0aXZlIH0gZnJvbSAnbmd4LWJvb3RzdHJhcC90b29sdGlwJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YnNjcmlwdGlvbiB9IGZyb20gJ3J4anMvU3Vic2NyaXB0aW9uJztcbmltcG9ydCB7IEZsb2F0aW5nQWN0aW9uQnV0dG9uc1NlcnZpY2UgfSBmcm9tICcuL2Zsb2F0aW5nLWFjdGlvbi1idXR0b25zLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgICBzZWxlY3RvcjogJ3V4LWZsb2F0aW5nLWFjdGlvbi1idXR0b25zJyxcbiAgICB0ZW1wbGF0ZTogYDxuZy1jb250ZW50IHNlbGVjdD1cIltmYWItcHJpbWFyeV1cIj48L25nLWNvbnRlbnQ+XG5cbjxkaXYgY2xhc3M9XCJmbG9hdGluZy1hY3Rpb24tYnV0dG9uLWxpc3RcIiBbQGZhYkFuaW1hdGlvbl09XCJmYWIub3BlbiQgfCBhc3luY1wiIFtuZ0NsYXNzXT1cImRpcmVjdGlvblwiICpuZ0lmPVwiZmFiLm9wZW4kIHwgYXN5bmNcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5gLFxuICAgIHByb3ZpZGVyczogW0Zsb2F0aW5nQWN0aW9uQnV0dG9uc1NlcnZpY2VdLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByZXNlcnZlV2hpdGVzcGFjZXM6IGZhbHNlLFxuICAgIGFuaW1hdGlvbnM6IFtcbiAgICAgICAgdHJpZ2dlcignZmFiQW5pbWF0aW9uJywgW1xuICAgICAgICAgICAgdHJhbnNpdGlvbigndm9pZCA9PiB0cnVlJywgW1xuICAgICAgICAgICAgICAgIHF1ZXJ5KCd1eC1mbG9hdGluZy1hY3Rpb24tYnV0dG9uJywgc3R5bGUoeyBvcGFjaXR5OiAwIH0pKSxcbiAgICAgICAgICAgICAgICBxdWVyeSgndXgtZmxvYXRpbmctYWN0aW9uLWJ1dHRvbicsIHN0YWdnZXIoNTAsIGFuaW1hdGUoMjUwLCBzdHlsZSh7IG9wYWNpdHk6IDEgfSkpKSlcbiAgICAgICAgICAgIF0pLFxuICAgICAgICAgICAgdHJhbnNpdGlvbigndHJ1ZSA9PiB2b2lkJywgW1xuICAgICAgICAgICAgICAgIHF1ZXJ5KCd1eC1mbG9hdGluZy1hY3Rpb24tYnV0dG9uJywgc3RhZ2dlcigtNTAsIGFuaW1hdGUoMjUwLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpKSlcbiAgICAgICAgICAgIF0pXG4gICAgICAgIF0pXG4gICAgXVxufSlcbmV4cG9ydCBjbGFzcyBGbG9hdGluZ0FjdGlvbkJ1dHRvbnNDb21wb25lbnQgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuXG4gICAgQElucHV0KCkgZGlyZWN0aW9uOiBGbG9hdGluZ0FjdGlvbkJ1dHRvbkRpcmVjdGlvbiA9ICd0b3AnO1xuICAgIEBDb250ZW50Q2hpbGRyZW4oVG9vbHRpcERpcmVjdGl2ZSkgdG9vbHRpcHM6IFF1ZXJ5TGlzdDxUb29sdGlwRGlyZWN0aXZlPjtcbiAgICBAT3V0cHV0KCkgb3BlbkNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIHByaXZhdGUgX3N1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gbmV3IFN1YnNjcmlwdGlvbigpO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGZhYjogRmxvYXRpbmdBY3Rpb25CdXR0b25zU2VydmljZSwgcHJpdmF0ZSBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24uYWRkKHRoaXMuZmFiLm9wZW4kLnN1YnNjcmliZSh2YWx1ZSA9PiB0aGlzLm9wZW5DaGFuZ2UuZW1pdCh2YWx1ZSkpKTtcbiAgICB9XG5cbiAgICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQodGhpcy5mYWIub3BlbiQucGlwZShmaWx0ZXIob3BlbiA9PiBvcGVuID09PSBmYWxzZSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMudG9vbHRpcHMuZm9yRWFjaCh0b29sdGlwID0+IHRvb2x0aXAuaGlkZSgpKSkpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB9XG5cbiAgICAvKlxuICAgICAqIERldGVjdCBhbnkgY2xpY2tzIHRvIHRyaWdnZXIgY2xvc2Ugb2YgdGhlIG1lbnVcbiAgICAgKi9cbiAgICBASG9zdExpc3RlbmVyKCdkb2N1bWVudDpjbGljaycsIFsnJGV2ZW50LnRhcmdldCddKSBjbG9zZSh0YXJnZXQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgICAgIGlmICghdGhpcy5fZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmNvbnRhaW5zKHRhcmdldCkpIHtcbiAgICAgICAgICAgIHRoaXMuZmFiLmNsb3NlKCk7XG4gICAgICAgIH1cbiAgICB9XG59XG5cbmV4cG9ydCB0eXBlIEZsb2F0aW5nQWN0aW9uQnV0dG9uRGlyZWN0aW9uID0gJ3RvcCcgfCAncmlnaHQnIHwgJ2JvdHRvbScgfCAnbGVmdCc7Il19