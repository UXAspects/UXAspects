import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutoGrowModule } from '../../../../dist';

import { ExpandingTextAreaTestPageComponent } from './expanding-text-area.testpage.component';

@NgModule({
    imports: [
        AutoGrowModule,
        RouterModule.forChild([
            {
                path: '',
                component: ExpandingTextAreaTestPageComponent
            }
        ])
    ],
    exports: [],
    declarations: [ExpandingTextAreaTestPageComponent],
    providers: [],
})
export class ExpandingTextAreaModule { }
