import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule, SelectionModule, TableModule, FixedHeaderTableModule, AccessibilityModule, ColumnSortingModule } from '@ux-aspects/ux-aspects';
import { ColumnResizingTestPageComponent } from './column-resizing-standard/column-resizing.testpage.component';
import { ColumnResizingExpandingTestpageComponent } from './column-resizing-expanding/column-resizing-expanding.testpage.component';
import { ColumnResizingSortingTestPageComponent } from './column-resizing-sorting/column-resizing-sorting.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        CheckboxModule,
        FormsModule,
        FixedHeaderTableModule,
        TableModule,
        SelectionModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: ColumnResizingTestPageComponent
            },
            {
                path: 'column-resizing-expanding',
                component: ColumnResizingExpandingTestpageComponent
            },
            {
                path: 'column-resizing-sorting',
                component: ColumnResizingSortingTestPageComponent
            }
        ]),
        TableModule,
        ColumnSortingModule
    ],
    declarations: [
        ColumnResizingTestPageComponent,
        ColumnResizingExpandingTestpageComponent,
        ColumnResizingSortingTestPageComponent
    ]
})
export class ColumnResizingTestPageModule { }
