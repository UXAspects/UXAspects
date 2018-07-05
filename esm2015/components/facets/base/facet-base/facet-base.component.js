/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
import { Component, ElementRef, EventEmitter, Host, Input, Output } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { FacetContainerComponent } from '../../facet-container.component';
import { FacetDeselect, FacetDeselectAll, FacetSelect } from '../../facet-events';
export class FacetBaseComponent {
    /**
     * @param {?} facetContainer
     * @param {?} _elementRef
     */
    constructor(facetContainer, _elementRef) {
        this.facetContainer = facetContainer;
        this._elementRef = _elementRef;
        this.selected = [];
        this.selectedChange = new EventEmitter();
        this.events = new Subject();
        this._onDestroy = new Subject();
        if (facetContainer) {
            // subscribe to any deselect events from the facet container
            facetContainer.events.pipe(filter(event => event instanceof FacetDeselect), filter((event) => !!this.selected.find(facet => facet === event.facet)), takeUntil(this._onDestroy)).subscribe((event) => this.deselectFacet(event.facet));
            // subscribe to any deselect all events from facet container
            facetContainer.events.pipe(filter(event => event instanceof FacetDeselectAll), takeUntil(this._onDestroy)).subscribe(_ => this.deselectAll());
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        // check if there should be any facets initially selected
        if (this.facetContainer) {
            this.selected.forEach(facet => this.facetContainer.selectFacet(facet));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._onDestroy.next();
        this._onDestroy.complete();
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    selectFacet(facet) {
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
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    deselectFacet(facet) {
        // find facet to remove
        let /** @type {?} */ index = this.selected.findIndex(selectedFacet => selectedFacet === facet);
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
    }
    /**
     * @return {?}
     */
    deselectAll() {
        // remove all selected facets
        this.selected = [];
        // fire the event to the observable
        this.triggerEvent(new FacetDeselectAll());
        // emit the changes to the selected event emitter
        this.selectedChange.emit(this.selected);
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    toggleFacetSelection(facet) {
        // if the facet is selected then deselect - otherwise select it
        if (this.isFacetSelected(facet)) {
            this.deselectFacet(facet);
        }
        else {
            this.selectFacet(facet);
        }
    }
    /**
     * @param {?} facet
     * @return {?}
     */
    isFacetSelected(facet) {
        // determine if a facet is currently selected
        return !!this.selected.find(selectedFacet => selectedFacet === facet);
    }
    /**
     * @param {?} event
     * @return {?}
     */
    triggerEvent(event) {
        this.events.next(event);
    }
}
FacetBaseComponent.decorators = [
    { type: Component, args: [{
                selector: 'ux-facet-base',
                template: '',
            },] },
];
/** @nocollapse */
FacetBaseComponent.ctorParameters = () => [
    { type: FacetContainerComponent, decorators: [{ type: Host },] },
    { type: ElementRef, },
];
FacetBaseComponent.propDecorators = {
    "selected": [{ type: Input },],
    "selectedChange": [{ type: Output },],
    "events": [{ type: Output },],
};
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9mYWNldHMvYmFzZS9mYWNldC1iYXNlL2ZhY2V0LWJhc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVHLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFjLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBTzlGLE1BQU07Ozs7O0lBUUYsWUFBNkIsZ0JBQWdELFdBQXVCO1FBQXZFLG1CQUFjLEdBQWQsY0FBYztRQUFrQyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTt3QkFOdkUsRUFBRTs4QkFDbUIsSUFBSSxZQUFZLEVBQVc7c0JBQ3JDLElBQUksT0FBTyxFQUFjOzBCQUUxQyxJQUFJLE9BQU8sRUFBUTtRQUl0QyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOztZQUdqQixjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDdEIsTUFBTSxDQUFDLEtBQUssSUFBSSxLQUFLLFlBQVksYUFBYSxDQUFDLEVBQy9DLE1BQU0sQ0FBQyxDQUFDLEtBQW9CLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssSUFBSSxLQUFLLEtBQUssS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQ3RGLFNBQVMsQ0FB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QUMzQjtLQUVKOzs7OztJQUVELGVBQWUsQ0FBQyxLQUFZOztRQUV4QixNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsSUFBSSxhQUFhLEtBQUssS0FBSyxDQUFDLENBQUM7S0FDekU7Ozs7O0lBRU8sWUFBWSxDQUFDLEtBQWlCO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O1lBdkgvQixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7Ozs7WUFQUSx1QkFBdUIsdUJBZ0JkLElBQUk7WUFuQkYsVUFBVTs7O3lCQWF6QixLQUFLOytCQUNMLE1BQU07dUJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IEZhY2V0Q29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vZmFjZXQtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYWNldERlc2VsZWN0LCBGYWNldERlc2VsZWN0QWxsLCBGYWNldEV2ZW50LCBGYWNldFNlbGVjdCB9IGZyb20gJy4uLy4uL2ZhY2V0LWV2ZW50cyc7XG5pbXBvcnQgeyBGYWNldCB9IGZyb20gJy4uLy4uL21vZGVscy9mYWNldCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmFjZXQtYmFzZScsXG4gICAgdGVtcGxhdGU6ICcnLFxufSlcbmV4cG9ydCBjbGFzcyBGYWNldEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBzZWxlY3RlZDogRmFjZXRbXSA9IFtdO1xuICAgIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPEZhY2V0W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxGYWNldFtdPigpO1xuICAgIEBPdXRwdXQoKSBldmVudHM6IFN1YmplY3Q8RmFjZXRFdmVudD4gPSBuZXcgU3ViamVjdDxGYWNldEV2ZW50PigpO1xuXG4gICAgcHJvdGVjdGVkIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoIEBIb3N0KCkgcHJpdmF0ZSBmYWNldENvbnRhaW5lcjogRmFjZXRDb250YWluZXJDb21wb25lbnQsIHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuXG4gICAgICAgIGlmIChmYWNldENvbnRhaW5lcikge1xuXG4gICAgICAgICAgICAvLyBzdWJzY3JpYmUgdG8gYW55IGRlc2VsZWN0IGV2ZW50cyBmcm9tIHRoZSBmYWNldCBjb250YWluZXJcbiAgICAgICAgICAgIGZhY2V0Q29udGFpbmVyLmV2ZW50cy5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIEZhY2V0RGVzZWxlY3QpLFxuICAgICAgICAgICAgICAgIGZpbHRlcigoZXZlbnQ6IEZhY2V0RGVzZWxlY3QpID0+ICEhdGhpcy5zZWxlY3RlZC5maW5kKGZhY2V0ID0+IGZhY2V0ID09PSBldmVudC5mYWNldCkpLFxuICAgICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpXG4gICAgICAgICAgICApLnN1YnNjcmliZSgoZXZlbnQ6IEZhY2V0RGVzZWxlY3QpID0+IHRoaXMuZGVzZWxlY3RGYWNldChldmVudC5mYWNldCkpO1xuXG4gICAgICAgICAgICAvLyBzdWJzY3JpYmUgdG8gYW55IGRlc2VsZWN0IGFsbCBldmVudHMgZnJvbSBmYWNldCBjb250YWluZXJcbiAgICAgICAgICAgIGZhY2V0Q29udGFpbmVyLmV2ZW50cy5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIEZhY2V0RGVzZWxlY3RBbGwpLFxuICAgICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpXG4gICAgICAgICAgICApLnN1YnNjcmliZShfID0+IHRoaXMuZGVzZWxlY3RBbGwoKSk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBzaG91bGQgYmUgYW55IGZhY2V0cyBpbml0aWFsbHkgc2VsZWN0ZWRcbiAgICAgICAgaWYgKHRoaXMuZmFjZXRDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQuZm9yRWFjaChmYWNldCA9PiB0aGlzLmZhY2V0Q29udGFpbmVyLnNlbGVjdEZhY2V0KGZhY2V0KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0RmFjZXQoZmFjZXQ6IEZhY2V0KTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgdGhlIGZhY2V0IGlzIGRpc2FibGVkIGl0IHNob3VsZCBub3QgYmUgc2VsZWN0ZWRcbiAgICAgICAgaWYgKGZhY2V0LmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgdGhlIGZhY2V0IHRvIHRoZSBsaXN0IG9mIHNlbGVjdGVkIGZhY2V0c1xuICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goZmFjZXQpO1xuXG4gICAgICAgIC8vIHNlbmQgdGhlIG5ldyB2YWx1ZSB0byB0aGUgZXZlbnQgZW1pdHRlclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZCk7XG5cbiAgICAgICAgLy8gZmlyZSB0aGUgZXZlbnQgdG8gdGhlIG9ic2VydmFibGVcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQobmV3IEZhY2V0U2VsZWN0KGZhY2V0KSk7XG5cbiAgICAgICAgLy8gdGVsbCB0aGUgZmFjZXQgY29udGFpbmVyIGFib3V0IHRoZSBzZWxlY3RlZCBmYWNldFxuICAgICAgICBpZiAodGhpcy5mYWNldENvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5mYWNldENvbnRhaW5lci5zZWxlY3RGYWNldChmYWNldCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlbGVjdEZhY2V0KGZhY2V0OiBGYWNldCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGZpbmQgZmFjZXQgdG8gcmVtb3ZlXG4gICAgICAgIGxldCBpbmRleCA9IHRoaXMuc2VsZWN0ZWQuZmluZEluZGV4KHNlbGVjdGVkRmFjZXQgPT4gc2VsZWN0ZWRGYWNldCA9PT0gZmFjZXQpO1xuXG4gICAgICAgIC8vIG9ubHkgY29udGludWUgaWYgZmFjZXQgaXMgZm91bmRcbiAgICAgICAgaWYgKGluZGV4ICE9PSAtMSkge1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgdGhlIGZhY2V0IGZyb20gdGhlIHNlbGVjdGVkIGxpc3RcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQuc3BsaWNlKGluZGV4LCAxKTtcblxuICAgICAgICAgICAgLy8gZW1pdCB0aGUgY2hhbmdlcyB0byBzZWxlY3RlZCBldmVudCBlbWl0dGVyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZCk7XG5cbiAgICAgICAgICAgIC8vIGZpcmUgdGhlIGV2ZW50IHRvIHRoZSBvYnNlcnZhYmxlXG4gICAgICAgICAgICB0aGlzLnRyaWdnZXJFdmVudChuZXcgRmFjZXREZXNlbGVjdChmYWNldCkpO1xuXG4gICAgICAgICAgICAvLyBkZXNlbGVjdCB0aGUgZmFjZXQgaW4gdGhlIGZhY2V0IGNvbnRhaW5lclxuICAgICAgICAgICAgaWYgKHRoaXMuZmFjZXRDb250YWluZXIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmZhY2V0Q29udGFpbmVyLmRlc2VsZWN0RmFjZXQoZmFjZXQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZGVzZWxlY3RBbGwoKTogdm9pZCB7XG5cbiAgICAgICAgLy8gcmVtb3ZlIGFsbCBzZWxlY3RlZCBmYWNldHNcbiAgICAgICAgdGhpcy5zZWxlY3RlZCA9IFtdO1xuXG4gICAgICAgIC8vIGZpcmUgdGhlIGV2ZW50IHRvIHRoZSBvYnNlcnZhYmxlXG4gICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KG5ldyBGYWNldERlc2VsZWN0QWxsKCkpO1xuXG4gICAgICAgIC8vIGVtaXQgdGhlIGNoYW5nZXMgdG8gdGhlIHNlbGVjdGVkIGV2ZW50IGVtaXR0ZXJcbiAgICAgICAgdGhpcy5zZWxlY3RlZENoYW5nZS5lbWl0KHRoaXMuc2VsZWN0ZWQpO1xuICAgIH1cblxuICAgIHRvZ2dsZUZhY2V0U2VsZWN0aW9uKGZhY2V0OiBGYWNldCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGlmIHRoZSBmYWNldCBpcyBzZWxlY3RlZCB0aGVuIGRlc2VsZWN0IC0gb3RoZXJ3aXNlIHNlbGVjdCBpdFxuICAgICAgICBpZiAodGhpcy5pc0ZhY2V0U2VsZWN0ZWQoZmFjZXQpKSB7XG4gICAgICAgICAgICB0aGlzLmRlc2VsZWN0RmFjZXQoZmFjZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zZWxlY3RGYWNldChmYWNldCk7XG4gICAgICAgIH1cblxuICAgIH1cblxuICAgIGlzRmFjZXRTZWxlY3RlZChmYWNldDogRmFjZXQpOiBib29sZWFuIHtcbiAgICAgICAgLy8gZGV0ZXJtaW5lIGlmIGEgZmFjZXQgaXMgY3VycmVudGx5IHNlbGVjdGVkXG4gICAgICAgIHJldHVybiAhIXRoaXMuc2VsZWN0ZWQuZmluZChzZWxlY3RlZEZhY2V0ID0+IHNlbGVjdGVkRmFjZXQgPT09IGZhY2V0KTtcbiAgICB9XG5cbiAgICBwcml2YXRlIHRyaWdnZXJFdmVudChldmVudDogRmFjZXRFdmVudCk6IHZvaWQge1xuICAgICAgICB0aGlzLmV2ZW50cy5uZXh0KGV2ZW50KTtcbiAgICB9XG59Il19