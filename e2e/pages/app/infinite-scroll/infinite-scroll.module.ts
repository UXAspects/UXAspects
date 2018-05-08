import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { InfiniteScrollModule, CheckboxModule, NumberPickerModule } from '../../../../dist';

import { InfiniteScrollTestPageComponent } from './standard/infinite-scroll.testpage.component';
import { InfiniteScrollFullscreenTestPageComponent } from './fullscreen/infinite-scroll-fullscreen.testpage.component';

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
            },
            {
                path: 'fullscreen',
                component: InfiniteScrollFullscreenTestPageComponent
            }
        ])
    ],
    declarations: [
        InfiniteScrollTestPageComponent, 
        InfiniteScrollFullscreenTestPageComponent
    ]
})
export class InfiniteScrollTestPageModule { }
