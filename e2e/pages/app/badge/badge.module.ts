import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BadgeModule, IconModule } from '@ux-aspects/ux-aspects';
import { BadgeTestPageComponent } from './badge.testpage.component';
@NgModule({
    imports: [
        CommonModule,
        BadgeModule,
        IconModule,
        RouterModule.forChild([
            {
                path: '',
                component: BadgeTestPageComponent,
            },
        ]),
    ],
    declarations: [BadgeTestPageComponent],
})
export class BadgeTestPageModule { }
