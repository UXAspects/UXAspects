import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, CheckboxModule, IconModule, MenuModule, StringFilterModule } from '@ux-aspects/ux-aspects';
import { MenuTestPageComponent } from './menu.testpage.component';

const ROUTES = [
    {
        path: '',
        component: MenuTestPageComponent,
    },
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
    declarations: [MenuTestPageComponent]
})

export class MenuTestPageModule { }
