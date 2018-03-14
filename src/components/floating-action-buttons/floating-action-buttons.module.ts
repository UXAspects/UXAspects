import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { FloatingActionButtonsComponent } from './floating-action-buttons.component';
import { FloatingActionButtonComponent } from './floating-action-button.component';

@NgModule({
    imports: [
        CommonModule,
        TooltipModule.forRoot()
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
