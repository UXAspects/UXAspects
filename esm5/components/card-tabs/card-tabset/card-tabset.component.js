/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { CardTabsService } from '../card-tabs.service';
var CardTabsetComponent = (function () {
    function CardTabsetComponent(tabService) {
        this.tabService = tabService;
        this.offset = 0;
        this.bounds = { lower: 0, upper: 0 };
    }
    Object.defineProperty(CardTabsetComponent.prototype, "position", {
        get: /**
         * @return {?}
         */
        function () {
            return this.tabService.position$.getValue();
        },
        set: /**
         * @param {?} direction
         * @return {?}
         */
        function (direction) {
            this.tabService.setPosition(direction);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} tab
     * @param {?} element
     * @return {?}
     */
    CardTabsetComponent.prototype.select = /**
     * @param {?} tab
     * @param {?} element
     * @return {?}
     */
    function (tab, element) {
        // select the tab
        this.tabService.select(tab);
        // ensure the tab is moved into view if required
        this.moveIntoView(element);
    };
    /**
     * @param {?} dimensions
     * @return {?}
     */
    CardTabsetComponent.prototype.resize = /**
     * @param {?} dimensions
     * @return {?}
     */
    function (dimensions) {
        this._width = dimensions.width;
        this._innerWidth = this.tablist.nativeElement.scrollWidth;
        this.bounds.lower = 0;
        this.bounds.upper = -(this._innerWidth - this._width);
    };
    /**
     * @return {?}
     */
    CardTabsetComponent.prototype.previous = /**
     * @return {?}
     */
    function () {
        this.offset += this._width;
        // ensure it remains within the allowed bounds
        this.offset = Math.min(this.offset, this.bounds.lower);
    };
    /**
     * @return {?}
     */
    CardTabsetComponent.prototype.next = /**
     * @return {?}
     */
    function () {
        this.offset -= this._width;
        // ensure it remains within the allowed bounds
        this.offset = Math.max(this.offset, this.bounds.upper);
    };
    /**
     * @param {?} element
     * @return {?}
     */
    CardTabsetComponent.prototype.moveIntoView = /**
     * @param {?} element
     * @return {?}
     */
    function (element) {
        // if we dont have the dimensions we cant check
        if (!this._width || !this._innerWidth) {
            return;
        }
        // get the current element bounds
        var offsetLeft = element.offsetLeft, offsetWidth = element.offsetWidth;
        var _a = getComputedStyle(element), marginLeft = _a.marginLeft, marginRight = _a.marginRight;
        // calculate the visible area
        var /** @type {?} */ viewportStart = Math.abs(this.offset);
        var /** @type {?} */ viewportEnd = viewportStart + this._width;
        var /** @type {?} */ cardWidth = parseFloat(marginLeft) + offsetWidth + parseFloat(marginRight);
        // if we need to move to the left - figure out how much
        if (offsetLeft < viewportStart) {
            this.offset -= (offsetLeft - parseFloat(marginLeft)) - viewportStart;
        }
        // if we need to move to the right - figure out how much
        if ((offsetLeft + cardWidth) > viewportEnd) {
            this.offset -= (offsetLeft + cardWidth) - viewportEnd;
        }
    };
    CardTabsetComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-card-tabset',
                    template: "<div class=\"card-tab-content\" role=\"tabpanel\" *ngIf=\"(tabService.tab$ | async)\">\n    <ng-content></ng-content>\n</div>\n\n<div class=\"card-tabs\" #tabs>\n\n    <button class=\"card-tabs-paging-btn card-tabs-paging-btn-previous\" aria-label=\"Previous Tabs\" (click)=\"previous()\" *ngIf=\"offset < bounds.lower\">\n        <i class=\"hpe-icon hpe-previous\"></i>\n    </button>\n\n    <div class=\"card-tabs-list\" role=\"tablist\" #tablist (uxResize)=\"resize($event)\" [style.transform]=\"'translateX(' + offset + 'px)'\">\n\n        <div class=\"card-tab\"\n            role=\"tab\"\n            tabindex=\"0\" #card\n            *ngFor=\"let tab of tabService.tabs$ | async\"\n            [ngClass]=\"tabService.position$ | async\"\n            [class.active]=\"tab.active$ | async\"\n            [attr.aria-selected]=\"tab.active$ | async\"\n            (click)=\"select(tab, card)\"\n            (focus)=\"tabs.scrollLeft = 0\"\n            (keydown.enter)=\"select(tab, card)\">\n\n            <ng-container [ngTemplateOutlet]=\"tab.content\"></ng-container>\n        </div>\n\n    </div>\n\n    <button class=\"card-tabs-paging-btn card-tabs-paging-btn-next\" aria-label=\"Next Tabs\" (click)=\"next()\" *ngIf=\"offset > bounds.upper\">\n        <i class=\"hpe-icon hpe-next\"></i>\n    </button>\n</div>",
                    providers: [CardTabsService]
                },] },
    ];
    /** @nocollapse */
    CardTabsetComponent.ctorParameters = function () { return [
        { type: CardTabsService, },
    ]; };
    CardTabsetComponent.propDecorators = {
        "position": [{ type: HostBinding, args: ['class',] }, { type: Input },],
        "tablist": [{ type: ViewChild, args: ['tablist',] },],
    };
    return CardTabsetComponent;
}());
export { CardTabsetComponent };
function CardTabsetComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    CardTabsetComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    CardTabsetComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    CardTabsetComponent.propDecorators;
    /** @type {?} */
    CardTabsetComponent.prototype.tablist;
    /** @type {?} */
    CardTabsetComponent.prototype.offset;
    /** @type {?} */
    CardTabsetComponent.prototype.bounds;
    /** @type {?} */
    CardTabsetComponent.prototype._width;
    /** @type {?} */
    CardTabsetComponent.prototype._innerWidth;
    /** @type {?} */
    CardTabsetComponent.prototype.tabService;
}
/**
 * @record
 */
