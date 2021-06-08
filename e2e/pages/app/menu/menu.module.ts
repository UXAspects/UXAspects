import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule } from '@ux-aspects/ux-aspects';
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
        RouterModule.forChild(ROUTES),
    ],
    declarations: [MenuTestPageComponent]
})

export class MenuTestPageModule { }
