import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AlertIconDirective } from './alert-icon.directive';
import { AlertComponent } from './alert.component';

@NgModule({
    imports: [
        CommonModule
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