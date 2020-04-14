import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import 'chance';
import { FacetsModule } from './facets.module';
import { Facet } from './models/facet';

@Component({
    selector: 'app',
    template: `
    <div class="row">
        <div class="col-md-12">
            <ux-facet-container>
                <ux-facet-check-list header="Authors" [facets]="facets"></ux-facet-check-list>
            </ux-facet-container>
        </div>
    </div>
    `
})
export class FacetCheckListTestComponent {

    facets: Facet[] = [];

    constructor() {

        // generate some facets
        for (let idx = 0; idx < 30; idx++) {
            this.facets.push(new Facet(chance.name(), null, chance.integer({ min: 0, max: 100 })));
        }

        // sort the users alphabetically
        this.facets.sort((facetOne, facetTwo) => {
            if (facetOne.title < facetTwo.title) {
                return -1;
            }

            if (facetOne.title > facetTwo.title) {
                return 1;
            }

            return 0;
        });
    }

}

describe('Facet-Check-List Component', () => {
    let component: FacetCheckListTestComponent;
    let fixture: ComponentFixture<FacetCheckListTestComponent>;
    let nativeElement: HTMLElement;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [FacetsModule],
            declarations: [FacetCheckListTestComponent],
        })
            .compileComponents();
    }));

    beforeEach(async () => {
        fixture = TestBed.createComponent(FacetCheckListTestComponent);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
        await fixture.whenStable();
    });

    it('should initialise', () => {

        expect(component).toBeTruthy();
    });

    it('should propagate ids down to child components', async () => {
        const checkListItem = nativeElement.querySelector('ux-facet-check-list-item');
        const uxCheckbox = nativeElement.querySelector('ux-facet-check-list-item ux-checkbox input');

        // ux-checkbox id should contain the id passed down from ux-facet-check-list-item
        expect(uxCheckbox.id).toContain(checkListItem.id);
    });

});