import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule, SelectionModule, TableModule, FixedHeaderTableModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { ColumnResizingTestPageComponent } from './column-resizing-standard/column-resizing.testpage.component';
import { ColumnResizingExpandTestpageComponent } from './column-resizing-expand/column-resizing-expand.testpage.component';

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
                path: 'column-resizing-expand',
                component: ColumnResizingExpandTestpageComponent
            }
        ])
    ],
    declarations: [
        ColumnResizingTestPageComponent,
        ColumnResizingExpandTestpageComponent
    ]
})
export class ColumnResizingTestPageModule { }
