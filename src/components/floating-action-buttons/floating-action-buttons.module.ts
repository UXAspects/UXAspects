import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FloatingActionButtonsComponent } from './floating-action-buttons.component';
import { FloatingActionButtonComponent } from './floating-action-button.component';

@NgModule({
    imports: [
        CommonModule
    ],
    exports: [
        FloatingActionButtonsComponent,
        FloatingActionButtonComponent
    ],
    declarations: [
        FloatingActionButtonsComponent,
        FloatingActionButtonComponent
    ]
})
export class FloatingActionButtonsModule { }
