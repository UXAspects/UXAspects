import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonsModule } from 'ngx-bootstrap/buttons';

import { SplitButtonDropdownsTestPageComponent } from './split-button-dropdowns.testpage.component';

@NgModule({
    imports: [
        ButtonsModule.forRoot(),
        RouterModule.forChild([
            {
                path: '',
                component: SplitButtonDropdownsTestPageComponent
            }
        ])
    ],
    declarations: [SplitButtonDropdownsTestPageComponent]
})
export class SplitButtonDropdownsTestPageModule { }
