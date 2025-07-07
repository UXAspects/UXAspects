import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { FacetDeselect, FacetDeselectAll, FacetEvent, FacetSelect } from './facet-events';
import { Facet } from './models/facet';

@Injectable()
export class FacetService {
  /** The list of active facets */
  facets$ = new BehaviorSubject<Facet[]>([]);

  /** Emit all the events when they occur */
  events$ = new Subject<FacetEvent>();

  select(facet: Facet): void {
    // if the facet is already selected or disabled then do nothing
    if (this.isSelected(facet) || facet.disabled) {
      return;
    }

    // update the list of active facets
    this.facets$.next([...this.facets$.value, facet]);

    // emit the event
    this.events$.next(new FacetSelect(facet));
  }

  deselect(facet: Facet): void {
    // if the facet is not selected then do nothing
    if (!this.isSelected(facet)) {
      return;
    }

    // update the list of active facets
    this.facets$.next(
      this.facets$.value.filter(_selectedFacet => !this.isFacetMatch(_selectedFacet, facet))
    );

    // emit the event
    this.events$.next(new FacetDeselect(facet));
  }

  deselectAll(): void {
    // empty the list of active facets
    this.facets$.next([]);

    // emit the event
    this.events$.next(new FacetDeselectAll());
  }

  toggle(facet: Facet): void {
    this.isSelected(facet) ? this.deselect(facet) : this.select(facet);
  }

  isSelected(facet: Facet): boolean {
    return !!this.facets$.value.find(_selectedFacet => this.isFacetMatch(_selectedFacet, facet));
  }

  private isFacetMatch(facet1: Facet, facet2: Facet): boolean {
    if (facet1.id === undefined || facet2.id === undefined) {
      return facet1 === facet2;
    }

    return facet1.id === facet2.id;
  }
}
