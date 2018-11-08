/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { ChangeDetectionStrategy, Component, ContentChildren, ElementRef, EventEmitter, HostBinding, Input, Output, QueryList, ViewChild } from '@angular/core';
import { map, takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { DashboardService, defaultOptions } from './dashboard.service';
import { DashboardGrabHandleDirective } from './grab-handle/grab-handle.directive';
import { DashboardGrabHandleService } from './grab-handle/grab-handle.service';
export class DashboardComponent {
    /**
     * @param {?} dashboardService
     * @param {?} _grabHandleService
     */
    constructor(dashboardService, _grabHandleService) {
        this.dashboardService = dashboardService;
        this._grabHandleService = _grabHandleService;
        this.isGrabbing = false;
        this.customAriaLabel = this.getDefaultAriaLabel;
        this.layoutChange = new EventEmitter();
        /**
         * Ensure we unsubscribe from all observables
         */
        this._onDestroy = new Subject();
        dashboardService.layout$.pipe(takeUntil(this._onDestroy), tap(() => this.ariaLabel = this.getAriaLabel()))
            .subscribe(layout => this.layoutChange.emit(layout));
        // subscribe to changes to the grab mode
        dashboardService.isGrabbing$.pipe(takeUntil(this._onDestroy), map(widget => !!widget))
            .subscribe(isGrabbing => this.isGrabbing = isGrabbing);
    }
    /**
     * @param {?} layout
     * @return {?}
     */
    set layout(layout) {
        if (layout) {
            this.dashboardService.layout$.next(layout);
        }
    }
    /**
     * @param {?} options
     * @return {?}
     */
    set options(options) {
        this.dashboardService.options$.next(Object.assign({}, defaultOptions, options));
    }
    /**
     * Set the initial dimensions
     * @return {?}
     */
    ngAfterViewInit() {
        // set the initial dimensions
        this.dashboardService.setDimensions(this.dashboardElement.nativeElement.offsetWidth, this.dashboardElement.nativeElement.offsetHeight);
        // supply the grab handle query list
        this._grabHandleService.setHandles(this.handles);
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?} event
     * @return {?}
     */
    onResize(event) {
        this.dashboardService.setDimensions(event.width, event.height);
    }
    /**
     * @return {?}
     */
    getAriaLabel() {
        if (this.customAriaLabel && typeof this.customAriaLabel === 'string') {
            return this.customAriaLabel;
        }
        else if (this.customAriaLabel && typeof this.customAriaLabel === 'function') {
            return this.customAriaLabel(this.dashboardService.widgets, this.dashboardService.options);
        }
        return this.ariaLabel;
    }
    /**
     * @param {?} widgets
     * @param {?} options
     * @return {?}
     */
    getDefaultAriaLabel(widgets, options) {
        return `Dashboard with ${options.columns} columns, containing ${widgets.length} panels. ${widgets.map(this.getWidgetAriaLabel).join(' ')}`;
    }
    /**
     * @param {?} widget
     * @return {?}
     */
    getWidgetAriaLabel(widget) {
        return `${widget.name} panel in row ${widget.getRow()}, column ${widget.getColumn()}, is ${widget.getColumnSpan()} columns wide and ${widget.getRowSpan()} rows high.`;
    }
}
DashboardComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-dashboard',
                template: "<div #dashboard class=\"dashboard-container\" [style.height.px]=\"dashboardService.height$ | async\">\n    <div (uxResize)=\"onResize($event)\" [throttle]=\"16\" class=\"dashboard\">\n        <ng-content></ng-content>\n    </div>\n\n    <!-- Wrap with ngIf so we only have one subscription rather than one for each property -->\n    <ng-container *ngIf=\"dashboardService.placeholder$ | async; let placeholder\">\n        <div class=\"position-indicator\"\n            *ngIf=\"placeholder.visible\"\n            [style.left.px]=\"placeholder.x\"\n            [style.top.px]=\"placeholder.y\"\n            [style.width.px]=\"placeholder.width\"\n            [style.height.px]=\"placeholder.height\">\n        </div>\n    </ng-container>\n</div>",
                changeDetection: ChangeDetectionStrategy.OnPush,
                providers: [
                    DashboardService,
                    DashboardGrabHandleService
                ]
            }] }
];
/** @nocollapse */
DashboardComponent.ctorParameters = () => [
    { type: DashboardService },
    { type: DashboardGrabHandleService }
];
DashboardComponent.propDecorators = {
    customAriaLabel: [{ type: Input, args: ['aria-label',] }],
    layout: [{ type: Input }],
    options: [{ type: Input }],
    layoutChange: [{ type: Output }],
    ariaLabel: [{ type: HostBinding, args: ['attr.aria-label',] }],
    dashboardElement: [{ type: ViewChild, args: ['dashboard',] }],
    handles: [{ type: ContentChildren, args: [DashboardGrabHandleDirective, { descendants: true },] }]
};
function DashboardComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    DashboardComponent.prototype.isGrabbing;
    /** @type {?} */
    DashboardComponent.prototype.customAriaLabel;
    /** @type {?} */
    DashboardComponent.prototype.layoutChange;
    /** @type {?} */
    DashboardComponent.prototype.ariaLabel;
    /** @type {?} */
    DashboardComponent.prototype.dashboardElement;
    /**
     * Find all grab handles used in the dashboard
     * @type {?}
     */
    DashboardComponent.prototype.handles;
    /**
     * Ensure we unsubscribe from all observables
     * @type {?}
     */
    DashboardComponent.prototype._onDestroy;
    /** @type {?} */
    DashboardComponent.prototype.dashboardService;
    /** @type {?} */
    DashboardComponent.prototype._grabHandleService;
}
/**
 * @record
 */
