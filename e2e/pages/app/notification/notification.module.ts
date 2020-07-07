import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, IconModule, NotificationModule, RadioButtonModule } from '@ux-aspects/ux-aspects';
import { NotificationTestPageComponent } from './notification.testpage.component';

const ROUTES = [
    {
        path: '',
        component: NotificationTestPageComponent,
    },
];

@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        IconModule,
        NotificationModule,
        RadioButtonModule,
        RouterModule.forChild(ROUTES),
    ],
    declarations: [NotificationTestPageComponent],
})
export class NotificationTestPageModule {}
