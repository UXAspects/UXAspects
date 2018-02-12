import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { StringFilterModule } from '../../../../dist';

import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { DropdownsTestPageComponent } from './dropdowns.testpage.component';

@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        StringFilterModule,
        BsDropdownModule.forRoot(),
        RouterModule.forChild([
            {
                path: '',
                component: DropdownsTestPageComponent
            }
        ])
    ],
    declarations: [DropdownsTestPageComponent]
})
export class DropdownsTestPageModule { }
