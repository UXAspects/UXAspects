import { FilterDropdownComponent } from './filter-dropdown/filter-dropdown.component';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FiltersContainerComponent } from './filters-container.component';
import { FiltersBaseComponent } from './filters-base/filters-base.component';

const DECLARATIONS = [
    FiltersBaseComponent,
    FiltersContainerComponent,
    FilterDropdownComponent
];

@NgModule({
    imports: [
        BsDropdownModule.forRoot(),
        CommonModule
    ],
    exports: DECLARATIONS,
    declarations: DECLARATIONS
})
export class FiltersModule { }