export function CardTabsBounds() { }
function CardTabsBounds_tsickle_Closure_declarations() {
    /** @type {?} */
    CardTabsBounds.prototype.lower;
    /** @type {?} */
    CardTabsBounds.prototype.upper;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC10YWJzZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2FyZC10YWJzL2NhcmQtdGFic2V0L2NhcmQtdGFic2V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztJQXlEckQsNkJBQW1CLFVBQTJCO1FBQTNCLGVBQVUsR0FBVixVQUFVLENBQWlCO3NCQU43QixDQUFDO3NCQUNPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO0tBS0c7MEJBaEJyQyx5Q0FBUTs7OztRQUlyQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM3Qzs7Ozs7a0JBTnFCLFNBQWlCO1lBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBaUJ6QyxvQ0FBTTs7Ozs7SUFBTixVQUFPLEdBQXFCLEVBQUUsT0FBb0I7O1FBRWhELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztRQUc1QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzVCOzs7OztJQUVELG9DQUFNOzs7O0lBQU4sVUFBTyxVQUE0QjtRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFFMUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN2RDs7OztJQUVELHNDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQzs7UUFHM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN4RDs7OztJQUVELGtDQUFJOzs7SUFBSjtRQUNFLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQzs7UUFHM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN4RDs7Ozs7SUFFTywwQ0FBWTs7OztjQUFDLE9BQW9COztRQUd2QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUM7U0FDUjs7UUFHTyxJQUFBLCtCQUFVLEVBQUUsaUNBQVcsQ0FBYTtRQUM1QyxvQ0FBUSwwQkFBVSxFQUFFLDRCQUFXLENBQStCOztRQUc5RCxxQkFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMscUJBQU0sV0FBVyxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2hELHFCQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7UUFHakYsRUFBRSxDQUFDLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUM7U0FDdEU7O1FBR0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztTQUN2RDs7O2dCQS9HSixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLDB5Q0ErQkw7b0JBQ0wsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO2lCQUM3Qjs7OztnQkFyQ1EsZUFBZTs7OzZCQXdDckIsV0FBVyxTQUFDLE9BQU8sY0FDbkIsS0FBSzs0QkFRTCxTQUFTLFNBQUMsU0FBUzs7OEJBcER0Qjs7U0F5Q2EsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVzaXplRGltZW5zaW9ucyB9IGZyb20gJy4uLy4uLy4uL2RpcmVjdGl2ZXMvcmVzaXplJztcbmltcG9ydCB7IENhcmRUYWJDb21wb25lbnQgfSBmcm9tICcuLi9jYXJkLXRhYi9jYXJkLXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FyZFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi4vY2FyZC10YWJzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1eC1jYXJkLXRhYnNldCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNhcmQtdGFiLWNvbnRlbnRcIiByb2xlPVwidGFicGFuZWxcIiAqbmdJZj1cIih0YWJTZXJ2aWNlLnRhYiQgfCBhc3luYylcIj5cclxuICAgIDxuZy1jb250ZW50PjwvbmctY29udGVudD5cclxuPC9kaXY+XHJcblxyXG48ZGl2IGNsYXNzPVwiY2FyZC10YWJzXCIgI3RhYnM+XHJcblxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImNhcmQtdGFicy1wYWdpbmctYnRuIGNhcmQtdGFicy1wYWdpbmctYnRuLXByZXZpb3VzXCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzIFRhYnNcIiAoY2xpY2spPVwicHJldmlvdXMoKVwiICpuZ0lmPVwib2Zmc2V0IDwgYm91bmRzLmxvd2VyXCI+XHJcbiAgICAgICAgPGkgY2xhc3M9XCJocGUtaWNvbiBocGUtcHJldmlvdXNcIj48L2k+XHJcbiAgICA8L2J1dHRvbj5cclxuXHJcbiAgICA8ZGl2IGNsYXNzPVwiY2FyZC10YWJzLWxpc3RcIiByb2xlPVwidGFibGlzdFwiICN0YWJsaXN0ICh1eFJlc2l6ZSk9XCJyZXNpemUoJGV2ZW50KVwiIFtzdHlsZS50cmFuc2Zvcm1dPVwiJ3RyYW5zbGF0ZVgoJyArIG9mZnNldCArICdweCknXCI+XHJcblxyXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLXRhYlwiXHJcbiAgICAgICAgICAgIHJvbGU9XCJ0YWJcIlxyXG4gICAgICAgICAgICB0YWJpbmRleD1cIjBcIiAjY2FyZFxyXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgdGFiIG9mIHRhYlNlcnZpY2UudGFicyQgfCBhc3luY1wiXHJcbiAgICAgICAgICAgIFtuZ0NsYXNzXT1cInRhYlNlcnZpY2UucG9zaXRpb24kIHwgYXN5bmNcIlxyXG4gICAgICAgICAgICBbY2xhc3MuYWN0aXZlXT1cInRhYi5hY3RpdmUkIHwgYXN5bmNcIlxyXG4gICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cInRhYi5hY3RpdmUkIHwgYXN5bmNcIlxyXG4gICAgICAgICAgICAoY2xpY2spPVwic2VsZWN0KHRhYiwgY2FyZClcIlxyXG4gICAgICAgICAgICAoZm9jdXMpPVwidGFicy5zY3JvbGxMZWZ0ID0gMFwiXHJcbiAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cInNlbGVjdCh0YWIsIGNhcmQpXCI+XHJcblxyXG4gICAgICAgICAgICA8bmctY29udGFpbmVyIFtuZ1RlbXBsYXRlT3V0bGV0XT1cInRhYi5jb250ZW50XCI+PC9uZy1jb250YWluZXI+XHJcbiAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgPC9kaXY+XHJcblxyXG4gICAgPGJ1dHRvbiBjbGFzcz1cImNhcmQtdGFicy1wYWdpbmctYnRuIGNhcmQtdGFicy1wYWdpbmctYnRuLW5leHRcIiBhcmlhLWxhYmVsPVwiTmV4dCBUYWJzXCIgKGNsaWNrKT1cIm5leHQoKVwiICpuZ0lmPVwib2Zmc2V0ID4gYm91bmRzLnVwcGVyXCI+XHJcbiAgICAgICAgPGkgY2xhc3M9XCJocGUtaWNvbiBocGUtbmV4dFwiPjwvaT5cclxuICAgIDwvYnV0dG9uPlxyXG48L2Rpdj5gLFxuICBwcm92aWRlcnM6IFtDYXJkVGFic1NlcnZpY2VdXG59KVxuZXhwb3J0IGNsYXNzIENhcmRUYWJzZXRDb21wb25lbnQge1xuXG4gIEBIb3N0QmluZGluZygnY2xhc3MnKVxuICBASW5wdXQoKSBzZXQgcG9zaXRpb24oZGlyZWN0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLnRhYlNlcnZpY2Uuc2V0UG9zaXRpb24oZGlyZWN0aW9uKTtcbiAgfVxuXG4gIGdldCBwb3NpdGlvbigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLnRhYlNlcnZpY2UucG9zaXRpb24kLmdldFZhbHVlKCk7XG4gIH1cblxuICBAVmlld0NoaWxkKCd0YWJsaXN0JykgdGFibGlzdDogRWxlbWVudFJlZjtcblxuICBvZmZzZXQ6IG51bWJlciA9IDA7XG4gIGJvdW5kczogQ2FyZFRhYnNCb3VuZHMgPSB7IGxvd2VyOiAwLCB1cHBlcjogMCB9O1xuXG4gIHByaXZhdGUgX3dpZHRoOiBudW1iZXI7XG4gIHByaXZhdGUgX2lubmVyV2lkdGg6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihwdWJsaWMgdGFiU2VydmljZTogQ2FyZFRhYnNTZXJ2aWNlKSB7fVxuXG4gIHNlbGVjdCh0YWI6IENhcmRUYWJDb21wb25lbnQsIGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG4gICAgLy8gc2VsZWN0IHRoZSB0YWJcbiAgICB0aGlzLnRhYlNlcnZpY2Uuc2VsZWN0KHRhYik7XG5cbiAgICAvLyBlbnN1cmUgdGhlIHRhYiBpcyBtb3ZlZCBpbnRvIHZpZXcgaWYgcmVxdWlyZWRcbiAgICB0aGlzLm1vdmVJbnRvVmlldyhlbGVtZW50KTtcbiAgfVxuXG4gIHJlc2l6ZShkaW1lbnNpb25zOiBSZXNpemVEaW1lbnNpb25zKTogdm9pZCB7XG4gICAgdGhpcy5fd2lkdGggPSBkaW1lbnNpb25zLndpZHRoO1xuICAgIHRoaXMuX2lubmVyV2lkdGggPSB0aGlzLnRhYmxpc3QubmF0aXZlRWxlbWVudC5zY3JvbGxXaWR0aDtcblxuICAgIHRoaXMuYm91bmRzLmxvd2VyID0gMDtcbiAgICB0aGlzLmJvdW5kcy51cHBlciA9IC0odGhpcy5faW5uZXJXaWR0aCAtIHRoaXMuX3dpZHRoKTtcbiAgfVxuXG4gIHByZXZpb3VzKCk6IHZvaWQge1xuICAgIHRoaXMub2Zmc2V0ICs9IHRoaXMuX3dpZHRoO1xuXG4gICAgLy8gZW5zdXJlIGl0IHJlbWFpbnMgd2l0aGluIHRoZSBhbGxvd2VkIGJvdW5kc1xuICAgIHRoaXMub2Zmc2V0ID0gTWF0aC5taW4odGhpcy5vZmZzZXQsIHRoaXMuYm91bmRzLmxvd2VyKTtcbiAgfVxuXG4gIG5leHQoKTogdm9pZCB7XG4gICAgdGhpcy5vZmZzZXQgLT0gdGhpcy5fd2lkdGg7XG5cbiAgICAvLyBlbnN1cmUgaXQgcmVtYWlucyB3aXRoaW4gdGhlIGFsbG93ZWQgYm91bmRzXG4gICAgdGhpcy5vZmZzZXQgPSBNYXRoLm1heCh0aGlzLm9mZnNldCwgdGhpcy5ib3VuZHMudXBwZXIpO1xuICB9XG5cbiAgcHJpdmF0ZSBtb3ZlSW50b1ZpZXcoZWxlbWVudDogSFRNTEVsZW1lbnQpOiB2b2lkIHtcblxuICAgIC8vIGlmIHdlIGRvbnQgaGF2ZSB0aGUgZGltZW5zaW9ucyB3ZSBjYW50IGNoZWNrXG4gICAgaWYgKCF0aGlzLl93aWR0aCB8fCAhdGhpcy5faW5uZXJXaWR0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIGdldCB0aGUgY3VycmVudCBlbGVtZW50IGJvdW5kc1xuICAgIGNvbnN0IHsgb2Zmc2V0TGVmdCwgb2Zmc2V0V2lkdGggfSA9IGVsZW1lbnQ7XG4gICAgY29uc3QgeyBtYXJnaW5MZWZ0LCBtYXJnaW5SaWdodCB9ID0gZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50KTtcblxuICAgIC8vIGNhbGN1bGF0ZSB0aGUgdmlzaWJsZSBhcmVhXG4gICAgY29uc3Qgdmlld3BvcnRTdGFydCA9IE1hdGguYWJzKHRoaXMub2Zmc2V0KTtcbiAgICBjb25zdCB2aWV3cG9ydEVuZCA9IHZpZXdwb3J0U3RhcnQgKyB0aGlzLl93aWR0aDtcbiAgICBjb25zdCBjYXJkV2lkdGggPSBwYXJzZUZsb2F0KG1hcmdpbkxlZnQpICsgb2Zmc2V0V2lkdGggKyBwYXJzZUZsb2F0KG1hcmdpblJpZ2h0KTtcblxuICAgIC8vIGlmIHdlIG5lZWQgdG8gbW92ZSB0byB0aGUgbGVmdCAtIGZpZ3VyZSBvdXQgaG93IG11Y2hcbiAgICBpZiAob2Zmc2V0TGVmdCA8IHZpZXdwb3J0U3RhcnQpIHtcbiAgICAgIHRoaXMub2Zmc2V0IC09IChvZmZzZXRMZWZ0IC0gcGFyc2VGbG9hdChtYXJnaW5MZWZ0KSkgLSB2aWV3cG9ydFN0YXJ0O1xuICAgIH1cbiAgICBcbiAgICAvLyBpZiB3ZSBuZWVkIHRvIG1vdmUgdG8gdGhlIHJpZ2h0IC0gZmlndXJlIG91dCBob3cgbXVjaFxuICAgIGlmICgob2Zmc2V0TGVmdCArIGNhcmRXaWR0aCkgPiB2aWV3cG9ydEVuZCkge1xuICAgICAgdGhpcy5vZmZzZXQgLT0gKG9mZnNldExlZnQgKyBjYXJkV2lkdGgpIC0gdmlld3BvcnRFbmQ7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgQ2FyZFRhYnNCb3VuZHMge1xuICBsb3dlcjogbnVtYmVyO1xuICB1cHBlcjogbnVtYmVyO1xufVxuIl19