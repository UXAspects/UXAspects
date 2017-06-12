import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { FilterDynamicComponent } from './filter-dynamic/filter-dynamic.component';
import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FilterContainerComponent } from './filter-container.component';
import { FilterBaseComponent } from './filter-base/filter-base.component';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { FormsModule } from '@angular/forms';

const DECLARATIONS = [
    FilterBaseComponent,
    FilterContainerComponent,
    FilterDropdownComponent,
    FilterDynamicComponent
];

@NgModule({
    imports: [
        BsDropdownModule.forRoot(),
        TypeaheadModule.forRoot(),
        TooltipModule.forRoot(),
        FormsModule,
        CommonModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class FilterModule { }
