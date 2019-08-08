import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AccessibilityModule } from '../../directives/accessibility/index';
import { FocusIfModule } from '../../directives/focus-if/index';
import { IconModule } from '../icon/index';
import { PaginationComponent } from './pagination.component';

@NgModule({
    imports: [
        A11yModule,
        AccessibilityModule,
        CommonModule,
        FocusIfModule,
        IconModule,
    ],
    declarations: [
        PaginationComponent
    ],
    exports: [
        PaginationComponent
    ]
})
export class PaginationModule { }
