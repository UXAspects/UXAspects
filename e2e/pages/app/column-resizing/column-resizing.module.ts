import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule, SelectionModule, TableModule, FixedHeaderTableModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { ColumnResizingTestPageComponent } from './column-resizing-standard/column-resizing.testpage.component';
import { ColumnResizingExpandingTestpageComponent } from './column-resizing-expanding/column-resizing-expanding.testpage.component';

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
            }
        ]),
        TableModule
    ],
    declarations: [
        ColumnResizingTestPageComponent,
        ColumnResizingExpandingTestpageComponent
    ]
})
export class ColumnResizingTestPageModule { }
