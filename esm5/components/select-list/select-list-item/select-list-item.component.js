/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { SelectionService } from '../../../directives/selection/selection.service';
var SelectListItemComponent = /** @class */ (function () {
    function SelectListItemComponent(_selection, elementRef) {
        var _this = this;
        this._selection = _selection;
        this.tabindex = -1;
        this._onDestroy = new Subject();
        _selection.active$.pipe(takeUntil(this._onDestroy), filter(function (data) { return data === _this.data; })).subscribe(function (active) {
            _selection.focus$.next(active);
            elementRef.nativeElement.focus();
        });
        // make this item tabbable or not based on the focused element
        _selection.focus$.pipe(takeUntil(this._onDestroy))
            .subscribe(function (focused) { return _this.tabindex = focused === _this.data ? 0 : -1; });
    }
    Object.defineProperty(SelectListItemComponent.prototype, "selected", {
        get: /**
         * @return {?}
         */
        function () {
            return this._selection.isSelected(this.data);
        },
        set: /**
         * @param {?} isSelected
         * @return {?}
         */
        function (isSelected) {
            isSelected ? this._selection.select(this.data) : this._selection.deselect(this.data);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    SelectListItemComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectListItemComponent.prototype.onMouseDown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._selection.strategy.mousedown(event, this.data);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectListItemComponent.prototype.onClick = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._selection.strategy.click(event, this.data);
    };
    /**
     * @param {?} event
     * @return {?}
     */
    SelectListItemComponent.prototype.onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._selection.strategy.keydown(event, this.data);
    };
    SelectListItemComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-select-list-item',
                    template: "<ng-content></ng-content>",
                    host: {
                        role: 'listitem'
                    }
                }] }
    ];
    /** @nocollapse */
    SelectListItemComponent.ctorParameters = function () { return [
        { type: SelectionService },
        { type: ElementRef }
    ]; };
    SelectListItemComponent.propDecorators = {
        data: [{ type: Input }],
        tabindex: [{ type: HostBinding, args: ['tabindex',] }],
        selected: [{ type: HostBinding, args: ['class.selected',] }, { type: HostBinding, args: ['attr.aria-selected',] }],
        onMouseDown: [{ type: HostListener, args: ['mousedown', ['$event'],] }],
        onClick: [{ type: HostListener, args: ['click', ['$event'],] }],
        onKeydown: [{ type: HostListener, args: ['keydown', ['$event'],] }]
    };
    return SelectListItemComponent;
}());
export { SelectListItemComponent };
function SelectListItemComponent_tsickle_Closure_declarations() {
    /** @type {?} */
    SelectListItemComponent.prototype.data;
    /** @type {?} */
    SelectListItemComponent.prototype.tabindex;
    /** @type {?} */
    SelectListItemComponent.prototype._onDestroy;
    /** @type {?} */
    SelectListItemComponent.prototype._selection;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VsZWN0LWxpc3QtaXRlbS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9zZWxlY3QtbGlzdC9zZWxlY3QtbGlzdC1pdGVtL3NlbGVjdC1saXN0LWl0ZW0uY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxXQUFXLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFBYSxNQUFNLGVBQWUsQ0FBQztBQUNuRyxPQUFPLEVBQUUsTUFBTSxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQ25ELE9BQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxjQUFjLENBQUM7QUFDdkMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0saURBQWlELENBQUM7O0lBMEIvRSxpQ0FBb0IsVUFBNEIsRUFBRSxVQUFzQjtRQUF4RSxpQkFVQztRQVZtQixlQUFVLEdBQVYsVUFBVSxDQUFrQjt3QkFkSixDQUFDLENBQUM7MEJBWXpCLElBQUksT0FBTyxFQUFRO1FBSXBDLFVBQVUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUUsTUFBTSxDQUFDLFVBQUEsSUFBSSxJQUFJLE9BQUEsSUFBSSxLQUFLLEtBQUksQ0FBQyxJQUFJLEVBQWxCLENBQWtCLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxVQUFBLE1BQU07WUFDcEcsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDL0IsVUFBVSxDQUFDLGFBQWEsQ0FBQyxLQUFLLEVBQUUsQ0FBQztTQUNwQyxDQUFDLENBQUM7O1FBR0gsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUM3QyxTQUFTLENBQUMsVUFBQSxPQUFPLElBQUksT0FBQSxLQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sS0FBSyxLQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUE5QyxDQUE4QyxDQUFDLENBQUM7S0FDN0U7SUF0QkQsc0JBRUksNkNBQVE7Ozs7UUFJWjtZQUNJLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDaEQ7Ozs7O1FBUkQsVUFFYSxVQUFtQjtZQUM1QixVQUFVLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3hGOzs7T0FBQTs7OztJQW9CRCw2Q0FBVzs7O0lBQVg7UUFDSSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDOUI7Ozs7O0lBR0QsNkNBQVc7Ozs7SUFEWCxVQUNZLEtBQWlCO1FBQ3pCLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ3hEOzs7OztJQUdELHlDQUFPOzs7O0lBRFAsVUFDUSxLQUFpQjtRQUNyQixJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUNwRDs7Ozs7SUFHRCwyQ0FBUzs7OztJQURULFVBQ1UsS0FBb0I7UUFDMUIsSUFBSSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDdEQ7O2dCQXRESixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLHFCQUFxQjtvQkFDL0IscUNBQWdEO29CQUNoRCxJQUFJLEVBQUU7d0JBQ0YsSUFBSSxFQUFFLFVBQVU7cUJBQ25CO2lCQUNKOzs7O2dCQVJRLGdCQUFnQjtnQkFITCxVQUFVOzs7dUJBY3pCLEtBQUs7MkJBQ0wsV0FBVyxTQUFDLFVBQVU7MkJBRXRCLFdBQVcsU0FBQyxnQkFBZ0IsY0FDNUIsV0FBVyxTQUFDLG9CQUFvQjs4QkE0QmhDLFlBQVksU0FBQyxXQUFXLEVBQUUsQ0FBQyxRQUFRLENBQUM7MEJBS3BDLFlBQVksU0FBQyxPQUFPLEVBQUUsQ0FBQyxRQUFRLENBQUM7NEJBS2hDLFlBQVksU0FBQyxTQUFTLEVBQUUsQ0FBQyxRQUFRLENBQUM7O2tDQXhEdkM7O1NBWWEsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBIb3N0QmluZGluZywgSG9zdExpc3RlbmVyLCBJbnB1dCwgT25EZXN0cm95IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgU2VsZWN0aW9uU2VydmljZSB9IGZyb20gJy4uLy4uLy4uL2RpcmVjdGl2ZXMvc2VsZWN0aW9uL3NlbGVjdGlvbi5zZXJ2aWNlJztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1zZWxlY3QtbGlzdC1pdGVtJyxcbiAgICB0ZW1wbGF0ZVVybDogJy4vc2VsZWN0LWxpc3QtaXRlbS5jb21wb25lbnQuaHRtbCcsXG4gICAgaG9zdDoge1xuICAgICAgICByb2xlOiAnbGlzdGl0ZW0nXG4gICAgfVxufSlcbmV4cG9ydCBjbGFzcyBTZWxlY3RMaXN0SXRlbUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBkYXRhOiBhbnk7XG4gICAgQEhvc3RCaW5kaW5nKCd0YWJpbmRleCcpIHRhYmluZGV4OiBudW1iZXIgPSAtMTtcblxuICAgIEBIb3N0QmluZGluZygnY2xhc3Muc2VsZWN0ZWQnKVxuICAgIEBIb3N0QmluZGluZygnYXR0ci5hcmlhLXNlbGVjdGVkJylcbiAgICBzZXQgc2VsZWN0ZWQoaXNTZWxlY3RlZDogYm9vbGVhbikge1xuICAgICAgICBpc1NlbGVjdGVkID8gdGhpcy5fc2VsZWN0aW9uLnNlbGVjdCh0aGlzLmRhdGEpIDogdGhpcy5fc2VsZWN0aW9uLmRlc2VsZWN0KHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgZ2V0IHNlbGVjdGVkKCk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uLmlzU2VsZWN0ZWQodGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICBwcml2YXRlIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2VsZWN0aW9uOiBTZWxlY3Rpb25TZXJ2aWNlLCBlbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG5cbiAgICAgICAgX3NlbGVjdGlvbi5hY3RpdmUkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSksIGZpbHRlcihkYXRhID0+IGRhdGEgPT09IHRoaXMuZGF0YSkpLnN1YnNjcmliZShhY3RpdmUgPT4ge1xuICAgICAgICAgICAgX3NlbGVjdGlvbi5mb2N1cyQubmV4dChhY3RpdmUpO1xuICAgICAgICAgICAgZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LmZvY3VzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIG1ha2UgdGhpcyBpdGVtIHRhYmJhYmxlIG9yIG5vdCBiYXNlZCBvbiB0aGUgZm9jdXNlZCBlbGVtZW50XG4gICAgICAgIF9zZWxlY3Rpb24uZm9jdXMkLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKGZvY3VzZWQgPT4gdGhpcy50YWJpbmRleCA9IGZvY3VzZWQgPT09IHRoaXMuZGF0YSA/IDAgOiAtMSk7XG4gICAgfVxuXG4gICAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5uZXh0KCk7XG4gICAgICAgIHRoaXMuX29uRGVzdHJveS5jb21wbGV0ZSgpO1xuICAgIH1cblxuICAgIEBIb3N0TGlzdGVuZXIoJ21vdXNlZG93bicsIFsnJGV2ZW50J10pXG4gICAgb25Nb3VzZURvd24oZXZlbnQ6IE1vdXNlRXZlbnQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fc2VsZWN0aW9uLnN0cmF0ZWd5Lm1vdXNlZG93bihldmVudCwgdGhpcy5kYXRhKTtcbiAgICB9XG5cbiAgICBASG9zdExpc3RlbmVyKCdjbGljaycsIFsnJGV2ZW50J10pXG4gICAgb25DbGljayhldmVudDogTW91c2VFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9zZWxlY3Rpb24uc3RyYXRlZ3kuY2xpY2soZXZlbnQsIHRoaXMuZGF0YSk7XG4gICAgfVxuXG4gICAgQEhvc3RMaXN0ZW5lcigna2V5ZG93bicsIFsnJGV2ZW50J10pXG4gICAgb25LZXlkb3duKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuX3NlbGVjdGlvbi5zdHJhdGVneS5rZXlkb3duKGV2ZW50LCB0aGlzLmRhdGEpO1xuICAgIH1cbn0iXX0=