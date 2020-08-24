import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FilterModule } from '../filter.module';
import { Component } from '@angular/core';
import { Filter } from '../interfaces/filter.interface';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
    selector: 'app-filter-dropdown-test',
    template: `
        <ux-filter-container>
            <ux-filter-dropdown [id]="id"
                                [filters]="filters"
                                [initial]="filters[0]"></ux-filter-dropdown>
        </ux-filter-container>
    `
})
export class FilterDropdownComponentSpec {

    id: string = 'custom-filter-dropdown';

    filters: Filter[] = [
        {
            group: 'Author',
            title: 'Author',
            name: 'Author (All)',
            initial: true,
        }, {
            group: 'Author',
            title: 'Lily Clarke',
            name: 'Lily Clarke',
        }, {
            group: 'Author',
            title: 'Jesse Bass',
            name: 'Jesse Bass'
        }, {
            group: 'Author',
            title: 'Iva Rogers',
            name: 'Iva Rogers'
        }
    ];
}

describe('Filter Dropdown', () => {
    let fixture: ComponentFixture<FilterDropdownComponentSpec>;
    let component: FilterDropdownComponentSpec;
    let nativeElement: HTMLElement;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                FilterModule,
                NoopAnimationsModule
            ],
            declarations: [FilterDropdownComponentSpec]
        }).compileComponents();

        fixture = TestBed.createComponent<FilterDropdownComponentSpec>(FilterDropdownComponentSpec);
        component = fixture.componentInstance;
        nativeElement = fixture.nativeElement;
        fixture.detectChanges();
    });

    it('should have the correct IDs if a custom ID has been provided on the component', () => {
        expect(getMenuButton().id).toBe('custom-filter-dropdown-trigger');
        toggleMenu();

        getMenuItems().forEach((item, index) =>
            expect(item.id).toBe('custom-filter-dropdown-item-' + index));
    });

    it('should give each filter the provided ID if specified on the Filter object', () => {
        // add an id property to all the filters
        component.filters.forEach((filter, index) => filter.id = `filter-${ index }`);
        fixture.detectChanges();

        toggleMenu();

        getMenuItems().forEach((item, index) =>
            expect(item.id).toBe('filter-' + index));
    });

    function getMenuButton(): HTMLElement {
        return nativeElement.querySelector('.filter-dropdown');
    }

    function toggleMenu(): void {
        getMenuButton().click();
        fixture.detectChanges();
    }

    function getMenu(): HTMLElement {
        return document.querySelector('.ux-menu');
    }

    function getMenuItems(): HTMLElement[] {
        return Array.from(getMenu().querySelectorAll('[uxmenuitem]'));
    }

});
