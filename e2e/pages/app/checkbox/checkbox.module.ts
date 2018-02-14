import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CheckboxModule } from '../../../../dist';

import { CheckboxTestPageComponent } from './checkbox.testpage.component';

@NgModule({
    imports: [
        CheckboxModule,
        RouterModule.forChild([
            {
                path: '',
                component: CheckboxTestPageComponent
            }
        ])
    ],
    declarations: [CheckboxTestPageComponent]
})
export class CheckboxTestPageModule { }
