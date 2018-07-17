import { LiveAnnouncer } from '@angular/cdk/a11y';
import { Component, EventEmitter, Input, OnDestroy, Output } from '@angular/core';
import { ReorderEvent } from '../../directives/reorderable/index';
import { FacetDeselect, FacetDeselectAll, FacetEvent, FacetSelect } from './facet-events';
import { Facet } from './models/facet';

@Component({
    selector: 'ux-facet-container',
    templateUrl: './facet-container.component.html'
})
export class FacetContainerComponent implements OnDestroy {

    @Input() header: string = 'Selected:';
    @Input() clearTooltip: string = 'Clear All';
    @Input() emptyText: string = 'No Items';
    @Input() facets: Facet[] = [];
    @Input() facetsReorderable: boolean = false;

    @Output() facetsChange: EventEmitter<Facet[]> = new EventEmitter<Facet[]>();
    @Output() events: EventEmitter<FacetEvent> = new EventEmitter<FacetEvent>();

    constructor(private _announcer: LiveAnnouncer) { }

    ngOnDestroy(): void {
        this.events.complete();
    }

    selectFacet(facet: Facet): void {
        // push the facet on to the list
        this.facets.push(facet);

        // update the two way binding
        this.facetsChange.emit(this.facets);

        // trigger event
        this.triggerEvent(new FacetSelect(facet));
    }

    deselectFacet(facet: Facet, tag?: HTMLElement): void {

        // find the index of the item in the selected array
        const idx = this.facets.findIndex(selectedFacet => facet === selectedFacet);

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

        // announce the facet removal
        this._announcer.announce(`Option ${facet.title} deselected.`, 'assertive');

        // focus another tag if there is one
        if (tag) {
            const sibling = tag.previousElementSibling || tag.nextElementSibling;

            // if there is a sibling then focus it
            if (sibling) {
                (sibling as HTMLElement).focus();
            }
        }
    }

    deselectAllFacets(): void {

        // empty the selected array
        this.facets = [];

        // update the two way binding
        this.facetsChange.emit(this.facets);

        // trigger event
        this.triggerEvent(new FacetDeselectAll());

        // announce the facet removal
        this._announcer.announce(`All options deselected.`, 'assertive');
    }

    trackBy(_index: number, facet: Facet): string | number {
        return facet.id || facet.title;
    }

    shiftRight(facet: Facet, element: HTMLElement): void {
        // only move the item if reordering is allowed
        if (this.facetsReorderable === false) {
            return;
        }

        // perform the movement
        this.shiftFacet(facet, 1);

        // the item may become unfocused during the reorder so we should refocus it
        requestAnimationFrame(() => element.focus());

        // announce the move
        this._announcer.announce(`Option ${facet.title} moved down.`);
    }

    shiftLeft(facet: Facet, element: HTMLElement): void {
        // only move the item if reordering is allowed
        if (this.facetsReorderable === false) {
            return;
        }

        // perform the movement
        this.shiftFacet(facet, -1);

        // the item may become unfocused during the reorder so we should refocus it
        requestAnimationFrame(() => element.focus());

        // announce the move
        this._announcer.announce(`Option ${facet.title} moved up.`);
    }

    private shiftFacet(facet: Facet, distance: number) {
        const index = this.facets.indexOf(facet);
        const target = index + distance;

        // Ensure the move is valid
        if (target < 0 || target === this.facets.length) {
            return;
        }

        // Perform the move
        this.facets.splice(index, 1);
        this.facets.splice(target, 0, facet);
    }

    private triggerEvent(event: FacetEvent) {
        this.events.next(event);
    }
}

export interface FacetReorderEvent extends ReorderEvent {
    index: number;
}