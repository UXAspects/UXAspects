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
            },] },
];
/** @nocollapse */
ItemDisplayPanelContentDirective.ctorParameters = () => [];
function ItemDisplayPanelContentDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ItemDisplayPanelContentDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ItemDisplayPanelContentDirective.ctorParameters;
}
export class ItemDisplayPanelFooterDirective {
}
ItemDisplayPanelFooterDirective.decorators = [
    { type: Directive, args: [{
                selector: '[uxItemDisplayPanelFooter]'
            },] },
];
/** @nocollapse */
ItemDisplayPanelFooterDirective.ctorParameters = () => [];
function ItemDisplayPanelFooterDirective_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ItemDisplayPanelFooterDirective.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ItemDisplayPanelFooterDirective.ctorParameters;
}
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
                template: `<div class="ux-side-panel-host ux-item-display-panel"
    [class.box-shadow]="boxShadow"
    [style.position]="position"
    [style.width]="hostWidth"
    [style.top]="cssTop">

    <div class="ux-side-panel-header" [class.item-display-panel-shadow]="shadow">
        <h3>{{ header }}</h3>
        <button *ngIf="closeVisible" type="button" class="btn btn-lg btn-link btn-icon button-secondary" (click)="visible = false">
            <i class="hpe-icon hpe-close"></i>
        </button>
    </div>

    <div class="ux-side-panel-content">
        <ng-content select="[uxItemDisplayPanelContent]"></ng-content>
    </div>

    <div class="ux-side-panel-footer" *ngIf="footer">
        <ng-content select="[uxItemDisplayPanelFooter]"></ng-content>
    </div>

</div>
`,
                providers: [SidePanelService],
                host: {
                    'class': 'ux-side-panel ux-item-display-panel'
                }
            },] },
];
/** @nocollapse */
ItemDisplayPanelComponent.ctorParameters = () => [
    { type: SidePanelService, },
    { type: ElementRef, },
];
ItemDisplayPanelComponent.propDecorators = {
    "header": [{ type: Input },],
    "boxShadow": [{ type: Input },],
    "closeVisible": [{ type: Input },],
    "preventClose": [{ type: Input },],
    "shadow": [{ type: Input },],
    "footer": [{ type: ContentChild, args: [ItemDisplayPanelFooterDirective,] },],
    "visibleChange": [{ type: Output },],
    "title": [{ type: Input },],
    "visible": [{ type: Input },],
};
function ItemDisplayPanelComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    ItemDisplayPanelComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    ItemDisplayPanelComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    ItemDisplayPanelComponent.propDecorators;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS1kaXNwbGF5LXBhbmVsLmNvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0B1eC1hc3BlY3RzL3V4LWFzcGVjdHMvIiwic291cmNlcyI6WyJjb21wb25lbnRzL2l0ZW0tZGlzcGxheS1wYW5lbC9pdGVtLWRpc3BsYXktcGFuZWwuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxZQUFZLEVBQUUsVUFBVSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRTVHLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLG9DQUFvQyxDQUFDO0FBQ3hFLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBS3BFLE1BQU07OztZQUhMLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsNkJBQTZCO2FBQzFDOzs7Ozs7Ozs7Ozs7O0FBTUQsTUFBTTs7O1lBSEwsU0FBUyxTQUFDO2dCQUNQLFFBQVEsRUFBRSw0QkFBNEI7YUFDekM7Ozs7Ozs7Ozs7Ozs7QUFpQ0QsTUFBTSxnQ0FBaUMsU0FBUSxrQkFBa0I7Ozs7O0lBaUQ3RCxZQUFZLE9BQXlCLEVBQUUsVUFBc0I7UUFDekQsS0FBSyxDQUFDLE9BQU8sRUFBRSxVQUFVLENBQUMsQ0FBQzt5QkE5Q0QsSUFBSTs0QkFFRCxJQUFJO3NCQVdWLEtBQUs7NkJBSWlCLElBQUksWUFBWSxFQUFXO1FBK0J4RSxJQUFJLENBQUMsT0FBTyxHQUFHLEtBQUssQ0FBQztRQUNyQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsSUFBSSxDQUFDO0tBQ3BDOzs7O0lBOUNELElBQUksWUFBWTtRQUNaLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxvQkFBb0IsQ0FBQztLQUNyQzs7Ozs7UUFHRyxZQUFZLENBQUMsS0FBYztRQUMzQixJQUFJLENBQUMsb0JBQW9CLEdBQUcsQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7Ozs7UUFnQm5DLEtBQUssQ0FBQyxLQUFhO1FBQ25CLElBQUksQ0FBQyxNQUFNLEdBQUcsS0FBSyxDQUFDOzs7OztJQUd4QixJQUFJLEtBQUs7UUFDTCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQztLQUN0Qjs7Ozs7UUFHRyxPQUFPLENBQUMsT0FBZ0I7UUFDeEIsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUM7Ozs7O0lBR3hCLElBQUksT0FBTztRQUNQLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ3BCOzs7O0lBV0QsUUFBUTtRQUNKLElBQUksQ0FBQyw2QkFBNkIsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJO1lBQ25FLElBQUksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2pDLENBQUMsQ0FBQztLQUNOOzs7O0lBRUQsV0FBVztRQUNQLElBQUksQ0FBQyw2QkFBNkIsQ0FBQyxXQUFXLEVBQUUsQ0FBQztLQUNwRDs7O1lBOUZKLFNBQVMsU0FBQztnQkFDUCxRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FzQmI7Z0JBQ0csU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7Z0JBQzdCLElBQUksRUFBRTtvQkFDRixPQUFPLEVBQUUscUNBQXFDO2lCQUNqRDthQUNKOzs7O1lBekNRLGdCQUFnQjtZQUhpRCxVQUFVOzs7dUJBK0MvRSxLQUFLOzBCQUVMLEtBQUs7NkJBRUwsS0FBSzs2QkFNTCxLQUFLO3VCQUtMLEtBQUs7dUJBRUwsWUFBWSxTQUFDLCtCQUErQjs4QkFFNUMsTUFBTTtzQkFRTixLQUFLO3dCQVNMLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIERpcmVjdGl2ZSwgSW5wdXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyLCBDb250ZW50Q2hpbGQsIEVsZW1lbnRSZWYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcclxuaW1wb3J0IHsgU3Vic2NyaXB0aW9uIH0gZnJvbSAncnhqcy9TdWJzY3JpcHRpb24nO1xyXG5pbXBvcnQgeyBTaWRlUGFuZWxDb21wb25lbnQgfSBmcm9tICcuLi9zaWRlLXBhbmVsL3NpZGUtcGFuZWwuY29tcG9uZW50JztcclxuaW1wb3J0IHsgU2lkZVBhbmVsU2VydmljZSB9IGZyb20gJy4uL3NpZGUtcGFuZWwvc2lkZS1wYW5lbC5zZXJ2aWNlJztcclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbdXhJdGVtRGlzcGxheVBhbmVsQ29udGVudF0nXHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJdGVtRGlzcGxheVBhbmVsQ29udGVudERpcmVjdGl2ZSB7IH1cclxuXHJcbkBEaXJlY3RpdmUoe1xyXG4gICAgc2VsZWN0b3I6ICdbdXhJdGVtRGlzcGxheVBhbmVsRm9vdGVyXSdcclxufSlcclxuZXhwb3J0IGNsYXNzIEl0ZW1EaXNwbGF5UGFuZWxGb290ZXJEaXJlY3RpdmUgeyB9XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICAgIHNlbGVjdG9yOiAndXgtaXRlbS1kaXNwbGF5LXBhbmVsJyxcclxuICAgIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cInV4LXNpZGUtcGFuZWwtaG9zdCB1eC1pdGVtLWRpc3BsYXktcGFuZWxcIlxyXG4gICAgW2NsYXNzLmJveC1zaGFkb3ddPVwiYm94U2hhZG93XCJcclxuICAgIFtzdHlsZS5wb3NpdGlvbl09XCJwb3NpdGlvblwiXHJcbiAgICBbc3R5bGUud2lkdGhdPVwiaG9zdFdpZHRoXCJcclxuICAgIFtzdHlsZS50b3BdPVwiY3NzVG9wXCI+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInV4LXNpZGUtcGFuZWwtaGVhZGVyXCIgW2NsYXNzLml0ZW0tZGlzcGxheS1wYW5lbC1zaGFkb3ddPVwic2hhZG93XCI+XHJcbiAgICAgICAgPGgzPnt7IGhlYWRlciB9fTwvaDM+XHJcbiAgICAgICAgPGJ1dHRvbiAqbmdJZj1cImNsb3NlVmlzaWJsZVwiIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImJ0biBidG4tbGcgYnRuLWxpbmsgYnRuLWljb24gYnV0dG9uLXNlY29uZGFyeVwiIChjbGljayk9XCJ2aXNpYmxlID0gZmFsc2VcIj5cclxuICAgICAgICAgICAgPGkgY2xhc3M9XCJocGUtaWNvbiBocGUtY2xvc2VcIj48L2k+XHJcbiAgICAgICAgPC9idXR0b24+XHJcbiAgICA8L2Rpdj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwidXgtc2lkZS1wYW5lbC1jb250ZW50XCI+XHJcbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW3V4SXRlbURpc3BsYXlQYW5lbENvbnRlbnRdXCI+PC9uZy1jb250ZW50PlxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGRpdiBjbGFzcz1cInV4LXNpZGUtcGFuZWwtZm9vdGVyXCIgKm5nSWY9XCJmb290ZXJcIj5cclxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbdXhJdGVtRGlzcGxheVBhbmVsRm9vdGVyXVwiPjwvbmctY29udGVudD5cclxuICAgIDwvZGl2PlxyXG5cclxuPC9kaXY+XHJcbmAsXHJcbiAgICBwcm92aWRlcnM6IFtTaWRlUGFuZWxTZXJ2aWNlXSxcclxuICAgIGhvc3Q6IHtcclxuICAgICAgICAnY2xhc3MnOiAndXgtc2lkZS1wYW5lbCB1eC1pdGVtLWRpc3BsYXktcGFuZWwnXHJcbiAgICB9XHJcbn0pXHJcbmV4cG9ydCBjbGFzcyBJdGVtRGlzcGxheVBhbmVsQ29tcG9uZW50IGV4dGVuZHMgU2lkZVBhbmVsQ29tcG9uZW50IHtcclxuXHJcbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcclxuXHJcbiAgICBASW5wdXQoKSBib3hTaGFkb3c6IGJvb2xlYW4gPSB0cnVlO1xyXG5cclxuICAgIEBJbnB1dCgpIGNsb3NlVmlzaWJsZTogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAgZ2V0IHByZXZlbnRDbG9zZSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMuY2xvc2VPbkV4dGVybmFsQ2xpY2s7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCBwcmV2ZW50Q2xvc2UodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmNsb3NlT25FeHRlcm5hbENsaWNrID0gIXZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIEBJbnB1dCgpIHNoYWRvdzogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIEBDb250ZW50Q2hpbGQoSXRlbURpc3BsYXlQYW5lbEZvb3RlckRpcmVjdGl2ZSkgZm9vdGVyOiBJdGVtRGlzcGxheVBhbmVsRm9vdGVyRGlyZWN0aXZlO1xyXG5cclxuICAgIEBPdXRwdXQoKSB2aXNpYmxlQ2hhbmdlOiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBAZGVwcmVjYXRlZFxyXG4gICAgICogVGl0bGUgdXNlZCBmb3IgYWRkaW5nIHRvb2x0aXBzIGFuZCBzaG91bGRuJ3QgYmUgdXNlZCBhcyBhbiBpbnB1dFxyXG4gICAgICogaW5zdGVhZCBoZWFkZXIgd2lsbCBiZSB1c2VkLiBUaGlzIGlzIGhlcmUgdG8gc3VwcG9ydCBiYWNrd2FyZCBjb21wYXRpYmlsaXR5IG9ubHlcclxuICAgICAqIHRoaXMgcHJvcGVydHkgc2hvdWxkIG5vdCBiZSB1c2VkLlxyXG4gICAgICovXHJcbiAgICBASW5wdXQoKVxyXG4gICAgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmhlYWRlciA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB0aXRsZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5oZWFkZXI7XHJcbiAgICB9XHJcblxyXG4gICAgQElucHV0KClcclxuICAgIHNldCB2aXNpYmxlKHZpc2libGU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLm9wZW4gPSB2aXNpYmxlO1xyXG4gICAgfVxyXG5cclxuICAgIGdldCB2aXNpYmxlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm9wZW47XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBfaXRlbURpc3BsYXlQYW5lbFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHNlcnZpY2U6IFNpZGVQYW5lbFNlcnZpY2UsIGVsZW1lbnRSZWY6IEVsZW1lbnRSZWYpIHtcclxuICAgICAgICBzdXBlcihzZXJ2aWNlLCBlbGVtZW50UmVmKTtcclxuXHJcbiAgICAgICAgdGhpcy5hbmltYXRlID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jbG9zZU9uRXh0ZXJuYWxDbGljayA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkluaXQoKSB7XHJcbiAgICAgICAgdGhpcy5faXRlbURpc3BsYXlQYW5lbFN1YnNjcmlwdGlvbiA9IHRoaXMuc2VydmljZS5vcGVuJC5zdWJzY3JpYmUoKG5leHQpID0+IHtcclxuICAgICAgICAgICAgdGhpcy52aXNpYmxlQ2hhbmdlLmVtaXQobmV4dCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICAgICAgdGhpcy5faXRlbURpc3BsYXlQYW5lbFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xyXG4gICAgfVxyXG59Il19