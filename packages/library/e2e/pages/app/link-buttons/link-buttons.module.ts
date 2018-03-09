import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LinkButtonsTestPageComponent } from './link-buttons.testpage.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: LinkButtonsTestPageComponent
            }
        ])
    ],
    declarations: [LinkButtonsTestPageComponent]
})
export class LinkButtonsTestPageModule { }
