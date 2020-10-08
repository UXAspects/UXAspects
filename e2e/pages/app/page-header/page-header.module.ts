import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MenuModule, PageHeaderModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { PageHeaderTestPageComponent } from './page-header.testpage.component';
import { PageHeaderPageComponent } from './page.component';

@NgModule({
    imports: [
        PageHeaderModule,
        AccessibilityModule,
        MenuModule.forChild({ animate: false }),
        RouterModule.forChild([
            {
                path: '',
                component: PageHeaderTestPageComponent,
                children: [
                    {
                        path: 'home',
                        component: PageHeaderPageComponent,
                        data: { title: 'Home' }
                    }
                ]
            }
        ])
    ],
    declarations: [
        PageHeaderTestPageComponent,
        PageHeaderPageComponent
    ]
})
export class PageHeaderTestPageModule { }
