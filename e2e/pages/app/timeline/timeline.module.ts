import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TimelineModule } from '../../../../dist';

import { TimelineTestPageComponent } from './timeline.testpage.component';

@NgModule({
    imports: [
        TimelineModule,
        CommonModule,
        FormsModule,
        RouterModule.forChild([
            {
                path: '',
                component: TimelineTestPageComponent
            }
        ])
    ],
    declarations: [TimelineTestPageComponent]
})
export class TimelineTestPageModule { }
