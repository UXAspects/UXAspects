/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import * as tslib_1 from "tslib";
import { FocusKeyManager } from '@angular/cdk/a11y';
import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
import { FacetCheckListItemComponent } from './check-list-item/facet-check-list-item.component';
var FacetCheckListComponent = (function (_super) {
    tslib_1.__extends(FacetCheckListComponent, _super);
    function FacetCheckListComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.facets = [];
        _this.scrollbar = true;
        _this.expanded = true;
        _this.isFocused = false;
        _this.activeIndex = 0;
        return _this;
    }
    /**
     * @return {?}
     */
    FacetCheckListComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._focusKeyManager = new FocusKeyManager(this.options)
            .withVerticalOrientation();
        this._focusKeyManager.change.pipe(takeUntil(this._onDestroy)).subscribe(function (index) { return _this.activeIndex = index; });
    };
    /**
     * @param {?} index
     * @return {?}
     */
    FacetCheckListComponent.prototype.onFocus = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this._focusKeyManager.activeItemIndex === -1) {
            this._focusKeyManager.setActiveItem(index);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FacetCheckListComponent.prototype.onKeydown = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this._focusKeyManager.onKeydown(event);
    };
    /**
     * @param {?} index
     * @param {?} facet
     * @return {?}
     */
    FacetCheckListComponent.prototype.toggleFacet = /**
     * @param {?} index
     * @param {?} facet
     * @return {?}
     */
    function (index, facet) {
        this.toggleFacetSelection(facet);
        this._focusKeyManager.setActiveItem(index);
    };
    FacetCheckListComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-facet-check-list',
                    template: "<ux-facet-header [header]=\"header\" [(expanded)]=\"expanded\"></ux-facet-header>\n\n<!-- Create a container which will show when section is expanded -->\n<div class=\"facet-check-list-container\"\n    tabindex=\"-1\"\n    role=\"listbox\"\n    [class.facet-check-list-scrollbar]=\"scrollbar\"\n    [class.facet-check-list-scrollbar-focused]=\"isFocused\"\n    *ngIf=\"expanded\">\n\n    <!-- Iterate through each possible facet -->\n    <ux-facet-check-list-item *ngFor=\"let facet of facets; let index = index\"\n        [facet]=\"facet\"\n        [tabbable]=\"activeIndex === index\"\n        [selected]=\"isFacetSelected(facet)\"\n        (selectedChange)=\"toggleFacet(index, facet)\"\n        (keydown)=\"onKeydown($event)\"\n        (itemFocus)=\"isFocused = true; onFocus(index)\"\n        (itemBlur)=\"isFocused = false\">\n    </ux-facet-check-list-item>\n\n</div>"
                },] },
    ];
    /** @nocollapse */
    FacetCheckListComponent.ctorParameters = function () { return []; };
    FacetCheckListComponent.propDecorators = {
        "facets": [{ type: Input },],
        "header": [{ type: Input },],
        "scrollbar": [{ type: Input },],
        "expanded": [{ type: Input },],
        "options": [{ type: ViewChildren, args: [FacetCheckListItemComponent,] },],
    };
    return FacetCheckListComponent;
}(FacetBaseComponent));
export { FacetCheckListComponent };
function FacetCheckListComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FacetCheckListComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FacetCheckListComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FacetCheckListComponent.propDecorators;
    /** @type {?} */
    FacetCheckListComponent.prototype.facets;
    /** @type {?} */
    FacetCheckListComponent.prototype.header;
    /** @type {?} */
    FacetCheckListComponent.prototype.scrollbar;
    /** @type {?} */
    FacetCheckListComponent.prototype.expanded;
    /** @type {?} */
    FacetCheckListComponent.prototype.options;
    /** @type {?} */
    FacetCheckListComponent.prototype.isFocused;
    /** @type {?} */
    FacetCheckListComponent.prototype.activeIndex;
    /** @type {?} */
    FacetCheckListComponent.prototype._focusKeyManager;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtY2hlY2stbGlzdC5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9mYWNldHMvZmFjZXQtY2hlY2stbGlzdC9mYWNldC1jaGVjay1saXN0LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSxtQkFBbUIsQ0FBQztBQUNwRCxPQUFPLEVBQWlCLFNBQVMsRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUN6RixPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDM0MsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUNBQXlDLENBQUM7QUFFN0UsT0FBTyxFQUFFLDJCQUEyQixFQUFFLE1BQU0sbURBQW1ELENBQUM7O0lBMkJuRCxtREFBa0I7Ozt1QkFFaEMsRUFBRTswQkFFQyxJQUFJO3lCQUNMLElBQUk7MEJBSVosS0FBSzs0QkFDSixDQUFDOzs7Ozs7SUFJdkIsaURBQWU7OztJQUFmO1FBQUEsaUJBS0M7UUFKRyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsSUFBSSxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUNwRCx1QkFBdUIsRUFBRSxDQUFDO1FBRS9CLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxTQUFTLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFJLENBQUMsV0FBVyxHQUFHLEtBQUssRUFBeEIsQ0FBd0IsQ0FBQyxDQUFDO0tBQzlHOzs7OztJQUVELHlDQUFPOzs7O0lBQVAsVUFBUSxLQUFhO1FBQ2pCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxlQUFlLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQy9DLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDOUM7S0FDSjs7Ozs7SUFFRCwyQ0FBUzs7OztJQUFULFVBQVUsS0FBb0I7UUFDMUIsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUMxQzs7Ozs7O0lBRUQsNkNBQVc7Ozs7O0lBQVgsVUFBWSxLQUFhLEVBQUUsS0FBWTtRQUNuQyxJQUFJLENBQUMsb0JBQW9CLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztLQUM5Qzs7Z0JBM0RKLFNBQVMsU0FBQztvQkFDUCxRQUFRLEVBQUUscUJBQXFCO29CQUMvQixRQUFRLEVBQUUsNDJCQXFCUDtpQkFDTjs7Ozs7MkJBR0ksS0FBSzsyQkFDTCxLQUFLOzhCQUNMLEtBQUs7NkJBQ0wsS0FBSzs0QkFFTCxZQUFZLFNBQUMsMkJBQTJCOztrQ0F2QzdDO0VBZ0M2QyxrQkFBa0I7U0FBbEQsdUJBQXVCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgRm9jdXNLZXlNYW5hZ2VyIH0gZnJvbSAnQGFuZ3VsYXIvY2RrL2ExMXknO1xuaW1wb3J0IHsgQWZ0ZXJWaWV3SW5pdCwgQ29tcG9uZW50LCBJbnB1dCwgUXVlcnlMaXN0LCBWaWV3Q2hpbGRyZW4gfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IEZhY2V0QmFzZUNvbXBvbmVudCB9IGZyb20gJy4uL2Jhc2UvZmFjZXQtYmFzZS9mYWNldC1iYXNlLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYWNldCB9IGZyb20gJy4uL21vZGVscy9mYWNldCc7XG5pbXBvcnQgeyBGYWNldENoZWNrTGlzdEl0ZW1Db21wb25lbnQgfSBmcm9tICcuL2NoZWNrLWxpc3QtaXRlbS9mYWNldC1jaGVjay1saXN0LWl0ZW0uY29tcG9uZW50JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1mYWNldC1jaGVjay1saXN0JyxcbiAgICB0ZW1wbGF0ZTogYDx1eC1mYWNldC1oZWFkZXIgW2hlYWRlcl09XCJoZWFkZXJcIiBbKGV4cGFuZGVkKV09XCJleHBhbmRlZFwiPjwvdXgtZmFjZXQtaGVhZGVyPlxuXG48IS0tIENyZWF0ZSBhIGNvbnRhaW5lciB3aGljaCB3aWxsIHNob3cgd2hlbiBzZWN0aW9uIGlzIGV4cGFuZGVkIC0tPlxuPGRpdiBjbGFzcz1cImZhY2V0LWNoZWNrLWxpc3QtY29udGFpbmVyXCJcbiAgICB0YWJpbmRleD1cIi0xXCJcbiAgICByb2xlPVwibGlzdGJveFwiXG4gICAgW2NsYXNzLmZhY2V0LWNoZWNrLWxpc3Qtc2Nyb2xsYmFyXT1cInNjcm9sbGJhclwiXG4gICAgW2NsYXNzLmZhY2V0LWNoZWNrLWxpc3Qtc2Nyb2xsYmFyLWZvY3VzZWRdPVwiaXNGb2N1c2VkXCJcbiAgICAqbmdJZj1cImV4cGFuZGVkXCI+XG5cbiAgICA8IS0tIEl0ZXJhdGUgdGhyb3VnaCBlYWNoIHBvc3NpYmxlIGZhY2V0IC0tPlxuICAgIDx1eC1mYWNldC1jaGVjay1saXN0LWl0ZW0gKm5nRm9yPVwibGV0IGZhY2V0IG9mIGZhY2V0czsgbGV0IGluZGV4ID0gaW5kZXhcIlxuICAgICAgICBbZmFjZXRdPVwiZmFjZXRcIlxuICAgICAgICBbdGFiYmFibGVdPVwiYWN0aXZlSW5kZXggPT09IGluZGV4XCJcbiAgICAgICAgW3NlbGVjdGVkXT1cImlzRmFjZXRTZWxlY3RlZChmYWNldClcIlxuICAgICAgICAoc2VsZWN0ZWRDaGFuZ2UpPVwidG9nZ2xlRmFjZXQoaW5kZXgsIGZhY2V0KVwiXG4gICAgICAgIChrZXlkb3duKT1cIm9uS2V5ZG93bigkZXZlbnQpXCJcbiAgICAgICAgKGl0ZW1Gb2N1cyk9XCJpc0ZvY3VzZWQgPSB0cnVlOyBvbkZvY3VzKGluZGV4KVwiXG4gICAgICAgIChpdGVtQmx1cik9XCJpc0ZvY3VzZWQgPSBmYWxzZVwiPlxuICAgIDwvdXgtZmFjZXQtY2hlY2stbGlzdC1pdGVtPlxuXG48L2Rpdj5gXG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0Q2hlY2tMaXN0Q29tcG9uZW50IGV4dGVuZHMgRmFjZXRCYXNlQ29tcG9uZW50IGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgICBASW5wdXQoKSBmYWNldHM6IEZhY2V0W10gPSBbXTtcbiAgICBASW5wdXQoKSBoZWFkZXI6IHN0cmluZztcbiAgICBASW5wdXQoKSBzY3JvbGxiYXI6IGJvb2xlYW4gPSB0cnVlO1xuICAgIEBJbnB1dCgpIGV4cGFuZGVkOiBib29sZWFuID0gdHJ1ZTtcblxuICAgIEBWaWV3Q2hpbGRyZW4oRmFjZXRDaGVja0xpc3RJdGVtQ29tcG9uZW50KSBvcHRpb25zOiBRdWVyeUxpc3Q8RmFjZXRDaGVja0xpc3RJdGVtQ29tcG9uZW50PjtcblxuICAgIGlzRm9jdXNlZDogYm9vbGVhbiA9IGZhbHNlO1xuICAgIGFjdGl2ZUluZGV4OiBudW1iZXIgPSAwO1xuXG4gICAgcHJpdmF0ZSBfZm9jdXNLZXlNYW5hZ2VyOiBGb2N1c0tleU1hbmFnZXI8RmFjZXRDaGVja0xpc3RJdGVtQ29tcG9uZW50PjtcblxuICAgIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fZm9jdXNLZXlNYW5hZ2VyID0gbmV3IEZvY3VzS2V5TWFuYWdlcih0aGlzLm9wdGlvbnMpXG4gICAgICAgICAgICAud2l0aFZlcnRpY2FsT3JpZW50YXRpb24oKTtcblxuICAgICAgICB0aGlzLl9mb2N1c0tleU1hbmFnZXIuY2hhbmdlLnBpcGUodGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSkpLnN1YnNjcmliZShpbmRleCA9PiB0aGlzLmFjdGl2ZUluZGV4ID0gaW5kZXgpO1xuICAgIH1cblxuICAgIG9uRm9jdXMoaW5kZXg6IG51bWJlcik6IHZvaWQge1xuICAgICAgICBpZiAodGhpcy5fZm9jdXNLZXlNYW5hZ2VyLmFjdGl2ZUl0ZW1JbmRleCA9PT0gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZvY3VzS2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKGluZGV4KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG9uS2V5ZG93bihldmVudDogS2V5Ym9hcmRFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9mb2N1c0tleU1hbmFnZXIub25LZXlkb3duKGV2ZW50KTtcbiAgICB9XG5cbiAgICB0b2dnbGVGYWNldChpbmRleDogbnVtYmVyLCBmYWNldDogRmFjZXQpOiB2b2lkIHtcbiAgICAgICAgdGhpcy50b2dnbGVGYWNldFNlbGVjdGlvbihmYWNldCk7XG4gICAgICAgIHRoaXMuX2ZvY3VzS2V5TWFuYWdlci5zZXRBY3RpdmVJdGVtKGluZGV4KTtcbiAgICB9XG59Il19