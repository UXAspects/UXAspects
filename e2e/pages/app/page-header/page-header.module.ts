import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule, PageHeaderModule } from '@ux-aspects/ux-aspects';
import { PageHeaderTestPageComponent } from './page-header.testpage.component';


@NgModule({
    imports: [
        PageHeaderModule,
        MenuModule.forChild({ animate: false }),
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
