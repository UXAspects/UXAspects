import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PageHeaderModule } from '../../../../dist';

import { PageHeaderTestPageComponent } from './page-header.testpage.component';

@NgModule({
    imports: [
        PageHeaderModule,
        RouterModule.forChild([
            {
                path: '',
                component: PageHeaderTestPageComponent
            }
        ])
    ],
    declarations: [PageHeaderTestPageComponent]
})
export class PageHeaderTestPageModule { }
