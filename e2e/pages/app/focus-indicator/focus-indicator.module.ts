import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AccessibilityModule, CheckboxModule } from '@ux-aspects/ux-aspects';
import { FocusIndicatorTestPageComponent } from './focus-indicator.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        CheckboxModule,
        AccessibilityModule,
        RouterModule.forChild([{
            path: '',
            component: FocusIndicatorTestPageComponent
        }])
    ],
    declarations: [FocusIndicatorTestPageComponent],
})
export class FocusIndicatorTestPageModule { }
