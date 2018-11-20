import { FocusKeyManager } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, OnDestroy, QueryList, ViewChildren } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs/Subject';
import { FacetService } from '../facet.service';
import { Facet } from '../models/facet';
import { FacetCheckListItemComponent } from './check-list-item/facet-check-list-item.component';

@Component({
    selector: 'ux-facet-check-list',
    templateUrl: './facet-check-list.component.html'
})
export class FacetCheckListComponent implements AfterViewInit, OnDestroy {

    @Input() facets: Facet[] = [];
    @Input() header: string;
    @Input() scrollbar: boolean = true;
    @Input() expanded: boolean = true;

    @ViewChildren(FacetCheckListItemComponent) options: QueryList<FacetCheckListItemComponent>;

    isFocused: boolean = false;
    activeIndex: number = 0;

    private _onDestroy = new Subject<void>();
    private _focusKeyManager: FocusKeyManager<FacetCheckListItemComponent>;

    constructor(public facetService: FacetService) {}

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
}