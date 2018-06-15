import { Component, OnDestroy, OnInit } from '@angular/core';
import { Facet, FacetBaseComponent, FacetDeselect, FacetDeselectAll } from '@ux-aspects/ux-aspects';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
    selector: 'my-custom-facet-component',
    templateUrl: './facet-component.component.html',
    styleUrls: ['./facet-component.component.css']
})
export class SampleCustomFacetComponent extends FacetBaseComponent implements OnInit, OnDestroy {

    expanded: boolean = true;

    facets: Facet[] = [
        new Facet('Components', { checked: false }),
        new Facet('Charts', { checked: false }),
        new Facet('CSS', { checked: false })
    ];

    ngOnInit(): void {

        // if a facet is deselected externally we need to update checkbox state
        this.events.pipe(filter(event => event instanceof FacetDeselect), takeUntil(this._onDestroy)).subscribe((event: FacetDeselect) => {
            event.facet.data.checked = false;
        });

        // if all facets are deselected externally we need to update checkbox states
        this.events.pipe(filter(event => event instanceof FacetDeselectAll), takeUntil(this._onDestroy)).subscribe(() => {
            this.facets.forEach(facet => facet.data.checked = false);
        });
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    updateFacet(facet: Facet, selected: boolean): void {

        // update the checked value
        facet.data.checked = selected;

        // if the selected state is true and the facet isnt currently selected then select it
        if (selected === true && !this.isFacetSelected(facet)) {
            this.selectFacet(facet);
        }

        // if the selected state is false and the facet is current selected then deselect it
        if (selected === false && this.isFacetSelected(facet)) {
            this.deselectFacet(facet);
        }
    }

}