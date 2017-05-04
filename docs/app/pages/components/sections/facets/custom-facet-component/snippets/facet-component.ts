import { Component, OnInit } from '@angular/core';
import { FacetBaseComponent, Facet, FacetDeselect, FacetDeselectAll } from 'ux-aspects';

@Component({
    selector: 'my-custom-facet-component',
    templateUrl: './src/facet-component.component.html',
    styleUrls: ['./src/facet-component.component.css']
})
export class SampleCustomFacetComponent extends FacetBaseComponent implements OnInit {

    expanded: boolean = true;

    facets: Facet[] = [
        new Facet('Components', { checked: false }),
        new Facet('Charts', { checked: false }),
        new Facet('CSS', { checked: false })
    ];

    ngOnInit() {

        // if a facet is deselected externally we need to update checkbox state
        this.events.filter(event => event instanceof FacetDeselect).subscribe((event: FacetDeselect) => {
            event.facet.data.checked = false;
        });

        // if all facets are deselected externally we need to update checkbox states
        this.events.filter(event => event instanceof FacetDeselectAll).subscribe(event => {
            this.facets.forEach(facet => facet.data.checked = false);
        });
    }

    updateFacet(facet: Facet, selected: boolean) {

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