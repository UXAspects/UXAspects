import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { CheckboxModule } from '../checkbox/index';
import { IconModule } from '../icon/index';
import { TooltipModule } from '../tooltip/index';
import { TypeaheadModule } from '../typeahead/index';
import { ReorderableModule } from './../../directives/reorderable/reorderable.module';
import { FacetBaseComponent } from './base/facet-base/facet-base.component';
import { FacetHeaderComponent } from './base/facet-header/facet-header.component';
import { FacetCheckListItemComponent } from './facet-check-list/check-list-item/facet-check-list-item.component';
import { FacetCheckListComponent } from './facet-check-list/facet-check-list.component';
import { FacetClearButtonDirective } from './facet-clear-button/facet-clear-button.directive';
import { FacetContainerComponent } from './facet-container.component';
import { FacetTypeaheadHighlight, FacetTypeaheadListComponent } from './facet-typeahead-list/facet-typeahead-list.component';
import { FacetTypeaheadListItemComponent } from './facet-typeahead-list/typeahead-list-item/facet-typeahead-list-item.component';

const DECLARATIONS = [
    FacetContainerComponent,
    FacetHeaderComponent,
    FacetBaseComponent,
    FacetCheckListComponent,
    FacetCheckListItemComponent,
    FacetTypeaheadListComponent,
    FacetTypeaheadListItemComponent,
    FacetTypeaheadHighlight,
    FacetClearButtonDirective
];

@NgModule({
    imports: [
        A11yModule,
        AccessibilityModule,
        CheckboxModule,
        CommonModule,
        FormsModule,
        IconModule,
        IconModule,
        ReorderableModule,
        TooltipModule,
        TypeaheadModule,
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class FacetsModule { }
