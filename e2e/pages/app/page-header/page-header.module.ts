import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule, PageHeaderModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { PageHeaderTestPageComponent } from './page-header.testpage.component';

@NgModule({
    imports: [
        PageHeaderModule,
        AccessibilityModule,
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
