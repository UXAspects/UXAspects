import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FacetEvent, FacetSelect, FacetDeselect, FacetDeselectAll } from './facet-events';
import { Facet } from './models/facet';

@Component({
    selector: 'ux-facet-container',
    templateUrl: './facet-container.component.html'
})
export class FacetContainerComponent {

    @Input() header: string = 'Selected:';
    @Input() clearTooltip: string = 'Clear All';
    @Input() emptyText: string = 'No Items';
    @Input() facets: Facet[] = [];
    @Input() facetsReorderable: boolean = false;

    @Output() facetsChange: EventEmitter<Facet[]> = new EventEmitter<Facet[]>();
    @Output() events: EventEmitter<FacetEvent> = new EventEmitter<FacetEvent>();

    selectFacet(facet: Facet): void {
        // push the facet on to the list
        this.facets.push(facet);

        // update the two way binding
        this.facetsChange.emit(this.facets);

        // trigger event
        this.triggerEvent(new FacetSelect(facet));
    }

    deselectFacet(facet: Facet): void {

        // find the index of the item in the selected array
        let idx = this.facets.findIndex(selectedFacet => facet === selectedFacet);

        // if match there was no match then finish
        if (idx === -1) {
            return;
        }

        // remove the last item
        this.facets.splice(idx, 1);

        // update the two way binding
        this.facetsChange.emit(this.facets);

        // trigger event
        this.triggerEvent(new FacetDeselect(facet));
    }

    deselectAllFacets(): void {

        // empty the selected array
        this.facets = [];

        // update the two way binding
        this.facetsChange.emit(this.facets);

        // trigger event
        this.triggerEvent(new FacetDeselectAll());
    }

    private triggerEvent(event: FacetEvent) {
        this.events.next(event);
    }
}