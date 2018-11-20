import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs/operators';
import { Facet, FacetDeselect, FacetDeselectAll, FacetService } from '../../../../dist';

@Component({
    selector: 'my-custom-facet-component',
    templateUrl: './facet-component.testpage.component.html',
    styleUrls: ['./facet-component.testpage.component.css']
})
export class SampleCustomFacetComponent implements OnInit {

    expanded: boolean = true;

    facets: Facet[] = [
        new Facet('Components', { checked: false }),
        new Facet('Charts', { checked: false }),
        new Facet('CSS', { checked: false })
    ];

    constructor(private _facetService: FacetService) {}

    ngOnInit(): void {

        // if a facet is deselected externally we need to update checkbox state
        this._facetService.events$.pipe(filter(event => event instanceof FacetDeselect)).subscribe((event: FacetDeselect) => {
            event.facet.data.checked = false;
        });

        // if all facets are deselected externally we need to update checkbox states
        this._facetService.events$.pipe(filter(event => event instanceof FacetDeselectAll)).subscribe(() => {
            this.facets.forEach(facet => facet.data.checked = false);
        });
    }

    updateFacet(facet: Facet, selected: boolean): void {

        // update the checked value
        facet.data.checked = selected;

        // if the selected state is true and the facet isnt currently selected then select it
        if (selected === true && !this._facetService.isSelected(facet)) {
            this._facetService.select(facet);
        }

        // if the selected state is false and the facet is current selected then deselect it
        if (selected === false && this._facetService.isSelected(facet)) {
            this._facetService.deselect(facet);
        }
    }

}
