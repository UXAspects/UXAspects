import { NgModule } from '@angular/core';

import { ColumnSortingComponent } from './column-sorting.component';

import { ColumnSortingDirective } from './column-sorting.directive';

@NgModule({
    exports: [ColumnSortingComponent, ColumnSortingDirective],
    declarations: [ColumnSortingComponent, ColumnSortingDirective]
})
export class ColumnSortingModule { }