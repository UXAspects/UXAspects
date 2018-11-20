import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TooltipModule } from '@ux-aspects/ux-aspects';
import { TooltipsTestPageComponent } from './tooltips.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        TooltipModule,
        RouterModule.forChild([{
            path: '',
            component: TooltipsTestPageComponent
        }])
    ],
    declarations: [TooltipsTestPageComponent],
})
export class TooltipsTestPageModule {

}
