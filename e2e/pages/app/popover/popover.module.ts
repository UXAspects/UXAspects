import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopoverModule, AccessibilityModule } from '@ux-aspects/ux-aspects';
import { PopoverTestPageComponent } from './popover.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        PopoverModule,
        AccessibilityModule,
        RouterModule.forChild([{
            path: '',
            component: PopoverTestPageComponent
        }])
    ],
    declarations: [PopoverTestPageComponent],
})
export class PopoverTestPageModule {

}
