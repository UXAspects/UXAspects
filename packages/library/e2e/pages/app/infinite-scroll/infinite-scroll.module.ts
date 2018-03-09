import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { InfiniteScrollModule, CheckboxModule, NumberPickerModule } from '../../../../dist';

import { InfiniteScrollTestPageComponent } from './infinite-scroll.testpage.component';

@NgModule({
    imports: [
        CheckboxModule,
        NumberPickerModule,
        AccordionModule.forRoot(),
        CommonModule,
        FormsModule,
        InfiniteScrollModule,
        RouterModule.forChild([
            {
                path: '',
                component: InfiniteScrollTestPageComponent
            }
        ])
    ],
    declarations: [InfiniteScrollTestPageComponent]
})
export class InfiniteScrollTestPageModule { }
