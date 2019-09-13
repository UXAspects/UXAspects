import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AutoGrowModule, AccessibilityModule } from '@ux-aspects/ux-aspects';

import { ExpandingTextAreaTestPageComponent } from './expanding-text-area.testpage.component';

@NgModule({
    imports: [
        AutoGrowModule,
        AccessibilityModule,
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
