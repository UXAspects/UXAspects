/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, Directive, Input, Output, EventEmitter, ContentChild, ElementRef } from '@angular/core';
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
        this._itemDisplayPanelSubscription = this.service.open$.subscribe((next) => {
            this.visibleChange.emit(next);
        });
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._itemDisplayPanelSubscription.unsubscribe();
    }
}
ItemDisplayPanelComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-item-display-panel',
                template: "<div class=\"ux-side-panel-host ux-item-display-panel\"\r\n    [class.box-shadow]=\"boxShadow\"\r\n    [style.position]=\"position\"\r\n    [style.width]=\"hostWidth\"\r\n    [style.top]=\"cssTop\">\r\n\r\n    <div class=\"ux-side-panel-header\" [class.item-display-panel-shadow]=\"shadow\">\r\n        <h3>{{ header }}</h3>\r\n        <button *ngIf=\"closeVisible\" type=\"button\" class=\"btn btn-lg btn-link btn-icon button-secondary\" (click)=\"visible = false\">\r\n            <i class=\"hpe-icon hpe-close\"></i>\r\n        </button>\r\n    </div>\r\n\r\n    <div class=\"ux-side-panel-content\">\r\n        <ng-content select=\"[uxItemDisplayPanelContent]\"></ng-content>\r\n    </div>\r\n\r\n    <div class=\"ux-side-panel-footer\" *ngIf=\"footer\">\r\n        <ng-content select=\"[uxItemDisplayPanelFooter]\"></ng-content>\r\n    </div>\r\n\r\n</div>\r\n",
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
    footer: [{ type: ContentChild, args: [ItemDisplayPanelFooterDirective,] }],
    visibleChange: [{ type: Output }],
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
    ItemDisplayPanelComponent.prototype.footer;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype.visibleChange;
    /** @type {?} */
    ItemDisplayPanelComponent.prototype._itemDisplayPanelSubscription;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1kaXNwbGF5LXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2l0ZW0tZGlzcGxheS1wYW5lbC9pdGVtLWRpc3BsYXktcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBS3BFLE1BQU07OztZQUhMLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNkJBQTZCO2FBQzFDOztBQU1ELE1BQU07OztZQUhMLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNEJBQTRCO2FBQ3pDOztBQVdELE1BQU0sZ0NBQWlDLFNBQVEsa0JBQWtCOzs7OztJQWlEN0QsWUFBWSxPQUF5QixFQUFFLFVBQXNCO1FBQ3pELEtBQUssQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLENBQUM7eUJBOUNELElBQUk7NEJBRUQsSUFBSTtzQkFXVixLQUFLOzZCQUlpQixJQUFJLFlBQVksRUFBVztRQStCeEUsSUFBSSxDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUM7UUFDckIsSUFBSSxDQUFDLG9CQUFvQixHQUFHLElBQUksQ0FBQztLQUNwQzs7OztJQTlDRCxJQUFJLFlBQVk7UUFDWixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsb0JBQW9CLENBQUM7S0FDckM7Ozs7O0lBRUQsSUFDSSxZQUFZLENBQUMsS0FBYztRQUMzQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxLQUFLLENBQUM7S0FDdEM7Ozs7Ozs7OztJQWNELElBQ0ksS0FBSyxDQUFDLEtBQWE7UUFDbkIsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUM7S0FDdkI7Ozs7SUFFRCxJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUN0Qjs7Ozs7SUFFRCxJQUNJLE9BQU8sQ0FBQyxPQUFnQjtRQUN4QixJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQztLQUN2Qjs7OztJQUVELElBQUksT0FBTztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ3BCOzs7O0lBV0QsUUFBUTtRQUNKLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUN2RSxJQUFJLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNqQyxDQUFDLENBQUM7S0FDTjs7OztJQUVELFdBQVc7UUFDUCxJQUFJLENBQUMsNkJBQTZCLENBQUMsV0FBVyxFQUFFLENBQUM7S0FDcEQ7OztZQXhFSixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLHVCQUF1QjtnQkFDakMsNjJCQUFrRDtnQkFDbEQsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzdCLElBQUksRUFBRTtvQkFDRixPQUFPLEVBQUUscUNBQXFDO2lCQUNqRDthQUNKOzs7O1lBbkJRLGdCQUFnQjtZQUhpRCxVQUFVOzs7cUJBeUIvRSxLQUFLO3dCQUVMLEtBQUs7MkJBRUwsS0FBSzsyQkFNTCxLQUFLO3FCQUtMLEtBQUs7cUJBRUwsWUFBWSxTQUFDLCtCQUErQjs0QkFFNUMsTUFBTTtvQkFRTixLQUFLO3NCQVNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xyXG5pbXBvcnQgeyBTaWRlUGFuZWxDb21wb25lbnQgfSBmcm9tICcuLi9zaWRlLXBhbmVsL3NpZGUtcGFuZWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2lkZVBhbmVsU2VydmljZSB9IGZyb20gJy4uL3NpZGUtcGFuZWwvc2lkZS1wYW5lbC5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbdXhJdGVtRGlzcGxheVBhbmVsQ29udGVudF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJdGVtRGlzcGxheVBhbmVsQ29udGVudERpcmVjdGl2ZSB7IH1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbdXhJdGVtRGlzcGxheVBhbmVsRm9vdGVyXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEl0ZW1EaXNwbGF5UGFuZWxGb290ZXJEaXJlY3RpdmUgeyB9XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndXgtaXRlbS1kaXNwbGF5LXBhbmVsJyxcclxuICAgIHRlbXBsYXRlVXJsOiAnLi9pdGVtLWRpc3BsYXktcGFuZWwuY29tcG9uZW50Lmh0bWwnLFxyXG4gICAgcHJvdmlkZXJzOiBbU2lkZVBhbmVsU2VydmljZV0sXHJcbiAgICBob3N0OiB7XHJcbiAgICAgICAgJ2NsYXNzJzogJ3V4LXNpZGUtcGFuZWwgdXgtaXRlbS1kaXNwbGF5LXBhbmVsJ1xyXG4gICAgfVxyXG59KVxyXG5leHBvcnQgY2xhc3MgSXRlbURpc3BsYXlQYW5lbENvbXBvbmVudCBleHRlbmRzIFNpZGVQYW5lbENvbXBvbmVudCB7XHJcblxyXG4gICAgQElucHV0KCkgaGVhZGVyOiBzdHJpbmc7XHJcblxyXG4gICAgQElucHV0KCkgYm94U2hhZG93OiBib29sZWFuID0gdHJ1ZTtcclxuXHJcbiAgICBASW5wdXQoKSBjbG9zZVZpc2libGU6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIGdldCBwcmV2ZW50Q2xvc2UoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICF0aGlzLmNsb3NlT25FeHRlcm5hbENsaWNrO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgcHJldmVudENsb3NlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5jbG9zZU9uRXh0ZXJuYWxDbGljayA9ICF2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBASW5wdXQoKSBzaGFkb3c6IGJvb2xlYW4gPSBmYWxzZTtcclxuXHJcbiAgICBAQ29udGVudENoaWxkKEl0ZW1EaXNwbGF5UGFuZWxGb290ZXJEaXJlY3RpdmUpIGZvb3RlcjogSXRlbURpc3BsYXlQYW5lbEZvb3RlckRpcmVjdGl2ZTtcclxuXHJcbiAgICBAT3V0cHV0KCkgdmlzaWJsZUNoYW5nZTogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xyXG5cclxuICAgIC8qKlxyXG4gICAgICogQGRlcHJlY2F0ZWRcclxuICAgICAqIFRpdGxlIHVzZWQgZm9yIGFkZGluZyB0b29sdGlwcyBhbmQgc2hvdWxkbid0IGJlIHVzZWQgYXMgYW4gaW5wdXRcclxuICAgICAqIGluc3RlYWQgaGVhZGVyIHdpbGwgYmUgdXNlZC4gVGhpcyBpcyBoZXJlIHRvIHN1cHBvcnQgYmFja3dhcmQgY29tcGF0aWJpbGl0eSBvbmx5XHJcbiAgICAgKiB0aGlzIHByb3BlcnR5IHNob3VsZCBub3QgYmUgdXNlZC5cclxuICAgICAqL1xyXG4gICAgQElucHV0KClcclxuICAgIHNldCB0aXRsZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5oZWFkZXIgPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdGl0bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVhZGVyO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpXHJcbiAgICBzZXQgdmlzaWJsZSh2aXNpYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy5vcGVuID0gdmlzaWJsZTtcclxuICAgIH1cclxuXHJcbiAgICBnZXQgdmlzaWJsZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5vcGVuO1xyXG4gICAgfVxyXG5cclxuICAgIHByaXZhdGUgX2l0ZW1EaXNwbGF5UGFuZWxTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbjtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihzZXJ2aWNlOiBTaWRlUGFuZWxTZXJ2aWNlLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XHJcbiAgICAgICAgc3VwZXIoc2VydmljZSwgZWxlbWVudFJlZik7XHJcblxyXG4gICAgICAgIHRoaXMuYW5pbWF0ZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2xvc2VPbkV4dGVybmFsQ2xpY2sgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25Jbml0KCkge1xyXG4gICAgICAgIHRoaXMuX2l0ZW1EaXNwbGF5UGFuZWxTdWJzY3JpcHRpb24gPSB0aGlzLnNlcnZpY2Uub3BlbiQuc3Vic2NyaWJlKChuZXh0KSA9PiB7XHJcbiAgICAgICAgICAgIHRoaXMudmlzaWJsZUNoYW5nZS5lbWl0KG5leHQpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIG5nT25EZXN0cm95KCkge1xyXG4gICAgICAgIHRoaXMuX2l0ZW1EaXNwbGF5UGFuZWxTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcclxuICAgIH1cclxufSJdfQ==