export function DashboardOptions() { }
function DashboardOptions_tsickle_Closure_declarations() {
    /** @type {?|undefined} */
    DashboardOptions.prototype.columns;
    /** @type {?|undefined} */
    DashboardOptions.prototype.padding;
    /** @type {?|undefined} */
    DashboardOptions.prototype.minWidth;
    /** @type {?|undefined} */
    DashboardOptions.prototype.minHeight;
    /** @type {?|undefined} */
    DashboardOptions.prototype.rowHeight;
    /** @type {?|undefined} */
    DashboardOptions.prototype.emptyRow;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGFzaGJvYXJkLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2Rhc2hib2FyZC9kYXNoYm9hcmQuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQWlCLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxlQUFlLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxXQUFXLEVBQUUsS0FBSyxFQUFhLE1BQU0sRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzFMLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFFdkMsT0FBTyxFQUF1QixnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsTUFBTSxxQkFBcUIsQ0FBQztBQUM1RixPQUFPLEVBQUUsNEJBQTRCLEVBQUUsTUFBTSxxQ0FBcUMsQ0FBQztBQUNuRixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQVkvRSxNQUFNOzs7OztJQTRCRixZQUFtQixnQkFBa0MsRUFBVSxrQkFBOEM7UUFBMUYscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFrQjtRQUFVLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBNEI7MEJBMUJ2RixLQUFLOytCQUVpRyxJQUFJLENBQUMsbUJBQW1COzRCQVkzSCxJQUFJLFlBQVksRUFBeUI7Ozs7MEJBVTdDLElBQUksT0FBTyxFQUFRO1FBSXBDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsRUFBRSxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQzth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QUFDLE1BQU07Z0JBQy9DLFNBQVMsRUFBRTtvQkFDUCxnQkFBZ0I7b0JBQ2hCLDBCQUEwQjtpQkFDN0I7YUFDSjs7OztZQWI2QixnQkFBZ0I7WUFFckMsMEJBQTBCOzs7OEJBZ0I5QixLQUFLLFNBQUMsWUFBWTtxQkFFbEIsS0FBSztzQkFNTCxLQUFLOzJCQUlMLE1BQU07d0JBRU4sV0FBVyxTQUFDLGlCQUFpQjsrQkFFN0IsU0FBUyxTQUFDLFdBQVc7c0JBR3JCLGVBQWUsU0FBQyw0QkFBNEIsRUFBRSxFQUFFLFdBQVcsRUFBRSxJQUFJLEVBQUUiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBBZnRlclZpZXdJbml0LCBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSwgQ29tcG9uZW50LCBDb250ZW50Q2hpbGRyZW4sIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSG9zdEJpbmRpbmcsIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IG1hcCwgdGFrZVVudGlsLCB0YXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IFJlc2l6ZURpbWVuc2lvbnMgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3Jlc2l6ZS9yZXNpemUuc2VydmljZSc7XG5pbXBvcnQgeyBEYXNoYm9hcmRMYXlvdXREYXRhLCBEYXNoYm9hcmRTZXJ2aWNlLCBkZWZhdWx0T3B0aW9ucyB9IGZyb20gJy4vZGFzaGJvYXJkLnNlcnZpY2UnO1xuaW1wb3J0IHsgRGFzaGJvYXJkR3JhYkhhbmRsZURpcmVjdGl2ZSB9IGZyb20gJy4vZ3JhYi1oYW5kbGUvZ3JhYi1oYW5kbGUuZGlyZWN0aXZlJztcbmltcG9ydCB7IERhc2hib2FyZEdyYWJIYW5kbGVTZXJ2aWNlIH0gZnJvbSAnLi9ncmFiLWhhbmRsZS9ncmFiLWhhbmRsZS5zZXJ2aWNlJztcbmltcG9ydCB7IERhc2hib2FyZFdpZGdldENvbXBvbmVudCB9IGZyb20gJy4vd2lkZ2V0L2Rhc2hib2FyZC13aWRnZXQuY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1kYXNoYm9hcmQnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9kYXNoYm9hcmQuY29tcG9uZW50Lmh0bWwnLFxuICAgIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICAgIHByb3ZpZGVyczogW1xuICAgICAgICBEYXNoYm9hcmRTZXJ2aWNlLFxuICAgICAgICBEYXNoYm9hcmRHcmFiSGFuZGxlU2VydmljZVxuICAgIF1cbn0pXG5leHBvcnQgY2xhc3MgRGFzaGJvYXJkQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcblxuICAgIGlzR3JhYmJpbmc6IGJvb2xlYW4gPSBmYWxzZTtcblxuICAgIEBJbnB1dCgnYXJpYS1sYWJlbCcpIGN1c3RvbUFyaWFMYWJlbDogKHdpZGdldHM6IERhc2hib2FyZFdpZGdldENvbXBvbmVudFtdLCBvcHRpb25zOiBEYXNoYm9hcmRPcHRpb25zKSA9PiBzdHJpbmcgfCBzdHJpbmcgPSB0aGlzLmdldERlZmF1bHRBcmlhTGFiZWw7XG5cbiAgICBASW5wdXQoKSBzZXQgbGF5b3V0KGxheW91dDogRGFzaGJvYXJkTGF5b3V0RGF0YVtdKSB7XG4gICAgICAgIGlmIChsYXlvdXQpIHtcbiAgICAgICAgICAgIHRoaXMuZGFzaGJvYXJkU2VydmljZS5sYXlvdXQkLm5leHQobGF5b3V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIEBJbnB1dCgpIHNldCBvcHRpb25zKG9wdGlvbnM6IERhc2hib2FyZE9wdGlvbnMpIHtcbiAgICAgICAgdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLm9wdGlvbnMkLm5leHQoeyAuLi5kZWZhdWx0T3B0aW9ucywgLi4ub3B0aW9ucyB9KTtcbiAgICB9XG5cbiAgICBAT3V0cHV0KCkgbGF5b3V0Q2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxEYXNoYm9hcmRMYXlvdXREYXRhW10+KCk7XG5cbiAgICBASG9zdEJpbmRpbmcoJ2F0dHIuYXJpYS1sYWJlbCcpIGFyaWFMYWJlbDogc3RyaW5nO1xuXG4gICAgQFZpZXdDaGlsZCgnZGFzaGJvYXJkJykgZGFzaGJvYXJkRWxlbWVudDogRWxlbWVudFJlZjtcblxuICAgIC8qKiBGaW5kIGFsbCBncmFiIGhhbmRsZXMgdXNlZCBpbiB0aGUgZGFzaGJvYXJkICovXG4gICAgQENvbnRlbnRDaGlsZHJlbihEYXNoYm9hcmRHcmFiSGFuZGxlRGlyZWN0aXZlLCB7IGRlc2NlbmRhbnRzOiB0cnVlIH0pIGhhbmRsZXM6IFF1ZXJ5TGlzdDxEYXNoYm9hcmRHcmFiSGFuZGxlRGlyZWN0aXZlPjtcblxuICAgIC8qKiBFbnN1cmUgd2UgdW5zdWJzY3JpYmUgZnJvbSBhbGwgb2JzZXJ2YWJsZXMgKi9cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHVibGljIGRhc2hib2FyZFNlcnZpY2U6IERhc2hib2FyZFNlcnZpY2UsIHByaXZhdGUgX2dyYWJIYW5kbGVTZXJ2aWNlOiBEYXNoYm9hcmRHcmFiSGFuZGxlU2VydmljZSkge1xuXG4gICAgICAgIGRhc2hib2FyZFNlcnZpY2UubGF5b3V0JC5waXBlKHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpLCB0YXAoKCkgPT4gdGhpcy5hcmlhTGFiZWwgPSB0aGlzLmdldEFyaWFMYWJlbCgpKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUobGF5b3V0ID0+IHRoaXMubGF5b3V0Q2hhbmdlLmVtaXQobGF5b3V0KSk7XG5cbiAgICAgICAgLy8gc3Vic2NyaWJlIHRvIGNoYW5nZXMgdG8gdGhlIGdyYWIgbW9kZVxuICAgICAgICBkYXNoYm9hcmRTZXJ2aWNlLmlzR3JhYmJpbmckLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIG1hcCh3aWRnZXQgPT4gISF3aWRnZXQpKVxuICAgICAgICAgICAgLnN1YnNjcmliZShpc0dyYWJiaW5nID0+IHRoaXMuaXNHcmFiYmluZyA9IGlzR3JhYmJpbmcpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldCB0aGUgaW5pdGlhbCBkaW1lbnNpb25zXG4gICAgICovXG4gICAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBzZXQgdGhlIGluaXRpYWwgZGltZW5zaW9uc1xuICAgICAgICB0aGlzLmRhc2hib2FyZFNlcnZpY2Uuc2V0RGltZW5zaW9ucyh0aGlzLmRhc2hib2FyZEVsZW1lbnQubmF0aXZlRWxlbWVudC5vZmZzZXRXaWR0aCwgdGhpcy5kYXNoYm9hcmRFbGVtZW50Lm5hdGl2ZUVsZW1lbnQub2Zmc2V0SGVpZ2h0KTtcblxuICAgICAgICAvLyBzdXBwbHkgdGhlIGdyYWIgaGFuZGxlIHF1ZXJ5IGxpc3RcbiAgICAgICAgdGhpcy5fZ3JhYkhhbmRsZVNlcnZpY2Uuc2V0SGFuZGxlcyh0aGlzLmhhbmRsZXMpO1xuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBvblJlc2l6ZShldmVudDogUmVzaXplRGltZW5zaW9ucyk6IHZvaWQge1xuICAgICAgICB0aGlzLmRhc2hib2FyZFNlcnZpY2Uuc2V0RGltZW5zaW9ucyhldmVudC53aWR0aCwgZXZlbnQuaGVpZ2h0KTtcbiAgICB9XG5cbiAgICBnZXRBcmlhTGFiZWwoKTogc3RyaW5nIHtcbiAgICAgICAgaWYgKHRoaXMuY3VzdG9tQXJpYUxhYmVsICYmIHR5cGVvZiB0aGlzLmN1c3RvbUFyaWFMYWJlbCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1c3RvbUFyaWFMYWJlbDtcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1c3RvbUFyaWFMYWJlbCAmJiB0eXBlb2YgdGhpcy5jdXN0b21BcmlhTGFiZWwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmN1c3RvbUFyaWFMYWJlbCh0aGlzLmRhc2hib2FyZFNlcnZpY2Uud2lkZ2V0cywgdGhpcy5kYXNoYm9hcmRTZXJ2aWNlLm9wdGlvbnMpO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuYXJpYUxhYmVsO1xuICAgIH1cblxuICAgIHByaXZhdGUgZ2V0RGVmYXVsdEFyaWFMYWJlbCh3aWRnZXRzOiBEYXNoYm9hcmRXaWRnZXRDb21wb25lbnRbXSwgb3B0aW9uczogRGFzaGJvYXJkT3B0aW9ucyk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgRGFzaGJvYXJkIHdpdGggJHtvcHRpb25zLmNvbHVtbnN9IGNvbHVtbnMsIGNvbnRhaW5pbmcgJHt3aWRnZXRzLmxlbmd0aH0gcGFuZWxzLiAke3dpZGdldHMubWFwKHRoaXMuZ2V0V2lkZ2V0QXJpYUxhYmVsKS5qb2luKCcgJyl9YDtcbiAgICB9XG5cbiAgICBwcml2YXRlIGdldFdpZGdldEFyaWFMYWJlbCh3aWRnZXQ6IERhc2hib2FyZFdpZGdldENvbXBvbmVudCk6IHN0cmluZyB7XG4gICAgICAgIHJldHVybiBgJHt3aWRnZXQubmFtZX0gcGFuZWwgaW4gcm93ICR7d2lkZ2V0LmdldFJvdygpfSwgY29sdW1uICR7d2lkZ2V0LmdldENvbHVtbigpfSwgaXMgJHt3aWRnZXQuZ2V0Q29sdW1uU3BhbigpfSBjb2x1bW5zIHdpZGUgYW5kICR7d2lkZ2V0LmdldFJvd1NwYW4oKX0gcm93cyBoaWdoLmA7XG4gICAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIERhc2hib2FyZE9wdGlvbnMge1xuICAgIGNvbHVtbnM/OiBudW1iZXI7XG4gICAgcGFkZGluZz86IG51bWJlcjtcbiAgICBtaW5XaWR0aD86IG51bWJlcjtcbiAgICBtaW5IZWlnaHQ/OiBudW1iZXI7XG4gICAgcm93SGVpZ2h0PzogbnVtYmVyO1xuICAgIGVtcHR5Um93PzogYm9vbGVhbjtcbn0iXX0=