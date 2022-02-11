import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, CheckboxModule, IconModule, MenuModule, StringFilterModule } from '@ux-aspects/ux-aspects';
import { MenuFallbackTestPageComponent } from './fallback/menu-fallback.testpage.component';
import { MenuTestPageComponent } from './menu.testpage.component';

const ROUTES = [
    {
        path: '',
        component: MenuTestPageComponent,
    },
    {
        path: 'fallback',
        component: MenuFallbackTestPageComponent
    }
];

@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        CheckboxModule,
        IconModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forChild(ROUTES),
        StringFilterModule,
        MenuModule
    ],
    declarations: [
        MenuTestPageComponent,
        MenuFallbackTestPageComponent
    ]
})

export class MenuTestPageModule { }
