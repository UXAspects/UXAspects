import { NgModule } from '@angular/core';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { CommonModule } from '@angular/common';
import { FacetContainerComponent } from './facet-container.component';
import { FacetBaseComponent } from './base/facet-base/facet-base.component';
import { FacetHeaderComponent } from './base/facet-header/facet-header.component';
import { FacetCheckListComponent } from './facet-check-list/facet-check-list.component';
import { FacetTypeaheadListComponent, FacetTypeaheadHighlight } from './facet-typeahead-list/facet-typeahead-list.component';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from '../checkbox/index';
import { TooltipModule } from '../tooltip/index';

const DECLARATIONS = [
    FacetContainerComponent,
    FacetHeaderComponent,
    FacetBaseComponent,
    FacetCheckListComponent,
    FacetTypeaheadListComponent,
    FacetTypeaheadHighlight
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        CheckboxModule,
        TooltipModule,
        TypeaheadModule.forRoot()
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class FacetsModule { }
