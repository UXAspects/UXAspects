import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ColorServiceModule, ToolbarSearchModule } from '@ux-aspects/ux-aspects';
import { ToolbarSearchTestPageComponent } from './toolbar-search.testpage.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
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
