import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AlertModule, IconModule } from '@ux-aspects/ux-aspects';
import { AlertTestPageComponent } from './alert.testpage.component';

const ROUTES = [
    {
        path: '',
        component: AlertTestPageComponent,
    },
];

@NgModule({
    imports: [AlertModule, CommonModule, IconModule, RouterModule.forChild(ROUTES)],
    declarations: [AlertTestPageComponent],
})
export class AlertTestPageModule {}
