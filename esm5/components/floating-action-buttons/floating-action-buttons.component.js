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
var FloatingActionButtonsComponent = (function () {
    function FloatingActionButtonsComponent(fab, _elementRef) {
        var _this = this;
        this.fab = fab;
        this._elementRef = _elementRef;
        this.direction = 'top';
        this.openChange = new EventEmitter();
        this._subscription = new Subscription();
        this._subscription.add(this.fab.open$.subscribe(function (value) { return _this.openChange.emit(value); }));
    }
    /**
     * @return {?}
     */
    FloatingActionButtonsComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._subscription.add(this.fab.open$.pipe(filter(function (open) { return open === false; }))
            .subscribe(function () { return _this.tooltips.forEach(function (tooltip) { return tooltip.hide(); }); }));
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
                },] },
    ];
    /** @nocollapse */
    FloatingActionButtonsComponent.ctorParameters = function () { return [
        { type: FloatingActionButtonsService, },
        { type: ElementRef, },
    ]; };
    FloatingActionButtonsComponent.propDecorators = {
        "direction": [{ type: Input },],
        "tooltips": [{ type: ContentChildren, args: [TooltipDirective,] },],
        "openChange": [{ type: Output },],
        "close": [{ type: HostListener, args: ['document:click', ['$event.target'],] },],
    };
    return FloatingActionButtonsComponent;
}());
export { FloatingActionButtonsComponent };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMvZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsT0FBTyxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUMxRixPQUFPLEVBQWlCLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDaEwsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFDekQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3hDLE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNqRCxPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQzs7SUFnQzdFLHdDQUFtQixHQUFpQyxFQUFVLFdBQXVCO1FBQXJGLGlCQUVDO1FBRmtCLFFBQUcsR0FBSCxHQUFHLENBQThCO1FBQVUsZ0JBQVcsR0FBWCxXQUFXLENBQVk7eUJBTmpDLEtBQUs7MEJBRWxDLElBQUksWUFBWSxFQUFXOzZCQUVaLElBQUksWUFBWSxFQUFFO1FBR3BELElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxVQUFBLEtBQUssSUFBSSxPQUFBLEtBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUEzQixDQUEyQixDQUFDLENBQUMsQ0FBQztLQUMxRjs7OztJQUVELHdEQUFlOzs7SUFBZjtRQUFBLGlCQUdDO1FBRkcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFBLElBQUksSUFBSSxPQUFBLElBQUksS0FBSyxLQUFLLEVBQWQsQ0FBYyxDQUFDLENBQUM7YUFDckUsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLE9BQU8sSUFBSSxPQUFBLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBZCxDQUFjLENBQUMsRUFBaEQsQ0FBZ0QsQ0FBQyxDQUFDLENBQUM7S0FDM0U7Ozs7SUFFRCxvREFBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsRUFBRSxDQUFDO0tBQ3BDOzs7OztJQUtrRCw4Q0FBSzs7OztjQUFDLE1BQW1CO1FBQ3hFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRCxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDO1NBQ3BCOzs7Z0JBakRSLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUsNEJBQTRCO29CQUN0QyxRQUFRLEVBQUUsb09BSVA7b0JBQ0gsU0FBUyxFQUFFLENBQUMsNEJBQTRCLENBQUM7b0JBQ3pDLGVBQWUsRUFBRSx1QkFBdUIsQ0FBQyxNQUFNO29CQUMvQyxtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixVQUFVLEVBQUU7d0JBQ1IsT0FBTyxDQUFDLGNBQWMsRUFBRTs0QkFDcEIsVUFBVSxDQUFDLGNBQWMsRUFBRTtnQ0FDdkIsS0FBSyxDQUFDLDJCQUEyQixFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dDQUN6RCxLQUFLLENBQUMsMkJBQTJCLEVBQUUsT0FBTyxDQUFDLEVBQUUsRUFBRSxPQUFPLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxFQUFFLE9BQU8sRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQzs2QkFDdkYsQ0FBQzs0QkFDRixVQUFVLENBQUMsY0FBYyxFQUFFO2dDQUN2QixLQUFLLENBQUMsMkJBQTJCLEVBQUUsT0FBTyxDQUFDLENBQUMsRUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLEVBQUUsT0FBTyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDOzZCQUN4RixDQUFDO3lCQUNMLENBQUM7cUJBQ0w7aUJBQ0o7Ozs7Z0JBdkJRLDRCQUE0QjtnQkFKd0MsVUFBVTs7OzhCQThCbEYsS0FBSzs2QkFDTCxlQUFlLFNBQUMsZ0JBQWdCOytCQUNoQyxNQUFNOzBCQW9CTixZQUFZLFNBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxlQUFlLENBQUM7O3lDQXJEckQ7O1NBNkJhLDhCQUE4QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGFuaW1hdGUsIHF1ZXJ5LCBzdGFnZ2VyLCBzdHlsZSwgdHJhbnNpdGlvbiwgdHJpZ2dlciB9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgQ29udGVudENoaWxkcmVuLCBFbGVtZW50UmVmLCBIb3N0TGlzdGVuZXIsIElucHV0LCBPbkRlc3Ryb3ksIFF1ZXJ5TGlzdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXIgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IFRvb2x0aXBEaXJlY3RpdmUgfSBmcm9tICduZ3gtYm9vdHN0cmFwL3Rvb2x0aXAnO1xuaW1wb3J0IHsgZmlsdGVyIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xuaW1wb3J0IHsgRmxvYXRpbmdBY3Rpb25CdXR0b25zU2VydmljZSB9IGZyb20gJy4vZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmxvYXRpbmctYWN0aW9uLWJ1dHRvbnMnLFxuICAgIHRlbXBsYXRlOiBgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2ZhYi1wcmltYXJ5XVwiPjwvbmctY29udGVudD5cblxuPGRpdiBjbGFzcz1cImZsb2F0aW5nLWFjdGlvbi1idXR0b24tbGlzdFwiIFtAZmFiQW5pbWF0aW9uXT1cImZhYi5vcGVuJCB8IGFzeW5jXCIgW25nQ2xhc3NdPVwiZGlyZWN0aW9uXCIgKm5nSWY9XCJmYWIub3BlbiQgfCBhc3luY1wiPlxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cbjwvZGl2PmAsXG4gICAgcHJvdmlkZXJzOiBbRmxvYXRpbmdBY3Rpb25CdXR0b25zU2VydmljZV0sXG4gICAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gICAgcHJlc2VydmVXaGl0ZXNwYWNlczogZmFsc2UsXG4gICAgYW5pbWF0aW9uczogW1xuICAgICAgICB0cmlnZ2VyKCdmYWJBbmltYXRpb24nLCBbXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd2b2lkID0+IHRydWUnLCBbXG4gICAgICAgICAgICAgICAgcXVlcnkoJ3V4LWZsb2F0aW5nLWFjdGlvbi1idXR0b24nLCBzdHlsZSh7IG9wYWNpdHk6IDAgfSkpLFxuICAgICAgICAgICAgICAgIHF1ZXJ5KCd1eC1mbG9hdGluZy1hY3Rpb24tYnV0dG9uJywgc3RhZ2dlcig1MCwgYW5pbWF0ZSgyNTAsIHN0eWxlKHsgb3BhY2l0eTogMSB9KSkpKVxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgICB0cmFuc2l0aW9uKCd0cnVlID0+IHZvaWQnLCBbXG4gICAgICAgICAgICAgICAgcXVlcnkoJ3V4LWZsb2F0aW5nLWFjdGlvbi1idXR0b24nLCBzdGFnZ2VyKC01MCwgYW5pbWF0ZSgyNTAsIHN0eWxlKHsgb3BhY2l0eTogMCB9KSkpKVxuICAgICAgICAgICAgXSlcbiAgICAgICAgXSlcbiAgICBdXG59KVxuZXhwb3J0IGNsYXNzIEZsb2F0aW5nQWN0aW9uQnV0dG9uc0NvbXBvbmVudCBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBkaXJlY3Rpb246IEZsb2F0aW5nQWN0aW9uQnV0dG9uRGlyZWN0aW9uID0gJ3RvcCc7XG4gICAgQENvbnRlbnRDaGlsZHJlbihUb29sdGlwRGlyZWN0aXZlKSB0b29sdGlwczogUXVlcnlMaXN0PFRvb2x0aXBEaXJlY3RpdmU+O1xuICAgIEBPdXRwdXQoKSBvcGVuQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gICAgcHJpdmF0ZSBfc3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBuZXcgU3Vic2NyaXB0aW9uKCk7XG5cbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgZmFiOiBGbG9hdGluZ0FjdGlvbkJ1dHRvbnNTZXJ2aWNlLCBwcml2YXRlIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi5hZGQodGhpcy5mYWIub3BlbiQuc3Vic2NyaWJlKHZhbHVlID0+IHRoaXMub3BlbkNoYW5nZS5lbWl0KHZhbHVlKSkpO1xuICAgIH1cblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc3Vic2NyaXB0aW9uLmFkZCh0aGlzLmZhYi5vcGVuJC5waXBlKGZpbHRlcihvcGVuID0+IG9wZW4gPT09IGZhbHNlKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy50b29sdGlwcy5mb3JFYWNoKHRvb2x0aXAgPT4gdG9vbHRpcC5oaWRlKCkpKSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3N1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIH1cblxuICAgIC8qXG4gICAgICogRGV0ZWN0IGFueSBjbGlja3MgdG8gdHJpZ2dlciBjbG9zZSBvZiB0aGUgbWVudVxuICAgICAqL1xuICAgIEBIb3N0TGlzdGVuZXIoJ2RvY3VtZW50OmNsaWNrJywgWyckZXZlbnQudGFyZ2V0J10pIGNsb3NlKHRhcmdldDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcbiAgICAgICAgaWYgKCF0aGlzLl9lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQuY29udGFpbnModGFyZ2V0KSkge1xuICAgICAgICAgICAgdGhpcy5mYWIuY2xvc2UoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cblxuZXhwb3J0IHR5cGUgRmxvYXRpbmdBY3Rpb25CdXR0b25EaXJlY3Rpb24gPSAndG9wJyB8ICdyaWdodCcgfCAnYm90dG9tJyB8ICdsZWZ0JzsiXX0=