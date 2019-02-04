import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CheckboxModule, SelectionModule, TableModule, FixedHeaderTableModule } from '@ux-aspects/ux-aspects';
import { ColumnReszingTestPageComponent } from './column-resizing.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        CheckboxModule,
        FormsModule,
        FixedHeaderTableModule,
        TableModule,
        SelectionModule,
        RouterModule.forChild([
            {
                path: '',
                component: ColumnReszingTestPageComponent
            }
        ])
    ],
    declarations: [ColumnReszingTestPageComponent]
})
export class ColumnResizingTestPageModule { }
