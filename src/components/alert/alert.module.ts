import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { IconModule } from '../icon/index';
import { AlertIconDirective } from './alert-icon.directive';
import { AlertComponent } from './alert.component';

@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        IconModule
    ],
    declarations: [
        AlertComponent,
        AlertIconDirective
    ],
    exports: [
        AlertComponent,
        AlertIconDirective
    ]
})
export class AlertModule { }