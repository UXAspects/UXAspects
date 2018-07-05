/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Host, Input, Output } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { FacetContainerComponent } from '../../facet-container.component';
import { FacetDeselect, FacetDeselectAll, FacetSelect } from '../../facet-events';
var FacetBaseComponent = (function () {
    function FacetBaseComponent(facetContainer, _elementRef) {
        var _this = this;
        this.facetContainer = facetContainer;
        this._elementRef = _elementRef;
        this.selected = [];
        this.selectedChange = new EventEmitter();
        this.events = new Subject();
        this._onDestroy = new Subject();
        if (facetContainer) {
            // subscribe to any deselect events from the facet container
            facetContainer.events.pipe(filter(function (event) { return event instanceof FacetDeselect; }), filter(function (event) { return !!_this.selected.find(function (facet) { return facet === event.facet; }); }), takeUntil(this._onDestroy)).subscribe(function (event) { return _this.deselectFacet(event.facet); });
            // subscribe to any deselect all events from facet container
            facetContainer.events.pipe(filter(function (event) { return event instanceof FacetDeselectAll; }), takeUntil(this._onDestroy)).subscribe(function (_) { return _this.deselectAll(); });
        }
    }
    /**
     * @return {?}
     */
    FacetBaseComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // check if there should be any facets initially selected
        if (this.facetContainer) {
            this.selected.forEach(function (facet) { return _this.facetContainer.selectFacet(facet); });
        }
    };
    /**
     * @return {?}
     */
    FacetBaseComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._onDestroy.next();
        this._onDestroy.complete();
    };
    /**
     * @param {?} facet
     * @return {?}
     */
    FacetBaseComponent.prototype.selectFacet = /**
     * @param {?} facet
     * @return {?}
     */
    function (facet) {
        // if the facet is disabled it should not be selected
        if (facet.disabled) {
            return;
        }
        // add the facet to the list of selected facets
        this.selected.push(facet);
        // send the new value to the event emitter
        this.selectedChange.emit(this.selected);
        // fire the event to the observable
        this.triggerEvent(new FacetSelect(facet));
        // tell the facet container about the selected facet
        if (this.facetContainer) {
            this.facetContainer.selectFacet(facet);
        }
    };
    /**
     * @param {?} facet
     * @return {?}
     */
    FacetBaseComponent.prototype.deselectFacet = /**
     * @param {?} facet
     * @return {?}
     */
    function (facet) {
        // find facet to remove
        var /** @type {?} */ index = this.selected.findIndex(function (selectedFacet) { return selectedFacet === facet; });
        // only continue if facet is found
        if (index !== -1) {
            // remove the facet from the selected list
            this.selected.splice(index, 1);
            // emit the changes to selected event emitter
            this.selectedChange.emit(this.selected);
            // fire the event to the observable
            this.triggerEvent(new FacetDeselect(facet));
            // deselect the facet in the facet container
            if (this.facetContainer) {
                this.facetContainer.deselectFacet(facet);
            }
        }
    };
    /**
     * @return {?}
     */
    FacetBaseComponent.prototype.deselectAll = /**
     * @return {?}
     */
    function () {
        // remove all selected facets
        this.selected = [];
        // fire the event to the observable
        this.triggerEvent(new FacetDeselectAll());
        // emit the changes to the selected event emitter
        this.selectedChange.emit(this.selected);
    };
    /**
     * @param {?} facet
     * @return {?}
     */
    FacetBaseComponent.prototype.toggleFacetSelection = /**
     * @param {?} facet
     * @return {?}
     */
    function (facet) {
        // if the facet is selected then deselect - otherwise select it
        if (this.isFacetSelected(facet)) {
            this.deselectFacet(facet);
        }
        else {
            this.selectFacet(facet);
        }
    };
    /**
     * @param {?} facet
     * @return {?}
     */
    FacetBaseComponent.prototype.isFacetSelected = /**
     * @param {?} facet
     * @return {?}
     */
    function (facet) {
        // determine if a facet is currently selected
        return !!this.selected.find(function (selectedFacet) { return selectedFacet === facet; });
    };
    /**
     * @param {?} event
     * @return {?}
     */
    FacetBaseComponent.prototype.triggerEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.events.next(event);
    };
    FacetBaseComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ux-facet-base',
                    template: '',
                },] },
    ];
    /** @nocollapse */
    FacetBaseComponent.ctorParameters = function () { return [
        { type: FacetContainerComponent, decorators: [{ type: Host },] },
        { type: ElementRef, },
    ]; };
    FacetBaseComponent.propDecorators = {
        "selected": [{ type: Input },],
        "selectedChange": [{ type: Output },],
        "events": [{ type: Output },],
    };
    return FacetBaseComponent;
}());
export { FacetBaseComponent };
function FacetBaseComponent_tsickle_Closure_declarations() {
    /** @type {!Array<{type: !Function, args: (undefined|!Array<?>)}>} */
    FacetBaseComponent.decorators;
    /**
     * @nocollapse
     * @type {function(): !Array<(null|{type: ?, decorators: (undefined|!Array<{type: !Function, args: (undefined|!Array<?>)}>)})>}
     */
    FacetBaseComponent.ctorParameters;
    /** @type {!Object<string,!Array<{type: !Function, args: (undefined|!Array<?>)}>>} */
    FacetBaseComponent.propDecorators;
    /** @type {?} */
    FacetBaseComponent.prototype.selected;
    /** @type {?} */
    FacetBaseComponent.prototype.selectedChange;
    /** @type {?} */
    FacetBaseComponent.prototype.events;
    /** @type {?} */
    FacetBaseComponent.prototype._onDestroy;
    /** @type {?} */
    FacetBaseComponent.prototype.facetContainer;
    /** @type {?} */
    FacetBaseComponent.prototype._elementRef;
}

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9mYWNldHMvYmFzZS9mYWNldC1iYXNlL2ZhY2V0LWJhc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVHLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFjLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDOztJQWUxRiw0QkFBNkIsZ0JBQWdELFdBQXVCO1FBQXBHLGlCQWtCQztRQWxCNEIsbUJBQWMsR0FBZCxjQUFjO1FBQWtDLGdCQUFXLEdBQVgsV0FBVyxDQUFZO3dCQU52RSxFQUFFOzhCQUNtQixJQUFJLFlBQVksRUFBVztzQkFDckMsSUFBSSxPQUFPLEVBQWM7MEJBRTFDLElBQUksT0FBTyxFQUFRO1FBSXRDLEVBQUUsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUM7O1lBR2pCLGNBQWMsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUN0QixNQUFNLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLFlBQVksYUFBYSxFQUE5QixDQUE4QixDQUFDLEVBQy9DLE1BQU0sQ0FBQyxVQUFDLEtBQW9CLElBQUssT0FBQSxDQUFDLENBQUMsS0FBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQSxLQUFLLElBQUksT0FBQSxLQUFLLEtBQUss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QUFRLENBQUMsQ0FBQztLQUMzQzs7Ozs7SUFFRCxpREFBb0I7Ozs7SUFBcEIsVUFBcUIsS0FBWTs7UUFHN0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUM3QjtRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ0osSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMzQjtLQUVKOzs7OztJQUVELDRDQUFlOzs7O0lBQWYsVUFBZ0IsS0FBWTs7UUFFeEIsTUFBTSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFBLGFBQWEsSUFBSSxPQUFBLGFBQWEsS0FBSyxLQUFLLEVBQXZCLENBQXVCLENBQUMsQ0FBQztLQUN6RTs7Ozs7SUFFTyx5Q0FBWTs7OztjQUFDLEtBQWlCO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7Z0JBdkgvQixTQUFTLFNBQUM7b0JBQ1AsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLFFBQVEsRUFBRSxFQUFFO2lCQUNmOzs7O2dCQVBRLHVCQUF1Qix1QkFnQmQsSUFBSTtnQkFuQkYsVUFBVTs7OzZCQWF6QixLQUFLO21DQUNMLE1BQU07MkJBQ04sTUFBTTs7NkJBZlg7O1NBV2Esa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tcG9uZW50LCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsIEhvc3QsIElucHV0LCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBmaWx0ZXIsIHRha2VVbnRpbCB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCB7IFN1YmplY3QgfSBmcm9tICdyeGpzL1N1YmplY3QnO1xuaW1wb3J0IHsgRmFjZXRDb250YWluZXJDb21wb25lbnQgfSBmcm9tICcuLi8uLi9mYWNldC1jb250YWluZXIuY29tcG9uZW50JztcbmltcG9ydCB7IEZhY2V0RGVzZWxlY3QsIEZhY2V0RGVzZWxlY3RBbGwsIEZhY2V0RXZlbnQsIEZhY2V0U2VsZWN0IH0gZnJvbSAnLi4vLi4vZmFjZXQtZXZlbnRzJztcbmltcG9ydCB7IEZhY2V0IH0gZnJvbSAnLi4vLi4vbW9kZWxzL2ZhY2V0JztcblxuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICd1eC1mYWNldC1iYXNlJyxcbiAgICB0ZW1wbGF0ZTogJycsXG59KVxuZXhwb3J0IGNsYXNzIEZhY2V0QmFzZUNvbXBvbmVudCBpbXBsZW1lbnRzIE9uSW5pdCwgT25EZXN0cm95IHtcblxuICAgIEBJbnB1dCgpIHNlbGVjdGVkOiBGYWNldFtdID0gW107XG4gICAgQE91dHB1dCgpIHNlbGVjdGVkQ2hhbmdlOiBFdmVudEVtaXR0ZXI8RmFjZXRbXT4gPSBuZXcgRXZlbnRFbWl0dGVyPEZhY2V0W10+KCk7XG4gICAgQE91dHB1dCgpIGV2ZW50czogU3ViamVjdDxGYWNldEV2ZW50PiA9IG5ldyBTdWJqZWN0PEZhY2V0RXZlbnQ+KCk7XG5cbiAgICBwcm90ZWN0ZWQgX29uRGVzdHJveSA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgICBjb25zdHJ1Y3RvciggQEhvc3QoKSBwcml2YXRlIGZhY2V0Q29udGFpbmVyOiBGYWNldENvbnRhaW5lckNvbXBvbmVudCwgcHVibGljIF9lbGVtZW50UmVmOiBFbGVtZW50UmVmKSB7XG5cbiAgICAgICAgaWYgKGZhY2V0Q29udGFpbmVyKSB7XG5cbiAgICAgICAgICAgIC8vIHN1YnNjcmliZSB0byBhbnkgZGVzZWxlY3QgZXZlbnRzIGZyb20gdGhlIGZhY2V0IGNvbnRhaW5lclxuICAgICAgICAgICAgZmFjZXRDb250YWluZXIuZXZlbnRzLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgRmFjZXREZXNlbGVjdCksXG4gICAgICAgICAgICAgICAgZmlsdGVyKChldmVudDogRmFjZXREZXNlbGVjdCkgPT4gISF0aGlzLnNlbGVjdGVkLmZpbmQoZmFjZXQgPT4gZmFjZXQgPT09IGV2ZW50LmZhY2V0KSksXG4gICAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSlcbiAgICAgICAgICAgICkuc3Vic2NyaWJlKChldmVudDogRmFjZXREZXNlbGVjdCkgPT4gdGhpcy5kZXNlbGVjdEZhY2V0KGV2ZW50LmZhY2V0KSk7XG5cbiAgICAgICAgICAgIC8vIHN1YnNjcmliZSB0byBhbnkgZGVzZWxlY3QgYWxsIGV2ZW50cyBmcm9tIGZhY2V0IGNvbnRhaW5lclxuICAgICAgICAgICAgZmFjZXRDb250YWluZXIuZXZlbnRzLnBpcGUoXG4gICAgICAgICAgICAgICAgZmlsdGVyKGV2ZW50ID0+IGV2ZW50IGluc3RhbmNlb2YgRmFjZXREZXNlbGVjdEFsbCksXG4gICAgICAgICAgICAgICAgdGFrZVVudGlsKHRoaXMuX29uRGVzdHJveSlcbiAgICAgICAgICAgICkuc3Vic2NyaWJlKF8gPT4gdGhpcy5kZXNlbGVjdEFsbCgpKTtcblxuICAgICAgICB9XG4gICAgfVxuXG4gICAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgICAgIC8vIGNoZWNrIGlmIHRoZXJlIHNob3VsZCBiZSBhbnkgZmFjZXRzIGluaXRpYWxseSBzZWxlY3RlZFxuICAgICAgICBpZiAodGhpcy5mYWNldENvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5mb3JFYWNoKGZhY2V0ID0+IHRoaXMuZmFjZXRDb250YWluZXIuc2VsZWN0RmFjZXQoZmFjZXQpKTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kubmV4dCgpO1xuICAgICAgICB0aGlzLl9vbkRlc3Ryb3kuY29tcGxldGUoKTtcbiAgICB9XG5cbiAgICBzZWxlY3RGYWNldChmYWNldDogRmFjZXQpOiB2b2lkIHtcblxuICAgICAgICAvLyBpZiB0aGUgZmFjZXQgaXMgZGlzYWJsZWQgaXQgc2hvdWxkIG5vdCBiZSBzZWxlY3RlZFxuICAgICAgICBpZiAoZmFjZXQuZGlzYWJsZWQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGFkZCB0aGUgZmFjZXQgdG8gdGhlIGxpc3Qgb2Ygc2VsZWN0ZWQgZmFjZXRzXG4gICAgICAgIHRoaXMuc2VsZWN0ZWQucHVzaChmYWNldCk7XG5cbiAgICAgICAgLy8gc2VuZCB0aGUgbmV3IHZhbHVlIHRvIHRoZSBldmVudCBlbWl0dGVyXG4gICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkKTtcblxuICAgICAgICAvLyBmaXJlIHRoZSBldmVudCB0byB0aGUgb2JzZXJ2YWJsZVxuICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChuZXcgRmFjZXRTZWxlY3QoZmFjZXQpKTtcblxuICAgICAgICAvLyB0ZWxsIHRoZSBmYWNldCBjb250YWluZXIgYWJvdXQgdGhlIHNlbGVjdGVkIGZhY2V0XG4gICAgICAgIGlmICh0aGlzLmZhY2V0Q29udGFpbmVyKSB7XG4gICAgICAgICAgICB0aGlzLmZhY2V0Q29udGFpbmVyLnNlbGVjdEZhY2V0KGZhY2V0KTtcbiAgICAgICAgfVxuICAgIH1cblxuICAgIGRlc2VsZWN0RmFjZXQoZmFjZXQ6IEZhY2V0KTogdm9pZCB7XG5cbiAgICAgICAgLy8gZmluZCBmYWNldCB0byByZW1vdmVcbiAgICAgICAgbGV0IGluZGV4ID0gdGhpcy5zZWxlY3RlZC5maW5kSW5kZXgoc2VsZWN0ZWRGYWNldCA9PiBzZWxlY3RlZEZhY2V0ID09PSBmYWNldCk7XG5cbiAgICAgICAgLy8gb25seSBjb250aW51ZSBpZiBmYWNldCBpcyBmb3VuZFxuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgZmFjZXQgZnJvbSB0aGUgc2VsZWN0ZWQgbGlzdFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgICAgICAvLyBlbWl0IHRoZSBjaGFuZ2VzIHRvIHNlbGVjdGVkIGV2ZW50IGVtaXR0ZXJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkKTtcblxuICAgICAgICAgICAgLy8gZmlyZSB0aGUgZXZlbnQgdG8gdGhlIG9ic2VydmFibGVcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KG5ldyBGYWNldERlc2VsZWN0KGZhY2V0KSk7XG5cbiAgICAgICAgICAgIC8vIGRlc2VsZWN0IHRoZSBmYWNldCBpbiB0aGUgZmFjZXQgY29udGFpbmVyXG4gICAgICAgICAgICBpZiAodGhpcy5mYWNldENvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjZXRDb250YWluZXIuZGVzZWxlY3RGYWNldChmYWNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlbGVjdEFsbCgpOiB2b2lkIHtcblxuICAgICAgICAvLyByZW1vdmUgYWxsIHNlbGVjdGVkIGZhY2V0c1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gW107XG5cbiAgICAgICAgLy8gZmlyZSB0aGUgZXZlbnQgdG8gdGhlIG9ic2VydmFibGVcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQobmV3IEZhY2V0RGVzZWxlY3RBbGwoKSk7XG5cbiAgICAgICAgLy8gZW1pdCB0aGUgY2hhbmdlcyB0byB0aGUgc2VsZWN0ZWQgZXZlbnQgZW1pdHRlclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRmFjZXRTZWxlY3Rpb24oZmFjZXQ6IEZhY2V0KTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgdGhlIGZhY2V0IGlzIHNlbGVjdGVkIHRoZW4gZGVzZWxlY3QgLSBvdGhlcndpc2Ugc2VsZWN0IGl0XG4gICAgICAgIGlmICh0aGlzLmlzRmFjZXRTZWxlY3RlZChmYWNldCkpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RGYWNldChmYWNldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEZhY2V0KGZhY2V0KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgaXNGYWNldFNlbGVjdGVkKGZhY2V0OiBGYWNldCk6IGJvb2xlYW4ge1xuICAgICAgICAvLyBkZXRlcm1pbmUgaWYgYSBmYWNldCBpcyBjdXJyZW50bHkgc2VsZWN0ZWRcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zZWxlY3RlZC5maW5kKHNlbGVjdGVkRmFjZXQgPT4gc2VsZWN0ZWRGYWNldCA9PT0gZmFjZXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdHJpZ2dlckV2ZW50KGV2ZW50OiBGYWNldEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQoZXZlbnQpO1xuICAgIH1cbn0iXX0=