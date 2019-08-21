import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { IconModule } from '../icon/index';
import { ColumnSortingComponent } from './column-sorting.component';
import { ColumnSortingDirective } from './column-sorting.directive';

@NgModule({
    imports: [
        CommonModule,
        IconModule
    ],
    exports: [
        ColumnSortingComponent,
        ColumnSortingDirective
    ],
    declarations: [
        ColumnSortingComponent,
        ColumnSortingDirective
    ]
})
export class ColumnSortingModule { }