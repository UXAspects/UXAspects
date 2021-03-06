import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, NavigationModule } from '@ux-aspects/ux-aspects';
import { NavigationTestPageComponent } from './navigation.testpage.component';
import { NavigationPageComponent } from './page.component';

@NgModule({
    imports: [
        CommonModule,
        NavigationModule,
        AccessibilityModule,
        RouterModule.forChild([
            {
                path: '',
                component: NavigationTestPageComponent,
                children: [
                    {
                        path: 'dashboard',
                        component: NavigationPageComponent,
                        data: { title: 'Dashboard' }
                    },
                    {
                        path: 'products/add',
                        component: NavigationPageComponent,
                        data: { title: 'Product Add' }
                    },
                    {
                        path: 'products/remove',
                        component: NavigationPageComponent,
                        data: { title: 'Product Remove' }
                    },
                    {
                        path: 'accounts',
                        component: NavigationPageComponent,
                        data: { title: 'Accounts' }
                    },
                    {
                        path: 'accounts/add',
                        component: NavigationPageComponent,
                        data: { title: 'Accounts Add' }
                    },
                    {
                        path: 'accounts/remove',
                        component: NavigationPageComponent,
                        data: { title: 'Accounts Remove' }
                    },
                    {
                        path: 'options',
                        component: NavigationPageComponent,
                        data: { title: 'Options' }
                    },
                    {
                        path: 'options/view',
                        component: NavigationPageComponent,
                        data: { title: 'Options View' }
                    },
                    {
                        path: 'options/remove',
                        component: NavigationPageComponent,
                        data: { title: 'Options Remove' }
                    }
                ]
            }
        ])
    ],
    declarations: [
        NavigationTestPageComponent,
        NavigationPageComponent
    ]
})
export class NavigationTestPageModule { }
