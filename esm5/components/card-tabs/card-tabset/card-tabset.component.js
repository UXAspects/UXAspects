/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, HostBinding, Input, ViewChild } from '@angular/core';
import { CardTabsService } from '../card-tabs.service';
var CardTabsetComponent = /** @class */ (function () {
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
                    template: "<div class=\"card-tab-content\" role=\"tabpanel\" *ngIf=\"(tabService.tab$ | async)\">\r\n    <ng-content></ng-content>\r\n</div>\r\n\r\n<div class=\"card-tabs\" #tabs>\r\n\r\n    <button class=\"card-tabs-paging-btn card-tabs-paging-btn-previous\" aria-label=\"Previous Tabs\" (click)=\"previous()\" *ngIf=\"offset < bounds.lower\">\r\n        <i class=\"hpe-icon hpe-previous\"></i>\r\n    </button>\r\n\r\n    <div class=\"card-tabs-list\" role=\"tablist\" #tablist (uxResize)=\"resize($event)\" [style.transform]=\"'translateX(' + offset + 'px)'\">\r\n\r\n        <div class=\"card-tab\"\r\n            role=\"tab\"\r\n            tabindex=\"0\" #card\r\n            *ngFor=\"let tab of tabService.tabs$ | async\"\r\n            [ngClass]=\"tabService.position$ | async\"\r\n            [class.active]=\"tab.active$ | async\"\r\n            [attr.aria-selected]=\"tab.active$ | async\"\r\n            (click)=\"select(tab, card)\"\r\n            (focus)=\"tabs.scrollLeft = 0\"\r\n            (keydown.enter)=\"select(tab, card)\">\r\n\r\n            <ng-container [ngTemplateOutlet]=\"tab.content\"></ng-container>\r\n        </div>\r\n\r\n    </div>\r\n\r\n    <button class=\"card-tabs-paging-btn card-tabs-paging-btn-next\" aria-label=\"Next Tabs\" (click)=\"next()\" *ngIf=\"offset > bounds.upper\">\r\n        <i class=\"hpe-icon hpe-next\"></i>\r\n    </button>\r\n</div>",
                    providers: [CardTabsService]
                }] }
    ];
    /** @nocollapse */
    CardTabsetComponent.ctorParameters = function () { return [
        { type: CardTabsService }
    ]; };
    CardTabsetComponent.propDecorators = {
        position: [{ type: HostBinding, args: ['class',] }, { type: Input }],
        tablist: [{ type: ViewChild, args: ['tablist',] }]
    };
    return CardTabsetComponent;
}());
export { CardTabsetComponent };
function CardTabsetComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FyZC10YWJzZXQuY29tcG9uZW50LmpzIiwic291cmNlUm9vdCI6Im5nOi8vQHV4LWFzcGVjdHMvdXgtYXNwZWN0cy8iLCJzb3VyY2VzIjpbImNvbXBvbmVudHMvY2FyZC10YWJzL2NhcmQtdGFic2V0L2NhcmQtdGFic2V0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHckYsT0FBTyxFQUFFLGVBQWUsRUFBRSxNQUFNLHNCQUFzQixDQUFDOztJQTBCckQsNkJBQW1CLFVBQTJCO1FBQTNCLGVBQVUsR0FBVixVQUFVLENBQWlCO3NCQU43QixDQUFDO3NCQUNPLEVBQUUsS0FBSyxFQUFFLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxFQUFFO0tBS0c7SUFqQmxELHNCQUNhLHlDQUFROzs7O1FBSXJCO1lBQ0UsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRSxDQUFDO1NBQzdDOzs7OztRQVBELFVBQ3NCLFNBQWlCO1lBQ3JDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxDQUFDO1NBQ3hDOzs7T0FBQTs7Ozs7O0lBZ0JELG9DQUFNOzs7OztJQUFOLFVBQU8sR0FBcUIsRUFBRSxPQUFvQjs7UUFFaEQsSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUM7O1FBRzVCLElBQUksQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDNUI7Ozs7O0lBRUQsb0NBQU07Ozs7SUFBTixVQUFPLFVBQTRCO1FBQ2pDLElBQUksQ0FBQyxNQUFNLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQztRQUMvQixJQUFJLENBQUMsV0FBVyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQztRQUUxRCxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssR0FBRyxDQUFDLENBQUM7UUFDdEIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxXQUFXLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO0tBQ3ZEOzs7O0lBRUQsc0NBQVE7OztJQUFSO1FBQ0UsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDOztRQUczQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hEOzs7O0lBRUQsa0NBQUk7OztJQUFKO1FBQ0UsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDOztRQUczQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO0tBQ3hEOzs7OztJQUVPLDBDQUFZOzs7O2NBQUMsT0FBb0I7O1FBR3ZDLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sQ0FBQztTQUNSOztRQUdPLElBQUEsK0JBQVUsRUFBRSxpQ0FBVyxDQUFhO1FBQzVDLG9DQUFRLDBCQUFVLEVBQUUsNEJBQVcsQ0FBK0I7O1FBRzlELHFCQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QyxxQkFBTSxXQUFXLEdBQUcsYUFBYSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUM7UUFDaEQscUJBQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsR0FBRyxXQUFXLEdBQUcsVUFBVSxDQUFDLFdBQVcsQ0FBQyxDQUFDOztRQUdqRixFQUFFLENBQUMsQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQztZQUMvQixJQUFJLENBQUMsTUFBTSxJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQyxHQUFHLGFBQWEsQ0FBQztTQUN0RTs7UUFHRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsR0FBRyxTQUFTLENBQUMsR0FBRyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxVQUFVLEdBQUcsU0FBUyxDQUFDLEdBQUcsV0FBVyxDQUFDO1NBQ3ZEOzs7Z0JBaEZKLFNBQVMsU0FBQztvQkFDVCxRQUFRLEVBQUUsZ0JBQWdCO29CQUMxQixrM0NBQTJDO29CQUMzQyxTQUFTLEVBQUUsQ0FBQyxlQUFlLENBQUM7aUJBQzdCOzs7O2dCQU5RLGVBQWU7OzsyQkFTckIsV0FBVyxTQUFDLE9BQU8sY0FDbkIsS0FBSzswQkFRTCxTQUFTLFNBQUMsU0FBUzs7OEJBckJ0Qjs7U0FVYSxtQkFBbUIiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEhvc3RCaW5kaW5nLCBJbnB1dCwgVmlld0NoaWxkIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBSZXNpemVEaW1lbnNpb25zIH0gZnJvbSAnLi4vLi4vLi4vZGlyZWN0aXZlcy9yZXNpemUnO1xuaW1wb3J0IHsgQ2FyZFRhYkNvbXBvbmVudCB9IGZyb20gJy4uL2NhcmQtdGFiL2NhcmQtdGFiLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBDYXJkVGFic1NlcnZpY2UgfSBmcm9tICcuLi9jYXJkLXRhYnMuc2VydmljZSc7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ3V4LWNhcmQtdGFic2V0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2NhcmQtdGFic2V0LmNvbXBvbmVudC5odG1sJyxcbiAgcHJvdmlkZXJzOiBbQ2FyZFRhYnNTZXJ2aWNlXVxufSlcbmV4cG9ydCBjbGFzcyBDYXJkVGFic2V0Q29tcG9uZW50IHtcblxuICBASG9zdEJpbmRpbmcoJ2NsYXNzJylcbiAgQElucHV0KCkgc2V0IHBvc2l0aW9uKGRpcmVjdGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy50YWJTZXJ2aWNlLnNldFBvc2l0aW9uKGRpcmVjdGlvbik7XG4gIH1cblxuICBnZXQgcG9zaXRpb24oKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy50YWJTZXJ2aWNlLnBvc2l0aW9uJC5nZXRWYWx1ZSgpO1xuICB9XG5cbiAgQFZpZXdDaGlsZCgndGFibGlzdCcpIHRhYmxpc3Q6IEVsZW1lbnRSZWY7XG5cbiAgb2Zmc2V0OiBudW1iZXIgPSAwO1xuICBib3VuZHM6IENhcmRUYWJzQm91bmRzID0geyBsb3dlcjogMCwgdXBwZXI6IDAgfTtcblxuICBwcml2YXRlIF93aWR0aDogbnVtYmVyO1xuICBwcml2YXRlIF9pbm5lcldpZHRoOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IocHVibGljIHRhYlNlcnZpY2U6IENhcmRUYWJzU2VydmljZSkge31cblxuICBzZWxlY3QodGFiOiBDYXJkVGFiQ29tcG9uZW50LCBlbGVtZW50OiBIVE1MRWxlbWVudCk6IHZvaWQge1xuICAgIC8vIHNlbGVjdCB0aGUgdGFiXG4gICAgdGhpcy50YWJTZXJ2aWNlLnNlbGVjdCh0YWIpO1xuXG4gICAgLy8gZW5zdXJlIHRoZSB0YWIgaXMgbW92ZWQgaW50byB2aWV3IGlmIHJlcXVpcmVkXG4gICAgdGhpcy5tb3ZlSW50b1ZpZXcoZWxlbWVudCk7XG4gIH1cblxuICByZXNpemUoZGltZW5zaW9uczogUmVzaXplRGltZW5zaW9ucyk6IHZvaWQge1xuICAgIHRoaXMuX3dpZHRoID0gZGltZW5zaW9ucy53aWR0aDtcbiAgICB0aGlzLl9pbm5lcldpZHRoID0gdGhpcy50YWJsaXN0Lm5hdGl2ZUVsZW1lbnQuc2Nyb2xsV2lkdGg7XG5cbiAgICB0aGlzLmJvdW5kcy5sb3dlciA9IDA7XG4gICAgdGhpcy5ib3VuZHMudXBwZXIgPSAtKHRoaXMuX2lubmVyV2lkdGggLSB0aGlzLl93aWR0aCk7XG4gIH1cblxuICBwcmV2aW91cygpOiB2b2lkIHtcbiAgICB0aGlzLm9mZnNldCArPSB0aGlzLl93aWR0aDtcblxuICAgIC8vIGVuc3VyZSBpdCByZW1haW5zIHdpdGhpbiB0aGUgYWxsb3dlZCBib3VuZHNcbiAgICB0aGlzLm9mZnNldCA9IE1hdGgubWluKHRoaXMub2Zmc2V0LCB0aGlzLmJvdW5kcy5sb3dlcik7XG4gIH1cblxuICBuZXh0KCk6IHZvaWQge1xuICAgIHRoaXMub2Zmc2V0IC09IHRoaXMuX3dpZHRoO1xuXG4gICAgLy8gZW5zdXJlIGl0IHJlbWFpbnMgd2l0aGluIHRoZSBhbGxvd2VkIGJvdW5kc1xuICAgIHRoaXMub2Zmc2V0ID0gTWF0aC5tYXgodGhpcy5vZmZzZXQsIHRoaXMuYm91bmRzLnVwcGVyKTtcbiAgfVxuXG4gIHByaXZhdGUgbW92ZUludG9WaWV3KGVsZW1lbnQ6IEhUTUxFbGVtZW50KTogdm9pZCB7XG5cbiAgICAvLyBpZiB3ZSBkb250IGhhdmUgdGhlIGRpbWVuc2lvbnMgd2UgY2FudCBjaGVja1xuICAgIGlmICghdGhpcy5fd2lkdGggfHwgIXRoaXMuX2lubmVyV2lkdGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBnZXQgdGhlIGN1cnJlbnQgZWxlbWVudCBib3VuZHNcbiAgICBjb25zdCB7IG9mZnNldExlZnQsIG9mZnNldFdpZHRoIH0gPSBlbGVtZW50O1xuICAgIGNvbnN0IHsgbWFyZ2luTGVmdCwgbWFyZ2luUmlnaHQgfSA9IGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCk7XG5cbiAgICAvLyBjYWxjdWxhdGUgdGhlIHZpc2libGUgYXJlYVxuICAgIGNvbnN0IHZpZXdwb3J0U3RhcnQgPSBNYXRoLmFicyh0aGlzLm9mZnNldCk7XG4gICAgY29uc3Qgdmlld3BvcnRFbmQgPSB2aWV3cG9ydFN0YXJ0ICsgdGhpcy5fd2lkdGg7XG4gICAgY29uc3QgY2FyZFdpZHRoID0gcGFyc2VGbG9hdChtYXJnaW5MZWZ0KSArIG9mZnNldFdpZHRoICsgcGFyc2VGbG9hdChtYXJnaW5SaWdodCk7XG5cbiAgICAvLyBpZiB3ZSBuZWVkIHRvIG1vdmUgdG8gdGhlIGxlZnQgLSBmaWd1cmUgb3V0IGhvdyBtdWNoXG4gICAgaWYgKG9mZnNldExlZnQgPCB2aWV3cG9ydFN0YXJ0KSB7XG4gICAgICB0aGlzLm9mZnNldCAtPSAob2Zmc2V0TGVmdCAtIHBhcnNlRmxvYXQobWFyZ2luTGVmdCkpIC0gdmlld3BvcnRTdGFydDtcbiAgICB9XG4gICAgXG4gICAgLy8gaWYgd2UgbmVlZCB0byBtb3ZlIHRvIHRoZSByaWdodCAtIGZpZ3VyZSBvdXQgaG93IG11Y2hcbiAgICBpZiAoKG9mZnNldExlZnQgKyBjYXJkV2lkdGgpID4gdmlld3BvcnRFbmQpIHtcbiAgICAgIHRoaXMub2Zmc2V0IC09IChvZmZzZXRMZWZ0ICsgY2FyZFdpZHRoKSAtIHZpZXdwb3J0RW5kO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgaW50ZXJmYWNlIENhcmRUYWJzQm91bmRzIHtcbiAgbG93ZXI6IG51bWJlcjtcbiAgdXBwZXI6IG51bWJlcjtcbn1cbiJdfQ==