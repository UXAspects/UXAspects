import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SelectListModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { SelectListTestPageComponent } from './select-list.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        SelectListModule,
        AccessibilityModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: SelectListTestPageComponent
            }
        ])
    ],
    declarations: [
        SelectListTestPageComponent
    ]
})
export class SelectListTestPageModule { }
