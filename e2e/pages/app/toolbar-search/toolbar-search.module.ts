import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ToolbarSearchModule, ColorServiceModule } from '@ux-aspects/ux-aspects';

import { ToolbarSearchTestPageComponent } from './toolbar-search.testpage.component';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ToolbarSearchModule,
        ColorServiceModule,
        RouterModule.forChild([{
            path: '',
            component: ToolbarSearchTestPageComponent
        }])
    ],
    declarations: [ToolbarSearchTestPageComponent],
})
export class ToolbarSearchTestPageModule {

}
