import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { IconModule } from '../icon/index';
import { FloatingActionButtonComponent } from './floating-action-button.component';
import { FloatingActionButtonsComponent } from './floating-action-buttons.component';

@NgModule({
    imports: [
        AccessibilityModule,
        CommonModule,
        IconModule
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
