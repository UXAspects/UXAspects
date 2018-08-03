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
        const /** @type {?} */ index = this.selected.findIndex(selectedFacet => selectedFacet === facet);
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
                template: ''
            }] }
];
/** @nocollapse */
FacetBaseComponent.ctorParameters = () => [
    { type: FacetContainerComponent, decorators: [{ type: Host }] },
    { type: ElementRef }
];
FacetBaseComponent.propDecorators = {
    selected: [{ type: Input }],
    selectedChange: [{ type: Output }],
    events: [{ type: Output }]
};
function FacetBaseComponent_tsickle_Closure_declarations() {
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFjZXQtYmFzZS5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AdXgtYXNwZWN0cy91eC1hc3BlY3RzLyIsInNvdXJjZXMiOlsiY29tcG9uZW50cy9mYWNldHMvYmFzZS9mYWNldC1iYXNlL2ZhY2V0LWJhc2UuY29tcG9uZW50LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBcUIsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzVHLE9BQU8sRUFBRSxNQUFNLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDbkQsT0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLGNBQWMsQ0FBQztBQUN2QyxPQUFPLEVBQUUsdUJBQXVCLEVBQUUsTUFBTSxpQ0FBaUMsQ0FBQztBQUMxRSxPQUFPLEVBQUUsYUFBYSxFQUFFLGdCQUFnQixFQUFjLFdBQVcsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBTzlGLE1BQU07Ozs7O0lBUUYsWUFBNkIsY0FBdUMsRUFBUyxXQUF1QjtRQUF2RSxtQkFBYyxHQUFkLGNBQWMsQ0FBeUI7UUFBUyxnQkFBVyxHQUFYLFdBQVcsQ0FBWTt3QkFOdkUsRUFBRTs4QkFDbUIsSUFBSSxZQUFZLEVBQVc7c0JBQ3JDLElBQUksT0FBTyxFQUFjOzBCQUUxQyxJQUFJLE9BQU8sRUFBUTtRQUl0QyxFQUFFLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDOztZQUdqQixjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksQ0FDdEIsTUFBTSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsS0FBSyxZQUFZLGFBQWEsQ0FBQyxFQUMvQyxNQUFNLENBQUMsQ0FBQyxLQUFvQixFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLEtBQUss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YSxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzdCO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQzNCO0tBRUo7Ozs7O0lBRUQsZUFBZSxDQUFDLEtBQVk7O1FBRXhCLE1BQU0sQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLEVBQUUsQ0FBQyxhQUFhLEtBQUssS0FBSyxDQUFDLENBQUM7S0FDekU7Ozs7O0lBRU8sWUFBWSxDQUFDLEtBQWlCO1FBQ2xDLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDOzs7O1lBdkgvQixTQUFTLFNBQUM7Z0JBQ1AsUUFBUSxFQUFFLGVBQWU7Z0JBQ3pCLFFBQVEsRUFBRSxFQUFFO2FBQ2Y7Ozs7WUFQUSx1QkFBdUIsdUJBZ0JkLElBQUk7WUFuQkYsVUFBVTs7O3VCQWF6QixLQUFLOzZCQUNMLE1BQU07cUJBQ04sTUFBTSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBIb3N0LCBJbnB1dCwgT25EZXN0cm95LCBPbkluaXQsIE91dHB1dCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgZmlsdGVyLCB0YWtlVW50aWwgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgeyBTdWJqZWN0IH0gZnJvbSAncnhqcy9TdWJqZWN0JztcbmltcG9ydCB7IEZhY2V0Q29udGFpbmVyQ29tcG9uZW50IH0gZnJvbSAnLi4vLi4vZmFjZXQtY29udGFpbmVyLmNvbXBvbmVudCc7XG5pbXBvcnQgeyBGYWNldERlc2VsZWN0LCBGYWNldERlc2VsZWN0QWxsLCBGYWNldEV2ZW50LCBGYWNldFNlbGVjdCB9IGZyb20gJy4uLy4uL2ZhY2V0LWV2ZW50cyc7XG5pbXBvcnQgeyBGYWNldCB9IGZyb20gJy4uLy4uL21vZGVscy9mYWNldCc7XG5cbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAndXgtZmFjZXQtYmFzZScsXG4gICAgdGVtcGxhdGU6ICcnLFxufSlcbmV4cG9ydCBjbGFzcyBGYWNldEJhc2VDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG5cbiAgICBASW5wdXQoKSBzZWxlY3RlZDogRmFjZXRbXSA9IFtdO1xuICAgIEBPdXRwdXQoKSBzZWxlY3RlZENoYW5nZTogRXZlbnRFbWl0dGVyPEZhY2V0W10+ID0gbmV3IEV2ZW50RW1pdHRlcjxGYWNldFtdPigpO1xuICAgIEBPdXRwdXQoKSBldmVudHM6IFN1YmplY3Q8RmFjZXRFdmVudD4gPSBuZXcgU3ViamVjdDxGYWNldEV2ZW50PigpO1xuXG4gICAgcHJvdGVjdGVkIF9vbkRlc3Ryb3kgPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gICAgY29uc3RydWN0b3IoIEBIb3N0KCkgcHJpdmF0ZSBmYWNldENvbnRhaW5lcjogRmFjZXRDb250YWluZXJDb21wb25lbnQsIHB1YmxpYyBfZWxlbWVudFJlZjogRWxlbWVudFJlZikge1xuXG4gICAgICAgIGlmIChmYWNldENvbnRhaW5lcikge1xuXG4gICAgICAgICAgICAvLyBzdWJzY3JpYmUgdG8gYW55IGRlc2VsZWN0IGV2ZW50cyBmcm9tIHRoZSBmYWNldCBjb250YWluZXJcbiAgICAgICAgICAgIGZhY2V0Q29udGFpbmVyLmV2ZW50cy5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIEZhY2V0RGVzZWxlY3QpLFxuICAgICAgICAgICAgICAgIGZpbHRlcigoZXZlbnQ6IEZhY2V0RGVzZWxlY3QpID0+ICEhdGhpcy5zZWxlY3RlZC5maW5kKGZhY2V0ID0+IGZhY2V0ID09PSBldmVudC5mYWNldCkpLFxuICAgICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpXG4gICAgICAgICAgICApLnN1YnNjcmliZSgoZXZlbnQ6IEZhY2V0RGVzZWxlY3QpID0+IHRoaXMuZGVzZWxlY3RGYWNldChldmVudC5mYWNldCkpO1xuXG4gICAgICAgICAgICAvLyBzdWJzY3JpYmUgdG8gYW55IGRlc2VsZWN0IGFsbCBldmVudHMgZnJvbSBmYWNldCBjb250YWluZXJcbiAgICAgICAgICAgIGZhY2V0Q29udGFpbmVyLmV2ZW50cy5waXBlKFxuICAgICAgICAgICAgICAgIGZpbHRlcihldmVudCA9PiBldmVudCBpbnN0YW5jZW9mIEZhY2V0RGVzZWxlY3RBbGwpLFxuICAgICAgICAgICAgICAgIHRha2VVbnRpbCh0aGlzLl9vbkRlc3Ryb3kpXG4gICAgICAgICAgICApLnN1YnNjcmliZShfID0+IHRoaXMuZGVzZWxlY3RBbGwoKSk7XG5cbiAgICAgICAgfVxuICAgIH1cblxuICAgIG5nT25Jbml0KCk6IHZvaWQge1xuICAgICAgICAvLyBjaGVjayBpZiB0aGVyZSBzaG91bGQgYmUgYW55IGZhY2V0cyBpbml0aWFsbHkgc2VsZWN0ZWRcbiAgICAgICAgaWYgKHRoaXMuZmFjZXRDb250YWluZXIpIHtcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWQuZm9yRWFjaChmYWNldCA9PiB0aGlzLmZhY2V0Q29udGFpbmVyLnNlbGVjdEZhY2V0KGZhY2V0KSk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95Lm5leHQoKTtcbiAgICAgICAgdGhpcy5fb25EZXN0cm95LmNvbXBsZXRlKCk7XG4gICAgfVxuXG4gICAgc2VsZWN0RmFjZXQoZmFjZXQ6IEZhY2V0KTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgdGhlIGZhY2V0IGlzIGRpc2FibGVkIGl0IHNob3VsZCBub3QgYmUgc2VsZWN0ZWRcbiAgICAgICAgaWYgKGZhY2V0LmRpc2FibGVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBhZGQgdGhlIGZhY2V0IHRvIHRoZSBsaXN0IG9mIHNlbGVjdGVkIGZhY2V0c1xuICAgICAgICB0aGlzLnNlbGVjdGVkLnB1c2goZmFjZXQpO1xuXG4gICAgICAgIC8vIHNlbmQgdGhlIG5ldyB2YWx1ZSB0byB0aGUgZXZlbnQgZW1pdHRlclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZCk7XG5cbiAgICAgICAgLy8gZmlyZSB0aGUgZXZlbnQgdG8gdGhlIG9ic2VydmFibGVcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQobmV3IEZhY2V0U2VsZWN0KGZhY2V0KSk7XG5cbiAgICAgICAgLy8gdGVsbCB0aGUgZmFjZXQgY29udGFpbmVyIGFib3V0IHRoZSBzZWxlY3RlZCBmYWNldFxuICAgICAgICBpZiAodGhpcy5mYWNldENvbnRhaW5lcikge1xuICAgICAgICAgICAgdGhpcy5mYWNldENvbnRhaW5lci5zZWxlY3RGYWNldChmYWNldCk7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlbGVjdEZhY2V0KGZhY2V0OiBGYWNldCk6IHZvaWQge1xuXG4gICAgICAgIC8vIGZpbmQgZmFjZXQgdG8gcmVtb3ZlXG4gICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5zZWxlY3RlZC5maW5kSW5kZXgoc2VsZWN0ZWRGYWNldCA9PiBzZWxlY3RlZEZhY2V0ID09PSBmYWNldCk7XG5cbiAgICAgICAgLy8gb25seSBjb250aW51ZSBpZiBmYWNldCBpcyBmb3VuZFxuICAgICAgICBpZiAoaW5kZXggIT09IC0xKSB7XG5cbiAgICAgICAgICAgIC8vIHJlbW92ZSB0aGUgZmFjZXQgZnJvbSB0aGUgc2VsZWN0ZWQgbGlzdFxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZC5zcGxpY2UoaW5kZXgsIDEpO1xuXG4gICAgICAgICAgICAvLyBlbWl0IHRoZSBjaGFuZ2VzIHRvIHNlbGVjdGVkIGV2ZW50IGVtaXR0ZXJcbiAgICAgICAgICAgIHRoaXMuc2VsZWN0ZWRDaGFuZ2UuZW1pdCh0aGlzLnNlbGVjdGVkKTtcblxuICAgICAgICAgICAgLy8gZmlyZSB0aGUgZXZlbnQgdG8gdGhlIG9ic2VydmFibGVcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlckV2ZW50KG5ldyBGYWNldERlc2VsZWN0KGZhY2V0KSk7XG5cbiAgICAgICAgICAgIC8vIGRlc2VsZWN0IHRoZSBmYWNldCBpbiB0aGUgZmFjZXQgY29udGFpbmVyXG4gICAgICAgICAgICBpZiAodGhpcy5mYWNldENvbnRhaW5lcikge1xuICAgICAgICAgICAgICAgIHRoaXMuZmFjZXRDb250YWluZXIuZGVzZWxlY3RGYWNldChmYWNldCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBkZXNlbGVjdEFsbCgpOiB2b2lkIHtcblxuICAgICAgICAvLyByZW1vdmUgYWxsIHNlbGVjdGVkIGZhY2V0c1xuICAgICAgICB0aGlzLnNlbGVjdGVkID0gW107XG5cbiAgICAgICAgLy8gZmlyZSB0aGUgZXZlbnQgdG8gdGhlIG9ic2VydmFibGVcbiAgICAgICAgdGhpcy50cmlnZ2VyRXZlbnQobmV3IEZhY2V0RGVzZWxlY3RBbGwoKSk7XG5cbiAgICAgICAgLy8gZW1pdCB0aGUgY2hhbmdlcyB0byB0aGUgc2VsZWN0ZWQgZXZlbnQgZW1pdHRlclxuICAgICAgICB0aGlzLnNlbGVjdGVkQ2hhbmdlLmVtaXQodGhpcy5zZWxlY3RlZCk7XG4gICAgfVxuXG4gICAgdG9nZ2xlRmFjZXRTZWxlY3Rpb24oZmFjZXQ6IEZhY2V0KTogdm9pZCB7XG5cbiAgICAgICAgLy8gaWYgdGhlIGZhY2V0IGlzIHNlbGVjdGVkIHRoZW4gZGVzZWxlY3QgLSBvdGhlcndpc2Ugc2VsZWN0IGl0XG4gICAgICAgIGlmICh0aGlzLmlzRmFjZXRTZWxlY3RlZChmYWNldCkpIHtcbiAgICAgICAgICAgIHRoaXMuZGVzZWxlY3RGYWNldChmYWNldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnNlbGVjdEZhY2V0KGZhY2V0KTtcbiAgICAgICAgfVxuXG4gICAgfVxuXG4gICAgaXNGYWNldFNlbGVjdGVkKGZhY2V0OiBGYWNldCk6IGJvb2xlYW4ge1xuICAgICAgICAvLyBkZXRlcm1pbmUgaWYgYSBmYWNldCBpcyBjdXJyZW50bHkgc2VsZWN0ZWRcbiAgICAgICAgcmV0dXJuICEhdGhpcy5zZWxlY3RlZC5maW5kKHNlbGVjdGVkRmFjZXQgPT4gc2VsZWN0ZWRGYWNldCA9PT0gZmFjZXQpO1xuICAgIH1cblxuICAgIHByaXZhdGUgdHJpZ2dlckV2ZW50KGV2ZW50OiBGYWNldEV2ZW50KTogdm9pZCB7XG4gICAgICAgIHRoaXMuZXZlbnRzLm5leHQoZXZlbnQpO1xuICAgIH1cbn0iXX0=