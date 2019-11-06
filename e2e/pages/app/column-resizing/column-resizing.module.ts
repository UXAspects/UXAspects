import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule, SelectionModule, TableModule, FixedHeaderTableModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { ColumnReszingTestPageComponent } from './column-resizing-standard/column-resizing.testpage.component';
import { ColumnReszingAltTestPageComponent } from './column-resizing-alt/column-resizing-alt.testpage.component';

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
                component: ColumnReszingTestPageComponent
            },
            {
                path: 'column-resizing-alt',
                component: ColumnReszingAltTestPageComponent
            }
        ])
    ],
    declarations: [
        ColumnReszingTestPageComponent,
        ColumnReszingAltTestPageComponent
    ]
})
export class ColumnResizingTestPageModule { }
