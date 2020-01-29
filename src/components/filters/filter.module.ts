import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { IconModule } from '../icon/index';
import { MenuModule } from '../menu/index';
import { TooltipModule } from '../tooltip/index';
import { TypeaheadModule } from '../typeahead/index';
import { FilterContainerComponent } from './filter-container.component';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';
import { FilterDynamicComponent } from './filter-dynamic/filter-dynamic.component';
import { FilterTypeaheadHighlight } from './filter-dynamic/filter-typeahead-highlight.pipe';

const DECLARATIONS = [
    FilterContainerComponent,
    FilterDropdownComponent,
    FilterDynamicComponent,
    FilterTypeaheadHighlight
];

@NgModule({
    imports: [
        A11yModule,
        AccessibilityModule,
        CommonModule,
        FormsModule,
        IconModule,
        MenuModule,
        TooltipModule,
        TypeaheadModule,
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class FilterModule { }
