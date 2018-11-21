import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReorderableModule } from '@ux-aspects/ux-aspects';
import { ReorderableGroupTestPageComponent } from './reorderable-group.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        ReorderableModule,
        RouterModule.forChild([
            {
                path: '',
                component: ReorderableGroupTestPageComponent
            }
        ])
    ],
    declarations: [
        ReorderableGroupTestPageComponent
    ]
})
export class ReorderableGroupTestPageModule { }
