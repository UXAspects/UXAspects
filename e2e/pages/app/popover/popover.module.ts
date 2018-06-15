import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PopoverModule } from '../../../../dist';
import { PopoverTestPageComponent } from './popover.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        PopoverModule,
        RouterModule.forChild([{
            path: '',
            component: PopoverTestPageComponent
        }])
    ],
    declarations: [PopoverTestPageComponent],
})
export class PopoverTestPageModule {

}
