import { Component, ElementRef, EventEmitter, Host, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { FacetContainerComponent } from '../../facet-container.component';
import { FacetDeselect, FacetDeselectAll, FacetEvent, FacetSelect } from '../../facet-events';
import { Facet } from '../../models/facet';

@Component({
    selector: 'ux-facet-base',
    template: '',
})
export class FacetBaseComponent implements OnInit, OnDestroy {

    @Input() selected: Facet[] = [];
    @Output() selectedChange: EventEmitter<Facet[]> = new EventEmitter<Facet[]>();
    @Output() events: Subject<FacetEvent> = new Subject<FacetEvent>();

    private _onDestroy = new Subject<void>();

    constructor( @Host() private facetContainer: FacetContainerComponent, public _elementRef: ElementRef) {

        if (facetContainer) {

            // subscribe to any deselect events from the facet container
            facetContainer.events.pipe(
                filter(event => event instanceof FacetDeselect),
                filter((event: FacetDeselect) => !!this.selected.find(facet => facet === event.facet)),
                takeUntil(this._onDestroy)
            ).subscribe((event: FacetDeselect) => this.deselectFacet(event.facet));

            // subscribe to any deselect all events from facet container
            facetContainer.events.pipe(
                filter(event => event instanceof FacetDeselectAll),
                takeUntil(this._onDestroy)
            ).subscribe(_ => this.deselectAll());

        }
    }

    ngOnInit(): void {
        // check if there should be any facets initially selected
        if (this.facetContainer) {
            this.selected.forEach(facet => this.facetContainer.selectFacet(facet));
        }
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    selectFacet(facet: Facet): void {

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

    deselectFacet(facet: Facet): void {

        // find facet to remove
        let index = this.selected.findIndex(selectedFacet => selectedFacet === facet);

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

    deselectAll(): void {

        // remove all selected facets
        this.selected = [];

        // fire the event to the observable
        this.triggerEvent(new FacetDeselectAll());

        // emit the changes to the selected event emitter
        this.selectedChange.emit(this.selected);
    }

    toggleFacetSelection(facet: Facet): void {

        // if the facet is selected then deselect - otherwise select it
        if (this.isFacetSelected(facet)) {
            this.deselectFacet(facet);
        } else {
            this.selectFacet(facet);
        }

    }

    isFacetSelected(facet: Facet): boolean {
        // determine if a facet is currently selected
        return !!this.selected.find(selectedFacet => selectedFacet === facet);
    }

    private triggerEvent(event: FacetEvent): void {
        this.events.next(event);
    }
}