import { FocusKeyManager } from '@angular/cdk/a11y';
import { AfterViewInit, Component, Input, QueryList, ViewChildren } from '@angular/core';
import { takeUntil } from 'rxjs/operators';
import { FacetBaseComponent } from '../base/facet-base/facet-base.component';
import { Facet } from '../models/facet';
import { FacetCheckListItemComponent } from './check-list-item/facet-check-list-item.component';

@Component({
    selector: 'ux-facet-check-list',
    templateUrl: './facet-check-list.component.html'
})
export class FacetCheckListComponent extends FacetBaseComponent implements AfterViewInit {

    @Input() facets: Facet[] = [];
    @Input() header: string;
    @Input() scrollbar: boolean = true;
    @Input() expanded: boolean = true;

    @ViewChildren(FacetCheckListItemComponent) options: QueryList<FacetCheckListItemComponent>;

    activeIndex: number = 0;

    private _focusKeyManager: FocusKeyManager<FacetCheckListItemComponent>;

    ngAfterViewInit(): void {
        this._focusKeyManager = new FocusKeyManager(this.options)
            .withVerticalOrientation();

        this._focusKeyManager.change.pipe(takeUntil(this._onDestroy)).subscribe(index => this.activeIndex = index);
    }

    onKeydown(event: KeyboardEvent): void {
        this._focusKeyManager.onKeydown(event);
    }

    toggleFacet(index: number, facet: Facet): void {
        this.toggleFacetSelection(facet);
        this._focusKeyManager.setActiveItem(index);
    }
}