/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ContentChild, Directive, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { SidePanelComponent } from '../side-panel/side-panel.component';
import { SidePanelService } from '../side-panel/side-panel.service';
export class ItemDisplayPanelContentDirective {
}
ItemDisplayPanelContentDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxItemDisplayPanelContent]'
            },] }
];
export class ItemDisplayPanelFooterDirective {
}
ItemDisplayPanelFooterDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxItemDisplayPanelFooter]'
            },] }
];
export class ItemDisplayPanelComponent extends SidePanelComponent {
    /**
     * @param {?} service
     * @param {?} elementRef
     */
    constructor(service, elementRef) {
        super(service, elementRef);
        this.boxShadow = true;
        this.closeVisible = true;
        this.shadow = false;
        this.visibleChange = new EventEmitter();
        this.animate = false;
        this.closeOnExternalClick = true;
    }
    /**
     * @return {?}
     */
    get preventClose() {
        return !this.closeOnExternalClick;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set preventClose(value) {
        this.closeOnExternalClick = !value;
    }
    /**
     * @deprecated
     * Title used for adding tooltips and shouldn't be used as an input
     * instead header will be used. This is here to support backward compatibility only
     * this property should not be used.
     * @param {?} value
     * @return {?}
     */
    set title(value) {
        this.header = value;
    }
    /**
     * @return {?}
     */
    get title() {
        return this.header;
    }
    /**
     * @param {?} visible
     * @return {?}
     */
    set visible(visible) {
        this.open = visible;
    }
    /**
     * @return {?}
     */
    get visible() {
        return this.open;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this.service.open$.pipe(distinctUntilChanged(), takeUntil(this._onDestroy)).subscribe(isVisible => this.visibleChange.emit(isVisible));
    }
    /**
     * @return {?}
     */
    focus() {
        if (this.panel) {
            this.panel.nativeElement.focus();
        }
    }
}
ItemDisplayPanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-item-display-panel',
                template: "<div class=\"ux-side-panel-host ux-item-display-panel\" #panel\n    [class.box-shadow]=\"boxShadow\"\n    [style.position]=\"position\"\n    [style.width]=\"hostWidth\"\n    [style.top]=\"cssTop\"\n    [tabindex]=\"open ? 0 : -1\"\n    [focusIf]=\"open && focusOnShow\">\n\n    <div class=\"ux-side-panel-header\" [class.item-display-panel-shadow]=\"shadow\">\n        <h3>{{ header }}</h3>\n        <button *ngIf=\"closeVisible\" aria-label=\"Close\" i18n-aria-label type=\"button\" class=\"btn btn-lg btn-link btn-icon button-secondary\" (click)=\"visible = false\">\n            <i class=\"hpe-icon hpe-close\"></i>\n        </button>\n    </div>\n\n    <div class=\"ux-side-panel-content\">\n        <ng-content select=\"[uxItemDisplayPanelContent]\"></ng-content>\n    </div>\n\n    <div class=\"ux-side-panel-footer\" *ngIf=\"footer\">\n        <ng-content select=\"[uxItemDisplayPanelFooter]\"></ng-content>\n    </div>\n\n</div>\n",
                providers: [SidePanelService],
                host: {
                    'class': 'ux-side-panel ux-item-display-panel'
                }
            }] }
];
/** @nocollapse */
ItemDisplayPanelComponent.ctorParameters = () => [
    { type: SidePanelService },
    { type: ElementRef }
];
ItemDisplayPanelComponent.propDecorators = {
    header: [{ type: Input }],
    boxShadow: [{ type: Input }],
    closeVisible: [{ type: Input }],
    preventClose: [{ type: Input }],
    shadow: [{ type: Input }],
    visibleChange: [{ type: Output }],
    footer: [{ type: ContentChild, args: [ItemDisplayPanelFooterDirective,] }],
    panel: [{ type: ViewChild, args: ['panel',] }],
    title: [{ type: Input }],
    visible: [{ type: Input }]
};
function ItemDisplayPanelComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.header;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.boxShadow;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.closeVisible;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.shadow;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.visibleChange;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.footer;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.panel;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1kaXNwbGF5LXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2l0ZW0tZGlzcGxheS1wYW5lbC9pdGVtLWRpc3BsYXktcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUUsVUFBVSxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQVUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMvSCxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakUsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sb0NBQW9DLENBQUM7QUFDeEUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sa0NBQWtDLENBQUM7QUFLcEUsTUFBTTs7O1lBSEwsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw2QkFBNkI7YUFDMUM7O0FBTUQsTUFBTTs7O1lBSEwsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw0QkFBNEI7YUFDekM7O0FBV0QsTUFBTSxnQ0FBaUMsU0FBUSxrQkFBa0I7Ozs7O0lBZ0Q3RCxZQUFZLE9BQXlCLEVBQUUsVUFBc0I7UUFDekQsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQzt5QkE3Q0QsSUFBSTs0QkFFRCxJQUFJO3NCQVdWLEtBQUs7NkJBRWlCLElBQUksWUFBWSxFQUFXO1FBZ0N4RSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO0tBQ3BDOzs7O0lBN0NELElBQUksWUFBWTtRQUNaLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztLQUNyQzs7Ozs7SUFFRCxJQUNJLFlBQVksQ0FBQyxLQUFjO1FBQzNCLElBQUksQ0FBQyxvQkFBb0IsR0FBRyxDQUFDLEtBQUssQ0FBQztLQUN0Qzs7Ozs7Ozs7O0lBZUQsSUFDSSxLQUFLLENBQUMsS0FBYTtRQUNuQixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztLQUN2Qjs7OztJQUVELElBQUksS0FBSztRQUNMLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDO0tBQ3RCOzs7OztJQUVELElBQ0ksT0FBTyxDQUFDLE9BQWdCO1FBQ3hCLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFDO0tBQ3ZCOzs7O0lBRUQsSUFBSSxPQUFPO1FBQ1AsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDcEI7Ozs7SUFTRCxRQUFRO1FBQ0osSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLG9CQUFvQixFQUFFLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7S0FDMUk7Ozs7SUFFRCxLQUFLO1FBQ0QsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7WUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNwQztLQUNKOzs7WUF2RUosU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLHM3QkFBa0Q7Z0JBQ2xELFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO2dCQUM3QixJQUFJLEVBQUU7b0JBQ0YsT0FBTyxFQUFFLHFDQUFxQztpQkFDakQ7YUFDSjs7OztZQW5CUSxnQkFBZ0I7WUFIb0IsVUFBVTs7O3FCQXlCbEQsS0FBSzt3QkFFTCxLQUFLOzJCQUVMLEtBQUs7MkJBTUwsS0FBSztxQkFLTCxLQUFLOzRCQUVMLE1BQU07cUJBRU4sWUFBWSxTQUFDLCtCQUErQjtvQkFDNUMsU0FBUyxTQUFDLE9BQU87b0JBUWpCLEtBQUs7c0JBU0wsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgQ29udGVudENoaWxkLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlciwgSW5wdXQsIE9uSW5pdCwgT3V0cHV0LCBWaWV3Q2hpbGQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IGRpc3RpbmN0VW50aWxDaGFuZ2VkLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTaWRlUGFuZWxDb21wb25lbnQgfSBmcm9tICcuLi9zaWRlLXBhbmVsL3NpZGUtcGFuZWwuY29tcG9uZW50JztcbmltcG9ydCB7IFNpZGVQYW5lbFNlcnZpY2UgfSBmcm9tICcuLi9zaWRlLXBhbmVsL3NpZGUtcGFuZWwuc2VydmljZSc7XG5cbkBEaXJlY3RpdmUoe1xuICAgIHNlbGVjdG9yOiAnW3V4SXRlbURpc3BsYXlQYW5lbENvbnRlbnRdJ1xufSlcbmV4cG9ydCBjbGFzcyBJdGVtRGlzcGxheVBhbmVsQ29udGVudERpcmVjdGl2ZSB7IH1cblxuQERpcmVjdGl2ZSh7XG4gICAgc2VsZWN0b3I6ICdbdXhJdGVtRGlzcGxheVBhbmVsRm9vdGVyXSdcbn0pXG5leHBvcnQgY2xhc3MgSXRlbURpc3BsYXlQYW5lbEZvb3RlckRpcmVjdGl2ZSB7IH1cblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1pdGVtLWRpc3BsYXktcGFuZWwnLFxuICAgIHRlbXBsYXRlVXJsOiAnLi9pdGVtLWRpc3BsYXktcGFuZWwuY29tcG9uZW50Lmh0bWwnLFxuICAgIHByb3ZpZGVyczogW1NpZGVQYW5lbFNlcnZpY2VdLFxuICAgIGhvc3Q6IHtcbiAgICAgICAgJ2NsYXNzJzogJ3V4LXNpZGUtcGFuZWwgdXgtaXRlbS1kaXNwbGF5LXBhbmVsJ1xuICAgIH1cbn0pXG5leHBvcnQgY2xhc3MgSXRlbURpc3BsYXlQYW5lbENvbXBvbmVudCBleHRlbmRzIFNpZGVQYW5lbENvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCB7XG5cbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcblxuICAgIEBJbnB1dCgpIGJveFNoYWRvdzogYm9vbGVhbiA9IHRydWU7XG5cbiAgICBASW5wdXQoKSBjbG9zZVZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xuXG4gICAgZ2V0IHByZXZlbnRDbG9zZSgpOiBib29sZWFuIHtcbiAgICAgICAgcmV0dXJuICF0aGlzLmNsb3NlT25FeHRlcm5hbENsaWNrO1xuICAgIH1cblxuICAgIEBJbnB1dCgpXG4gICAgc2V0IHByZXZlbnRDbG9zZSh2YWx1ZTogYm9vbGVhbikge1xuICAgICAgICB0aGlzLmNsb3NlT25FeHRlcm5hbENsaWNrID0gIXZhbHVlO1xuICAgIH1cblxuICAgIEBJbnB1dCgpIHNoYWRvdzogYm9vbGVhbiA9IGZhbHNlO1xuXG4gICAgQE91dHB1dCgpIHZpc2libGVDaGFuZ2U6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAgIEBDb250ZW50Q2hpbGQoSXRlbURpc3BsYXlQYW5lbEZvb3RlckRpcmVjdGl2ZSkgZm9vdGVyOiBJdGVtRGlzcGxheVBhbmVsRm9vdGVyRGlyZWN0aXZlO1xuICAgIEBWaWV3Q2hpbGQoJ3BhbmVsJykgcGFuZWw6IEVsZW1lbnRSZWY7XG5cbiAgICAvKipcbiAgICAgKiBAZGVwcmVjYXRlZFxuICAgICAqIFRpdGxlIHVzZWQgZm9yIGFkZGluZyB0b29sdGlwcyBhbmQgc2hvdWxkbid0IGJlIHVzZWQgYXMgYW4gaW5wdXRcbiAgICAgKiBpbnN0ZWFkIGhlYWRlciB3aWxsIGJlIHVzZWQuIFRoaXMgaXMgaGVyZSB0byBzdXBwb3J0IGJhY2t3YXJkIGNvbXBhdGliaWxpdHkgb25seVxuICAgICAqIHRoaXMgcHJvcGVydHkgc2hvdWxkIG5vdCBiZSB1c2VkLlxuICAgICAqL1xuICAgIEBJbnB1dCgpXG4gICAgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB2YWx1ZTtcbiAgICB9XG5cbiAgICBnZXQgdGl0bGUoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlYWRlcjtcbiAgICB9XG5cbiAgICBASW5wdXQoKVxuICAgIHNldCB2aXNpYmxlKHZpc2libGU6IGJvb2xlYW4pIHtcbiAgICAgICAgdGhpcy5vcGVuID0gdmlzaWJsZTtcbiAgICB9XG5cbiAgICBnZXQgdmlzaWJsZSgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMub3BlbjtcbiAgICB9XG5cbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlOiBTaWRlUGFuZWxTZXJ2aWNlLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG4gICAgICAgIHN1cGVyKHNlcnZpY2UsIGVsZW1lbnRSZWYpO1xuXG4gICAgICAgIHRoaXMuYW5pbWF0ZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLmNsb3NlT25FeHRlcm5hbENsaWNrID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBuZ09uSW5pdCgpIHtcbiAgICAgICAgdGhpcy5zZXJ2aWNlLm9wZW4kLnBpcGUoZGlzdGluY3RVbnRpbENoYW5nZWQoKSwgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShpc1Zpc2libGUgPT4gdGhpcy52aXNpYmxlQ2hhbmdlLmVtaXQoaXNWaXNpYmxlKSk7XG4gICAgfVxuXG4gICAgZm9jdXMoKTogdm9pZCB7XG4gICAgICAgIGlmICh0aGlzLnBhbmVsKSB7XG4gICAgICAgICAgICB0aGlzLnBhbmVsLm5hdGl2ZUVsZW1lbnQuZm9jdXMoKTtcbiAgICAgICAgfVxuICAgIH1cbn0iXX0=