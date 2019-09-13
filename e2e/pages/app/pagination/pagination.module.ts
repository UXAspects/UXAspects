import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PaginationModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { PaginationTestPageComponent } from './pagination.testpage.component';

@NgModule({
    imports: [
        FormsModule,
        PaginationModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: PaginationTestPageComponent
            }
        ])
    ],
    declarations: [PaginationTestPageComponent]
})
export class PaginationTestPageModule { }
