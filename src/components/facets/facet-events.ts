import { Facet } from './models/facet';

export class FacetSelect {
  constructor(public facet: Facet) {}
}

export class FacetDeselect {
  constructor(public facet: Facet) {}
}

export class FacetDeselectAll {}

export type FacetEvent = FacetSelect | FacetDeselect | FacetDeselectAll;
