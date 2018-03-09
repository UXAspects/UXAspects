import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { HyperlinksTestPageComponent } from './hyperlinks.testpage.component';

@NgModule({
    imports: [
        RouterModule.forChild([
            {
                path: '',
                component: HyperlinksTestPageComponent
            }
        ])
    ],
    declarations: [HyperlinksTestPageComponent]
})
export class HyperlinksTestPageModule { }
