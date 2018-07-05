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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC10YWJzZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2FyZC10YWJzL2NhcmQtdGFic2V0L2NhcmQtdGFic2V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztJQXlEckQsNkJBQW1CLFVBQTJCO1FBQTNCLGVBQVUsR0FBVixVQUFVLENBQWlCO3NCQU43QixDQUFDO3NCQUNPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO0tBS0c7MEJBaEJyQyx5Q0FBUTs7OztRQUlyQjtZQUNFLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztTQUM3Qzs7Ozs7a0JBTnFCLFNBQWlCO1lBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDOzs7Ozs7Ozs7O0lBaUJ6QyxvQ0FBTTs7Ozs7SUFBTixVQUFPLEdBQXFCLEVBQUUsT0FBb0I7O1FBRWhELElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztRQUc1QixJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQzVCOzs7OztJQUVELG9DQUFNOzs7O0lBQU4sVUFBTyxVQUE0QjtRQUNqQyxJQUFJLENBQUMsTUFBTSxHQUFHLFVBQVUsQ0FBQyxLQUFLLENBQUM7UUFDL0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFFMUQsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ3RCLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztLQUN2RDs7OztJQUVELHNDQUFROzs7SUFBUjtRQUNFLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQzs7UUFHM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN4RDs7OztJQUVELGtDQUFJOzs7SUFBSjtRQUNFLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQzs7UUFHM0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUN4RDs7Ozs7SUFFTywwQ0FBWTs7OztjQUFDLE9BQW9COztRQUd2QyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUN0QyxNQUFNLENBQUM7U0FDUjs7UUFHTyxJQUFBLCtCQUFVLEVBQUUsaUNBQVcsQ0FBYTtRQUM1QyxvQ0FBUSwwQkFBVSxFQUFFLDRCQUFXLENBQStCOztRQUc5RCxxQkFBTSxhQUFhLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDNUMscUJBQU0sV0FBVyxHQUFHLGFBQWEsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDO1FBQ2hELHFCQUFNLFNBQVMsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLEdBQUcsV0FBVyxHQUFHLFVBQVUsQ0FBQyxXQUFXLENBQUMsQ0FBQzs7UUFHakYsRUFBRSxDQUFDLENBQUMsVUFBVSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUMsVUFBVSxDQUFDLENBQUMsR0FBRyxhQUFhLENBQUM7U0FDdEU7O1FBR0QsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxHQUFHLFdBQVcsQ0FBQztTQUN2RDs7O2dCQS9HSixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGdCQUFnQjtvQkFDMUIsUUFBUSxFQUFFLDB5Q0ErQkw7b0JBQ0wsU0FBUyxFQUFFLENBQUMsZUFBZSxDQUFDO2lCQUM3Qjs7OztnQkFyQ1EsZUFBZTs7OzZCQXdDckIsV0FBVyxTQUFDLE9BQU8sY0FDbkIsS0FBSzs0QkFRTCxTQUFTLFNBQUMsU0FBUzs7OEJBcER0Qjs7U0F5Q2EsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSW5wdXQsIFZpZXdDaGlsZCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgUmVzaXplRGltZW5zaW9ucyB9IGZyb20gJy4uLy4uLy4uL2RpcmVjdGl2ZXMvcmVzaXplJztcbmltcG9ydCB7IENhcmRUYWJDb21wb25lbnQgfSBmcm9tICcuLi9jYXJkLXRhYi9jYXJkLXRhYi5jb21wb25lbnQnO1xuaW1wb3J0IHsgQ2FyZFRhYnNTZXJ2aWNlIH0gZnJvbSAnLi4vY2FyZC10YWJzLnNlcnZpY2UnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICd1eC1jYXJkLXRhYnNldCcsXG4gIHRlbXBsYXRlOiBgPGRpdiBjbGFzcz1cImNhcmQtdGFiLWNvbnRlbnRcIiByb2xlPVwidGFicGFuZWxcIiAqbmdJZj1cIih0YWJTZXJ2aWNlLnRhYiQgfCBhc3luYylcIj5cbiAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG48L2Rpdj5cblxuPGRpdiBjbGFzcz1cImNhcmQtdGFic1wiICN0YWJzPlxuXG4gICAgPGJ1dHRvbiBjbGFzcz1cImNhcmQtdGFicy1wYWdpbmctYnRuIGNhcmQtdGFicy1wYWdpbmctYnRuLXByZXZpb3VzXCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzIFRhYnNcIiAoY2xpY2spPVwicHJldmlvdXMoKVwiICpuZ0lmPVwib2Zmc2V0IDwgYm91bmRzLmxvd2VyXCI+XG4gICAgICAgIDxpIGNsYXNzPVwiaHBlLWljb24gaHBlLXByZXZpb3VzXCI+PC9pPlxuICAgIDwvYnV0dG9uPlxuXG4gICAgPGRpdiBjbGFzcz1cImNhcmQtdGFicy1saXN0XCIgcm9sZT1cInRhYmxpc3RcIiAjdGFibGlzdCAodXhSZXNpemUpPVwicmVzaXplKCRldmVudClcIiBbc3R5bGUudHJhbnNmb3JtXT1cIid0cmFuc2xhdGVYKCcgKyBvZmZzZXQgKyAncHgpJ1wiPlxuXG4gICAgICAgIDxkaXYgY2xhc3M9XCJjYXJkLXRhYlwiXG4gICAgICAgICAgICByb2xlPVwidGFiXCJcbiAgICAgICAgICAgIHRhYmluZGV4PVwiMFwiICNjYXJkXG4gICAgICAgICAgICAqbmdGb3I9XCJsZXQgdGFiIG9mIHRhYlNlcnZpY2UudGFicyQgfCBhc3luY1wiXG4gICAgICAgICAgICBbbmdDbGFzc109XCJ0YWJTZXJ2aWNlLnBvc2l0aW9uJCB8IGFzeW5jXCJcbiAgICAgICAgICAgIFtjbGFzcy5hY3RpdmVdPVwidGFiLmFjdGl2ZSQgfCBhc3luY1wiXG4gICAgICAgICAgICBbYXR0ci5hcmlhLXNlbGVjdGVkXT1cInRhYi5hY3RpdmUkIHwgYXN5bmNcIlxuICAgICAgICAgICAgKGNsaWNrKT1cInNlbGVjdCh0YWIsIGNhcmQpXCJcbiAgICAgICAgICAgIChmb2N1cyk9XCJ0YWJzLnNjcm9sbExlZnQgPSAwXCJcbiAgICAgICAgICAgIChrZXlkb3duLmVudGVyKT1cInNlbGVjdCh0YWIsIGNhcmQpXCI+XG5cbiAgICAgICAgICAgIDxuZy1jb250YWluZXIgW25nVGVtcGxhdGVPdXRsZXRdPVwidGFiLmNvbnRlbnRcIj48L25nLWNvbnRhaW5lcj5cbiAgICAgICAgPC9kaXY+XG5cbiAgICA8L2Rpdj5cblxuICAgIDxidXR0b24gY2xhc3M9XCJjYXJkLXRhYnMtcGFnaW5nLWJ0biBjYXJkLXRhYnMtcGFnaW5nLWJ0bi1uZXh0XCIgYXJpYS1sYWJlbD1cIk5leHQgVGFic1wiIChjbGljayk9XCJuZXh0KClcIiAqbmdJZj1cIm9mZnNldCA+IGJvdW5kcy51cHBlclwiPlxuICAgICAgICA8aSBjbGFzcz1cImhwZS1pY29uIGhwZS1uZXh0XCI+PC9pPlxuICAgIDwvYnV0dG9uPlxuPC9kaXY+YCxcbiAgcHJvdmlkZXJzOiBbQ2FyZFRhYnNTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBDYXJkVGFic2V0Q29tcG9uZW50IHtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgQElucHV0KCkgc2V0IHBvc2l0aW9uKGRpcmVjdGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy50YWJTZXJ2aWNlLnNldFBvc2l0aW9uKGRpcmVjdGlvbik7XG4gIH1cblxuICBnZXQgcG9zaXRpb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50YWJTZXJ2aWNlLnBvc2l0aW9uJC5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgQFZpZXdDaGlsZCgndGFibGlzdCcpIHRhYmxpc3Q6IEVsZW1lbnRSZWY7XG5cbiAgb2Zmc2V0OiBudW1iZXIgPSAwO1xuICBib3VuZHM6IENhcmRUYWJzQm91bmRzID0geyBsb3dlcjogMCwgdXBwZXI6IDAgfTtcblxuICBwcml2YXRlIF93aWR0aDogbnVtYmVyO1xuICBwcml2YXRlIF9pbm5lcldpZHRoOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYlNlcnZpY2U6IENhcmRUYWJzU2VydmljZSkge31cblxuICBzZWxlY3QodGFiOiBDYXJkVGFiQ29tcG9uZW50LCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIC8vIHNlbGVjdCB0aGUgdGFiXG4gICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdCh0YWIpO1xuXG4gICAgLy8gZW5zdXJlIHRoZSB0YWIgaXMgbW92ZWQgaW50byB2aWV3IGlmIHJlcXVpcmVkXG4gICAgdGhpcy5tb3ZlSW50b1ZpZXcoZWxlbWVudCk7XG4gIH1cblxuICByZXNpemUoZGltZW5zaW9uczogUmVzaXplRGltZW5zaW9ucyk6IHZvaWQge1xuICAgIHRoaXMuX3dpZHRoID0gZGltZW5zaW9ucy53aWR0aDtcbiAgICB0aGlzLl9pbm5lcldpZHRoID0gdGhpcy50YWJsaXN0Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGg7XG5cbiAgICB0aGlzLmJvdW5kcy5sb3dlciA9IDA7XG4gICAgdGhpcy5ib3VuZHMudXBwZXIgPSAtKHRoaXMuX2lubmVyV2lkdGggLSB0aGlzLl93aWR0aCk7XG4gIH1cblxuICBwcmV2aW91cygpOiB2b2lkIHtcbiAgICB0aGlzLm9mZnNldCArPSB0aGlzLl93aWR0aDtcblxuICAgIC8vIGVuc3VyZSBpdCByZW1haW5zIHdpdGhpbiB0aGUgYWxsb3dlZCBib3VuZHNcbiAgICB0aGlzLm9mZnNldCA9IE1hdGgubWluKHRoaXMub2Zmc2V0LCB0aGlzLmJvdW5kcy5sb3dlcik7XG4gIH1cblxuICBuZXh0KCk6IHZvaWQge1xuICAgIHRoaXMub2Zmc2V0IC09IHRoaXMuX3dpZHRoO1xuXG4gICAgLy8gZW5zdXJlIGl0IHJlbWFpbnMgd2l0aGluIHRoZSBhbGxvd2VkIGJvdW5kc1xuICAgIHRoaXMub2Zmc2V0ID0gTWF0aC5tYXgodGhpcy5vZmZzZXQsIHRoaXMuYm91bmRzLnVwcGVyKTtcbiAgfVxuXG4gIHByaXZhdGUgbW92ZUludG9WaWV3KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG5cbiAgICAvLyBpZiB3ZSBkb250IGhhdmUgdGhlIGRpbWVuc2lvbnMgd2UgY2FudCBjaGVja1xuICAgIGlmICghdGhpcy5fd2lkdGggfHwgIXRoaXMuX2lubmVyV2lkdGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBnZXQgdGhlIGN1cnJlbnQgZWxlbWVudCBib3VuZHNcbiAgICBjb25zdCB7IG9mZnNldExlZnQsIG9mZnNldFdpZHRoIH0gPSBlbGVtZW50O1xuICAgIGNvbnN0IHsgbWFyZ2luTGVmdCwgbWFyZ2luUmlnaHQgfSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG5cbiAgICAvLyBjYWxjdWxhdGUgdGhlIHZpc2libGUgYXJlYVxuICAgIGNvbnN0IHZpZXdwb3J0U3RhcnQgPSBNYXRoLmFicyh0aGlzLm9mZnNldCk7XG4gICAgY29uc3Qgdmlld3BvcnRFbmQgPSB2aWV3cG9ydFN0YXJ0ICsgdGhpcy5fd2lkdGg7XG4gICAgY29uc3QgY2FyZFdpZHRoID0gcGFyc2VGbG9hdChtYXJnaW5MZWZ0KSArIG9mZnNldFdpZHRoICsgcGFyc2VGbG9hdChtYXJnaW5SaWdodCk7XG5cbiAgICAvLyBpZiB3ZSBuZWVkIHRvIG1vdmUgdG8gdGhlIGxlZnQgLSBmaWd1cmUgb3V0IGhvdyBtdWNoXG4gICAgaWYgKG9mZnNldExlZnQgPCB2aWV3cG9ydFN0YXJ0KSB7XG4gICAgICB0aGlzLm9mZnNldCAtPSAob2Zmc2V0TGVmdCAtIHBhcnNlRmxvYXQobWFyZ2luTGVmdCkpIC0gdmlld3BvcnRTdGFydDtcbiAgICB9XG4gICAgXG4gICAgLy8gaWYgd2UgbmVlZCB0byBtb3ZlIHRvIHRoZSByaWdodCAtIGZpZ3VyZSBvdXQgaG93IG11Y2hcbiAgICBpZiAoKG9mZnNldExlZnQgKyBjYXJkV2lkdGgpID4gdmlld3BvcnRFbmQpIHtcbiAgICAgIHRoaXMub2Zmc2V0IC09IChvZmZzZXRMZWZ0ICsgY2FyZFdpZHRoKSAtIHZpZXdwb3J0RW5kO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhcmRUYWJzQm91bmRzIHtcbiAgbG93ZXI6IG51bWJlcjtcbiAgdXBwZXI6IG51bWJlcjtcbn1cbiJdfQ==