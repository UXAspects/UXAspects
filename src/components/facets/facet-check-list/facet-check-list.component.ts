import { FocusKeyManager } from '@angular/cdk/a11y';
import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, QueryList, ViewChildren } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { FacetDeselect, FacetDeselectAll, FacetEvent, FacetSelect } from '../facet-events';
import { FacetService } from '../facet.service';
import { Facet } from '../models/facet';
import { FacetCheckListItemComponent } from './check-list-item/facet-check-list-item.component';

@Component({
    selector: 'ux-facet-check-list',
    templateUrl: './facet-check-list.component.html'
})
export class FacetCheckListComponent implements AfterViewInit, OnDestroy {

    /** This will allow you to define an initial set of selected facets. */
    @Input() set selected(selection: Facet[]) {
        if (Array.isArray(selection)) {
            selection.forEach(facet => this.facetService.select(facet));
        }
    }

    /** Defines the complete list of facets that can be selected. */
    @Input() facets: Facet[] = [];

    /** Defines the text displayed at the top of the Facet Check List. */
    @Input() header: string;

    /** If `false` the list will grow to display all possible facets. If `true` a scrollbar will appear to prevent the list from growing too large. */
    @Input() scrollbar: boolean = true;

    /** Defines whether or not the checkboxes will appear in simplified form. */
    @Input() simplified: boolean = false;

    /** Defines whether or not the Facet Check List should be initially expanded or not. */
    @Input() expanded: boolean = true;

    /**
     * This will be triggered when a facet is selected, deselected or all facets are deselected.
     * The event will be an instance of either `FacetSelect`, `FacetDeselect` or `FacetDeselectAll` and
     * will contain the facet being selected or deselected in a `facet` property (deselect all will not contain affected facets).
     */
    @Output() events: Subject<FacetEvent> = new Subject<FacetEvent>();

    /** If two-way binding is used this array will get updated any time the selected facets change. */
    @Output() selectedChange: EventEmitter<Facet[]> = new EventEmitter<Facet[]>();

    @ViewChildren(FacetCheckListItemComponent) options: QueryList<FacetCheckListItemComponent>;

    isFocused: boolean = false;
    activeIndex: number = 0;

    private _onDestroy = new Subject<void>();
    private _focusKeyManager: FocusKeyManager<FacetCheckListItemComponent>;

    constructor(public facetService: FacetService) {

        facetService.events$.pipe(takeUntil(this._onDestroy)).subscribe(event => {

            // deselect all events should always be emitted
            if (event instanceof FacetDeselectAll) {
                this.events.next(event);
                this.selectedChange.next([]);
            }

            // selection and deselection events should only be emitted when the facet belongs to this component
            if ((event instanceof FacetSelect || event instanceof FacetDeselect) && this.isOwnFacet(event.facet)) {
                this.events.next(event);
                this.selectedChange.next(this.getSelectedFacets());
            }
        });
    }

    ngAfterViewInit(): void {
        this._focusKeyManager = new FocusKeyManager(this.options)
            .withVerticalOrientation();

        this._focusKeyManager.change.pipe(takeUntil(this._onDestroy)).subscribe(index => this.activeIndex = index);
    }

    ngOnDestroy(): void {
        this._onDestroy.next();
        this._onDestroy.complete();
    }

    onFocus(index: number): void {
        if (this._focusKeyManager.activeItemIndex === -1) {
            this._focusKeyManager.setActiveItem(index);
        }
    }

    onKeydown(event: KeyboardEvent): void {
        this._focusKeyManager.onKeydown(event);
    }

    toggleFacet(index: number, facet: Facet): void {
        this.facetService.toggle(facet);
        this._focusKeyManager.setActiveItem(index);
    }

    private getSelectedFacets(): Facet[] {
        return this.facetService.facets$.value.filter(facet => this.isOwnFacet(facet));
    }

    private isOwnFacet(facet: Facet): boolean {
        return this.facets.indexOf(facet) !== -1;
    }
}